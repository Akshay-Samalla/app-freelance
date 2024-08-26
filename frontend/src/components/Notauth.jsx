import React from 'react';

const Notauth = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-5">Not Authorized</h2>
        <p className="text-gray-700">You are not authorized to view this page. Please log in.</p>
      </div>
    </div>
  );
};

export default Notauth;