import React from "react";
import { useNavigate } from "react-router-dom";
import "./lesson.css";
import zugzwang1 from "./Images/zugzwang1.png";
import zugzwang2 from "./Images/zugzwang2.png";
import zugzwang3 from "./Images/zugzwang3.png";

// 1. Define the component function
const Zugzwang = () => {
  const navigate = useNavigate(); // 2. Initialize the hook inside the component

  return (
    <div>
      <p>
        <br />
        <br />
      </p>
      <h1>Zugzwang</h1>
      <h2>What is zugzwang?</h2>
      <p>
        When a player is in zugzwang at a certain position, regardless of the
        move that player makes, that player will lose anyways. Distant
        Opposition is a good example of zugzwang, as the player that is not in
        opposition is in zugzwang, as they have to move and lose the opposition.
        In this position, the player that has to move will lose the game, as
        they will have to move their king and lose the opposition, allowing the
        opponent to promote their pawn. Zugzwang can occur in many different
        positions, but it is most commonly seen in endgames.
      </p>
      <h2>Example of Zugzwang</h2>
      <img src={zugzwang1} alt="Zugzwang Example 1" className="lesson-image" />
      <p>
        In this position, black is guarding its pawns. Since its white’s turn,
        white can make a series of moves that can force black to worsen its
        position
        <br />
        We want to be aggressive and limit Black’s space for each piece to limit
        black’s options.
        <br />
        Let’s take a quick look at Kb4.
      </p>
      <img src={zugzwang2} alt="Zugzwang Example 2" className="lesson-image" />
      <p>
        Now notice how black’s king only has two options left, both of which are
        bad None of black’s pawns can push
        <br />
        If black moves King c6, white moves to a5 and can potentially take the
        b5 and a4 pawns, creating two passed pawns eventually
        <br />
        If black moves to the 6th rank, white can just take the b5 pawn Let’s
        look at the option if Black plays king c6
      </p>
      <img src={zugzwang3} alt="Zugzwang Example 2" className="lesson-image" />
      <p>
        After black plays king a6, white moves to c6. Now Black is in zugzwang,
        as no matter what move black plays, its a bad move.
        <br /> If pawn b4, king takes b4.
        <br />
        If king moves to the 7th rank, you can take either b5 or d5 pawn (taking
        b5 is better according to stockfish)
        <br />
        If pawn king a5, king takes d5 The engine will say that white is in a
        huge advantage. <br /> Now lets practice a bit of zugzwang.
      </p>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/intermediate")}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

// 4. Export the component so you can use it in your App/Router
export default Zugzwang;
