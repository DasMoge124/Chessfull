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
        Checkmate with two rooks
      </h1>
      <p>
        The best way to checkmate with two rooks is through a method called the
        ladder checkmate
      </p>
      <p>
        The image below is a solid demonstration of how to ladder
        checkmate:{" "}
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
