// client/src/pages/AddCar.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CAR } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';

export default function AddCar() {
  const [formState, setFormState] = useState({
    make: '',
    model: '',
    year: 2010,
    price: 1000,
    description: '',
  });

  const [addCar, { loading, error }] = useMutation(ADD_CAR, {
    // After adding, automatically refetch GET_MY_CARS so MyGarage is fresh
    refetchQueries: ['GetMyCars'],
  });

  const navigate = useNavigate();

  // Handle text/range changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'range' ? Number(value) : value,
    });
  };

  // On submit, call the ADD_CAR mutation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCar({
        variables: {
          make: formState.make,
          model: formState.model,
          year: formState.year,
          price: formState.price,
          description: formState.description,
        },
      });
      // Navigate to MyGarage so user sees their new car
      navigate('/mygarage');
    } catch (err) {
      console.error('AddCar mutation error:', err);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <h2 className="mb-4">Add a Car</h2>

        <div className="mb-3">
          <input
            name="make"
            className="form-control"
            placeholder="Make"
            value={formState.make}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            name="model"
            className="form-control"
            placeholder="Model"
            value={formState.model}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Year: <strong>{formState.year}</strong>
          </label>
          <input
            name="year"
            type="range"
            min={2010}
            max={2025}
            step={1}
            value={formState.year}
            onChange={handleChange}
            className="form-range"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Price: <strong>${formState.price.toLocaleString()}</strong>
          </label>
          <input
            name="price"
            type="range"
            min={1000}
            max={500000}
            step={1000}
            value={formState.price}
            onChange={handleChange}
            className="form-range"
          />
        </div>

        <div className="mb-3">
          <textarea
            name="description"
            className="form-control"
            placeholder="Description"
            value={formState.description}
            onChange={handleChange}
            required
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Adding…' : 'Add Car'}
        </button>

        {error && (
          <p className="text-danger mt-2">
            Error adding car: {error.message}
          </p>
        )}
      </form>
    </div>
  );
}
