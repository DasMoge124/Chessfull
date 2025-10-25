import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Learn() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="page-content">
        <h2>Select Your Level</h2>

        <div className="ButtonElements">
          <button onClick={() => navigate("/learn/beginner")}>Beginner</button>
        </div>
        <div className="ButtonElements">
          <button onClick={() => navigate("/learn/intermediate")}>
            Intermediate
          </button>
        </div>
        <div className="ButtonElements">
          <button onClick={() => navigate("/learn/advanced")}>Advanced</button>
        </div>
        <div className="ButtonElements">
          <button onClick={() => navigate("/chessboard")}>Chessboard</button>
        </div>
      </div>
    </div>
  );
}

export default Learn;
