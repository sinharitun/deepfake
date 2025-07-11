
import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResultDisplay from './ResultDisplay';
import Lottie from 'lottie-react';
import loadingAnim from '../assets/loading.json'; // your animation file
import './UploadForm.css';

const UploadForm = () => {
  const processingRef = useRef(null);

  const [video, setVideo] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [currentTip, setCurrentTip] = useState(0);
  const navigate = useNavigate();

  const tips = [
    "🔍 Deepfakes often manipulate eye movement patterns.",
    "🛡️ Always verify videos from unknown sources.",
    "🤖 AI models use facial landmarks to spot fakes.",
    "📊 High confidence doesn't always mean real - double check!",
    "🎥 Real-time detection is still evolving in cybersecurity.",
    "🧠 Deepfake models are trained using thousands of facial expressions.",
    "📱 Some fake videos spread faster on social media due to emotional content.",
    "🔬 Experts use inconsistencies in lighting and shadows to detect fakes.",
    "🕵️‍♂️ Deepfakes can be used in phishing scams and identity theft.",
    "🎞️ Subtle details like blinking or lip sync often expose a fake.",
    "🌐 Governments and tech companies are working on deepfake detection laws.",
    "📡 Audio deepfakes use cloned voices to impersonate real people.",
    "🧪 GANs (Generative Adversarial Networks) are the core tech behind deepfakes.",
    "📷 Even photos can be faked using AI – called deep images or synthetics.",
    "⚖️ Courts are beginning to explore how deepfakes affect legal evidence.",
  ];

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setCurrentTip((prev) => (prev + 1) % tips.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setPreviewURL(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video) return;

    setIsLoading(true);
    if (processingRef.current) {
      setTimeout(() => {
        processingRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100); // slight delay to allow rendering
    }

    const formData = new FormData();
    formData.append('video', video);



    try {
      const res = await axios.post('http://localhost:8000/api/predict/', formData);
      setResult({
        prediction: res.data.prediction,
        confidence: res.data.confidence,
        totalFrames: res.data.frames_used,
        videoURL: previewURL
      });
    } catch (err) {
      alert('Error uploading video.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setVideo(null);
    setPreviewURL(null);
    setResult(null);
  };

  return (
    <div className="upload-container">
      <div className="back-bo">
        <div className="outer">
        <div className="mid">
          <div className="inner"></div>
        </div>
      </div>
      </div>

      {!result && (
        <form className="upload-form" onSubmit={handleSubmit}>
          <label>Upload your video:</label>
          <input type="file" accept="video/*" onChange={handleVideoChange} required />

          {previewURL && (
            <div className="video-preview">
              <p>Video Preview:</p>
              <div className="video-wrapper">
                <video className="vid" src={previewURL} accept="video/mp4" controls preload="metadata" />
              </div>
            </div>
          )}

          <button type="submit" disabled={isLoading}>Submit</button>
          <button className="back-button" onClick={() => navigate('/')}>← Go Back</button>
        </form>
      )}

     
      {isLoading && (
        <div className="processing-block" ref={processingRef}>
        
          <div className="processing-animation">
            <Lottie animationData={loadingAnim} loop={true} className="overlay-animation" />
          </div>

          <div className="proc">
            <p className="processing-text">⏳ Processing video... Please wait.</p>
          </div>

          <div className="fun-facts">
            <h3>💡 Did you know?</h3>
            <p>{tips[currentTip]}</p>
          </div>
        </div>
      )}

      {result && <ResultDisplay data={result} onReset={handleReset} />}
    </div>
  );
};

export default UploadForm;
