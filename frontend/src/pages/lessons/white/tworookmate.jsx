import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chess } from "chess.js";
import "./GameLesson.css"; // Make sure you create this CSS file or adjust pat
import Chessboard from "./components/Chessboard";
import LessonControls from "./components/LessonControls";
import Utility from "../Chessboard.jsx";
// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN = "8/8/8/1k6/7R/6R1/8/6K1 w - - 0 1"; // complete

const GAME_LESSON_MOVES = [
  {
    move: "1. Rg5+",
    player: "White",
    explanation:
      "Good job. You're on the right track. Rg5+ forces the king to move up.",
    fen: "8/8/8/1k4R1/7R/8/8/6K1 b - - 1 1",
    hint: "How do you force the king to move?",
    solution: "Rg5+ forces the king to move to c6.",
  },
  {
    move: "2. Kc6",
    player: "Black",
    explanation: "Now what?",
    fen: "8/8/2k5/6R1/7R/8/8/6K1 w - - 2 2",
    hint: "Notice any pieces aligned on the same file? If so, try to see if you can do anything about it.",
    solution: "Moving the pawn to d5 will pressure the knight on c6.",
  },
  {
    move: "3. Rh6+",
    player: "White",
    explanation:
      "Good job. You're on the right track. Rh6+ forces the king to move up.",
    fen: "8/8/2k4R/6R1/8/8/8/6K1 b - - 3 2",
    hint: "How do you force the king to move?",
    solution: "Rg5+ forces the king to move to c6.",
  },
  {
    move: "2. Kd7",
    player: "Black",
    explanation: "Now what?",
    fen: "8/3k4/7R/6R1/8/8/8/6K1 w - - 4 3",
    hint: "Notice any pieces aligned on the same file? If so, try to see if you can do anything about it.",
    solution: "Moving the pawn to d5 will pressure the knight on c6.",
  },
  {
    move: "3. Rg7+",
    player: "White",
    explanation:
      "Good job. You're on the right track. Rg7+ forces the king to move up.",
    fen: "8/8/2k4R/6R1/8/8/8/6K1 b - - 3 2",
    hint: "How do you force the king to move?",
    solution: "Rg5+ forces the king to move to c6.",
  },
  {
    move: "2. Ke8",
    player: "Black",
    explanation: "Now what?",
    fen: "4k3/6R1/7R/8/8/8/8/6K1 w - - 6 4",
    hint: "Notice any pieces aligned on the same file? If so, try to see if you can do anything about it.",
    solution: "Moving the pawn to d5 will pressure the knight on c6.",
  },
  {
    move: "3. Rh8#",
    player: "White",
    explanation:
      "Good job. You're on the right track. That's checkmate. You just did a ladder checkmate with two rooks! You should also note how the king was initially on the b file, otherwise the rooks would have to eventually move to a farther square to avoid being captured by the king.",
    fen: "8/8/2k4R/6R1/8/8/8/6K1 b - - 3 2",
    hint: "How do you force the king to move?",
    solution: "Rg5+ forces the king to move to c6.",
  },
];
// Utility for chessboard squares
Utility();
// =========================================================
// 2. REACT COMPONENT
// =========================================================

function pins_and_skewers_practice() {
  const navigate = useNavigate();
  const [game, setGame] = useState(new Chess(STARTING_FEN));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonMessage, setLessonMessage] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  // Feedback box state
  const [feedback, setFeedback] = useState(
    "Practice: Let's see if you can checkmate with two rooks given this position."
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
          King vs 2 Rooks checkmate Lesson
          <br />
          (Interactive Lesson)
        </div>
        <div
          className="lesson-info-box"
          style={{ fontSize: 14, lineHeight: 1.4, width: 400, marginTop: 10 }}
        >
          <p>
            You'll follow the moves, get hints, and solutions along the way.
            Play the moves as White.
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
          Checkmate Lesson Complete
          <div className="ButtonElements">
            <button
              onClick={() =>
                navigate("/lessons/beginner/queen_checkmate_lesson")
              }
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default pins_and_skewers_practice;
//1r3rk1/4bppp/5n2/4q3/2pn4/2NP2P1/PP4BP/R1BQ1RK1 w - - 0 1
