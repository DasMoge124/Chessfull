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
import ParticleBackground from "../components/Particles";

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
      {/* Particle background */}
      <ParticleBackground />

      {/* Page content above particles */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "140px", // adjust spacing below navbar
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <h1>Beginner Page</h1>
        <p>
          Welcome to the world of chess. If you are new to the game, this is an
          excellent start for your chess journey. It is strongly recommended to
          go through each module one by one, especially if you are new or not
          familiar with most chess concepts.
        </p>

        <h2>How to Play Chess</h2>
        <div className="ButtonElements">
          <button
            onClick={() =>
              navigate("/lessons/beginner/how_to_setup_chessboard")
            }
          >
            How to Set up a Chessboard
          </button>
          <button onClick={() => navigate("/lessons/beginner/how_pieces_move")}>
            How each chess piece Moves
          </button>
        </div>

        <h2>Basic Chess Principles</h2>
        <div className="ButtonElements">
          <button
            onClick={() => navigate("/lessons/beginner/opening_principles")}
          >
            Opening Principles
          </button>
          <button
            onClick={() =>
              navigate("/lessons/beginner/checkmates_and_stalemates")
            }
          >
            Checkmates and Stalemates
          </button>
        </div>
        <div className="ButtonElements">
          <button onClick={() => navigate("/lessons/beginner/chess_notation")}>
            Chess Notation
          </button>
          <button
            onClick={() => navigate("/lessons/beginner/how_to_calculate")}
          >
            How to Calculate
          </button>
        </div>

        <h2>Basic Tactics</h2>
        <div className="ButtonElements">
          <button onClick={() => navigate("/lessons/beginner/hanging_pieces")}>
            Hanging Pieces
          </button>
        </div>
        <div className="ButtonElements">
          <button onClick={() => navigate("/lessons/beginner/forks")}>
            Forks
          </button>
        </div>
        <div className="ButtonElements">
          <button
            onClick={() => navigate("/lessons/beginner/pins_and_skewers")}
          >
            Pins and Skewers
          </button>
        </div>
        <div className="ButtonElements">
          <button
            onClick={() => navigate("/lessons/beginner/discovered_attacks")}
          >
            Discovered Attacks
          </button>
        </div>

        <h2>Pawn Structures</h2>
        <div className="ButtonElements">
          <button
            onClick={() =>
              navigate("/lessons/beginner/pawn_structure_isolated_pawns")
            }
          >
            Isolated Pawns
          </button>
          <button
            onClick={() =>
              navigate("/lessons/beginner/pawn_structure_doubled_pawns")
            }
          >
            Doubled Pawns
          </button>
          <button onClick={() => navigate("/lessons/beginner/pawn_chains")}>
            Pawn Chains
          </button>
        </div>
        <h2>More advanced Tactics</h2>
        <div className="ButtonElements">
          <button
            onClick={() =>
              navigate("/lessons/beginner/attraction_vs_deflection")
            }
          >
            Attraction vs. Deflection
          </button>
        </div>
        <h2>Endgames</h2>
        <button
          onClick={() => navigate("/lessons/beginner/checkmate_with_queen")}
        >
          Checkmates with a Queen
        </button>
        <button
          onClick={() => navigate("/lessons/beginner/checkmate_with_rook")}
        >
          Checkmates with a Rook
        </button>
        <button onClick={() => navigate("/learn/beginner/Rule_of_Square")}>
          Rule of the Square
        </button>
        <h2>Practice Games</h2>
        <div className="ButtonElements">
          <button
            onClick={() => navigate("/lessons/beginner/beginner_lesson_one")}
          >
            Game 1
            {isCompleted("beginner_game_1") && (
              <span style={{ color: "#1e6a21ff" }}> (complete)</span>
            )}
          </button>
          <button
            onClick={() => navigate("/lessons/beginner/beginner_lesson_two")}
          >
            Game 2
            {isCompleted("beginner_game_2") && (
              <span style={{ color: "#1e6a21ff" }}> (complete)</span>
            )}
          </button>
          <button
            onClick={() => navigate("/lessons/beginner/beginner_lesson_three")}
          >
            Game 3
            {isCompleted("beginner_game_3") && (
              <span style={{ color: "#1e6a21ff" }}> (complete)</span>
            )}
          </button>
        </div>

        <div className="ButtonElements">
          <button onClick={() => navigate("/learn")}>
            Return to Lessons Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default Beginner;
