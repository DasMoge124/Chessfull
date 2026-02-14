import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { useNavigate } from "react-router-dom";
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
    move: "1. d5",
    player: "White",
    explanation:
      "The move d5 threatens to capture the knight on c6. Since he does not want to lose a knight without any compensation, Bardiya is forced to respond to the c6 move by playing Na5 or Nb8 or Ne7, making his knight less active.",
    fen: "r2q1rk1/pb3ppp/1pnp1n2/2pPp3/2P1P3/1NPB4/P4PPP/R1BQ1RK1 b - - 0 1",
    hint: "Try to put pressure on the knight on C6.",
    solution: "Moving the pawn to d5 will pressure the knight on c6.",
  },
  {
    move: "1... Ne7",
    player: "Black",
    explanation:
      "Later in the game, Bardiya chose to play Ne7. Later in the game, Magnus decided to gain more activity on the kingside and potentially create more attacks on Bardiya's king. How did Magnus create his foundation?",
    fen: "r2q1rk1/pb2nppp/1p1p1n2/2pPp3/2P1P3/1NPB4/P4PPP/R1BQ1RK1 w - - 1 2",
    hint: "",
    solution: "Black played Ke7 to capture the bishop on f7.",
  },
  {
    move: "1. f4",
    player: "White",
    explanation:
      "Congrats. You are on the right track. Lets continue to the next move.",
    fen: "r2q1rk1/pb3ppp/1pnp1n2/2pPp3/2P1PP2/1NPB4/P5PP/R1BQ1RK1 w Qq - 0 1", 
    hint: "Try to put pressure on the pawn on e5.",
    solution: "Moving the pawn to f4 will pressure the pawn on e5.",
  },
  {
    move: "2... exf4",
    player: "Black",
    explanation: "What move did Magnus play next?",
    fen: "r2q1rk1/pb2nppp/1p1p1n2/2pP4/2P1Pp2/1NPB4/P5PP/R1BQ1RK1 w - - 0 3",
    hint: "",
    solution: "Black played Kf7 to capture the bishop on f7.",
  },
  {
    move: "3. Bxf4",
    player: "White",
    explanation:
      "Magnus opened the f file due to the pawn exchange, which allows his f1 rook to control the f file, developing an attack on the kingside. If you are worried about Magnus's King safety, don't be. Even though Magnus's king experiences an exposed diagonal with the dark squares, Bardiya has no dark squared bishop and most of Bardiya's pieces are passive, so there is nothing to worry about. If you wonder where the knight on f6 can move, it cannot move to g4 or h5 since Magnus's queen controls these squares.",
    fen: "r2q1rk1/pb2nppp/1p1p1n2/2pPp3/2P1PP2/1NPB4/P5PP/R1BQ1RK1 b - - 0 1",
    hint: "Try to kill the pawn on f4.",
    solution: "Moving the bishop to f4 will pressure Bardiya's position.",
  },
  {
    move: "3... Ng6",
    player: "Black",
    explanation:
      "Later in the game, Bardiya played Ng6. Magnus decided to create a pin that immobilizes one of Bardiya's knights and allows the rook more activity. What move did Magnus play?",
    fen: "r2q1rk1/pb3ppp/1p1p1nn1/2pP4/2P1PB2/1NPB4/P5PP/R2Q1RK1 w - - 1 4",
    hint: "",
    solution: "Black played Kg6 to capture the bishop on f7.",
  },
  {
    move: "4. Bg5",
    player: "White",
    explanation:
      "By playing Bg5, Magnus pins Bardiya's f6 knight to the queen, meaning that Bardiya would lose his queen if he ever moves his f6 knight. Furthermore, Magnus's rook on f1 controls more of the f file and is eyeing on the f6 knight, which plays a critical role later in the game.",
    fen: "r2q1rk1/pb3ppp/1p1p1nn1/2pP2B1/2P1P3/1NPB4/P5PP/R2Q1RK1 b - - 2 4",
    hint: "Try to put pressure on the knight on f6.",
    solution: "Moving the bishop to g6 will pressure the knight on f6.",
  },
  {
    move: "4... Qe8",
    player: "Black",
    explanation:
      "Later, Bardiya made a huge blunder by playing Qe8. Later, Magnus punishes Bardiya by playing a brilliant move, weakening Bardiya's king. How did Magnus do so?",
    fen: "r3qrk1/pb3ppp/1p1p1nn1/2pP2B1/2P1P3/1NPB4/P5PP/R2Q1RK1 w - - 3 5",
    hint: "",
    solution: "Black played Qe8 mistakenly.",
  },
  {
    move: "5. Rxf6",
    player: "White",
    explanation:
      "BRILLIANT MOVE! Magnus sacrificed THE ROOK! The idea is that after gxf6 (which is what Bardiya plays), Magnus simply plays Bxf6. Lets see why.",
    fen: "r2q1rk1/pb3ppp/1p1p1nn1/2pP2B1/2P1P3/1NPB4/P5PP/R2Q1RK1 b - - 2 4",
    hint: "Try to put pressure on the knight on f6.",
    solution: "Moving the rook will kill the knight on F6 pressuring the knight on g6.",
  },
  {
    move: "5... gxf6",
    player: "Black",
    explanation: "What did Magnus do next",
    fen: "r3qrk1/pb3p1p/1p1p1pn1/2pP2B1/2P1P3/1NPB4/P5PP/R2Q2K1 w - - 0 6",
    hint: "",
    solution: "Black played Pf6 to capture the rook",
  },
  {
    move: "5. Bxf6",
    player: "White",
    explanation:
      "Even though Magnus did lose a rook, he sacrificed it for a deadlier attack. His bishop on f6 controls the g7 and h8 squares AND the h6 square is not defended. Therefore, Bardiya's king is in a weak position and Magnus can potentially take advantage of it.",
    fen: "r3qrk1/pb3p1p/1p1p1Bn1/2pP4/2P1P3/1NPB4/P5PP/R2Q2K1 b - - 0 6",
    hint: "Try to put pressure on the pawn on f6.",
    solution: "moving the bishop to f6 will trap the king.",
  },
  {
    move: "5... Qd7",
    player: "Black",
    explanation:
      "Later Bardiya played Qd7, which doesn't really do anything. Later, Magnus played a quiet move threatening checkmate in 2 moves. Can you find the move?",
    fen: "r4rk1/pb1q1p1p/1p1p1Bn1/2pP4/2P1P3/1NPB4/P5PP/R2Q2K1 w - - 0 1",
    hint: "",
    solution:
      "Notice how the bishop is occupying the g7 and h8 squares (which are weak squares surrouding Bardiya's king). Lets move the queen to the square that can eventually occupy some of the dark squares.",
  },
  {
    move: "5. Qh5",
    player: "White",
    explanation:
      "Even though Magnus did lose a rook, he sacrificed it for a deadlier attack. His bishop on f6 controls the g7 and h8 squares AND the h6 square is not defended. Therefore, Bardiya's king is in a weak position and Magnus can potentially take advantage of it.",
    fen: "r4rk1/pb1q1p1p/1p1p1Bn1/2pP3Q/2P1P3/1NPB4/P5PP/R5K1 b - - 1 1",
    hint: "Try to pressure the king using your queen.",
    solution: "move the queen to h5 to threaten checkmate in 2 moves.",
  },
];

// =========================================================
// 3. MAIN LESSON COMPONENT
// =========================================================

function Magnus_V_Bardiya() {
  const navigate = useNavigate();
  const [game, setGame] = useState(new Chess(STARTING_FEN));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonMessage, setLessonMessage] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  
  const [feedback, setFeedback] = useState(
    "Let's look at the game played between Magnus & Grandmaster Bardiya Daneshvar. <br>Magnus plays white and Bardiya plays black.</br> In this move, how can Magnus kick a piece to limit Bardiya's activity?"
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
      const lessonId = "magnus_v_bardiya_001";
      const token = localStorage.getItem("token")?.trim();
      if (token) {
        try {
          await fetch(url + `api/progress/complete/${lessonId}`, {
            method: "POST",
            headers: { 
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });
        } catch (err) { console.error(err); }
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
            Magnus vs. Bardiya<br />
            (Interactive Lesson)
          </div>
          <div className="lesson-info-box">
            <p>This is a real game from 2025. You'll follow the moves, get hints, and solutions along the way. Play the moves as White.</p>
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
            {feedback && !lessonMessage && <div className="feedback-box" dangerouslySetInnerHTML={{ __html: feedback }} />}
            
            {lessonMessage && (
              <div className={`lesson-message ${lessonMessage.type}`}>
                <strong>{lessonMessage.text}</strong>
                {lessonMessage.explanation && <p>{lessonMessage.explanation}</p>}
              </div>
            )}

            {lessonMessage?.type === "error" && (
              <div className="hint-solution-buttons">
                <button className="btn-hint" onClick={toggleHint}>{showHint ? "Hide Hint" : "Show Hint"}</button>
                <button className="btn-solution" onClick={toggleSolution}>{showSolution ? "Hide Solution" : "Show Solution"}</button>
              </div>
            )}

            {showHint && lessonMessage?.type === "error" && <div className="hint-text"><strong>Hint:</strong> {lesson.hint}</div>}
            {showSolution && lessonMessage?.type === "error" && <div className="solution-text"><strong>Solution:</strong> {lesson.solution}</div>}

            {showContinue && !gameEnded && <button className="next-move-button" onClick={advanceLesson}>Next Move</button>}
            {gameEnded && (
              <div className="game-ended-message">
                Lesson Complete! Black resigned after 17. h4.
                <div className="ButtonElements">
                  <button onClick={() => navigate("/lessons")}>Go back to lessons</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Magnus_V_Bardiya;