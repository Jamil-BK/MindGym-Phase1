"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import "./movies.css";

// Lazy load ToolPage
const ToolPage = dynamic(() => import("../_templates/ToolPage"));

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "b59326ce"; // OMDb API key

  async function searchMovie() {
    if (!query.trim()) {
      setError("Please enter a movie title.");
      setMovie(null);
      setTimeout(() => setError(""), 4000); // Hide error after 4 seconds
      return;
    }

    setLoading(true);
    setError("");
    setMovie(null);

    try {
      const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${apiKey}`);
      const data = await res.json();

      if (data.Response === "False") {
        setError("Movie not found. Try a different title.");
        setTimeout(() => setError(""), 4000); // Hide error after 4 seconds
      } else {
        setMovie(data);
      }
    } catch (err) {
      setError("Error fetching movie. Please try again.");
      setTimeout(() => setError(""), 4000); // Hide error after 4 seconds
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolPage>
      {/* Page title and subtitle */}
      <div>
        <h1 className="tool-title">Movie Search</h1>
        <p className="tool-subtitle">Search any movie by title and view its details!</p>
      </div>

      <div className="movies-wrapper">
        {/* Movie search input and button */}
        <div className="movie-search-box">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter movie title..."
            className="movie-input"
          />
          <button onClick={searchMovie} className="movie-button">
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Error message display */}
        {error && <p className="error-msg">{error}</p>}

        {/* Display movie result if found */}
        {movie && (
          <div className="movie-card">
            {movie.Poster !== "N/A" && (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="movie-poster"
              />
            )}

            <div className="movie-info">
              <h2 className="movie-title">{movie.Title} ({movie.Year})</h2>
              <p className="movie-plot">{movie.Plot}</p>
              <p><strong>Genre:</strong> {movie.Genre}</p>
              <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
              <p><strong>Actors:</strong> {movie.Actors}</p>
              <p><strong>Released:</strong> {movie.Released}</p>
            </div>
          </div>
        )}
      </div>
    </ToolPage>
  );
}
