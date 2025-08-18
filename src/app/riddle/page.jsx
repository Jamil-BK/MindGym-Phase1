"use client";
import { useState } from "react";
import ToolPage from "../_templates/ToolPage";
import "./riddle.css";

// Riddle list with multiple accepted answers for each question
const riddles = [
  {
    question: "What has keys but can’t open locks?",
    answers: ["piano", "a piano", "pianos"]
  },
  {
    question: "I’m tall when I’m young, and I’m short when I’m old. What am I?",
    answers: ["candle", "a candle", "candles"]
  },
  {
    question: "What gets wetter the more it dries?",
    answers: ["towel", "a towel", "towels"]
  },
  {
    question: "What can you catch but not throw?",
    answers: ["cold", "a cold", "colds"]
  },
  {
    question: "The more you take, the more you leave behind. What am I?",
    answers: ["footsteps", "step", "footstep", "steps"]
  }
];

export default function RiddlePage() {
  const [current, setCurrent] = useState(null);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [scoreVisible, setScoreVisible] = useState(false);

  // Start a new riddle
  const startRiddle = () => {
    const random = riddles[Math.floor(Math.random() * riddles.length)];
    setCurrent(random);
    setInput("");
    setMessage("");
    setScoreVisible(true);
  };

  // Check if user's answer matches any correct answer
  const checkAnswer = () => {
    if (!current) return;
    const userAnswer = input.trim().toLowerCase();
    const isCorrect = current.answers.some(ans => userAnswer === ans.toLowerCase());
    const msg = isCorrect ? "✅ Correct!" : `❌ Nope! Answer: ${current.answers[0]}`;
    setMessage(msg);
    setScore({
      correct: score.correct + (isCorrect ? 1 : 0),
      total: score.total + 1,
    });
    setCurrent(null);
  };

  // Reset the score to zero
  const resetScore = () => {
    setScore({ correct: 0, total: 0 });
    setScoreVisible(false);
  };

  return (
    <ToolPage>
      <div className="riddle-container">
        {/* Title & Subtitle */}
        <h1 className="riddle-title">Riddle of the Day</h1>
        <p className="riddle-subtitle">Challenge your brain and track your score!</p>

        {/* Riddle buttons */}
        <div className="riddle-btn-group">
          <button onClick={startRiddle} className="riddle-btn">Start Riddle</button>
          <button onClick={resetScore} className="riddle-btn">Reset Score</button>
        </div>

        {/* Riddle input box */}
        {current && (
          <div className="riddle-box">
            <p className="riddle-question">{current.question}</p>
            <input
              className="riddle-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Your answer..."
            />
            <button onClick={checkAnswer} className="riddle-btn check-btn">
              Check Answer
            </button>
          </div>
        )}

        {/* Show feedback message */}
        {message && <p className="riddle-feedback">{message}</p>}

        {/* Show score */}
        {scoreVisible && (
          <div className="score-box">
            <p className="riddle-score">Score: {score.correct} / {score.total}</p>
          </div>
        )}
      </div>
    </ToolPage>
  );
}
