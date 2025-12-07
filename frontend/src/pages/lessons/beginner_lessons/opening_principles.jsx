import React from "react";
import chessImage from "./Images/opening_principles.png";
import { useNavigate } from "react-router-dom";
import "./lesson.css";

function chessboard_setup() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Opening Principles</h1>
      <p>
        The opening stage is the first stage of the game, where both players
        make their first moves. Key principles to remember include:
      </p>
      <ol>
        <li>
          <h2>Control the Center</h2>
          It’s recommended to play e4 or d4 as the first move as white and e5 or
          d5 as black. Here are the few reasons why its best to control the
          center:
          <ul>
            <li>
              Greater mobility: Pieces placed in or controlling the center have
              access to more squares
            </li>
            <li>
              Improved piece coordination: Central control allows for smoother
              development and coordination between pieces, especially knights
              and bishops.
            </li>
            <li>
              Restricts opponent’s options: Covers more space so your opponent’s
              space and make it harder for them to develop their pieces
              effectively.
            </li>
            <li>
              Easier king safety: Central control supports safe castling and
              creates a solid position from which to launch attacks or defend.
            </li>
          </ul>
        </li>
        <li>
          <h2>Develop your pieces</h2> Develop your key pieces, preferably
          bishops and knights, to allow yourself to create potential attacks to
          your opponents. Here are a few reasons why development is important:
          <ul>
            <li>
              Prepares for castling: Quick development of minor pieces allows
              you to castle early, which improves king safety and connects your
              rooks.
            </li>
            <li>
              Controls the center: Developing pieces to active squares often
              supports central control.
            </li>
            <li>
              Avoids falling behind: If you delay development, you risk being
              attacked before your pieces are ready to defend or counter.
            </li>
          </ul>
        </li>
        <li>
          <h2>Protect your king:</h2> You usually need to castle early to ensure
          your king is safe and is less prone to checkmate threats
        </li>
        <li>
          <h2>Don’t bring your queen out too early:</h2> doing so allows your
          opponent to create multiple threats to capture your queen, forcing you
          to move your queen a lot.
        </li>
      </ol>
      <h4>
        Below is a good example of an opening that follows the opening
        principles
      </h4>
      <div className="image-container">
        <img src={chessImage} alt="Chess players" />
      </div>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/beginner")}>
          Back to Lessons Page
        </button>
      </div>
    </div>
  );
}

export default chessboard_setup;
