import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import "./Chessboard.css";

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

// --- FEN is updated to match the latest image ---
const STARTING_FEN =
  "r1b1k2r/ppq2p1p/2nBpn2/1BpnN3/3P2P1/2P1B3/PP1N1P1P/R2QK2R w KQkq - 1 12";
// Note: I'm using an educated guess for the FEN that matches your new image,
// as it differs from the position after 11...Qc7 usually played in this opening.

const GAME_LESSON_MOVES = [
  {
    move: "12. Qf3",
    player: "White",
    explanation:
      "Developing a piece and winning a tempo by attacking the knight on d6. This was the correct response to Black's 11...Qc7. The annotation suggests the game line continued 12...Nc6 13. O-O Bd7 14. Bf4 a6 15. Be4 Rac8 16. Bd5!",
    fen: "r1b2rk1/p1q1ppbp/1p4p1/2p1P3/8/2PBBN2/PP3PPP/R2Q1RK1 b - - 0 12", // You may need to adjust this FEN if the game line differs from the image.
  },
  {
    move: "13. ... Qe5",
    player: "Black",
    explanation:
      "After a few intervening moves, Black plays 13...Qe5. The notes say Black could have defended the knight better.",
    fen: "r1b2rk1/p3ppbp/1p4p1/2p1q3/8/2PBBN2/PP3PPP/R2Q1RK1 w - - 0 13",
  },
  {
    move: "16. Bd4",
    player: "White",
    explanation:
      "This move Bd4 puts pressure on the rook and attacks the Black Queen. This is a very strong tactical shot.",
    fen: "r3k2r/pp2ppbp/2nn2p1/1Bpnq3/3B4/2P1BQ2/PP1N1PPP/R3K2R b KQkq - 1 16",
  },
  {
    move: "17. h4",
    player: "White",
    explanation:
      "The final blow! White plays h4, threatening to capture Black's queen, rook, or knight (Loses queen/knight/rook are all mentioned in the attached analysis) and Black resigned shortly after.",
    fen: "r3k2r/pp2ppbp/2nn2p1/1Bpnq3/3B3P/2P1BQ2/PP1N1PPP/R3K2R b KQkq - 1 17",
  },
];

const toSquare = (r, c) => {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return files[c] + (8 - r);
};

const unicodePiece = (piece) => {
  const unicodeMap = {
    pw: "♙",
    rw: "♖",
    nw: "♘",
    bw: "♗",
    qw: "♕",
    kw: "♔",
    pb: "♟",
    rb: "♜",
    nb: "♞",
    bb: "♝",
    qb: "♛",
    kb: "♚",
  };
  return unicodeMap[piece.type + piece.color] ?? "";
};

// =========================================================
// 2. CHESSBOARD COMPONENT (Remains the same)
// =========================================================

const Chessboard = ({
  game,
  setGame,
  currentLessonIndex,
  setCurrentLessonIndex,
  lessonMoves,
  setLessonMessage,
  setGameEnded,
}) => {
  const [board, setBoard] = useState(game.board());
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    setBoard([...game.board()]);
  }, [game]);

  const updateBoard = () => {
    setBoard([...game.board()]);
  };

  const handleDragStart = (e, square) => {
    const piece = game.get(square);
    const isWhiteTurn = game.turn() === "w";
    const lesson = lessonMoves[currentLessonIndex];

    if (!isWhiteTurn || lesson.player !== "White") {
      e.preventDefault();
      return;
    }

    if (piece && isWhiteTurn) {
      setDragging(square);
      e.dataTransfer.setData("square", square);
    } else {
      e.preventDefault();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetSquare) => {
    e.preventDefault();
    const fromSquare = dragging;
    setDragging(null);

    if (!fromSquare) return;

    const move = game.move({
      from: fromSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move) {
      updateBoard();
      const expectedMove = lessonMoves[currentLessonIndex].move
        .split(" ")[1]
        .replace("...", "")
        .trim();

      if (move.san === expectedMove) {
        setLessonMessage({
          type: "success",
          text: `Correct! ${move.san} was played.`,
          explanation: lessonMoves[currentLessonIndex].explanation,
        });

        setTimeout(() => {
          advanceLesson();
        }, 3000);
      } else {
        // Revert the board if the move is wrong but still legal (optional, but good for learning)
        game.undo();
        updateBoard();
        setLessonMessage({
          type: "error",
          text: `You played ${move.san}. The correct move in the lesson was ${expectedMove}. Try again!`,
          explanation: `Hint: ${lessonMoves[currentLessonIndex].explanation.split(".")[0]}`,
        });
      }
    }
  };

  const advanceLesson = () => {
    if (currentLessonIndex < lessonMoves.length - 1) {
      setCurrentLessonIndex((prevIndex) => prevIndex + 1);
      setLessonMessage(null);
    } else {
      setGameEnded(true);
      setLessonMessage({
        type: "info",
        text: "Lesson Complete! Black resigned after 17. h4.",
      });
    }
  };

  const getLegalMoves = (sourceSquare) => {
    if (!sourceSquare) return [];
    return game.moves({ square: sourceSquare, verbose: true }).map((m) => m.to);
  };
  const legalMoves = getLegalMoves(dragging);

  return (
    <div className="chessboard">
      {board.map((row, rIndex) => (
        <div className="board-row" key={rIndex}>
          {row.map((piece, cIndex) => {
            const squareName = toSquare(rIndex, cIndex);
            const isLegal = legalMoves.includes(squareName);

            return (
              <div
                key={cIndex}
                id={`square-${squareName}`}
                className={`square ${(rIndex + cIndex) % 2 === 0 ? "light" : "dark"}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, squareName)}
              >
                {piece && (
                  <span
                    className={`piece ${piece.color === "w" ? "white" : "black"} ${dragging === squareName ? "hidden" : ""}`}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, squareName)}
                  >
                    {unicodePiece(piece)}
                  </span>
                )}
                {!piece && isLegal && <div className="legal-move-dot"></div>}
                {piece && isLegal && <div className="legal-capture-ring"></div>}
              </div>
            );
          })}
        </div>
      ))}
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

  const lesson = GAME_LESSON_MOVES[currentLessonIndex];

  useEffect(() => {
    if (lesson && lesson.player === "Black" && !gameEnded) {
      setLessonMessage({
        type: "info",
        text: `Black played ${lesson.move.split(" ")[1]}.`,
        explanation: lesson.explanation,
      });

      const tempGame = new Chess(lesson.fen);
      setGame(tempGame);

      setTimeout(() => {
        setCurrentLessonIndex((prevIndex) => prevIndex + 1);
        setLessonMessage(null);
      }, 5000);
    }
  }, [currentLessonIndex, gameEnded, lesson]);

  return (
    <div className="page-container">
      <h1>Eric Rosen vs. Emilia Sprzęczka (Interactive Lesson)</h1>
      <p>
        This is a lesson on the game between IM Eric Rosen (White) and WFM
        Emilia Sprzęczka (Black) in the Accelerated Indian System.
      </p>

      <div className="lesson-info">
        <h2>
          {gameEnded
            ? "Game Over"
            : `Your Turn: Play ${lesson.move.split(".")[0] || ""}. ${lesson.player}'s Move`}
        </h2>

        {/* --- Instruction/Feedback Panel --- */}
        {!gameEnded && lesson.player === "White" && (
          <p className="instruction">
            **Instruction:** White is to move. Play the move **
            {lesson.move.split(" ")[1]}** by dragging a piece.
          </p>
        )}

        {lessonMessage && (
          <div className={`message ${lessonMessage.type}`}>
            <p>
              <strong>{lessonMessage.text}</strong>
            </p>
            {lessonMessage.explanation && <p>{lessonMessage.explanation}</p>}
          </div>
        )}
      </div>

      <Chessboard
        game={game}
        setGame={setGame}
        currentLessonIndex={currentLessonIndex}
        setCurrentLessonIndex={setCurrentLessonIndex}
        lessonMoves={GAME_LESSON_MOVES}
        setLessonMessage={setLessonMessage}
        setGameEnded={setGameEnded}
      />

      <p style={{ marginTop: "20px" }}>Current FEN: {game.fen()}</p>
    </div>
  );
}

export default EricVEmilia;
