import React from "react";
import { useNavigate } from "react-router-dom";
import queenmate from "./Images/queenmate.gif";
import "./lesson.css";

function CheckmateWithQueen() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>
        <br />
        Checkmate with a Queen and king
      </h1>
      <p>
        In this page, you will learn how to checkmate with only a king and queen
        while your opponent only has a king.
        <br />
        Here are the basic steps to do so:
      </p>
      <ol>
        <li>Move your queen close the opponent's king in Knight Opposition</li>
        <li>
          As soon as the opponent's king moves away, repeat step one until your
          king is stuck in a corner with AT LEAST two squares to move to
        </li>
        <li>Move your king towards the opposing king</li>
        <li>
          When your king and queen are both close to the queen (with the king 1
          square adjacent to the opposing king), then move your queen in front
          of the king, checkmating your opponent.
          <br />
          Make suring your king and queen are RIGHT NEXT TO EACH OTHER
        </li>
      </ol>
      <div className="image-container">
        <img src={queenmate} alt="Chess players" />
      </div>
      <p>
        The gif above is a great demonstration of how to checkmate with a queen
        and a king. The white queen and king work together to box the black king
        in the corner and eventually checkmate it.
      </p>
      <div className="ButtonElements">
        <button
          onClick={() => navigate("/lessons/beginner/queen_checkmate_lesson")}
        >
          Practice
        </button>
        <button onClick={() => navigate("/learn/beginner/")}>
          Return to Lesson
        </button>
      </div>
    </div>
  );
}

export default CheckmateWithQueen;
