import React from 'react';
import './ResultDisplay.css';

const ResultDisplay = ({ data, onReset }) => {
  const { videoURL, prediction, confidence, totalFrames } = data;

  return (
    <div className="result-container">
      <h2>Prediction Result</h2>

      <video className="preview-video" src={videoURL} controls />

      <div className="result-info">
        <p><strong>Total Frames Analyzed:</strong> {totalFrames}</p>
        <p><strong>Prediction:</strong> {prediction === 'Fake' ? '❌ Fake Video Detected' : '✅ This video appears Real'}</p>

        <p><strong>Confidence:</strong> {confidence.toFixed(2)}%</p>
      </div>

      <button className="reupload-button" onClick={onReset}>Re-upload Video</button>
    </div>
  );
};

export default ResultDisplay;