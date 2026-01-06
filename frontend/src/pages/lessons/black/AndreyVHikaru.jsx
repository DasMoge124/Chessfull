import React, { useState, useEffect, useCallback } from "react";
import { Chess } from "chess.js";
// Assuming the path to Chessboard is correct and it handles move logic
import Chessboard from "./components/Chessboard";
import "./GameLesson.css";

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN =
  "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQK2R b KQkq - 0 5";

const INITIAL_SCENARIO =
  "The game started off with the sequence: 1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d3 Bc5 5. c3 (a line for the opening called the Giuco Piano), where both sides are controlling the center and have all of their minor pieces developed. In this position, Hikaru (black) wants to ensure all of their pieces are properly developed and the opponent won’t impose any potential restrictions in the near future. What did Hikaru play early on to keep the position solid and flexible in the Giuoco Piano?";

const GAME_LESSON_MOVES = [
  {
    move: "5. h6",
    player: "Black",
    explanation:
      "Hikaru played ...h6. He wants to restrict Esipenko’s bishop and avoids Bg5, which could pin the knight on f7 to the queen on d8.",
    fen: "rnbqkbnr/pp2pppp/3p4/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4",
    hint: "Hint: Let’s try to restrict Esipenko’s bishop. Notice how the queen and knight are on the same diagonal?",
    solution: "h6",
  },
  {
    move: "16. Ng3",
    player: "White",
    explanation:
      "The following sequence was then played: O-O d6 7. Re1 O-O 8. Bb3 a6 9. h3 Ba7 10. Be3 Be6 11. Nbd2 Bxe3 12. Rxe3 Bxb3 13. Qxb3 Qd7 14. Nf1 b5 15. d4 Rfe8. Later in the game, Esipenko plays Ng3. What does Hikaru play here to win a tempo?",
    fen: "r3r1k1/2pq1pp1/p1np1n1p/1p2p3/3PP3/1QP1RNNP/PP3PP1/R5K1 b - - 2 16",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Ng3",
  },
  {
    move: "16... Na5",
    player: "Black",
    explanation:
      "He plays Na5 to develop the knight and force the queen to move away. Furthermore, if Esipenko plays Qa3, this allows Hikaru to play Nc4, forking the Rook on e3 potentially and the queen on a3 - notice how the Rook and queen are five squares apart (which can be an issue for potential knight forks).",
    fen: "rnbqkb1r/pp2pppp/3p1n2/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 1 5",
    hint: "Remember the opening principle: develop your pieces. Try developing pieces like knights or bishops to control the center. Also, remember what the prompt says: 'Canty continues developing and attacks the vulnerable e4 pawn.'",
    solution: "Na5",
  },
  {
    move: "20. Nf5",
    player: "White",
    explanation:
      "Hikaru played Nc4 in this position. What move could he have played to develop his pieces and put more pressure on white?",
    fen: "r3r1k1/2q2pp1/p4n1p/npp1pN2/4P3/2P1RN1P/PPQ2PP1/3R2K1 b - - 1 20",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Nf5",
  },
  {
    move: "20... Rad8",
    player: "Black",
    explanation:
      "Rad8. By playing Rad8, Hikaru challenges Andrey for the open d-file, seeking an opportunity to bring in strong attacks.",
    fen: "3rr1k1/2q2pp1/p4n1p/npp1pN2/4P3/2P1RN1P/PPQ2PP1/3R2K1 w - - 2 21",
    hint: "What piece can be best used for the open d-file? Hint: Rooks are best used on open files.",
    solution: "Rad8",
  },
  {
    move: "6. Bc4",
    player: "White",
    explanation:
      "What is the only good move here for Black?",
    fen: "3rr1k1/2q2pp1/p4n1p/1pp1pN2/2n1P3/1PPR1N1P/P1Q2PP1/3R2K1 b - - 0 22",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Bc4",
  },
  {
    move: "22... Rxd3",
    player: "Black",
    explanation:
      "Rxd3, Hikaru decides to trade the rooks to simplify the position to avoid any potential annoyances in the near future.",
    fen: "rnbqkb1r/1p3ppp/p2ppn2/8/2BNP3/2N5/PPP2PPP/R1BQK2R w KQkq - 0 7",
    hint: "...",
    solution: "Rxd3",
  },
  {
    move: "49. Nh2",
    player: "White",
    explanation:
      "How did Hikaru win by forcing a fork?",
    fen: "8/8/4pnk1/1p2p3/1Pp1P1P1/2P1Q1P1/6KN/3q4 b - - 2 49",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Nh2",
  },
  {
    move: "49... Qc2+",
    player: "Black",
    explanation:
      "If you found Qc2+, good job. Now Esipenko must respond to that check.",
    fen: "8/8/4p1k1/1p2p1pn/1Pp1P3/2P1QPP1/2q3K1/5N2 w - - 9 46",
    hint: "Think about why there is a pawn on a6.",
    solution: "Qc2+",
  },
  {
    move: "50. Kh3",
    player: "White",
    explanation:
      "Esipenko plays Kh3, which happens to be a horrible mistake. Now, Hikaru can play the winning fork. What is Hikaru's next move?",
    fen: "8/8/4pnk1/1p2p3/1Pp1P1P1/2P1Q1PK/2q4N/8 b - - 4 50",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "O-O",
  },
  {
    move: "50... Qxh2+",
    player: "Black",
    explanation:
      "White resigned here because after Kxh3, Nxg4+ wins the white queen, considering that the knight is forking the king on h3 and Queen on e3.",
    fen: "8/8/4pnk1/1p2p3/1Pp1P1P1/2P1Q1PK/7q/8 w - - 0 51",
    hint: "Since Esipenko's king and knight are relatively close and the squares the knight and queen are on represent a special pattern, what did Hikaru play to create a fork? MAJOR SPOILER: You cannot fork a knight and queen.",
    solution: "Qxh2+",
  },
];

// =========================================================
// 3. MAIN LESSON COMPONENT
// =========================================================
function AndreyVHikru() {
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
    const lessonId = "hikaru_v_andrey"; // Ensure this matches your expected ID
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
          Hikaru Nakamura vs Andrey Esipenko
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

export default AndreyVHikru;
