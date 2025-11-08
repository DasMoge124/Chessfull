import React from "react";
import chessImage from "./image.png";
import "./Home.css";

function Home() {
  return (
    <div className="home-page-container">
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