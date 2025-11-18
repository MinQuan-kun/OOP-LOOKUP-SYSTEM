import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Xử lý logic đăng nhập ở đây (gọi API...)
    // alert("Đang xử lý đăng nhập...");
    // navigate('/');
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center relative overflow-hidden">
      
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10 border border-gray-100">
        
        <div className="text-center mb-8">
          <img 
            src="/Logo.png" 
            alt="Logo" 
            className="h-24 mx-auto object-contain mb-4" 
          />
          <h2 className="text-2xl font-bold text-gray-800">Chào mừng trở lại!</h2>
          <p className="text-gray-500 text-sm mt-1">Đăng nhập hệ thống tra cứu OOP</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email / Tên đăng nhập</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="admin@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input 
              type="password" 
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
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            ĐĂNG NHẬP
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