import React, { useState } from "react";
import { Chess } from "chess.js";
import "./Chessboard.css";

// Utility functions (toSquare, unicodePiece) remain the same
// ... (Your toSquare and unicodePiece functions)

const toSquare = (r, c) => {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return files[c] + (8 - r);
};

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

const Chessboard = () => {
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState(game.board());
  const [dragging, setDragging] = useState(null); // Stores the 'from' square of the piece being dragged

  // Update the board from chess.js
  const updateBoard = () => {
    // A simple way to trigger a re-render with the new board state
    setBoard([...game.board()]);
  };

  // 1. DRAG START: Start dragging a piece
  const handleDragStart = (e, square) => {
    const piece = game.get(square);

    // Only allow dragging if it's the current player's turn
    if (piece && piece.color === game.turn()) {
      setDragging(square); // Set the 'from' square

      // Set a dummy data payload for Firefox/IE compatibility
      e.dataTransfer.setData("square", square);

      // Optional: Visually indicate a drag by adding a class
      // document.getElementById(`square-${square}`).classList.add('dragging-source');
    } else {
      // Prevent dragging if it's not a piece or not the current player's turn
      e.preventDefault();
    }
  };

  // 2. DRAG OVER: Allow dropping on any square
  const handleDragOver = (e) => {
    // Must prevent default to allow a drop
    e.preventDefault();
  };

  // 3. DROP: Attempt to move the piece
  const handleDrop = (e, targetSquare) => {
    e.preventDefault();

    const fromSquare = dragging; // Get the source square

    // Clear dragging state
    setDragging(null);
    // document.getElementById(`square-${fromSquare}`).classList.remove('dragging-source');

    if (!fromSquare) return; // No piece was dragging

    const move = game.move({
      from: fromSquare,
      to: targetSquare,
      promotion: "q", // Default to Queen promotion
    });

    // If the move was legal, update the board state
    if (move) {
      updateBoard();
    }
  };

  // Helper to get legal moves for visual feedback (optional but useful)
  const getLegalMoves = (sourceSquare) => {
    if (!sourceSquare) return [];
    return game.moves({ square: sourceSquare, verbose: true }).map((m) => m.to);
  };
  const legalMoves = getLegalMoves(dragging);

  return (
    <div className="chessboard">
      {board.map((row, rIndex) => (
        <div className="board-row" key={rIndex}>
          {row.map((piece, cIndex) => {
            const squareName = toSquare(rIndex, cIndex);
            const isLegal = legalMoves.includes(squareName);

            return (
              <div
                key={cIndex}
                id={`square-${squareName}`} // Added ID for optional styling
                className={`square ${(rIndex + cIndex) % 2 === 0 ? "light" : "dark"}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, squareName)}
              >
                {piece && (
                  <span
                    className={`piece ${piece.color === "w" ? "white" : "black"} ${dragging === squareName ? "hidden" : ""}`}
                    draggable={true} // MUST be true for dragging
                    onDragStart={(e) => handleDragStart(e, squareName)}
                  >
                    {unicodePiece(piece)}
                  </span>
                )}
                {/* Visual Indicators for legal drop target */}
                {!piece && isLegal && <div className="legal-move-dot"></div>}
                {piece && isLegal && <div className="legal-capture-ring"></div>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Chessboard;
