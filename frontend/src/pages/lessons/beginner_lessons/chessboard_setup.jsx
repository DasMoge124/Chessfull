import React from "react";
import chessImage from "./Images/forks.png";
import { useNavigate } from "react-router-dom";
import "./lesson.css";

function chessboard_setup() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Forks</h1>
      <p>Be sure to follow the following steps</p>
      <ol>
        <li>
          The player with the white pieces should have a white square (a1) on
          their bottom left corner whereas the player with the black pieces
          should have a black square (h8) on their bottom left corner.
        </li>
        <li>
          Place all pawns on the second row of each side with the white pawns on
          2nd rank and the black pawns on the 7th rank
        </li>
        <li>
          Place all rooks on the corners with the white rooks on a1 and h1 and
          the black rooks on a8 and h8.
        </li>
        <li>Place the knights next to the rooks</li>
        <li> Place the bishops next to the knights</li>
        <li>
          Place the Kings on the square opposite their color and the queen next
          to the king.
        </li>
      </ol>
      <div className="image-container">
        <img src={chessImage} alt="Chess players" />
      </div>
      <div className="ButtonElements">
        <button onClick={() => navigate("/lessons/beginner/forks_practice")}>
          Lessons
        </button>
      </div>
    </div>
  );
}

export default chessboard_setup;
