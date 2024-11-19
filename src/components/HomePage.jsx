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
     <section> <div className="section1">
      <SparklesPreview />
      </div></section>
      <section><div className='section2'><Hero /></div></section>
      <section><div className='section3'><CommunityFeatures /></div></section>
      <section> <div className='section4'><FeaturesSection /></div></section>
      <section><div className='section5'><Faq /></div></section>
      <section><div className='section6'><Footer /></div></section>
      
    </div>
  );
};

export default HomePage;

