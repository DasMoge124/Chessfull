import React from "react";
import { useNavigate } from "react-router-dom";
import Under1 from "./Images/Under1.png";
import Under2 from "./Images/Under2.png";

import "./lesson.css";

const Underpromotion = () => {
  const navigate = useNavigate();

  return (
    <div className="lesson-container">
      <h1><br/><br/>Underpromotion</h1>
      <h2>What is underpromotion?</h2>
      <p>
        Underpromotion is when you promote a pawn into a piece other than a queen!
        <br/>
        Now, you may be wondering, WHY ON EARTH would yo do this?
        <br/>
        However, there are usually 2 main ways that underpromoting is the optimal move!
        <br/>
        One way is to avoid stalemate - you are completely winning, but promoting to a queen would be a draw!
        <br/>
        Another way is to win material - what if you promote and you can fork the King and the Queen?
        <br/>
        Not sure? Need an example? No worries!
      </p>
      <h2>Example 1</h2>
      <img className="najdorf" src={Under1} alt="Chess players" />
      <p>
        In this position, it is White to move. White can promote their pawn into a queen, but OH NO! It would be stalemate!
        <br/>
        So, what should white do?
        <br/>
        <br />
      </p>
      <details className="solution-dropdown">
        <summary>Solution</summary>
        <p>
          There are many moves to win, but the cleanest way is to promote to a rook! That way, Black is forced to go Kh6, and you can proceed to checkmate with Rh8!
          <br/>
          Onto the next example?
        </p>
      </details>
      <h2>Example 2</h2>
      <img className="najdorf" src={Under2} alt="Chess players" />

      <p>
        In this position, it is White to move. White could promote to a Queen, but that 
        position would actually be a draw. So what should White do?

         <br/>
      </p>
      <details className="solution-dropdown">
        <summary>Solution</summary>
        <p>
          White should promote their pawn to a Knight! Why? Because White forks Black's King and Queen, and after Black moves their Queen,
          White can proceed to take Black's Queen. Then, its a King, Knight, and Bishop vs a King, which is a win for White!
          <br/>
          In fact, this is the only way to win the position for White. As we can see, underpromotion is pretty important!
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

export default Underpromotion;
