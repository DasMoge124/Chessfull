import React, { useState } from "react";
import "../App.css";
import EricVEmilia from "./lessons/international_master/eric_v_emilia.jsx";

function Learn() {
  const [level, setLevel] = useState(null);

  // If advanced is chosen, show the Eric vs Emilia lesson
  if (level === "advanced") {
    return <EricVEmilia />;
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <h2>Select Your Level</h2>

        <div className="ButtonElements">
          <button onClick={() => setLevel("beginner")}>Beginner</button>
        </div>
        <div className="ButtonElements">
          <button onClick={() => setLevel("intermediate")}>Intermediate</button>
        </div>
        <div className="ButtonElements">
          <button onClick={() => setLevel("advanced")}>Advanced</button>
        </div>
      </div>
    </div>
  );
}

export default Learn;
