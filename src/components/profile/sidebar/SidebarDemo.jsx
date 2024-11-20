import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBook, FaTrophy, FaCog, FaChevronLeft, FaChevronRight, FaBell } from 'react-icons/fa';
import NotificationPanel from '../../notifications/NotificationPanel';
import './SidebarDemo.css';

const SidebarDemo = ({ isOpen, toggleSidebar }) => {
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2); // This would normally come from your notification system

  const toggleNotificationPanel = () => {
    setIsNotificationPanelOpen(!isNotificationPanelOpen);
  };

  const handleNotificationRead = () => {
    setUnreadCount(0);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
        
        <div className="sidebar-content">
          <div className="sidebar-header">
            <h3>BlockLearner</h3>
          </div>

          <nav className="sidebar-nav">
            <Link to="/" className="nav-item">
              <FaHome className="nav-icon" />
              <span className="nav-text">Home</span>
            </Link>

            <Link to="/courses" className="nav-item">
              <FaBook className="nav-icon" />
              <span className="nav-text">Courses</span>
            </Link>

            <Link to="/achievements" className="nav-item">
              <FaTrophy className="nav-icon" />
              <span className="nav-text">Achievements</span>
            </Link>

            <button className="nav-item notification-button" onClick={toggleNotificationPanel}>
              <div className="notification-icon-wrapper">
                <FaBell className="nav-icon" />
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </div>
              <span className="nav-text">Notifications</span>
            </button>

            <Link to="/settings" className="nav-item">
              <FaCog className="nav-icon" />
              <span className="nav-text">Settings</span>
            </Link>
          </nav>
        </div>
      </div>

      {isNotificationPanelOpen && (
        <NotificationPanel onClose={toggleNotificationPanel} onNotificationRead={handleNotificationRead} />
      )}
    </>
  );
};

export default SidebarDemo;
