import React from "react";
import ParticleBackground from "../components/Particles"; // <-- import the new component
import chessImage from "./image.png";
import "./Home.css";

function Home() {
  return (
    <div className="home-hero">
      {/* Reusable Particles component */}
      <ParticleBackground />

      {/* Page content */}
      <div className="hero-content">
        <h1><br/>Welcome to Chesscrash</h1>
        <p>Your journey to mastering chess starts here!</p>
        <div className="hero-image">
          <img src={chessImage} alt="Chess players" />
        </div>
      </div>
    </div>
  );
}

export default Home;
