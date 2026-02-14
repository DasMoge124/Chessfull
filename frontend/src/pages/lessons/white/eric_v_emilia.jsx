import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import "./Lesson.css";
import Chessboard from "./components/Chessboard";
import ParticleBackground from "../../../components/Particles"; 

const STARTING_FEN = "r1b1k2r/ppq2p1p/2nbpnp1/1B1pN3/3P2P1/2P1B3/PP1N1P1P/R2QK2R w KQkq - 3 12";

const GAME_LESSON_MOVES = [
  {
    move: "12. Qf3",
    player: "White",
    explanation: "This move develops a piece and wins a tempo by attacking the knight on f6...",
    fen: "r1b2rk1/p1q1ppbp/1p4p1/2p1P3/8/2PBBN2/PP3PPP/R2Q1RK1 b - - 0 12",
    hint: "Try to put pressure on the knight on f6.",
    solution: "The correct move is Qf3, attacking the knight and developing.",
  },
  {
    move: "13. dxe5 Qxe5 14. O-O-O Ke7 15. Bxc6 bxc6",
    player: "Black",
    explanation: "Black plays 13...Qe5 but could have defended better. What does white do next?",
    fen: "r1b4r/p3kp1p/2p1pnp1/3pq3/6P1/2P1BQ2/PP1N1P1P/2KR3R w - - 0 16",
    hint: "Black should look to improve king safety.",
    solution: "Black played Qe5, but a better defensive move was possible to avoid loss of material.",
  },
  {
    move: "16. Bd4",
    player: "White",
    explanation: "Strong tactical Bd4 hits the queen, knight, and rook via a three-piece pin.",
    fen: "r1b4r/p3kp1p/2p1pnp1/3p2q1/3B2P1/2P2Q2/PP1N1P1P/2KR3R b - - 2 17",
    hint: "Look for pins/skewers and attacks on high-value pieces.",
    solution: "Bd4 is a strong move pinning Black's queen to the rook.",
  },
  {
    move: "16. Qg5",
    player: "Black",
    explanation: "Black played Qg5. Find the final blow to end the game.",
    fen: "r1b4r/p3kp1p/2p1pnp1/3p2q1/3B2P1/2P2Q2/PP1N1P1P/2KR3R w - - 2 17",
    hint: "Push pawns to open lines for attack.",
    solution: "h4 threatens to open lines and forces Black's resignation.",
  },
  {
    move: "18. h4",
    player: "White",
    explanation: "The final blow! This threatens the queen, rook, knight. Black resigned.",
    fen: "r1b4r/p3kp1p/2p1pnp1/3p2q1/3B2PP/2P2Q2/PP1N1P2/2KR3R b - h3 0 17",
    hint: "Push pawns to open lines for attack.",
    solution: "h4 threatens to open lines and forces Black's resignation.",
  },
];

function EricVEmilia() {
  const [game, setGame] = useState(new Chess(STARTING_FEN));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonMessage, setLessonMessage] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  
  const [feedback, setFeedback] = useState(
    "Practice: In the position after 11... Qc7, Black has made a strategic inaccuracy. The move loses tempo because the Queen on c7 is an easy target for White's next move, and it fails to properly defend the knight on b6. A better move would have been 11... Bd7, which develops a piece and defends the knight on b6 indirectly, allowing the Queen to remain active elsewhere or to be played to c7 later under better circumstances. The current position allows White to immediately gain an advantage by exploiting the undefended position of the Black queen and the vulnerable knight. What is White's best continuation after 11... Qc7?"
  );

  const url = "http://localhost:8085/";
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
      const lessonId = "eric_v_emilia_003";
      const token = localStorage.getItem("token")?.trim();
      if (token) {
        try {
          await fetch(url + `api/progress/complete/${lessonId}`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
          });
        } catch (err) { console.error(err); }
      }
    }
  };

  return (
    <div className="page-container">
      <ParticleBackground />
      
      {/* Content Container keeps everything in the center/side-by-side */}
      <div className="main-content-wrapper">
        <h1 className="advanced-page-title">Advanced Page</h1>

        <div className="header-content">
          <div className="main-title">
            Eric Rosen vs Emilia Sprzęczka<br />
            (Interactive Lesson)
          </div>
          <div className="lesson-info-box">
            <p>This is a real game from 2020. Follow the moves and play as White.</p>
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
            {feedback && !lessonMessage && <div className="feedback-box" dangerouslySetInnerHTML={{ __html: feedback }} />}
            
            {lessonMessage && (
              <div className={`lesson-message ${lessonMessage.type}`}>
                <strong>{lessonMessage.text}</strong>
                {lessonMessage.explanation && <p>{lessonMessage.explanation}</p>}
              </div>
            )}

            {lessonMessage?.type === "error" && (
              <div className="hint-solution-buttons">
                <button className="btn-hint" onClick={() => setShowHint(!showHint)}>{showHint ? "Hide Hint" : "Show Hint"}</button>
                <button className="btn-solution" onClick={() => setShowSolution(!showSolution)}>{showSolution ? "Hide Solution" : "Show Solution"}</button>
              </div>
            )}

            {showHint && lessonMessage?.type === "error" && <div className="hint-text"><strong>Hint:</strong> {lesson.hint}</div>}
            {showSolution && lessonMessage?.type === "error" && <div className="solution-text"><strong>Solution:</strong> {lesson.solution}</div>}

            {showContinue && !gameEnded && <button className="next-move-button" onClick={advanceLesson}>Next Move</button>}
            {gameEnded && <div className="game-ended-message">Lesson Complete! Black resigned after 17. h4.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EricVEmilia;