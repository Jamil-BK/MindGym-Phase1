"use client";
import { useEffect, useState } from "react";
import "./feedbacks.css";

export default function FeedbackViewer() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("feedbackList");
    if (stored) {
      const parsed = JSON.parse(stored);
      const sorted = [...parsed].reverse(); // newest first
      setFeedbacks(sorted);
    }
  }, []);

  function handleClear() {
    if (confirm("Are you sure you want to delete all feedbacks?")) {
      localStorage.removeItem("feedbackList");
      setFeedbacks([]);
    }
  }

  function handleDeleteOne(index) {
    const updated = [...feedbacks];
    updated.splice(index, 1);
    setFeedbacks(updated);
    localStorage.setItem("feedbackList", JSON.stringify([...updated].reverse())); // keep original order in storage
  }

  function handleDownload() {
    const content = feedbacks.map(
      (fb, i) =>
        `#${i + 1}\nName: ${fb.name}\nEmail: ${fb.email}\nMessage: ${fb.message}\n\n`
    ).join("");
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "feedbacks.txt";
    link.click();
  }

  const feedbacksToDisplay = showAll ? feedbacks : feedbacks.slice(0, 5);

  return (
    <div className="feedback-page">
      <h2><span role="img" aria-label="feedback"></span> Submitted Feedback</h2>

      <div className="button-group">
        <button className="feedback-btn" onClick={() => setShowAll(true)}>Show All</button>
        <button className="feedback-btn" onClick={() => setShowAll(false)}>Show Latest 5</button>
        <button className="feedback-btn" onClick={handleClear}>Delete All</button>
        <button className="feedback-btn" onClick={handleDownload}>Download</button>
        <button className="feedback-btn" onClick={() => window.print()}>Print</button>
      </div>

      {feedbacksToDisplay.length === 0 ? (
        <p style={{ fontStyle: "italic", marginTop: "1rem" }}>No feedback submitted yet.</p>
      ) : (
        <div className="feedback-list">
          {feedbacksToDisplay.map((fb, index) => (
            <div key={index} className="feedback-card">
              <p><strong>Name:</strong> {fb.name}</p>
              <p><strong>Email:</strong> {fb.email}</p>
              <p><strong>Message:</strong> {fb.message}</p>
              <button
                className="feedback-btn red small-btn"
                onClick={() => handleDeleteOne(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
