// client/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

export default function Home() {
  const loggedIn = isLoggedIn();

  return (
    <div className="container text-center py-5">
      <h1 className="display-4">Welcome to AutoSnap</h1>
      <p className="lead">Browse and manage your favorite cars all in one place.</p>
      <div className="mt-4">
        <Link to="/feed" className="btn btn-primary btn-lg me-2">
          Browse Cars
        </Link>
        {/* only show Log In if not already authenticated */}
        {!loggedIn && (
          <Link to="/login" className="btn btn-outline-secondary btn-lg">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
}
