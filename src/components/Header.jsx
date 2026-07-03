import { Link } from "react-router-dom";
import { useState } from "react";

const Header = ({ open, setOpen }) => {
  const toggleMenu = () => {
    const next = !open;
    setOpen(next);

    document.body.classList.toggle("menu-open", next);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/dashboard" className="navbar-brand">
          WorkBridge
        </Link>

        <button
          className={`menu-toggle ${open ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
