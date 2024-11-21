import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrophy, FaMedal } from 'react-icons/fa';
import styles from './Modal.module.css';

const LeaderboardModal = ({ onClose }) => {
  // Mock leaderboard data - replace with real data from backend
  const [leaderboardData] = useState([
    { id: 1, name: 'Alex Chen', points: 850, level: 9, achievements: 12 },
    { id: 2, name: 'Sarah Johnson', points: 720, level: 8, achievements: 10 },
    { id: 3, name: 'Mike Brown', points: 690, level: 7, achievements: 9 },
    { id: 4, name: 'Emma Wilson', points: 560, level: 6, achievements: 8 },
    { id: 5, name: 'David Lee', points: 480, level: 5, achievements: 7 },
  ]);

  const getPositionIcon = (position) => {
    switch (position) {
      case 0:
        return <FaTrophy className={styles.goldTrophy} />;
      case 1:
        return <FaMedal className={styles.silverMedal} />;
      case 2:
        return <FaMedal className={styles.bronzeMedal} />;
      default:
        return <span className={styles.position}>{position + 1}</span>;
    }
  };

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
            <h2>Community Leaderboard</h2>
            <button className={styles.closeButton} onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div className={styles.modalContent}>
            <div className={styles.leaderboardList}>
              {leaderboardData.map((user, index) => (
                <motion.div
                  key={user.id}
                  className={styles.leaderboardItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={styles.leaderboardPosition}>
                    {getPositionIcon(index)}
                  </div>
                  <div className={styles.leaderboardInfo}>
                    <h3>{user.name}</h3>
                    <div className={styles.userStats}>
                      <span>Level {user.level}</span>
                      <span>{user.points} Points</span>
                      <span>{user.achievements} Achievements</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LeaderboardModal;
