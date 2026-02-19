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
import "./LessonCards.css";
import ParticleBackground from "../components/Particles";

const lessonGames = [
  {
    title: "FM James Canty vs CM Narayan",
    description: "Analyze this rapid battle featuring sharp tactical play and aggressive attacks.",
    path: "/lessons/grandmaster/CantyVNarayanan",
    id: "canty_v_narayan",
  },
  {
    title: "IM Eric Rosen vs. WFM Emilia Sprzęczka",
    description: "Study the precision and trap-setting abilities of the famous IM Eric Rosen.",
    path: "/lessons/international_master/EricVEmilia",
    id: "eric_v_emilia_003",
  },
  {
    title: "GM Magnus Carlsen vs Rainn Wilson",
    description: "Witness the World Champion take on 'Dwight Schrute' in this entertaining encounter.",
    path: "/lessons/grandmaster/MagnusVRainn",
    id: "magnus_v_rainn",
  },
  {
    title: "GM Magnus Carlsen vs Bardiya",
    description: "Magnus demonstrates exceptional positional understanding in this game.",
    path: "/lessons/grandmaster/MagnusVBardiya",
    id: "magnus_v_bardiya_001",
  },
  {
    title: "GM Magnus Carlsen vs Sina",
    description: "Another masterclass from Carlsen, showing how to convert small advantages.",
    path: "/lessons/grandmaster/MagnusVSina",
    id: "magnus_v_sina",
  },
  {
    title: "GM Hikaru Nakamura vs Andrey Esipenko",
    description: "A high-level clash between two speed chess titans and calculation machines.",
    path: "/lessons/grandmaster/AndreyVHikaru",
    id: "hikaru_v_andrey",
  },
  {
    title: "IM Renato Terry vs IM Rozman",
    description: "GothamChess (IM Levy Rozman) fights in a complex strategic battle.",
    path: "/lessons/grandmaster/TerryVRozman",
    id: "terry_v_rozman",
  },
];

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
    <div className="lessons-page" style={{ position: "relative", minHeight: "100vh" }}>
       <ParticleBackground />

       <div className="lesson-container">
        <div className="lesson-header">
          <h1>Chess Lessons</h1>
          <p>Master the board by studying the greats.</p>
        </div>

        <div className="topic-section">
          <h2>Grandmaster Games</h2>
          <div className="cards-grid">
            {lessonGames.map((game, index) => (
              <div
                key={index}
                className="lesson-card"
                onClick={() => navigate(game.path)}
              >
                <div className="card-content">
                  <h3>{game.title}</h3>
                  <p>{game.description}</p>
                </div>
                <div className="card-action">
                  <span className="start-btn">Start Analysis →</span>
                  {game.id && isCompleted(game.id) && (
                    <span className="completed-status">
                         ✓ Complete
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lessons;