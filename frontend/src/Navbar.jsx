import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // triggers scroll effect
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`nav-container ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          ♟️ Shadow Monarch
        </Link>

        <nav className="nav-links-list">
          <Link to="/" className="nav-item">
            Home
          </Link>
          <Link to="/chessboard" className="nav-item">
            Play
          </Link>
          <Link to="/" className="nav-item">
            Tournaments
          </Link>
          <Link to="/learn" className="nav-item">
            Learn
          </Link>
          <Link to="/" className="nav-item">
            Community
          </Link>
          
          <Link to="/login" className="nav-btn-outline">
            Sign In
          </Link>
          <Link to="/signup" className="nav-btn-solid">
            Play Now
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
