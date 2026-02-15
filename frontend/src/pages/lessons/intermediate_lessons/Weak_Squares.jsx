import React from "react";
import { useNavigate } from "react-router-dom";
import "./lesson.css";
import WeakSquares1 from "./Images/weak_squares.png";

// 1. Define the component function
const WeakSquares = () => {
  const navigate = useNavigate(); // 2. Initialize the hook inside the component

  return (
    <div>
      <h1>Weak Squares</h1>
      <h2>What are weak squares?</h2>
      <p>Weak squares are squares that are not controlled by pawns.</p>
      <p>
        The side that controls the most weak squares is a lot more powerful.
      </p>
      <h2>Example of weak squares</h2>
      <img
        src={WeakSquares1}
        alt="Position before defense"
        className="chessImage"
      />
      <p>
        In this position, White can easily get to Black’s side, since they are
        controlling the weak squares. <br /> Assuming its White to move, White
        can play Kf5 to control the weak e5 and g5 squares. Note that Black
        cannot move to the b5 or c5 squares since they are both controlled by
        pawns. <br /> If Black plays the move Kd6, White can play Kg5
        threatening to capture the h5 pawn and create a passed pawn for itself,
        allowing an opportunity to promote a pawn to a better piece like a
        queen.
      </p>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/intermediate")}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

// 4. Export the component so you can use it in your App/Router
export default WeakSquares;
