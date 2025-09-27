import React, { useEffect, useState } from "react";
import { Chess } from "chess.js"; // rules engine
import "./Chessboard.css";

const Chessboard = () => {
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState(game.board());
  const [selected, setSelected] = useState(null); // algebraic square like "e2"
  const [legalMoves, setLegalMoves] = useState([]); // list of target squares

  // Update the board from chess.js
  const updateBoard = () => {
    setBoard([...game.board()]);
  };

  const handleSquareClick = (r, c) => {
    const square = toSquare(r, c); // convert indexes → "e4"

    if (selected) {
      // Try to move
      const move = game.move({ from: selected, to: square, promotion: "q" });
      if (move) {
        updateBoard();
      }
      setSelected(null);
      setLegalMoves([]);
    } else {
      // Select piece only if it's that player's turn
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setSelected(square);
        // Get legal moves for highlighting
        const moves = game.moves({ square, verbose: true }).map((m) => m.to);
        setLegalMoves(moves);
      }
    }
  };

  return (
    <div className="chessboard">
      {board.map((row, rIndex) => (
        <div className="board-row" key={rIndex}>
          {row.map((piece, cIndex) => {
            const squareName = toSquare(rIndex, cIndex);
            const isSelected = selected === squareName;
            const isLegal = legalMoves.includes(squareName);

            return (
              <div
                key={cIndex}
                className={`square ${(rIndex + cIndex) % 2 === 0 ? "light" : "dark"} 
                  ${isSelected ? "selected" : ""}`}
                onClick={() => handleSquareClick(rIndex, cIndex)}
              >
                {piece && (
                  <span
                    className={`piece ${piece.color === "w" ? "white" : "black"}`}
                  >
                    {unicodePiece(piece)}
                  </span>
                )}
                {/* Highlight legal moves with a dot */}
                {!piece && isLegal && <div className="legal-move"></div>}
                {piece && isLegal && <div className="legal-capture"></div>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Convert row/col → algebraic square (chess.js format)
const toSquare = (r, c) => {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return files[c] + (8 - r);
};

// Map chess.js piece object → unicode character
const unicodePiece = (piece) => {
  const unicodeMap = {
    pw: "♙",
    rw: "♖",
    nw: "♘",
    bw: "♗",
    qw: "♕",
    kw: "♔",
    pb: "♟",
    rb: "♜",
    nb: "♞",
    bb: "♝",
    qb: "♛",
    kb: "♚",
  };
  return unicodeMap[piece.type + piece.color] ?? "";
};

export default Chessboard;
