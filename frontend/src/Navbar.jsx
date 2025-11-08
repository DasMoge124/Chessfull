import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`nav-container ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-content">
        <div className="nav-logo">⚡ LuxChess</div>

        <nav>
          <a href="#home">Home</a>
          <a href="#play">Play</a>
          <a href="#features">Features</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;