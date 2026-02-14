import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import "./Lesson.css";
import Chessboard from "./components/Chessboard";
import ParticleBackground from "../../../components/Particles";

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN =
  "r2q1rk1/pb3ppp/1pnp1n2/2p1p3/2PPP3/1NPB4/P4PPP/R1BQ1RK1 w Qq - 0 1";

const GAME_LESSON_MOVES = [
  {
    move: "12. PD5",
    player: "White",
    explanation:
      "Let's look at the game played between Maagnus & Grandmaster Bardiya Daneshvar. Magnus plays white and Bardiya plays black. In this move, how can Magnus kick a piece to limit Bardiya's activity?",
    fen: "r2q1rk1/pb3ppp/1pnp1n2/2pPp3/2P1P3/1NPB4/P4PPP/R1BQ1RK1 w Qq - 0 1",
    hint: "Try to put pressure on the knight on C6.",
    solution: "Moving the pawn to d5 will pressure the knight on c6.",
  },
  {
    move: "13.Ne7",
    player: "Black",
    explanation: "Black plays Ne7.",
    fen: "r2q1rk1/pb2nppp/1p1p1n2/2pPp3/2P1P3/1NPB4/P4PPP/R1BQ1RK1 w HQhq - 0 1",
    hint: "",
    solution: "Black played Ne7.",
  },
  {
    move: "14.Pf4",
    player: "White",
    explanation:
      "You have threatened the knight on c6. and Bartiya has moved his knight to e7. How can you continue to build pressure on the king",
    fen: "r2q1rk1/pb2nppp/1p1p1n2/2pPp3/2P1PP2/1NPB4/P5PP/R1BQ1RK1 w Qq - 0 1",
    hint: "How can you pressure the pawn on e5",
    solution: "Move your pawn(f2) 2 spaces to trick Bartiya to kill it",
  },
  {
    move: "15.Pf4",
    player: "Black",
    explanation: "Black captures on f4.",
    fen: "r2q1rk1/pb2nppp/1p1p1n2/2pP4/2P1Pp2/1NPB4/P5PP/R1BQ1RK1 w Qq - 0 1",
    hint: "",
    solution: "Black played Pf4.",
  },
  {
    move: "16.Bf4",
    player: "White",
    explanation:
      "Bartiya has taken your pawn on f4. How can you recapture and develop a piece at the same time?",
    fen: "r2q1rk1/pb2nppp/1p1p1n2/2pP4/2P1PB2/1NPB4/P5PP/R2Q1RK1 w HQhq - 0 1",
    hint: "you need to eliminate the pawn on f4",
    solution: "move your bishop from c1 to f4 to eliminate the pawn.",
  },
  {
    move: "17 ...Ng6",
    player: "Black",
    explanation: "Black plays Ng6.",
    fen: "r2q1rk1/pb3ppp/1p1p1nn1/2pP4/2P1PB2/1NPB4/P5PP/R2Q1RK1 w Qq - 0 1",
    hint: "",
    solution: "Black played Ng6.",
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
    move: "19. Qe8",
    player: "Black",
    explanation: "Black plays Qe8.",
    fen: "r3qrk1/pb3ppp/1p1p1nn1/2pP2B1/2P1P3/1NPB4/P5PP/R2Q1RK1 w Qq - 0 1",
    hint: "",
    solution: "Black played Qe8.",
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
    move: "21. Qd7",
    player: "Black",
    explanation: "Black plays Qd7.",
    fen: "r4rk1/pb1q1p1p/1p1p1Bn1/2pP4/2P1P3/1NPB4/P5PP/R2Q2K1 w Qq - 0 1",
    hint: "",
    solution: "Black played Qd7.",
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

// =========================================================
// 3. MAIN LESSON COMPONENT
// =========================================================

function Magnus_v_Finegold() {
  const [game, setGame] = useState(new Chess(STARTING_FEN));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonMessage, setLessonMessage] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const [feedback, setFeedback] = useState(
    "Could have defended the knight better<br />Loses tempo<br />Should have moved Bd7",
  );

  const localUrl = "http://localhost:8085/";
  const url = localUrl;
  const lesson = GAME_LESSON_MOVES[currentLessonIndex];

  useEffect(() => {
    if (lesson && lesson.player === "Black" && !gameEnded) {
      // Show Black's move immediately without delay
      setLessonMessage({
        type: "info",
        text: `Black played ${lesson.move.split(" ")[1]}.`,
        explanation: lesson.explanation,
      });
      setGame(new Chess(lesson.fen));
      setFeedback(""); // Clear feedback to avoid duplicate display
      setShowContinue(false);
      setShowHint(false);
      setShowSolution(false);
      if (currentLessonIndex < GAME_LESSON_MOVES.length - 1) {
        setCurrentLessonIndex((i) => i + 1);
      }
    }
  }, [currentLessonIndex, gameEnded, lesson]);

  const advanceLesson = async () => {
    if (currentLessonIndex < GAME_LESSON_MOVES.length - 1) {
      const nextIndex = currentLessonIndex + 1;
      setCurrentLessonIndex(nextIndex);
      // Only set feedback if the next move is a White move (player's turn)
      // Don't set it for Black moves since they'll show in lessonMessage
      if (GAME_LESSON_MOVES[nextIndex].player === "White") {
        setFeedback(GAME_LESSON_MOVES[nextIndex].explanation);
      } else {
        setFeedback(""); // Clear feedback for Black moves
      }
      setLessonMessage(null);
      setShowContinue(false);
      setShowHint(false);
      setShowSolution(false);
    } else {
      setGameEnded(true);
      setLessonMessage({ type: "info", text: "Lesson Complete!" });
      const lessonId = "magnus_v_finegold_001";
      const token = localStorage.getItem("token")?.trim();
      if (token) {
        try {
          await fetch(url + `api/progress/complete/${lessonId}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        } catch (err) {
          console.error(err);
        }
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
    <div className="page-container">
      <ParticleBackground />

      {/* Content Container keeps everything in the center/side-by-side */}
      <div className="main-content-wrapper">
        <h1 className="advanced-page-title">Advanced Page</h1>

        <div className="header-content">
          <div className="main-title">
            Magnus Carlsen vs. Finegold
            <br />
            (Interactive Lesson)
          </div>
          <div className="lesson-info-box">
            <p>
              This is a real game from 2017. You'll follow the moves, get hints,
              and solutions along the way. Play the moves as White.
            </p>
            <p>Click on a piece, then the square you want to move to.</p>
          </div>
        </div>

        <div className="lesson-area">
          <div className="chessboard-container">
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
          </div>

          <div className="lesson-content">
            {feedback && !lessonMessage && (
              <div
                className="feedback-box"
                dangerouslySetInnerHTML={{ __html: feedback }}
              />
            )}

            {lessonMessage && (
              <div className={`lesson-message ${lessonMessage.type}`}>
                <strong>{lessonMessage.text}</strong>
                {lessonMessage.explanation && (
                  <p>{lessonMessage.explanation}</p>
                )}
              </div>
            )}

            {lessonMessage?.type === "error" && (
              <div className="hint-solution-buttons">
                <button className="btn-hint" onClick={toggleHint}>
                  {showHint ? "Hide Hint" : "Show Hint"}
                </button>
                <button className="btn-solution" onClick={toggleSolution}>
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </button>
              </div>
            )}

            {showHint && lessonMessage?.type === "error" && (
              <div className="hint-text">
                <strong>Hint:</strong> {lesson.hint}
              </div>
            )}
            {showSolution && lessonMessage?.type === "error" && (
              <div className="solution-text">
                <strong>Solution:</strong> {lesson.solution}
              </div>
            )}

            {showContinue && !gameEnded && (
              <button className="next-move-button" onClick={advanceLesson}>
                Next Move
              </button>
            )}
            {gameEnded && (
              <div className="game-ended-message">
                Lesson Complete! Black resigned after 17. h4.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Magnus_v_Finegold;
