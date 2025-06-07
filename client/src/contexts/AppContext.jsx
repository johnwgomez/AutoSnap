// client/src/contexts/AppContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  // Dark mode
  const [darkMode, setDarkMode] = useState(false);
  // Feed comparison list
  const [searchCompare, setSearchCompare] = useState([]);
  // Feed favorites list (store full car objects)
  const [searchFavorites, setSearchFavorites] = useState([]);

  // On mount: restore from localStorage
  useEffect(() => {
    setDarkMode(JSON.parse(localStorage.getItem('darkMode')) || false);
    setSearchCompare(JSON.parse(localStorage.getItem('searchCompare')) || []);
    setSearchFavorites(JSON.parse(localStorage.getItem('searchFavorites')) || []);
  }, []);

  // Persist darkMode + toggle body class
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
  }, [darkMode]);

  // Persist searchCompare & searchFavorites
  useEffect(() => {
    localStorage.setItem('searchCompare', JSON.stringify(searchCompare));
  }, [searchCompare]);
  useEffect(() => {
    localStorage.setItem('searchFavorites', JSON.stringify(searchFavorites));
  }, [searchFavorites]);

  // Toggle compare for feed (up to 3)
  const toggleSearchCompare = (car) => {
    setSearchCompare(list => {
      const exists = list.some(c => c.make===car.make && c.model===car.model && c.year===car.year);
      if (exists) return list.filter(c => !(c.make===car.make&&c.model===car.model&&c.year===car.year));
      if (list.length < 3) return [...list, car];
      return list;
    });
  };
  const clearSearchCompare = () => setSearchCompare([]);

  // Toggle favorite for feed (no limit)
  const toggleSearchFavorite = (car) => {
    setSearchFavorites(list => {
      const exists = list.some(c => c.make===car.make && c.model===car.model && c.year===car.year);
      if (exists) return list.filter(c => !(c.make===car.make&&c.model===car.model&&c.year===car.year));
      return [...list, car];
    });
  };

  return (
    <AppContext.Provider value={{
      darkMode, setDarkMode,
      searchCompare, toggleSearchCompare, clearSearchCompare,
      searchFavorites, toggleSearchFavorite
    }}>
      {children}
    </AppContext.Provider>
  );
}
