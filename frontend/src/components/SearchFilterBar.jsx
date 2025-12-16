import React, { useState, useRef, useEffect } from "react";
import SearchResults from "./SearchResults";

// Nhận selectedFilters và setSelectedFilters từ HomePage truyền vào
const SearchFilterBar = ({
  selectedFilters,
  setSelectedFilters,
  onSelectLesson,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef(null);

  const filters = [
    { id: "khai-niem", label: "Khái niệm" },
    { id: "tinh-chat", label: "Tính chất" },
    { id: "dang-bai-tap", label: "Dạng bài tập" },
    { id: "phuong-phap", label: "Phương pháp" },
  ];

  // Hàm xử lý khi click checkbox
  const toggleFilter = (id) => {
    if (selectedFilters.includes(id)) {
      // Nếu đang chọn -> Bỏ chọn (Lọc bỏ ID đó ra khỏi mảng)
      setSelectedFilters(selectedFilters.filter((item) => item !== id));
    } else {
      // Nếu chưa chọn -> Thêm vào mảng
      setSelectedFilters([...selectedFilters, id]);
    }
  };

  // Hàm làm mới: Chọn lại tất cả
  const handleReset = () => {
    setSelectedFilters([
      "khai-niem",
      "tinh-chat",
      "dang-bai-tap",
      "phuong-phap",
    ]);
    setSearchQuery("");
    setShowResults(false);
  };

  // Đóng kết quả khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hiển thị kết quả khi có query
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchQuery]);

  return (
    <div className="w-full space-y-4">
      <div className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
        {/* 1. NHÓM CHECKBOXES */}
        <div className="flex items-center gap-4 md:gap-6 shrink-0 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
          {filters.map((filter) => {
            // Kiểm tra xem ID này có đang nằm trong danh sách được chọn không
            const isChecked = selectedFilters.includes(filter.id);

            return (
              <label
                key={filter.id}
                className="flex items-center gap-2 cursor-pointer group whitespace-nowrap select-none"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    value={filter.id}
                    checked={isChecked}
                    onChange={() => toggleFilter(filter.id)}
                    className="peer sr-only"
                  />

                  {/* Giao diện checkbox tùy chỉnh */}
                  <div
                    className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
                      isChecked
                        ? "bg-blue-600 border-blue-600"
                        : "bg-white border-gray-300 group-hover:border-blue-400"
                    }`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${
                        isChecked ? "scale-100" : "scale-0"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                <span
                  className={`text-sm font-semibold transition-colors ${
                    isChecked
                      ? "text-blue-700"
                      : "text-gray-600 group-hover:text-blue-600"
                  }`}
                >
                  {filter.label}
                </span>
              </label>
            );
          })}
        </div>

        {/* 2. THANH TÌM KIẾM (Kết nối với API) */}
        <div className="relative w-full lg:flex-1" ref={searchContainerRef}>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </div>

          <input
            type="text"
            placeholder="Nhập từ khóa cần tra cứu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() =>
              searchQuery.trim().length >= 2 && setShowResults(true)
            }
            className="w-full pl-12 pr-10 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white focus:bg-white shadow-sm"
          />

          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setShowResults(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          {/* Hiển thị kết quả tìm kiếm */}
          {showResults && (
            <SearchResults
              query={searchQuery}
              onSelectLesson={onSelectLesson}
              onClose={() => setShowResults(false)}
            />
          )}
        </div>

        {/* 3. NÚT LÀM MỚI */}
        <button
          onClick={handleReset}
          className="shrink-0 px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 font-semibold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-2 shadow-sm active:scale-95 w-full lg:w-auto justify-center"
        >
          <span>Làm mới</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchFilterBar;
