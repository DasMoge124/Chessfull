import React from "react";
import chessImage from "./hanging_pieces.png";

function hanging_pieces() {
  return (
    <div>
      <h1>Hanging Pieces</h1>
      <p>
        {" "}
        A hanging piece is an undefended or a free piece that can easily be
        captured. For example, in the image below, the white queen on d1 is
        eyeing the knight on h5; since the knight on h5 has no defenders, the
        white queen can capture the knight for free.{" "}
      </p>
      <div className="image-container">
        <img src={chessImage} alt="Chess players" />
      </div>
      <div className="ButtonElements">
        <button
          onClick={() => navigate("/lessons/international_master/EricVEmilia")}
        >
          IM Eric Rosen vs. WFM Emilia Sprzęczka
        </button>
      </div>
    </div>
  );
}

export default hanging_pieces;
