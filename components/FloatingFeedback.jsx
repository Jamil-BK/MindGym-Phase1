// components/FloatingFeedback.jsx
"use client";
import { useState } from "react";
import "./FloatingFeedback.css"; // You’ll create this CSS file

export default function FloatingFeedback() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    if (!name || !email || !message) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    const feedback = { name, email, message, time: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("feedbackList")) || [];
    localStorage.setItem("feedbackList", JSON.stringify([...existing, feedback]));
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
    setError("");
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
    }, 3000);
  };

  return (
    <div className="feedback-widget">
      {!isOpen && (
        <button className="feedback-tab" onClick={() => setIsOpen(true)}>
          Give Feedback
        </button>
      )}

      {isOpen && (
        <div className="feedback-box">
          <div className="feedback-header">
            <strong>Feedback</strong>
            <button onClick={() => setIsOpen(false)} className="close-btn">✕</button>
          </div>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {error && <p className="error-text">{error}</p>}
          {submitted && <p className="success-text">Feedback submitted!</p>}
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}
