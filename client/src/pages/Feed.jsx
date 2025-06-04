// client/src/pages/Feed.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Feed() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Nav Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">AutoSnap</h1>
            </div>
            <div className="flex space-x-8">
              <Link
                to="/search"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Search for a Car
              </Link>
              <Link
                to="/mygarage"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                My Garage
              </Link>
              <Link
                to="/addcar"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Add a Car
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center mt-16 px-4">
        {/* Page Heading */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Browse All Cars
        </h2>

        {/* Search Bar */}
        <div className="w-full max-w-lg">
          <input
            type="text"
            placeholder="Search for any car..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Placeholder for future feed cards */}
        <div className="mt-12 w-full max-w-5xl">
          {/* In future: map over query results and show car cards here */}
          <p className="text-center text-gray-500">
            (Car feed will appear here once data is loaded…)
          </p>
        </div>
      </main>
    </div>
  );
}
