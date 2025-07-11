import './About.css';

const About = () => {
  const sections = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'features', label: 'Key Features' },
    { id: 'usage', label: 'How to Use' },
    { id: 'working', label: 'How It Works' },
    { id: 'demo', label: 'Demo Video' },
  ];

  const handleNavClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="about-container dark-theme">
      <aside className="about-nav">
        <nav>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <button onClick={() => handleNavClick(section.id)}>{section.label}</button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="about-content">
        <section id="introduction">
          <h2>Introduction</h2>
          <p>
            In an era where digital media is rapidly evolving, deepfakes pose a serious threat to trust,
            authenticity, and digital integrity. Our Deepfake Detection System is an AI-powered web platform
            designed to help users verify the authenticity of videos. By leveraging advanced deep learning
            techniques, the system analyzes uploaded videos and classifies them as either real or manipulated
            using synthetic methods. This tool aims to protect individuals and organizations from misinformation
            and fake content circulating online.
          </p>
        </section>

        <section id="features">
          <h2>Key Features</h2>
          <ul>
            <li>Easy video upload and analysis</li>
            <li>Real-time prediction results</li>
            <li>Clean, intuitive user interface</li>
            <li>Confidence level for each prediction</li>
          </ul>
        </section>

        <section id="usage">
          <h2>How to Use the System</h2>
          <ol>
            <li>Go to the Upload Page</li>
            <li>Click Upload and select your video file (.mp4, .avi, etc.)</li>
            <li>Click Submit to start the analysis</li>
            <li>Wait a few seconds while the AI processes your video</li>
            <li>View the result: Real or Fake with a confidence score</li>
          </ol>
        </section>

        <section id="working">
          <h2>How It Works</h2>
          <p>
            The system extracts frames from the uploaded video and processes them through a deep learning model
            trained on both real and fake video datasets. It uses computer vision to detect subtle patterns in the
            visual and temporal features of the frames. The model then makes a final prediction based on learned
            characteristics, displaying the result along with a confidence level.
          </p>
          <div className="flow-diagram">
            <pre>
[Upload Video] → [AI Analysis] → [Prediction] → [Result Shown]
            </pre>
          </div>
        </section>

        <section id="demo">
          <h2>Demo Video</h2>
          <p>A short demo video showing how to use the system will be added here soon.</p>
        </section>
      </main>
    </div>
  );
};

export default About;