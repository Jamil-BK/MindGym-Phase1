"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./HeaderBlock.css";

export default function HeaderBlock() {
  const pathname = usePathname();

  // List of navigation links
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/menu" },
    { name: "Jokes", path: "/jokes" },
    { name: "Riddle", path: "/riddle" },
    { name: "Quiz", path: "/quiz" },
    { name: "Memory", path: "/memory" },
    { name: "Movies", path: "/movies" },
  ];

  return (
    <header className="header-block">
      {/* Navigation Bar with dynamic link generation */}
      <nav className="navbar">
        {navItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <div className={`nav-button nav-${item.name.toLowerCase()}`}>
              {item.name}
            </div>
          </Link>
        ))}
      </nav>

      {/* Background video in header */}
      <div className="header-video-container">
        <video
          src="/vid.mp4"
          autoPlay
          loop
          muted
          className="header-video"
        />
      </div>

      {/* Homepage welcome title */}
      {pathname === "/" && (
        <div className="header-title">
          <h1>Welcome to MindGym</h1>
          <p>Train Your Brain – With Click and Trick</p>
        </div>
      )}
    </header>
  );
}
