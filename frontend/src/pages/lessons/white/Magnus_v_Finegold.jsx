import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import "./GameLesson.css"; // Make sure you create this CSS file or adjust pat
import Chessboard from "./components/Chessboard";
import LessonControls from "./components/LessonControls";
import Utility from "./Chessboard.jsx";
// =========================================================
// 1. GAME DATA & UTILITIES----#####NEEEEDDD CHANGESSSSSSSSS
// =========================================================

const STARTING_FEN =
  "r2q1rk1/pb3ppp/1pnp1n2/2p1p3/2PPP3/1NPB4/P4PPP/R1BQ1RK1 w Qq - 0 1"; // complete

const GAME_LESSON_MOVES = [
  {
    move: "12. PD5", // compleete
    player: "White",
    explanation:
      "Let's look at the game played between Maagnus & Grandmaster Bardiya Daneshvar. Magnus plays white and Bardiya plays black. In this move, how can Magnus kick a piece to limit Bardiya's activity?",
    fen: "r2q1rk1/pb3ppp/1pnp1n2/2pPp3/2P1P3/1NPB4/P4PPP/R1BQ1RK1 w Qq - 0 1",
    hint: "Try to put pressure on the knight on C6.",
    solution: "Moving the pawn to d5 will pressure the knight on c6.",
  },
  {
    move: "13.Ne7",
    player: "black",
    fen: "r2q1rk1/pb2nppp/1p1p1n2/2pPp3/2P1P3/1NPB4/P4PPP/R1BQ1RK1 w HQhq - 0 1", // complete
  },
  {
    move: "14.Pf4",
    player: "White", //complete
    explanation:
      "You have threatened the knight on c6. and Bartiya has moved his knight to e7. How can you continue to build pressure on the king",
    fen: "r2q1rk1/pb2nppp/1p1p1n2/2pPp3/2P1PP2/1NPB4/P5PP/R1BQ1RK1 w Qq - 0 1",
    hint: "How can you pressure the pawn on e5",
    solution: "Move your pawn(f2) 2 spaces to trick Bartiya to kill it",
  },
  {
    move: "15.Pf4",
    player: "Black",
    fen: "r2q1rk1/pb2nppp/1p1p1n2/2pP4/2P1Pp2/1NPB4/P5PP/R1BQ1RK1 w Qq - 0 1", //complete
  },
  {
    move: "16.Bf4",
    player: "white",
    explanation:
      "Bartiya has taken your pawn on f4. How can you recapture and develop a piece at the same time?",
    fen: "r2q1rk1/pb2nppp/1p1p1n2/2pP4/2P1PB2/1NPB4/P5PP/R2Q1RK1 w HQhq - 0 1",
    hint: "you need to eliminate the pawn on f4",
    solution: "move your bishop from c1 to f4 to eliminate the pawn.", // complete
  },
  {
    // puzzle 3
    move: "17 ...Ng6",
    player: "Black",
    fen: "r2q1rk1/pb3ppp/1p1p1nn1/2pP4/2P1PB2/1NPB4/P5PP/R2Q1RK1 w Qq - 0 1",
  },
  {
    move: "18. Bg5",
    player: "White",
    explanation:
      "Bartiya has moved his knight to g6. How can you respond to this threat while maintaining pressure on Bartiya's position?",
    fen: "r2q1rk1/pb3ppp/1p1p1nn1/2pP2B1/2P1P3/1NPB4/P5PP/R2Q1RK1 w Qq - 0 1",
    hint: "consider moving your bishop from f4",
    solution: "move your bishop from f4 to g5 to pressure the knight.",
  },
  {
    // puzzle 4
    move: "19. Qe8",
    player: "Black",
    fen: "r3qrk1/pb3ppp/1p1p1nn1/2pP2B1/2P1P3/1NPB4/P5PP/R2Q1RK1 w Qq - 0 1",
  },
  {
    move: "20. Rf6",
    player: "White",
    explanation:
      "Bartiya has moved his queen to e8. A bad move. How can you increase the pressure on Bartiya's position and threaten a decisive attack? Think OUTSIDE THE BOX",
    fen: "r3qrk1/pb3ppp/1p1p1Rn1/2pP2B1/2P1P3/1NPB4/P5PP/R2Q2K1 w Qq - 0 1",
    hint: "what are all possible ways you can eliminate the knight on f6",
    solution:
      "Move your rook from f1 to f6 to eliminate the knight on f6. From their the pawn will eliminate the rook and you can move you bishop to f6",
  },
  {
    // puzzle 5
    move: "21. Qd7",
    player: "black",
    fen: "r4rk1/pb1q1p1p/1p1p1Bn1/2pP4/2P1P3/1NPB4/P5PP/R2Q2K1 w Qq - 0 1",
  },
  {
    move: "22. Qh5, 23. Qh6, 24. Qg7",
    player: "White",
    explanation:
      "This looks pretty straight forward. Now that the queen is out of the way, what can you move to put the king on checkmate?",
    fen: "r4rk1/pb1q1p1p/1p1p1Bn1/2pP3Q/2P1P3/1NPB4/P5PP/R5K1 w Qq - 0 1",
    hint: "Think about the opening. Where is the opening and what piece can you put there",
    solution:
      "the right move is to move your queen to h5. From there, you can move in to check the king",
  },
];

// Utility for chessboard squares
Utility();

// =========================================================
// 2. REACT COMPONENT
// =========================================================

function Magnus_v_Finegold() {
  const [game, setGame] = useState(new Chess(STARTING_FEN));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonMessage, setLessonMessage] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const localUrl = "http://localhost:8085/";
  const url = localUrl;
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
          Magnus Carlsen vs.
          <br />
          Finegold
          <br />
          (Interactive Lesson)
        </div>
        <div
          className="lesson-info-box"
          style={{ fontSize: 14, lineHeight: 1.4, width: 400, marginTop: 10 }}
        >
          <p>
            This is a real game from 2017. You'll follow the moves, get hints,
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

export default Magnus_v_Finegold;
