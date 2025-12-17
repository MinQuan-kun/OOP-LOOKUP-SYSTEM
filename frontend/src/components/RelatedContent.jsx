"use client";
import React from "react";

const RelatedContent = ({ searchResults, onSelectLesson }) => {
  if (!searchResults) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-[250px] animate-in fade-in duration-500">
      {/* Header box */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
        <h3 className="font-bold text-base text-indigo-700">
          {searchResults.length > 0
            ? `Kiến thức liên quan (${searchResults.length})`
            : "Không tìm thấy kết quả"}
        </h3>
      </div>

      {/* List items */}
      {searchResults.length > 0 ? (
        <ul className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
          {searchResults.map((item) => (
            <li
              key={item._id}
              className="group cursor-pointer"
              onClick={() => onSelectLesson && onSelectLesson(item)}
            >
              <div className="block">
                <h4 className="text-sm text-gray-700 group-hover:text-blue-600 font-medium transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h4>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-gray-500 italic text-center py-4">
          Thử tìm kiếm với từ khóa khác...
        </div>
      )}
    </div>
  );
};

export default RelatedContent;
