import React, { useState, useEffect, useCallback } from "react";
import { Chess } from "chess.js";
// Assuming the path to Chessboard is correct and it handles move logic
import Chessboard from "./components/Chessboard";
import "./GameLesson.css";

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================
/*
--------------------ALL COMPLETE-------------------
*/
const STARTING_FEN =
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2P5/2N1PN2/PP1P1PPP/R1BQKB1R"; 
const INITIAL_SCENARIO = "Both players end up in a solid positional foundation. In this position, Magnus decided to fight for the center against Grandmaster Parham. How did he do so?";
const GAME_LESSON_MOVES = [ // done
  { // puzzle 1
    move: "1... d5",
    player: "Black",
    explanation: "Magnus challenges the center by playing d5, directly fighting White’s c4 pawn.",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2P5/2N1PN2/PP1P1PPP/R1BQKB1R w KQkq - 0 1", 
    hint: "Fight for the center.",
    solution: "d5"
  },
  { // puzzle 2
    move: "Nxc3",
    player: "Black",
    explanation:"Magnus simplifies the position by exchanging active knights, reducing complexity.",
    fen: "1r/ppp2ppp/2n5/1B1np3/8/2N1PN2/PP1P1PPP/R1BQK2R w KQkq - 0 1",
    hint: "Simplify the position.",
    solution: "Nxc3"
  },
  { // puzzle 3
    move: "Bd6",
    player: "Black",
    explanation:
      "Bd6 defends the e5 pawn, which was vulnerable due to the absolute pin on the c6 knight.",
    fen: "kb1r/ppp2ppp/2n5/1B2p3/8/2P1PN2/P2P1PPP/R1BQK2R w KQkq - 0 1",
    hint: "Defend the e5 pawn.",
    solution: "Bd6"
  },
  { // puzzle 3 part 2
     move: "Qf6",
    player: "Black",
    explanation:
      "Qf6 adds a second defender to the e5 pawn, equalizing attackers and defenders.",
    fen: "k2r/ppp2ppp/2nb4/1B2p3/3P4/2P1PN2/P4PPP/R1BQK2R w KQkq - 0 1",
    hint: "Add more support to e5.",
    solution: "Qf6"
  },
  {// puzzle 4
    move: "O-O",
    player: "Black",
    explanation:
      "Magnus castles kingside, matching Parham and entering a stable positional setup.",
    fen: "b2rk1/ppp2ppp/2nb1q2/1B2p3/3P4/2P1PN2/P4PPP/R1BQ1RK1 w - - 0 1",
    hint: "Improve king safety.",
    solution: "O-O"
  },
  {// puzzle 5
     move: "Re8",
    player: "Black",
    explanation:
      "Re8 centralizes the rook, increasing its activity and future attacking potential.",
    fen: "b2rk1/ppp2ppp/2nb1q2/1B2p3/3P4/2P1PN2/P4PPP/R1BQ1RK1 w - - 0 1",
    hint: "Activate another piece.",
    solution: "Re8"
  },
  {// puzzle 6
    move: "Bxf3",
    player: "Black",
    explanation:
      "Magnus exploits the weakness created by h3, removing a key defender and exposing the king.",
    fen: "k1/1pp2pp1/p1nb1q1p/4p3/P2P2b1/B1P1PN1P/5PP1/R2QRBK1 w - - 0 1",
    hint: "Punish the weakening move h3.",
    solution: "Bxf3"
  },
  { // puzzle 7
    move: "Nxd4",
    player: "Black",
    explanation:
      "The pawn on d4 was free because the e3 pawn was pinned. Nxd4 wins material and creates threats.",
    fen: "r3r1k1/1pp2pp1/p1n4p/8/P2P4/R3PP1P/5P2/4RBK1 w - - 0 1",
    hint: "Look for loose pawns.",
    solution: "Nxd4"
  },
  {// puzzle 8
    move: "Nxf3+",
    player: "Black",
    explanation:
      "Magnus checks the king and wins a pawn. The king must move.",
    fen: "r3r1k1/1pp2pp1/p6p/8/P2n4/R3PP1P/5P2/2R2BK1 w - - 0 1",
    hint: "Check the king and win material.",
    solution: "Nxf3+"
  },
  { // puzzle 9
    move: "Ne7",
    player: "Black",
    explanation:
      "Ne7 keeps the knight safe while preparing Nd5+, a powerful fork if Rxc7 is played.",
    fen: "r3r1k1/1pp2pp1/p6p/5n2/P4K2/R3P2P/5P2/2R2B2 w - - 0 1",
    hint: "Choose the square that creates future tactics.",
    solution: "Ne7"
  },
  {// puzzle 10
     move: "c6",
    player: "Black",
    explanation:
      "c6 defends the c-pawn with the b-pawn, stopping both Bxb7 and Rxc7 threats.",
    fen: "r3r1k1/1pp1npp1/p6p/8/P4K2/R3P2P/5PB1/2R5 w - - 0 1",
    hint: "Defend both weaknesses at once.",
    solution: "c6"
  },
  {// puzzle 11 part 1
    move: "Rd2",
    player: "Black",
    explanation:
      "Rd2 threatens Rxb2 and creates unavoidable pressure on Parham’s rook.",
    fen: "3r4/1p3p2/p1p2k2/P5pP/2R1n3/4P3/1R6/4KB1r w - - 0 1",
    hint: "Target the rook on b2.",
    solution: "Rd2"
  },
  { // part 11 part 2
    move: "Rxf1",
    player: "Black",
    explanation:
      "Rxf1!! wins all of Parham’s pieces. After Kxf1, Nxd2+ forks the king and rook.",
    fen: "3r4/1p3p2/p1p2k2/P5pP/2R1n3/4P3/3R4/4KB1r w - - 0 1",
    hint: "Look for forcing moves that win everything.",
    solution: "Rxf1"
  }
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
          Magnus Carlsen vs Parham Maghsoodloo, 2021
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
