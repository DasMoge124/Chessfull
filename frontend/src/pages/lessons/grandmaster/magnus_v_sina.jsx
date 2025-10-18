import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import "./GameLesson.css"; // Make sure you create this CSS file or adjust pat

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN =
  "r2qkbnr/pp1b1ppp/2n1p3/3pP3/3P4/5N2/PP2BPPP/RNBQK2R b KQkq - 0 1";

const GAME_LESSON_MOVES = [
  {
    move: "8. Ne7",
    player: "Black",
    explanation:
      "If your answer was Ne7, great job! You are on the right track.",
    fen: "r2qkb1r/pp1bnppp/2n1p3/3pP3/3P4/5N2/PP2BPPP/RNBQK2R b KQkq - 0 1",
    hint: "...",
    solution: "...",
  },
  {
    move: "9. Nc3",
    player: "White",
    explanation: "Sina then played Nc3.",
    fen: "r2qkb1r/pp1bnppp/2n1p3/3pP3/3P4/2N2N2/PP2BPPP/R1BQK2R b KQkq - 0 1",
    hint: "...",
    solution:
      "...",
  },
  {
    move: "10. Nf5",
    player: "Black",
    explanation: "Notice how in two moves, the knight controls more squares and is in a more active position. The knight originally was in a seemingly poor position where it cannot develop since the f6 and h6 squares are controlled by the pawn and bishop respectively. However, after the sequence Ne6 Nc3 Nf5, Magnus positioned his knight to a much better square where he could create more attacks.",
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
// 2. CHESSBOARD COMPONENT (Updated for Click-to-Move)
// =========================================================

const Chessboard = ({
  game,
  currentLessonIndex,
  lessonMoves,
  setLessonMessage,
  setShowContinue,
}) => {
  const [board, setBoard] = useState(game.board());
  const [sourceSquare, setSourceSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [lastMove, setLastMove] = useState({ from: null, to: null });

  const squareSize = 400 / 8;
  const lesson = lessonMoves[currentLessonIndex];
  const isUserTurn = game.turn() === "w" && lesson.player === "White";

  useEffect(() => {
    setBoard([...game.board()]);
  }, [game]);

  const updateBoard = () => setBoard([...game.board()]);

  const getLegalMoves = (square) =>
    game.moves({ square, verbose: true }).map((m) => m.to);

  const executeMove = (fromSquare, toSquare) => {
    const move = game.move({ from: fromSquare, to: toSquare, promotion: "q" });
    if (!move) return;

    setLastMove({ from: move.from, to: move.to });
    updateBoard();

    const expectedMove = lesson.move.split(" ")[1].replace("...", "").trim();

    if (move.san === expectedMove) {
      setLessonMessage({
        type: "success",
        text: `Correct! ${move.san} was played.`,
        explanation: lesson.explanation,
      });
      setShowContinue(true); // Show next move button
    } else {
      game.undo();
      updateBoard();
      setLessonMessage({
        type: "error",
        text: `You played ${move.san}. Try again.`,
        explanation: lesson.hint,
        showHint: true,
        showSolution: false,
      });
      setShowContinue(false); // Hide next move button
    }
  };

  const handleSquareClick = (square) => {
    if (!isUserTurn) return;
    const piece = game.get(square);

    if (!sourceSquare) {
      if (piece && piece.color === game.turn()) {
        setSourceSquare(square);
        setLegalMoves(getLegalMoves(square));
      }
      return;
    }

    if (legalMoves.includes(square)) {
      executeMove(sourceSquare, square);
      setSourceSquare(null);
      setLegalMoves([]);
    } else if (piece && piece.color === game.turn()) {
      setSourceSquare(square);
      setLegalMoves(getLegalMoves(square));
    } else {
      setSourceSquare(null);
      setLegalMoves([]);
    }
  };

  return (
    <div
      className="chessboard"
      style={{ width: 400, height: 400, position: "relative" }}
    >
      {board.map((row, rIdx) =>
        row.map((piece, cIdx) => {
          const square = toSquare(rIdx, cIdx);
          const isLegal = legalMoves.includes(square);
          const isSource = square === sourceSquare;
          const isLast = square === lastMove.from || square === lastMove.to;

          return (
            <div
              key={square}
              className={`square ${(rIdx + cIdx) % 2 === 0 ? "light" : "dark"} ${
                isLegal ? "highlight-legal" : ""
              } ${isSource ? "highlight-source" : ""} ${isLast ? "last-move" : ""}`}
              onClick={() => handleSquareClick(square)}
              style={{ width: squareSize, height: squareSize }}
            >
              {isLegal && !piece && <div className="legal-dot" />}
              {isLegal && piece && <div className="legal-ring" />}
              {piece && (
                <img
                  src={`/assets/pieces/${pieceToFilename(piece)}`}
                  alt={`${piece.color}${piece.type}`}
                  className="piece-img"
                  draggable={isUserTurn}
                  style={{ width: squareSize, height: squareSize }}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

// =========================================================
// 3. MAIN LESSON COMPONENT
// =========================================================

function EricVEmilia() {
  const [game, setGame] = useState(new Chess(STARTING_FEN));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonMessage, setLessonMessage] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const lesson = GAME_LESSON_MOVES[currentLessonIndex];

  useEffect(() => {
    if (lesson && lesson.player === "White" && !gameEnded) {
      setLessonMessage({
        type: "info",
        text: `Black played ${lesson.move.split(" ")[1]}.`,
        explanation: lesson.explanation,
      });
      const tempGame = new Chess(lesson.fen);
      setGame(tempGame);
      setShowContinue(false);
      setShowHint(false);
      setShowSolution(false);
      setTimeout(() => {
        if (currentLessonIndex < GAME_LESSON_MOVES.length - 1)
          setCurrentLessonIndex((i) => i + 1);
      }, 4000);
    }
  }, [currentLessonIndex, gameEnded, lesson]);

  const advanceLesson = () => {
    if (currentLessonIndex < GAME_LESSON_MOVES.length - 1) {
      setCurrentLessonIndex((i) => i + 1);
      setLessonMessage(null);
      setShowContinue(false);
      setShowHint(false);
      setShowSolution(false);
    } else {
      setGameEnded(true);
      setLessonMessage({
        type: "info",
        text: "Lesson Complete! Black resigned after 17. h4.",
      });
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
    if (!showHint) setShowSolution(false);
  };

  const toggleSolution = () => {
    setShowSolution(!showSolution);
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
          Eric Rosen vs.
          <br />
          Emilia Sprzęczka
          <br />
          (Interactive Lesson)
        </div>
        <div
          className="lesson-info-box"
          style={{ fontSize: 14, lineHeight: 1.4, width: 400, marginTop: 10 }}
        >
          <p>
            This is a real game from 2020. You'll follow the moves, get hints,
            and solutions along the way. Play the moves as White.
          </p>
          <p>Click on a piece, then the square you want to move to.</p>
        </div>
      </div>

      {/* CHESSBOARD */}
      <Chessboard
        game={game}
        setGame={setGame}
        currentLessonIndex={currentLessonIndex}
        lessonMoves={GAME_LESSON_MOVES}
        setLessonMessage={setLessonMessage}
        setShowContinue={setShowContinue}
        showContinue={showContinue}
      />

      {/* LESSON MESSAGE */}
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
                  ? "#006400"
                  : "#004080",
            borderRadius: 8,
          }}
        >
          <strong>{lessonMessage.text}</strong>
          {lessonMessage.explanation && (
            <p style={{ marginTop: 8 }}>{lessonMessage.explanation}</p>
          )}
        </div>
      )}

      {/* HINT & SOLUTION BUTTONS */}
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

export default EricVEmilia;
