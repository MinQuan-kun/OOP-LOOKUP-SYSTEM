import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-0 left-0 w-full flex justify-end items-center px-8 py-4 z-50 pointer-events-none">
      
      <button
        onClick={() => navigate('/login')}
        className="pointer-events-auto bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white text-base font-bold py-2 px-6 rounded-full shadow-lg transform transition hover:scale-105 border border-white/20 backdrop-blur-sm"
      >
        Login
      </button>
    </div>
  );
};

export default LoginButton;