import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Brand from "./Brand.jsx";

const navigationLinks = [
  ["Home", "/"],
  ["All Tools", "/tools"],
  ["Image Tools", "/image-tools"],
  ["PDF Tools", "/pdf-tools"],
  ["Document Tools", "/document-tools"],
  ["Other Tools", "/other-tools"],
];

/** Site header: primary navigation, theme toggle, and account links. */
export default function Header({ dark, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Brand />

        <button
          className="mobile-menu icon-btn"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav
          className={menuOpen ? "nav open" : "nav"}
          aria-label="Main navigation"
        >
          {navigationLinks.map(([label, path]) => (
            <NavLink key={path} to={path} onClick={closeMenu}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn theme-btn"
            type="button"
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={dark}
            onClick={onThemeToggle}
          >
            {dark ? <Sun /> : <Moon />}
          </button>
          <Link className="button button-light login" to="/login">
            Login
          </Link>
          <Link className="button button-primary signup" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
