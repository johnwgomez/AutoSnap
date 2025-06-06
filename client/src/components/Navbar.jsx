// client/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        {/* Logo on the left */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/AutoSnap.png"
            alt="AutoSnap"
            height="40"
            className="me-2"
          />
          <span className="fw-bold text-primary">AutoSnap</span>
        </Link>

        {/* Collapse toggle for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left‐side links: Add Car / My Garage */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/addcar">
                Add Car
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/mygarage">
                My Garage
              </Link>
            </li>
          </ul>

          {/* Right‐side links: Sign Up / Login */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/signup">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
