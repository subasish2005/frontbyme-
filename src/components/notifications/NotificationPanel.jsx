import React, { useState } from 'react';
import { FaBell, FaTimes, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import './NotificationPanel.css';

const NotificationPanel = ({ isOpen, togglePanel }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'achievement',
      title: 'New Badge Earned!',
      message: 'Congratulations! You\'ve earned the "Quick Learner" badge.',
      time: '2 hours ago',
      icon: <FaCheckCircle />,
      read: false
    },
    {
      id: 2,
      type: 'course',
      title: 'Course Update',
      message: 'New content available in "Blockchain Basics"',
      time: '1 day ago',
      icon: <FaInfoCircle />,
      read: false
    },
    {
      id: 3,
      type: 'alert',
      title: 'Task Due Soon',
      message: 'Your assignment "Smart Contract Development" is due in 2 days.',
      time: '3 days ago',
      icon: <FaExclamationCircle />,
      read: true
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'achievement':
        return '#00ff9d';
      case 'course':
        return '#00f3ff';
      case 'alert':
        return '#ff00ff';
      default:
        return '#7d12ff';
    }
  };

  return (
    <div className={`notification-panel ${isOpen ? 'open' : ''}`}>
      <div className="notification-header">
        <h3>
          <FaBell className="bell-icon" />
          Notifications
        </h3>
        <button className="close-button" onClick={togglePanel}>
          <FaTimes />
        </button>
      </div>

      <div className="notification-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            No new notifications
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
              style={{ '--type-color': getTypeColor(notification.type) }}
            >
              <div className="notification-icon" style={{ color: getTypeColor(notification.type) }}>
                {notification.icon}
              </div>
              <div className="notification-content">
                <h4>{notification.title}</h4>
                <p>{notification.message}</p>
                <span className="notification-time">{notification.time}</span>
              </div>
              <div className="notification-actions">
                {!notification.read && (
                  <button
                    className="mark-read-button"
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                  >
                    <FaCheckCircle />
                  </button>
                )}
                <button
                  className="delete-button"
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete notification"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
