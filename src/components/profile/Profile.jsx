import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { 
  FaUser, 
  FaEnvelope, 
  FaEdit, 
  FaSave, 
  FaTimes, 
  FaTasks,
  FaCalendarAlt, 
  FaUserGraduate, 
  FaMedal, 
  FaStar, 
  FaCheckCircle, 
  FaChartLine,
  FaFire,

} from 'react-icons/fa';
import SidebarDemo from '../Navbar/SidebarDemo';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    bio: '',
    role: 'student',
    joinedDate: new Date().toISOString().split('T')[0],
    tasks: {
      completed: 15,
      inProgress: 5,
      total: 25
    },
    points: {
      total: 1250,
      thisMonth: 450,
      streak: 7
    },
    badges: [
      {
        name: 'Task Master',
        description: 'Completed 10 tasks in a row',
        points: 500,
        date: '2023-12-01',
        icon: 'FaMedal'
      },
      {
        name: 'Point Hunter',
        description: 'Earned 1000 points',
        points: 300,
        date: '2023-12-05',
        icon: 'FaStar'
      },
      {
        name: 'Early Bird',
        description: 'Completed 5 tasks before deadline',
        points: 450,
        date: '2023-12-10',
        icon: 'FaCheckCircle'
      }
    ],
    level: 'Intermediate'
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setProfileData(prev => ({
          ...prev,
          displayName: user.displayName || 'BlockLearner User',
          email: user.email,
        }));
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to your backend
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-layout">
      <SidebarDemo isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`profile-main ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
        <div className="profile-container">
          <div className="profile-header">
            <div className="header-content">
              <div className="profile-avatar">
                <FaUser className="avatar-icon" />
              </div>
              <div className="header-text">
                <h1>{profileData.displayName}</h1>
                <span className="user-level">
                  <FaUserGraduate /> {profileData.level} Learner
                </span>
              </div>
            </div>
            {!isEditing ? (
              <button onClick={handleEdit} className="edit-button">
                <FaEdit /> Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button onClick={handleSave} className="save-button">
                  <FaSave /> Save
                </button>
                <button onClick={handleCancel} className="cancel-button">
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </div>

          <div className="profile-grid">
            <div className="profile-section main-info">
              <h2>Personal Information</h2>
              <div className="profile-info">
                <div className="info-group">
                  <label>
                    <FaUser /> Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="displayName"
                      value={profileData.displayName}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{profileData.displayName}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>
                    <FaEnvelope /> Email
                  </label>
                  <span>{profileData.email}</span>
                </div>
                <div className="info-group">
                  <label>
                    <FaCalendarAlt /> Joined Date
                  </label>
                  <span>{profileData.joinedDate}</span>
                </div>
                <div className="info-group">
                  <label>About Me</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <span className="bio">{profileData.bio || 'No bio added yet'}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section stats-section">
              <h2><FaTasks /> Task Statistics</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaCheckCircle />
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{profileData.tasks.completed}</span>
                    <span className="stat-label">Completed Tasks</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaChartLine />
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{profileData.tasks.inProgress}</span>
                    <span className="stat-label">Tasks in Progress</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-section points-section">
              <h2><FaStar /> Points Overview</h2>
              <div className="points-grid">
                <div className="point-card total-points">
                  <div className="point-icon">
                    <FaStar />
                  </div>
                  <div className="point-info">
                    <span className="point-value">{profileData.points.total}</span>
                    <span className="point-label">Total Points</span>
                  </div>
                </div>
                <div className="point-card">
                  <div className="point-icon">
                    <FaChartLine />
                  </div>
                  <div className="point-info">
                    <span className="point-value">{profileData.points.thisMonth}</span>
                    <span className="point-label">Points this Month</span>
                  </div>
                </div>
                <div className="point-card">
                  <div className="point-icon">
                    <FaFire />
                  </div>
                  <div className="point-info">
                    <span className="point-value">{profileData.points.streak}</span>
                    <span className="point-label">Day Streak</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-section badges-section">
              <h2><FaMedal /> Earned Badges</h2>
              <div className="badges-grid">
                {profileData.badges.map((badge, index) => (
                  <div key={index} className="badge-card">
                    <div className="badge-icon">
                      {badge.icon === 'FaMedal' && <FaMedal />}
                      {badge.icon === 'FaStar' && <FaStar />}
                      {badge.icon === 'FaCheckCircle' && <FaCheckCircle />}
                    </div>
                    <div className="badge-info">
                      <h3>{badge.name}</h3>
                      <p className="badge-description">{badge.description}</p>
                      <div className="badge-points">
                        <FaStar className="point-icon" />
                        <span>{badge.points} points</span>
                      </div>
                      <span className="badge-date">Earned on {new Date(badge.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
