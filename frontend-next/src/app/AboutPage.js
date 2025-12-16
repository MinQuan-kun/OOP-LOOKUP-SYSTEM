'use client'
import React from 'react';
import { Header } from '../components/Header'; 
import Link from 'next/link';
import Image from 'next/image';

const teamMembers = [
  {
    id: 1,
    name: "Nguyễn Hữu Minh Quân (Người nghẹo)",
    code: "49.01.104.120",
    role: "Trưởng nhóm",
    avatar: "img/MinQuan.jpg",
    task: "Thiết kế cơ sở dữ liệu, Xây dựng giao diện, Triển khai hệ thống, Xử lý Frontend, Backend, Viết báo cáo"
  },
  {
    id: 2,
    name: "Bùi Minh Tín (Bộ trưởng Hitler)",
    code: "49.01.104.152",
    role: "Thành viên",
    avatar: "img/MrTin.jpg",
    task: "Xử lý Backend, Xử lý tìm kiếm và lọc nội dung"
  },
  {
    id: 3,
    name: "Nguyễn Thái Bình (Anh Gymer)",
    code: "49.01.104.011",
    role: "Thành viên",
    avatar: "img/TB.jpg",
    task: "Soạn thảo nội dung, Làm Database, Viết báo cáo"
  },
  {
    id: 4,
    name: "Võ Nguyễn Minh Hoàng (Tội đồ tham lam)",
    code: "49.01.104.048",
    role: "Thành viên",
    avatar: "img/HoangLon.jpg",
    task: "Kiểm thử (Tester), Làm Database, Viết báo cáo, Thiết kế giao diện"
  },
  {
    id: 5,
    name: "Nguyễn Uyên Vy (Kẻ nghiện mèo)",
    code: "49.01.104.180",
    role: "Thành viên",
    avatar: "img/UyenVy.jpg",
    task: "Thu thập tài liệu, Hỗ trợ viết báo cáo, Hỗ trợ làm Database"
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative pt-16">
      
      {/* Nút Back */}
      <Link 
        to="/" 
        className="absolute top-8 left-6 z-20 flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-white/60 shadow-sm rounded-full text-indigo-600 font-bold hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:-translate-x-1 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        <span className="text-sm">Trang chủ</span>
      </Link>

      <Header />
      
      <div className="container mx-auto px-4 mt-8">
        
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Thành viên thực hiện</h1>
        </div>

        {/* Danh sách thành viên */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {teamMembers.map((mem, index) => (
                <div 
                    key={mem.id} 
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    
                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 mb-4 shadow-sm group-hover:border-indigo-100 transition-colors">
                        <img src={mem.avatar} alt={mem.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    {/* Tên & Role */}
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors text-center">
                        {mem.name}
                    </h3>
                    
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full mt-1 mb-2">
                        {mem.code}
                    </span>
                    
                    {/* Chức vụ */}
                    <p className="text-sm font-medium text-gray-500 mb-4 text-center">{mem.role}</p>

                    {/* Divider */}
                    <div className="w-full border-t border-gray-100 my-2"></div>

                    {/* Nhiệm vụ */}
                    <div className="text-center mt-2">
                        <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Nhiệm vụ</span>
                        <p className="text-sm text-gray-600 mt-1 leading-snug">{mem.task}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;