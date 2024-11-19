import { useState } from "react";
import "./SidebarDemo.css";

const SidebarDemo = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Dashboard", href: "#", icon: "📊" },
    { label: "Profile", href: "#", icon: "👤" },
    { label: "Settings", href: "#", icon: "⚙️" },
    { label: "Logout", href: "#", icon: "🔙" },
  ];

  return (
    <div className="container">
      <div
        className={`sidebar ${open ? "sidebar-open" : "sidebar-closed"}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="logo">
          <div className="logo-icon" />
          {open && <span className="logo-text">Acet Labs</span>}
        </div>
        <ul className="links">
          {links.map((link, index) => (
            <li key={index} className="link">
              <span className="icon">{link.icon}</span>
              {open && <span className="label">{link.label}</span>}
            </li>
          ))}
        </ul>
      </div>
      <div className="dashboard">
        <div className="row">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="card"></div>
          ))}
        </div>
        <div className="row">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="card-large"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarDemo;
