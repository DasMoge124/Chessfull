import React from "react";
import { useNavigate } from "react-router-dom";
import IntermezzoNxe7 from "./Images/IntermezzoNxe7.png";
import IntermezzoBxe4 from "./Images/IntermezzoBxe4.png"
import "./lesson.css";

const Intermezzo = () => {
  const navigate = useNavigate();

  return (
    <div className="lesson-container">
      <h1><br/><br/>Intermezzo</h1>
      <h2>What is an intermezzo?</h2>
      <p>
        An intermezzo is an inbetween move (usually a check/attack) that usually happens right after Black attacks/takes one of your pieces. 
        <br/> Not sure what I mean? Here are some examples!
      </p>
      <h2>Example 1</h2>
        <img className="najdorf" src={IntermezzoNxe7} alt="Chess players" />
      <p>
        In this position, Black just took your Queen on d2. Now, the autopilot move would be to recapture with Bxd2. However, White has an intermezzo here to give White a better position. What is it?
        <br/>
    <br/>
      </p>
      <details className="solution-dropdown">
        <summary>Solution</summary>
        <p>
          The answer is ... Nxe7+! You didn't recapture the Queen, but you checked Black's King, forcing it to move. After it moves to h8, then you can recapture Black's Queen, and you are now up a pawn :D
        </p>
      </details>
                   <h2>Example 2</h2>
                           <img className="najdorf" src={IntermezzoBxe4} alt="Chess players" />

      <p>
        In this position, Black doesn't have an intermezzo -- yet. However, Black has a tactic that involves an intermezzo. This is a tricky one! Can you find the tactic?
        <br/>
        <br/>
      </p>
      <details className="solution-dropdown">
        <summary>Solution</summary>
        <p>
          The answer is ... Bxe4! If you found it, congratulations! Now, you might be thinking, WHAT? Doesn't this just lose a Bishop. Now, hold on a second!
          <br/>
          If White blindly captures the Bishop with dxe4, then Black can take White's rook on g3, winning material. Alternatively, if White goes Rxg8 FIRST, expecting you to recapture so that White can then take your Bishop, then what should you do? Are you cooked?
          <br/>
          <br/>
          <br/>
          <br/>
          Black can play the brilliant intermezzo Bxd3+! Since White is in check, they cannot defend/move their rook on g8 away, and have to move their King.
          <br/>
          After they move their King, you can recapture the rook on g8, and you have won two pawns after this ordeal.
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

export default Intermezzo;
