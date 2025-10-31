import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";

// Convert row/column → algebraic notation
const toSquare = (row, col) => {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return `${files[col]}${8 - row}`;
};

// Map piece object → filename
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

  const squareSize = 400 / 8;
  const lesson = lessonMoves[currentLessonIndex];
  const isUserTurn = lesson.player === "Black"; // ✅ Always let user move Black pieces

  useEffect(() => {
    setBoard([...game.board()]);
  }, [game]);

  const updateBoard = () => setBoard([...game.board()]);

  const getLegalMoves = (square) =>
    game.moves({ square, verbose: true }).map((m) => m.to);

  const executeMove = (fromSquare, toSquare) => {
    const move = game.move({ from: fromSquare, to: toSquare, promotion: "q" });

    if (!move) {
      // Illegal move — feedback only
      setLessonMessage({
        type: "error",
        text: `That move isn’t valid. Try again.`,
        explanation: null,
      });
      setShowContinue(false);
      return;
    }

    setLastMove({ from: move.from, to: move.to });
    updateBoard();

    const moveParts = lesson.move.split(" ");
    const expectedMove =
      moveParts.length > 1 ? moveParts[1].replace("...", "").trim() : "";
    const expectedSan = lesson.solution || expectedMove;

    if (move.san.toLowerCase().includes(expectedSan.toLowerCase())) {
      const newGame = new Chess(game.fen());
      setGame(newGame);
      setLessonMessage({
        type: "success",
        text: `Correct! ${move.san} was played.`,
        explanation: lesson.explanation,
      });
      setShowContinue(true);
    } else {
      setLessonMessage({
        type: "error",
        text: `You played ${move.san}. Try again.`,
        explanation: null,
      });
      setShowContinue(false);
      setTimeout(() => {
        game.undo();
        updateBoard();
      }, 500);
    }
  };

  const handleSquareClick = (square) => {
    if (!isUserTurn) return;
    const piece = game.get(square);

    if (!sourceSquare) {
      // Select only if it's Black’s piece
      if (piece && piece.color === "b") {
        setSourceSquare(square);
        setLegalMoves(getLegalMoves(square));
      }
      return;
    }

    if (legalMoves.includes(square)) {
      if (clearFeedback) clearFeedback();
      executeMove(sourceSquare, square);
      setSourceSquare(null);
      setLegalMoves([]);
    } else if (piece && piece.color === "b") {
      setSourceSquare(square);
      setLegalMoves(getLegalMoves(square));
    } else {
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
        gridTemplateColumns: `repeat(8, ${squareSize}px)`,
        gridTemplateRows: `repeat(8, ${squareSize}px)`,
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

          return (
            <div
              key={square}
              className={`square ${isLight ? "light" : "dark"} ${
                isLegal ? "highlight-legal" : ""
              } ${isSource ? "highlight-source" : ""} ${
                isLast ? "last-move" : ""
              } ${isUserTurn ? "cursor-pointer" : "cursor-default"}`}
              onClick={() => handleSquareClick(square)}
              style={{
                width: squareSize,
                height: squareSize,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isLight ? "#f0d9b5" : "#b58863",
                ...(isLast && {
                  backgroundColor: isLight ? "#e7e7a3" : "#a3c26b",
                }),
                ...(isSource && {
                  border: "3px solid #3d80e8",
                  boxSizing: "border-box",
                }),
              }}
            >
              {/* Dots for legal moves */}
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

              {/* Circle on occupied target */}
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

              {/* Piece */}
              {piece && (
                <img
                  src={`/assets/pieces/${pieceToFilename(piece)}`}
                  alt={`${piece.color}${piece.type}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  draggable={false}
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
