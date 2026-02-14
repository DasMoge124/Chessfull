import React from "react";
import pawnChainImage from "./Images/pawn_chains.png";
import pawnChainExample from "./Images/pawn_chain_example.png";
import { useNavigate } from "react-router-dom";

// Assuming the image you provided is saved as 'doubled_pawns_example.jpg'
// in an Images folder, replace with your actual path.

function PawnChains() {
  const navigate = useNavigate();
  return (
    <div className="pawn-chains-lesson">
      <header className="lesson-header">
        <h1>Pawn Chains</h1>
      </header>

      <section className="pawn-chains-content">
        <h2>What are Pawn Chains?</h2>
        <p>A link of pawns on the same diagonal</p>
        <img src={pawnChainImage} alt="Chess players" />
        <h2>Strengths</h2>
        <ul>Mutual Defense: Every single pawn but the bottom pawn is protected, and they create an unstoppable force</ul>
        <ul>Controls key squares: Can control more squares and can limit opponent's options in movement.</ul>
        <ul>Tremendous Power in Endgames: Overpowers pieces as strong as a rook, especially 2 pawns on the sixth or seventh rank during the endgame</ul>
        <ul>You can build attacks behind the chain or break through elsewhere</ul>
        <h2>Weaknesses</h2>
        <ul>Vulnerable Tail: The tail of the pawn chain can be captured, breaking the entire structure</ul>
        <h2>Example</h2>
        <img src={pawnChainExample} alt="Chess players" />
        <p>In this position:<br/>The white bishop can move to g8 and threat to take the tail pawn<br/>Black can’t do much and white can potentially devour the black pawn chain</p>
      </section>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/beginner")}>
          Return to lessons page
        </button>
      </div>
    </div>
  );
}

export default PawnChains;
