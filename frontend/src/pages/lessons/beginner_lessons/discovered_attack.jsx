import React from "react";
import chessImage from "./Images/discovered_attack.png";
import { useNavigate } from "react-router-dom";

function discovered_attack() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Discovered Attacks</h1>
      <p>
        A discovered attack is a tactic where a player moves a piece that
        previously blocked an attack by another long range piece, such as a
        knight out of the way of a rook.
      </p>
      <p>
        In the example below, black made a discovered attack by playing e2,
        creating a discovered attack with the bishop on d4 checking the king on
        g1.
      </p>
      <p>
        Additionally, black’s e2 pawn is also attacking the rook on f1, which is
        a bonus for a discovered attack.
      </p>
      <div className="image-container">
        <img src={chessImage} alt="Chess players" />
      </div>
      <div className="ButtonElements">
        <button onClick={() => navigate("/lessons/beginner/forks_practice")}>
          Lessons
        </button>
      </div>
    </div>
  );
}

export default discovered_attack;
