import React from 'react';

const RelatedContent = () => {
    //TODO: DEMO THÔI
  const relatedLinks = [
    { id: 1, title: 'So sánh OOP và Functional Programming', views: 1200 },
    { id: 2, title: 'Design Patterns cơ bản trong Java', views: 850 },
    { id: 3, title: 'SOLID là gì? 5 nguyên lý thiết kế', views: 3000 },
    { id: 4, title: 'Cách debug hiệu quả trong VS Code', views: 500 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-[250px]">
      
      {/* Header box */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
        <h3 className="font-bold text-gray-800 text-base">Kiến thức liên quan</h3>
        <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">Xem tất cả</span>
      </div>

      {/* List items */}
      <ul className="space-y-4">
        {relatedLinks.map((item) => (
          <li key={item.id} className="group cursor-pointer">
            <h4 className="text-sm text-gray-700 group-hover:text-blue-600 font-medium transition-colors line-clamp-2 leading-snug">
              {item.title}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {item.views}
              </span>
              <span className="text-[10px] text-gray-300">•</span>
              <span className="text-xs text-gray-400">Bài đọc thêm</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Banner quảng cáo hoặc Note nhỏ (Optional) */}
      <div className="mt-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-3 text-center">
        <p className="text-xs text-gray-600 font-medium">Bạn muốn đóng góp bài viết?</p>
        <button className="mt-2 text-xs bg-white text-blue-600 px-3 py-1 rounded shadow-sm font-bold hover:bg-blue-50">
          Gửi bài ngay
        </button>
      </div>

    </div>
  );
};

export default RelatedContent;