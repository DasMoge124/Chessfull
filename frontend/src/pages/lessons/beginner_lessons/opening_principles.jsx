import React from "react";
import chessImage from "./Images/opening_principles.png";
import { useNavigate } from "react-router-dom";
import "./lesson.css";

function chessboard_setup() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Opening Principles</h1>
      <p>
        The opening stage is the first stage of the game, where both players
        make their first moves. Key principles to remember include:
      </p>
      <ol>
        <li>
          Control the Center: It’s recommended to play e4 or d4 as the first
          move as white and e5 or d5 as black.
        </li>
        <li>
          Develop your pieces: activate your key pieces, preferably bishops and
          knights, to allow yourself to create potential attacks to your
          opponent
        </li>
        <li>
          Protect your king: You usually need to castle early to ensure your
          king is safe and is less prone to checkmate threats
        </li>
        <li>
          Don’t bring your queen out too early: doing so allows your opponent to
          create multiple threats to capture your queen, forcing you to move
          your queen a lot.
        </li>
      </ol>
      <div className="image-container">
        <img src={chessImage} alt="Chess players" />
      </div>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/beginner")}>
          Back to Lessons Page
        </button>
      </div>
    </div>
  );
}

export default chessboard_setup;
