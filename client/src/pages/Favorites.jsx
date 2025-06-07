// client/src/pages/Favorites.jsx
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

export default function Favorites() {
  const { searchFavorites, toggleSearchFavorite } = useContext(AppContext);

  if (searchFavorites.length === 0) {
    return <p className="text-center py-5">No favorites yet.</p>;
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Favorites</h1>
      <div className="row g-4">
        {searchFavorites.map((car,i)=>(
          <div key={i} className="col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div
                className="card-img-top d-flex align-items-center justify-content-center bg-light"
                style={{height:'180px'}}
              >
                <span className="text-muted">No Image</span>
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{car.make} {car.model}</h5>
                <p className="card-text text-muted mb-1">Year: {car.year}</p>
                <p className="mt-auto text-end" onClick={()=>toggleSearchFavorite(car)} style={{cursor:'pointer'}}>
                  <FaHeart color="red"/>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
