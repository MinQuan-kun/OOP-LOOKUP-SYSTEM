import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Kiểm tra trạng thái đăng nhập khi component load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // 1. Xóa thông tin user khỏi localStorage
    localStorage.removeItem('currentUser');
    
    // 2. Reset state để giao diện cập nhật ngay lập tức
    setUser(null);
    
    navigate('/');
  };

  return (
    <div className="absolute top-0 left-0 w-full flex justify-end items-center px-8 py-4 z-50 pointer-events-none">
      
      {user ? (
        // --- TRƯỜNG HỢP ĐÃ LOGIN ---
        <div className="pointer-events-auto flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-lg border border-white/50 transition-all hover:bg-white">
          {/* Avatar hoặc Icon User */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
            {user.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Xin chào,</span>
            <span className="text-sm font-bold text-gray-800 leading-none">{user.username || user.name}</span>
          </div>

          {/* Đường kẻ dọc ngăn cách */}
          <div className="h-6 w-px bg-gray-300 mx-1"></div>

          {/* Nút Logout */}
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
          >
            Thoát
          </button>
        </div>
      ) : (
        // --- TRƯỜNG HỢP CHƯA LOGIN ---
        <button
          onClick={() => navigate('/login')}
          className="pointer-events-auto bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white text-base font-bold py-2 px-6 rounded-full shadow-lg transform transition hover:scale-105 border border-white/20 backdrop-blur-sm"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default LoginButton;