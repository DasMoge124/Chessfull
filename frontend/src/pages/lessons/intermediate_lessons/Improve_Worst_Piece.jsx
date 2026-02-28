import React from "react";
import { useNavigate } from "react-router-dom";
import Improve_Bishop from "./Images/Improve_Bishop.png";
import Winter_Bishop from "./Images/Winter_Bishop.png";

import "./lesson.css";

const Improve_Worst_Piece = () => {
  const navigate = useNavigate();

  return (
    <div className="lesson-container">
      <h1><br/><br/>Improve Your Worst Piece</h1>
      <h2>What do we mean by improving our worst piece?</h2>
      <p>
        In Chess, some pieces you have will be active and some won't. However, to maximize the activity of your pieces, you should generally seek to improve your worst piece so ALL your pieces can join the party! :D
        <br/> Not sure what I mean? Here are some examples!
      </p>
      <h2>Example 1</h2>
        <img className="najdorf" src={Improve_Bishop} alt="Chess players" />
      <p>
        In this position, Black's light squared bishop isn't really doing anything.
        <br/>
        It would be really nice if it did do something, so Black should go Bh5!, creating a pin on White's Knight on f3, while also activating Black's Bishop
      </p>
                   <h2>Example 2</h2>
        <img className="najdorf" src={Winter_Bishop} alt="Chess players" />
      <p>
        In this position, White's Bishop on g1 is absolute garbage, in addition to White's Rook on h1. Even worse, Black is about to play f4, making White's Bishop on g1 passive for good.
        <br/>
        What should White do?
      </p>
      <details className="solution-dropdown">
        <summary>Solution</summary>
        <p>
          White should play f4! Although this sacrifices a pawn, after Black takes the pawn, White can go f3! Then, White's Bishop on g1 will finally be activated.
          <br/>
          In addition, once White plays f3 and activates their Bishop, they can move their Bishop and get their Rook on h1 back in the game. Although doing this loses a pawn, activating your pieces is a lot more important!
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

export default Improve_Worst_Piece;
