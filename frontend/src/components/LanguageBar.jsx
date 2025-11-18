import React, { useState } from 'react';

const LanguageBar = () => {
  const languages = [
    { id: 'cpp', label: 'C++' },
    { id: 'csharp', label: 'C#' },
    { id: 'java', label: 'Java' },
    { id: 'dart', label: 'Dart' },
    { id: 'ruby', label: 'Ruby' },
    { id: 'php', label: 'PHP' },
  ];

  const [activeLang, setActiveLang] = useState('cpp');

  return (
    // Container ngoài: Giữ nguyên padding (px-4 md:px-20) để giới hạn lề 2 bên
    <div className="w-full bg-black text-white h-12 flex items-center px-4 md:px-20 shadow-md z-40 -mt-10">
      
      {/* Danh sách ngôn ngữ */}
      <div className="flex items-center w-full h-full">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setActiveLang(lang.id)}
            className={`
              relative h-full 
              /* QUAN TRỌNG: flex-1 để tự dãn đều, w-full để chiếm chỗ, justify-center để chữ ra giữa */
              flex-1 w-full flex items-center justify-center
              text-sm md:text-base font-bold transition-colors duration-200
              ${activeLang === lang.id 
                ? 'text-white bg-white/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/10' 
              }
            `}
          >
            {lang.label}
            
            {/* Thanh gạch chân */}
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