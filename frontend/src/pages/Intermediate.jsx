import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./LessonCards.css";
import ParticleBackground from "../components/Particles";

const topics = {
  Openings: [
    {
      title: "Italian Opening",
      description: "Master the classic Italian Game. Learn to control the center, develop your pieces rapidly, and launch attacks on the weak f7 square.",
      path: "/learn/intermediate/italian_opening",
    },
  ],
  Middlegame: [
    {
      title: "Space",
      description: "Understand the importance of space advantage. Learn how to cramp your opponent and create maneuvering room for your pieces.",
      path: "/lessons/intermediate/space",
    },
    {
      title: "Tactical Sacrifices",
      description: "Learn when to give up material for a winning advantage. Spot combinations that rip open the opponent's defense.",
      path: "/learn/intermediate/Tactical_Sacrifices",
    },
    {
      title: "Positional Sacrifices",
      description: "Sacrifice material for long-term strategic gains. Learn to evaluate compensation beyond just material count.",
      path: "/learn/intermediate/Positional_Sacrifices",
    },
    {
      title: "Weak Squares",
      description: "Identify and exploit weak squares in your opponent's camp. transform them into powerful outposts for your pieces.",
      path: "/lessons/intermediate/weak_squares",
    },
    {
      title: "Imbalances",
      description: "Recognize the differences in position. Learn to create and exploit imbalances like minor piece superiority or pawn structure.",
      path: "/learn/intermediate/Imbalances",
    },
    {
      title: "Intermezzo",
      description: "The 'in-between' move. Surprise your opponent with an unexpected check or threat before recapturing.",
      path: "/learn/intermediate/Intermezzo",
    },
    {
      title: "Underpromotion",
      description: "Promote a pawn to a piece other than a Queen. Learn when a Knight or Rook is better to avoid stalemate or deliver mate.",
      path: "/learn/intermediate/Underpromotion",
    },
    {
      title: "Your Opponent's Ideas",
      description: "Don't just play your own game. Learn to predict and prevent your opponent's plans before they become dangerous threats.",
      path: "/lessons/intermediate/your_opponents_ideas",
    },
    {
      title: "Improve Worst Piece",
      description: "A simple yet powerful strategy. Identify your least active piece and find a way to bring it into the game.",
      path: "/learn/intermediate/improve_worst_piece",
    },
    {
      title: "Attacking The King",
      description: "Learn patterns for direct attacks on the King. Coordinate your pieces to break through defensive fortresses.",
      path: "/learn/intermediate/Attacking_The_King",
    },
    {
      title: "Pairing Pieces",
      description: "Understand how piece pairs work together. Maximize the synergy between your Queen and Knight, or Bishop pair.",
      path: "/lessons/intermediate/pairing_pieces",
    },
    {
      title: "Outposts",
      description: "Establish your Knights on powerful outpost squares where they cannot be driven away by enemy pawns.",
      path: "/lessons/intermediate/Outposts",
    },
    {
      title: "Converting A Winning Position",
      description: "Don't let the win slip away. Learn the technique to simplify and force a win when you have a material advantage.",
      path: "/lessons/intermediate/Converting_A_Winning_Position",
    },
    {
      title: "Overloading",
      description: "Exploit pieces that have too many defensive duties. Distract them to win material or specific squares.",
      path: "/lessons/intermediate/Overloading",
    },
    {
      title: "Interference",
      description: "Cut off the line of communication between enemy pieces. Block their defense to create tactical opportunities.",
      path: "/lessons/intermediate/Interference",
    },
  ],
  Endgames: [
    {
      title: "Distant Opposition",
      description: "Master the King opposition from a distance. A crucial technique for winning or drawing King and Pawn endgames.",
      path: "/learn/intermediate/distant_opposition",
    },
    {
      title: "Zugzwang",
      description: "Put your opponent in a position where any move they make worsens their situation. The ultimate weapon in endgames.",
      path: "/learn/intermediate/zugzwang",
    },
    {
      title: "Triangulation",
      description: "Lose a tempo to gain the opposition. A subtle King maneuver to outflank your opponent.",
      path: "/learn/intermediate/Triangulation",
    },
  ],
  "Practice Games": [
    {
      title: "Practice Game 1",
      description: "Apply what you've learned in a simulated game environment. Test your skills against intermediate strategies.",
      path: "/learn/intermediate/distant_opposition", 
    },
  ],
};

function Intermediate() {
  const navigate = useNavigate();

  return (
    <div className="intermediate-page" style={{ position: "relative", minHeight: "100vh" }}>
      <ParticleBackground />
      
      <div className="lesson-container">
        <div className="lesson-header">
          <h1>Intermediate Lessons</h1>
          <p>Elevate your game with advanced strategies and tactics.</p>
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Intermediate;
