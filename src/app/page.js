"use client";
import { useRouter } from "next/navigation";
import "./HomePage.css";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="homepage-container">

      {/* Hero section with a short intro and start button */}
      <div className="home-hero-card">
        <p className="homepage-description">
          Explore a collection of fun, brain-boosting tools built for all ages.
          <br />
          From logic games to jokes and movies — train your brain your way.
        </p>
        

        {/* Button navigates to dashboard page */}
        <button className="start-button" onClick={() => router.push("/menu")}>
          Start
        </button>
      </div>
    </div>
  );
}
