/**
 * Lessons page component that displays all available chess lessons.
 * Shows games from famous chess matches featuring both white and black perspectives.
 * Includes games from grandmasters like Magnus Carlsen and other chess professionals.
 * Fetches user progress from the backend and marks completed lessons with a green checkmark.
 * Users can click on any lesson to view and practice the game moves.
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Lessons() {
  const navigate = useNavigate();
  // State to store the list of completed lesson IDs from the backend
  const [completedLessonIds, setCompletedLessonIds] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:8085/api/progress/my-lessons", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setCompletedLessonIds(data); // e.g., ["magnus_v_bardiya_001"]
        }
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };

    fetchProgress();
  }, []);

  // Helper function to check if a lesson is done
  const isCompleted = (id) => completedLessonIds.includes(id);

  return (
    <div className="page-container">
      <div className="page-content">
        <h2>Chess Lessons</h2>
        <p>Master the board by studying the greats.</p>

        {/* Lesson 1 */}
        <div className="ButtonElements">
          <button onClick={() => navigate("/lessons/grandmaster/CantyVNarayan")}>
            FM James Canty vs FM Narayan {isCompleted("canty_v_narayan") && <span style={{color: "#1e6a21ff"}}> (complete)</span>}
          </button>
        </div>
{/*hikaru_v_andrey */}
        {/* Lesson 2 */}
        <div className="ButtonElements">
          <button onClick={() => navigate("/lessons/international_master/EricVEmilia")}>
            IM Eric Rosen vs. WFM Emilia Sprzęczka {isCompleted("eric_v_emilia_003") && <span style={{color: "#1e6a21ff"}}> (complete)</span>}
          </button>
        </div>

        {/* Lesson 3 */}
        <div className="ButtonElements">
          <button onClick={() => navigate("/lessons/grandmaster/MagnusVRainn")}>
            GM Magnus Carlsen vs Rainn Wilson {isCompleted("magnus_v_rainn") && <span style={{color: "#1e6a21ff"}}> (complete)</span>}
          </button>
        </div>

        {/* Lesson 4 (The one we just worked on) */}
        <div className="ButtonElements">
          <button onClick={() => navigate("/lessons/grandmaster/MagnusVBardiya")}>
            GM Magnus Carlsen vs Bardiya {isCompleted("magnus_v_bardiya_001") && <span style={{color: "#1e6a21ff"}}> (complete)</span>}
          </button>
        </div>

        {/* Lesson 5 */}
        <div className="ButtonElements">
          <button onClick={() => navigate("/lessons/grandmaster/MagnusVSina")}>
            GM Magnus Carlsen vs Sina {isCompleted("magnus_v_sina") && <span style={{color: "#1e6a21ff"}}> (complete)</span>}
          </button>
        </div>
        <div className="ButtonElements">
          <button onClick={() => navigate("/lessons/grandmaster/AndreyVHikaru")}>
            GM Hikaru Nakamura vs Andrey Esipenko {isCompleted("hikaru_v_andrey") && <span style={{color: "#1e6a21ff"}}> (complete)</span>}
          </button>
        </div>
        <div className="ButtonElements">
          <button onClick={() => navigate("/lessons/grandmaster/TerryVRozman")}>
            GM Hikaru Nakamura vs Andrey Esipenko {isCompleted("terry_v_rozman") && <span style={{color: "#1e6a21ff"}}> (complete)</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Lessons;