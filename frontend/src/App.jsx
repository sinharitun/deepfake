
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import UploadForm from './components/UploadForm';
import Navbar from './components/Navbar';
import About from './components/About';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <main>
          
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/upload" element={<UploadForm />} />
            <Route path="/about" element={<About />} />
          </Routes>

        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
