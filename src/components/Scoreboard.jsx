import React from "react";
import "./Scoreboard.css";

const Scoreboard = ({ currentScore, bestScore }) => {
  return (
    <div className="scoreboard">
      <div className="score-item">
        <strong>Current Score:</strong> {currentScore}
      </div>
      <div className="score-item">
        <strong>Best Score:</strong> {bestScore}
      </div>
    </div>
  );
};

export default Scoreboard;
