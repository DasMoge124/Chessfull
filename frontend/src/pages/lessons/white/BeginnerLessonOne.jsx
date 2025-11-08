import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import "./GameLesson.css"; // Make sure you create this CSS file or adjust pat
import Chessboard from "./components/Chessboard";
import LessonControls from "./components/LessonControls";

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN =
  "rnb1kbnr/ppp1pppp/4q3/8/8/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 4";

const GAME_LESSON_MOVES = [
  {
    move: "1. Be2",
    player: "White",
    explanation:
      "This move blocks the check from the queen while also developing the light-squared bishop, which is more prefered compared to developing the knight as developing the light-squared bishop can lead to quicker development after a potential move like Nf3.",
    fen: "r1b2rk1/p1q1ppbp/1p4p1/2p1P3/8/2PBBN2/PP3PPP/R2Q1RK1 b - - 0 12",
    hint: "Try to put pressure on the knight on f6.",
    solution: "The correct move is Qf3, attacking the knight and developing.",
  },
  {
    move: "1... Qc6",
    player: "Black",
    explanation:
      "After this move, black played 4… Qc6, attacking the undefended g2 pawn and threatening h1 rook behind it but there was a critical error in his defenses. How can White punish this mistake?",
    fen: "rnb1kbnr/ppp1pppp/2q5/8/8/2N5/PPPPBPPP/R1BQK1NR w KQkq - 4 5",
    hint: "White’s bishop is active, and Black's queen and king are aligned diagonally.",
    solution:
      "Black played Qe5, but a better defensive move was possible to avoid loss of material.",
  },
  {
    move: "2. Bb5",
    player: "White",
    explanation:
      "This move wins a queen by pinning it to the king, with the bishop defended by the knight.",
    fen: "rn2kbnr/ppp1pppp/2q5/1B6/6b1/2N5/PPPP1PPP/R1BQK1NR w KQkq - 6 6",
    hint: "Look for pins and attacks on high-value pieces.",
    solution: "Bd4 is a strong move pinning Black’s queen to the rook.",
  },
  {
    move: "2... Bg4",
    player: "Black",
    explanation:
      "Black responded with one more trick 5… Bg4, hoping to trade queens with a counterattack. How can White neutralize this while also keeping the pin on the Black queen? ",
    fen: "rn2kbnr/ppp1pppp/2q5/1B6/6b1/2N5/PPPP1PPP/R1BQK1NR w KQkq - 6 6",
    hint: "Push pawns to open lines for attack.",
    solution: "h4 threatens to open lines and forces Black’s resignation.",
  },
  {
    move: "3. Qxg4",
    player: "White",
    explanation:
      "This removes the attacking bishop while also maintaining the pin on the queen, so White will end up winning both pieces.",
    fen: "r1b4r/p3kp1p/2p1pnp1/3p2q1/3B2PP/2P2Q2/PP1N1P2/2KR3R b - h3 0 17",
    hint: "Push pawns to open lines for attack.",
    solution: "h4 threatens to open lines and forces Black’s resignation.",
  },
  {
    move: "3... Nf6",
    player: "Black",
    explanation:
      "After this, Black played the move 6… Nf6, attacking White’s queen. Should White retreat, or is there a better move here?",
    fen: "rn2kb1r/ppp1pppp/2q2n2/1B6/6Q1/2N5/PPPP1PPP/R1B1K1NR w KQkq - 1 7",
    hint: "Think of checks!",
    solution: "h4 threatens to open lines and forces Black’s resignation.",
  },
  {
    move: "4. Qc8#",
    player: "White",
    explanation:
      "White immediately checkmates Black by utilizing the weak undeveloped back rank defending the king. Although retreating would still have White in a winning position, White used the weak king’s defense to checkmate Black immediately.",
    fen: "r1b4r/p3kp1p/2p1pnp1/3p2q1/3B2PP/2P2Q2/PP1N1P2/2KR3R b - h3 0 17",
    hint: "Think of checks!",
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

function beginner_game_one() {
  const [game, setGame] = useState(new Chess(STARTING_FEN));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonMessage, setLessonMessage] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  // Feedback box state
  const [feedback, setFeedback] = useState(
    "The game started with the Scandinavian Defense, with the sequence 1.e4 d5 2. exd5 Qxd5 3. Nc3, with black responded by checking the white king with 3. Qe6+, a somewhat sub-optimal move compared to the regularly played book moves, like Qa5 or Qd6 keeping the black queen active and safe. How did White respond to this check while also developing a piece?"
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
          marginTop: 0,
          marginBottom: 0,
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
          Eric Rosen vs Emilia Sprzęczka
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
          Lesson Complete! Congratulations! These are the topics covered:
          Opening Principles, Pins, Hanging Pieces, Checkmate in One.
          <div className="ButtonElements">
            <button onClick={() => navigate("/learn/beginner")}>
              Go back to lessons
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default beginner_game_one;
