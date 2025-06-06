// client/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar   from './components/Navbar';
import Login    from './pages/Login';
import Signup   from './pages/Signup';
import Feed     from './pages/Feed';
import AddCar   from './pages/AddCar';
import MyGarage from './pages/MyGarage'; 

export default function App() {
  return (
    <>
      {/* Always show the navbar at the top */}
      <Navbar />

      {/* Define your routes below */}
      <Routes>
        {/* "/" now goes to the Feed page */}
        <Route path="/" element={<Feed />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed"   element={<Feed />} />
        <Route path="/addcar" element={<AddCar />} />
        <Route path="/mygarage" element={<MyGarage />} />
      </Routes>
    </>
  );
}
