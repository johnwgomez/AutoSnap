// client/src/components/Navbar.jsx

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { getToken, removeToken } from '../utils/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const token = getToken();
  const { darkMode, setDarkMode, searchCompare, searchFavorites } = useContext(AppContext);

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm">
      <div className="container">
        {/* Brand now links to “/” which shows your Feed page */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/AutoSnap.png"
            alt="Logo"
            style={{ height: 30, marginRight: 8 }}
          />
          <span className="navbar-brand-text">AutoSnap</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"

          data-bs-target="#navContent"
          aria-controls="navContent"

          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>


        <div className="collapse navbar-collapse" id="navContent">
          {/* Left‐side nav */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* only show these if logged in */}
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

            {/* always available */}
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                Favorites {searchFavorites.length > 0 && `(${searchFavorites.length})`}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/compare">
                Compare {searchCompare.length > 0 && `(${searchCompare.length})`}

              </Link>
            </li>
          </ul>


          {/* Right‐side controls */}
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-3">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setDarkMode((d) => !d)}
              >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>

            {token ? (
              <li className="nav-item">
                <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
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
