import React from "react";
import attraction from "./Images/attraction.png";
import deflection from "./Images/deflection.png";
import { useNavigate } from "react-router-dom";

// Assuming the image you provided is saved as 'doubled_pawns_example.jpg'
// in an Images folder, replace with your actual path.

function attractionvdeflection() {
  const navigate = useNavigate();
  return (
    <div className="pawn-chains-lesson">
      <header className="lesson-header">
        <h1>Pawn Chains</h1>
      </header>

      <section className="pawn-chains-content">
        <h2>Attraction vs. Deflection</h2>
        <p>Attraction: You lure an enemy piece to a vulnerable spot where you can use another tactic, like forks, pins, skewers, or even checkmate. The images below demonstrate how attraction works: </p>
        <img src={attraction} alt="Chess players" />
        <p>
            Deflection: You force an enemy piece to move away from a critical square, rank, or file, often exposing a weakness or allowing you to execute a tactic like a fork, pin, skewer, or checkmate. The image below demonstrate how deflection works:
        </p>
        <img src={deflection} alt="Chess players" />
      </section>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/beginner")}>
          Return to lessons page
        </button>
      </div>
    </div>
  );
}

export default attractionvdeflection;