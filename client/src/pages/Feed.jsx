// client/src/pages/Feed.jsx
import React, { useState } from 'react';

export default function Feed() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_CARS_API_KEY;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const encoded = encodeURIComponent(searchTerm.trim());
      const url = `https://api.api-ninjas.com/v1/cars?model=${encoded}`;

      const response = await fetch(url, {
        headers: { 'X-Api-Key': API_KEY },
      });
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // helper to map “a” -> “Automatic,” “m” -> “Manual”
  const niceTransmission = (t) => {
    if (!t) return 'Unknown';
    const lower = t.toLowerCase();
    if (lower === 'a') return 'Automatic';
    if (lower === 'm') return 'Manual';
    return t; 
  };

  return (
    <div className="min-vh-100 bg-light">
      <main className="container text-center mt-5">
        <h2 className="display-6 mb-4">Browse All Cars</h2>

        <form
          onSubmit={handleSubmit}
          className="row justify-content-center mb-5"
        >
          <div className="col-md-6 d-flex">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search by model… e.g. camry"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="btn btn-primary btn-lg ms-2"
              disabled={loading || !searchTerm.trim()}
            >
              {loading ? 'Searching…' : 'Search'}
            </button>
          </div>
        </form>

        {error && (
          <div className="alert alert-danger">
            ⚠️ Error: {error}
          </div>
        )}

        {results.length > 0 && (
          <div className="row">
            {results.map((car, idx) => (
              <div key={idx} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-start">
                    <h5 className="card-title">
                      {car.make} {car.model}
                    </h5>
                    <p className="card-text mb-1">
                      <strong>Year:</strong> {car.year}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Fuel:</strong> {car.fuel_type}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Transmission:</strong> {niceTransmission(car.transmission)}
                    </p>
                    <p className="card-text">
                      <strong>Engine (L):</strong>{' '}
                      {car.engine_size ? car.engine_size.toFixed(1) : '—'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && results.length === 0 && !error && (
          <p className="text-muted">
            (Type a model above and hit “Search” to see results…)
          </p>
        )}
      </main>
    </div>
  );
}
