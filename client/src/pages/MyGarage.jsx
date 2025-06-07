// client/src/pages/MyGarage.jsx
import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

export const GET_MY_CARS = gql`
  query GetMyCars {
    getMyCars {
      _id
      make
      model
      year
      price
      description
      image
    }
  }
`;

const DELETE_CAR = gql`
  mutation DeleteCar($carId: ID!) {
    deleteCar(carId: $carId)
  }
`;

export default function MyGarage() {
  const { loading, error, data, refetch } = useQuery(GET_MY_CARS);
  const [deleteCar] = useMutation(DELETE_CAR);

  const handleDelete = async id => {
    try {
      await deleteCar({ variables: { carId: id } });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="container text-center py-5">
      <div className="spinner-border text-primary" role="status" />
    </div>
  );
  if (error) return (
    <div className="container text-center py-5">
      <div className="alert alert-danger">Error loading cars.</div>
    </div>
  );
  if (!data || data.getMyCars.length === 0) return (
    <div className="container text-center py-5">
      <div className="alert alert-secondary">You have no saved cars.</div>
    </div>
  );

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">My Garage</h1>
      <div className="row g-4">
        {data.getMyCars.map(car => (
          <div key={car._id} className="col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm border-0">
              {car.image ? (
                <img
                  src={car.image}
                  className="card-img-top"
                  alt={`${car.make} ${car.model}`}
                  style={{ objectFit: 'cover', height: '180px' }}
                />
              ) : (
                <div
                  className="card-img-top d-flex align-items-center justify-content-center bg-light"
                  style={{ height: '180px' }}
                >
                  <span className="text-muted">No Image</span>
                </div>
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-2">
                  {car.make} {car.model}
                </h5>
                <p className="card-text text-muted mb-1">
                  Year: {car.year}
                </p>
                <p className="card-text text-muted mb-1">
                  Price: ${car.price.toLocaleString()}
                </p>
                <p className="card-text text-secondary flex-grow-1">
                  {car.description}
                </p>
                <button
                  className="btn btn-danger mt-3"
                  onClick={() => handleDelete(car._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
