import React from "react";
import { useNavigate } from "react-router-dom";
import "./lesson.css";

// 1. Define the component function
const WeakSquares = () => {
  const navigate = useNavigate(); // 2. Initialize the hook inside the component

  return (
    <div>
      <h1>Weak Squares</h1>
      <h2>What are weak squares?</h2>
      <ul> {/* 3. Added a wrapper for your list items */}
        <li>A square that can’t be controlled by the opponent’s pawns.</li>
        <li>In Distant Opposition, the kings are separated by an odd number of squares...</li>
        <li>Rook promotion sometimes works, but queen is best.</li>
        <li>If the pawn promotes to a knight or bishop, it's a draw.</li>
        <li>In this position, regardless if black or white has pawn, it must be opponent’s move for pawn to become queen.</li>
        <li>Pawn cannot be in a or h file, or else its draw.</li>
      </ul>
      
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/intermediate")}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

// 4. Export the component so you can use it in your App/Router
export default WeakSquares;