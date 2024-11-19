import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./DropdownMenu.css";

const DropdownMenu = ({ label, links, active, setActive }) => {
  const isActive = active === label;

  return (
    <div
      className="dropdown-container"
      onMouseEnter={() => setActive(label)}
      onMouseLeave={() => setActive(null)}
    >
      <button className="dropdown-label">{label}</button>
      <div className={`dropdown-menu ${isActive ? 'show' : ''}`}>
        {links.map((link, index) => (
          <Link key={index} to={link.href} className="dropdown-link">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

DropdownMenu.propTypes = {
  label: PropTypes.string.isRequired, // Label for the dropdown
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired, // URL for the link
      label: PropTypes.string.isRequired, // Text for the link
    })
  ).isRequired,
  active: PropTypes.string, // Active dropdown label
  setActive: PropTypes.func.isRequired, // Function to set active dropdown
};

export default DropdownMenu;
