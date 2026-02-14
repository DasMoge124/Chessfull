import React from "react";
import { useNavigate } from "react-router-dom";
import "./lesson.css";

const SpaceLesson = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Space</h1>
      <h2>What is Distant Opposition?</h2>
      <ul>
        <li>Distant Opposition involves two kings facing each other, and one of them is trying to turn their pawn into a queen.</li>
        <li>In Distant Opposition, the kings are separated by an odd number of squares. This means that when one king moves, the other king can respond in a way that maintains the opposition.</li>
        <li>Rook promotion sometimes works, but queen is best.</li>
        <li>If the pawn promotes to a knight or bishop, it's a draw</li>
        <li>In this position, regardless if black or white has pawn, it must be opponent’s move for pawn to become queen</li>
        <li>Pawn cannot be in a or h file, or else its draw</li>
      </ul>

      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/intermediate")}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default SpaceLesson;