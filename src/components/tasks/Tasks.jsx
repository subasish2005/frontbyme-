import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaSortAmountDown, FaTrophy, FaUsers, FaChartLine } from 'react-icons/fa';
import TaskCard from './TaskCard';
import AchievementModal from './AchievementModal';
import LeaderboardModal from './LeaderboardModal';
import TaskSubmissionModal from './TaskSubmissionModal';
import styles from './Tasks.module.css';
import { auth } from '../../firebase';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Create Educational Content',
      description: 'Develop and share a tutorial or guide about blockchain technology.',
      difficulty: 'Medium',
      rewards: 50,
      deadline: '7 days',
      status: 'open',
      category: 'content',
      requiredSkills: ['Writing', 'Blockchain'],
      collaborators: [],
      submissions: []
    },
    {
      id: 2,
      title: 'Community Support',
      description: 'Help answer questions in the community forum and assist new members.',
      difficulty: 'Easy',
      rewards: 30,
      deadline: '3 days',
      status: 'open',
      category: 'support',
      requiredSkills: ['Communication'],
      collaborators: [],
      submissions: []
    },
    {
      id: 3,
      title: 'Code Review',
      description: 'Review and provide feedback on community submitted code samples.',
      difficulty: 'Hard',
      rewards: 100,
      deadline: '5 days',
      status: 'open',
      category: 'development',
      requiredSkills: ['Programming', 'Code Review'],
      collaborators: [],
      submissions: []
    }
  ]);

  const [userPoints, setUserPoints] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');
  const [userTasks, setUserTasks] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [userLevel, setUserLevel] = useState(1);
  const [userProgress, setUserProgress] = useState(0);

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || task.difficulty.toLowerCase() === filterDifficulty;
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    return matchesSearch && matchesDifficulty && matchesStatus && matchesCategory;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        return parseInt(a.deadline) - parseInt(b.deadline);
      case 'rewards':
        return b.rewards - a.rewards;
      case 'difficulty':
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      default:
        return 0;
    }
  });

  const handleAcceptTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.status === 'open') {
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t.id === taskId ? { ...t, status: 'in-progress', collaborators: [...t.collaborators, auth.currentUser.uid] } : t
        )
      );
      setUserTasks(prev => [...prev, taskId]);
      checkAchievements('task_accepted');
    }
  };

  const handleCompleteTask = (taskId) => {
    setSelectedTask(tasks.find(t => t.id === taskId));
    setShowSubmissionModal(true);
  };

  const handleSubmitTask = (taskId, submissionData) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.status === 'in-progress') {
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t.id === taskId ? {
            ...t,
            status: 'completed',
            submissions: [...t.submissions, { ...submissionData, userId: auth.currentUser.uid }]
          } : t
        )
      );
      
      // Award points and update progress
      const newPoints = userPoints + task.rewards;
      setUserPoints(newPoints);
      updateUserLevel(newPoints);
      checkAchievements('task_completed');
    }
  };

  const updateUserLevel = (points) => {
    const newLevel = Math.floor(points / 100) + 1;
    const progress = (points % 100) / 100;
    
    if (newLevel > userLevel) {
      checkAchievements('level_up');
    }
    
    setUserLevel(newLevel);
    setUserProgress(progress);
  };

  const checkAchievements = (action) => {
    const newAchievements = [];
    
    switch (action) {
      case 'task_completed':
        if (!achievements.includes('first_task')) {
          newAchievements.push({
            id: 'first_task',
            title: 'First Task Completed',
            description: 'Complete your first community task',
            icon: '🎉'
          });
        }
        break;
      case 'level_up':
        newAchievements.push({
          id: `level_${userLevel}`,
          title: `Reached Level ${userLevel}`,
          description: 'Keep growing and learning!',
          icon: '⭐'
        });
        break;
      default:
        break;
    }
    
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
      setShowAchievementModal(true);
    }
  };

  return (
    <div className={styles.tasksContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Community Tasks</h1>
        <p className={styles.subtitle}>Complete tasks to earn rewards and help the community grow</p>
        
        <div className={styles.userStats}>
          <div className={styles.pointsDisplay}>
            <span className={styles.pointsLabel}>Level {userLevel}</span>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${userProgress * 100}%` }}
              />
            </div>
            <motion.span 
              className={styles.pointsValue}
              key={userPoints}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {userPoints} Points
            </motion.span>
          </div>
          
          <div className={styles.statsButtons}>
            <button 
              className={styles.statsButton}
              onClick={() => setShowAchievementModal(true)}
            >
              <FaTrophy /> Achievements
            </button>
            <button 
              className={styles.statsButton}
              onClick={() => setShowLeaderboardModal(true)}
            >
              <FaChartLine /> Leaderboard
            </button>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filters}>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Categories</option>
              <option value="content">Content Creation</option>
              <option value="support">Community Support</option>
              <option value="development">Development</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="deadline">Sort by Deadline</option>
              <option value="rewards">Sort by Rewards</option>
              <option value="difficulty">Sort by Difficulty</option>
            </select>
          </div>
        </div>
      </motion.div>
      
      <AnimatePresence>
        <div className={styles.tasksGrid}>
          {sortedTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <TaskCard
                task={task}
                onAccept={() => handleAcceptTask(task.id)}
                onComplete={() => handleCompleteTask(task.id)}
                isAccepted={userTasks.includes(task.id)}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {showAchievementModal && (
        <AchievementModal
          achievements={achievements}
          onClose={() => setShowAchievementModal(false)}
        />
      )}

      {showLeaderboardModal && (
        <LeaderboardModal
          onClose={() => setShowLeaderboardModal(false)}
        />
      )}

      {showSubmissionModal && selectedTask && (
        <TaskSubmissionModal
          task={selectedTask}
          onSubmit={(data) => handleSubmitTask(selectedTask.id, data)}
          onClose={() => {
            setShowSubmissionModal(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default Tasks;
