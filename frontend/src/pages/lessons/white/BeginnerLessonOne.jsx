import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import "./GameLesson.css"; // Make sure you create this CSS file or adjust pat
import Chessboard from "./components/Chessboard";
import LessonControls from "./components/LessonControls";

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN =
  "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2";

const GAME_LESSON_MOVES = [
  {
    move: "2. exd5",
    player: "White",
    explanation:
      "Developing a piece and winning a tempo by attacking the knight on f6...",
    fen: "r1b2rk1/p1q1ppbp/1p4p1/2p1P3/8/2PBBN2/PP3PPP/R2Q1RK1 b - - 0 12",
    hint: "Try to put pressure on the knight on f6.",
    solution: "The correct move is Qf3, attacking the knight and developing.",
  },
  {
    move: "2. Qxd5",
    player: "Black",
    explanation: "Black plays 13...Qe5 but could have defended better.",
    fen: "rnb1kbnr/ppp1pppp/8/3q4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 3",
    hint: "Black should look to improve king safety.",
    solution:
      "Black played Qe5, but a better defensive move was possible to avoid loss of material.",
  },
  {
    move: "3. Nc3",
    player: "White",
    explanation: "Strong tactical Bd4 hitting queen + rook.",
    fen: "rnb1kbnr/ppp1pppp/8/3q4/8/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 3",
    hint: "Look for pins and attacks on high-value pieces.",
    solution: "Bd4 is a strong move pinning Black’s queen to the rook.",
  },
  {
    move: "4. Qg5",
    player: "Black",
    explanation: "Find the final blow",
    fen: "r1b4r/p3kp1p/2p1pnp1/3p2q1/3B2P1/2P2Q2/PP1N1P1P/2KR3R w - - 2 17",
    hint: "Push pawns to open lines for attack.",
    solution: "h4 threatens to open lines and forces Black’s resignation.",
  },
  {
    move: "18. h4",
    player: "White",
    explanation:
      "The final blow! Threatens queen, rook, knight. Black resigned.",
    fen: "r1b4r/p3kp1p/2p1pnp1/3p2q1/3B2PP/2P2Q2/PP1N1P2/2KR3R b - h3 0 17",
    hint: "Push pawns to open lines for attack.",
    solution: "h4 threatens to open lines and forces Black’s resignation.",
  },
];

// Utility for chessboard squares
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const toSquare = (row, col) => files[col] + (8 - row);

const pieceToFilename = (piece) => {
  if (!piece) return null;
  const color = piece.color === "w" ? "w" : "b";
  const type = piece.type.toUpperCase();
  return `${color}${type}.svg`;
};

function BeginnerLessonOne() {
  const [game, setGame] = useState(new Chess(STARTING_FEN));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonMessage, setLessonMessage] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  // Feedback box state
  const [feedback, setFeedback] = useState(
    "Could have defended the knight better<br />Loses tempo<br />Should have moved Bd7"
  );

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
      setShowContinue(false);
      setShowHint(false);
      setShowSolution(false);
      // Instantly advance to next move (no cooldown)
      if (currentLessonIndex < GAME_LESSON_MOVES.length - 1) {
        setCurrentLessonIndex((i) => i + 1);
      }
    }
  }, [currentLessonIndex, gameEnded, lesson]);

  const advanceLesson = () => {
    if (currentLessonIndex < GAME_LESSON_MOVES.length - 1) {
      setCurrentLessonIndex((i) => i + 1);
      setLessonMessage(null);
      setShowContinue(false);
      setShowHint(false);
      setShowSolution(false);
    } else {
      setGameEnded(true);
      setLessonMessage({
        type: "info",
        text: "Lesson Complete! Black resigned after 17. h4.",
      });
    }
  };

  const toggleHint = () => {
    setShowHint((prev) => !prev);
    if (!showHint) setShowSolution(false);
  };

  const toggleSolution = () => {
    setShowSolution((prev) => !prev);
    if (!showSolution) setShowHint(false);
  };

  return (
    <div
      className="page-container"
      style={{
        margin: 0,
        padding: 20,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#1e1e1e",
        color: "#eee",
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
          marginBottom: 20,
        }}
      >
        <div
          className="main-title"
          style={{
            fontSize: 36,
            fontWeight: "bold",
            width: 320,
            lineHeight: 1.2,
          }}
        >
          Eric Rosen vs.
          <br />
          Emilia Sprzęczka
          <br />
          (Interactive Lesson)
        </div>
        <div
          className="lesson-info-box"
          style={{ fontSize: 14, lineHeight: 1.4, width: 400, marginTop: 10 }}
        >
          <p>
            This is a real game from 2020. You'll follow the moves, get hints,
            and solutions along the way. Play the moves as White.
          </p>
          <p>Click on a piece, then the square you want to move to.</p>
        </div>
      </div>

      {/* CHESSBOARD */}
      <Chessboard
        game={game}
        setGame={setGame}
        currentLessonIndex={currentLessonIndex}
        lessonMoves={GAME_LESSON_MOVES}
        setLessonMessage={setLessonMessage}
        setShowContinue={setShowContinue}
        showContinue={showContinue}
        clearFeedback={() => setFeedback("")}
      />

      {/* FEEDBACK BOX (blue, temporary) */}
      {feedback && (
        <div
          className="feedback-box"
          style={{
            background: "#1976d2",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
            marginTop: "16px",
            fontSize: "1.1em",
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.15)",
            maxWidth: "400px",
            textAlign: "left",
          }}
          dangerouslySetInnerHTML={{ __html: feedback }}
        />
      )}

      {/* LESSON MESSAGE */}
      {lessonMessage && (
        <div
          className={`lesson-message ${lessonMessage.type}`}
          style={{
            marginTop: 20,
            maxWidth: 700,
            padding: 12,
            backgroundColor:
              lessonMessage.type === "error"
                ? "#8b0000"
                : lessonMessage.type === "success"
                  ? "#006400"
                  : "#004080",
            borderRadius: 8,
          }}
        >
          <strong>{lessonMessage.text}</strong>
          {lessonMessage.explanation && (
            <p style={{ marginTop: 8 }}>{lessonMessage.explanation}</p>
          )}
        </div>
      )}

      {/* HINT & SOLUTION BUTTONS */}
      {lessonMessage?.type === "error" && (
        <div
          className="hint-solution-buttons"
          style={{ marginTop: 10, display: "flex", gap: 10 }}
        >
          <button
            onClick={toggleHint}
            style={{
              backgroundColor: showHint ? "#646401ff" : "#646401ff",
              color: "#eee",
              padding: "8px 12px",
              borderRadius: 5,
              border: "none",
              cursor: "pointer",
            }}
          >
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
          <button
            onClick={toggleSolution}
            style={{
              backgroundColor: showSolution ? "#009b39ff" : "#009b39ff",
              color: "#eee",
              padding: "8px 12px",
              borderRadius: 5,
              border: "none",
              cursor: "pointer",
            }}
          >
            {showSolution ? "Hide Solution" : "Show Solution"}
          </button>
        </div>
      )}

      {/* HINT & SOLUTION TEXT */}
      {showHint && lessonMessage?.type === "error" && (
        <div
          className="hint-text"
          style={{
            marginTop: 10,
            maxWidth: 700,
            padding: 12,
            backgroundColor: "#646401ff",
            borderRadius: 8,
            fontStyle: "italic",
          }}
        >
          <strong>Hint:</strong> {lesson.hint}
        </div>
      )}
      {showSolution && lessonMessage?.type === "error" && (
        <div
          className="solution-text"
          style={{
            marginTop: 10,
            maxWidth: 700,
            padding: 12,
            backgroundColor: "#009b39ff",
            borderRadius: 8,
            fontStyle: "italic",
          }}
        >
          <strong>Solution:</strong> {lesson.solution}
        </div>
      )}

      {/* CONTINUE / NEXT MOVE BUTTON */}
      {showContinue && !gameEnded && (
        <button
          onClick={advanceLesson}
          style={{
            marginTop: 20,
            backgroundColor: "#0055cc",
            color: "#fff",
            borderRadius: 6,
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Next Move
        </button>
      )}

      {/* GAME END MESSAGE */}
      {gameEnded && (
        <div
          style={{
            marginTop: 30,
            fontSize: 18,
            fontWeight: "bold",
            color: "#aaffaa",
          }}
        >
          Lesson Complete! Black resigned after 17. h4.
        </div>
      )}
    </div>
  );
}

export default BeginnerLessonOne;
