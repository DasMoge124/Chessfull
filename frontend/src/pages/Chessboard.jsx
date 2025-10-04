// src/components/Chessboard.jsx
import React, { useState, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import "./Chessboard.css";

const files = ["a","b","c","d","e","f","g","h"];

// Convert row, col indices to square name (e.g. row 0, col 0 → "a8")
const toSquare = (row, col) => {
  return files[col] + (8 - row);
};

// Map chess.js piece to the SVG filename (e.g. “wP”, “bK”, etc.)
const pieceToFilename = (piece) => {
  if (!piece) return null;
  const color = piece.color === "w" ? "w" : "b";
  const type = piece.type.toUpperCase(); // “P”, “N”, “B”, “R”, “Q”, “K”
  return `${color}${type}.svg`;
};

const Chessboard = ({ boardWidth = 600 }) => {
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState(game.board());
  const [dragging, setDragging] = useState(null); // source square string
  const [legalMoves, setLegalMoves] = useState([]);
  const [lastMove, setLastMove] = useState({ from: null, to: null });

  // A ref to track piece movement animations
  const pieceLayerRef = useRef(null);

  // Re-render board state
  const updateBoard = () => {
    setBoard(game.board());
  };

  // Get legal moves from a source square
  const computeLegalMoves = (source) => {
    if (!source) return [];
    return game.moves({ square: source, verbose: true }).map(m => m.to);
  };

  // Handle drag start
  const handleDragStart = (e, square) => {
    const piece = game.get(square);
    if (!piece || piece.color !== game.turn()) {
      e.preventDefault();
      return;
    }
    setDragging(square);
    setLegalMoves(computeLegalMoves(square));
    // Visual hints: you could add a CSS class to the source square
  };

  // Handle drag over (allow drop)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e, target) => {
    e.preventDefault();
    if (!dragging) return;

    const from = dragging;
    const to = target;

    // Clear dragging & legal moves state
    setDragging(null);
    setLegalMoves([]);

    // Try the move
    const move = game.move({
      from,
      to,
      promotion: "q",
    });
    if (move) {
      setLastMove({ from: move.from, to: move.to });
      updateBoard();
      // Play sound
      const soundSrc = move.captured ? "/assets/sounds/capture.mp3" : "/assets/sounds/move.mp3";
      const audio = new Audio(soundSrc);
      audio.play();
    }
  };

  // Optionally handle drag end (if drop outside)
  const handleDragEnd = (e) => {
    setDragging(null);
    setLegalMoves([]);
  };

  // For animation: when board updates, animate piece movement
  // (This is a simplistic approach)
  useEffect(() => {
    // You can add a more complex animation logic here
    // For example, find difference between old and new board and animate that piece
  }, [board]);

  // Render squares
  const squareSize = boardWidth / 8;

  return (
    <div
      className="chessboard-wrapper"
      style={{ width: boardWidth, height: boardWidth }}
    >
      <div className="board-grid">
        {board.map((rowArr, rowIdx) =>
          rowArr.map((piece, colIdx) => {
            const square = toSquare(rowIdx, colIdx);
            const isLegal = legalMoves.includes(square);
            const isLast =
              (lastMove.from === square) || (lastMove.to === square);

            return (
              <div
                key={square}
                className={`square ${(rowIdx + colIdx) % 2 === 0 ? "light" : "dark"} ${isLast ? "last-move" : ""}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, square)}
              >
                {/* Legal move hint */}
                {isLegal && !piece && <div className="legal-dot" />}
                {isLegal && piece && <div className="legal-ring" />}

                {/* Piece rendering */}
                {piece && (
                  <img
                    src={`/assets/pieces/${pieceToFilename(piece)}`}
                    alt=""
                    className={`piece-img ${dragging === square ? "dragging-piece" : ""}`}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, square)}
                    onDragEnd={handleDragEnd}
                    style={{ width: squareSize, height: squareSize }}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Chessboard;
