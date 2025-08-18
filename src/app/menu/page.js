"use client";
import Link from "next/link";
import "./Dashboard.css";

// Main dashboard page with links to all the tools
export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Page heading */}
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-subtitle">
        Choose a brain-boosting tool — from games and quizzes to fun jokes and movies.
      </p>

      {/* Riddle Game Card */}
      <div className="dashboard-card yellow">
        <h2>Riddle Game</h2>
        <p>Enjoy mind-twisting riddles that test your logic and wit!</p>
        <Link href="/riddle" className="dashboard-btn">Play Now</Link>
      </div>

      {/* Quick Math Quiz Card */}
      <div className="dashboard-card orange">
        <h2>Quick Math Quiz</h2>
        <p>Have your brain exercise — test your math speed and accuracy!</p>
        <Link href="/quiz" className="dashboard-btn">Start Quiz</Link>
      </div>

      {/* Memory Challenge Card */}
      <div className="dashboard-card pink">
        <h2>Memory Challenge</h2>
        <p>Boost your short-term memory with this fun emoji pattern game.</p>
        <Link href="/memory" className="dashboard-btn">Begin</Link>
      </div>

      {/* Random Jokes Card */}
      <div className="dashboard-card blue">
        <h2>Random Jokes</h2>
        <p>Laugh out loud with a random selection of fun jokes.</p>
        <Link href="/jokes" className="dashboard-btn">Get a Joke</Link>
      </div>

      {/* Movie Search Card */}
      <div className="dashboard-card ash">
        <h2>Movie Search</h2>
        <p>Search and discover information about your favorite films.</p>
        <Link href="/movies" className="dashboard-btn">Search Movies</Link>
      </div>
    </div>
  );
}
