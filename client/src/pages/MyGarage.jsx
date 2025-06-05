// -- John's logic area --
import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// 1. Define GET_MY_CARS and DELETE_CAR
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
  // 2. useQuery and useMutation setup
  const { loading, error, data, refetch } = useQuery(GET_MY_CARS);
  const [deleteCar] = useMutation(DELETE_CAR);

  //3. Handle deletion
  const handleDelete = async (carId) => {
    try {
      await deleteCar({ variables: { carId } });
      refetch(); // 5. Refetch after deletion
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  //4. Loading/Error/Empty states
  if (loading) return <p className="text-center text-lg py-8">Loading cars...</p>;
  if (error) return <p className="text-center text-red-500 py-8">Error loading cars.</p>;
  if (!data.getMyCars.length)
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 13l2-2m0 0l7-7 7 7M5 11v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
        </svg>
        <p className="text-gray-500 text-lg">You have no saved cars.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center py-8 text-gray-800">My Garage</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-12">
        {data.getMyCars.map((car) => (
          <div
            key={car._id}
            className="border rounded-lg p-6 bg-white shadow hover:shadow-lg transition-shadow duration-200 flex flex-col items-start"
          >
            <h2 className="text-2xl font-semibold mb-1 text-gray-800">{car.make} {car.model}</h2>
            <p className="text-gray-500 mb-4">{car.year}</p>
            <button
              onClick={() => handleDelete(car._id)}
              className="mt-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}









// -- Oneal UI styling below --