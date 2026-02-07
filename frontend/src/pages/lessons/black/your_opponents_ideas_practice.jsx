import React, { useState, useEffect, useCallback } from "react";
import { Chess } from "chess.js";
// Assuming the path to Chessboard is correct and it handles move logic
import Chessboard from "./components/Chessboard";
import "./GameLesson.css";

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN = "r4b1r/1n3ppp/4p3/kP2Pb2/3N4/2N2P2/1K3BPP/8 b - - 1 27";

const INITIAL_SCENARIO =  "In this position, White played the move Nd4, which may seem like a meaningless move. However, notice how the knights are taking close to the king, and the bishop is on f2, allowing it to occupy the g1-a7 diagonal. Furthermore, with that setup, White has a serious threat Black needs to avoid. How should White react to this? (Note: look for checks, captures, and attacks on both sides)";
const GAME_LESSON_MOVES = [
  {
    move: "1... Bc5",
    player: "Black",
    explanation:
      "Congrats! You found the move that prevents Nc5#. Not only does Black prevent checkmate, but also pins the knight to the bishop on f2, which allows the opportunity for simplification.",
    hint: "Beware of the Knight on d4 moving to c6. The knight controls squares in L shapes. It might put your king in massive danger (maybe even checkmate)",
    solution: "Bc5",
    customIncorrectFeedback: {
            "Na3": "That move works. But there is a better way to block with the piece. Note: that better move adds an additional tactic.",
            "Rc8":"That move works, though you do lose a full rook after Nc5+ (Rxc5 is forced after Nc5+), meaning more material lost compared to the best move.",
            "Ba3":"This loses a bishop after Kxa3",
            "default": "By playing this move, you allow White to checkmate you after Nc5#. Remember that the bishop on f2 is controlling the g1-a7 diagonal."
        }
  },
  {
    move: "2. Nc5+",
    player: "White",
    explanation:
      "White now played Nc5+ and there is only one good move to avoid the check. What did Black play?",
    fen: "r6r/1n3ppp/2N1p3/kPb1Pb2/8/2N2P2/1K3BPP/8 b - - 3 28",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Nxd4",
  },
  {
    move: "2... Kb6",
    player: "Black",
    explanation: "This is the only move that works and moves the king to safety. If the bishops trade, you can take back with either the knight or the king (though the knight is preferred over an exposed king).",
    hint: "Bishops are not the only squares that control diagonal squares. Pawns can also control diagonal adjacent squares (meaning a diagonal square right next to the pawn).",
    solution: "Kb6",
    customIncorrectFeedback: {
        "Ka6": "This is an illegal move. The Black king still remains in check. Don’t forget that pawns control diagonal adjacent squares in front of them.",
        "default": "This is an illegal move. The Black king still remains in check."
    }
  }
];

// =========================================================
// 3. MAIN LESSON COMPONENT
// =========================================================
function CantyvNarayan() {
  const [game, setGame] = useState(new Chess(STARTING_FEN));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonMessage, setLessonMessage] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  // This state tracks if we just displayed White's move and are waiting for the second click
  const [isAwaitingUserClick, setIsAwaitingUserClick] = useState(false);

  // Set initial feedback to the introductory scenario
  const [feedback, setFeedback] = useState(INITIAL_SCENARIO);

  const lesson = GAME_LESSON_MOVES[currentLessonIndex];
  const localUrl = "http://localhost:8085/";
  const url = localUrl;

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
    const lessonId = "beginner_game_3"; // Ensure this matches your expected ID
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
          Beginner Lesson Three
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

export default CantyvNarayan;
