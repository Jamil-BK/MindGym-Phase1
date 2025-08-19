"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "./quiz.css";

// Lazy load ToolPage component
const ToolPage = dynamic(() => import("../_templates/ToolPage"));

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    generateQuiz();
  }, []);

  function generateQuiz() {
    const newQuestions = Array.from({ length: 5 }, () => {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const operators = ["+", "-", "*"];
      const op = operators[Math.floor(Math.random() * operators.length)];
      let correct;

      if (op === "+") correct = num1 + num2;
      else if (op === "-") correct = num1 - num2;
      else correct = num1 * num2;

      const options = shuffle([
        correct,
        correct + 1,
        correct - 1,
        correct + 2
      ]);

      return {
        question: `${num1} ${op} ${num2}`,
        correct,
        options
      };
    });

    setQuestions(newQuestions);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFeedback("");
    setShowResult(false);
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function handleOptionClick(option) {
    setSelected(option);
    const isCorrect = option === questions[current].correct;
    if (isCorrect) {
      setScore(score + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(`Incorrect! Correct answer: ${questions[current].correct}`);
    }
  }

  function nextQuestion() {
    setSelected(null);
    setFeedback("");
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  }

  function restartQuiz() {
    generateQuiz();
  }

  return (
    <ToolPage>
      {/* Quiz title and instructions */}
      <div>
        <h1 className="tool-title">Quick Math Quiz</h1>
        <p className="tool-subtitle">Solve 5 math questions and test your skills!</p>
      </div>

      <div className="quiz-container">
        {questions.length > 0 && !showResult && (
          <>
            <div className="question-line">
              <div className="question-number">Question {current + 1}</div>
              <div className="question-text">{questions[current].question}</div>
            </div>

            <div className="answer-grid">
              {questions[current].options.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  className={`answer-box ${
                    selected !== null
                      ? opt === questions[current].correct
                        ? "correct"
                        : selected === opt
                        ? "incorrect"
                        : ""
                      : ""
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>

            {feedback && <div className="feedback">{feedback}</div>}

            {selected !== null && (
              <button className="next-button" onClick={nextQuestion}>
                {current + 1 < questions.length ? "Next Question" : "Show Result"}
              </button>
            )}
          </>
        )}

        {showResult && (
          <div className="result-section">
            <p className="result-title">Quiz Complete</p>
            <p className="result-score">
              Your Score: <strong>{score}</strong> / {questions.length}
            </p>
            <button className="next-button" onClick={restartQuiz}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </ToolPage>
  );
}
