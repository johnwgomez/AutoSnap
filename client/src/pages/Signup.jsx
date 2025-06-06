import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { SIGNUP_USER } from '../graphql/mutations';
import { setToken } from '../utils/auth';

export default function Signup() {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [addUser, { loading, error }] = useMutation(SIGNUP_USER);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const { data } = await addUser({ variables: { ...formState } });
     setToken(data.addUser.token);
     // Save the username so Navbar can display it:
     localStorage.setItem('username', data.addUser.user.username);
      navigate('/feed');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign Up</h2>
        <input
          name="username"
          placeholder="Username"
          value={formState.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formState.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="••••••"
          value={formState.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up…' : 'Sign Up'}
        </button>
        {error && <p className="error">Error: {error.message}</p>}
      </form>
      <p className="toggle-link">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
