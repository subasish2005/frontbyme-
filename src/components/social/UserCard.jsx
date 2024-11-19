
import { motion } from 'framer-motion';
import { FaUserPlus, FaUserFriends, FaTrophy } from 'react-icons/fa';
import PropTypes from 'prop-types';

const UserCard = ({ user, onSelect, onSendRequest, isFriend }) => {
  return (
    <motion.div 
      className="user-card"
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        boxShadow: '0 8px 16px rgba(0, 243, 255, 0.2)'
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-content" onClick={onSelect}>
        <div className="user-avatar">
          <img src={user.photoURL || '/default-avatar.png'} alt={user.displayName} />
          {user.isOnline && <div className="online-indicator" />}
        </div>
        <div className="user-info">
          <h3>{user.displayName}</h3>
          <p className="user-level">Level {user.level || 1}</p>
          {user.achievements && (
            <div className="achievements-preview">
              <FaTrophy className="trophy-icon" />
              <span>{user.achievements.length} achievements</span>
            </div>
          )}
        </div>
      </div>
      <div className="card-actions">
        {!isFriend ? (
          <motion.button
            className="add-friend-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onSendRequest();
            }}
          >
            <FaUserPlus />
            Add Friend
          </motion.button>
        ) : (
          <button className="friend-status" disabled>
            <FaUserFriends />
            Friends
          </button>
        )}
      </div>
    </motion.div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    level: PropTypes.number,
    achievements: PropTypes.array,
    isOnline: PropTypes.bool
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onSendRequest: PropTypes.func.isRequired,
  isFriend: PropTypes.bool.isRequired
};

export default UserCard;
