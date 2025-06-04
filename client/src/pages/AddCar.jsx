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
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [addCar, { loading, error }] = useMutation(ADD_CAR, {
    refetchQueries: ['getAllCars', 'getMyCars']
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'range' ? Number(value) : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormState({ ...formState, images: files });
    setPreviewImages(files.map(file => URL.createObjectURL(file)));
  };

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
          // images: handle image upload and get URLs before sending
        }
      });
      navigate('/garage');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Add a Car</h2>
        <input
          name="make"
          placeholder="Make"
          value={formState.make}
          onChange={handleChange}
          required
        />
        <input
          name="model"
          placeholder="Model"
          value={formState.model}
          onChange={handleChange}
          required
        />
        <label style={{ marginBottom: '1rem' }}>
          Year: <strong>{formState.year}</strong>
          <input
            name="year"
            type="range"
            min={2010}
            max={2025}
            step={1}
            value={formState.year}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
        </label>
        <label style={{ marginBottom: '1rem' }}>
          Price: <strong>${formState.price.toLocaleString()}</strong>
          <input
            name="price"
            type="range"
            min={1000}
            max={500000}
            step={1000}
            value={formState.price}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
        </label>
        <textarea
          name="description"
          placeholder="Description"
          value={formState.description}
          onChange={handleChange}
          required
        />
        <label>
          Car Images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: '0.5rem' }}
          />
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {previewImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`preview ${idx}`}
              style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
            />
          ))}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding…' : 'Add Car'}
        </button>
        {error && <p className="error">{error.message}</p>}
      </form>
    </div>
  );
}