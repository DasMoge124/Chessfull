import React from "react";
import { useNavigate } from "react-router-dom";
import OutpostSvesh from "./Images/OutpostSvesh.png";
import Outpostd6 from "./Images/Outpostd6.png";

import "./lesson.css";

const Outposts = () => {
  const navigate = useNavigate();

  return (
    <div className="lesson-container">
      <h1><br/><br/>Outposts</h1>
      <h2>What is an outpost?</h2>
      <p>
        An outpost in chess is a square on the chessboard in which it is defended by pawns on your side, and cannot be attacked by pawns on the opponent's side, no matter how they moves them.
        <br/>
        Also, they must be in either the fourth, fifth, sixth, or seventh rank for White, and the fourth, third, second, and first rank for Black.
        <br/>
        Knights love outposts, so if one appears on the board, it would be great if a Knight could go there!
        <br/>
        Not sure what outposts look like on a chessboard yet? Here are some examples!
      </p>
      <h2>Example 1</h2>
        <img className="najdorf" src={OutpostSvesh} alt="Chess players" />
      
      <p>
        In this position, White has ONE outpost? Where is it?
        <br />
        <br/>
        <br />
        <br/>
        <br/>
      </p>
      <details className="solution-dropdown">
        <summary>Solution</summary>
        <p>
          Its on d5! It satisfies all 3 conditions:
          <br/>
          It is on the fourth, fifth, sixth, or seventh rank.
          <br/>
          It is defended by a White pawn
          <br/>
          No matter how the Black pawns move, they cannot attack the square on d5!
          <br/>
          Now, this outpost significantly changes the style of the game. Because Black has an outpost on d5, White will try to control it with their pieces, specifically their Knight.
          <br/>
          However, Black won't allow that to happen while he does nothing; instead, he will try to launch a counterattack with moves like f5, undermining White's outpost and attempting to launch a Kingside attack.
          <br/>
          An important note: Bxe6 looks tempting in this position. However, its an awful move! That's because Black can capture with fxe6, and White no longer has an outpost on d5! Watch out for pawn captures which can remove outposts!
          <br/>
          Great job! Up for the next example?
        </p>
      </details>
            <h2>Example 2</h2>

        <img className="najdorf" src={Outpostd6} alt="Chess players" />

      <p>
        In this position, White has ONE outpost. Where is it?
        <br/>
        <br/><br/>
        <br/>
        <br/>
      </p>
      <details className="solution-dropdown">
        <summary>Solution</summary>
        <p>
          Its on d6! It satisfies all three conditions
          <br/>
          It is on the fourth, fifth, sixth, or seventh rank.
          <br/>
          It is defended by a White pawn
          <br/>
          No matter how the Black pawns move, they cannot attack the square on d5!
          <br/>
          Now, the best move for White in this position is to go Nd6, occupying the outpost with a Knight. As we have said before, that is the best thing to do when you have an outpost.
          <br/>
          Because of White's outpost on d6, White has a lot more space and is more active than Black, leading to the conclusion that White is better in this position.
        <br/>
        However, that doesn't mean White should relax - Black still has many tricky ideas, such as f6, undermining White's outpost and attempting to open up the Kingside for Black's rook.
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

export default Outposts;
