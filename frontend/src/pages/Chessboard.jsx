// src/components/Chessboard.jsx
import React, { useState, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import "./Chessboard.css";

<<<<<<< HEAD
const files = ["a","b","c","d","e","f","g","h"];

// Convert row, col indices to square name (e.g. row 0, col 0 → "a8")
const toSquare = (row, col) => {
  return files[col] + (8 - row);
=======
const toSquare = (r, c) => {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return files[c] + (8 - r);
>>>>>>> e9c239db5bae1c3f72e1851b0296367c81835c61
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
<<<<<<< HEAD
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
=======
  const [dragging, setDragging] = useState(null); // Dragging from-square
  const [selected, setSelected] = useState(null); // Click-to-move from-square

  const updateBoard = () => {
    setBoard([...game.board()]);
  };

  // --- DRAG HANDLERS ---
  const handleDragStart = (e, square) => {
    const piece = game.get(square);
    if (piece && piece.color === game.turn()) {
      setDragging(square);
      e.dataTransfer.setData("square", square);
    } else {
>>>>>>> e9c239db5bae1c3f72e1851b0296367c81835c61
      e.preventDefault();
      return;
    }
    setDragging(square);
    setLegalMoves(computeLegalMoves(square));
    // Visual hints: you could add a CSS class to the source square
  };

<<<<<<< HEAD
  // Handle drag over (allow drop)
=======
>>>>>>> e9c239db5bae1c3f72e1851b0296367c81835c61
  const handleDragOver = (e) => {
    e.preventDefault();
  };

<<<<<<< HEAD
  // Handle drop
  const handleDrop = (e, target) => {
    e.preventDefault();
    if (!dragging) return;

    const from = dragging;
    const to = target;

    // Clear dragging & legal moves state
    setDragging(null);
    setLegalMoves([]);
=======
  const handleDrop = (e, targetSquare) => {
    e.preventDefault();
    const fromSquare = dragging;
    setDragging(null);

    if (!fromSquare) return;
>>>>>>> e9c239db5bae1c3f72e1851b0296367c81835c61

    // Try the move
    const move = game.move({
<<<<<<< HEAD
      from,
      to,
      promotion: "q",
    });
=======
      from: fromSquare,
      to: targetSquare,
      promotion: "q",
    });

>>>>>>> e9c239db5bae1c3f72e1851b0296367c81835c61
    if (move) {
      setLastMove({ from: move.from, to: move.to });
      updateBoard();
<<<<<<< HEAD
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
=======
      setSelected(null);
    }
  };

  // --- CLICK HANDLER ---
  const handleClickSquare = (square) => {
    if (!selected) {
      // First click: select if piece belongs to current player
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setSelected(square);
      }
    } else {
      // Second click: attempt to move
      if (square === selected) {
        // Deselect if clicked again
        setSelected(null);
        return;
      }

      const move = game.move({
        from: selected,
        to: square,
        promotion: "q",
      });

      if (move) {
        updateBoard();
      }
      setSelected(null);
    }
  };

  const getLegalMoves = (sourceSquare) => {
    if (!sourceSquare) return [];
    return game.moves({ square: sourceSquare, verbose: true }).map((m) => m.to);
  };

  const legalMoves = getLegalMoves(selected || dragging);

  return (
    <div className="chessboard">
      {board.map((row, rIndex) => (
        <div className="board-row" key={rIndex}>
          {row.map((piece, cIndex) => {
            const squareName = toSquare(rIndex, cIndex);
            const isLegal = legalMoves.includes(squareName);
            const isSelected = selected === squareName;

            return (
              <div
                key={cIndex}
                id={`square-${squareName}`}
                className={`square ${(rIndex + cIndex) % 2 === 0 ? "light" : "dark"} ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => handleClickSquare(squareName)}
>>>>>>> e9c239db5bae1c3f72e1851b0296367c81835c61
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, square)}
              >
                {/* Legal move hint */}
                {isLegal && !piece && <div className="legal-dot" />}
                {isLegal && piece && <div className="legal-ring" />}

                {/* Piece rendering */}
                {piece && (
<<<<<<< HEAD
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
=======
                  <span
                    className={`piece ${piece.color === "w" ? "white" : "black"} ${
                      dragging === squareName ? "hidden" : ""
                    }`}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, squareName)}
                  >
                    {unicodePiece(piece)}
                  </span>
                )}
                {!piece && isLegal && <div className="legal-move-dot"></div>}
                {piece && isLegal && <div className="legal-capture-ring"></div>}
>>>>>>> e9c239db5bae1c3f72e1851b0296367c81835c61
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Chessboard;
