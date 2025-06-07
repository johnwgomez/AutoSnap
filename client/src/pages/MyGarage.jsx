// client/src/pages/MyGarage.jsx
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MY_CARS } from '../graphql/queries';
import { gql } from '@apollo/client';
import CarCard from '../components/CarCard';

const DELETE_CAR = gql`
  mutation DeleteCar($carId: ID!) {
    deleteCar(carId: $carId)
  }
`;

export default function MyGarage() {
  const { loading, error, data, refetch } = useQuery(GET_MY_CARS);
  const [deleteCar] = useMutation(DELETE_CAR);

  const handleDelete = async (carId) => {
    try {
      await deleteCar({ variables: { carId } });
      refetch();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };


  if (loading) return <p className="text-center py-5">Loading cars…</p>;
  if (error) return <p className="text-center text-danger py-5">Error loading cars.</p>;
  if (!data.getMyCars.length)
    return <p className="text-center py-5">You have no saved cars.</p>;

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">My Garage</h1>
      <div className="row g-4">
        {data.getMyCars.map((car) => (
          <div key={car._id} className="col-sm-6 col-md-4 col-lg-3">
            <CarCard car={car} contextType="garage" />
            <div className="d-grid mt-2">
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(car._id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
