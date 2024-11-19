import Navbar from './Navbar/Navbar1';
import SparklesPreview from './SparklesPreview';
import './HomePage.css';
import { Hero } from './pages/firstpage/Hero';
import {CommunityFeatures} from './pages/communityFeatures/CommunityFeatures';
import { FeaturesSection } from './pages/featuressection/FeatureSection';
import { Faq } from './pages/faqsection/Faq';
import { Footer } from './pages/footer/Footer';
const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <div className="section">
      <SparklesPreview />
      </div>
      <div><Hero /></div>
      <div><CommunityFeatures /></div>
      <div><FeaturesSection /></div>
      <div><Faq /></div>
      <div><Footer /></div>
      
    </div>
  );
};

export default HomePage;

