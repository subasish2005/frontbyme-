import { Link } from 'react-router-dom';
import './Navbar.css';
// import logo from '../assets/images/logo.png'; // Assuming you have a logo image in assets

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* <img src={logo} alt="BlockLearner Logo" /> */}
      </div>
      <div className="navbar-links">
        <Link to="/infrastructure">Infrastructure</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/about">About</Link>
        <Link to="/developers">Developers</Link>
        <Link to="/token">Token</Link>
      </div>
      <div className="navbar-register">
        <button>Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
