import React from "react";
import { useNavigate } from "react-router-dom";
import "./lesson.css";
import rule_of_square from "./Images/rule_of_square.png";
import rule_of_squares from "./Images/rule_of_squares.png";

// 1. Define the component function
const WeakSquares = () => {
  const navigate = useNavigate(); // 2. Initialize the hook inside the component

  return (
    <div>
      <h1>
        <br />
        Rule of the square
      </h1>
      <p>
        The rule of the square is a simple way to determine if a king can catch
        a passed pawn. If the king can move into the square formed by the passed
        pawn and the promotion square, then the king can catch the pawn.
      </p>
      <img
        src={rule_of_square}
        alt="Position before defense"
        className="chessImage"
      />
      <p>
        In the position above (White to move), Black can actually prevent white
        from promoting since Black is within the 4x4 square. As a result, as
        White tries to promote, Black can stop the promotion
      </p>
      <p>
        However, if the position was like the one below, then White can promote
        since Black is outside of the 4x4 square. As a result, as White tries to
        promote, Black cannot stop the promotion
      </p>
      <img
        src={rule_of_squares}
        alt="Position before defense"
        className="chessImage"
      />
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/beginner")}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

// 4. Export the component so you can use it in your App/Router
export default WeakSquares;
