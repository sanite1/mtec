// src/components/Navbar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // optional if you want custom styles

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          MyApp
        </Link>

        {/* Hamburger toggle (mobile) */}
        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>

        {/* Menu Links */}
        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className="nav-link"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/services"
              className="nav-link"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contact"
              className="nav-link"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
