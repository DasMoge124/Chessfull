import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";

// Convert internal coordinates to algebraic (a1, h8, etc.)
const toSquare = (row, col) => {
  // Logic specifically for Black's perspective
  const files = ["h", "g", "f", "e", "d", "c", "b", "a"];
  return `${files[col]}${8 - row}`;
};

// Map piece object to the SVG filename
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
  clearFeedback,
}) => {
  const [board, setBoard] = useState(game.board());
  const [sourceSquare, setSourceSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [lastMove, setLastMove] = useState({ from: null, to: null });

  const squareSize = 400 / 8;
  const lesson = lessonMoves[currentLessonIndex];
  const isUserTurn = lesson.player === "Black";

  useEffect(() => {
    setBoard([...game.board()]);
  }, [game]);

  const updateBoard = () => setBoard([...game.board()]);

  const executeMove = (fromSquare, toSquare) => {
    const move = game.move({ from: fromSquare, to: toSquare, promotion: "q" });

    if (!move) {
      setLessonMessage({
        type: "error",
        text: `Invalid move. Try again.`,
        explanation: null,
      });
      return;
    }

    setLastMove({ from: move.from, to: move.to });
    updateBoard();

    const moveParts = lesson.move.split(" ");
    const expectedMove = moveParts.length > 1 ? moveParts[1].replace("...", "").trim() : "";
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

  // --- Drag & Drop Handlers ---
  const handleDragStart = (e, square) => {
    if (!isUserTurn) return;
    const piece = game.get(square);
    if (piece && piece.color === "b") {
      e.dataTransfer.setData("sourceSquare", square);
      setSourceSquare(square);
      setLegalMoves(game.moves({ square, verbose: true }).map((m) => m.to));
    } else {
      e.preventDefault();
    }
  };

  const handleDrop = (e, targetSquare) => {
    e.preventDefault();
    const draggedSource = e.dataTransfer.getData("sourceSquare");
    if (draggedSource) {
      if (clearFeedback) clearFeedback();
      executeMove(draggedSource, targetSquare);
    }
    setSourceSquare(null);
    setLegalMoves([]);
  };

  const onDragOver = (e) => e.preventDefault();

  // --- Click Handlers ---
  const handleSquareClick = (square) => {
    if (!isUserTurn) return;
    const piece = game.get(square);

    if (!sourceSquare) {
      if (piece && piece.color === "b") {
        setSourceSquare(square);
        setLegalMoves(game.moves({ square, verbose: true }).map((m) => m.to));
      }
      return;
    }

    if (legalMoves.includes(square)) {
      if (clearFeedback) clearFeedback();
      executeMove(sourceSquare, square);
      setSourceSquare(null);
      setLegalMoves([]);
    } else {
      // Re-select if another black piece is clicked, otherwise clear
      if (piece && piece.color === "b") {
        setSourceSquare(square);
        setLegalMoves(game.moves({ square, verbose: true }).map((m) => m.to));
      } else {
        setSourceSquare(null);
        setLegalMoves([]);
      }
    }
  };

  const reversedRowIndices = [7, 6, 5, 4, 3, 2, 1, 0];
  const reversedColIndices = [7, 6, 5, 4, 3, 2, 1, 0];
  const filesLabels = ["a", "b", "c", "d", "e", "f", "g", "h"];

  return (
    <div
      className="chessboard-container"
      style={{
        width: 400,
        height: 400,
        display: "grid",
        gridTemplateColumns: `repeat(8, 1fr)`,
        gridTemplateRows: `repeat(8, 1fr)`,
        border: "3px solid #111",
        backgroundColor: "#242526",
        userSelect: "none",
        position: "relative"
      }}
    >
      {reversedRowIndices.map((rIdx, vRow) =>
        reversedColIndices.map((cIdx, vCol) => {
          const piece = board[rIdx][cIdx];
          const square = toSquare(rIdx, reversedColIndices.indexOf(cIdx));
          
          const isLegal = legalMoves.includes(square);
          const isSource = square === sourceSquare;
          const isLast = square === lastMove.from || square === lastMove.to;
          
          const isLight = (rIdx + cIdx) % 2 !== 0; 
          const lightColor = "#31333b"; 
          const darkColor = "#242526";
          const labelColor = "#999";

          return (
            <div
              key={square}
              onClick={() => handleSquareClick(square)}
              onDragOver={onDragOver}
              onDrop={(e) => handleDrop(e, square)}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isLight ? lightColor : darkColor,
                transition: "background 0.15s",
                ...(isLast && { backgroundColor: isLight ? "#4d533b" : "#3b402b" }),
                ...(isSource && { backgroundColor: "#264653" }),
              }}
            >
              {/* Algebraic Ranks (left edge) */}
              {vCol === 0 && (
                <span style={{
                  position: "absolute", top: 2, left: 2, fontSize: 10,
                  fontWeight: "bold", color: labelColor, pointerEvents: "none"
                }}>
                  {8 - rIdx}
                </span>
              )}

              {/* Algebraic Files (bottom edge) */}
              {vRow === 7 && (
                <span style={{
                  position: "absolute", bottom: 2, right: 2, fontSize: 10,
                  fontWeight: "bold", color: labelColor, pointerEvents: "none"
                }}>
                  {filesLabels[7 - vCol]}
                </span>
              )}

              {/* Piece rendering with Drag ability */}
              {piece && (
                <img
                  src={`/assets/pieces/${pieceToFilename(piece)}`}
                  alt={`${piece.color}${piece.type}`}
                  draggable={isUserTurn && piece.color === "b"}
                  onDragStart={(e) => handleDragStart(e, square)}
                  style={{
                    width: "85%",
                    height: "85%",
                    cursor: isUserTurn && piece.color === "b" ? "grab" : "default",
                    zIndex: 2
                  }}
                />
              )}

              {/* Legal Move Hints */}
              {isLegal && !piece && (
                <div style={{
                  width: "25%", height: "25%", backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "50%"
                }} />
              )}
              {isLegal && piece && (
                <div style={{
                  position: "absolute", width: "90%", height: "90%",
                  border: "4px solid rgba(255,255,255,0.08)", borderRadius: "50%"
                }} />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Chessboard;