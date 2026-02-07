import React from "react";
import { useNavigate } from "react-router-dom";
import "./lesson.css";
import opponent1 from "./Images/opponent1.png";
import opponent2 from "./Images/opponent2.png"; // Fixed reference for the second image

const OpponentIdeas = () => {
  const navigate = useNavigate();

  return (
    <div className="lesson-container">
      <h1>Your Opponent's Ideas</h1>
      <h2>In every chess game, you should look for possible checks, captures, and threats your opponent can enact.</h2>
      
      <p>
        In chess, you should've commonly heard of the calculating strategy of looking for checks, captures, and threats when thinking about your next move. However, you should definitely look for the same thing on your opponent's side. Remember, you and your opponent are chess players fighting for the same thing.
      </p>

      <h3>Here are some guiding questions to consider:</h3>
      <ul>
        <li>Why did they move that move?</li>
        <li>What moves can they play?</li>
        <li>What can you do to stop them?</li>
      </ul>

      <h2>Let's look at an example:</h2>
      <img src={opponent1} alt="Position before defense" className="chessImage" />
      
      <p>
        In this position, Black is threatening checkmate with the bishop-queen battery (bishop on d6 and queen on e5) targeting h2. 
        <strong> White</strong> needs to defend themselves from this threat to avoid losing. Hence, White played <strong>g3</strong> to block the diagonal.
      </p>

      <img src={opponent2} alt="Position after g3" className="chessImage" />
      
      <p>
        Now, Black's battery is no longer threatening checkmate and the position remains safe for White. Also, don't worry about the weakened light squares since there is no light-squared bishop to exploit them!
      </p>

      <div className="ButtonElements">
        <button onClick={() => navigate("/lessons/intermediate/your_opponents_ideas_practice")}>
          Start Practicing
        </button>
      </div>
    </div>
  );
};

export default OpponentIdeas;