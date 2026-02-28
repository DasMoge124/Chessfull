import React from "react";
import { useNavigate } from "react-router-dom";
import Triangulation1a from "./Images/Triangulation1A.png";
import Triangulation1b from "./Images/Triangulation1B.png";

import "./lesson.css";

const Triangulation = () => {
  const navigate = useNavigate();

  return (
    <div className="lesson-container">
      <h1><br/><br/>Triangulation</h1>
      <h2>What is triangulation?</h2>
      <p>
        Triangulation is a tricky concept! What it basically is, is sort of a series of moves that serves as a waiting move with your King, and then Black will have to play a move, but no options are good for them. 
        <br/>
        Don't understand? No worries! Here is an example!
      </p>
      <h2>Example</h2>
      <img className="najdorf" src={Triangulation1a} alt="Chess players" />
      <p>
        In this position, it is White to move. White wants to win Black's d5 pawn, but Black is inconveniently defending it.
        <br/>
        How does White win the pawn on d5?
        <br />
        <br />
        <br />
      </p>
      <details className="solution-dropdown">
        <summary>Solution</summary>
        <p>
          The answer is triangulation. First, White can play a waiting move Kd3, in which Black is forced to play Kb7 (the only other legal move is d4, which loses a pawn)
        </p>
        <img className="najdorf" src={Triangulation1b} alt="Chess players" />
        <p>
           Now, in this position, its White's move again. If White moves back to d4, then Black can move back to c6, defending the pawn. So here, White plays the key idea of triangulation: White "waits" a move with Ke3
           <br/>
           After White goes Ke3, if Black doesn't go Kc6, then after White goes Kd4, Black can no longer defend the d5 pawn. However, what if Black does go Kc6?
          <br/>
          Then White should go Kd4! But what's the point? Black's still defending the pawn. Well wait a sec!
        </p>
        <img className="najdorf" src={Triangulation1a} alt="Chess players" />
        <p>
          It looks like we reached our original position - we made no progress. But wait! In this position, its Black's move. Meaning, Black has to go Kb7 here, since its Black's only move, but then White can take the pawn on d5! White won the pawn!
          <br/>
          This example shows the power of triangulation. By moving the King in a "triangle" shape, we can "waste" a move, forcing Black to give up whatever it was trying to defend.
        </p>
      </details>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/intermediate")}>
          Return to Lessons
        </button>
      </div>
    </div>
  );
};

export default Triangulation;
