
import './landing.css';
import { Link } from 'react-router-dom';
const Landing=() =>{
    return(
        <div className="land-cont">
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