// src/components/Header.jsx
import React from 'react';

export const Header = () => {
    return (
        <header className="w-full flex justify-center items-center gap-4 py-4 -mt-10">
            
            {/* 1. LOGO */}
            <div className="shrink-0">
                <img
                    src="/img/Title.png"
                    className="h-20 w-auto object-contain" 
                    alt="Logo"
                />
            </div>

            {/* 2. TEXT */}
            <div className="text-left">
                <h1 className="text-gray-800 font-semibold text-lg uppercase tracking-wide leading-tight">
                    Hệ thống tra cứu kiến thức môn <br className="hidden md:block" /> 
                    <span className="text-blue-700">lập trình hướng đối tượng</span>
                </h1>
            </div>

        </header>
    );
};

export default Header;