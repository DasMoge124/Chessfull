import React from "react";
import { useNavigate } from "react-router-dom";
import Overload1 from "./Images/Overload1.png";
import Overload2 from "./Images/Overload2.png";

import "./lesson.css";

const Overloading = () => {
  const navigate = useNavigate();

  return (
    <div className="lesson-container">
      <h1><br/><br/>Overloading</h1>
      <h2>What is overloading?</h2>
      <p>
        Overloading is a tactic that involves taking advantage of a piece doing too much work.
        <br/>
        For example, suppose the Black Queen needs to defend two pieces. If you take one of them, the Black Queen will recapture, leaving the other piece hanging.
        <br/>
        Need some examples? No worries. Let's go right on!
      </p>
      <h2>Example 1</h2>
      <img className="najdorf" src={Overload1} alt="Chess players" />
      <p>
        In this position, it is White to move. What should White do to win material? (Hint: Overloading!)
        <br />
        <br />
        <br />
        <br />
        White should go Bxc6! Congrats if you found it! But isn't this just a trade of pieces? What happens after Black goes Qxc6?
        <br/>
        The answer is, the Black queen was OVERLOADED. It was too busy defending the Black Knight and Black Bishop. After Black goes Qxc6, this leaves
        Black's Bishop on e7 unguarded, and we can proceed to go Qxe7, getting to a winning position :D
        <br/>
        Ready for the next example?
       

      </p>

      <p>
         Black should play Rxc3!!, sacrificing the exchange. Even though Black loses material, Black stops White from going Nd5, weakens White's King, and also messes up White's pawn structure.
        <br/>
        Afterward, Black can go Qc7, Nb6-Nc4, fixing a Knight on c4 and taking advantage of White's weak double pawns. Even though Black is down an exchange, they are in a better position.
      </p>
            <h2>Example 2</h2>
      <img className="najdorf" src={Overload2} alt="Chess players" />

      <p>
        At first glance, this looks like a rougly equal position. However, White has a tactic here involving overloading. Do you see it?
        <br />
        <br />
        <br />
        <br /> 
        The answer is Rxc6! Congratulations if you found it, it was a rather tricky one!
        <br/>
        Now, you might be wondering, don't you just lose an exchange (a rook for a minor piece)?
        <br/>
        Well, after Black goes Rxc6, yes. However, Black's Rook was OVERLOADED initially.
        <br/>
        It was defending both c6 and f7. After Black goes Rxc6, the f7 pawn is hanging, and White can go Qxf7+
        <br/>
        Then, Black will be forced to move their King, and we can go Qxe8, winning the rook!
        <br/>
        These two examples demonstrate the power of overloading tactics. In the future, whenever you see a piece doing too much "work", always think overloading!
      </p>
      
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/intermediate")}>
          Return to Lessons
        </button>
      </div>
    </div>
  );
};

export default Overloading;
