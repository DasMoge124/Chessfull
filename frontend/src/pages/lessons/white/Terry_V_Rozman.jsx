import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { useNavigate } from "react-router-dom";
import "./Lesson.css";
import Chessboard from "./components/Chessboard";
import ParticleBackground from "../../../components/Particles";

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
    customIncorrectFeedback: {
          "Nc3": "This move prohibits White's c-pawn from moving, which is crucial for White to gain space or solidify their pawn structure. Try again.",
          "Bd3": "This move is possible, but creates a symmetrical position that isn't exciting. Try to create some imbalances!"
        }
  },
  {
    move: "4. dxc4",
    player: "Black",
    explanation: "Black takes your c4 pawn. What do you do to develop a piece and recapture?",
    fen: "rnbqk1nr/ppp2ppp/3b4/8/2pP4/5N2/PP3PPP/RNBQKB1R w KQkq - 0 6",
    hint: "Recapture Black's pawn on c4!",
    solution: "Black captured on c4.",
  },
  {
    move: "4. Bxc4",
    player: "White",
    explanation: "This develops a piece and recaptures the c4 pawn. Nice job!",
    fen: "rnbqk1nr/ppp2ppp/3b4/8/2BP4/5N2/PP3PPP/RNBQK2R b KQkq - 0 6",
    hint: "Recapture Black's pawn on c4!",
    solution: "Bxc4 recaptures and develops.",
    customIncorrectFeedback: {
       "Bh6": "This loses a bishop"
    }
  },
  {
    move: "4. Bf5",
    player: "Black",
    explanation: "Later in the game, the players continued developing pieces. Now, White spots an opportunity to seize the initiative by attacking a piece. How does White do so?",
    fen: "r2q1rk1/ppp2pp1/2nb1n1p/5b2/2BP4/2N2N1P/PP3PP1/R1BQR1K1 w - - 2 11",
    hint: "",
    solution: "The position has evolved through development.",
  },
  {
    move: "1. d5",
    player: "White",
    explanation: "Excellent! This attacks Black's knight and gives White more space to seize the initiative.",
    fen: "r2q1rk1/ppp2pp1/2nb1n1p/3P1b2/2B5/2N2N1P/PP3PP1/R1BQR1K1 b - - 0 11",
    hint: "Move a pawn to get an initiative!",
    solution: "d5 forces the Knight to move.",
    customIncorrectFeedback: {
      "g4":"Although this attacks a piece, this weakens your kingside and doesn't allow you to seize the initiative.",
      "Ne5": "Although this is a good try, be careful about overextending. For example, Black can go Bxe5 dxe5 Qxd1 and you'd be forced to take back with your Knight to avoid losing the e5 pawn"
    }
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
    hint: "Move your knight on f3 to a more active location.",
    solution: "Nd4 centralizes the Knight and pressures f5.",
    customIncorrectFeedback: {
      "g4": "This weakens White's Kingside and does not allow White to start an attack",
      "Ne5":  "What does White achieve by moving a Knight to e5?"
    }
  },
  {
    move: "1. a6",
    player: "Black",
    explanation: "Black goes 12. … a6, hoping to expand with b5-b4, but overlooks a tactic. What did White play to capitalize on Black's blunder?",
    fen: "r2q1rk1/1pp1npp1/p2b1n1p/3P1b2/2BN4/2N4P/PP3PP1/R1BQR1K1 w - - 0 13",
    hint: "Look for a way to remove the defender of the f5 Bishop.",
    solution: "Rxe7 removes the defender!",
  },
  {
    move: "2. Rxe7",
    player: "White",
    explanation: "Great work! White removes the Knight which was previously defending the f5 Bishop. A Bishop and Knight are worth more than a Rook here.",
    fen: "r2q1rk1/1pp1Rpp1/p2b1n1p/3P1b2/2BN4/2N4P/PP3PP1/R1BQ2K1 b - - 0 133",
    hint: "Black's Knight on e7 is defending his f5 Bishop. How do you remove the defender so you can take the f5 Bishop with your Knight?",
    solution: "Rxe7 simplifies into a winning tactic.",
    customIncorrectFeedback: {
      "Nxf5": "Black simply recaptures with Nxf5, and White hasn't achieved anything",
      "g4": "Black can simply retreat his bishop and it is unclear what White has accomplished",
      "Qf3": "This is a good move, as it attacks Black's bishop, but White has an even stronger response, involving a tactic. What is it?"
    }
  },
  {
    move: "2. Qxe7",
    player: "Black",
    explanation: "Black captures your Rook. Now, how do you take Black's hanging piece?",
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
    customIncorrectFeedback: {
      "default": "This move does not take a hanging piece."
    }
  },
  {
    move: "1. Qe5",
    player: "Black",
    explanation: "Black moves his Queen away from danger and is now threatening your Knight along with sneaky battery attacks involving Qh2+. This is dangerous because it weakens your King and Black can follow with Qh2+ Qh1+ Qxg2, also winning a pawn. How does White escape from this predicament?",
    fen: "r4rk1/1pp2pp1/p2b1n1p/3PqN2/2B5/2N4P/PP3PP1/R1BQ2K1 w - - 1 15",
    hint: "",
    solution: "Black plays Qe5 creating threats.",
  },
  {
    move: "1. Nxd6",
    player: "White",
    explanation: "This equal trade stops Black from going Qh2+ and also 'defends' your Knight by removing the attacker.",
    fen: "r4rk1/1pp2pp1/p2N1n1p/3Pq3/2B5/2N4P/PP3PP1/R1BQ12K1 b - - 0 15",
    hint: "Take an attacking piece!",
    solution: "Nxd6 eliminates the threat of Qh2+.",
    customIncorrectFeedback: {
      "Nd4": "What about Qh2+? Your King is in danger!",
      "Ne3": "What about Qh2+? Your King is in danger!",
      "Nh4": "What about Qh2+? Your King is in danger!",
      "f4": "What about your Knight on f5?"
    }
  },
  {
    move: "1. Qxd6",
    player: "Black",
    explanation: "Black recaptures your Knight with his Queen. Now, you want to play Bf4 gaining a tempo on the Queen, but your Bishop is unprotected there. How do you develop a piece to prepare Bf4?",
    fen: "r4rk1/1pp2pp1/p2q1n1p/3P4/2B5/2N4P/PP3PP1/R1BQ2K1 w - - 0 16",
    hint: "Move your Queen to a square defending f4!",
    solution: "Black recaptured on d6.",
  },
  {
    move: "1. Qf3",
    player: "White",
    explanation: "Good work! This develops the Queen while also preparing for White to go Bf4, gaining a tempo on the Black Queen.",
    fen: "r4rk1/1pp2pp1/p2q1n1p/3P4/2B5/2N2Q1P/PP3PP1/R1B3K1 b - - 1 16",
    hint: "Develop your Queen to protect the f4 square.",
    solution: "Qf3 prepares the next attacking move.",
    customIncorrectFeedback: {
      "Bf4": "Your Bishop is hanging!",
      "Ne4": "Your Knight is hanging!",
      "Be3": "This develops a piece, but we want to prepare to go Bf4, gaining a tempo on the Black Queen."
    }
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
    explanation: "Great job! This retreats your Bishop while also reinforcing d5 so you won't lose your d5 pawn.",
    fen: "r4rk1/2p2pp1/p2q1n1p/1p1P4/8/1BN2Q1P/PP3PP1/R1B3K1 b - - 1 17",
    hint: "Retreat the Bishop to a square that still guards the d5 pawn.",
    solution: "Bb3 is the most solid retreat.",
    customIncorrectFeedback: {
      "default": "This loses a bishop",
      "Bf4": "This is a good move, but White decided against it by retreating his attacked Bishop. Try again.",
      "Bf1": "Good try, but if Black responds with b4, you are going to lose your d5 pawn.",
      "Be2": "Good try, but if Black responds with b4, you are going to lose your d5 pawn.",
      "Bd3": "Good try, but if Black responds with b4, you are going to lose your d5 pawn."
    }
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
    explanation: "Good job! This defends back rank check mate while also gaining a tempo on the Black Queen.",
    fen: "r3r1k1/2p2pp1/p2q1n1p/1p1P4/5B2/1BN2Q1P/PP3PP1/R5K1 b - - 3 18",
    hint: "Develop your dark-squared bishop to attack the Queen.",
    solution: "Bf4 develops with a threat.",
    customIncorrectFeedback: {
      "Be3": "This is fine, but we want to gain a tempo on the Black Queen. How do we do so?",
    }
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
    hint: "If White moves his Bishop, his Queen will be attacking Black's Knight. However, Black's g-pawn is defending both Black's h-pawn and Black's knight. How does White take advantage of this?",
    solution: "Bxh6 wins a pawn due to the pin/overloading.",
    customIncorrectFeedback: {
      "Be3": "Be3 This attacks Black's Queen, but doesn't capitalize on a tactic White has",
      "Rc1": "This is a great move, threatening discovery on Black's Queen! However, White has an even better move, winning a pawn. What is it?"
    }
  },
  {
    move: "1. Nd7",
    player: "Black",
    explanation: "Black moves his Knight away from danger, now threatening gxh6. To the untrained eye, it might seem as if White should then move his Bishop away from danger. However, White spots a beautiful move that opens a diagonal, allowing White to attack the Kingside. What was this beautiful move?",
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
    customIncorrectFeedback: {
      "Ne4": "Black can simply take your Knight with his rook, and then capture your Bishop on h6 after you have recaptured his rook, causing you to lose material. Try again.",
      "Be3": "This is fine, but White has an even better move, opening a diagonal and allowing White to attack the Kingside.",
      "Bf4": "This is fine, but White has an even better move, opening a diagonal and allowing White to attack the Kingside."
    }
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
    customIncorrectFeedback: {
      "Qe3": "This is fine. However, Black can go Qxd6 and you have simply lost a pawn. Try again",
      "Be3": "Good try, however Black can take your Queen on f3 with a check.",
      "default": "This loses either a Queen or a Bishop."
    }
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
    customIncorrectFeedback: {
      "d7": "This attacks Black's Queen, but Black can simply take your pawn with Qxd6",
      "Ne4": "Congratulations! This attacks Black's Queen while also threatening a fork with Nf6 check!"
    }
  }
];

// =========================================================
// 3. MAIN LESSON COMPONENT
// =========================================================

function Terry_V_Rozman() {
  const navigate = useNavigate();
  const [game, setGame] = useState(new Chess(STARTING_FEN));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonMessage, setLessonMessage] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  
  const [feedback, setFeedback] = useState(
    "The game starts with 1. e4 e6 2. d4 d5 3. exd5 exd5 4. Nf3 Bd6. Renato Terry plays White and Levy Rozman plays Black. In this position, White  decides to gain space and take more control of the center. What did White play?"
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
      const lessonId = "terry_v_rozman";
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
            Terry V Rozman<br />
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

export default Terry_V_Rozman;