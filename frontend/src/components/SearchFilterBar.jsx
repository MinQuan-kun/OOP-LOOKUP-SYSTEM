import React, { useState, useEffect } from "react";
import API from "@/lib/axios";

// Nhận selectedFilters và setSelectedFilters từ HomePage truyền vào
const SearchFilterBar = ({
  selectedFilters,
  setSelectedFilters,
  onSearchResults,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const filters = [
    { id: "khai-niem", label: "Khái niệm" },
    { id: "tinh-chat", label: "Tính chất" },
    { id: "dang-bai-tap", label: "Dạng bài tập" },
    { id: "phuong-phap", label: "Phương pháp" },
  ];

  // Logic Debounce: Chỉ gọi API sau khi người dùng ngừng gõ 600ms
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        try {
          // Gọi API tìm kiếm AI mới
          const res = await API.get(
            `/lesson/search?q=${encodeURIComponent(searchQuery)}`
          );

          // Trả kết quả về component cha để hiển thị
          if (onSearchResults) {
            onSearchResults(res.data);
          }
        } catch (error) {
          console.error("Lỗi tìm kiếm:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        // Nếu ô tìm kiếm rỗng, trả về null để cha biết mà reset về cây kiến thức
        if (onSearchResults) onSearchResults(null);
      }
    }, 600); // Delay 600ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Hàm xử lý khi click checkbox
  const toggleFilter = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== id));
    } else {
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
    if (onSearchResults) onSearchResults(null);
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col lg:flex-row items-center gap-4 lg:gap-8 transition-all hover:shadow-md">
      {/* 1. FILTER CHECKBOXES */}
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
                  type="checkbox"
                  value={filter.id}
                  checked={isChecked}
                  onChange={() => toggleFilter(filter.id)}
                  className="peer sr-only"
                />

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

      {/* 2. THANH TÌM KIẾM AI */}
      <div className="relative w-full lg:flex-1 group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
          {isSearching ? (
            <svg
              className="animate-spin h-5 w-5 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
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
          )}
        </div>

        <input
          type="text"
          placeholder="Hỏi AI: 'Làm sao tạo hàm hủy ảo?'..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-10 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white focus:bg-white shadow-sm font-medium"
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
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
  );
};

export default SearchFilterBar;
