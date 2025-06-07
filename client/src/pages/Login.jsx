import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { LOGIN_USER } from '../graphql/mutations';
import {setToken } from '../utils/auth';

export default function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { loading, error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const { data } = await login({ variables: { ...formState } });
     setToken(data.login.token);
     // Also save the username so Navbar can read it:
     localStorage.setItem('username', data.login.user.username);
     navigate('/feed');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Log In</h2>
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
          {loading ? 'Logging in…' : 'Log In'}
        </button>
        {error && <p className="error">Error: {error.message}</p>}
      </form>
      <p className="toggle-link">
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
