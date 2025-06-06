// client/src/pages/MyGarage.jsx
import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// NOTE: The operation name here must match the string in refetchQueries
const GET_MY_CARS = gql`
  query GetMyCars {
    getMyCars {
      _id
      make
      model
      year
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

  const handleDelete = async (carId) => {
    try {
      await deleteCar({ variables: { carId } });
      refetch();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  if (loading) return <p>Loading cars...</p>;
  if (error) return <p>Error loading cars.</p>;
  if (!data.getMyCars.length) return <p>You have no saved cars.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.getMyCars.map((car) => (
        <div key={car._id} className="border rounded p-4 shadow">
          <h2 className="text-xl font-semibold">
            {car.make} {car.model}
          </h2>
          <p className="text-gray-600">{car.year}</p>
          <button
            onClick={() => handleDelete(car._id)}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}








// -- Oneal UI styling below --