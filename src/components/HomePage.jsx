// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar1';
import SparklesPreview from './SparklesPreview';
import './HomePage.css';
import { FirstPage } from './pages/firstpage/FirstPage';
import {CommunityFeatures} from './pages/communityFeatures/CommunityFeatures';
import { FeaturesSection } from './pages/featuressection/FeatureSection';
import { Footer } from './pages/footer/Footer';
import { FAQSection } from './pages/faqsection/FAQSection';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY;

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop - sectionHeight / 3) {
          setActiveSection(index + 1);
          section.classList.add('scroll-active');
        } else {
          section.classList.remove('scroll-active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index) => {
    const sections = document.querySelectorAll('section');
    if (sections[index - 1]) {
      sections[index - 1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      <Navbar />
      <div className="side-icons">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div
            key={num}
            className={`side-icon ${activeSection === num ? 'active' : ''}`}
            onClick={() => scrollToSection(num)}
          />
        ))}
      </div>
      <section><div className="section1">
        <SparklesPreview />
      </div></section>
      <section><div className='section2'><FirstPage /></div></section>
      <section><div className='section3'><CommunityFeatures /></div></section>
      <section><div className='section4'><FeaturesSection /></div></section>
      <section><div className='section5'><FAQSection /></div></section>
      <section><div className='section6'><Footer /></div></section>
    </div>
  );
};

export default HomePage;
