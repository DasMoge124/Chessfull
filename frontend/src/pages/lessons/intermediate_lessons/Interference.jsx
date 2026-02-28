import React from "react";
import { useNavigate } from "react-router-dom";
import Interfere1 from "./Images/Interfere1.png";
import Interfere2 from "./Images/Interfere2.png";

import "./lesson.css";

const Interference = () => {
  const navigate = useNavigate();

  return (
    <div className="lesson-container">
      <h1><br/><br/>Interference</h1>
      <h2>What is interference in chess?</h2>
      <p>
        In chess, an interference is a tactic in which you move a piece to "interfere" with your opponent's coordination.

        <br/>
        For example, if Black's Queen is defending Black's Bishop, and you move a Knight in between them, that is theoretically an interference.
        <br/>
        Ready to see how you can use this concept in your chess game? Let's go with some examples!
      </p>
     
                    <h2>Example 1</h2>
        <img className="najdorf" src={Interfere1} alt="Chess players" />
      <p>
        In this position, it is Black to move. White's Queen is defended by White's Rook. So it looks like this position is fine for White. However, Black
        currently has a tactic that involves interference. What is it?
        <br />
      </p>
      <details className="solution-dropdown">
        <summary>Solution</summary>
        <p>
          Black can go Bd4!. Why is this winning? Let's see...
          <br/>
          If White moves their King on autopilot, then who's guarding White's Queen? Nobody! Black can just take it!
          <br/>
          Alternatively, if White takes Black's Bishop with their Queen, then Black can take White's Queen with their Knight.
          <br/>
          Even more, if White takes Black's Bishop with their Rook, Black can take White's Rook with their Knight.
          <br/>
          So White loses material either way. Wow, interference is powerful!
        </p>
      </details>
            <h2>Example 2</h2>
        <img className="najdorf" src={Interfere2} alt="Chess players" />

      <p>
        In this position, it is Black to move. White is up a piece, so are they winning??
        <br/>
        The answer is NO! Black has a tactic here involving interference. What is it?
        <br/>
        Hint: White's Queen is defending against Black's threat of Qxg2 checkmate.
      </p>
      <details className="solution-dropdown">
        <summary>Solution</summary>
        <p>
          The answer is Rc2!!! This is tricky, good job if you found it!
          <br/>
          If Black goes Rc2, it looks odd. Why can't White just go Nxc2, winning the rook?
          <br/>
          Because ... now who's guarding g2? Nobody!
          <br/>
          Black can then play Qxg2 checkmate, winning the game
          <br/>
          This is the power of interference!!!
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

export default Interference;
