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
        <h3 className="font-bold text-base text-indigo-700 flex items-center gap-2">
          {/* Icon sao lấp lánh cho AI */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-indigo-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {searchResults.length > 0
            ? `AI Gợi ý (${searchResults.length})`
            : "AI không tìm thấy"}
        </h3>
      </div>

      {/* List items */}
      {searchResults.length > 0 ? (
        <ul className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
          {searchResults.map((item) => (
            <li
              key={item._id}
              className="group cursor-pointer p-2 rounded hover:bg-indigo-50 transition-colors"
              onClick={() => onSelectLesson && onSelectLesson(item)}
            >
              <div className="block">
                <h4 className="text-sm text-gray-800 group-hover:text-indigo-700 font-bold transition-colors line-clamp-2 leading-snug mb-1">
                  {item.title}
                </h4>
                {/* Hiện một đoạn snippet ngắn */}
                <p className="text-xs text-gray-500 line-clamp-2 italic">
                  {item.snippet}
                </p>
                {/* Hiện độ chính xác Vector Score */}
                {item.score && (
                  <div className="mt-1 flex justify-end">
                    <span className="text-[10px] bg-indigo-100 text-indigo-600 px-1.5 rounded-sm">
                      AI Match: {(item.score * 100).toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-gray-500 italic text-center py-4">
          Không có kết quả liên quan nào từ AI.
        </div>
      )}
    </div>
  );
};

export default RelatedContent;
