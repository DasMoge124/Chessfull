import React from "react";
import chessImage from "./hanging_pieces.png";
import { useNavigate } from "react-router-dom";

function hanging_pieces() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Hanging Pieces</h1>
      <p>
        A hanging piece is an undefended or a free piece that can easily be
        captured.
      </p>
      <p>
        For example, in the image below, the white queen on d1 is eyeing the
        knight on h5.
      </p>
      <p>
        Since the knight on h5 has no defenders, the white queen can capture the
        knight for free.
      </p>
      <div className="image-container">
        <img src={chessImage} alt="Chess players" />
      </div>
      <div className="ButtonElements">
        <button
          onClick={() => navigate("/lessons/beginner/hanging_pieces_practice")}
        >
          Start Practicing
        </button>
      </div>
    </div>
  );
}

export default hanging_pieces;
//2r1r1k1/pp3ppp/1q1p4/8/1p2Pn2/4QP2/PPP3PP/R4R1K b - - 6 20
