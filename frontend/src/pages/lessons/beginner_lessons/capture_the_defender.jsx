import React from "react";
import chessImage from "./Images/capturedefender.png";
import { useNavigate } from "react-router-dom";

function forks() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Capture the Defender</h1>
      <p>
        {" "}
        That tactic's name speaks for itself: removing a defender of one of your
        opponent's pieces. By removing a piece's defender, that piece is
        defenseless, meaning you can capture that piece for free.{" "}
      </p>
      <h2>Example</h2>
      <p>Let's look at an example of this tactic in action:</p>
      <div className="image-container">
        <img src={chessImage} alt="Chess players" />
      </div>
      <p>
        In this position, it's Black to move. Black's queen on a5 cannot capture
        the bishop on b5 due to the knight on c3. However, Black can still win
        the bishop by removing the knight on c3. How does White do so?
      </p>
      <p>
        If you found Bxc5 (Bishop takes the knight on c5), you're correct! The
        idea is that the knight on c3 is defending the bishop on b5, so by
        capturing the knight and after a move like bxc5, Black removes the
        defender and wins the bishop.
      </p>
      <div className="ButtonElements">
        <button
          onClick={() =>
            navigate("/lessons/beginner/capture_the_defender_practice")
          }
        >
          Lessons
        </button>
        <div className="ButtonElements">
          <button onClick={() => navigate("/learn/beginner")}>Back Home</button>
        </div>
      </div>
    </div>
  );
}

export default forks;
