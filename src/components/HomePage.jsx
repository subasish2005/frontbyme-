import Navbar from './Navbar/Navbar1';
import SparklesPreview from './SparklesPreview';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <div className="section">
      <SparklesPreview /></div>
    </div>
  );
};

export default HomePage;

