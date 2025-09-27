import React, { useEffect, useState } from "react";
import "./Chessboard.css"; // Assuming you have a CSS file for styling

const Chessboard = () => {
  const n = 8; // Number of rows
  const m = 8; // Number of columns
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const newBoard = [];
    for (let i = 0; i < n; i++) {
      const row = Array.from({ length: m });
      newBoard.push(row);
    }
    setBoard(newBoard);
  }, []);

  return (
    <div className="chessboard">
      {board.length > 0 &&
        board.map((row, rIndex) => (
          <div className="board-row" key={rIndex}>
            {row.map((_, cIndex) => (
              <div
                className={`square ${(rIndex + cIndex) % 2 === 0 ? "light" : "dark"}`}
                key={cIndex}
              ></div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Chessboard;
