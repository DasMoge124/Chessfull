import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import "./GameLesson.css"; // Make sure you create this CSS file or adjust pat
import Chessboard from "./components/Chessboard";
import LessonControls from "./components/LessonControls";
import { useNavigate } from "react-router-dom";

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN =
  "rnbqkb1r/pp2pppp/2p2n2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 2 4";

const GAME_LESSON_MOVES = [
  {
    move: "1. e5",
    player: "White",
    explanation:
      "This move takes space, forcing blacks knight to a more passive space on d7, blocking his other knight and light squared bishop.",
    fen: "rnbqkb1r/pp2pppp/2p2n2/3pP3/3P4/2N5/PPP2PPP/R1BQKBNR b KQkq - 0 4",
    hint: "How can you gain space while forcing the opponent to move one of his pieces to a more passive position?",
    solution:
      "The answer is 4. e5. This move takes space, forcing blacks knight to a more passive space on d7, blocking his other knight and light squared bishop.",
  },
  {
    move: "2... Nd7, 5. Nf3 Na6 6. Bd3 g6",
    player: "Black",
    explanation:
      "The game continues with 4. Nd7, 5. Nf3 Na6 6. Bd3 g6, a mistake weakening black’s defenses. How can White attack and force material gain?",
    fen: "r1bqkb1r/pp1npp1p/n1p3p1/3pP3/3P4/2NB1N2/PPP2PPP/R1BQK2R w KQkq - 0 7",
    hint: "",
    solution: "",
  },
  {
    move: "3. Ng5",
    player: "White",
    explanation:
      "If h6, white can sacrifice the knight to expose the king, following up by sacrificing the pawn to lure black into a trap by attacking with the queen and 2 bishops ready to strike.",
    fen: "r1bqkb1r/pp1npp1p/n1p3p1/3pP1N1/3P4/2NB4/PPP2PPP/R1BQK2R b KQkq - 1 7",
    hint: "People can be confused about what they wanna do in this position. But in positions like this, it's best to try to attack the kingside, since it provides opportunities to develop kingside weaknesses, which makes it easier for white to initiate attacks against black's king.",
    solution:
      "This threatens to sacrifice the knight to expose the king, following up by sacrificing the pawn to lure black into a trap by attacking with the queen and 2 bishops ready to strike.",
  },
  {
    move: "4. Bg7",
    player: "Black",
    explanation:
      "Black plays 7... Bg7, so now White is in a position to attack. How can white gain material?",
    fen: "r1bqk2r/pp1nppbp/n1p3p1/3pP1N1/3P4/2NB4/PPP2PPP/R1BQK2R w KQkq - 2 8",
    hint: "",
    solution: "",
  },
  {
    move: "5. e6",
    player: "White",
    explanation:
      "This move threatens to take on f7 with check, and if black takes back, white gains an outpost by moving the knight to e6 while threatening blacks queen.",
    hint: "Let's try attacking the f7 square,not only with one piece.",
    solution:
      "This threatens to sacrifice the knight to expose the king, following up by sacrificing the pawn to lure black into a trap by attacking with the queen and 2 bishops ready to strike.",
  },
  {
    move: "6. Bxd4",
    player: "Black",
    explanation:
      "After this black again made a mistake, playing 8. Bxd4. Black was too greedy and will face severe consequences. How can white attack?",
    fen: "r1bqk2r/pp1npp1p/n1p1P1p1/3p2N1/3b4/2NB4/PPP2PPP/R1BQK2R w KQkq - 0 9",
  },
  {
    move: "9. exf7+", // 9. exf7+
    player: "White",
    explanation:
      "Correct! 9. exf7+ is a strong move. It checks Black's king and wins material. Black must play 9...Kf8.",
    fen: "r1bqk2r/pp1npP1p/n1p3p1/3p2N1/3b4/2NB4/PPP2PPP/R1BQK2R b KQkq - 0 9",
    hint: "How can you exploit the f7 pawn and the exposed King? Check is always a good start.",
    solution:
      "The answer is 9. exf7+. This move forks the King and the Rook, and if Black attempts to block, White gains a decisive advantage.",
  },
  {
    move: "9... Kf8",
    player: "Black",
    explanation:
      "How can you punish black’s defensive weakness to gain material?",
    fen: "r1bq1k1r/pp1npP1p/n1p3p1/3p2N1/3b4/2NB4/PPP2PPP/R1BQK2R w KQ - 1 10",
  },
  {
    move: "10. Ne6+", // 9. exf7+
    player: "White",
    explanation:
      "This move forks blacks queen and king, winning a queen for a knight and pawn. Black now has a significant material advantage.",
    fen: "r1bqk2r/pp1npP1p/n1p3p1/3p2N1/3b4/2NB4/PPP2PPP/R1BQK2R b KQkq - 0 9",
    hint: "Remember to look for checks, captures, and attacks. If you are still stuck, here are more questions to consider: Do you notice any outposts (especially for knights)? Notice any pieces aligned in some sort of manner, with each piec placed in a square that an opposing piece can potentially control?",
    solution:
      "This move forks blacks queen and king, winning a queen for a knight and pawn. Black now has a significant material advantage.",
  },
  {
    move: "10... Kxf7",
    player: "Black",
    explanation:
      "Black eventually played Kxf7, winning a pawn; yet, Black still loses a major piece. What does White do next?",
    fen: "r1bq3r/pp1npk1p/n1p1N1p1/3p4/3b4/2NB4/PPP2PPP/R1BQK2R w KQ - 0 11",
  },
  {
    move: "10. Nxd8+", // 9. exf7+
    player: "White",
    explanation:
      "This moves allows White's knight to capture a queen. Even though the queen is defended by the rook, remember: Queens are worth more than knights.",
    fen: "r1bqk2r/pp1npP1p/n1p3p1/3p2N1/3b4/2NB4/PPP2PPP/R1BQK2R b KQkq - 0 9",
    hint: "Remember to look for checks, captures, and attacks. Also: Don't forget how much each piece is worth. Usually, it's better to capture the piece with more value.",
    solution:
      "This move forks blacks queen and king, winning a queen for a knight and pawn. Black now has a significant material advantage.",
  },
  {
    move: "16... Ng4",
    player: "Black",
    explanation:
      "The game continues with 10. Kxf7 11. Nxd8+ Rxd8 12. Qf3+ to attack Black’s weak king, Nf6 by black 13. O-O to activate the rook Bxc3, 14. Bxc3 Nc5 15. Bg5 Kg7 16. Re1 to activate the rook, and the mistake Ng4 by black. How can white force a checkmate in 3 moves?",
    fen: "r1br4/pp2p1kp/2p3p1/2np2B1/6n1/2PB1Q2/P1P2PPP/R3R1K1 w - - 5 17",
  },
  {
    move: "17. Rxe7+",
    player: "White",
    explanation: "This move forces black’s king into the back rank.",
    fen: "r1bqk2r/pp1npP1p/n1p3p1/3p2N1/3b4/2NB4/PPP2PPP/R1BQK2R b KQkq - 0 9",
    hint: "Remember to look for checks, captures, and attacks. If you are still stuck, here are more questions to consider: Do you notice any outposts (especially for knights)? Notice any pieces aligned in some sort of manner, with each piec placed in a square that an opposing piece can potentially control?",
    solution: "This move forces black’s king into the back rank.",
  },
  {
    move: "17... Kg8",
    player: "Black",
    explanation:
      "Black responded with Kg8. How does White continue the checkmate?",
    fen: "r1br2k1/pp2R2p/2p3p1/2np2B1/6n1/2PB1Q2/P1P2PPP/R5K1 w - - 1 18",
  },
  {
    move: "18. Qf7+",
    player: "White",
    explanation: "This continues the checkmate sequence",
    fen: "r1bqk2r/pp1npP1p/n1p3p1/3p2N1/3b4/2NB4/PPP2PPP/R1BQK2R b KQkq - 0 9",
    hint: "Remember to look for checks, captures, and attacks. ",
    solution: "This continues the checkmate sequence",
  },
  {
    move: "18... Kh8",
    player: "Black",
    explanation:
      "Black responded with Kh8. How does White continue the checkmate?",
    fen: "r1br3k/pp2RQ1p/2p3p1/2np2B1/6n1/2PB4/P1P2PPP/R5K1 w - - 3 19",
  },
  {
    move: "19. Qxh7#",
    player: "White",
    explanation: "CHECKMATE!",
    fen: "r1bqk2r/pp1npP1p/n1p3p1/3p2N1/3b4/2NB4/PPP2PPP/R1BQK2R b KQkq - 0 9",
    hint: "Remember to look for checks, captures, and attacks.",
    solution: "CHECKMATE!",
  },
];

// Utility for chessboard squares
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const toSquare = (row, col) => files[col] + (8 - row);
const localurl = "http://localhost:8085/";
const url = localurl;

const pieceToFilename = (piece) => {
  if (!piece) return null;
  const color = piece.color === "w" ? "w" : "b";
  const type = piece.type.toUpperCase();
  return `${color}${type}.svg`;
};

function beginner_game_two() {
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
    "The game begins with the the classical variation of caro-kann defense with 1. E4 c6 2. D4 d5 3. Nc3 with black playing the inaccurate 3. Nf6. What can white play to gain an advantage?"
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

  const advanceLesson = async() => {
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
      const lessonId = "beginner_game_2"; // Unique ID for this specific page
      const token = localStorage.getItem("token")?.trim();

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
          Beginner Game
          <br />
          (Interactive Lesson)
        </div>
        <div
          className="lesson-info-box"
          style={{ fontSize: 14, lineHeight: 1.4, width: 400, marginTop: 10 }}
        >
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
          Opening Principles, Forks, Deflection, Kingside Attacks, Hanging
          Pieces, Checkmate in Three.
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

export default beginner_game_two;
