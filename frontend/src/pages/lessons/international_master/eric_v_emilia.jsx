import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN =
  "r1b1k2r/ppq2p1p/2nbpnp1/1B1pN3/3P2P1/2P1B3/PP1N1P1P/R2QK2R w KQkq - 3 12";

const GAME_LESSON_MOVES = [
  {
    move: "12. Qf3",
    player: "White",
    explanation:
      "Developing a piece and winning a tempo by attacking the knight on d6...",
    fen: "r1b2rk1/p1q1ppbp/1p4p1/2p1P3/8/2PBBN2/PP3PPP/R2Q1RK1 b - - 0 12",
  },
  {
    move: "13. ... Qe5",
    player: "Black",
    explanation: "Black plays 13...Qe5 but could have defended better.",
    fen: "r1b2rk1/p3ppbp/1p4p1/2p1q3/8/2PBBN2/PP3PPP/R2Q1RK1 w - - 0 13",
  },
  {
    move: "16. Bd4",
    player: "White",
    explanation: "Strong tactical Bd4 hitting queen + rook.",
    fen: "r3k2r/pp2ppbp/2nn2p1/1Bpnq3/3B4/2P1BQ2/PP1N1PPP/R3K2R b KQkq - 1 16",
  },
  {
    move: "17. h4",
    player: "White",
    explanation:
      "The final blow! Threatens queen, rook, knight. Black resigned.",
    fen: "r3k2r/pp2ppbp/2nn2p1/1Bpnq3/3B3P/2P1BQ2/PP1N1PPP/R3K2R b KQkq - 1 17",
  },
];

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const toSquare = (row, col) => files[col] + (8 - row);

const pieceToFilename = (piece) => {
  if (!piece) return null;
  const color = piece.color === "w" ? "w" : "b";
  const type = piece.type.toUpperCase();
  return `${color}${type}.svg`;
};

// =========================================================
// 2. CHESSBOARD COMPONENT (Updated for Click-to-Move)
// =========================================================

const Chessboard = ({
  game,
  setGame,
  currentLessonIndex,
  setCurrentLessonIndex,
  lessonMoves,
  setLessonMessage,
  setGameEnded,
  boardWidth = 400,
}) => {
  const [board, setBoard] = useState(game.board());
  const [sourceSquare, setSourceSquare] = useState(null); // New state for click-to-move source
  const [dragging, setDragging] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [lastMove, setLastMove] = useState({ from: null, to: null });

  const squareSize = boardWidth / 8;
  const lesson = lessonMoves[currentLessonIndex];
  const isUserTurn = game.turn() === "w" && lesson.player === "White";

  useEffect(() => {
    setBoard([...game.board()]);
  }, [game]);

  const updateBoard = () => {
    setBoard([...game.board()]);
  };

  const getLegalMoves = (square) =>
    game.moves({ square, verbose: true }).map((m) => m.to);

  // ===============================================
  // MOVE EXECUTION & LESSON VALIDATION (Shared Logic)
  // ===============================================
  const executeMove = (fromSquare, toSquare) => {
    const move = game.move({
      from: fromSquare,
      to: toSquare,
      promotion: "q",
    });

    if (move) {
      setLastMove({ from: move.from, to: move.to });
      updateBoard();

      const expectedMove = lesson.move.split(" ")[1].replace("...", "").trim();

      if (move.san === expectedMove) {
        setLessonMessage({
          type: "success",
          text: `Correct! ${move.san} was played.`,
          explanation: lesson.explanation,
        });
        setTimeout(advanceLesson, 3000);
      } else {
        game.undo();
        updateBoard();
        setLessonMessage({
          type: "error",
          text: `You played ${move.san}. The lesson expected ${expectedMove}. Try again.`,
          explanation: `Hint: ${lesson.explanation.split(".")[0]}`,
        });
      }
    }
  };

  const advanceLesson = () => {
    if (currentLessonIndex < lessonMoves.length - 1) {
      setCurrentLessonIndex((i) => i + 1);
      setLessonMessage(null);
    } else {
      setGameEnded(true);
      setLessonMessage({
        type: "info",
        text: "Lesson Complete! Black resigned after 17. h4.",
      });
    }
  };

  // ===============================================
  // CLICK HANDLER
  // ===============================================
  const handleSquareClick = (square) => {
    if (!isUserTurn) return; // Only allow clicks on White's turn

    const piece = game.get(square);

    // 1. No source selected yet: Select a white piece
    if (!sourceSquare) {
      if (piece && piece.color === game.turn()) {
        setSourceSquare(square);
        setLegalMoves(getLegalMoves(square));
      }
      return;
    }

    // 2. Source selected: Try to move to the new square
    if (legalMoves.includes(square)) {
      executeMove(sourceSquare, square);
      // Reset state after move attempt
      setSourceSquare(null);
      setLegalMoves([]);
    }
    // 3. Source selected, but clicked own piece: Change source piece
    else if (piece && piece.color === game.turn() && square !== sourceSquare) {
      setSourceSquare(square);
      setLegalMoves(getLegalMoves(square));
    }
    // 4. Source selected, clicked an illegal/empty square: Deselect
    else {
      setSourceSquare(null);
      setLegalMoves([]);
    }
  };

  // ===============================================
  // DRAG/DROP HANDLERS
  // ===============================================
  const handleDragStart = (e, square) => {
    const piece = game.get(square);
    if (isUserTurn && piece && piece.color === game.turn()) {
      setDragging(square);
      setSourceSquare(square); // Sync drag with source state for highlighting
      setLegalMoves(getLegalMoves(square));
      e.dataTransfer.setData("text/plain", square);
    } else {
      e.preventDefault();
    }
  };

  const handleDrop = (e, targetSquare) => {
    e.preventDefault();
    const fromSquare = dragging;

    // Reset states
    setDragging(null);
    setSourceSquare(null);
    setLegalMoves([]);

    if (!fromSquare) return;

    executeMove(fromSquare, targetSquare);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDragEnd = () => {
    setDragging(null);
    setSourceSquare(null);
    setLegalMoves([]);
  };

  return (
    <div
      className="chessboard"
      style={{ width: boardWidth, height: boardWidth }}
    >
      {board.map((row, rIdx) =>
        row.map((piece, cIdx) => {
          const square = toSquare(rIdx, cIdx);
          const isLegal = legalMoves.includes(square);
          const isSource = square === sourceSquare; // Highlight for click-to-move
          const isLast = square === lastMove.from || square === lastMove.to;

          return (
            <div
              key={square}
              className={`square ${(rIdx + cIdx) % 2 === 0 ? "light" : "dark"} 
                ${isLegal ? "highlight-legal" : ""} 
                ${isSource ? "highlight-source" : ""}
                ${isLast ? "last-move" : ""}`}
              onClick={() => handleSquareClick(square)} // Click handler added
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, square)}
              style={{ width: squareSize, height: squareSize }}
            >
              {isLegal && !piece && <div className="legal-dot" />}
              {isLegal && piece && <div className="legal-ring" />}

              {piece && (
                <img
                  src={`/assets/pieces/${pieceToFilename(piece)}`}
                  alt={`${piece.color}${piece.type}`}
                  className="piece-img"
                  draggable={isUserTurn} // Only draggable on user's turn
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

// =========================================================
// 3. MAIN LESSON COMPONENT
// =========================================================

function EricVEmilia() {
  const [game, setGame] = useState(new Chess(STARTING_FEN));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonMessage, setLessonMessage] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);

  const lesson = GAME_LESSON_MOVES[currentLessonIndex];

  // Black moves automatically
  useEffect(() => {
    if (lesson && lesson.player === "Black" && !gameEnded) {
      setLessonMessage({
        type: "info",
        text: `Black played ${lesson.move.split(" ")[1]}.`,
        explanation: lesson.explanation,
      });

      const tempGame = new Chess(lesson.fen);
      setGame(tempGame);

      setTimeout(() => {
        setCurrentLessonIndex((i) => i + 1);
        setLessonMessage(null);
      }, 4000);
    }
  }, [currentLessonIndex, gameEnded, lesson]);

  return (
    <div
      className="page-container"
      style={{
        margin: 0,
        padding: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* CSS Block for correct 8x8 rendering and styling, including new source highlight */}
      <style>{`
        body { background-color: black; color: white; margin: 0; }
        .chessboard { display: flex; flex-wrap: wrap; border: 2px solid #333; box-sizing: content-box; margin-top: 10px; }
        .square { box-sizing: border-box; position: relative; cursor: pointer; }
        .light { background-color: #f0d9b5; }
        .dark { background-color: #b58863; }
        .last-move { background-color: #f6f669 !important; }
        
        .highlight-source { 
            box-shadow: inset 0 0 0 4px #44aaff; /* Blue border for selected piece */
        }

        .piece-img { position: absolute; top: 0; left: 0; pointer-events: auto; z-index: 2; }
        .legal-dot { width: 16px; height: 16px; background-color: rgba(0, 0, 0, 0.4); border-radius: 50%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1; }
        .legal-ring { width: 80%; height: 80%; border: 3px solid rgba(255, 0, 0, 0.5); border-radius: 50%; position: absolute; top: 10%; left: 10%; z-index: 1; }
        
        .header-content {
            display: flex;
            width: 800px;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            margin-top: 40px;
        }
        .main-title {
            font-size: 40px;
            line-height: 1.1;
            font-weight: bold;
            flex-shrink: 0;
            width: 300px;
            text-align: left;
        }
        .lesson-info-box {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 400px;
            padding-left: 20px;
        }
        .lesson-subtitle {
            font-size: 14px;
            margin-bottom: 10px;
            color: #ccc;
        }
        .turn-info {
            font-size: 20px;
            font-weight: bold;
        }
        .instruction {
            font-size: 14px;
            margin-top: 5px;
        }
        
        .message { padding: 10px; margin-top: 10px; border-radius: 4px; width: 100%; }
        .success { background-color: #335539; color: #aaffaa; border: 1px solid #c3e6cb; }
        .error { background-color: #571e21; color: #ffaaaa; border: 1px solid #f5c6cb; }
        .info { background-color: #2e4d58; color: #aaeaff; border: 1px solid #bee5eb; }
      `}</style>

      {/* HEADER CONTENT: Title and Instructions side-by-side */}
      <div className="header-content">
        <div className="main-title">
          Eric Rosen vs.
          <br />
          Emilia Sprzęczka
          <br />
          (Interactive Lesson)
        </div>

        <div className="lesson-info-box">
          <p className="lesson-subtitle">
            Lesson on the game between IM Eric Rosen (White) and WFM Emilia
            Sprzęczka (Black) in the Accelerated Indian System.
          </p>

          <p className="turn-info">
            {gameEnded
              ? "Game Over"
              : `Your Turn: Play ${lesson.move.split(".")[0]}. ${lesson.player}'s Move`}
          </p>

          {!gameEnded && lesson.player === "White" && (
            <p className="instruction">
              Instruction: Click or drag a piece to play **
              {lesson.move.split(" ")[1]}**.
            </p>
          )}

          {lessonMessage && (
            <div className={`message ${lessonMessage.type}`}>
              <p>
                <strong>{lessonMessage.text}</strong>
              </p>
              {lessonMessage.explanation && <p>{lessonMessage.explanation}</p>}
            </div>
          )}
        </div>
      </div>

      {/* CHESSBOARD */}
      <Chessboard
        game={game}
        setGame={setGame}
        currentLessonIndex={currentLessonIndex}
        setCurrentLessonIndex={setCurrentLessonIndex}
        lessonMoves={GAME_LESSON_MOVES}
        setLessonMessage={setLessonMessage}
        setGameEnded={setGameEnded}
      />
    </div>
  );
}

export default EricVEmilia;
