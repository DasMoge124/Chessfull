import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import Chessboard from "./components/Chessboard";
import "./GameLesson.css"; // Make sure you create this CSS file or adjust pat

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN =
  "r2qkbnr/pp1b1ppp/2n1p3/3pP3/3P4/5N2/PP2BPPP/RNBQK2R b KQkq - 4 7";

const GAME_LESSON_MOVES = [
  {
    move: "7. Nge7",
    player: "Black",
    explanation:
      "If your answer was Ne7, great job! You are on the right track.",
    fen: "r2qkb1r/pp1bnppp/2n1p3/3pP3/3P4/5N2/PP2BPPP/RNBQK2R w KQkq - 5 8",
    hint: "...",
    solution: "Nge7",
  },
  {
    move: "8. Nc3",
    player: "White",
    explanation: "Sina then played Nc3.",
    fen: "r2qkb1r/pp1bnppp/2n1p3/3pP3/3P4/2N2N2/PP2BPPP/R1BQK2R b KQkq - 6 8",
    hint: "...",
    solution: "Nf5",
  },
  {
    move: "9. Nf5",
    player: "Black",
    explanation: "Sina then played Nc3.",
    fen: "r2qkb1r/pp1bnppp/2n1p3/3pP3/3P4/2N2N2/PP2BPPP/R1BQK2R b KQkq - 6 8",
    hint: "...",
    solution: "Nf5",
  },
  {
    move: "10. Nf5",
    player: "Black",
    explanation:
      "Notice how in two moves, the knight controls more squares and is in a more active position. The knight originally was in a seemingly poor position where it cannot develop since the f6 and h6 squares are controlled by the pawn and bishop respectively. However, after the sequence Ne6 Nc3 Nf5, Magnus positioned his knight to a much better square where he could create more attacks.",
    fen: "r2qkb1r/pp1b1ppp/2n1p3/3pPn2/3P4/2N2N2/PP2BPPP/R1BQK2R b KQkq - 0 1",
    hint: "...",
    solution: "...",
  },
  {
    move: "16. Bb4",
    player: "Black",
    explanation:
      "If you found Bb4, great job! This defends the Queen on a5 AND creates an absolute pin. Now the bishop on d4 is stuck due to the Bishop and Queen battery. Now Magnus is guaranteed to win material. If you’re wondering, Bxb4 leads to Qxb4+ Qd2 Qxa5, winning a knight.",
    fen: "r3k2r/pp1b1ppp/2n1p3/q2pPn2/Nb1P3P/5N2/PP1BBPP1/R2QK2R b KQkq - 0 1",
    hint: "...",
    solution: "...",
  },

  {
    move: "21. Ncxd4 Nxd4 Nxd4 or Nfxd4 Nxd4 Nxd4",
    player: "Black",
    explanation:
      "If you said either of the solutions, great job! Previously, two knights were attacking the pawn on d4 which was defended by only one knight. Since there were more attackers than defenders, Magnus is guaranteed to win a pawn. After Magnus plays Ncxd4 followed by a knight exchange via Nxd4 Nxd4, Magnus is up in material by a pawn.",
    fen: "r3k2r/pp1b1ppp/2n1p3/q1NpPn2/1b1P3P/5N2/PP1BBPP1/R2QK2R b KQkq - 0 1",
    hint: "...",
    solution: "...",
  },

  {
    move: "25. Bxd2+ Qxd2 Nc2+ Kd1 Qxd2+ Kxd2 Nxa1",
    player: "Black",
    explanation:
      "Firstly, Magnus played Bxd2+. Since Sina is in check, he has to respond to that move, which he does so by playing Qxd2. Notice how Magnus’s queen creates an absolute pin - consisting of Sina’s king and queen. Magnus takes advantage of it by playing Nc2+, forking the king and rook. Since Sina’s king is in check again, Sina has to move his king, which he does so by playing Kd1. Magnus did not immediately take the rook since it would hang his queen. Instead, Magnus played Qxd2+, exchanging the queens. Since Sina was in check, Sina had to play Kxd2. Since his knight was attacking the rook on a1, Magnus played Nxa1, giving Magnus a materialistic advantage.Notice how every move Magnus played was a check. This is why you need to ALWAYS look for checks: you may eventually win material or force checkmate or get a better position. ",
    fen: "r3k2r/pN1b1ppp/2n1p3/q2pP3/1b1n3P/8/PP1BBPP1/R2QK2R b KQkq - 0 1",
    hint: "...",
    solution: "...",
  },
];

// Utility for chessboard squares
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const toSquare = (row, col) => files[col] + (8 - row);

const pieceToFilename = (piece) => {
  if (!piece) return null;
  const color = piece.color === "w" ? "w" : "b";
  const type = piece.type.toUpperCase();
  return `${color}${type}.svg`;
};

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
  const [feedback, setFeedback] = useState("");

  const lesson = GAME_LESSON_MOVES[currentLessonIndex];

  useEffect(() => {
    if (!gameEnded) {
      if (!gameEnded) {
        if (lesson.player === "Black") {
          // If previous move was White, show White's move for a moment, then prompt for Black
          if (currentLessonIndex > 0 && GAME_LESSON_MOVES[currentLessonIndex - 1]?.player === "White") {
            setLessonMessage({
              type: "info",
              text: `White played: ${GAME_LESSON_MOVES[currentLessonIndex - 1].move.split(" ")[1]}`,
              explanation: GAME_LESSON_MOVES[currentLessonIndex - 1].explanation,
            });
            setGame(new Chess(GAME_LESSON_MOVES[currentLessonIndex - 1].fen));
            setShowContinue(false);
            setShowHint(false);
            setShowSolution(false);
            setFeedback("");
            setTimeout(() => {
              setLessonMessage({
                type: "info",
                text: `Your turn to play as Black: ${lesson.move.split(" ")[1]}`,
                explanation: lesson.explanation,
              });
              setGame(new Chess(lesson.fen));
              setShowContinue(false);
              setShowHint(false);
              setShowSolution(false);
              setFeedback("");
            }, 1200);
          } else {
            // First move or after Black move, prompt for Black
            setLessonMessage({
              type: "info",
              text: currentLessonIndex === 0
                ? `Your turn to play as Black: What move should you play?`
                : `Your turn to play as Black: ${lesson.move.split(" ")[1]}`,
              explanation: currentLessonIndex === 0
                ? "Find the best move for Black in this position."
                : lesson.explanation,
            });
            setGame(new Chess(currentLessonIndex === 0 ? STARTING_FEN : lesson.fen));
            setShowContinue(false);
            setShowHint(false);
            setShowSolution(false);
            setFeedback("");
          }
        } else if (lesson.player === "White") {
          // Show White's move for a moment, then auto-advance to next lesson step
          setLessonMessage({
            type: "info",
            text: `White played: ${lesson.move.split(" ")[1]}`,
            explanation: lesson.explanation,
          });
          setGame(new Chess(lesson.fen));
          setShowContinue(false);
          setShowHint(false);
          setShowSolution(false);
          setFeedback("");
          setTimeout(() => {
            if (currentLessonIndex < GAME_LESSON_MOVES.length - 1) {
              setCurrentLessonIndex((i) => i + 1);
            } else {
              setGameEnded(true);
              setLessonMessage({
                type: "info",
                text: "Lesson Complete! Black resigned after 17. h4.",
              });
              setFeedback("");
            }
          }, 1200);
        }
      }
    }
  }, [currentLessonIndex, gameEnded, lesson]);

  const advanceLesson = () => {
    if (currentLessonIndex < GAME_LESSON_MOVES.length - 1) {
      setCurrentLessonIndex((i) => i + 1);
      setLessonMessage(null);
      setShowContinue(false);
      setShowHint(false);
      setShowSolution(false);
      setFeedback("");
    } else {
      setGameEnded(true);
      setLessonMessage({
        type: "info",
        text: "Lesson Complete! Black resigned after 17. h4.",
      });
      setFeedback("");
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
      {/* HEADER */}
      <div
        className="header-content"
        style={{
          display: "flex",
          width: 800,
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        <div
          className="main-title"
          style={{
            fontSize: 36,
            fontWeight: "bold",
            width: 320,
            lineHeight: 1.2,
          }}
        >
          Magnus Carlsen vs.<br />Sina Movahed<br />(Black's Perspective)
        </div>

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

      {/* CONTINUE / NEXT MOVE BUTTON */}
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
          Lesson Complete! Black resigned after 17. h4.
        </div>
      )}
    </div>
  );
}
export default MagnusVSina;
