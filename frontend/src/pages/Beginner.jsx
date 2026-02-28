/**
 * Beginner page component that displays chess lessons for new players.
 * Includes foundational lessons such as:
 * - How to set up a chessboard
 * - How each chess piece moves
 * - Chess notation
 * - Opening principles
 * - Basic tactics (hanging pieces, forks, pins, skewers)
 * - Checkmates and stalemates
 * Fetches user progress from the backend to show which lessons have been completed.
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./LessonCards.css";
import ParticleBackground from "../components/Particles";

const topics = {
  "How to Play Chess": [
    {
      title: "How to Set up a Chessboard",
      description:
        "Learn the correct way to arrange the pieces on the board to start a game.",
      path: "/lessons/beginner/how_to_setup_chessboard",
    },
    {
      title: "How each chess piece Moves",
      description:
        "Master the movement of Kings, Queens, Rooks, Bishops, Knights, and Pawns.",
      path: "/lessons/beginner/how_pieces_move",
    },
  ],
  "Basic Chess Principles": [
    {
      title: "Opening Principles",
      description:
        "Control the center, develop your pieces, and get your King to safety.",
      path: "/lessons/beginner/opening_principles",
    },
    {
      title: "Checkmates and Stalemates",
      description:
        "Understand the difference between winning the game and a draw.",
      path: "/lessons/beginner/checkmates_and_stalemates",
    },
    {
      title: "Chess Notation",
      description: "Learn the language of chess to read and record games.",
      path: "/lessons/beginner/chess_notation",
    },
    {
      title: "How to Calculate",
      description:
        "Visualize moves ahead to avoid blunders and find winning sequences.",
      path: "/lessons/beginner/how_to_calculate",
    },
  ],
  "Basic Tactics": [
    {
      title: "Hanging Pieces",
      description: "Spot undefended pieces and capture them for free.",
      path: "/lessons/beginner/hanging_pieces",
    },
    {
      title: "Forks",
      description: "Attack two or more pieces at once with a single move.",
      path: "/lessons/beginner/forks",
    },
    {
      title: "Pins and Skewers",
      description:
        "Restrict enemy piece movement and win material with these powerful tactics.",
      path: "/lessons/beginner/pins_and_skewers",
    },
    {
      title: "Discovered Attacks",
      description: "Unleash hidden threats by moving a piece out of the way.",
      path: "/lessons/beginner/discovered_attacks",
    },
    {
      title: "Capture the Defender",
      description: "Remove a defending piece to win an enemy piece.",
      path: "/lessons/beginner/capture_the_defender",
    },
  ],
  "Pawn Structures": [
    {
      title: "Isolated Pawns",
      description:
        "Learn the strengths and weaknesses of having a pawn with no friendly neighbors.",
      path: "/lessons/beginner/pawn_structure_isolated_pawns",
    },
    {
      title: "Doubled Pawns",
      description:
        "Understand when stacked pawns are a weakness and when they can be a strength.",
      path: "/lessons/beginner/pawn_structure_doubled_pawns",
    },
    {
      title: "Pawn Chains",
      description:
        "Use connected pawns to control space and block enemy pieces.",
      path: "/lessons/beginner/pawn_chains",
    },
  ],
  "More advanced Tactics": [
    {
      title: "Attraction vs. Deflection",
      description:
        "Lure enemy pieces into bad squares or force them away from defense.",
      path: "/lessons/beginner/attraction_vs_deflection",
    },
  ],
  Endgames: [
    {
      title: "Checkmates with a Queen",
      description:
        "Learn the technique to force checkmate with just a King and Queen.",
      path: "/lessons/beginner/checkmate_with_queen",
    },
    {
      title: "Checkmates with a Rook",
      description: "Master the King and Rook checkmate pattern.",
      path: "/lessons/beginner/checkmate_with_rook",
    },
    {
      title: "Rule of the Square",
      description:
        "A quick way to calculate if your King can catch an enemy passed pawn.",
      path: "/learn/beginner/Rule_of_Square",
    },
  ],
  "Practice Games": [
    {
      title: "Game 1",
      description: "Test your knowledge with your first practice game.",
      path: "/lessons/beginner/beginner_lesson_one",
      id: "beginner_game_1",
    },
    {
      title: "Game 2",
      description: "Continue your practice with a new challenge.",
      path: "/lessons/beginner/beginner_lesson_two",
      id: "beginner_game_2",
    },
    {
      title: "Game 3",
      description:
        "Apply all the principles you've learned in this final practice game.",
      path: "/lessons/beginner/beginner_lesson_three",
      id: "beginner_game_3",
    },
  ],
};

function Beginner() {
  const navigate = useNavigate();
  const [completedLessonIds, setCompletedLessonIds] = useState([]);
  const isCompleted = (id) => completedLessonIds.includes(id);
  const url = "http://localhost:8085/";

  useEffect(() => {
    const fetchProgress = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(url + "api/progress/my-lessons", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setCompletedLessonIds(data);
        }
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };

    fetchProgress();
  }, []);

  return (
    <div
      className="beginner-page"
      style={{ position: "relative", minHeight: "100vh" }}
    >
      <ParticleBackground />

      <div className="lesson-container">
        <div className="lesson-header">
          <h1>Beginner Page</h1>
          <p>
            Welcome to the world of chess. If you are new to the game, this is
            an excellent start for your chess journey. It is strongly
            recommended to go through each module one by one, especially if you
            are new or not familiar with most chess concepts.
          </p>
        </div>

        {Object.entries(topics).map(([category, lessons]) => (
          <div key={category} className="topic-section">
            <h2>{category}</h2>
            <div className="cards-grid">
              {lessons.map((lesson, index) => (
                <div
                  key={index}
                  className="lesson-card"
                  onClick={() => navigate(lesson.path)}
                >
                  <div className="card-content">
                    <h3>{lesson.title}</h3>
                    <p>{lesson.description}</p>
                  </div>
                  <div className="card-action">
                    <span className="start-btn">Start Lesson →</span>
                    {lesson.id && isCompleted(lesson.id) && (
                      <span className="completed-status">✓ Complete</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <button
            className="lesson-card"
            style={{
              display: "inline-block",
              padding: "15px 30px",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/learn")}
          >
            Return to Lessons Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default Beginner;
