import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserFriends, FaUserPlus, FaUserMinus, FaChevronDown, FaEnvelope, FaTrophy, FaCalendarAlt, FaTasks } from 'react-icons/fa';
import './Friends.css';

const FriendCard = ({ friend, isExpanded, onFriendClick }) => {
  FriendCard.propTypes = {
    friend: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
      points: PropTypes.number.isRequired,
      joinedDate: PropTypes.string.isRequired,
      completedTasks: PropTypes.number.isRequired
    }).isRequired,
    isExpanded: PropTypes.bool.isRequired,
    onFriendClick: PropTypes.func.isRequired
  };

  return (
    <motion.div 
      className="friend-card"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="friend-header" 
        onClick={() => onFriendClick(friend.id)}
      >
        <div className="friend-avatar-container">
          <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
        </div>
        <div className="friend-basic-info">
          <h3>{friend.name}</h3>
          <div className="level-badge">Level {friend.level}</div>
        </div>
        <motion.div 
          className="expand-icon"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown />
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="friend-details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="detail-grid">
              <div className="detail-item">
                <FaEnvelope className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{friend.email}</span>
                </div>
              </div>
              <div className="detail-item">
                <FaTrophy className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Points</span>
                  <span className="detail-value">{friend.points}</span>
                </div>
              </div>
              <div className="detail-item">
                <FaCalendarAlt className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Joined</span>
                  <span className="detail-value">{friend.joinedDate}</span>
                </div>
              </div>
              <div className="detail-item">
                <FaTasks className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Tasks</span>
                  <span className="detail-value">{friend.completedTasks} completed</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const RequestCard = ({ request, onAccept, onReject }) => {
  RequestCard.propTypes = {
    request: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired
    }).isRequired,
    onAccept: PropTypes.func.isRequired,
    onReject: PropTypes.func.isRequired
  };

  return (
    <motion.div 
      className="request-card"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="friend-avatar-container">
        <img src={request.avatar} alt={request.name} className="friend-avatar" />
      </div>
      <div className="request-info">
        <h3>{request.name}</h3>
        <div className="level-badge">Level {request.level}</div>
      </div>
      <div className="request-actions">
        <motion.button 
          className="accept-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAccept(request.id)}
        >
          <FaUserPlus />
          <span>Accept</span>
        </motion.button>
        <motion.button 
          className="reject-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onReject(request.id)}
        >
          <FaUserMinus />
          <span>Decline</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

const Friends = () => {
  const [expandedFriend, setExpandedFriend] = useState(null);
  const [activeTab, setActiveTab] = useState('friends');

  // Mock data - replace with actual data from your backend
  const friendsList = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=b6e3f4",
      level: 15,
      points: 1200,
      joinedDate: "2023-01-15",
      completedTasks: 45
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane&backgroundColor=c0aede",
      level: 12,
      points: 980,
      joinedDate: "2023-02-20",
      completedTasks: 38
    }
  ];

  const friendRequests = [
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice&backgroundColor=ffdfbf",
      level: 8
    }
  ];

  const handleFriendClick = (friendId) => {
    setExpandedFriend(expandedFriend === friendId ? null : friendId);
  };

  const handleAcceptRequest = (requestId) => {
    // Implement accept friend request logic
    console.log('Accepted request:', requestId);
  };

  const handleRejectRequest = (requestId) => {
    // Implement reject friend request logic
    console.log('Rejected request:', requestId);
  };

  return (
    <div className="friends-container">
      <div className="friends-header">
        <motion.button 
          className={`tab ${activeTab === 'friends' ? 'active' : ''}`}
          onClick={() => setActiveTab('friends')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaUserFriends />
          <span>Friends ({friendsList.length})</span>
        </motion.button>
        <motion.button 
          className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaUserPlus />
          <span>Requests ({friendRequests.length})</span>
        </motion.button>
      </div>

      <motion.div 
        className="friends-content"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'friends' ? (
          <div className="friends-list">
            {friendsList.map(friend => (
              <FriendCard 
                key={friend.id} 
                friend={friend} 
                isExpanded={expandedFriend === friend.id}
                onFriendClick={handleFriendClick}
              />
            ))}
          </div>
        ) : (
          <div className="requests-list">
            {friendRequests.map(request => (
              <RequestCard 
                key={request.id} 
                request={request}
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Friends;
