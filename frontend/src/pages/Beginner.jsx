import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import MagnusVSina from "./lessons/black/magnus_v_sina";
import Forks from "./lessons/beginner_lessons/forks";

function Beginner() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Beginner Page</h1>
      <h2>How to Play Chess</h2>
      <div className="ButtonElements">
        <button
          onClick={() => navigate("/lessons/beginner/how_to_setup_chessboard")}
        >
          How to Set up a Chessboard
        </button>
        <button onClick={() => navigate("/lessons/beginner/how_pieces_move")}>
          How each chess piece Moves
        </button>
      </div>
      <h2>Basic Chess Principles</h2>
      <div className="ButtonElements">
        <button
          onClick={() => navigate("/lessons/beginner/opening_principles")}
        >
          Opening Principles
        </button>
        <button
          onClick={() =>
            navigate("/lessons/beginner/checkmates_and_stalemates")
          }
        >
          Checkmates and Stalemates
        </button>
        <button onClick={() => navigate("/lessons/beginner/chess_notation")}>
          Chess Notation
        </button>
      </div>
      <h2>Basic Tactics</h2>
      <div className="ButtonElements">
        <button onClick={() => navigate("/lessons/beginner/hanging_pieces")}>
          Hanging Pieces
        </button>
      </div>
      <div className="ButtonElements">
        <button onClick={() => navigate("/lessons/beginner/forks")}>
          Forks
        </button>
      </div>
      <div className="ButtonElements">
        <button onClick={() => navigate("/lessons/beginner/pins_and_skewers")}>
          Pins and Skewers
        </button>
      </div>
      <div className="ButtonElements">
        <button
          onClick={() => navigate("/lessons/beginner/discovered_attacks")}
        >
          Discovered Attacks
        </button>
      </div>
      <h2>Pawn Structures</h2>
      <div className="ButtonElements">
        <button
          onClick={() =>
            navigate("/lessons/beginner/pawn_structure_doubled_pawns")
          }
        >
          Doubled Pawns
        </button>
      </div>
      <h2>Practice Games</h2>
      <div className="ButtonElements">
        <button
          onClick={() => navigate("/lessons/beginner/beginner_lesson_one")}
        >
          Game 1
        </button>
        <button
          onClick={() => navigate("/lessons/beginner/beginner_lesson_two")}
        >
          Game 2
        </button>
      </div>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn")}>
          Return to Lessons Page
        </button>
      </div>
    </div>
  );
}

export default Beginner;
