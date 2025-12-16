'use client';
import React from 'react';

const LanguageBar = ({ activeLang, setActiveLang }) => {
  const languages = [
    { id: 'cpp', label: 'C++' },
    { id: 'java', label: 'Java' },
    { id: 'csharp', label: 'C#' }, // ID phải khớp với Database seed.js
    { id: 'dart', label: 'Dart' },
    { id: 'ruby', label: 'Ruby' },
    { id: 'php', label: 'PHP' },
  ];

  return (
    <div className="w-full bg-black text-white h-12 flex items-center px-4 md:px-20 shadow-md z-40 -mt-10">
      <div className="flex items-center w-full h-full">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setActiveLang(lang.id)} // Gọi hàm cập nhật state ở HomePage
            className={`
              relative h-full flex-1 w-full flex items-center justify-center
              text-sm md:text-base font-bold transition-colors duration-200
              ${activeLang === lang.id 
                ? 'text-white bg-white/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/10' 
              }
            `}
          >
            {lang.label}
            {activeLang === lang.id && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageBar;