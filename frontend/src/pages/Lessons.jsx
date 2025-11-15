import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Lessons() {
  const navigate = useNavigate();
  //const [lessonCompleted, setLessonCompleted] = useState(false);

  /*const completeLesson = () => {
    setLessonCompleted(true);
  };*/

  return (
    <div className="page-container">
      <div className="page-content">
        <h2>Lesson Title</h2>
        <p>Lesson content goes here...</p>
        <div className="ButtonElements">
          <button
            onClick={() =>
              navigate("/lessons/international_master/EricVEmilia")
            }
          >
            IM Eric Rosen vs. WFM Emilia Sprzęczka
          </button>
        </div>
        <div className="ButtonElements">
          <button onClick={() => navigate("/lessons/grandmaster/MagnusVRainn")}>
            GM Magnus Carlsen vs Rainn Wilson
          </button>
        </div>
        <div className="ButtonElements">
          <button
            onClick={() => navigate("/lessons/grandmaster/MagnusVBardiya")}
          >
            GM Magnus Carlsen vs Bardiya
          </button>
        </div>
        <div className="ButtonElements">
          <button onClick={() => navigate("/lessons/grandmaster/MagnusVSina")}>
            GM Magnus Carlsen vs Sina
          </button>
        </div>
      </div>
    </div>
  );
}

export default Lessons;
