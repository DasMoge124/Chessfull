import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import "./Chessboard.css";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

const toSquare = (row, col) => {
  return files[col] + (8 - row);
};

const pieceToFilename = (piece) => {
  if (!piece) return null;
  const color = piece.color === "w" ? "w" : "b";
  const type = piece.type.toUpperCase(); // P, N, B, R, Q, K
  return `${color}${type}.svg`;
};

const Chessboard = ({ boardWidth = 560 }) => {
  const [game] = useState(new Chess());// chess.js instance
  const [board, setBoard] = useState(game.board()); // 2D array of pieces
  const [dragging, setDragging] = useState(null); // square being dragged
  const [legalMoves, setLegalMoves] = useState([]); // squares where the selected piece can move
  const [lastMove, setLastMove] = useState({ from: null, to: null }); // last move made

  const squareSize = boardWidth / 8;

  const updateBoard = () => {
    setBoard([...game.board()]);
  };

  const getLegalMoves = (square) => {
    return game.moves({ square, verbose: true }).map((m) => m.to);
  };

  const handleDragStart = (e, square) => {
    const piece = game.get(square);
    if (piece && piece.color === game.turn()) {
      setDragging(square);
      setLegalMoves(getLegalMoves(square));
      e.dataTransfer.setData("text/plain", square);
    } else {
      e.preventDefault();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetSquare) => {
    e.preventDefault();
    const fromSquare = dragging;
    setDragging(null);
    setLegalMoves([]);

    if (!fromSquare) return;

    const move = game.move({
      from: fromSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move) {
      setLastMove({ from: move.from, to: move.to });
      updateBoard();

      // Optional: play sound
      const soundSrc = move.captured
        ? "/assets/sounds/capture.mp3"
        : "/assets/sounds/move.mp3";
      const audio = new Audio(soundSrc);
      audio.play();
    }
  };

  const handleDragEnd = () => {
    setDragging(null);
    setLegalMoves([]);
  };

  return (
    <div
      className="chessboard"
      style={{ width: boardWidth, height: boardWidth }}
    >
      {board.map((row, rowIdx) =>
        row.map((piece, colIdx) => {
          const square = toSquare(rowIdx, colIdx);
          const isLegal = legalMoves.includes(square);
          const isLast = square === lastMove.from || square === lastMove.to;

          return (
            <div
              key={square}
              className={`square ${(rowIdx + colIdx) % 2 === 0 ? "light" : "dark"} ${
                isLegal ? "highlight-legal" : ""
              } ${isLast ? "last-move" : ""}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, square)}
              style={{ width: squareSize, height: squareSize }}
            >
              {isLegal && !piece && <div className="legal-dot" />}
              {isLegal && piece && <div className="legal-ring" />}

              {piece && (
                <img
                  src={`/assets/pieces/${pieceToFilename(piece)}`}
                  alt=""
                  className="piece-img"
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
  );
};

export default Chessboard;