import React, { useState, useEffect, useCallback } from "react";
import { Chess } from "chess.js";
// Removed: import "./GameLesson.css";
// Removed: import "./Chessboard.css";

// Utility function to convert row/column into algebraic square notation
const toSquare = (row, col) => {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return `${files[col]}${8 - row}`;
};

// Utility to map piece objects to image filenames
const pieceToFilename = (piece) => {
  if (!piece) return "";
  const color = piece.color === "w" ? "w" : "b";
  const type = piece.type.toUpperCase();
  return `${color}${type}.svg`;
};

const Chessboard = ({
  game,
  setGame,
  currentLessonIndex,
  lessonMoves,
  setLessonMessage,
  setShowContinue,
  showContinue,
  clearFeedback,
}) => {
  const [board, setBoard] = useState(game.board());
  const [sourceSquare, setSourceSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [lastMove, setLastMove] = useState({ from: null, to: null });

  // 400px / 8 squares = 50px per square
  const squareSize = 400 / 8; // Use 400/8 to match the parent container size
  const lesson = lessonMoves[currentLessonIndex];
  const isUserTurn = game.turn() === "w" && lesson.player === "White";

  useEffect(() => {
    setBoard([...game.board()]);
  }, [game]);

  const updateBoard = () => setBoard([...game.board()]);

  const getLegalMoves = (square) =>
    game.moves({ square, verbose: true }).map((m) => m.to);

  const executeMove = (fromSquare, toSquare) => {
    const move = game.move({ from: fromSquare, to: toSquare, promotion: "q" });
    if (!move) return;

    setLastMove({ from: move.from, to: move.to });
    updateBoard();

    // The logic below assumes the PGN format is like "12. Qf3" and extracts 'Qf3'
    const moveParts = lesson.move.split(" ");
    const expectedMove =
      moveParts.length > 1 ? moveParts[1].replace("...", "").trim() : "";

    if (move.san === expectedMove) {
      setLessonMessage({
        type: "success",
        text: `Correct! ${move.san} was played.`,
        explanation: lesson.explanation,
      });
      setShowContinue(true); // Show next move button
    } else {
      game.undo();
      updateBoard();
      setLessonMessage({
        type: "error",
        text: `You played ${move.san}. Try again.`,
        explanation: null, // Do not show hint immediately
        showHint: false,
        showSolution: false,
      });
      setShowContinue(false); // Hide next move button
    }
  };

  const handleSquareClick = (square) => {
    if (!isUserTurn) return;
    const piece = game.get(square);

    if (!sourceSquare) {
      if (piece && piece.color === game.turn()) {
        setSourceSquare(square);
        setLegalMoves(getLegalMoves(square));
      }
      return;
    }

    if (legalMoves.includes(square)) {
      // Only clear feedback when a valid move is made
      if (clearFeedback) clearFeedback();
      executeMove(sourceSquare, square);
      setSourceSquare(null);
      setLegalMoves([]);
    } else if (piece && piece.color === game.turn()) {
      setSourceSquare(square);
      setLegalMoves(getLegalMoves(square));
    } else {
      setSourceSquare(null);
      setLegalMoves([]);
    }
  };

  return (
    <div
      // Reverted to basic styling that assumes external CSS will handle colors/borders
      // We keep the grid structure here for layout
      className="chessboard"
      style={{
        width: 400,
        height: 400,
        position: "relative",
        display: "grid",
        gridTemplateColumns: `repeat(8, ${squareSize}px)`,
        gridTemplateRows: `repeat(8, ${squareSize}px)`,
        // Added standard styling fallback for visibility
        border: "3px solid #333",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}
    >
      {board.map((row, rIdx) =>
        row.map((piece, cIdx) => {
          const square = toSquare(rIdx, cIdx);
          const isLegal = legalMoves.includes(square);
          const isSource = square === sourceSquare;
          const isLast = square === lastMove.from || square === lastMove.to;
          const isLight = (rIdx + cIdx) % 2 === 0;

          // Reverted to original class names for square color and highlighting
          const squareClasses = isLight ? "light" : "dark";

          return (
            <div
              key={square}
              className={`square ${squareClasses} ${isLegal ? "highlight-legal" : ""} 
                          ${isSource ? "highlight-source" : ""} ${isLast ? "last-move" : ""}
                          ${isUserTurn ? "cursor-pointer" : "cursor-default"}
                          `}
              onClick={() => handleSquareClick(square)}
              style={{
                width: squareSize,
                height: squareSize,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // Inline styles for base colors and highlight fallbacks
                backgroundColor: isLight ? "#f0d9b5" : "#b58863",
                // Overrides for highlights
                ...(isLast && {
                  backgroundColor: isLight ? "#e7e7a3" : "#a3c26b",
                }),
                ...(isSource && {
                  border: "3px solid #3d80e8",
                  boxSizing: "border-box",
                }),
              }}
            >
              {/* Highlight for legal moves (dot on empty square) */}
              {isLegal && !piece && (
                <div
                  style={{
                    position: "absolute",
                    width: "33%",
                    height: "33%",
                    backgroundColor: "rgba(50, 50, 50, 0.4)",
                    borderRadius: "50%",
                  }}
                />
              )}

              {/* Highlight for legal moves (ring on occupied square) */}
              {isLegal && piece && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    boxShadow: "inset 0 0 0 4px rgba(50, 50, 50, 0.4)",
                    borderRadius: "50%",
                  }}
                />
              )}

              {/* Piece Image */}
              {piece && (
                <img
                  src={`/assets/pieces/${pieceToFilename(piece)}`}
                  alt={`${piece.color}${piece.type}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  draggable={isUserTurn}
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
