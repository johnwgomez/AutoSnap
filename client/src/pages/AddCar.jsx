// client/src/pages/AddCar.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CAR } from '../graphql/mutations';
import { GET_MY_CARS } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';

export default function AddCar() {
  const [formState, setFormState] = useState({
    make: '',
    model: '',
    year: 2010,
    price: 1000,
    description: '',
    image: null, // will hold Base64
  });
  const [preview, setPreview] = useState(null);

  const [addCar, { loading, error }] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_MY_CARS }],
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormState((s) => ({
      ...s,
      [name]: type === 'range' ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormState((s) => ({ ...s, image: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
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
          image: formState.image,
        },
      });
      navigate('/mygarage');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <h2 className="mb-4">Add a Car</h2>

        {/* Make/Model */}
        <input
          name="make"
          className="form-control mb-3"
          placeholder="Make"
          value={formState.make}
          onChange={handleChange}
          required
        />
        <input
          name="model"
          className="form-control mb-3"
          placeholder="Model"
          value={formState.model}
          onChange={handleChange}
          required
        />

        {/* Year & Price */}
        <label>Year: {formState.year}</label>
        <input
          name="year"
          type="range"
          min={2010}
          max={2025}
          value={formState.year}
          onChange={handleChange}
          className="form-range mb-3"
        />
        <label>Price: ${formState.price.toLocaleString()}</label>
        <input
          name="price"
          type="range"
          min={1000}
          max={500000}
          step={1000}
          value={formState.price}
          onChange={handleChange}
          className="form-range mb-3"
        />

        {/* Description */}
        <textarea
          name="description"
          className="form-control mb-3"
          placeholder="Description"
          value={formState.description}
          onChange={handleChange}
          rows={3}
        />

        {/* Image Upload */}
        <label className="form-label">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="form-control mb-3"
        />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="mb-3"
            style={{ width: 120, height: 80, objectFit: 'cover' }}
          />
        )}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding…' : 'Add Car'}
        </button>
        {error && <p className="text-danger mt-2">{error.message}</p>}
      </form>
    </div>
  );
}
