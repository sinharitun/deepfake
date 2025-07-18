
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
import os
import cv2
import numpy as np
import torch
import torch.nn as nn
from torchvision import models, transforms
import face_recognition

# Set device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Preprocessing
im_size = 112
mean = [0.485, 0.456, 0.406]
std = [0.229, 0.224, 0.225]
transform = transforms.Compose([
    transforms.ToPILImage(),
    transforms.Resize((im_size, im_size)),
    transforms.ToTensor(),
    transforms.Normalize(mean, std),
])

sm = nn.Softmax(dim=1)

# Model Definition
class DeepFakeModel(nn.Module):
    def __init__(self, num_classes=2, latent_dim=2048, lstm_layers=1, hidden_dim=2048, bidirectional=False):
        super(DeepFakeModel, self).__init__()
        base_model = models.resnext50_32x4d(pretrained=True)
        self.model = nn.Sequential(*list(base_model.children())[:-2])
        self.lstm = nn.LSTM(latent_dim, hidden_dim, lstm_layers, bidirectional)
        self.dp = nn.Dropout(0.4)
        self.linear1 = nn.Linear(hidden_dim, num_classes)
        self.avgpool = nn.AdaptiveAvgPool2d(1)

    def forward(self, x):
        batch_size, seq_len, c, h, w = x.shape
        x = x.view(batch_size * seq_len, c, h, w)
        fmap = self.model(x)
        x = self.avgpool(fmap)
        x = x.view(batch_size, seq_len, -1)
        x_lstm, _ = self.lstm(x)
        out = self.linear1(self.dp(x_lstm[:, -1, :]))
        return fmap, out

# Load model
model = DeepFakeModel().to(device)
model_path = "E:/deepfake/deepfake_backend/models/model_93_acc_100_frames_celeb_FF_data.pt"  # Update your path here
model.load_state_dict(torch.load(model_path, map_location=device))
model.eval()

@csrf_exempt
def predict_video(request):
    if request.method == 'POST' and request.FILES.get('video'):
        # Save uploaded video temporarily
        video_file = request.FILES['video']
        temp_path = default_storage.save(video_file.name, video_file)
        full_path = os.path.join('media', temp_path)

        cap = cv2.VideoCapture(full_path)
        frames = []
        count = 60
        a = int(100 / count)
        first_frame = np.random.randint(0, a)

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # Optional: crop face
            try:
                faces = face_recognition.face_locations(frame)
                if faces:
                    top, right, bottom, left = faces[0]
                    frame = frame[top:bottom, left:right]
            except:
                pass

            # Transform
            try:
                frame_tensor = transform(frame)
                frames.append(frame_tensor)
            except:
                continue

            if len(frames) == count:
                break
        cap.release()

        if len(frames) < count:
            return JsonResponse({"error": "Not enough frames with faces"}, status=400)

        # Stack and predict
        video_tensor = torch.stack(frames).unsqueeze(0).to(device)  # Shape: (1, seq_len, C, H, W)
        with torch.no_grad():
            fmap, logits = model(video_tensor)
            probs = sm(logits)
            confidence = probs[0][torch.argmax(probs)].item() * 100
            prediction = "Real" if torch.argmax(probs).item() == 1 else "Fake"

        return JsonResponse({
            "status": "success",
            "prediction": prediction,
            "confidence": round(confidence, 2),
            "frames_used": len(frames)
        })

    return JsonResponse({"error": "No video file received"}, status=400)
