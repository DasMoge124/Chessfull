import React, { useState, useEffect } from "react";
// import { Chess } from "chess.js"; // Assume Chess is available globally or imported elsewhere
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
  showContinue,
  clearFeedback,
}) => {
  const [board, setBoard] = useState(game.board());
  const [sourceSquare, setSourceSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [lastMove, setLastMove] = useState({ from: null, to: null });

  // NEW STATE for Promotion Handling
  const [promotionPending, setPromotionPending] = useState(false);
  const [promotionMove, setPromotionMove] = useState({ from: null, to: null });

  // 400px / 8 squares = 50px per square
  const squareSize = 400 / 8;
  const lesson = lessonMoves[currentLessonIndex];
  const isUserTurn = game.turn() === "w" && lesson.player === "White";

  useEffect(() => {
    setBoard([...game.board()]);
  }, [game]);

  const updateBoard = () => setBoard([...game.board()]);

  const getLegalMoves = (square) =>
    game.moves({ square, verbose: true }).map((m) => m.to);

  // UPDATED: Now accepts an optional promotion piece
  const executeMove = (fromSquare, toSquare, promotionPiece = "q") => {
    const piece = game.get(fromSquare);
    const targetRank = game.turn() === "w" ? "8" : "1";

    // Check if the move is a pawn move to the last rank, AND we haven't specified a promotion piece yet
    const requiresPromotionChoice =
      piece &&
      piece.type === "p" &&
      toSquare.endsWith(targetRank) &&
      !promotionPending; // Check only if not already pending

    // If promotion choice is required, pause and show the modal
    if (requiresPromotionChoice) {
      setPromotionPending(true);
      setPromotionMove({ from: fromSquare, to: toSquare });
      return;
    }

    // Configure the move, including 'promotion' if it's required (or explicitly passed)
    const moveConfig = {
      from: fromSquare,
      to: toSquare,
      ...(requiresPromotionChoice ||
      (piece.type === "p" && toSquare.endsWith(targetRank))
        ? { promotion: promotionPiece }
        : {}),
    };

    const move = game.move(moveConfig);

    if (!move) return;

    setLastMove({ from: move.from, to: move.to });
    updateBoard();

    // Lesson feedback logic
    const moveParts = lesson.move.split(" ");
    const expectedMove =
      moveParts.length > 1 ? moveParts[1].replace("...", "").trim() : "";

    // Clean SAN for comparison: remove promotion notation (=Q, =R, etc.)
    const cleanedSan = move.san.replace(/=\w/g, "");
    const cleanedExpectedMove = expectedMove.replace(/=\w/g, "");

    if (cleanedSan === cleanedExpectedMove || move.san === expectedMove) {
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
        explanation: null,
        showHint: false,
        showSolution: false,
      });
      setShowContinue(false); // Hide next move button
    }
  };

  // NEW FUNCTION: Handles the user's promotion choice and executes the move
  const handlePromotionChoice = (piece) => {
    if (!promotionPending || !promotionMove.from || !promotionMove.to) return;

    // Execute the move with the chosen promotion piece ('q', 'r', 'b', 'n')
    executeMove(promotionMove.from, promotionMove.to, piece);

    // Clear promotion state
    setPromotionPending(false);
    setPromotionMove({ from: null, to: null });

    // Clear highlight states
    setSourceSquare(null);
    setLegalMoves([]);
  };

  const handleSquareClick = (square) => {
    // Block clicks while promotion modal is open
    if (!isUserTurn || promotionPending) return;

    const piece = game.get(square);

    if (!sourceSquare) {
      if (piece && piece.color === game.turn()) {
        setSourceSquare(square);
        setLegalMoves(getLegalMoves(square));
      }
      return;
    }

    if (legalMoves.includes(square)) {
      if (clearFeedback) clearFeedback();

      // Execute move. This will either move the piece or trigger promotionPending state
      executeMove(sourceSquare, square);

      // Only clear source/legal moves if promotion is NOT pending
      if (!promotionPending) {
        setSourceSquare(null);
        setLegalMoves([]);
      }
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

          // Variables for file and rank notation
          const rank = 8 - rIdx;
          const file = ["a", "b", "c", "d", "e", "f", "g", "h"][cIdx];

          const squareClasses = isLight ? "light" : "dark";

          return (
            <div
              key={square}
              className={`square ${squareClasses} ${isLegal ? "highlight-legal" : ""} 
                        ${isSource ? "highlight-source" : ""} ${isLast ? "last-move" : ""}
                        ${isUserTurn && !promotionPending ? "cursor-pointer" : "cursor-default"}
                        `}
              onClick={() => handleSquareClick(square)}
              // --- FILE AND RANK NOTATION DATA ATTRIBUTES ---
              {...(cIdx === 7 && {
                "data-rank": rank,
              })} /* Right edge (h-file) */
              {...(rIdx === 7 && {
                "data-file": file,
              })} /* Bottom edge (1st rank) */
              // --- END NOTATION ---
              style={{
                width: squareSize,
                height: squareSize,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...(isSource && {
                  border: "3px solid #3d80e8",
                  boxSizing: "border-box",
                }),
              }}
            >
              {/* Highlight for legal moves (dot on empty square) */}
              {isLegal && !piece && <div className="legal-dot" />}

              {/* Highlight for legal moves (ring on occupied square) */}
              {isLegal && piece && <div className="legal-ring" />}

              {/* Piece Image */}
              {piece && (
                <img
                  src={`/assets/pieces/${pieceToFilename(piece)}`}
                  alt={`${piece.color}${piece.type}`}
                  className="piece-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  draggable={isUserTurn && !promotionPending}
                />
              )}
            </div>
          );
        })
      )}

      {/* --- PROMOTION OVERLAY --- */}
      {promotionPending && (
        <div className="promotion-overlay">
          <div className="promotion-dialog">
            <h3>Choose a piece for promotion:</h3>
            <div className="promotion-choices">
              {["q", "r", "b", "n"].map((type) => (
                <button
                  key={type}
                  onClick={() => handlePromotionChoice(type)}
                  className="promotion-piece-button"
                >
                  <img
                    src={`/assets/pieces/${pieceToFilename({
                      color: game.turn(),
                      type: type,
                    })}`}
                    alt={type}
                    className="piece-img"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* --- END PROMOTION OVERLAY --- */}
    </div>
  );
};

export default Chessboard;
