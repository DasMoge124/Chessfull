import React from "react";
import { useNavigate } from "react-router-dom";
import Winning1 from "./Images/Winning1.png";
import Winning2 from "./Images/Winning2.png";

import "./lesson.css";

const Converting_A_Winning_Position = () => {
  const navigate = useNavigate();

  return (
    <div className="lesson-container">
      <h1><br/><br/>Converting A Winning Position</h1>
      <h2>How do we convert a winning position?</h2>
      <p>
        Suppose you're playing a chess game, and you find a brilliant tactic to win a piece.
        <br/>
        Well, your opponent won't give up - they will continue fighting! So, how do you proceed to win?
        <br/>
        This is when you need to learn how to convert a winning position!
        <br/>
        Here are 2 key things to consider when converting a winning position:
        <br/>
        The first is to TRADE PIECES. The less pieces your opponent has, the less change you will screw up and blunder. 
        <br/>
        The next idea to keep in mind is to RESTRICT YOUR OPPONENT'S ACTIVITY. If they are really active, they could find some brilliant tactic forcing you to give back material.
        <br/>
        Even if you will lose a bit of material restricting your opponent's activity, never hestiate to do so (don't give up too much material though).
        <br/>
        Ready for some examples? Let's go!
      </p>
      <h2>Example 1</h2>
              <img className="najdorf" src={Winning1} alt="Chess players" />
      
      <p>
        In this position, it is White to move. You are currently up a piece, but Black is threatening checkmate with Qh2.

        <br/>
        You could avoid it, by scooting your King with Kg1, but Black can still go Qh2+ and annoy your King a bit.
        <br/>
        But all of a sudden, you remember what you should do when you're up material in a winning position - trade pieces!
        <br/>
        How do you find a way to force a trade of pieces in this position?
        <br/>
        <br/>
        <br/>
        <br/>
        The answer is Qc3! You "pin" Black's Queen, so it can't move to h2, and thus you force a trade of Queens. Because you are up a piece and have gotten rid of Black's main attacker, you are completely winning :D
        
        <br/>
        
        Great job! Onto the next example?

       

      </p>
<h2>Example 2</h2>
              <img className="najdorf" src={Winning2} alt="Chess players" />
      
      <p>
        In this position, it is White to move. You are up an entire rook! However, Black is threatening some checkmate with Qg2+, along with some sneaky Knight moves like Nf3+

        <br/>
        You start to feel a bit worried. Your King is under huge pressure, and it looks like you can't stop it. But then you realize ...
        <br/>
        When you are in a winning position, you should restrict your opponent's activity, even if that means giving up material!

        <br/>
        How do you do so?
        <br/>
        <br/>
        <br/>
        <br/>
        The answer is Rxc6! Although you lose an exchange (Rook for Bishop), you are still up material afterward, and 
        you have gotten rid of Black's main piece in attacking your King.
        <br/>
        As such, you are completely winning.        
        <br/>
        
        This is an important skill to have! Make sure you understand!
       

      </p>

      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/intermediate")}>
          Return to Lessons
        </button>
      </div>
    </div>
  );
};

export default Converting_A_Winning_Position;
