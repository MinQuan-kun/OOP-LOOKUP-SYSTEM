"use client";
import React from "react";
import API from "@/lib/axios";

const SearchResults = ({ query, onSelectLesson, onClose }) => {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchLessons = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get("/lesson/search", {
          params: { q: query, limit: 10 },
        });
        setResults(res.data.results || []);
      } catch (err) {
        console.error("Search error:", err);
        setError("Không thể tìm kiếm. Vui lòng thử lại.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce: Đợi 300ms sau khi người dùng ngừng gõ
    const timeoutId = setTimeout(searchLessons, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  if (!query || query.trim().length < 2) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[500px] overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">
      {loading && (
        <div className="p-6 text-center text-gray-500">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
          Đang tìm kiếm...
        </div>
      )}

      {error && (
        <div className="p-4 text-red-600 text-sm text-center bg-red-50 border-b border-red-100">
          {error}
        </div>
      )}

      {!loading && !error && results.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto mb-2 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm">Không tìm thấy kết quả nào cho "{query}"</p>
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <>
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
            <span className="text-sm font-semibold text-gray-700">
              Tìm thấy {results.length} kết quả
            </span>
            <button
              onClick={onClose}
              className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100"
            >
              ✕ Đóng
            </button>
          </div>
          <ul className="divide-y divide-gray-100">
            {results.map((result) => (
              <li
                key={result.id}
                onClick={() => {
                  onSelectLesson(result.slug);
                  onClose();
                }}
                className="p-4 hover:bg-blue-50 cursor-pointer transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                      {result.title}
                    </h4>
                    {result.snippet && (
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                        {result.snippet}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      {result.chapter && (
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                          {result.chapter}
                        </span>
                      )}
                      {result.knowledge_type && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                          {result.knowledge_type}
                        </span>
                      )}
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 group-hover:text-blue-600 shrink-0 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SearchResults;
