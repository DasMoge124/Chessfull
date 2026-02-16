import React from "react";
import { useNavigate } from "react-router-dom";
import "./lesson.css";
import space from "./Images/space.png";

const SpaceLesson = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Space</h1>
      <h2>What do we mean by space?</h2>
      <p>
        Space is essentially the number of squares one controls. The more
        squares you control, the more space you have.
      </p>
      <p>
        With a lot of space:
        <br />
        you can move your pieces around freely where the opponent can’t. <br />{" "}
        It is useful for building an attack. <br /> This also results
        inIncreased mobility allowing better attack and defense
        <br /> Furthermore, enemy pieces can be forced into passive positions
        with no space
      </p>
      <h2>Example</h2>
      <img src={space} alt="Position before defense" className="chessImage" />
      <p>
        White in this position can control more squares. Since it’s white to
        move, white can eventually develop a strong attack through a move like
        g5, breaking through the kingside and creating threats against the black
        king. On the other hand, black has less space to maneuver and is more
        vulnerable to white’s attack.
      </p>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/intermediate")}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default SpaceLesson;
