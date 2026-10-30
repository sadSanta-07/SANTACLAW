
"use client";

import { useState } from "react";

const links = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Creative", href: "#creative" },
];

export default function Navbar() {
  const [dark, setDark] = useState(false);

  function toggleTheme() {
    const nextTheme = dark ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    setDark(!dark);
  }

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#" aria-label="SantaClaw home">
          <span className="brand-mark" aria-hidden="true">
            S
          </span>
          <span className="brand-name">SantaClaw</span>
        </a>

        <div className="nav-links">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="nav-item">
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a
            href="https://github.com/sadSanta-07/SANTACLAW"
            target="_blank"
            rel="noreferrer"
            className="nav-item resume-link"
          >
            GitHub ↗
          </a>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
          >
            {dark ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
