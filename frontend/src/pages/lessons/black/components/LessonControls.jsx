import React from "react";

const LessonControls = ({
  currentLesson,
  lessonMessage,
  showContinue,
  onContinue,
}) => {
  if (!currentLesson && !lessonMessage) return null;

  return (
    <div
      className="lesson-controls"
      style={{
        backgroundColor: "#2c2c2c",
        padding: "16px",
        borderRadius: "8px",
        marginTop: "20px",
        width: "90%",
        maxWidth: "500px",
        textAlign: "left",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Current Lesson Info */}
      {currentLesson && (
        <div className="lesson-info" style={{ marginBottom: "10px" }}>
          <p style={{ margin: "4px 0" }}>
            <strong>Move:</strong> {currentLesson.move}
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong>Player:</strong> {currentLesson.player}
          </p>
        </div>
      )}

      {/* Lesson Message */}
      {lessonMessage && (
        <div
          className={`lesson-message ${lessonMessage.type}`}
          style={{
            padding: "10px",
            borderRadius: "5px",
            backgroundColor:
              lessonMessage.type === "error"
                ? "#3a1f1f"
                : lessonMessage.type === "success"
                ? "#1f3a25"
                : lessonMessage.type === "info"
                ? "#1f2f3a"
                : "transparent",
            color:
              lessonMessage.type === "error"
                ? "#ff6b6b"
                : lessonMessage.type === "success"
                ? "#7dd97d"
                : "#a9d1ff",
          }}
        >
          <p style={{ fontWeight: 600, marginBottom: 6 }}>
            {lessonMessage.text}
          </p>

          {lessonMessage.explanation && (
            <p style={{ marginTop: 4 }}>
              <strong>Why:</strong> {lessonMessage.explanation}
            </p>
          )}

          {lessonMessage.showHint && currentLesson?.hint && (
            <p className="hint" style={{ color: "#ffc107", marginTop: 8 }}>
              💡 <strong>Hint:</strong> {currentLesson.hint}
            </p>
          )}

          {lessonMessage.showSolution && currentLesson?.solution && (
            <p className="solution" style={{ color: "#90ee90", marginTop: 8 }}>
              ✅ <strong>Solution:</strong> {currentLesson.solution}
            </p>
          )}
        </div>
      )}

      {/* Continue Button */}
      {showContinue && (
        <button
          className="continue-btn"
          onClick={onContinue}
          style={{
            marginTop: "15px",
            padding: "8px 16px",
            fontWeight: 600,
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Continue →
        </button>
      )}
    </div>
  );
};

export default LessonControls;
