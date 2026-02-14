import React from "react";
import chessImage from "./Images/checkmate.png";
import stalemate from "./Images/stalemate.png";
import queenmate from "./Images/queenmate.gif";
import { useNavigate } from "react-router-dom";

function checkmatesandstalemates() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Checkmates</h1>
      <p>
        Checkmates are when you are checking the king at a position where the
        king has no safe squares left to move. This is a win.
      </p>
      <p>
        {" "}
        Stalemates, on the other hand, occurs when one has no more legal moves
        and the king is not in check. This is a draw.
      </p>
      <div className="image-container">
        <img src={chessImage} alt="Chess players" />
      </div>
      <p>
        The image above is a good example of a checkmate since the white rook on
        d8 is attacking/checking the king on h8 and the king on h8 is blocked by
        its own pieces, meaning it has nowhere to go and is stuck in check
      </p>
      <div className="image-container">
        <img src={stalemate} alt="Chess players" />
      </div>
      <p>
        The image above is a good example of a stalemate since the king on h8 is
        stuck on h8 without being in check and cannot move to g8, g7, or h7
        since the queen is occupying those squares. As a result there are no
        legal moves
      </p>
      <p>
        <b>Additional Information: </b> To checkmate with a queen, try to keep
        putting knight opposition to the king until the king is boxed in a
        corner and when the king only has two squares to move to, move the king
        up until the king is adjacent to the queen. The gif below is a great
        demonstration of how to checkmate with a queen and a king.
      </p>
      <div className="image-container">
        <img src={queenmate} alt="Chess players" />
      </div>
      <div className="ButtonElements">
        <button onClick={() => navigate("/lessons/black/mate_in_one")}>
          Start Practicing
        </button>
      </div>
    </div>
  );
}

export default checkmatesandstalemates;
