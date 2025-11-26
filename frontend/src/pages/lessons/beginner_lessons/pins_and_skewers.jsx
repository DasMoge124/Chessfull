import React from "react";
import relativePinImage from "./Images/relative_pins.png";
import absolutePinImage from "./Images/absolute_pins.png";
import skewerImage from "./Images/skewers.png";
import { useNavigate } from "react-router-dom";

function pins_and_skewers() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Pins</h1>
      <p>
        A pin is where a defending piece cannot move out of an attacking piece's
        line of attack without exposing a more valuable or equally valued
        defending piece. There are two kinds of pins, relative pins, which
        involve any pieces that aren’t kings, and absolute pins, which involve
        kings. Image a represents an example of a relative pin: the bishop on a6
        is pinning the knight on d3 to the rook on f1; either the knight or the
        rook can move in this scenario.
      </p>
      <p>
        {" "}
        Conversely, Image b represents an example of an absolute pin: the bishop
        on d5 is pinning the Queen on f7 to the king on h8; the king can move,
        but the queen cannot leave the diagonal as it would expose the king to
        the bishop
      </p>
      <div className="image-container">
        <img src={relativePinImage} alt="Relative Pins" />
      </div>
      <p>Image a</p>
      <div className="image-container">
        <img src={absolutePinImage} alt="Absolute Pins" />
      </div>
      <p>Image b</p>
      <h1>Skewers</h1>
      <p>
        A skewer is where a defending piece cannot move out of an attacking
        piece's line of attack without exposing a less valuable defending piece.
      </p>
      <p>
        In the example below, the bishop on h4 is skewering the king on e2 - the
        more valuable piece - to the rook on d1 (the less valuable piece).
      </p>
      <div className="image-container">
        <img src={skewerImage} alt="Skewers" />
      </div>
      <p>Image c</p>
      <div className="ButtonElements">
        <button
          onClick={() =>
            navigate("/lessons/beginner/pins_and_skewers_practice")
          }
        >
          Start Practicing
        </button>
      </div>
    </div>
  );
}

export default pins_and_skewers;
//4r1k1/1p4pp/1R6/8/1p3P2/4p3/P6r/R3K3 b - - 0 29
