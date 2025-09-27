import React from "react";
import "./Login.css"; // Assuming you're using the same CSS file

function Learn() {
  return (
    <div className="CONTAINER">
      <div className="CARD">
        <h3>Select Your Level</h3>
        <div className="ButtonElements">
          <button className="signInButton">Beginner</button>
        </div>
        <div className="ButtonElements">
          <button className="signInButton">Intermediate</button>
        </div>
        <div className="ButtonElements">
          <button className="signInButton">Advanced</button>
        </div>
      </div>
    </div>
  );
}

export default Learn;
