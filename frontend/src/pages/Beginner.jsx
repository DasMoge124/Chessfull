import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import MagnusVSina from "./lessons/black/magnus_v_sina";
import Forks from "./lessons/beginner_lessons/forks";

function Beginner() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Beginner Page</h1>;
      <div className="ButtonElements">
        <button onClick={() => navigate("/lessons/beginner/forks")}>
          Forks
        </button>
      </div>
    </div>
  );
}

export default Beginner;
