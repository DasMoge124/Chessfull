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
        knight out of the way of a rook. Discovered Attacks are usually done with bishops, rooks, and queens.
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
      <p>When looking for discovered attacks, it can be useful to check for the following: </p>
      <li>Are the pieces lined up on the same file or diagonal?</li>
      <li>Is the attacking piece blocked by another companion piece? If so, can you move that piece out of the way?</li>
      <li>If a discovered attack can be made, is it possible to create a double attack or threat? If so, that can be very useful.</li>
      <div className="image-container">
        <img src={chessImage} alt="Chess players" />
      </div>
      <div className="ButtonElements">
        <button onClick={() => navigate("/lessons/beginner/discovered_attacks_practice")}>
          Start Practicing
        </button>
      </div>
    </div>
  );
}

export default discovered_attack;
