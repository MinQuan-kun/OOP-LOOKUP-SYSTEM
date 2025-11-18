import React from 'react';


// TODO: Chưa kết nối tới DB, Hiện tại mới chỉ là demo
const MainContent = () => {
  return (
    <div className="bg-white min-h-[500px] rounded-xl shadow-sm border border-gray-200 p-6 md:p-10">
      {/* Breadcrumb (Đường dẫn) */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
        <span>/</span>
        <span className="hover:text-blue-600 cursor-pointer">Chương 1</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Khái niệm cơ bản</span>
      </div>

    
      {/* Tiêu đề bài học */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        1.1 Khái niệm Lập trình hướng đối tượng (OOP)
      </h1>

      {/* Metadata (Ngày đăng, tác giả...) */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 border-b pb-6">
        <div className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>Cập nhật: 18/11/2025</span>
        </div>
        <div className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>2.5k lượt xem</span>
        </div>
      </div>

      {/* Nội dung bài học (Demo text) */}
      <div className="prose prose-blue max-w-none text-gray-700 space-y-4 leading-relaxed">
        <p>
          <strong>Lập trình hướng đối tượng (OOP)</strong> là một mẫu hình lập trình dựa trên khái niệm "công nghệ đối tượng", mà trong đó, đối tượng chứa đựng dữ liệu, trên các trường, thường được gọi là các thuộc tính; và mã nguồn, được tổ chức thành các phương thức.
        </p>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 italic">
          "Mục tiêu của OOP là quản lý độ phức tạp của phần mềm bằng cách mô hình hóa các thành phần thực tế thành các đối tượng phần mềm."
        </div>

        <h3 className="text-xl font-bold text-gray-800 mt-6">Tại sao nên dùng OOP?</h3>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>Tái sử dụng mã nguồn (Reusability).</li>
          <li>Dễ dàng bảo trì và nâng cấp hệ thống.</li>
          <li>Bảo mật dữ liệu tốt hơn thông qua tính đóng gói.</li>
        </ul>

        <p className="mt-4">
          Hãy chọn các bài học tiếp theo ở menu bên trái để tìm hiểu sâu hơn về các tính chất của OOP như: Đóng gói, Kế thừa, Đa hình và Trừu tượng.
        </p>
      </div>
    </div>
  );
};

export default MainContent;