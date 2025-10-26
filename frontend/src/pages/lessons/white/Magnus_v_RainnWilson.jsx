import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import "./GameLesson.css"; // Make sure you create this CSS file or adjust pat
import Chessboard from "./components/Chessboard"; // Ensure path is correct

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN =
  "rn1qk1nr/ppp1ppbp/3p2p1/8/2BPP1b1/5N2/PPP2PPP/RNBQK2R w KQkq - 2 5"; //1

const GAME_LESSON_MOVES = [
  {
    move: "5. Bxf7+",
    player: "White",
    explanation:
      "Congrats. You are on the right track. Lets continue to the next move.",
    fen: "rn1qk1nr/ppp1ppbp/3p2p1/8/2BPP1b1/5N2/PPP2PPP/RNBQK2R b KQkq - 0 1", // 2
    hint: "",
    solution:
      "The correct move is Bf7, attacking the pawn and creating a checkmate.",
  },
  {
    move: "5... Kxf7", // current scneario before
    player: "Black",
    explanation: "Black plays 2...Kf7 killing the Magnus's bishop.", // describes current situation
    fen: "rn1q2nr/ppp1pkbp/3p2p1/8/3PP1b1/5N2/PPP2PPP/RNBQK2R w KQ - 0 6",
    hint: "",
    solution: "Black played Kf7 to capture the bishop on f7.",
  },
  {
    move: "3. Ng5+",
    player: "White",
    explanation:
      "Congrats. You are on the right track. Lets continue to the next move.",
    fen: "rnbq2nr/ppp1pkbp/3p2p1/6N1/3PP3/8/PPP2PPP/RNBQK2R w KQha - 0 1",
    hint: "",
    solution:
      "Perfect. Now that you've moved the knight to g5 resulting in a checkmate",
  },
  {
    move: "4. Ke8",
    player: "Black",
    explanation:
      "The king is scared. He moves back to e8 after your knigth threatened him",
    fen: "rn1qk1nr/ppp1p1bp/3p2p1/6N1/3PP1b1/8/PPP2PPP/RNBQK2R w KQ - 2 7",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "4. Qxg4",
    player: "White",
    explanation:
      "This may seem confusing at first but let’s go through this step by step. After Bxf7+, the f7 square eventually weakens, hindering Rainn’s king’s safety. Additionally, since Rainn’s king is in check, Rainn must move his king away. If Rainn plays either Kd7 or Kf8, Magnus could simply retreat his bishop to a square like b3 or c4 and potentially kick the black bishop on g4 and create more attacks on the kingside.  Now Magnus is up a pawn, and Rainn’s king's safety worsened. Additionally, most of Rainn’s pieces are passive compared to White’s pieces.",
    fen: "rnbqk1nr/ppp1p1bp/3p2p1/6N1/3PP3/8/PPP2PPP/RNBQK2R w KQkq - 0 1",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "5. Nh6",
    player: "Black",
    explanation:
      " Later in the game,Rainn played Nh6, attacking the queen.How did Magnus respond to it?",
    fen: "rn1qk2r/ppp1p1bp/3p2pn/6N1/3PP1Q1/8/PPP2PPP/RNB1K2R w KQ - 1 8",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "6. Qh3",
    player: "White",
    explanation:
      " Later in the game,Rainn played Nh6, attacking the queen.Howdid Magnus respond to it?",
    fen: "rnbqk1nr/ppp1p1bp/3p2p1/6N1/3PP3/8/PPP2PPP/RNBQK2R w KQkq - 0 1",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "7. Nd7",
    player: "Black",
    explanation:
      " Later in the game,Rainn played Nh6, attackingthequeen.Howdid Magnus respond to it?",
    fen: "r2qk2r/pppnp1bp/3p2pn/6N1/3PP3/7Q/PPP2PPP/RNB1K2R w KQ - 3 9",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "8. Ne6",
    player: "White",
    explanation:
      "After Ne6, Magnus managed to fork both Rainn’s queen and bishop.",
    fen: "r2qk2r/pppnp1bp/3p2pn/6N1/3PP3/7Q/PPP2PPP/RNB1K2R w KQ - 3 9",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "9. Qc8",
    player: "Black",
    explanation:
      "Since the knight on h6 had no defenders, Magnus simply takes that knight with his bishop. Furthermore, there were no meaningful checks or threats in that position for Rainn or Magnus, AND Rainn’s pieces are still passive since most are either on the 7th or 8th rank.",
    fen: "r1q1k2r/pppnp1bp/3pN1pn/8/3PP3/7Q/PPP2PPP/RNB1K2R w KQ - 5 10",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "9. Nxg7+",
    player: "White",
    explanation:
      "Magnus moves his pawn from d4 to d5 to provide an extra defender for the knight on e6. Notice how the knight on e6 has two defenders while being attacked by two of Rainn’s pieces. A general rule of thumb for whether a defended piece can be captured is: <br>• If a piece has more or the same number of defenders than attackers AND holds lower or equal value compared to its attackers, that piece cannot be captured. <br>• If a piece has fewer defenders than attackers OR holds a higher value compared to its attackers, the piece can be captured.",
    fen: "r1q4r/ppp1pk1p/3pNnpB/3P4/4P3/2N4Q/PPP2PPP/R3K2R b KQ - 0 1",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "17. O-O (Castle kingside)",
    player: "White",
    explanation:
      "After Magnus castles, both rooks are connected, meaning that they can provide each other with mutual defense. Furthermore, the Kingside rook did not have to be stuck in the corner doing nothing. Now both rooks can eventually move to the d or e files, where they can potentially create more attacks. The c6 pawn threat meant nothing since after cxd5, Magnus simply responds with exd5, resulting in this position, which gives Magnus a winning position:",
    fen: "r1q4r/pp2pk1p/2ppNnpB/3P4/4P3/2N4Q/PPP2PPP/R4RK1 b Q - 0 1",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "21. Ng5+",
    player: "White",
    explanation: "Nice! You're on the right track. What does Rainn play?",
    fen: "r6r/pp2pk1p/3p1npB/3P2N1/2q5/2N4Q/PPP2PPP/R4RK1 b Q - 0 1",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "22. Ke8",
    player: "Black",
    explanation:
      "Ke8 is a better option since it avoids a square that Magnus’s queen could control. If Rainn played Kg8, Rainn would lose via checkmate after Qe6# since Magnus’s bishop controls the f8 and g7 squares while Magnus’s queen controls the f7 and g8 squares.",
    fen: "r3k2r/pp2p2p/3p1npB/3P2N1/2q5/2N4Q/PPP2PPP/R4RK1 w HQkq - 0 1",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "23. Qe6",
    player: "White",
    explanation:
      "After Ke8, Magnus plays Qe6, which puts Rainn’s king in a dangerous situation considering the number of white pieces near the king AND puts pressure on the e7 pawn, which will be important later in the game. Additionally, since both of the rooks are connected and have more squares to move around, Magnus could eventually bring his rooks out to join the attack. Now let's continue.",
    fen: "r3k2r/pp2p2p/3pQnpB/3P2N1/2q5/2N5/PPP2PPP/R4RK1 b Qkq - 0 1",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "25. Qf7+",
    player: "White",
    explanation: "Congrats! You're right.",
    fen: "r3k2r/pp2pQ1p/3p1npB/3P2N1/6q1/2N5/PPP2PPP/R4RK1 b Qkq - 0 1",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "26. Kd7",
    player: "Black",
    explanation:
      "After Qf7+, Rainn chose to play Kd7, still protecting the pawn. <br>Note that the e7 pawn is a major weakness. Thus, Magnus still put more pressure on that pawn and calculated a full sequence to do so. How did he do so?",
    fen: "r6r/pp1kpQ1p/3p1npB/3P2N1/6q1/2N5/PPP2PPP/R4RK1 w HQha - 0 1",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "26. Rae1",
    player: "White",
    explanation: "Nice! You're on the right track.",
    fen: "r6r/pp1kpQ1p/3p1npB/3P2N1/6q1/2N5/PPP2PPP/4RRK1 b - - 0 1",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "28. Re6",
    player: "White",
    explanation: "Nice!",
    fen: "4r2r/pp1kpQ1p/3pRnpB/3P2N1/6q1/2N5/PPP2PPP/5RK1 b - - 0 1",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "30. Rfe1",
    player: "White",
    explanation:
      "Now we can see that the e-7 pawn has 3 attackers (the 2-rook battery on the e file and the Queen on f7) AND 2 defenders (the king on d7 and the rook on e8). In this position, Rainn will lose his pawn considering that there are more attackers than defenders. Furthermore, since the king is one of the defenders, White may have an easier time attacking the king after the e7 pawn is captured. <br>IMPORTANT NOTE: the tail of a pawn chain is a similar pawn weakness to an isolated pawn, considering that the tail’s primary function is defending other pawns and has no other defenders.",
    fen: "4r2r/pp1kpQ1p/3pRnpB/3P2N1/3q4/2N5/PPP2PPP/4R1K1 b - - 0 1",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "33. Rxe7+",
    player: "White",
    explanation:
      "Firstly, since the pawn had more attackers than defenders, Magnus captures the pawn with his rook, which eventually forces a rook exchange as shown. Since Rainn’s king is in check, Rainn had to move his king, which he did by playing Kc8.",
    fen: "7r/pp1kRQ1p/3p2pB/3P2N1/3q2n1/2N5/PPP2PPP/6K1 b - - 0 1",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "35. Re8+",
    player: "White",
    explanation: "Nice! You're on the right track.",
    fen: "2k1R2r/pp3Q1p/3p2pB/3P2N1/3q2n1/2N5/PPP2PPP/6K1 b k - 0 1",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "37. Qxe8+",
    player: "White",
    explanation:
      "After Rainn played Kc8, Magnus decided to exchange the rooks again, while also checking Rainn’s king. Now Rainn must move his king; since Magnus’s queen is controlling the d7 and d8 squares, Rainn’s only move is Kc7.",
    fen: "2k1Q3/pp5p/3p2pB/3P2N1/3q2n1/2N5/PPP2PPP/6K1 b - - 0 1",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "39. Ne6+",
    player: "White",
    explanation:
      "After Rainn moved his king to c6, Magnus proceeded with the checkmate threat with Ne6+. Interestingly, this also forks the king and the queen.",
    fen: "4Q3/ppk4p/3pN1pB/3P4/3q2n1/2N5/PPP2PPP/6K1 b - - 0 1",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
  {
    move: "41. Qb5#",
    player: "White",
    explanation:
      "Rainn’s king had no other square to move other than b6 since that is the only adjacent square not controlled by a white piece. Most people may just take the queen, however Magnus finishes Rainn off with Qb5#. <br>Notice that the king has no more squares to move to. The white queen checks the king and controls the a6, a5, c6, and c5 squares. Additionally, the knight controls the c5 and c7 squares. <br>Furthermore, when finding a mate in 5 or more moves, a general pattern to consider is to always look for checks, especially checks after the first check move you calculate, and how exposed your king is. If your opponent’s king is exposed and many of your pieces are surrounding it, then it might be easier to find mate in 5 or more. That also applies to finding mate in any number of moves. So remember, always look for checks!",
    fen: "8/pp5p/1k1pN1pB/1Q1P4/3q2n1/2N5/PPP2PPP/6K1 b - - 0 1",
    hint: "Push pawns to open lines for attack.",
    solution: "Black moved Ke8 to escape the check.",
  },
];
//r1q1k2r/pppnp1bp/3pN1pn/8/3PP3/7Q/PPP2PPP/RNB1K2R w KQ - 5 10

// Utility for chessboard squares
//const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
//const toSquare = (row, col) => files[col] + (8 - row);

{
  /*const pieceToFilename = (piece) => {
  if (!piece) return null;
  const color = piece.color === "w" ? "w" : "b";
  const type = piece.type.toUpperCase();
  return `${color}${type}.svg`;
};
*/
}

// =========================================================
// 2. CHESSBOARD COMPONENT (Updated for Click-to-Move)
// =========================================================
/*
const Chessboard = ({
  game,
  setGame,
  currentLessonIndex,
  lessonMoves,
  setLessonMessage,
  setShowContinue,
  showContinue,
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
*/
// =========================================================
// 3. MAIN LESSON COMPONENT
// =========================================================

function MagnusVRainn() {
  const [game, setGame] = useState(new Chess(STARTING_FEN));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonMessage, setLessonMessage] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  // Feedback box state
  const [feedback, setFeedback] = useState(
    "The game starts with the sequence: 1. e4 g6 2. Nf3 d6 3. d4 Bg7 4. Bc4 <br>Both sides are doing well as of right now and the position is essentially even. However, Magnus does have a slightly better advantage since both the e-pawn and d-pawn are controlling the center with the help of the light-squared bishop  - which is also eyeing the f7 square - and the knight on f3; Magnus can potentially castle early, activate his knight on b1 and activate his dark-squared bishop. On the other hand, Rainn does have a fianchettoed bishop on g7 and has advanced his d-pawn to d6. Its really important to activate most of your pieces and control the center in the opening phase since it will be easier to attack your opponent</br><br>Rainn made a vital mistake by playing Bg4. At first, this may seem like an annoying pin that White must respond to immediately by playing a move like h3. However, Magnus found it as an opportunity to temporarily be up in material and potentially create a threat that could win even more material. How does he do it?</br>"
  );

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
      setShowContinue(false);
      setShowHint(false);
      setShowSolution(false);
      // Instantly advance to next move (no cooldown)
      if (currentLessonIndex < GAME_LESSON_MOVES.length - 1) {
        setCurrentLessonIndex((i) => i + 1);
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
    } else {
      setGameEnded(true);
      setLessonMessage({
        type: "info",
        text: "Lesson Complete! Black resigned after 17. h4.",
      });
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
        clearFeedback={() => setFeedback("")}
      />

      {/* FEEDBACK BOX (blue, temporary) */}
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

export default MagnusVRainn;
