// SparklesPreview.jsx
import SparklesCore from './SparklesCore'; 
import './SparklesPreview.css';

function SparklesPreview() {
  return (
    <div className="sparkles-preview-container">
      <div className="sparkles-wrapper">
        <div className="gradient1"></div>
        <div className="gradient2"></div>
        <div className="gradient3"></div>
        <div className="gradient4"></div>
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={200}
          className="sparkles-core"
          particleColor="#FFFFFF"
        />
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="side-text side-text-left">Discover BlockLearner</div>
      <div className="side-text side-text-right">Innovate • Create • Learn</div>

      <div className="text-content">
        <h1 className="sparkles-title">BlockLearner</h1>
        <p className="sparkles-subtitle">Empowering the Future of Web3</p>
        <p className="sparkles-description">
          Embark on a journey through blockchain technology with our innovative learning platform. 
          Master smart contracts, DeFi protocols, and Web3 development through hands-on experience 
          and expert-guided tutorials.
        </p>
      </div>
    </div>
  );
}

export default SparklesPreview;
