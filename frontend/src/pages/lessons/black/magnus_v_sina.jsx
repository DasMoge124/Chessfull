import React, { useState, useEffect, useCallback } from "react";
import { Chess } from "chess.js";
// Assuming the path to Chessboard is correct and it handles move logic
import Chessboard from "./components/Chessboard";
import "./GameLesson.css";

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN =
  "r2qkbnr/pp1b1ppp/2n1p3/3pP3/3P4/5N2/PP2BPPP/RNBQK2R b KQkq - 4 7";
const INITIAL_SCENARIO = "In this game, Magnus plays with the Black pieces whereas Grandmaster Sina Movahed plays with the white pieces. The game starts with the French Defense: Advance Variation with the moves: 1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Nc6 5. Nf3 Bd7 6. Be2 cxd4 7. cxd4. The resulting sequence from these moves is shown in the position above. In this position, some of Magnus’s pieces are not developed properly. However, Magnus found out a slow but effective way to activate his knight on g8. **What move did he play to do so?**";
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
    solution: "Nf5", //r3k2r/pp1b1ppp/2n1p3/q1NpPn2/1b1P3P/5N2/PP1BBPP1/R2QK2R b KQkq - 6 12
  },
  {
    move: "9. h4 Qb6 Na4 Qa5+ Bd2",
    player: "White",
    explanation: "Later in the game, the following sequence was played: h4 Qb6 Na4 Qa5+ Bd2. In the resulting position, Magnus found a way to protect his queen AND eventually win material. How did he do so?",
    fen: "r3kb1r/pp1b1ppp/2n1p3/q2pPn2/N2P3P/5N2/PP1BBPP1/R2QK2R b KQkq - 4 11", // FEN needs correction for White's move to be shown
    hint: "...",
    solution: "...",
  },
  {
    move: "10. Bb4",
    player: "Black",
    explanation: "If you found Bb4, great job! This defends the Queen on a5 AND creates an absolute pin. Now the bishop on d4 is stuck due to the Bishop and Queen battery. Now Magnus is guaranteed to win material. If you’re wondering, Bxb4 leads to Qxb4+ Qd2 Qxa5, winning a knight.",
    fen: "r3kb1r/pp1b1ppp/2n1p3/q2pPn2/N2P4/5N2/PP1BBPPP/R2QK2R b KQkq - 0 1", // FEN needs correction for White's move to be shown
    hint: "...",
    solution: "Bb4", //You must change both move and Solution
  },
  {
    move: "12. Nc5",
    player: "White",
    explanation: "Later in the game, Sina played Nc5. Then Magnus continued to win more material. How did he do so?",
    fen: "r3k2r/pp1b1ppp/2n1p3/q1NpPn2/1b1P3P/5N2/PP1BBPP1/R2QK2R b KQkq - 6 12", // FEN needs correction for White's move to be shown
    hint: "...",
    solution: "...",
  },
  {
    move: "12... Ncxd4",
    player: "Black",
    explanation: "Good job! You are on the right track.",
    fen: "r3kb1r/pp1b1ppp/2n1p3/q2pPn2/N2P4/5N2/PP1BBPPP/R2QK2R b KQkq - 0 1", // FEN needs correction for White's move to be shown
    hint: "...",
    solution: "Ncxd4", //You must change both move and Solution
  },
  {
    move: "13. Nxd4",
    player: "White",
    explanation: "Magnus continued to win more material. How did he do so?",
    fen: "r3k2r/pp1b1ppp/4p3/q1NpPn2/1b1N3P/8/PP1BBPP1/R2QK2R b KQkq - 0 13", // FEN needs correction for White's move to be shown
    hint: "...",
    solution: "...",
  },
  {
    move: "13... Nxd4",
    player: "Black",
    explanation: "Previously, two knights were attacking the pawn on d4 which was defended by only one knight. Since there were more attackers than defenders, Magnus is guaranteed to win a pawn. After Magnus plays Ncxd4 followed by a knight exchange via Nxd4 Nxd4, Magnus is up in material by a pawn.",
    fen: "r3kb1r/pp1b1ppp/2n1p3/q2pPn2/N2P4/5N2/PP1BBPPP/R2QK2R b KQkq - 0 1", // FEN needs correction for White's move to be shown
    hint: "...",
    solution: "Nxd4", //You must change both move and Solution
  },
  {
    move: "14. Nxb7",
    player: "White",
    explanation: "Later in the game, Sina played Nxb7, winning back a pawn. However, this only allowed Magnus to utilize a deadly sequence to win more material, ultimately allowing him to win the game. How did Magnus win more material?",
    fen: "r3k2r/pN1b1ppp/4p3/q2pP3/1b1n3P/8/PP1BBPP1/R2QK2R b KQkq - 0 14", // FEN needs correction for White's move to be shown
    hint: "...",
    solution: "...",
  },
  {
    move: "14... Bxd2+",
    player: "Black",
    explanation: "Firstly, Magnus played Bxd2+. Since Sina is in check, he has to respond to that move, which he does so by playing Qxd2.",
    fen: "r3kb1r/pp1b1ppp/2n1p3/q2pPn2/N2P4/5N2/PP1BBPPP/R2QK2R b KQkq - 0 1", // FEN needs correction for White's move to be shown
    hint: "...",
    solution: "Bxd2+", //You must change both move and Solution
  },
  {
    move: "15. Qxd2",
    player: "White",
    explanation: "After Qxd2, what does Magnus do in this position?",
    fen: "r3k2r/pN1b1ppp/4p3/q2pP3/3n3P/8/PP1QBPP1/R3K2R b KQkq - 0 15", // FEN needs correction for White's move to be shown
    hint: "...",
    solution: "...",
  },
  {
    move: "15... Nc2+",
    player: "Black",
    explanation: "Notice how Magnus’s queen creates an absolute pin - consisting of Sina’s king and queen. Magnus takes advantage of it by playing Nc2+, forking the king and rook. Since Sina’s king is in check again, Sina has to move his king, which he does so by playing Kd1.",
    fen: "r3kb1r/pp1b1ppp/2n1p3/q2pPn2/N2P4/5N2/PP1BBPPP/R2QK2R b KQkq - 0 1", // FEN needs correction for White's move to be shown
    hint: "How do you take advantage of the absolute pin caused by Magnus's queen? Don't forget tactics like forks, pins, and skewers",
    solution: "Nc2+", //You must change both move and Solution
  },
  {
    move: "16. Kd1",
    player: "White",
    explanation: "Since Sina’s king is in check again, Sina has to move his king, which he does so by playing Kd1. Magnus did not immediately take the rook since it would hang his queen. What does Magnus do instead?",
    fen: "r3k2r/pN1b1ppp/4p3/q2pP3/7P/8/PPnQBPP1/R2K3R b kq - 2 16", // FEN needs correction for White's move to be shown
    hint: "...",
    solution: "...",
  },
  {
    move: "16... Qxd2+",
    player: "Black",
    explanation: "Once again, Magnus did not immediately take the rook since it would hang his queen. Instead, Magnus played Qxd2+, exchanging the queens. That way, Magnus didn't have to worry about being down a queen eventually. Since Sina was in check, Sina had to play Kxd2.",
    fen: "r3k2r/pN1b1ppp/4p3/3pP3/7P/8/PPnqBPP1/R2K3R w kq - 0 17", // FEN needs correction for White's move to be shown
    hint: "Since the queen is hanging, due to Sina's queen on c2, what does Magnus do about it?",
    solution: "Qxd2+", //You must change both move and Solution
  },
  {
    move: "16. Kd1",
    player: "White",
    explanation: "After the exchange, how does Magnus continue to win more material?",
    fen: "r3k2r/pN1b1ppp/4p3/3pP3/7P/8/PPnKBPP1/R6R b kq - 0 17", // FEN needs correction for White's move to be shown
    hint: "...",
    solution: "...",
  },
  {
    move: "16... Nxa1",
    player: "Black",
    explanation: "Since his knight was attacking the rook on a1, Magnus played Nxa1, giving Magnus a materialistic advantage. Notice how every move Magnus played was a check. This is why you need to ALWAYS look for checks: you may eventually win material or force checkmate or get a better position.",
    fen: "r3k2r/pN1b1ppp/4p3/3pP3/7P/8/PPnqBPP1/R2K3R w kq - 0 17", // FEN needs correction for White's move to be shown
    hint: "Remember the fork earlier?",
    solution: "Nxa1", //You must change both move and Solution
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
  // This state tracks if we just displayed White's move and are waiting for the second click
  const [isAwaitingUserClick, setIsAwaitingUserClick] = useState(false);
  const localUrl = "http://localhost:8085/";
  const url = localUrl;

  // Set initial feedback to the introductory scenario
  const [feedback, setFeedback] = useState(INITIAL_SCENARIO);

  const lesson = GAME_LESSON_MOVES[currentLessonIndex];
  

  // --- NEW FUNCTION: Called by Chessboard when the user plays the correct Black move ---
  const handleCorrectMove = useCallback(
    (move) => {
      // 1. Display success message showing the correct move and the explanation
      setLessonMessage({
        type: "success",
        text: `Correct! Black played ${move}.`,
        explanation: lesson.explanation,
      });
      setFeedback(""); // Clear main feedback box

      // 2. Allow continuation
      setShowContinue(true);
      // Note: Do NOT set isAwaitingUserClick here. That is set only after White's move is processed.
    },
    [lesson]
  );

  useEffect(() => {
    // --- Logic for User's Turn (Black's turn) ---
    if (lesson && lesson.player === "Black" && game.turn() === "b") {
      // Set the message to the current question/instruction
      setLessonMessage({
        type: "instruction",
        text: `Your turn (Black). Find the correct move.`,
        // For Black's move, the *question* is in the main feedback box,
        // and the explanation is shown AFTER the correct move (via handleCorrectMove).
        explanation: `Find the move`,
      });

      // Update feedback box only if it's the very first move or if coming from a White move
      if (currentLessonIndex === 0 || isAwaitingUserClick) {
        setFeedback(INITIAL_SCENARIO);
      } else {
        // If coming from a White move, the feedback was cleared, so we need to set the next question
        const previousLesson = GAME_LESSON_MOVES[currentLessonIndex - 1];
        if (previousLesson && previousLesson.player === "White") {
          setFeedback(previousLesson.explanation);
        }
      }

      // Ensure controls are reset for user input
      setShowContinue(false);
      setIsAwaitingUserClick(false);
      setShowHint(false);
      setShowSolution(false);
    }
  }, [currentLessonIndex, lesson, game, isAwaitingUserClick]); // Added isAwaitingUserClick as dependency

  const advanceLesson = async () => {
    const nextIndex = currentLessonIndex + 1;

    // Check if there are more moves in the lesson array
    if (nextIndex < GAME_LESSON_MOVES.length) {
      const nextLesson = GAME_LESSON_MOVES[nextIndex];

      if (nextLesson.player === "White") {
        const tempGame = new Chess(nextLesson.fen);
        setGame(tempGame);

        setLessonMessage({
          type: "info",
          text: `White played ${nextLesson.move.split(" ")[0]}.`,
          explanation: nextLesson.explanation,
        });

        const finalIndex = nextIndex + 1;
        if (finalIndex < GAME_LESSON_MOVES.length) {
          setCurrentLessonIndex(finalIndex);
        } else {
          // This case handles if White makes the absolute last move of the array
          await saveProgress();
          setGameEnded(true);
        }

        setShowContinue(false);
        setFeedback(nextLesson.explanation);
      } else {
        setCurrentLessonIndex(nextIndex);
        setShowContinue(false);
      }
    } else {
      // 2. TRIGGER SAVE: No more moves left, lesson is finished
      await saveProgress();
      setGameEnded(true);
      setLessonMessage({
        type: "info",
        text: "Lesson Complete!",
      });
      setShowContinue(false);
    }

    setShowHint(false);
    setShowSolution(false);
  };

  // 3. Extracted Save Logic for cleaner code
  const saveProgress = async () => {
    const lessonId = "magnus_v_sina"; // Ensure this matches your expected ID
    const token = localStorage.getItem("token")?.trim();

    if (token) {
      try {
        const response = await fetch(`${url}api/progress/complete/${lessonId}`, {
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
      console.warn("No token found. Progress not saved.");
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
          Magnus Carlsen vs Sina Movahed
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
          // PASS NEW HANDLER DOWN: This is the critical piece the Chessboard must call on correct move.
          handleCorrectMove={handleCorrectMove}
          setShowContinue={setShowContinue}
          showContinue={showContinue}
          clearFeedback={clearFeedback}
          // The Chessboard must call handleCorrectMove(move) upon a correct move.
        />
      </div>

      {/* FEEDBACK AND MESSAGE AREA (Used for Scenario/Question) */}
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

      {/* LESSON MESSAGE AREA (Used for Success/Error/Info/White Move) */}
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
                  ? "#006400" // Green for success (Black's move explanation)
                  : lessonMessage.type === "info"
                    ? "#004080" // Blue for White's move
                    : "#1976d2",
            borderRadius: 8,
          }}
        >
          <strong>{lessonMessage.text}</strong>
          {lessonMessage.explanation && (
            <p style={{ marginTop: 8 }}>{lessonMessage.explanation}</p>
          )}
        </div>
      )}

      {/* HINT & SOLUTION BUTTONS - Only show for Black puzzle errors */}
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

      {/* CONTINUE / NEXT MOVE BUTTON - Only visible after a successful Black move */}
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
