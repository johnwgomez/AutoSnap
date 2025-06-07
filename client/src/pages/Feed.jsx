// client/src/pages/Feed.jsx
import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { FaRegSquare, FaCheckSquare, FaRegHeart, FaHeart } from 'react-icons/fa';

export default function Feed() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    searchCompare,
    toggleSearchCompare,
    searchFavorites,
    toggleSearchFavorite
  } = useContext(AppContext);

  const API_KEY = process.env.REACT_APP_CARS_API_KEY;

  const handleSubmit = async e => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/cars?model=${encodeURIComponent(searchTerm.trim())}`,
        { headers: { 'X-Api-Key': API_KEY } }
      );
      if (!res.ok) throw new Error(`API ${res.status}`);
      setResults(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const niceTransmission = t => {
    if (!t) return 'Unknown';
    const l = t.toLowerCase();
    return l==='a'?'Automatic':l==='m'?'Manual':t;
  };

  return (
    <div className="min-vh-100 bg-light">
      <main className="container text-center mt-5">
        <h2 className="display-6 mb-4">Browse All Cars</h2>
        <form onSubmit={handleSubmit} className="row justify-content-center mb-5">
          <div className="col-md-6 d-flex">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search by model…"
              value={searchTerm}
              onChange={e=>setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary btn-lg ms-2"
              disabled={loading||!searchTerm.trim()}
            >
              {loading ? 'Searching…' : 'Search'}
            </button>
          </div>
        </form>
        {error && <div className="alert alert-danger">⚠️ {error}</div>}
        {results.length > 0 && (
          <div className="row">
            {results.map((car,i)=> {
              const cmp = searchCompare.some(c=>c.make===car.make&&c.model===car.model&&c.year===car.year);
              const fav = searchFavorites.some(c=>c.make===car.make&&c.model===car.model&&c.year===car.year);
              return (
                <div key={i} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{car.make} {car.model}</h5>
                      <p className="card-text mb-1"><strong>Year:</strong> {car.year}</p>
                      <p className="card-text mb-1"><strong>Fuel:</strong> {car.fuel_type}</p>
                      <p className="card-text mb-1"><strong>Trans:</strong> {niceTransmission(car.transmission)}</p>
                      <p className="card-text"><strong>Engine (L):</strong> {car.engine_size?.toFixed(1)||'—'}</p>
                      <div className="mt-auto d-flex justify-content-between">
                        <span onClick={()=>toggleSearchCompare(car)} style={{cursor:'pointer'}}>
                          {cmp ? <FaCheckSquare color="green"/> : <FaRegSquare/>}
                        </span>
                        <span onClick={()=>toggleSearchFavorite(car)} style={{cursor:'pointer'}}>
                          {fav ? <FaHeart color="red"/> : <FaRegHeart/>}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!loading && results.length===0 && !error && (
          <p className="text-muted">(Type a model above and hit “Search”…)</p>
        )}
      </main>
    </div>
  );
}
