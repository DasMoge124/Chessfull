/**
 * Intermediate page component for intermediate-level chess players.
 * Designed to provide lessons and practice games for players looking to improve their skills.
 * Can be extended with intermediate-level tactical puzzles and games.
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Intermediate() {
  const navigate = useNavigate();
  return (
  <div>
    <h1>Intermediate</h1>
    <h2>Openings</h2>
    <div className="ButtonElements">
      <button onClick={() => navigate("/lessons/beginner/pins_and_skewers")}>
        Italian Opening
      </button>
    </div>
    <h2>Middlegame</h2>
    <div className="ButtonElements">
      <button onClick={() => navigate("/lessons/beginner/pins_and_skewers")}>
        Space
      </button>
    </div>
    <div className="ButtonElements">
      <button onClick={() => navigate("/lessons/beginner/pins_and_skewers")}>
        Italian Opening
      </button>
    </div>
    <div className="ButtonElements">
      <button onClick={() => navigate("/lessons/intermediate/your_opponents_ideas")}>
        Your Opponent's Ideas - Intermediate
      </button>
    </div>
    
    <h2>Endgames</h2>
    <div className="ButtonElements">
      <button onClick={() => navigate("/lessons/beginner/pins_and_skewers")}>
       Distant Opposition
      </button>
    </div>
  </div>
);
  
}

export default Intermediate;
