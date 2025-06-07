// client/src/components/CarCard.jsx
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import {
  FaRegHeart,
  FaHeart,
  FaRegSquare,
  FaCheckSquare,
} from 'react-icons/fa';

export default function CarCard({ car, contextType }) {
  const {
    searchFavorites = [],
    toggleSearchFavorite,
    searchCompare = [],
    toggleSearchCompare,
    compareList = [],
    toggleCompare,
  } = useContext(AppContext);

  const isFeed = contextType === 'feed';
  const isGarage = contextType === 'garage';

  // “Favorite” only applies in Feed mode
  const isFav = isFeed
    ? searchFavorites.some(
        (c) =>
          c.make === car.make &&
          c.model === car.model &&
          c.year === car.year
      )
    : false;

  // “Compare” in both contexts
  const isCmp = isFeed
    ? searchCompare.some(
        (c) =>
          c.make === car.make &&
          c.model === car.model &&
          c.year === car.year
      )
    : compareList.includes(car._id);

  return (
    <div className="card h-100 shadow-sm">
      {car.image ? (
        <img
          src={car.image}
          className="card-img-top"
          alt={`${car.make} ${car.model}`}
          style={{ objectFit: 'cover', height: 180 }}
        />
      ) : (
        <div
          className="card-img-top d-flex align-items-center justify-content-center bg-light"
          style={{ height: 180 }}
        >
          <span className="text-muted">No Image</span>
        </div>
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-2">
          {car.make} {car.model}
        </h5>
        <p className="card-text text-muted mb-1">Year: {car.year}</p>
        {car.price != null && (
          <p className="card-text text-muted mb-1">
            Price: ${car.price.toLocaleString()}
          </p>
        )}
        {car.description && (
          <p className="card-text text-secondary flex-grow-1">
            {car.description}
          </p>
        )}
        <div className="mt-auto d-flex justify-content-end gap-3">
          {isFeed && (
            <>
              <span
                onClick={() => toggleSearchCompare(car)}
                style={{ cursor: 'pointer', fontSize: '1.25rem' }}
                title="Toggle Compare"
              >
                {isCmp ? <FaCheckSquare color="green" /> : <FaRegSquare />}
              </span>
              <span
                onClick={() => toggleSearchFavorite(car)}
                style={{ cursor: 'pointer', fontSize: '1.25rem' }}
                title="Toggle Favorite"
              >
                {isFav ? <FaHeart color="red" /> : <FaRegHeart />}
              </span>
            </>
          )}
          {isGarage && (
            <span
              onClick={() => toggleCompare(car._id)}
              style={{ cursor: 'pointer', fontSize: '1.25rem' }}
              title="Toggle Compare"
            >
              {isCmp ? <FaCheckSquare color="green" /> : <FaRegSquare />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
