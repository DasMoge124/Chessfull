import React from "react";
import "../App.css"; // if using shared styles like ButtonElements, etc.

function Learn() {
  return (
    <div className="page-container">
      <div className="page-content">
        <h2>Select Your Level</h2>

        <div className="ButtonElements">
          <button>Beginner</button>
        </div>
        <div className="ButtonElements">
          <button>Intermediate</button>
        </div>
        <div className="ButtonElements">
          <button>Advanced</button>
        </div>
      </div>
    </div>
  );
}

export default Learn;
