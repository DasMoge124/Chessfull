import React from "react";
import { useNavigate } from "react-router-dom";
import Bxh6Sacrifice2 from "./Images/Bxh6Sacrifice2.png";
import Bxh6Sacrifice1 from "./Images/Bxh6Sacrifice1.png";
import PawnStorm1 from "./Images/PawnStorm1.png";
import PawnStorm2 from "./Images/PawnStorm2.png";

import "./lesson.css";

const Attacking_The_King = () => {
  const navigate = useNavigate();

  return (
    <div className="lesson-container">
      <h1><br/><br/>Attacking The King</h1>
      <h2>Why is it important to attack the King, and how do we attack the king?</h2>
      <p>
        It is important to attack the King because checkmating the King will make you win the game!
        <br/>
        There are many ways to attack the King. We will explore 2 methods in this lesson:
        <br/>
        1. Bxh6 sacrifices
        <br/>2. Pawn storming 
      </p>
      <h2>Example 1: Bxh6 Sacrifice</h2>
        <img className="najdorf" src={Bxh6Sacrifice1} alt="Chess players" />
      <p>
        In this position, Black's King "looks" safe. However, in reality, nothing could be further from the truth. Can you spot a move that sacrifices a piece, but blasts open Black's kingside so we can attacking Black's King?
        <br/>
        <br/>
      </p>
      <details className="solution-dropdown">
        <summary>Solution</summary>
        <p>
          The answer is ... Bxh6! White loses a piece, but attacks Black's King, so its worth it. After all, Black will have to make a couple concessions to stop the devestating attack from White!
          <br/>
          After Black responds with gxh6, White can go Qxh6.
        </p>
        <img className="najdorf" src={Bxh6Sacrifice2} alt="Chess players" />
        <p>
          Now, White is threatening Nh5 followed by Qg7 checkmate. White is in a winning position.
        </p>
      </details>
                   <h2>Example 2: Pawn Storm</h2>
              <img className="najdorf" src={PawnStorm1} alt="Chess players" />

      <p>
        In this position, Black wants to attack White's King. How does Black do so?
        <br/>
        <br/>
      </p>
      <details className="solution-dropdown">
        <summary>Solution</summary>
        <p>
          Black can go g4!, using a "storm" of pawns to attack White's King. If White decides to go hxg4, taking Black's pawn, then Black can respond with hxg4, and Black is ready to checkmate with Qh1!
          <br/>
          Alternatively, if White decides to do nothing (e.g., play a useless move like a6), then Black can go g3!
        </p>
        <img className="najdorf" src={PawnStorm2} alt="Chess players" />
        <p>
          After Black goes g3, White retreats their Bishop with Be1, and then Black can go Bc5+, controling the dark squares. 
          <br/>After that, Black could even think of plans like Nh4 Bxh3, sacrificing a piece to attack the King, like how we stated before. Most of the time, these two concepts go hand in hand!
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

export default Attacking_The_King;
