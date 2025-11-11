import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import "./GameLesson.css"; // Make sure you create this CSS file or adjust pat
import Chessboard from "./components/Chessboard";
import LessonControls from "./components/LessonControls";

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN =
  "r2q1rk1/pb3ppp/1pnp1n2/2p1p3/2PPP3/1NPB4/P4PPP/R1BQ1RK1 w Qq - 0 1"; // complete
const GAME_LESSON_MOVES = [
  {
    move: "1. d5", // compleete
    player: "White",
    explanation:
      "The move d5 threatens to capture the knight on c6. Since he does not want to lose a knight without any compensation, Bardiya is forced to respond to the c6 move by playing Na5 or Nb8 or Ne7, making his knight less active.",
    fen: "r2q1rk1/pb3ppp/1pnp1n2/2pPp3/2P1P3/1NPB4/P4PPP/R1BQ1RK1 b - - 0 1",
    hint: "Try to put pressure on the knight on C6.",
    solution: "Moving the pawn to d5 will pressure the knight on c6.",
  },
  {
    move: "1... Ne7", // current scneario before
    player: "Black",
    explanation:
      "Later in the game, Bardiya chose to play Ne7. Later in the game, Magnus decided to gain more activity on the kingside and potentially create more attacks on Bardiya’s king. How did Magnus create his foundation?", // describes current situation
    fen: "r2q1rk1/pb2nppp/1p1p1n2/2pPp3/2P1P3/1NPB4/P4PPP/R1BQ1RK1 w - - 1 2",
    hint: "",
    solution: "Black played Ke7 to capture the bishop on f7.",
  },
  {
    move: "1. f4", // compleete
    player: "White",
    explanation:
      "Congrats. You are on the right track. Lets continue to the next move.",
    fen: "r2q1rk1/pb3ppp/1pnp1n2/2pPp3/2P1PP2/1NPB4/P5PP/R1BQ1RK1 w Qq - 0 1", 
    hint: "Try to put pressure on the pawn on e5.",
    solution: "Moving the pawn to f4 will pressure the pawn on e5.",
  },
  {
    move: "2... exf4", // current scneario before
    player: "Black",
    explanation: "What move did Magnus play next?", // describes current situation
    fen: "r2q1rk1/pb2nppp/1p1p1n2/2pP4/2P1Pp2/1NPB4/P5PP/R1BQ1RK1 w - - 0 3",
    hint: "",
    solution: "Black played Kf7 to capture the bishop on f7.",
  },
  {
    move: "3. Bxf4", // compleete
    player: "White",
    explanation:
      "Magnus opened the f file due to the pawn exchange, which allows his f1 rook to control the f file, developing an attack on the kingside. If you are worried about Magnus’s King safety, don’t be. Even though Magnus’s king experiences an exposed diagonal with the dark squares, Bardiya has no dark squared bishop and most of Bardiya’s pieces are passive, so there is nothing to worry about. If you wonder where the knight on f6 can move, it cannot move to g4 or h5 since Magnus’s queen controls these squares.",
    fen: "r2q1rk1/pb2nppp/1p1p1n2/2pPp3/2P1PP2/1NPB4/P5PP/R1BQ1RK1 b - - 0 1",
    hint: "Try to kill the pawn on f4.",
    solution: "Moving the bishop to f4 will pressure Bardiya's position.",
  },
  {
    move: "3... Ng6", // current scneario before
    player: "Black",
    explanation:
      "Later in the game, Bardiya played Ng6. Magnus decided to create a pin that immobilizes one of Bardiya’s knights and allows the rook more activity. What move did Magnus play?", // describes current situation
    fen: "r2q1rk1/pb3ppp/1p1p1nn1/2pP4/2P1PB2/1NPB4/P5PP/R2Q1RK1 w - - 1 4",
    hint: "",
    solution: "Black played Kg6 to capture the bishop on f7.",
  },
  {
    move: "4. Bg5", // compleete
    player: "White",
    explanation:
      "By playing Bg5, Magnus pins Bardiya’s f6 knight to the queen, meaning that Bardiya would lose his queen if he ever moves his f6 knight. Furthermore, Magnus’s rook on f1 controls more of the f file and is eyeing on the f6 knight, which plays a critical role later in the game.",
    fen: "r2q1rk1/pb3ppp/1p1p1nn1/2pP2B1/2P1P3/1NPB4/P5PP/R2Q1RK1 b - - 2 4",
    hint: "Try to put pressure on the knight on f6.",
    solution: "Moving the bishop to g6 will pressure the knight on f6.",
  },
  {
    move: "4... Qe8", // current scneario before
    player: "Black",
    explanation:
      "Later, Bardiya made a huge blunder by playing Qe8. Later, Magnus punishes Bardiya by playing a brilliant move, weakening Bardiya’s king. How did Magnus do so?", // describes current situation
    fen: "r3qrk1/pb3ppp/1p1p1nn1/2pP2B1/2P1P3/1NPB4/P5PP/R2Q1RK1 w - - 3 5",
    hint: "",
    solution: "Black played Qe8 mistakenly.",
  },
  {
    move: "5. Rxf6", // compleete
    player: "White",
    explanation:
      "BRILLIANT MOVE! Magnus sacrificed THE ROOK! The idea is that after gxf6 (which is what Bardiya plays), Magnus simply plays Bxf6. Lets see why.",
    fen: "r2q1rk1/pb3ppp/1p1p1nn1/2pP2B1/2P1P3/1NPB4/P5PP/R2Q1RK1 b - - 2 4",
    hint: "Try to put pressure on the knight on f6.",
    solution: "Moving the rook will kill the knight on F6 pressuring the knight on g6.",
  },
  {
    move: "5... gxf6", // current scneario before
    player: "Black",
    explanation: "What did Magnus do next", // describes current situation
    fen: "r3qrk1/pb3p1p/1p1p1pn1/2pP2B1/2P1P3/1NPB4/P5PP/R2Q2K1 w - - 0 6",
    hint: "",
    solution: "Black played Pf6 to capture the rook",
  },
  {
    move: "5. Bxf6", // compleete
    player: "White",
    explanation:
      "Even though Magnus did lose a rook, he sacrificed it for a deadlier attack. His bishop on f6 controls the g7 and h8 squares AND the h6 square is not defended. Therefore, Bardiya’s king is in a weak position and Magnus can potentially take advantage of it.",
    fen: "r3qrk1/pb3p1p/1p1p1Bn1/2pP4/2P1P3/1NPB4/P5PP/R2Q2K1 b - - 0 6",
    hint: "Try to put pressure on the pawn on f6.",
    solution: "moving the bishop to f6 will trap the king.",
  },
  {
    move: "5... Qd7", // compleete
    player: "Black",
    explanation:
      "Later Bardiya played Qd7, which doesn’t really do anything. Later, Magnus played a quiet move threatening checkmate in 2 moves. Can you find the move?",
    fen: "r4rk1/pb1q1p1p/1p1p1Bn1/2pP4/2P1P3/1NPB4/P5PP/R2Q2K1 w - - 0 1",
    hint: "",
    solution:
      "Notice how the bishop is occupying the g7 and h8 squares (which are weak squares surrouding Bardiya's king). Lets move the queen to the square that can eventually occupy some of the dark squares.",
  },
  {
    move: "5. Qh5", // compleete
    player: "White",
    explanation:
      "Even though Magnus did lose a rook, he sacrificed it for a deadlier attack. His bishop on f6 controls the g7 and h8 squares AND the h6 square is not defended. Therefore, Bardiya’s king is in a weak position and Magnus can potentially take advantage of it.",
    fen: "r4rk1/pb1q1p1p/1p1p1Bn1/2pP3Q/2P1P3/1NPB4/P5PP/R5K1 b - - 1 1",
    hint: "Try to pressure the king using your queen.",
    solution: "move the queen to h5 to threaten checkmate in 2 moves.",
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

function Magnus_V_Bardiya() {
  const [game, setGame] = useState(new Chess(STARTING_FEN));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonMessage, setLessonMessage] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  // Feedback box state
  const [feedback, setFeedback] = useState(
    "Let's look at the game played between Maagnus & Grandmaster Bardiya Daneshvar. <br>Magnus plays white and Bardiya plays black.</br> In this move, how can Magnus kick a piece to limit Bardiya's activity?"
  ); // this is the intro feedback message

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
          Magnus vs.
          <br />
          Bardiya
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

export default Magnus_V_Bardiya;
