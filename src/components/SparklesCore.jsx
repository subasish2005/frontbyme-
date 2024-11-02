// SparklesCore.jsx
// SparklesCore.jsx
import { useId, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion, useAnimation } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const SparklesCore = ({
  id,
  className,
  background = "#0d47a1",
  minSize = 0.6,
  maxSize = 1.4,
  speed = 4,
  particleColor = "#ffffff",
  particleDensity = 100,
}) => {
  const [init, setInit] = useState(false);
  const controls = useAnimation();
  const generatedId = useId();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: { duration: 1 },
      });
    }
  };

  return (
    <motion.div animate={controls} className={`opacity-0 ${className}`}>
      {init && (
        <Particles
          id={id || generatedId}
          className="particles-background"
          particlesLoaded={particlesLoaded}
          options={{
            background: { color: { value: background } },
            fullScreen: { enable: false, zIndex: 1 },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: { enable: true, mode: "push" },
                resize: true,
              },
              modes: {
                push: { quantity: 4 },
                repulse: { distance: 200, duration: 0.4 },
              },
            },
            particles: {
              color: { value: particleColor },
              number: {
                density: { enable: true, width: 400, height: 400 },
                value: particleDensity,
              },
              opacity: {
                value: { min: 0.1, max: 1 },
                animation: {
                  enable: true,
                  speed: speed,
                  sync: false,
                  startValue: "random",
                },
              },
              size: {
                value: { min: minSize, max: maxSize },
              },
              move: {
                enable: true,
                speed: { min: 0.1, max: 1 },
                direction: "none",
              },
              shape: {
                type: "circle",
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
};

// Define prop types
SparklesCore.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  background: PropTypes.string,
  minSize: PropTypes.number,
  maxSize: PropTypes.number,
  speed: PropTypes.number,
  particleColor: PropTypes.string,
  particleDensity: PropTypes.number,
};

export default SparklesCore;
