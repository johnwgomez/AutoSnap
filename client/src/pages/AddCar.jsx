// client/src/pages/AddCar.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CAR } from '../graphql/mutations';
import { GET_MY_CARS } from './MyGarage';  // for refetch
import { useNavigate } from 'react-router-dom';

export default function AddCar() {
  const [formState, setFormState] = useState({
    make: '',
    model: '',
    year: 2010,
    price: 1000,
    description: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState('');

  const [addCar, { loading, error }] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_MY_CARS }],
    awaitRefetchQueries: true,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'range' ? Number(value) : value
    }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormState(prev => ({ ...prev, image: reader.result }));
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addCar({ variables: { ...formState } });
      navigate('/mygarage');
    } catch (err) {
      console.error('AddCar error:', err);
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
        <div className="mb-3">
          <label className="form-label">Car Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
          />
        </div>
        {imagePreview && (
          <div className="mb-3 text-center">
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: '200px', borderRadius: '8px' }}
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding…' : 'Add Car'}
        </button>
        {error && <p className="text-danger mt-2">{error.message}</p>}
      </form>
    </div>
  );
}
