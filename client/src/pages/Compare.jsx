// client/src/pages/Compare.jsx
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useQuery, gql } from '@apollo/client';

const GET_MY_CARS = gql`
  query GetMyCars {
    getMyCars {
      _id
      make
      model
      year
      price
      description
      image
    }
  }
`;

export default function Compare() {
  const { compareList, searchCompare, clearSearchCompare } = useContext(AppContext);
  const { data, loading, error } = useQuery(GET_MY_CARS, {
    skip: searchCompare.length > 0
  });

  const carsToShow = searchCompare.length > 0
    ? searchCompare
    : data?.getMyCars || [];

  if (searchCompare.length > 0 && carsToShow.length === 0) {
    return <p className="text-center py-5">No feed cars selected to compare.</p>;
  }
  if (loading) return <p className="text-center py-5">Loading…</p>;
  if (error) return <p className="text-center py-5 text-danger">Error.</p>;
  if (carsToShow.length === 0) {
    return <p className="text-center py-5">No saved cars to compare.</p>;
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Compare Cars</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th></th>
            {carsToShow.map((c, i) => (
              <th key={i}>{c.make} {c.model}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {['year','price','description'].map((field) => (
            <tr key={field}>
              <td className="fw-bold text-capitalize">{field}</td>
              {carsToShow.map((c, i) => (
                <td key={i}>
                  {field === 'price'
                    ? `$${c.price?.toLocaleString()}`
                    : c[field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {searchCompare.length > 0 && (
        <div className="text-center">
          <button className="btn btn-secondary" onClick={clearSearchCompare}>
            Clear Feed Comparison
          </button>
        </div>
      )}
    </div>
  );
}
