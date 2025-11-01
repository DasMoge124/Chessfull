import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import Chessboard from "./components/Chessboard"; // Ensure path is correct
import "./GameLesson.css"; // Make sure you create this CSS file or adjust pat

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN =
  "r2qkbnr/pp1b1ppp/2n1p3/3pP3/3P4/5N2/PP2BPPP/RNBQK2R b KQkq - 4 7";

const GAME_LESSON_MOVES = [
  {
    move: "7... Nge7",
    player: "Black",
    explanation:
      "If your answer was Ne7, great job! You are on the right track.",
    fen: "r2qkb1r/pp1bnppp/2n1p3/3pP3/3P4/5N2/PP2BPPP/RNBQK2R w KQkq - 5 8",
    hint: "Try to develop your knight and prepare for the middlegame.",
    solution: "Nge7",
  },
  {
    move: "8. Nc3",
    player: "White",
    explanation: "Sina then played Nc3. Now it's Black's turn again.",
    fen: "r2qkb1r/pp1bnppp/2n1p3/3pP3/3P4/2N2N2/PP2BPPP/R1BQK2R b KQkq - 6 8",
    hint: "...",
    solution: "...",
  },
  {
    move: "8... Nf5",
    player: "Black",
    explanation: "Find a more active square for your knight.",
    fen: "r2qkb1r/pp1bnppp/2n1p3/3pPn2/3P4/2N2N2/PP2BPPP/R1BQK2R w KQkq - 0 9",
    hint: "The knight is seeking to control d4.",
    solution: "Nf5",
  },
  {
    move: "9. O-O-O",
    player: "White",
    explanation: "Sina castles long, indicating a sharp game ahead.",
    fen: "r3kb1r/pp1b1ppp/2n1p3/q2pPn2/N2P4/5N2/PP1BBPPP/R2QK2R b KQkq - 0 1", // FEN needs correction for White's move to be shown
    hint: "...",
    solution: "...",
  },
  {
    move: "10. Bb4",
    player: "Black",
    explanation: "Sina castles long, indicating a sharp game ahead.",
    fen: "r3kb1r/pp1b1ppp/2n1p3/q2pPn2/N2P4/5N2/PP1BBPPP/R2QK2R b KQkq - 0 1", // FEN needs correction for White's move to be shown
    hint: "...",
    solution: "Bb4", //You must change both move and Solution
  },
];

// =========================================================
// 3. MAIN LESSON COMPONENT
// =========================================================
function MagnusVSina() {
  const [game, setGame] = useState(new Chess(STARTING_FEN));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonMessage, setLessonMessage] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [feedback, setFeedback] = useState(
    "It is Black's turn. Play 7... Nge7."
  );

  const lesson = GAME_LESSON_MOVES[currentLessonIndex]; // Logic for engine moves and board setup

  useEffect(() => {
    // Skip Black's turn, as the user handles it
    if (lesson && lesson.player === "White" && !gameEnded) {
      setLessonMessage({
        type: "info",
        text: `White played ${lesson.move.split(" ")[1]}.`,
        explanation: lesson.explanation,
      });
      // Update game state and advance lesson after White's move
      const tempGame = new Chess(lesson.fen);
      setGame(tempGame);
      setShowContinue(false);
      setShowHint(false);
      setShowSolution(false);
      // Automatically advance to the next step, setting up Black's turn
      if (currentLessonIndex < GAME_LESSON_MOVES.length - 1) {
        setCurrentLessonIndex((i) => i + 1);
      }
    }
    // When moving to the user's turn (Black), reset messages
    if (lesson && lesson.player === "Black" && game.turn() === "b") {
      setLessonMessage({
        type: "instruction",
        text: `Your turn (Black). Find the best move for ${lesson.move.split(" ")[0]}.`,
        explanation: null,
      });
      setFeedback("");
    }
  }, [currentLessonIndex, gameEnded, lesson, setGame, game.turn()]);

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
        text: "Lesson Complete!",
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
  const clearFeedback = () => setFeedback("");

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
      <div
        className="game-area"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <div
          className="main-title"
          style={{
            fontSize: 36,
            fontWeight: "bold",
            width: 320,
            lineHeight: 1.2,
            marginBottom: 20,
            textAlign: "center",
            color: "#eee",
          }}
        >
          Magnus Carlsen vs.
          <br />
          Sina Khadempour
          <br />
          (Interactive Lesson - **Playing Black**)
        </div>

        {/* CORRECT AND ONLY CHESSBOARD INSTANCE */}
        <Chessboard
          game={game}
          setGame={setGame}
          currentLessonIndex={currentLessonIndex}
          lessonMoves={GAME_LESSON_MOVES}
          setLessonMessage={setLessonMessage}
          setShowContinue={setShowContinue}
          showContinue={showContinue}
          clearFeedback={clearFeedback}
        />
      </div>

      {/* FEEDBACK AND MESSAGE AREA */}
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
          Lesson Complete!
        </div>
      )}
    </div>
  );
}

export default MagnusVSina;
