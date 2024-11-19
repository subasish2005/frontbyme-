import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const FriendRequest = ({ request, onAccept }) => {
  const [senderData, setSenderData] = useState(null);

  useEffect(() => {
    const fetchSenderData = async () => {
      try {
        const senderDoc = await getDoc(doc(db, 'users', request.senderId));
        if (senderDoc.exists()) {
          setSenderData(senderDoc.data());
        }
      } catch (error) {
        console.error('Error fetching sender data:', error);
      }
    };

    fetchSenderData();
  }, [request.senderId]);

  if (!senderData) return null;

  return (
    <motion.div 
      className="friend-request"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="request-content">
        <div className="sender-avatar">
          <img src={senderData.photoURL || '/default-avatar.png'} alt={senderData.displayName} />
        </div>
        <div className="sender-info">
          <h4>{senderData.displayName}</h4>
          <p>{senderData.level ? `Level ${senderData.level}` : 'New User'}</p>
        </div>
      </div>
      <div className="request-actions">
        <motion.button
          className="accept-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAccept}
        >
          <FaUserPlus />
        </motion.button>
        <motion.button
          className="reject-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaTimes />
        </motion.button>
      </div>
    </motion.div>
  );
};

FriendRequest.propTypes = {
  request: PropTypes.shape({
    senderId: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Date)
  }).isRequired,
  onAccept: PropTypes.func.isRequired
};

export default FriendRequest;
