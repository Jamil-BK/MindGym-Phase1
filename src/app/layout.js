// src/app/layout.js

import "./globals.css";
import HeaderBlock from "../../components/HeaderBlock";
import Footer from "../../components/Footer";

// Page metadata for browser and search engines
export const metadata = {
  title: "MindGym",
  description: "Brain tools dashboard",
};

// Root layout component wrapping all pages
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column"
        }}>
          {/* Shared header shown on all pages */}
          <HeaderBlock />

          {/* Main content section */}
          <main style={{ flex: 1, width: "100%", maxWidth: "96%", margin: "0 auto", padding: "2rem 1rem" }}>
            {children}
          </main>

          {/* Shared footer shown on all pages */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
