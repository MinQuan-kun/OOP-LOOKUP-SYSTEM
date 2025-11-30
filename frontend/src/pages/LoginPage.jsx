import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/context/AuthContext";
// Import file cấu hình API vừa tạo
import API from "@/lib/axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // State quản lý form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Gọi API Login
      const res = await API.post('/auth/login', {
        username: username,
        password: password
      });

      // 2. Nếu thành công -> Lưu user vào localStorage
      // res.data chứa { _id, username, role, ... }
      login(res.data);

      // 3. Chuyển hướng về trang chủ
      navigate('/');
      
    } catch (err) {
      // Xử lý lỗi trả về từ server
      const msg = err.response?.data?.message || "Đăng nhập thất bại!";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10 border border-gray-100">
        
        <div className="text-center mb-8">
          <img 
            src="/img/Title.png" // Đảm bảo đường dẫn ảnh đúng với public folder của bạn
            alt="Logo" 
            className="h-20 mx-auto object-contain mb-4" 
          />
          <h2 className="text-2xl font-bold text-gray-800">Chào mừng trở lại!</h2>
          <p className="text-gray-500 text-sm mt-1">Đăng nhập hệ thống tra cứu OOP</p>
        </div>

        {/* Hiển thị lỗi nếu có */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="admin"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded text-purple-600 focus:ring-purple-500"/>
              Ghi nhớ tôi
            </label>
            <a href="#" className="text-purple-600 hover:underline font-medium">Quên mật khẩu?</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-200
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl hover:scale-[1.02]'
              }`}
          >
            {loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG NHẬP'}
          </button>
        </form>

        {/* Footer form */}
        <div className="mt-6 text-center pt-4 border-t border-gray-100">
          <button 
            onClick={() => navigate('/')}
            className="text-sm text-gray-500 hover:text-gray-800 hover:underline"
          >
            ← Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;