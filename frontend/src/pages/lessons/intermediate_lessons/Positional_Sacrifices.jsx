import React from "react";
import { useNavigate } from "react-router-dom";
import Najdorf from "./Images/NajdorfRxc3.png";
import Najdorfc4 from "./Images/Najdorfc4.png";
import Positional from "./Images/Bxc5Positional.png";
import Posicont from "./Images/Bxc5Continued.png";

import "./lesson.css";

const Positional_Sacrifices = () => {
  const navigate = useNavigate();

  return (
    <div className="lesson-container">
      <h1><br/><br/>Positional Sacrifices</h1>
      <h2>What is a positional sacrifice?</h2>
      <p>
        A positional sacrifice involves giving up material in the short-term to gain a long-term strategic advantage.
        This is unlike a tactical sacrifice, which is more forced.
      </p>
      <h2>Example</h2>
      <img className="najdorf" src={Najdorf} alt="Chess players" />
      <p>
        In this position, White is ready to go Nd5, activating the White Knight and dominating the backward d6 pawn.
        <br />
        However, Black has a clever way to avoid this predicament through a positional sacrifice.
        It would lose material, but it would weaken White's King, give White a bad pawn structure, and not allow White to do what we just mentioned above. What should Black do?
        <br/>
        <br/>

       

      </p>
      <img className="najdorf" src={Najdorfc4} alt="Chess players" />

      <p>
         Black should play Rxc3!!, sacrificing the exchange. Even though Black loses material, Black stops White from going Nd5, weakens White's King, and also messes up White's pawn structure.
        <br/>
        Afterward, Black can go Qc7, Nb6-Nc4, fixing a Knight on c4 and taking advantage of White's weak double pawns. Even though Black is down an exchange, they are in a better position.
      </p>
            <h2>Example 2</h2>
      <img className="najdorf" src={Positional} alt="Chess players" />

      <p>
        Oh no! White is attacking Black's rook on c5, and if Black moves it, then White can go Bd6, winning a pawn! Is Black cooked?
        <br /> The answer is actually, a strong, resolute, NO!
        Even though Black will inevitably lose material, there is one way Black can do it such that Black will have a positionally dominating position.
        What should Black do?
      </p>
            <img className="najdorf" src={Posicont} alt="Chess players" />
      <p>
      The answer is exf4!! Black takes White's "hanging" pawn, and after White takes Black's rook with Bxc5, Black simply recaptures with bxc5.
      <br/>
      Now, Black's plan is to go Be5, where Black's Bishop is extremely strong controls the key diagonal, defends f4 and d6, and is in a location where it cannot be attacked.
      <br/>
      Then, Black can improve their knight using Nd7-f6-e4, and Black's knight will be in an active position.
      <br/>
      Even though Black is down material and unlikely to gain any back anytime soon, Black is still in a dominating position as White's pieces are extremely passive.
      </p>
      <p>
        
      </p>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/intermediate")}>
          Return to Lessons
        </button>
      </div>
    </div>
  );
};

export default Positional_Sacrifices;
