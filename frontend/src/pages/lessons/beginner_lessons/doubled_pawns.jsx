import React from "react";
import doubledPawnsImage from "./Images/doubledPawnsImage.png";
import { useNavigate } from "react-router-dom";

// Assuming the image you provided is saved as 'doubled_pawns_example.jpg'
// in an Images folder, replace with your actual path.

function DoubledPawns() {
  const navigate = useNavigate();
  return (
    <div className="doubled-pawns-lesson">
      <header className="lesson-header">
        <h1>Doubled Pawns</h1>
      </header>

      <section className="doubled-pawns-content">
        <h2>🤔 What are Doubled Pawns?</h2>
        <p>
          Doubled pawns occur when two pawns of the same color occupy the same
          file (column) on the board. This usually happens after a pawn has
          captured a piece on that file. They are often considered a structural
          weakness, but not always!
        </p>
        <div className="image-container">
          <img src={doubledPawnsImage} alt="Chess players" />
        </div>
        {/* --- Weaknesses Section --- */}
        <div className="weaknesses-section">
          <h2>⚠️ Why They Are Usually Weak</h2>
          <p>
            Doubled Pawns are weak because they suffer from several fundamental
            disadvantages:
          </p>
          <ul>
            <li>
              <b>Lack of Mutual Defense:</b> They can't protect each other (the
              one in front can't defend the one behind), making them more
              vulnerable targets.
            </li>
            <li>
              <b>Endgame Targets: </b>They can be easy targets for attacks,
              especially in endgames where every pawn is critical.
            </li>
            <li>
              <b>Blocked Rooks:</b> They often block open files for your rooks,
              limiting the rook's activity and power.
            </li>
            <li>
              <b>Reduced Mobility:</b> They reduce pawn mobility and
              flexibility, often preventing the creation of stable pawn chains.
            </li>
          </ul>
        </div>

        {/* --- Exceptions Section --- */}
        <div className="exceptions-section">
          <h2>✨ When Doubled Pawns Are Fine (or Even Helpful)</h2>
          <p>
            BUT sometimes, the trade-off for having doubled pawns is worth it.
            They can be fine or even helpful, especially when:
          </p>
          <ul>
            <li>
              <b>Central Control/Open Files: </b>You gain control of the center
              or successfully open a file for your rooks (which may be more
              valuable than the pawn structure).
            </li>
            <li>
              <b>Dynamic Compensation: </b>You get dynamic compensation like
              strong attacking chances or a lead in development.
            </li>
            <li>
              <b>Targeting Difficulty: </b>The opponent can't easily target or
              attack them, perhaps because they are well-defended or blocked by
              other pieces.
            </li>
          </ul>
        </div>
      </section>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/beginner")}>
          Return to lessons page
        </button>
      </div>
    </div>
  );
}

export default DoubledPawns;
