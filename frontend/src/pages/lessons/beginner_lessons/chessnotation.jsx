import React from "react";
import chessImage from "./Images/chessboard.png";
import { useNavigate } from "react-router-dom";
import "./lesson.css";

function chess_notation() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Chess Notation</h1>
      <ol>
        <li>
          Pawns: You write the square to which it moves.
          <ul>Example: e4 = pawn moves to e4</ul>
        </li>
        <li>
          Knights: You write N + square
          <ul>Example: Ne4 = knight moves to e4</ul>
        </li>
        <li>
          Rooks: You write R + square
          <ul>Example: Re4 = Rook moves to e4</ul>
        </li>
        <li>
          Bishops: You write B + square
          <ul>Example: Be4 = Bishop moves to e4</ul>
        </li>{" "}
        <li>
          Queen: You write Q + square<ul>Example: Qe4 = Queen moves to e4</ul>
        </li>{" "}
        <li>King: You write K + square<ul>Example: Ke4 = King moves to e4</ul></li>
        <li>
          Captures with any piece but a pawn: You write [Piece] + x + square
          <ul>Example: Qxe4 = Queen takes on e4</ul>
        </li>{" "}
        <li>
          Captures with pawn: You write [File the pawn was on] + x + square
        </li>
        <ul>Example: cxd4 = pawn on c file takes on d4</ul>
        <li>Castle kingside: You write O-O </li>
        <li>Castle queenside: You write O-O-O </li>
        <li>Promotion: Square + = + Piece</li>
        <ul>Example: f8=Q = the pawn on f8 promotes to a Queen</ul>
        <li>Check: Move + “+”</li>
        <ul>Example: Ne7+ = Knight moves to e7 check</ul>
        <li>Checkmate: Move + #</li>
        <ul>Example: Ne7# = Knight moves to e7 checkmate</ul>
      </ol>
      <div className="image-container">
        <img src={chessImage} alt="Chess players" />
      </div>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/beginner")}>
          Back to Lessons Page
        </button>
      </div>
    </div>
  );
}

export default chess_notation;
