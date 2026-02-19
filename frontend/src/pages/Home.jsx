import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "../components/Particles";
import chessImage from "./image.png";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const fadeElems = document.querySelectorAll(".fade-in-section");
    fadeElems.forEach((el) => observer.observe(el));

    return () => fadeElems.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="shadow-home">
      {/* Background Particles */}
      <div className="particles-layer">
        <ParticleBackground />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="hero-section fade-in-section">
        <div className="hero-grid">
          <div className="hero-text">
            <h1 className="shadow-heading">
              Master the Art <br />
              <span className="gradient-text">of Strategy</span>
            </h1>
            <p className="hero-subtext">
              Enter a new era of competitive chess. Play, learn, and dominate in
              a refined digital arena.
            </p>
            <div className="hero-buttons">
              <button
                className="btn-primary-glow"
                onClick={() => navigate("/chessboard")}
              >
                Play Now
              </button>
              <button
                className="btn-secondary-outline"
                onClick={() => navigate("/learn")}
              >
                Explore
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-board-container">
              {/* Placeholder for 3D element or high-quality image */}
              <img
                src={chessImage}
                alt="Cinematic Chessboard"
                className="floating-board"
              />
              <div className="glow-effect"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="features-section fade-in-section">
        <h2 className="section-title">Designed for True Strategists</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">♟️</div>
            <h3>Smart Training</h3>
            <p>Adaptive lessons that evolve with your skill level.</p>
          </div>
          <div className="feature-card">
            <div className="icon">⚔️</div>
            <h3>Real-time Battle</h3>
            <p>Instant matchmaking with players worldwide.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🧠</div>
            <h3>Deep Analysis</h3>
            <p>Grandmaster-level engine to review your games.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🏆</div>
            <h3>Tournaments</h3>
            <p>Compete in weekly events and climb the leaderboard.</p>
          </div>
        </div>
      </section>

      {/* --- PREVIEW SECTION --- */}
      <section className="preview-section fade-in-section">
        <div className="preview-content">
          <div className="preview-text">
            <h2>Next-Gen Interface</h2>
            <p>
              Experience a distraction-free environment built for focus. Every
              move feels significant with our tactile sound engine and visual feedback.
            </p>
            <div className="stats-row">
              <div className="stat">
                <span className="stat-num">10k+</span>
                <span className="stat-label">Active Players</span>
              </div>
              <div className="stat">
                <span className="stat-num">500+</span>
                <span className="stat-label">Daily Tournaments</span>
              </div>
            </div>
          </div>
          <div className="preview-visual">
             {/* Abstract representation of the board */}
             <div className="board-preview-mockup">
                <div className="mockup-row"></div>
                <div className="mockup-row"></div>
                <div className="mockup-row"></div>
             </div>
          </div>
        </div>
      </section>

      {/* --- COMMUNITY / CTA --- */}
      <section className="community-section fade-in-section">
        <div className="community-bg-logo">♟️</div>
        <h2>Compete with the Best</h2>
        <p>Join a community of passionate players pushing the boundaries of the game.</p>
        <button className="btn-primary-glow large-cta" onClick={() => navigate("/signup")}>
          Join a Tournament
        </button>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="final-cta-section fade-in-section">
        <h1>Your Move.</h1>
        <p>Step into the arena and redefine your strategy.</p>
        <button className="btn-primary-glow scale-up" onClick={() => navigate("/chessboard")}>
          Start Playing
        </button>
      </section>

      {/* --- FOOTER --- */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-logo">♟️ Shadow Monarch</span>
            <p>The ultimate destination for modern chess.</p>
          </div>
          <div className="footer-links">
            <div className="col">
              <h4>Platform</h4>
              <a href="#">Play</a>
              <a href="#">Learn</a>
              <a href="#">Tournaments</a>
            </div>
            <div className="col">
              <h4>Community</h4>
              <a href="#">Forums</a>
              <a href="#">Discord</a>
              <a href="#">Blog</a>
            </div>
            <div className="col">
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Shadow Monarch Chess. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
