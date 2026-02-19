import React from "react";
import EricVEmilia from "./lessons/white/eric_v_emilia";
import "./LessonCards.css";
import ParticleBackground from "../components/Particles";

function Advanced() {
  return (
    <div className="lesson-container">
      <ParticleBackground />
      <div className="lesson-header">
         <h1>Advanced Strategies</h1>
         <p>Analyze complex games and grandmaster techniques.</p>
      </div>
      
      <div className="topic-section">
          <EricVEmilia />
      </div>
    </div>
  );
}

export default Advanced;
