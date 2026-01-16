import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chess } from "chess.js";
import "./GameLesson.css"; // Make sure you create this CSS file or adjust pat
import Chessboard from "./components/Chessboard";
import LessonControls from "./components/LessonControls";
// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

// FEN for the starting position: 8/1k6/5K2/4Q3/8/8/8/8 w - - 0 1
const STARTING_FEN = "8/1k6/5K2/4Q3/8/8/8/8 w - - 0 1";

const GAME_LESSON_MOVES = [
  // 1. Qd6 - Restricts the Black King to the 7th and 8th ranks
  {
    move: "1. Qd6",
    player: "White",
    explanation:
      "The Queen immediately restricts the Black King to the last two ranks (the 'box' is set). Your King will now approach to help deliver the mate.",
    fen: "8/1k6/3Q1K2/8/8/8/8/8 b - - 0 1",
    hint: "Use the Queen to cut off the King, creating a 'box'.",
    solution: "Qd6 limits the Black King to the 7th and 8th ranks.",
  },
  {
    move: "1... Ka7",
    player: "Black",
    explanation: "Black tries to escape to the corner.",
    fen: "8/k7/3Q1K2/8/8/8/8/8 w - - 2 2",
  },
  // 2. Qc6 - Shrinks the box, keeps the King trapped on the 8th rank
  {
    move: "2. Qc6",
    player: "White",
    explanation:
      "Shrink the box again. The Queen moves along the back rank to keep the King cut off on the 8th rank.",
    fen: "k7/8/2Q2K2/8/8/8/8/8 b - - 1 2",
    hint: "Keep the King on the edge of the board.",
    solution: "Qc6 restricts the King further by staying on the back rank.",
  },
  // 2... Kb8
  {
    move: "2... Kb8",
    player: "Black",
    explanation: "Black tries to hide in the opposite corner.",
    fen: "1k6/8/2Q2K2/8/8/8/8/8 w - - 4 3",
  },
  // 3. Qd7 - Keeps the King in the corner, preparing for the King's approach
  {
    move: "3. Qd7",
    player: "White",
    explanation:
      "A waiting move, maintaining the restriction. Now is the time to bring your King closer to the action.",
    fen: "1k6/3Q4/5K2/8/8/8/8/8 b - - 2 3",
    hint: "The Queen has done its job for now. Move your King closer.",
    solution: "Qd7 maintains the position until the White King can support.",
  },
  // 3... Ka8
  {
    move: "3... Ka8",
    player: "Black",
    explanation: "Black continues to shuffle in the corner.",
    fen: "k7/3Q4/5K2/8/8/8/8/8 w - - 3 4",
  },
  // 4. Ke6 - The White King starts marching
  {
    move: "4. Ke6",
    player: "White",
    explanation:
      "The White King steps closer. The mate is only possible when your King supports the Queen.",
    fen: "k7/3Q4/4K3/8/8/8/8/8 b - - 3 4",
    hint: "Bring the King to help force the mate.",
    solution: "Ke6 moves the King one step closer to the enemy King.",
  },
  // 4... Kb8
  {
    move: "4... Kb8",
    player: "Black",
    explanation: "Black moves back.",
    fen: "1k6/3Q4/4K3/8/8/8/8/8 w - - 4 5",
  },
  // 5. Kd6 - Approaching the opposition
  {
    move: "5. Kd6",
    player: "White",
    explanation:
      "The King is now perfectly positioned, achieving the 'opposition' and cutting off all remaining escape squares on the 7th rank.",
    fen: "1k6/3Q4/3K4/8/8/8/8/8 b - - 4 5",
    hint: "Position your King on the same file/rank, two squares away from the Black King (with a square in between).",
    solution: "Kd6 brings the King into a decisive position.",
  },
  // 5... Ka8
  {
    move: "5... Ka8",
    player: "Black",
    explanation: "Black shifts to the a8 square.",
    fen: "k7/3Q4/3K4/8/8/8/8/8 w - - 5 6",
  },
  // 6. Kc6 - Supporting the final blow
  {
    move: "6. Kc6",
    player: "White",
    explanation:
      "The White King moves adjacent to the Queen's target square (b7), supporting the checkmate.",
    fen: "k7/3Q4/2K5/8/8/8/8/8 b - - 5 6",
    hint: "The Queen's target is b7. Your King must defend the Queen and block escape squares.",
    solution: "Kc6 prepares the final move.",
  },
  // 6... Kb8
  {
    move: "6... Kb8",
    player: "Black",
    explanation: "Black is now forced into the corner with no escape.",
    fen: "1k6/3Q4/2K5/8/8/8/8/8 w - - 6 7",
  },
  // 7. Qb7# - Checkmate!
  {
    move: "7. Qb7#",
    player: "White",
    explanation:
      "Checkmate! The Queen on b7 attacks the King on b8. The White King on c6 blocks the squares c7, c8, and a7. The Queen on b7 also covers the square a8. There are no safe squares for the Black King. Excellent work!",
    fen: "1k6/1Q6/2K5/8/8/8/8/8 b - - 6 7", // FEN for final checkmate position
    hint: "Look for the final checkmate square supported by the King.",
    solution: "Qb7# is checkmate.",
  },
];

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
    "Practice: Let's see if you can checkmate with a king and a queen given this position."
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
          Queen and king checkmate lesson
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

