import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <motion.div
        className="intro-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="typewriter">Welcome to BlockLearner</h1>
      </motion.div>
      <Link to="/home" className="enter-button">
        Enter
      </Link>
    </div>
  );
};

export default LandingPage;
