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
    move: "13. dxe5 Qxe5 14. O-O-O Ke7 15. Bxc6 bxc6",
    player: "Black",
    explanation: "Black plays 13...Qe5 but could have defended better.",
    fen: "r1b4r/p3kp1p/2p1pnp1/3pq3/6P1/2P1BQ2/PP1N1P1P/2KR3R w - - 0 16",
  },
  {
    move: "16. Bd4",
    player: "White",
    explanation: "Strong tactical Bd4 hitting queen + rook.",
    fen: "r1b4r/p3kp1p/2p1pnp1/3p2q1/3B2P1/2P2Q2/PP1N1P1P/2KR3R w - - 2 17",
  },
  {
    move: "17. h4",
    player: "Black",
    explanation:
      "The final blow! Threatens queen, rook, knight. Black resigned.",
    fen: "r1b4r/p3kp1p/2p1pnp1/3p2q1/3B2P1/2P2Q2/PP1N1P1P/2KR3R w - - 2 17",
  },
  {
    move: "17. h4",
    player: "White",
    explanation:
      "The final blow! Threatens queen, rook, knight. Black resigned.",
    fen: "r1b4r/p3kp1p/2p1pnp1/3p2q1/3B2P1/2P2Q2/PP1N1P1P/2KR3R w - - 2 17",
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
  showContinue,
  setShowContinue,
}) => {
  const [board, setBoard] = useState(game.board());
  const [sourceSquare, setSourceSquare] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [lastMove, setLastMove] = useState({ from: null, to: null });

  const squareSize = boardWidth / 8;
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

    const expectedMove = lesson.move.split(" ")[1].replace("...", "").trim();

    if (move.san === expectedMove) {
      setLessonMessage({
        type: "success",
        text: `Correct! ${move.san} was played.`,
        explanation: lesson.explanation,
      });
      setShowContinue(true); // ✅ Wait for user click
    } else {
      game.undo();
      updateBoard();
      setLessonMessage({
        type: "error",
        text: `You played ${move.san}. Expected ${expectedMove}. Try again.`,
        explanation: `Hint: ${lesson.explanation.split(".")[0]}`,
      });
    }
  };

  const advanceLesson = () => {
    if (currentLessonIndex < lessonMoves.length - 1) {
      setCurrentLessonIndex((i) => i + 1);
      setLessonMessage(null);
      setShowContinue(false);
    } else {
      setGameEnded(true);
      setLessonMessage({
        type: "info",
        text: "Lesson Complete! Black resigned after 17. h4.",
      });
      setShowContinue(false);
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

  const handleDragStart = (e, square) => {
    const piece = game.get(square);
    if (isUserTurn && piece && piece.color === game.turn()) {
      setDragging(square);
      setSourceSquare(square);
      setLegalMoves(getLegalMoves(square));
      e.dataTransfer.setData("text/plain", square);
    } else {
      e.preventDefault();
    }
  };

  const handleDrop = (e, targetSquare) => {
    e.preventDefault();
    const fromSquare = dragging;
    setDragging(null);
    setSourceSquare(null);
    setLegalMoves([]);
    if (fromSquare) executeMove(fromSquare, targetSquare);
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
          const isSource = square === sourceSquare;
          const isLast = square === lastMove.from || square === lastMove.to;

          return (
            <div
              key={square}
              className={`square ${(rIdx + cIdx) % 2 === 0 ? "light" : "dark"}
                ${isLegal ? "highlight-legal" : ""}
                ${isSource ? "highlight-source" : ""}
                ${isLast ? "last-move" : ""}`}
              onClick={() => handleSquareClick(square)}
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
                  draggable={isUserTurn}
                  onDragStart={(e) => handleDragStart(e, square)}
                  onDragEnd={handleDragEnd}
                  style={{ width: squareSize, height: squareSize }}
                />
              )}
            </div>
          );
        })
      )}
      {/* ✅ Continue Button */}
      {showContinue && lesson.player === "White" && (
        <button
          onClick={advanceLesson}
          style={{
            position: "absolute",
            bottom: -50,
            right: 0,
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Continue →
        </button>
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
  const [showContinue, setShowContinue] = useState(false);

  const lesson = GAME_LESSON_MOVES[currentLessonIndex];

  useEffect(() => {
    if (lesson && lesson.player === "Black" && !gameEnded) {
      setLessonMessage({
        type: "info",
        text: `Black played ${lesson.move.split(" ")[1]}.`,
        explanation: lesson.explanation,
      });
      const tempGame = new Chess(lesson.fen);
      setGame(tempGame);
      setShowContinue(false); // hide button on Black's turn
      setTimeout(() => {
        setCurrentLessonIndex((i) => i + 1);
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
      {/* HEADER */}
      <div
        className="header-content"
        style={{
          display: "flex",
          width: 800,
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: 40,
        }}
      >
        <div
          className="main-title"
          style={{ fontSize: 40, fontWeight: "bold", width: 300 }}
        >
          Eric Rosen vs.
          <br />
          Emilia Sprzęczka
          <br />
          (Interactive Lesson)
        </div>
        <div
          className="lesson-info-box"
          style={{ width: 400, paddingLeft: 20 }}
        >
          <p style={{ fontSize: 14, color: "#ccc" }}>
            Lesson on the game between IM Eric Rosen (White) and WFM Emilia
            Sprzęczka (Black) in the Accelerated Indian System.
          </p>
          <p style={{ fontSize: 20, fontWeight: "bold" }}>
            {gameEnded
              ? "Game Over"
              : `Your Turn: Play ${lesson.move.split(".")[0]}. ${lesson.player}'s Move`}
          </p>
          {!gameEnded && lesson.player === "White" && (
            <p style={{ fontSize: 14 }}>
              Instruction: Click or drag to play{" "}
              <b>{lesson.move.split(" ")[1]}</b>.
            </p>
          )}
          {lessonMessage && (
            <div
              className={`message ${lessonMessage.type}`}
              style={{
                backgroundColor:
                  lessonMessage.type === "info"
                    ? "#2e4d58"
                    : lessonMessage.type === "success"
                      ? "#335539"
                      : "#571e21",
                color: "#fff",
                padding: 10,
                marginTop: 10,
                borderRadius: 4,
              }}
            >
              <p>
                <strong>{lessonMessage.text}</strong>
              </p>
              {lessonMessage.explanation && <p>{lessonMessage.explanation}</p>}
            </div>
          )}
        </div>
      </div>

      {/* CHESSBOARD */}
      <div style={{ position: "relative" }}>
        <Chessboard
          game={game}
          setGame={setGame}
          currentLessonIndex={currentLessonIndex}
          setCurrentLessonIndex={setCurrentLessonIndex}
          lessonMoves={GAME_LESSON_MOVES}
          setLessonMessage={setLessonMessage}
          setGameEnded={setGameEnded}
          showContinue={showContinue}
          setShowContinue={setShowContinue}
        />
      </div>
    </div>
  );
}

export default EricVEmilia;
