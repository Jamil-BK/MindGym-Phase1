"use client";
import { useEffect, useState } from "react";
import ToolPage from "../_templates/ToolPage";
import "./jokes.css";

export default function JokesPage() {
  // State variables for joke content, loading state, errors, favorites list, save message, and active tab
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showSaveMsg, setShowSaveMsg] = useState(false);
  const [activeTab, setActiveTab] = useState("joke");

  // Load saved jokes from localStorage when the component mounts
  useEffect(() => {
    const saved = localStorage.getItem("jokeFavorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Fetches a random joke from a public API
  async function getJoke() {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setJoke(data);
      setActiveTab("joke"); // Ensures the joke display is active
    } catch (e) {
      setErr("Could not load a joke. Try again.");
    } finally {
      setLoading(false);
    }
  }

  // Saves the current joke to localStorage and updates favorites state
  function saveJoke() {
    if (!joke) return;
    const exists = favorites.some(
      (j) => j.setup === joke.setup && j.punchline === joke.punchline
    );
    if (!exists) {
      const updated = [...favorites, joke];
      setFavorites(updated);
      localStorage.setItem("jokeFavorites", JSON.stringify(updated));
      setShowSaveMsg(true);
      setTimeout(() => setShowSaveMsg(false), 3000); // Temporary success message
    }
  }

  // Removes a saved joke from the favorites list and updates localStorage
  function removeJoke(index) {
    const updated = [...favorites];
    updated.splice(index, 1);
    setFavorites(updated);
    localStorage.setItem("jokeFavorites", JSON.stringify(updated));
  }

  return (
    <ToolPage title="">
      <div className="jokes-container">
        {/* Page title and subtitle */}
        <h1 className="jokes-title">Jokes</h1>
        <p className="jokes-subtitle">
          Lighten your day with a surprise joke or check your saved collection.
        </p>

        {/* Action buttons: switch view and fetch new joke */}
        <div className="action-bar">
          <button
            className={`action-btn ${activeTab === "favorites" ? "is-active" : ""}`}
            onClick={() => setActiveTab("favorites")}
          >
            Favorite Jokes
          </button>

          <button
            className="action-btn"
            onClick={getJoke}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get a Joke"}
          </button>
        </div>

        {/* Current joke view */}
        {activeTab === "joke" && (
          <div className="joke-action-area">
            {err && <p className="error-text">{err}</p>}

            {joke && (
              <div className="joke-box hover-box">
                <p className="joke-setup">{joke.setup}</p>
                <p className="joke-punchline">— {joke.punchline}</p>

                <button onClick={saveJoke} className="save-btn">
                  Save to Favorites
                </button>
                {showSaveMsg && <p className="save-msg">This joke has been saved!</p>}
              </div>
            )}
          </div>
        )}

        {/* Favorite jokes view */}
        {activeTab === "favorites" && (
          <div className="favorites-section">
            <h2>Saved Jokes</h2>
            {favorites.length === 0 ? (
              <p>No saved jokes yet. Fetch and save some!</p>
            ) : (
              favorites.map((j, index) => (
                <div key={index} className="fav-item hover-box">
                  <p style={{ fontWeight: "bold" }}>{j.setup}</p>
                  <p style={{ opacity: 0.85 }}>— {j.punchline}</p>
                  <button className="remove-btn" onClick={() => removeJoke(index)}>
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </ToolPage>
  );
}
