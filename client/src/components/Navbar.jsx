// client/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../utils/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const token = getToken();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Brand + Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/AutoSnap.png"
            alt="AutoSnap Logo"
            style={{ height: '30px', width: '30px', marginRight: '8px' }}
          />
          <span>AutoSnap</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Left-side links: My Garage & Add Car (only when logged in) */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/mygarage">
                    My Garage
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/addcar">
                    Add Car
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Right-side: either Login/Signup or Username + Logout */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {token ? (
              <>
                <li className="nav-item d-flex align-items-center me-3">
                  <span className="nav-link">
                    Welcome, <strong>{username}</strong>
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Log In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
