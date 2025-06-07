// client/src/App.jsx
import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './utils/ApolloClient';

import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import Favorites from './pages/Favorites';
import Compare from './pages/Compare';
import MyGarage from './pages/MyGarage';
import AddCar from './pages/AddCar';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (

    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Brand– “/” now goes straight to Feed */}
          <Route path="/" element={<Feed />} />

          {/* User pages */}
          <Route path="/feed" element={<Feed />} />
          <Route path="/mygarage" element={<MyGarage />} />
          <Route path="/addcar" element={<AddCar />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/compare" element={<Compare />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Catch‐all → Feed */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>

  );
}

export default App;
