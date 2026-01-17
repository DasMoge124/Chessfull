/**
 * Learn page component that displays skill level selection for chess lessons.\n * Users can choose between Beginner, Intermediate, Advanced levels, or view all lessons.\n * Each button navigates to the corresponding lesson page with appropriate content.\n * Uses neon-themed styling to match the application's design aesthetic.\n */\nimport React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./Home.css"; // We use Home.css for the container styling

function Learn() {
  const navigate = useNavigate();

  return (
    <div className="home-page-container">
      <div className="page-content">
        <h2 style={{ fontSize: "3rem", color: "var(--primary-electric)", marginBottom: "40px", textShadow: "var(--neon-glow-strong)" }}>
          Select Your Level
        </h2>

        {/* This wrapper will spread buttons across the width */}
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "30px", 
          justifyContent: "center", 
          width: "100%" 
        }}>
          <div className="ButtonElements">
            <button className="neon-button" onClick={() => navigate("/learn/beginner")}>Beginner</button>
          </div>
          <div className="ButtonElements">
            <button className="neon-button" onClick={() => navigate("/learn/intermediate")}>Intermediate</button>
          </div>
          <div className="ButtonElements">
            <button className="neon-button" onClick={() => navigate("/learn/advanced")}>Advanced</button>
          </div>
          <div className="ButtonElements">
            <button className="neon-button" onClick={() => navigate("/lessons")}>Lessons</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Learn;