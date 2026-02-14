import React from "react";
import { useNavigate } from "react-router-dom";
import PairingPiecesImage from "./Images/pairing_pieces.png";
import "./lesson.css";

const PairingPieces = () => {
  const navigate = useNavigate();

  return (
    <div className="lesson-container">
      <h1>Pairing Pieces</h1>
      <h2>Working as a Team</h2>
      
      <p>Just like in the lessons where we learned piece values, pieces are stronger when they coordinate!</p>
      
      <ul>
        <li><strong>The Battery (Rook + Rook):</strong> Doubling your rooks on a file makes them twice as powerful. They defend each other while attacking.</li>
        <li><strong>The Long-Range Duo (ex: Queen + Bishop):</strong> These pieces can create "batteries" on diagonals to target the opponent's King.</li>
        <li><strong>The Knight + Queen:</strong> A deadly pairing for tactical forks. The Knight jumps over defenders while the Queen controls the long lines.</li>
        <li><strong>The Pawn Chain:</strong> As shown in the "Pawn Structure" lesson, pawns pair together diagonally to create an unbreakable wall.</li>
      </ul>

      <blockquote>
        <strong>Pro Tip:</strong> Always look for "C.C.A" (Checks, Captures, Attacks) when your pieces are paired. A coordinated attack is much harder to defend than a single piece attacking alone.
      </blockquote>
      <h2>Example:</h2>
      <img src={PairingPiecesImage} alt="Chess players" />
      <p>In this position, Black's queen and bishop are paired together on the long diagonal, creating a powerful battery that threatens checkmate on h2.<br/>White must be very careful to defend against this threat, as the queen and bishop work together to control key squares around the White king.</p>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/intermediate")}>
          Return to Lessons
        </button>
      </div>
    </div>
  );
};

export default PairingPieces;