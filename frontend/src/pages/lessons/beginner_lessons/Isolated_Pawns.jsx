import React from "react";
import chessImage from "./Images/isolated_pawn.png";
import { useNavigate } from "react-router-dom";

function Isolated_pawns() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>
        <br />
        Isolated Pawns
      </h1>
      <p>
        An isolated pawn is a pawn all by itself with no friendly pawns on the
        adjacent files.
      </p>
      <p>Weaknesses of Isolated Pawns</p>
      <li>
        Can't be defended by other pawns, so it must be protected by pieces
        (which ties them down).
      </li>
      <li>Often becomes a target in the endgame.</li>
      <h2>Strengths of Isolated Pawns</h2>
      <li>
        Can be helpful if: Far away from the main gameplay so it is harder to
        target and keep track of (called an outside passed pawn)
      </li>

      <div className="image-container">
        <img src={chessImage} alt="Chess players" />
      </div>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/beginner/")}>
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default Isolated_pawns;
//2r1r1k1/pp3ppp/1q1p4/8/1p2Pn2/4QP2/PPP3PP/R4R1K b - - 6 20
