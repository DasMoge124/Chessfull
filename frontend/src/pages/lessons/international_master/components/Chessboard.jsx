// src/components/Chessboard.jsx
import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";

// Utility function to convert row/column into algebraic square notation
const toSquare = (row, col) => {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return `${files[col]}${8 - row}`;
};

// Utility to map piece objects to image filenames
const pieceToFilename = (piece) => {
  if (!piece) return "";
  const color = piece.color === "w" ? "w" : "b";
  return `${color}${piece.type}.png`;
};

const Chessboard = ({
  game,
  setGame,
  currentLessonIndex,
  lessonMoves,
  setLessonMessage,
  setShowContinue,
  showContinue,
}) => {
  const [board, setBoard] = useState(game.board());
  const [sourceSquare, setSourceSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [lastMove, setLastMove] = useState({ from: null, to: null });

  const squareSize = 400 / 8;
  const lesson = lessonMoves[currentLessonIndex];
  const isUserTurn = game.turn() === "w" && lesson.player === "White";

  // Update board when game changes
  useEffect(() => {
    setBoard([...game.board()]);
  }, [game]);

  const updateBoard = () => setBoard([...game.board()]);

  // Get legal moves for a square
  const getLegalMoves = (square) =>
    game.moves({ square, verbose: true }).map((m) => m.to);

  // Execute move and validate with current lesson
  const executeMove = (fromSquare, toSquare) => {
    const move = game.move({ from: fromSquare, to: toSquare, promotion: "q" });
    if (!move) return;

    setLastMove({ from: move.from, to: move.to });
    updateBoard();

    const expectedMove = lesson.move.split(" ")[1].replace("...", "").trim();

    if (move.san === expectedMove) {
      // Correct move
      setLessonMessage({
        type: "success",
        text: `Correct! ${move.san} was played.`,
        explanation: lesson.explanation,
      });
      setShowContinue(true);
    } else {
      // Wrong move
      game.undo();
      updateBoard();
      setLessonMessage({
        type: "error",
        text: `You played ${move.san}. Try again.`,
        explanation: lesson.hint,
      });
      setShowContinue(false);
    }
  };

  // Handle when user clicks a square
  const handleSquareClick = (square) => {
    if (!isUserTurn) return;

    const piece = game.get(square);

    // Selecting the first square
    if (!sourceSquare) {
      if (piece && piece.color === game.turn()) {
        setSourceSquare(square);
        setLegalMoves(getLegalMoves(square));
      }
      return;
    }

    // Clicking a legal destination
    if (legalMoves.includes(square)) {
      executeMove(sourceSquare, square);
      setSourceSquare(null);
      setLegalMoves([]);
    }
    // Selecting a new piece of the same color
    else if (piece && piece.color === game.turn()) {
      setSourceSquare(square);
      setLegalMoves(getLegalMoves(square));
    }
    // Invalid click — reset
    else {
      setSourceSquare(null);
      setLegalMoves([]);
    }
  };

  return (
    <div
      className="chessboard"
      style={{
        width: 400,
        height: 400,
        position: "relative",
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gridTemplateRows: "repeat(8, 1fr)",
      }}
    >
      {board.map((row, rIdx) =>
        row.map((piece, cIdx) => {
          const square = toSquare(rIdx, cIdx);
          const isLegal = legalMoves.includes(square);
          const isSource = square === sourceSquare;
          const isLast = square === lastMove.from || square === lastMove.to;

          return (
            <div
              key={square}
              className={`square ${(rIdx + cIdx) % 2 === 0 ? "light" : "dark"} ${
                isLegal ? "highlight-legal" : ""
              } ${isSource ? "highlight-source" : ""} ${isLast ? "last-move" : ""}`}
              onClick={() => handleSquareClick(square)}
              style={{
                width: squareSize,
                height: squareSize,
                position: "relative",
                backgroundColor:
                  (rIdx + cIdx) % 2 === 0 ? "#f0d9b5" : "#b58863",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isUserTurn ? "pointer" : "default",
              }}
            >
              {/* Hints for legal moves */}
              {isLegal && !piece && (
                <div
                  className="legal-dot"
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    borderRadius: "50%",
                  }}
                />
              )}
              {isLegal && piece && (
                <div
                  className="legal-ring"
                  style={{
                    position: "absolute",
                    width: "90%",
                    height: "90%",
                    border: "2px solid rgba(0,0,0,0.3)",
                    borderRadius: "50%",
                  }}
                />
              )}

              {/* Chess piece */}
              {piece && (
                <img
                  src={`/assets/pieces/${pieceToFilename(piece)}`}
                  alt={`${piece.color}${piece.type}`}
                  className="piece-img"
                  draggable={isUserTurn}
                  style={{
                    width: squareSize,
                    height: squareSize,
                    userSelect: "none",
                  }}
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
