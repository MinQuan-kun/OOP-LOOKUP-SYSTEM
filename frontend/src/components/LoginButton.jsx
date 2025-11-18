// src/components/TopBar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();

  return (
    // Giữ nguyên các class bố cục
    <div className="fixed top-0 left-0 w-full flex justify-end items-center px-8 py-2">
      <button
        onClick={() => navigate('/login')}
        className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white text-base font-bold py-2 px-6 rounded-full shadow-md transform transition hover:scale-105"
      >
        Login
      </button>
    </div>
  );
};

export default TopBar;