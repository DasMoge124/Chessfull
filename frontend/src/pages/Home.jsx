/**
 * Home page component for the Chessfull application.
 * Displays a welcome message and chess-themed introduction image.
 * Includes decorative neon chess piece animations.
 * Serves as the landing page for users visiting the application.
 */
import React from "react";
import chessImage from "./image.png";
import "./Home.css";

function Home() {
  return (
    <div className="home-page-container">
      {/* Decorative neon chess pieces */}
      <div className="chess-decoration"></div>
      <div className="chess-decoration"></div>
      <div className="chess-decoration"></div>
      <div className="chess-decoration"></div>
      <div className="chess-decoration"></div>

      <div className="page-content">
        <h1>Welcome to Chessfull</h1>
        <p>Your journey to mastering chess starts here!</p>
        <div className="image-container">
          <img src={chessImage} alt="Chess players" />
        </div>
      </div>
    </div>
  );
}

export default Home;
