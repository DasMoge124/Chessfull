import React from "react";
import { useNavigate } from "react-router-dom";
import Sacrifice0 from "./Images/sacrifice0.png";
import Sacrifice1 from "./Images/sacrifice1.png";
import Sacrifice2 from "./Images/sacrifice2.png";
import "./lesson.css";

const Tactical_Sacrifices = () => {
  const navigate = useNavigate();

  return (
    <div className="lesson-container">
      <h1>
        <br />
        <br />
        Tactical Sacrifices
      </h1>
      <h2>What is a Tactical Sacrifice?</h2>
      <p>
        A tactical sacrifice involves temporarily giving up material in the
        short-term, to gain an advantage again after a forced sequence of moves.
      </p>
      <h2>Example</h2>
      <img src={Sacrifice0} alt="Chess players" />
      <p>
        In this position, white seems to be threatening checkmate with a knight
        and queen. For some beginners, it may seem inevitable, however, you
        actually turn this into a winning position with a sacrifice
        <br />
        In this position, you can just sacrifice, THE QUEEN!
      </p>
      <img src={Sacrifice1} alt="Chess players" />
      <p>
        This is the critical move. By Qxg5, Black forces White into a difficult
        dilemma. The move effectively paralyzes White's offensive momentum.
        <br /> If White accepts the sacrifice with Qxg5, they fall directly into
        Black’s tactical trap.
      </p>
      <img src={Sacrifice2} alt="Chess players" />
      <p>
        Following the capture, Black delivers a forceful knight check.
        <br /> Depending on the specific geometry of the board, this move
        functions as a royal fork, simultaneously attacking the King and the
        newly placed Queen on g5.
      </p>
      <p>
        Regardless of the King’s escape square, Black proceeds to recapture the
        Queen via Nxg5. <br /> By trading the Queen for the opponent’s most
        active piece and disrupting White's coordination, Black transitions from
        a defensive struggle into a statistically winning endgame.
      </p>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/intermediate")}>
          Return to Lessons
        </button>
      </div>
    </div>
  );
};

export default Tactical_Sacrifices;
