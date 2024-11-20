import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {  FaSearch } from 'react-icons/fa';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import UserCard from './UserCard';
import FriendRequest from './FriendRequest';
import './Social.css';

const Social = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.currentUser) {
      fetchUsers();
      fetchFriendRequests();
      fetchFriends();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('uid', '!=', auth.currentUser?.uid));
      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        level: Math.floor(Math.random() * 10) + 1, // Temporary random level
        achievements: Array(Math.floor(Math.random() * 5) + 1).fill(null), // Temporary random achievements
        isOnline: Math.random() > 0.5 // Temporary random online status
      }));
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const requestsRef = collection(db, 'friendRequests');
      const q = query(requestsRef, where('receiverId', '==', auth.currentUser?.uid));
      const querySnapshot = await getDocs(q);
      const requests = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFriendRequests(requests);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  const fetchFriends = async () => {
    try {
      const friendsRef = collection(db, 'friends');
      const q = query(friendsRef, where('userId', '==', auth.currentUser?.uid));
      const querySnapshot = await getDocs(q);
      const friendsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFriends(friendsData);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const sendFriendRequest = async (receiverId) => {
    try {
      const requestsRef = collection(db, 'friendRequests');
      await addDoc(requestsRef, {
        senderId: auth.currentUser?.uid,
        receiverId,
        status: 'pending',
        timestamp: new Date()
      });
      // Update UI
      fetchFriendRequests();
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const acceptFriendRequest = async (requestId) => {
    try {
      const requestRef = doc(db, 'friendRequests', requestId);
      const requestDoc = await getDoc(requestRef);
      const requestData = requestDoc.data();

      // Add to friends collection
      const friendsRef = collection(db, 'friends');
      await addDoc(friendsRef, {
        userId: auth.currentUser?.uid,
        friendId: requestData.senderId,
        timestamp: new Date()
      });

      // Delete the request
      await deleteDoc(requestRef);

      // Update UI
      fetchFriendRequests();
      fetchFriends();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!auth.currentUser) {
    return (
      <div className="social-container">
        <h2>Please log in to access the social features.</h2>
      </div>
    );
  }

  return (
    <div className="social-container">
      <motion.div 
        className="search-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <div className="social-content">
        <motion.div 
          className="users-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Community Members</h2>
          <div className="users-grid">
            {loading ? (
              <div className="loading-spinner">Loading...</div>
            ) : (
              filteredUsers.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  onSelect={() => setSelectedUser(user)}
                  onSendRequest={() => sendFriendRequest(user.id)}
                  isFriend={friends.some(f => f.friendId === user.id)}
                />
              ))
            )}
          </div>
        </motion.div>

        <motion.div 
          className="friend-requests-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2>Friend Requests</h2>
          <div className="requests-list">
            {friendRequests.length === 0 ? (
              <p className="no-requests">No pending friend requests</p>
            ) : (
              friendRequests.map(request => (
                <FriendRequest
                  key={request.id}
                  request={request}
                  onAccept={() => acceptFriendRequest(request.id)}
                />
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Social;
