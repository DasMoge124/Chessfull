import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Lessons() {
  const navigate = useNavigate();
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const completeLesson = () => {
    setLessonCompleted(true);
  };

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
            onClick={() => navigate("/lessons/beginner/BeginnerLessonGameOne")}
          >
            Beginner Game One
          </button>
        </div>
        <div className="ButtonElements">
          <button onClick={() => navigate("/lessons/grandmaster/MagnusVSina")}>
            Magnus vs Sina
          </button>
        </div>
        <div className="ButtonElements">
          <button onClick={() => navigate("/lessons/grandmaster/MagnusVBardiya")}>
            Magnus vs Bardiya
          </button>
        </div>
        <button onClick={completeLesson}>Complete Lesson</button>
        {lessonCompleted && (
          <div>
            <p>Congratulations! You've completed the lesson.</p>
            <button onClick={() => navigate("/learn")}>Back to Levels</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Lessons;
