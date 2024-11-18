// SparklesPreview.jsx
import SparklesCore from './SparklesCore'; 
import './SparklesPreview.css';

function SparklesPreview() {
  return (
    <div className="sparkles-preview-container">
      <h1 className="sparkles-title">BlockLearner</h1>
      <div className="sparkles-wrapper">
        <div className="gradient1"></div>
        <div className="gradient2"></div>
        <div className="gradient3"></div>
        <div className="gradient4"></div>
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={1500}
          className="sparkles-core"
          particleColor="#FFFFFF"
        />
        <div className="radial-gradient-overlay"></div>
      </div>
    </div>
  );
}

export default SparklesPreview;



