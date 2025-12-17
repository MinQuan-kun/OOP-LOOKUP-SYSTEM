"use client";
import React, { useState } from "react";

import Header from "@/components/Header";
import LanguageBar from "@/components/LanguageBar";
import LoginButton from "../components/LoginButton";
import SearchFilterBar from "@/components/SearchFilterBar";
import KnowledgeTree from "@/components/KnowledgeTree";
import MainContent from "@/components/MainContent";
import RelatedContent from "@/components/RelatedContent";
import Footer from "@/components/Footer";

const HomePage = () => {
  // State toàn cục
  const [currentLang, setCurrentLang] = useState("cpp"); // Mặc định C++
  const [currentSlug, setCurrentSlug] = useState(""); // Slug bài học đang chọn

  // State cho bộ lọc
  const [selectedFilters, setSelectedFilters] = useState([
    "khai-niem",
    "tinh-chat",
    "dang-bai-tap",
    "phuong-phap",
  ]);

  // --- STATE TÌM KIẾM ---
  // Kết quả A*
  const [mainSearchResults, setMainSearchResults] = useState(null);

  // 2. Kết quả AI
  const [relatedSearchResults, setRelatedSearchResults] = useState(null);

  // Khi chọn một bài học từ Cây kiến thức hoặc Kết quả tìm kiếm
  const handleSelectLesson = (slug) => {
    setCurrentSlug(slug);
    setMainSearchResults(null); // Ẩn danh sách tìm kiếm ở giữa để hiện chi tiết bài học
    // Giữ nguyên relatedSearchResults để người dùng vẫn thấy các bài liên quan ở bên phải
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #fff 40%, #475569 100%)",
        }}
      />

      <div className="w-full relative z-10 pt-8 mx-auto">
        <div className="w-full max-w-13xl p-6 mx-auto space-y-6">
          <LoginButton />
          <Header />
          <LanguageBar
            activeLang={currentLang}
            setActiveLang={setCurrentLang}
          />

          <div className="relative z-10 w-full pb-10 px-4 lg:px-8 mx-auto">
            <div className="w-full max-w-[1800px] mx-auto space-y-6">
              {/* 1. Thanh Search & Filter (Truyền 2 callback) */}
              <SearchFilterBar
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                onMainResults={setMainSearchResults} // A* results
                onRelatedResults={setRelatedSearchResults} // AI results
              />

              {/* 2. Bố cục 3 cột */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Cột 1: Cây kiến thức */}
                <div className="lg:col-span-3">
                  <KnowledgeTree
                    onSelectLesson={handleSelectLesson}
                    filters={selectedFilters}
                  />
                </div>

                {/* Cột 2: Nội dung chính (Hiển thị Chi tiết bài học HOẶC Kết quả A*) */}
                <div className="lg:col-span-6">
                  <MainContent
                    slug={currentSlug}
                    lang={currentLang}
                    searchResults={mainSearchResults} // Truyền kết quả A* vào đây
                    onSelectResult={(slug) => handleSelectLesson(slug)} // Khi chọn từ list A*
                  />
                </div>

                {/* Cột 3: Liên quan (Hiển thị Kết quả AI) */}
                <div className="col-span-12 lg:col-span-3">
                  <RelatedContent
                    searchResults={relatedSearchResults} // Truyền kết quả AI vào đây
                    onSelectLesson={(item) => handleSelectLesson(item.slug)}
                  />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
