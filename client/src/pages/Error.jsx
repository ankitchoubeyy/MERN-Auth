import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-emerald-600 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-emerald-600 hover:underline text-lg">
        Go back to Homepage
      </Link>
    </div>
  );
};

export default Error;
