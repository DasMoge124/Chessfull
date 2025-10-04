import React, { useState } from "react";
import { Chess } from "chess.js";
import "./Chessboard.css";

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

const Chessboard = () => {
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState(game.board());
  const [dragging, setDragging] = useState(null); // Dragging from-square
  const [selected, setSelected] = useState(null); // Click-to-move from-square

  const updateBoard = () => {
    setBoard([...game.board()]);
  };

  // --- DRAG HANDLERS ---
  const handleDragStart = (e, square) => {
    const piece = game.get(square);
    if (piece && piece.color === game.turn()) {
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
      setSelected(null);
    }
  };

  // --- CLICK HANDLER ---
  const handleClickSquare = (square) => {
    if (!selected) {
      // First click: select if piece belongs to current player
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setSelected(square);
      }
    } else {
      // Second click: attempt to move
      if (square === selected) {
        // Deselect if clicked again
        setSelected(null);
        return;
      }

      const move = game.move({
        from: selected,
        to: square,
        promotion: "q",
      });

      if (move) {
        updateBoard();
      }
      setSelected(null);
    }
  };

  const getLegalMoves = (sourceSquare) => {
    if (!sourceSquare) return [];
    return game.moves({ square: sourceSquare, verbose: true }).map((m) => m.to);
  };

  const legalMoves = getLegalMoves(selected || dragging);

  return (
    <div className="chessboard">
      {board.map((row, rIndex) => (
        <div className="board-row" key={rIndex}>
          {row.map((piece, cIndex) => {
            const squareName = toSquare(rIndex, cIndex);
            const isLegal = legalMoves.includes(squareName);
            const isSelected = selected === squareName;

            return (
              <div
                key={cIndex}
                id={`square-${squareName}`}
                className={`square ${(rIndex + cIndex) % 2 === 0 ? "light" : "dark"} ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => handleClickSquare(squareName)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, squareName)}
              >
                {piece && (
                  <span
                    className={`piece ${piece.color === "w" ? "white" : "black"} ${
                      dragging === squareName ? "hidden" : ""
                    }`}
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

export default Chessboard;
