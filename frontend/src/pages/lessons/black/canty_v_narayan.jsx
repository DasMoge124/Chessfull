import React, { useState, useEffect, useCallback } from "react";
import { Chess } from "chess.js";
// Assuming the path to Chessboard is correct and it handles move logic
import Chessboard from "./components/Chessboard";
import "./GameLesson.css";

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN =
  "rnbqkbnr/pp2pppp/3p4/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 3";

const INITIAL_SCENARIO =
  "FM James Canty and CM Lakshi Narayanan started the game with the Open Sicilian, consisting of the sequence: 1. e4 c5 2. Nf3 d6 3. d4. This allows dynamic and tactical play for both sides, grants Canty an attacking opportunity, and provides a queenside attack opportunity. In this position, Canty hated how Narayanan controlled the center with two pawns and a knight and decided to decide to simplify the position. **How did Canty simplify the position?**";

const GAME_LESSON_MOVES = [
  {
    move: "3... cxd4",
    player: "Black",
    explanation:
      "This simplifies the position and weakens Narayanan’s control over the center.",
    fen: "rnbqkbnr/pp2pppp/3p4/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4",
    hint: "To simplify, try to exchange pieces of equal value. For instance, pawns have the same value of one point in material, knights and bishops all have the same value of 3 points in material, rooks all have the same value of 5 points in material, and queens all have the same value of 9 points in material.",
    solution: "cxd4",
  },
  {
    move: "4. Nxd4",
    player: "White",
    explanation:
      "Narayanan plays Nxd4, completing the pawn exchange. Canty must now continue developing and attack the vulnerable e4 pawn. What did Canty play in this position?",
    fen: "rnbqkbnr/pp2pppp/3p4/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Nxd4",
  },
  {
    move: "4... Nf6",
    player: "Black",
    explanation:
      "This develops the knight and attacks the e4 pawn. This is a fundamental opening principle: develop your pieces and challenge the center.",
    fen: "rnbqkb1r/pp2pppp/3p1n2/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 1 5",
    hint: "Remember the opening principle: develop your pieces. Try developing pieces like knights or bishops to control the center. Also, remember what the prompt says: 'Canty continues developing and attacks the vulnerable e4 pawn.'",
    solution: "Nf6",
  },
  {
    move: "5. Nc3",
    player: "White",
    explanation:
      "Narayanan plays Nc3 to defend the e4 pawn and continue development. Canty decides to prepare queenside development and limit Narayanan’s attacking possibilities. What move did Canty play?",
    fen: "rnbqkb1r/pp2pppp/3p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R b KQkq - 2 5",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Nc3",
  },
  {
    move: "5... a6",
    player: "Black",
    explanation:
      "This prepares queenside development (with ...b5) and prevents White from playing Nb5 or Bb5, restricting White's pieces.",
    fen: "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 3 6",
    hint: "Think about why there is a pawn on a6.",
    solution: "a6",
  },
  {
    move: "6. Bc4",
    player: "White",
    explanation:
      "Narayanan develops the Bishop to c4, putting pressure on Black's center. Canty needs to protect the f7 square and reinforce their position. What did Canty play in this position?",
    fen: "rnbqkb1r/1p2pppp/p2p1n2/8/2BNP3/2N5/PPP2PPP/R1BQK2R b KQkq - 1 6",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Bc4",
  },
  {
    move: "6... e6",
    player: "Black",
    explanation:
      "Canty plays e6 to protect the f7 square and prepare to develop the dark-squared bishop, reinforcing the center.",
    fen: "rnbqkb1r/1p3ppp/p2ppn2/8/2BNP3/2N5/PPP2PPP/R1BQK2R w KQkq - 0 7",
    hint: "Best to mainly focus on defending the **f7 square** and opening a path for development.",
    solution: "e6",
  },
  {
    move: "7. Bb3",
    player: "White",
    explanation:
      "Narayanan played Bb3, retreating the bishop. Canty decided to continue development and control more space on the queenside. What move did Canty play to do so?",
    fen: "rnbqkb1r/1p3ppp/p2ppn2/8/3NP3/1BN5/PPP2PPP/R1BQK2R b KQkq - 1 7",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Bb3",
  },
  {
    move: "7... b5",
    player: "Black",
    explanation:
      "This move controls the c4 and a4 squares, which limits the b3 bishop’s options. This also allows the possibility of moving the light-squared bishop to b7, putting more pressure on the e4 pawn and pinning it to the g2 pawn.",
    fen: "rnbqkb1r/5ppp/p2ppn2/1p6/3NP3/1BN5/PPP2PPP/R1BQK2R w KQkq b6 0 8",
    hint: "Think about why there is a pawn on a6.",
    solution: "b5",
  },
  {
    move: "8. O-O",
    player: "White",
    explanation:
      "Narayanan castled kingside. Canty decided that he wanted to do the same thing. What move did Canty play to prepare to castle kingside?",
    fen: "rnbqkb1r/5ppp/p2ppn2/1p6/3NP3/1BN5/PPP2PPP/R1BQ1RK1 b kq - 1 8",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "O-O",
  },
  {
    move: "8... Be7",
    player: "Black",
    explanation:
      "This allows the h8 rook and the king to see each other, allowing Canty the potential opportunity to castle",
    fen: "rnbqk2r/4bppp/p2ppn2/1p6/3NP3/1BN5/PPP2PPP/R1BQ1RK1 w kq - 2 9",
    hint: "Think about why Canty initially could not castle kingside a.",
    solution: "Be7",
  },
  {
    move: "9. Qf3",
    player: "White",
    explanation:
      "Narayanan plays Qf3, threatening to win either a rook or a knight if playing e5 is possible, while also leaving the knight on d4 vulnerable. Canty found a move that attacks the vulnerable knight on d4 and sets up protection against the potential discovered attack at the same time. What move did Canty play to do so?",
    fen: "rnbqk2r/4bppp/p2ppn2/1p6/3NP3/1BN2Q2/PPP2PPP/R1B2RK1 b kq - 3 9",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Qf3",
  },
  {
    move: "9... Qb6",
    player: "Black",
    explanation:
      "Qb6. This sets up the protection against the queen on f3 and attacks the vulnerable knight on d4.",
    fen: "rnb1k2r/4bppp/pq1ppn2/1p6/3NP3/1BN2Q2/PPP2PPP/R1B2RK1 w kq - 4 10",
    hint: "Look for checks, captures and threats. Huge hint: there is an undefended piece and you can threaten it on the middle of the board.",
    solution: "Qb6",
  },
  {
    move: "10. Be3",
    player: "White",
    explanation:
      "Narayanan plays Be3, threatening to play Nxe6, winning a pawn while also creating a discovered attack threatening to either win the queen on b6 or the pawn on g7. How did Canty prevent this from happening?",
    fen: "rnb1k2r/4bppp/pq1ppn2/1p6/3NP3/1BN1BQ2/PPP2PPP/R4RK1 b kq - 5 10",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Be3",
  },
  {
    move: "10... Qb7",
    player: "Black",
    explanation:
      "Qb7. This simply moves the queen away from the pin created by the bishop on e3, preventing the dangerous tactical shot Nxe6 and keeping the queenside connected.",
    fen: "rnb1k2r/1q2bppp/p2ppn2/1p6/3NP3/1BN1BQ2/PPP2PPP/R4RK1 w kq - 6 11",
    hint: "Remember the posibility of creating a discovered attack via Nxe6. We can just move the queen away by moving it by one square.",
    solution: "Qb7",
  },
  {
    move: "11. Qg3",
    player: "White",
    explanation:
      "After Narayanan played Qg3 (threatening Qxg7), Canty decides to create a counterattack. What move did Canty play?",
    fen: "rnb1k2r/1q2bppp/p2ppn2/1p6/3NP3/1BN1B1Q1/PPP2PPP/R4RK1 b kq - 7 11",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Qg3",
  },
  {
    move: "11... b4",
    player: "Black",
    explanation:
      "Canty decides to attack the knight on c3 after playing b4, prompting Narayanan to play the best move Na4. This keeps the initiative on the queenside.",
    fen: "rnb1k2r/1q2bppp/p2ppn2/1p6/3NP3/1BN1BQ2/PPP2PPP/R4RK1 w kq - 6 11",
    hint: "Lets try kicking a piece by moving a pawn up, which can push that piece to a square where is controls less squares",
    solution: "b4",
  },
  // ... The rest of the moves are incomplete in the prompt, so I will stop here.
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

  const advanceLesson = () => {
    const nextIndex = currentLessonIndex + 1;

    if (nextIndex < GAME_LESSON_MOVES.length) {
      const nextLesson = GAME_LESSON_MOVES[nextIndex];

      // We just played a correct Black move and clicked "Next Move"
      // === PHASE 1: Display White's response and set up the next question ===
      if (nextLesson.player === "White") {
        // 1. Update Board to White's move FEN
        const tempGame = new Chess(nextLesson.fen);
        setGame(tempGame);

        // 2. Display White's move and the next question/scenario
        setLessonMessage({
          type: "info",
          text: `White played ${nextLesson.move.split(" ")[0]}.`,
          explanation: nextLesson.explanation, // This IS the new question text
        });

        // 3. Set index to the *next* Black move (skipping the White instruction)
        const finalIndex = nextIndex + 1;

        if (finalIndex < GAME_LESSON_MOVES.length) {
          // Set index to the next Black puzzle, which triggers the useEffect hook
          setCurrentLessonIndex(finalIndex);
        } else {
          setGameEnded(true);
        }

        // Reset flow control states
        setShowContinue(false); // Hide button, user must now play on the board
        setFeedback(nextLesson.explanation); // Set the question in the main feedback area
      }
      // This 'else' should generally not be hit with the current structure but is a safeguard.
      else {
        setCurrentLessonIndex(nextIndex);
        setShowContinue(false);
      }

      // Reset hints/solutions
      setShowHint(false);
      setShowSolution(false);
    } else {
      setGameEnded(true);
      setLessonMessage({
        type: "info",
        text: "Lesson Complete!",
      });
      setShowContinue(false);
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
          Canty vs. Narayanan
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
