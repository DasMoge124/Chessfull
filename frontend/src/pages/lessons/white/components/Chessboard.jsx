import React, { useState, useEffect } from "react";
import "./Chessboard.css";

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
  clearFeedback,
}) => {
  const [board, setBoard] = useState(game.board());
  const [sourceSquare, setSourceSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [lastMove, setLastMove] = useState({ from: null, to: null });

  const [promotionPending, setPromotionPending] = useState(false);
  const [promotionMove, setPromotionMove] = useState({ from: null, to: null });

  const squareSize = 400 / 8;
  const lesson = lessonMoves[currentLessonIndex];
  const isUserTurn = game.turn() === "w" && lesson.player === "White";

  // SYNC BOARD AND TRACES
  // This effect runs whenever the game instance changes (e.g., clicking "Next")
  useEffect(() => {
    setBoard([...game.board()]);
    
    // Auto-update last move trace based on the game's actual history
    const history = game.history({ verbose: true });
    if (history.length > 0) {
      const latest = history[history.length - 1];
      setLastMove({ from: latest.from, to: latest.to });
    } else {
      setLastMove({ from: null, to: null });
    }
  }, [game]);

  const updateBoard = () => setBoard([...game.board()]);

  const executeMove = (fromSquare, toSquare, promotionPiece = "q") => {
    const piece = game.get(fromSquare);
    const targetRank = game.turn() === "w" ? "8" : "1";

    const requiresPromotionChoice =
      piece &&
      piece.type === "p" &&
      toSquare.endsWith(targetRank) &&
      !promotionPending;

    if (requiresPromotionChoice) {
      setPromotionPending(true);
      setPromotionMove({ from: fromSquare, to: toSquare });
      return;
    }

    const moveConfig = {
      from: fromSquare,
      to: toSquare,
      ...(piece?.type === "p" && toSquare.endsWith(targetRank)
        ? { promotion: promotionPiece }
        : {}),
    };

    const move = game.move(moveConfig);
    if (!move) return;

    updateBoard();

    // Lesson validation logic
    const moveParts = lesson.move.split(" ");
    const expectedMove = moveParts.length > 1 ? moveParts[1].replace("...", "").trim() : "";
    const cleanedSan = move.san.replace(/=\w/g, "");
    const cleanedExpectedMove = expectedMove.replace(/=\w/g, "");

    if (cleanedSan === cleanedExpectedMove || move.san === expectedMove) {
      setLessonMessage({
        type: "success",
        text: `Correct! ${move.san} was played.`,
        explanation: lesson.explanation,
      });
      setShowContinue(true);
    } else {
      game.undo();
      updateBoard();
      setLessonMessage({
        type: "error",
        text: `You played ${move.san}. Try again.`,
        explanation: null,
      });
      setShowContinue(false);
    }
  };

  /* --- DRAG AND DROP HANDLERS --- */
  const handleDragStart = (e, square) => {
    if (!isUserTurn || promotionPending) {
      e.preventDefault();
      return;
    }
    setSourceSquare(square);
    setLegalMoves(game.moves({ square, verbose: true }).map((m) => m.to));
    e.dataTransfer.setData("sourceSquare", square);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, targetSquare) => {
    e.preventDefault();
    const draggedSource = e.dataTransfer.getData("sourceSquare");

    if (draggedSource && game.moves({ square: draggedSource, verbose: true }).some(m => m.to === targetSquare)) {
      if (clearFeedback) clearFeedback();
      executeMove(draggedSource, targetSquare);
    }
    setSourceSquare(null);
    setLegalMoves([]);
  };

  /* --- CLICK HANDLER --- */
  const handleSquareClick = (square) => {
    if (!isUserTurn || promotionPending) return;

    const piece = game.get(square);

    if (!sourceSquare) {
      if (piece && piece.color === game.turn()) {
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
    } else if (piece && piece.color === game.turn()) {
      setSourceSquare(square);
      setLegalMoves(game.moves({ square, verbose: true }).map((m) => m.to));
    } else {
      setSourceSquare(null);
      setLegalMoves([]);
    }
  };

  const handlePromotionChoice = (piece) => {
    if (!promotionPending) return;
    executeMove(promotionMove.from, promotionMove.to, piece);
    setPromotionPending(false);
    setPromotionMove({ from: null, to: null });
    setSourceSquare(null);
    setLegalMoves([]);
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
      }}
    >
      {board.map((row, rIdx) =>
        row.map((piece, cIdx) => {
          const square = toSquare(rIdx, cIdx);
          const isLegal = legalMoves.includes(square);
          const isSource = square === sourceSquare;
          const isLast = square === lastMove.from || square === lastMove.to;
          const isLight = (rIdx + cIdx) % 2 === 0;

          const rank = 8 - rIdx;
          const file = ["a", "b", "c", "d", "e", "f", "g", "h"][cIdx];

          return (
            <div
              key={square}
              className={`square ${isLight ? "light" : "dark"} 
                        ${isLast ? "last-move-trace" : ""}
                        ${isUserTurn && !promotionPending ? "cursor-pointer" : ""}`}
              onClick={() => handleSquareClick(square)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, square)}
              {...(cIdx === 7 && { "data-rank": rank })}
              {...(rIdx === 7 && { "data-file": file })}
              style={{
                width: squareSize,
                height: squareSize,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...(isSource && { outline: "3px solid #3d80e8", outlineOffset: "-3px" }),
              }}
            >
              {isLegal && !piece && <div className="legal-dot" />}
              {isLegal && piece && <div className="legal-ring" />}

              {piece && (
                <img
                  src={`/assets/pieces/${pieceToFilename(piece)}`}
                  alt={`${piece.color}${piece.type}`}
                  className="piece-img"
                  draggable={isUserTurn && !promotionPending}
                  onDragStart={(e) => handleDragStart(e, square)}
                />
              )}
            </div>
          );
        })
      )}

      {promotionPending && (
        <div className="promotion-overlay">
          <div className="promotion-dialog">
            <h3>Promote to:</h3>
            <div className="promotion-choices">
              {["q", "r", "b", "n"].map((type) => (
                <button
                  key={type}
                  onClick={() => handlePromotionChoice(type)}
                  className="promotion-piece-button"
                >
                  <img
                    src={`/assets/pieces/${pieceToFilename({ color: game.turn(), type })}`}
                    alt={type}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chessboard;