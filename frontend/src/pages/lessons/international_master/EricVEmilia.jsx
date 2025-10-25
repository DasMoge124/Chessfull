import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import "../../styles/GameLesson.css"; // make sure path matches your structure
import Chessboard from "../../components/Chessboard";
import LessonControls from "../../components/LessonControls";
import { GAME_LESSON_MOVES, STARTING_FEN } from "../../data/gameLessons";

// =========================================================
// 1. MAIN LESSON COMPONENT
// =========================================================

const EricVEmilia = () => {
  const [game, setGame] = useState(new Chess(STARTING_FEN));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonMessage, setLessonMessage] = useState(null);
  const [showContinue, setShowContinue] = useState(false);

  const lessonMoves = GAME_LESSON_MOVES;
  const currentLesson = lessonMoves[currentLessonIndex];

  // Reset board when lesson changes
  useEffect(() => {
    const newGame = new Chess(STARTING_FEN);
    // apply all moves up to current lesson
    for (let i = 0; i < currentLessonIndex; i++) {
      const moveText = lessonMoves[i].move.split(" ")[1].replace("...", "").trim();
      newGame.move(moveText);
    }
    setGame(newGame);
    setLessonMessage(null);
    setShowContinue(false);
  }, [currentLessonIndex]);

  const handleContinue = () => {
    if (currentLessonIndex < lessonMoves.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else {
      setLessonMessage({
        type: "complete",
        text: "🎉 You've finished the Eric vs Emilia lesson!",
      });
    }
  };

  return (
    <div className="lesson-container">
      <h2 className="lesson-title">♟️ Eric vs Emilia — Tactical Lesson</h2>

      <div className="lesson-content">
        <div className="lesson-board">
          <Chessboard
            game={game}
            setGame={setGame}
            currentLessonIndex={currentLessonIndex}
            lessonMoves={lessonMoves}
            setLessonMessage={setLessonMessage}
            setShowContinue={setShowContinue}
            showContinue={showContinue}
          />
        </div>

        <LessonControls
          currentLesson={currentLesson}
          lessonMessage={lessonMessage}
          showContinue={showContinue}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
};

export default EricVEmilia;
