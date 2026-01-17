import React, { useState, useEffect, useCallback } from "react";
import { Chess } from "chess.js";
// Assuming the path to Chessboard is correct and it handles move logic
import Chessboard from "./components/Chessboard";
import "./GameLesson.css";

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN =
  "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/3P4/PPP2PPP/RNBQK1NR b KQkq - 0 3";

const INITIAL_SCENARIO =
  "The game started off with the following sequence: 1. e4 e5 2. Bc4 Nc6 3. d3. In this position, Black decided to complete their piece development and gain greater control over the center. What did Black play to do so?";

const GAME_LESSON_MOVES = [
    {
        move: "3... Nf6",
        player: "Black",
        explanation:
        "By playing Nf6, Black develops their other knight, increasing influence in the center.",
        hint: "Let's try activating any of the minor pieces, like a bishop or a knight. Knights are great for controlling central squares.",
        solution: "Nf6",
        customIncorrectFeedback: {
            "Bc5": "Bc5 also works, so great thinking. However, Black played another move that plays the same role. In this case, Black preferred developing their knights over their bishops.",
            "Nge7": "That move actually hinders development. Specifically, the queen and bishop remain confined to their starting squares and cannot move anywhere else."
        }
    },
    {
        move: "4. Nxd4",
        player: "White",
        explanation:
        "Eventually, White played Nf3, developing the knight for greater influence in the center while allowing the king on e1 and the rook on h1 to see each other, thereby enabling kingside castling. Black decided to continue developing and increasing control over the center, while also granting the opportunity to castle. What move did Black play?",
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 2 4",
    },
    {
        move: "4... Bc5",
        player: "Black",
        explanation:
        "This move develops the bishop and attacks the f2 square, a really weak square since at that time it was only defended by White’s king. Furthermore, the king on e8 and rook on h8 can see each other, granting the opportunity to castle. ",
        hint: "Let's try activating any of the minor pieces, like a bishop or a knight.",
        solution: "Bc5",
        customIncorrectFeedback: {
            "d6": "Incorrect Answer: d6. This limit the number of squares Black’s bishop can move to."
        }
    },
    {
        move: "5. O-O",
        player: "White",
        explanation:"In this position, White decided to castle kingside with O-O. Black could do the same thing, but decided to instead develop to activate his light-squared bishop. What move did Black play to do so?",
        fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 b kq - 4 5",
    },
    {
        move: "5... d6",
        player: "Black",
        explanation: "This move activates Black's bishop and allows it multiple opportunities to attack, considering the various possible moves Black can make in that position. Remember the opening principle of developing minor pieces. Black wants to develop their pieces early to allow more attacking opportunities. Either way Black is doing well. Castling kingside is a safe option as well as it does ensure king safety later in the game.",
        hint: "Let's try activating any of the minor pieces, like a bishop or a knight. Bishops can control long diagonals as long as no other piece is in their way.",
        solution: "d6",
        customIncorrectFeedback: {
            "b6": "This only allows the bishop to potentially develop on the queenside, which doesn’t have a lot of space for the bishop to control.",
            "O-O":"Castling does work, considering that it does follow one of the opening principles. However, Black focused on developing their light-squared bishop instead. Let’s focus on that instead."
        }
    },
    {
        move: "6. c3",
        player: "White",
        explanation:"Black later plays the move c3, attempting to develop on the queenside. However, Black is more worried about the threatening Bg5, which can pin the knight on f6 to the queen, limiting the knight’s options. What does Black play to prevent Bg5?",
        fen: "r1bqk2r/ppp2ppp/2np1n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQ1RK1 b kq - 0 6",
    },
    {
        move: "6... h6",
        player: "Black",
        explanation: "This is the only move that works, as it protects the g5 square, where Black’s dark-squared bishop is.",
        hint: "Bishops are not the only squares that control diagonal squares. Pawns can also control diagonal adjacent squares (meaning a diagonal square right next to the pawn).",
        solution: "h6",
        customIncorrectFeedback: {
            "O-O":"Castling kingside (O-O) also works. However, let’s focus on Black’s focus on protecting the g5 square."
        }
    },
    {
        move: "7. b5",
        player: "White",
        explanation:"Later in the game, White played b4, attacking the bishop on c5. Black didn’t want to lose another bishop, so what did Black play?",
        fen: "r1bqk2r/ppp2pp1/2np1n1p/2b1p3/1PB1P3/2PP1N2/P4PPP/RNBQ1RK1 b kq b3 0 7",
    },
    {
        move: "7... Bb6",
        player: "Black",
        explanation: "This is the only move that works since it protects the g5 square, which is the one square where Black’s dark-squared bishop.",
        hint: "Usually it's best to retreat an attacked piece",
        solution: "Bb6",
        customIncorrectFeedback: {
            "O-O":"Castling kingside (O-O) also works. However, let’s focus on Black’s focus on protecting the g5 square.",
            "Nd4":"Now Black is hanging both a knight and a bishop",
            "Na5":"Now Black is hanging both a knight and a bishop",
            "Nxe4":"Now Black is hanging both a knight and a bishop",
            "default" : "This loses a bishop"
        }
    },
    {
        move: "8. b5",
        player: "White",
        explanation:"Later in the game, White plays b5 to attack the knight on c6. Black decided to move to a square that moves it away from the attack and continues attacking pieces. What move did Black play?",
        fen: "r1bqk2r/ppp2pp1/1bnp1n1p/1P2p3/2B1P3/2PP1N2/P4PPP/RNBQ1RK1 b kq - 0 8",
    },
    {
        move: "8... Na5",
        player: "Black",
        explanation: "This moves the knight to safety and attacks the bishop on c4.",
        hint: "Usually it's best to retreat an attacked piece",
        solution: "Na5",
        customIncorrectFeedback: {
            "Ne7" : "That does save the knight; however, the knight now remains passive.",
            "default": "This loses a knight."
        }
    },
    {
        move: "9. a4",
        player: "White",
        explanation:"Later in the game, White played a4, which ignores a threat that could lead to material loss. How did Black punish White?",
        fen: "r1bqk2r/ppp2pp1/1b1p1n1p/nP2p3/P1B1P3/2PP1N2/5PPP/RNBQ1RK1 b kq a3 0 9",
    },
    {
        move: "9... Nxc4",
        player: "Black",
        explanation: "This is the only move that works since it protects the g5 square, which is the one square where Black’s dark-squared bishop.",
        hint: "Look for checks, captures, and threats. Some captures can lead to weaknesses for the opponent.Usually it's best to retreat an attacked piece",
        solution: "Nxc4",
        customIncorrectFeedback: {
            "Nb3": "This loses a knight."
        }
    },
    {
        move: "10. dxc4",
        player: "White",
        explanation:"Eventually, White played dxc4, resulting in doubled pawns. Additionally, this allows Black to win a hanging piece. What move did Black play to win that hanging piece?",
        fen: "r1bqk2r/ppp2pp1/1b1p1n1p/1P2p3/P1P1P3/2P2N2/5PPP/RNBQ1RK1 b kq - 0 10",
    },
    {
        move: "10... Nxe4",
        player: "Black",
        explanation: "This captures a free pawn. Previously, that pawn was defended by the pawn that was originally at d3. However, that former d3 pawn eventually had to capture the c4 pawn through dxc4 earlier. Therefore, the defender of the e4 pawn was removed, allowing White to gain material.",
        hint: "Look for checks, captures, and threats. Some captures can lead to weaknesses for the opponent.Usually it's best to retreat an attacked piece",
        solution: "Nxe4",
        customIncorrectFeedback: {
            "Nd5": "This loses a knight"
        }
    },
    {
        move: "11. Re1",
        player: "White",
        explanation:"Later, White played Re1, attacking the knight. However, he tunnel-visioned as it no longer defends the f2 square, a current weakness. Black employs a tactic that exploits the f2 square. What does he play?",
        fen: "r1bqk2r/ppp2pp1/1b1p3p/1P2p3/P1P1n3/2P2N2/5PPP/RNBQR1K1 b kq - 1 11",
    },
    {
        move: "11... Bxf2+",
        player: "Black",
        explanation: "Bxf2+ forks the king on g1 and rook on e1. The king cannot capture the bishop on f2 since the bishop is protected by the knight on e4.",
        hint: "Look for checks, captures, and threats. Some captures can lead to weaknesses for the opponent.Usually it's best to retreat an attacked piece",
        solution: "Bxf2+",
        customIncorrectFeedback: {
            "Nxf2": "Technically you still win a pawn through Nxf2 and does similar role to Bxf2+ since it first threatens the queen which can then result in a discovered attack that can win a rook. However, it requires more moves to accomplish that goal."
        }
    },
    {
        move: "29. h4",
        player: "White",
        explanation:"In this position, White tried to escape danger by moving their pawn to h4. However, this simply allows Black to checkmate in one move! What move did Black play to checkmate?",
        fen: "6k1/pp4p1/3p3p/1P2p3/P3b2P/6B1/7K/2r5 b - - 0 29",
    },
    {
        move: "29… Rh1#",
        player: "Black",
        explanation: "Notice how the bishop on e4 is controlling its diagonal. Specifically, it controls squares like g2 and h1, meaning the king cannot move to those squares. Additionally, notice how the Black rook controls the h file and the 8th rank, meaning the White king cannot move to squares like h3 or g1. As a result, IT’S CHECKMATE!",
        hint: "Look for checks, captures, and threats. Some captures can lead to weaknesses for the opponent.Usually it's best to retreat an attacked piece",
        solution: "Rh1#",
        customIncorrectFeedback: {
            "Rc2+": "Rc2+ allows White’s king to escape the checkmate threat by playing moves like Kg1 or Kh3",
            "Rg1": "This move hangs a rook since White can then play Kxg1, or King takes the rook on g1. Remember that Kings can capture adjacent or nearby hanging (or undefended) pieces."
        }
    },
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
