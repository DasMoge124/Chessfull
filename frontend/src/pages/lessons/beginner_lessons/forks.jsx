import React from "react";
import chessImage from "./Images/forks.png";
import { useNavigate } from "react-router-dom";

function forks() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Forks</h1>
      <p>
        {" "}
        A fork is a tactic where a piece attacks at least two of the opponent’s
        pieces simultaneously.{" "}
      </p>
      <p>
        {" "}
        The image below is a great example of a fork: in this position, the
        knight on c7 is attacking three pieces at one - the king on e8, the rook
        on a8, and the queen on d5.{" "}
      </p>
      <p>
        {" "}
        Since the king is in check, black has to move the queen and white will
        win a queen by playing the best move Nxd5 (Knight captures the queen on
        d5).{" "}
      </p>
      <div className="image-container">
        <img src={chessImage} alt="Chess players" />
      </div>
      <div className="ButtonElements">
        <button onClick={() => navigate("/lessons/beginner/forks_practice")}>
          Lessons
        </button>
      </div>
    </div>
  );
}

export default forks;
