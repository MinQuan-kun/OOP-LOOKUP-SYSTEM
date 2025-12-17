"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import SearchFilterBar from "@/components/SearchFilterBar";
import KnowledgeTree from "@/components/KnowledgeTree";
import MainContent from "@/components/MainContent";
import RelatedContent from "@/components/RelatedContent"; // ✅ Đã import lại
import Footer from "@/components/Footer";

export default function Home() {
  // State lưu bài học đang chọn
  const [selectedSlug, setSelectedSlug] = useState("");

  // State lưu bộ lọc checkbox
  const [selectedFilters, setSelectedFilters] = useState([
    "khai-niem",
    "tinh-chat",
    "dang-bai-tap",
    "phuong-phap",
  ]);

  // State lưu kết quả tìm kiếm AI
  const [searchResults, setSearchResults] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header />

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* 1. THANH TÌM KIẾM */}
        <div className="mb-6 sticky top-0 z-20">
          <SearchFilterBar
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            onSearchResults={setSearchResults}
          />
        </div>

        {/* LAYOUT CHIA 3 CỘT (Left: 3 - Main: 7 - Right: 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 2. SIDEBAR TRÁI (3/12 phần) */}
          <div className="lg:col-span-3 lg:sticky lg:top-24 h-fit">
            {searchResults !== null ? (
              // --- KẾT QUẢ TÌM KIẾM AI ---
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-blue-100 flex justify-between items-center">
                  <h3 className="font-bold text-blue-800 flex items-center gap-2 text-sm">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Kết quả AI ({searchResults.length})
                  </h3>
                  <button
                    onClick={() => setSearchResults(null)}
                    className="text-xs text-gray-500 hover:text-red-500 hover:underline"
                  >
                    Đóng
                  </button>
                </div>

                <div className="max-h-[70vh] overflow-y-auto custom-scrollbar p-2">
                  {searchResults.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 text-sm">
                      <span className="text-4xl block mb-2">😿</span>
                      <p>Không tìm thấy bài nào cả...</p>
                    </div>
                  ) : (
                    searchResults.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => setSelectedSlug(item.slug)}
                        className={`p-3 rounded-lg cursor-pointer transition-all border mb-2 last:mb-0 group ${
                          selectedSlug === item.slug
                            ? "bg-blue-50 border-blue-300 ring-1 ring-blue-300 shadow-sm"
                            : "bg-white border-gray-100 hover:border-blue-300 hover:shadow-md"
                        }`}
                      >
                        <h4
                          className={`font-bold text-sm mb-1 transition-colors ${
                            selectedSlug === item.slug
                              ? "text-blue-700"
                              : "text-gray-800 group-hover:text-blue-600"
                          }`}
                        >
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {item.snippet || "Không có nội dung tóm tắt..."}
                        </p>
                        {item.score && (
                          <div className="mt-2 flex items-center gap-1">
                            <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500 rounded-full"
                                style={{ width: `${item.score * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono">
                              {(item.score * 100).toFixed(0)}%
                            </span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              // --- CÂY KIẾN THỨC MẶC ĐỊNH ---
              <KnowledgeTree
                onSelectLesson={setSelectedSlug}
                filters={selectedFilters}
              />
            )}
          </div>

          {/* 3. MAIN CONTENT (7/12 phần) - Giảm độ rộng để nhường chỗ cho cột phải */}
          <div className="lg:col-span-7">
            <MainContent slug={selectedSlug} lang="cpp" />
          </div>

          {/* 4. SIDEBAR PHẢI (2/12 phần) - ✅ Khôi phục RelatedContent */}
          <div className="hidden lg:block lg:col-span-2 space-y-4">
            <RelatedContent />

            {/* Bạn có thể thêm các widget khác vào đây nếu muốn */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
