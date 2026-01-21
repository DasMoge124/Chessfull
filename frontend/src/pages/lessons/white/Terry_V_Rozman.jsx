import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { useNavigate } from "react-router-dom";
import "./GameLesson.css"; // Make sure you create this CSS file or adjust pat
import Chessboard from "./components/Chessboard";
import LessonControls from "./components/LessonControls";

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN = "rnbqk1nr/ppp2ppp/3b4/3p4/3P4/5N2/PPP2PPP/RNBQKB1R w KQkq - 2 5";
const GAME_LESSON_MOVES = [
  {
    move: "1. c4",
    player: "White",
    explanation: "By playing c4, White gains space and attacks the d5 pawn. Good thinking!",
    fen: "rnbqk1nr/ppp2ppp/3b4/3p4/2PP4/5N2/PP3PPP/RNBQKB1R b KQkq c3 0 5",
    hint: "Attack the d5 pawn",
    solution: "Move your c-pawn to c4 to challenge the center.",
  },
  {
    move: "4. dxc4",
    player: "Black",
    explanation: "Black takes your c4 pawn. What do you do to develop a piece and recapture?",
    fen: "rnbqk1nr/ppp2ppp/3b4/8/2pP4/5N2/PP3PPP/RNBQKB1R w KQkq - 0 6",
    hint: "",
    solution: "Black captured on c4.",
  },
  {
    move: "4. Bxc4",
    player: "White",
    explanation: "This develops a piece and recaptures the c4 pawn. Nice job!",
    fen: "rnbqk1nr/ppp2ppp/3b4/8/2BP4/5N2/PP3PPP/RNBQK2R b KQkq - 0 6",
    hint: "Recapture the pawn with your Bishop.",
    solution: "Bxc4 recaptures and develops.",
  },
  {
    move: "4. Bf5", // Development phase skip represented by next FEN
    player: "Black",
    explanation: "Later in the game, the players continued developing pieces. Now, White spots an opportunity to seize the initiative by attacking a piece. How does White do so?",
    fen: "r2q1rk1/ppp2pp1/2nb1n1p/5b2/2BP4/2N2N1P/PP3PP1/R1BQR1K1 w - - 2 11",
    hint: "",
    solution: "The position has evolved through development.",
  },
  {
    move: "1. d5",
    player: "White",
    explanation: "Excellent! This attacks Black’s knight and gives White more space to seize the initiative.",
    fen: "r2q1rk1/ppp2pp1/2nb1n1p/3P1b2/2B5/2N2N1P/PP3PP1/R1BQR1K1 b - - 0 11",
    hint: "Push the d-pawn to attack the Knight.",
    solution: "d5 forces the Knight to move.",
  },
  {
    move: "1. Ne7",
    player: "Black",
    explanation: "Black moves his Knight back to safety. How does White continue his initiative?",
    fen: "r2q1rk1/ppp1npp1/3b1n1p/3P1b2/2B5/2N2N1P/PP3PP1/R1BQR1K1 w - - 1 12",
    hint: "",
    solution: "Black retreated the Knight to e7.",
  },
  {
    move: "1. Nd4",
    player: "White",
    explanation: "Excellent! White attacks the Bishop while gaining even more space, continuing his initiative.",
    fen: "r2q1rk1/ppp1npp1/3b1n1p/3P1b2/2BN4/2N4P/PP3PP1/R1BQR1K1 b - - 2 12",
    hint: "Move your Knight to a central square that attacks the Bishop.",
    solution: "Nd4 centralizes the Knight and pressures f5.",
  },
  {
    move: "1. a6",
    player: "Black",
    explanation: "Black goes 12. … a6, hoping to expand with b5-b4, but overlooks a tactic. What did White play to capitalize on Black’s blunder?",
    fen: "r2q1rk1/1pp1npp1/p2b1n1p/3P1b2/2BN4/2N4P/PP3PP1/R1BQR1K1 w - - 0 13",
    hint: "Look for a way to remove the defender of the f5 Bishop.",
    solution: "Rxe7 removes the defender!",
  },
  {
    move: "2. Rxe7",
    player: "White",
    explanation: "Great work! White removes the Knight which was previously defending the f5 Bishop. A Bishop and Knight are worth more than a Rook here.",
    fen: "r2q1rk1/1pp1Rpp1/p2b1n1p/3P1b2/2BN4/2N4P/PP3PP1/R1BQ2K1 b - - 0 133",
    hint: "Sacrifice the Rook for the Knight.",
    solution: "Rxe7 simplifies into a winning tactic.",
  },
  {
    move: "2. Qxe7",
    player: "Black",
    explanation: "Black captures your Rook. Now, how do you take Black’s hanging piece?",
    fen: "r4rk1/1pp1qpp1/p2b1n1p/3P1b2/2BN4/2N4P/PP3PP1/R1BQ2K1 w - - 0 14",
    hint: "",
    solution: "Black recaptured with the Queen.",
  },
  {
    move: "2. Nxf5",
    player: "White",
    explanation: "Good work! White takes the hanging f5 bishop, because there is no longer a Knight on e7.",
    fen: "r4rk1/1pp1qpp1/p2b1n1p/3P1N2/2B5/2N4P/PP3PP1/R1BQ12K1 b - - 0 14",
    hint: "Capture the Bishop.",
    solution: "Nxf5 gains the piece.",
  },
  {
    move: "1. Qe5",
    player: "Black",
    explanation: "Black moves his Queen away from danger and is now threatening your Knight along with sneaky battery attacks involving Qh2+. How does White escape?",
    fen: "r4rk1/1pp2pp1/p2b1n1p/3PqN2/2B5/2N4P/PP3PP1/R1BQ2K1 w - - 1 15",
    hint: "",
    solution: "Black plays Qe5 creating threats.",
  },
  {
    move: "1. Nxd6",
    player: "White",
    explanation: "This equal trade stops Black from going Qh2+ and also 'defends' your Knight by removing the attacker.",
    fen: "r4rk1/1pp2pp1/p2N1n1p/3Pq3/2B5/2N4P/PP3PP1/R1BQ12K1 b - - 0 15",
    hint: "Trade your Knight for their powerful Bishop.",
    solution: "Nxd6 eliminates the threat of Qh2+.",
  },
  {
    move: "1. Qxd6",
    player: "Black",
    explanation: "Black recaptures your Knight with his Queen. Now, you want to play Bf4 gaining a tempo on the Queen, but your Bishop is unprotected. How do you prepare?",
    fen: "r4rk1/1pp2pp1/p2q1n1p/3P4/2B5/2N4P/PP3PP1/R1BQ2K1 w - - 0 16",
    hint: "",
    solution: "Black recaptured on d6.",
  },
  {
    move: "1. Qf3",
    player: "White",
    explanation: "Good work! This develops the Queen while also preparing for White to go Bf4, gaining a tempo on the Black Queen.",
    fen: "r4rk1/1pp2pp1/p2q1n1p/3P4/2B5/2N2Q1P/PP3PP1/R1B3K1 b - - 1 16",
    hint: "Develop your Queen to protect the f4 square.",
    solution: "Qf3 prepares the next attacking move.",
  },
  {
    move: "1. b5",
    player: "Black",
    explanation: "Black attacks your Bishop with b5. How do you respond?",
    fen: "r4rk1/2p2pp1/p2q1n1p/1p1P4/2B5/2N2Q1P/PP3PP1/R1B3K1 w - b6 0 17",
    hint: "",
    solution: "Black attacks the Bishop.",
  },
  {
    move: "1. Bb3",
    player: "White",
    explanation: "Great job! This retreats your Bishop while also reinforcing d5 so you won’t lose your d5 pawn.",
    fen: "r4rk1/2p2pp1/p2q1n1p/1p1P4/8/1BN2Q1P/PP3PP1/R1B3K1 b - - 1 17",
    hint: "Retreat the Bishop to a square that still guards the d5 pawn.",
    solution: "Bb3 is the most solid retreat.",
  },
  {
    move: "1. Re8",
    player: "Black",
    explanation: "Black goes Re8, threatening Re1+ back rank mate. How do you stop this while also gaining a tempo on the Black Queen?",
    fen: "r3r1k1/2p2pp1/p2q1n1p/1p1P4/8/1BN2Q1P/PP3PP1/R1B3K1 w - - 2 18",
    hint: "",
    solution: "Black occupies the e-file.",
  },
  {
    move: "1. Bf4",
    player: "White",
    explanation: "Good job! This defends against the back-rank threat while also gaining a tempo on the Black Queen.",
    fen: "r3r1k1/2p2pp1/p2q1n1p/1p1P4/5B2/1BN2Q1P/PP3PP1/R5K1 b - - 3 18",
    hint: "Develop your dark-squared bishop to attack the Queen.",
    solution: "Bf4 develops with a threat.",
  },
  {
    move: "1. Qc5",
    player: "Black",
    explanation: "Black moves his Queen to safety, but overlooks a tactic. Look at the f6 Knight and the g7 pawn.",
    fen: "r3r1k1/2p2pp1/p4n1p/1pqP4/5B2/1BN2Q1P/PP3PP1/R5K1 w - - 4 19",
    hint: "",
    solution: "Black Queen retreats to c5.",
  },
  {
    move: "1. Bxh6",
    player: "White",
    explanation: "Congratulations! White takes the pawn. If Black takes back (gxh6), the Knight on f6 hangs!",
    fen: "r3r1k1/2p2pp1/p4n1B/1pqP4/8/1BN2Q1P/PP3PP1/R5K1 b - - 0 19",
    hint: "If White moves his Bishop, his Queen will be attacking Black’s Knight. However, Black’s g-pawn is defending both Black’s h-pawn and Black’s knight. How does White take advantage of this?",
    solution: "Bxh6 wins a pawn due to the pin/overloading.",
  },
  {
    move: "1. Nd7",
    player: "Black",
    explanation: "Black moves his Knight away. White spots a beautiful move that opens a diagonal to attack the f7 pawn.",
    fen: "r3r1k1/2pn1pp1/p6B/1pqP4/8/1BN2Q1P/PP3PP1/R5K1 w - - 1 20",
    hint: "",
    solution: "Black retreats the Knight.",
  },
  {
    move: "1. d6",
    player: "White",
    explanation: "Brilliant move! This opens the a2-g8 diagonal, creating a lethal threat on f7.",
    fen: "r3r1k1/2pn1pp1/p2P3B/1pq5/8/1BN2Q1P/PP3PP1/R5K1 b - - 0 20",
    hint: "Open up the diagonal for your Bishop on b3.",
    solution: "d6 is a powerful interference and opening move.",
  },
  {
    move: "1. Ne5",
    player: "Black",
    explanation: "Black attacks your Queen and Bishop simultaneously. Find the move that defends both and threatens mate!",
    fen: "r3r1k1/2p2pp1/p2P3B/1pq1n3/8/1BN2Q1P/PP3PP1/R5K1 w - - 1 21",
    hint: "",
    solution: "Black counters with Ne5.",
  },
  {
    move: "1. Qg3",
    player: "White",
    explanation: "Excellent work! This creates a pin on the g-file so Black can't take the Bishop, and threatens Qxg7 mate!",
    fen: "r3r1k1/2p2pp1/p2P3B/1pq1n3/8/1BN3QP/PP3PP1/R5K1 b - - 2 21",
    hint: "Move the Queen to a square that pins the g7 pawn.",
    solution: "Qg3 defends and threatens mate.",
  },
  {
    move: "1. g6",
    player: "Black",
    explanation: "Black stops mate. How does White attack the Queen while also threatening a fork on f6?",
    fen: "r3r1k1/2p2p2/p2P2pB/1pq1n3/8/1BN3QP/PP3PP1/R5K1 w - - 0 22",
    hint: "",
    solution: "Black plays g6.",
  },
  {
    move: "1. Ne4",
    player: "White",
    explanation: "Congratulations! This attacks the Queen and prepares Nf6+. White is completely winning.",
    fen: "r3r1k1/2p2p2/p2P2pB/1pq1n3/4N3/1B4QP/PP3PP1/R5K1 b - - 1 22",
    hint: "Look at your Knight's potential for a fork.",
    solution: "Ne4 finishes the combination.",
  }
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

function Terry_V_Rozman() {
  const navigate = useNavigate();
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
    "The game starts with 1. e4 e6 2. d4 d5 3. exd5 exd5 4. Nf3 Bd6. Renato Terry plays White and Levy Rozman plays Black. In this position, White  decides to gain space and take more control of the center. What did White play?"
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

  const advanceLesson = async () => {
    if (currentLessonIndex < GAME_LESSON_MOVES.length - 1) {
      setCurrentLessonIndex((i) => i + 1);
      setLessonMessage(null);
      setShowContinue(false);
      setShowHint(false);
      setShowSolution(false);
    } else {
      // 1. Mark the UI as ended
      setGameEnded(true);
      setLessonMessage({
        type: "info",
        text: "Lesson Complete! Black resigned after 17. h4.",
      });

      // 2. Define the Lesson ID and get the Token
      const lessonId = "terry_v_rozman"; // Unique ID for this specific page
      const token = localStorage.getItem("token")?.trim();

      // 3. Send to Backend
      if (token) {
        try {
          const response = await fetch(url + `api/progress/complete/${lessonId}`, {
            method: "POST",
            headers: { 
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });

          if (response.ok) {
            console.log("Progress saved successfully!");
          } else {
            console.error("Failed to save progress. Status:", response.status);
          }
        } catch (err) {
          console.error("Error connecting to progress API:", err);
        }
      } else {
        console.warn("No token found. Progress not saved. (User might be a guest)");
      }
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
          Terry V
          <br />
          Rozman
          <br />
          (Interactive Lesson)
        </div>
        <div
          className="lesson-info-box"
          style={{ fontSize: 14, lineHeight: 1.4, width: 400, marginTop: 10 }}
        >
          <p>
            This is a real game from 2025. You'll follow the moves, get hints,
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
          <div className="ButtonElements">
            <button onClick={() => navigate("/lessons")}>
              Go back to lessons
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Terry_V_Rozman;
