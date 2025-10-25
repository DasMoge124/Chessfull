import React from "react";

const LessonControls = ({
  currentLesson,
  lessonMessage,
  showContinue,
  onContinue,
}) => {
  return (
    <div className="lesson-controls">
      {/* Current lesson description */}
      {currentLesson && (
        <div className="lesson-info">
          <p>
            <strong>Move:</strong> {currentLesson.move}
          </p>
          <p>
            <strong>Player:</strong> {currentLesson.player}
          </p>
        </div>
      )}

      {/* Message area */}
      {lessonMessage && (
        <div className={`lesson-message ${lessonMessage.type}`}>
          <p>{lessonMessage.text}</p>
          {lessonMessage.explanation && (
            <p className="explanation">
              <strong>Why:</strong> {lessonMessage.explanation}
            </p>
          )}
          {lessonMessage.showHint && (
            <p className="hint">
              💡 <strong>Hint:</strong> {currentLesson.hint}
            </p>
          )}
          {lessonMessage.showSolution && (
            <p className="solution">
              ✅ <strong>Solution:</strong> {currentLesson.solution}
            </p>
          )}
        </div>
      )}

      {/* Continue Button */}
      {showContinue && (
        <button className="continue-btn" onClick={onContinue}>
          Continue →
        </button>
      )}
    </div>
  );
};

export default LessonControls;
