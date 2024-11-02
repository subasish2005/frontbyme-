// SparklesPreview.jsx
import SparklesCore from "./SparklesCore";
import "./SparklesPreview.css";

export const SparklesPreview = () => {
  return (
    <div className="sparkles-container">
      <div className="particles-background">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="sparkles-heading">
        Build great products
      </h1>
    </div>
  );
};

export default SparklesPreview;
