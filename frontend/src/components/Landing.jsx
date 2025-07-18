
import './landing.css';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import aiFace from '../assets/Anima Bot.json';
const Landing=() =>{
    return(
        <div className="land-cont">

            <div className="bg-circuits"></div>

            <div className="left-visual">
                <Lottie animationData={aiFace} loop={true} className="ai-lottie" />
                <p className="ai-tagline">👁️ AI Guardian Against Digital Deception</p>
            </div>
            <div className="land-content">
                <h1>WELCOME!</h1>
                <h2>DEEPFAKE DETECTION</h2>
                <p>Upload. Analyze. Uncover the Unseen Truth</p>
                <Link to="/upload" className="try-button">Try it now</Link>
            </div>
        </div>
    )
}

export default Landing;