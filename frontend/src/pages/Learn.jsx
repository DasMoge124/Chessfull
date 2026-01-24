import React from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "../components/Particles";
import "./Home.css"; // Reusing container styles

function Learn() {
  const navigate = useNavigate();

  return (
    <div className="home-hero">
      <ParticleBackground />
      <div className="page-content" style={{ position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontSize: "3rem",
            color: "var(--primary-electric)",
            marginBottom: "40px",
            textShadow: "0 0 15px var(--primary-electric)",
            textAlign: "center",
          }}
        >
          Select Your Level
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center",
            width: "100%",
          }}
        >
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
