import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import styles from './Modal.module.css';

const AchievementModal = ({ achievements, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.modal}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className={styles.modalHeader}>
            <h2>Achievements</h2>
            <button className={styles.closeButton} onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div className={styles.modalContent}>
            {achievements.length === 0 ? (
              <p className={styles.emptyMessage}>
                No achievements yet. Complete tasks to earn achievements!
              </p>
            ) : (
              <div className={styles.achievementsList}>
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className={styles.achievementItem}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span className={styles.achievementIcon}>{achievement.icon}</span>
                    <div className={styles.achievementInfo}>
                      <h3>{achievement.title}</h3>
                      <p>{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AchievementModal;
