import React, { useState } from 'react';

const SearchFilterBar = () => {
  // 1. Đổi state thành mảng để lưu được nhiều lựa chọn
  // Mặc định chọn 'khai-niem' (bạn có thể để [] nếu muốn không chọn gì lúc đầu)
  const [selectedFilters, setSelectedFilters] = useState(['khai-niem']);
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'khai-niem', label: 'Khái niệm' },
    { id: 'tinh-chat', label: 'Tính chất' },
    { id: 'dang-bai-tap', label: 'Dạng bài tập' },
    { id: 'phuong-phap', label: 'Phương pháp' },
  ];

  // Hàm xử lý khi click vào checkbox
  const toggleFilter = (id) => {
    setSelectedFilters(prev => {
      if (prev.includes(id)) {
        // Nếu đã có thì bỏ chọn (lọc nó ra khỏi mảng)
        return prev.filter(item => item !== id);
      } else {
        // Nếu chưa có thì thêm vào mảng
        return [...prev, id];
      }
    });
  };

  // Hàm làm mới: Reset về mặc định (ví dụ chỉ chọn Khái niệm hoặc rỗng)
  const handleReset = () => {
    setSelectedFilters(['khai-niem']); 
    setSearchQuery('');
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
      
      {/* 1. NHÓM CHECKBOXES */}
      <div className="flex items-center gap-4 md:gap-6 shrink-0 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
        {filters.map((filter) => {
          const isChecked = selectedFilters.includes(filter.id);
          
          return (
            <label 
              key={filter.id} 
              className="flex items-center gap-2 cursor-pointer group whitespace-nowrap select-none"
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox" // Đổi type thành checkbox
                  value={filter.id}
                  checked={isChecked}
                  onChange={() => toggleFilter(filter.id)}
                  className="peer sr-only"
                />
                
                {/* Hình vuông (Checkbox) thay vì hình tròn */}
                {/* rounded: bo góc nhẹ hình vuông */}
                <div className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
                  isChecked 
                    ? 'bg-blue-600 border-blue-600' // Khi chọn: Nền xanh
                    : 'bg-white border-gray-300 group-hover:border-blue-400' // Chưa chọn: Nền trắng
                }`}>
                  {/* Dấu tích (Checkmark icon) */}
                  <svg 
                    className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${isChecked ? 'scale-100' : 'scale-0'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <span className={`text-sm font-semibold transition-colors ${
                 isChecked ? 'text-blue-700' : 'text-gray-600 group-hover:text-blue-600'
              }`}>
                {filter.label}
              </span>
            </label>
          );
        })}
      </div>

      {/* 2. THANH TÌM KIẾM */}
      <div className="relative w-full lg:flex-1">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Nhập từ khóa cần tra cứu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-10 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white focus:bg-white shadow-sm"
        />
        
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* 3. NÚT LÀM MỚI */}
      <button
        onClick={handleReset}
        className="shrink-0 px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 font-semibold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-2 shadow-sm active:scale-95 w-full lg:w-auto justify-center"
      >
        <span>Làm mới</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

    </div>
  );
};

export default SearchFilterBar;