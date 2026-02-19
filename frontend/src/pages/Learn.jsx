import React from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "../components/Particles";
import "./LessonCards.css"; // Reuse card styles

function Learn() {
  const navigate = useNavigate();

  const learnSections = [
    {
      id: "beginner",
      title: "Beginner",
      description: "Start here if you're new. Learn how pieces move, basic rules, and opening principles.",
      path: "/learn/beginner",
      color: "from-green-400 to-emerald-600",
    },
    {
      id: "intermediate",
      title: "Intermediate",
      description: "Level up your tactics. Master pins, forks, discovered attacks, and middle-game concepts.",
      path: "/learn/intermediate",
      color: "from-blue-400 to-indigo-600",
    },
    {
      id: "advanced",
      title: "Advanced",
      description: "For experienced players. Dive deep into grandmaster games and complex positional play.",
      path: "/learn/advanced",
      color: "from-purple-400 to-pink-600",
    },
    {
      id: "lessons",
      title: "Famous Games",
      description: "Study historic battles between legends like Magnus Carlsen, Hikaru Nakamura, and more.",
      path: "/lessons",
      color: "from-orange-400 to-red-600",
    },
  ];

  return (
    <div className="lesson-container" style={{ paddingTop: "140px" }}> {/* Added specific padding for this container if needed */}
      <ParticleBackground />
      
      <div className="lesson-header">
        <h1>Select Your Level</h1>
        <p>Choose your path to mastery. From basics to grandmaster strategies.</p>
      </div>

      <div className="cards-grid">
        {learnSections.map((section) => (
          <div
            key={section.id}
            className="lesson-card"
            onClick={() => navigate(section.path)}
          >
            <div className="card-content">
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </div>
            <div className="card-action">
              <button className="start-btn">
                Start Learning <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Learn;
