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
      <h1>
        <br />
        <br />
        Intermediate
      </h1>
      <h2>Openings</h2>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/intermediate/italian_opening")}>
          Italian Opening
        </button>
      </div>
      <h2>Middlegame</h2>
      <div className="ButtonElements">
        <button onClick={() => navigate("/lessons/intermediate/space")}>
          Space
        </button>
        <button onClick={() => navigate("/learn/intermediate/Tactical_Sacrifices")}>
          Tactical Sacrifices
        </button>
        <button onClick={() => navigate("/learn/intermediate/Positional_Sacrifices")}>
          Positional Sacrifices
        </button>
      </div>
      <div className="ButtonElements">
        <button onClick={() => navigate("/lessons/intermediate/weak_squares")}>
          Weak Squares
        </button>
        <button onClick={() => navigate("/learn/intermediate/Imbalances")}>
          Imbalances
        </button>
        <button onClick={() => navigate("/learn/intermediate/Intermezzo")}>
          Intermezzo
        </button>
      </div>
      
      <div className="ButtonElements">
        <button
          onClick={() => navigate("/lessons/intermediate/your_opponents_ideas")}
        >
          Your Opponent's Ideas - Intermediate
        </button>
        <button onClick={() => navigate("/learn/intermediate/improve_worst_piece")}>
          Improve Worst Piece
        </button>
        <button onClick={() => navigate("/learn/intermediate/Attacking_The_King")}>
          Attacking The King
        </button>
      </div>
      <div className="ButtonElements">
        <button
          onClick={() => navigate("/lessons/intermediate/pairing_pieces")}
        >
          Pairing Pieces
        </button>
        <button
          onClick={() => navigate("/lessons/intermediate/Outposts")}
        >
          Outposts
        </button>
      </div>

      <h2>Endgames</h2>
      <div className="ButtonElements">
        <button
          onClick={() => navigate("/learn/intermediate/distant_opposition")}
        >
          Distant Opposition
        </button>
        <div className="ButtonElements">
          <button onClick={() => navigate("/learn/intermediate/zugzwang")}>
            Zugzwang
          </button>
        </div>
        <button
          onClick={() => navigate("/learn/intermediate/Triangulation")}
        >
          Triangulation
        </button>
      </div>
      <h2>Practice Games</h2>
      <div className="ButtonElements">
        <button
          onClick={() => navigate("/learn/intermediate/distant_opposition")}
        >
          Practice Game 1
        </button>
      </div>
    </div>
  );
}

export default Intermediate;
