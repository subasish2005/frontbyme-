import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaStar, FaCheck } from 'react-icons/fa';
import styles from './TaskCard.module.css';

const TaskCard = ({ task, onAccept, onComplete, isAccepted }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return styles.easy;
      case 'medium':
        return styles.medium;
      case 'hard':
        return styles.hard;
      default:
        return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return styles.completed;
      case 'in-progress':
        return styles.inProgress;
      default:
        return styles.open;
    }
  };

  return (
    <motion.div
      className={styles.taskCard}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={styles.taskHeader}>
        <h3 className={styles.taskTitle}>{task.title}</h3>
        <div className={styles.badges}>
          <span className={`${styles.difficulty} ${getDifficultyColor(task.difficulty)}`}>
            {task.difficulty}
          </span>
          <span className={`${styles.status} ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
      </div>
      
      <p className={styles.description}>{task.description}</p>
      
      <div className={styles.taskFooter}>
        <div className={styles.taskInfo}>
          <div className={styles.infoItem}>
            <FaClock className={styles.icon} />
            <span className={styles.value}>{task.deadline}</span>
          </div>
          <div className={styles.infoItem}>
            <FaStar className={styles.icon} />
            <span className={styles.value}>{task.rewards} points</span>
          </div>
        </div>

        {task.status === 'open' && !isAccepted && (
          <motion.button
            className={styles.acceptButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAccept}
          >
            Accept Task
          </motion.button>
        )}

        {task.status === 'in-progress' && (
          <motion.button
            className={`${styles.acceptButton} ${styles.completeButton}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
          >
            <FaCheck className={styles.checkIcon} />
            Complete Task
          </motion.button>
        )}

        {task.status === 'completed' && (
          <div className={styles.completedBadge}>
            <FaCheck className={styles.checkIcon} />
            Completed
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;
