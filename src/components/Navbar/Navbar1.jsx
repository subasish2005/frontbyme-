import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import logosvg from "../../assets/svgs/logo.svg";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : "navbar-floating"}`}>
      <div className="navbar-content">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={logosvg} alt="BlockLearner Logo" />
        </Link>

        {/* Links (Desktop) */}
        <div className="navbar-links-container">
          <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
            <DropdownMenu
              label="Infrastructure"
              links={[
                { href: "/infrastructure", label: "Overview" },
                { href: "/services", label: "Services" },
              ]}
              active={active}
              setActive={setActive}
            />
            <DropdownMenu
              label="Token"
              links={[
                { href: "/analytics", label: "Reports" },
                { href: "/dashboard", label: "Dashboard" },
              ]}
              active={active}
              setActive={setActive}
            />
              <DropdownMenu
              label="About"
              links={[
                { href: "/infrastructure", label: "Overview" },
                { href: "/services", label: "Services" },
              ]}
              active={active}
              setActive={setActive}
            />
            <DropdownMenu
              label="Analytics"
              links={[
                { href: "/infrastructure", label: "Overview" },
                { href: "/services", label: "Services" },
              ]}
              active={active}
              setActive={setActive}
            />
            <DropdownMenu
              label="Developers"
              links={[
                { href: "/infrastructure", label: "Overview" },
                { href: "/services", label: "Services" },
              ]}
              active={active}
              setActive={setActive}
            />
          </div>
        </div>

        {/* Register Button */}
        <div className="navbar-register">
          <button>Login</button>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
