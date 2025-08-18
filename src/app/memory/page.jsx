"use client";
import { useState } from "react";
import ToolPage from "../_templates/ToolPage";
import "./memory.css";

// Emoji pool used to randomly generate the memory sequence
const emojiSet = ["🍎", "🍌", "🍇", "🍉", "🍍", "🍓"];

export default function MemoryGame() {
  // State variables for game logic, user interaction, and score tracking
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [showSequence, setShowSequence] = useState(false);
  const [message, setMessage] = useState("");
  const [correct, setCorrect] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  // Generates a new sequence of 3 random emojis
  function generateSequence() {
    const newSeq = Array.from({ length: 3 }, () => {
      return emojiSet[Math.floor(Math.random() * emojiSet.length)];
    });

    setSequence(newSeq);
    setUserInput([]);
    setMessage("");
    setQuestionAnswered(false);
    setShowSequence(true);

    // Hides the sequence after 3 seconds
    setTimeout(() => {
      setShowSequence(false);
    }, 3000);
  }

  // Initializes the game and score
  function startGame() {
    setGameStarted(true);
    setCorrect(0);
    setAttempted(0);
    generateSequence();
  }

  // Resets all game values and restarts
  function resetGame() {
    setGameStarted(false);
    setSequence([]);
    setUserInput([]);
    setMessage("");
    setCorrect(0);
    setAttempted(0);
    setShowSequence(false);
    setQuestionAnswered(false);
  }

  // Handles user input and checks against correct emoji sequence
  function handleEmojiClick(emoji) {
    if (showSequence || message) return;

    const updated = [...userInput, emoji];
    setUserInput(updated);

    const correctAnswer = sequence[updated.length - 1];

    // Checks if selected emoji is incorrect
    if (emoji !== correctAnswer) {
      setMessage("❌ Wrong! Try again.");
      setQuestionAnswered(true);
      setAttempted((prev) => prev + 1);
      return;
    }

    // If all inputs are correct, update score and show success message
    if (updated.length === sequence.length) {
      setCorrect((prev) => prev + 1);
      setAttempted((prev) => prev + 1);
      setMessage("✅ Correct!");
      setQuestionAnswered(true);
    }
  }

  return (
    <ToolPage>
      {/* Game title and instructions */}
      <div>
        <h1 className="tool-title">Memory Game</h1>
        <p className="tool-subtitle">Watch the emoji pattern. Repeat it from memory!</p>
      </div>

      {/* Start button before game begins */}
      {!gameStarted && (
        <div className="start-container">
          <button className="start-memory-btn" onClick={startGame}>
            Start Memory Game
          </button>
        </div>
      )}

      {/* Game interface once started */}
      {gameStarted && (
        <div className="memory-container">
          {/* Displays either the emoji sequence or user input */}
          <div className="emoji-sequence">
            {showSequence
              ? sequence.map((e, i) => (
                  <div className="emoji-box" key={i}>
                    {e}
                  </div>
                ))
              : sequence.map((_, i) => (
                  <div className="emoji-box" key={i}>
                    {userInput[i] || ""}
                  </div>
                ))}
          </div>

          {/* Emoji selection buttons */}
          {!showSequence && !message && (
            <div className="emoji-buttons">
              {emojiSet.map((e, i) => (
                <button key={i} onClick={() => handleEmojiClick(e)} className="emoji-btn">
                  {e}
                </button>
              ))}
            </div>
          )}

          {/* Displays result message and next/reset buttons after answer */}
          {message && (
            <div className="result-box">
              <p className="result-msg">{message}</p>
              <div className="btn-group">
                <button onClick={generateSequence} className="action-btn">
                  Play Next
                </button>
                <button onClick={resetGame} className="reset-btn">
                  Reset Game
                </button>
              </div>
            </div>
          )}

          {/* Displays score only after an answer is completed */}
          {questionAnswered && (
            <div className="score-display">
              Score: {correct} / {attempted}
            </div>
          )}
        </div>
      )}
    </ToolPage>
  );
}
