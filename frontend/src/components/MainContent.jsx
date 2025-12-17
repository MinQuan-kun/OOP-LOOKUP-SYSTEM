"use client";
import React, { useState, useEffect } from "react";
import API from "@/lib/axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Thêm prop searchResults và onSelectResult
const MainContent = ({ slug, lang, searchResults, onSelectResult }) => {
  const [lesson, setLesson] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // State chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    code_content: "",
    explanation: "",
    has_code: true,
    syntax_note: "",
    is_supported: true,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    setShowCode(false);
  }, [slug, lang]);

  // Fetch bài học chi tiết
  useEffect(() => {
    // Nếu đang hiển thị search results (A*) thì không fetch bài học
    if (searchResults !== null) return;

    if (!slug) return;
    const fetchLesson = async () => {
      setLoading(true);
      setIsEditing(false);
      try {
        const res = await API.get(`/lesson/${slug}?lang=${lang}`);
        setLesson(res.data);
      } catch (error) {
        console.error("Lỗi tải bài học:", error);
        setLesson(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [slug, lang, searchResults]); // Thêm searchResults vào dependency

  // Xử lý sự kiện chỉnh sửa (giữ nguyên logic cũ của bạn)
  const handleEditClick = () => {
    setEditForm({
      title: lesson.title || "",
      content: lesson.content || "",
      code_content: lesson.code_example?.code_content || "",
      explanation: lesson.code_example?.explanation || "",
      has_code: !!lesson.code_example,
      syntax_note: lesson.code_example?.syntax_note || "",
      is_supported: lesson.code_example?.is_supported ?? true,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await API.put(`/lesson/${lesson._id}`, { ...editForm, lang: lang });
      setLesson((prev) => {
        const updatedLesson = {
          ...prev,
          title: editForm.title,
          content: editForm.content,
        };
        if (editForm.has_code) {
          updatedLesson.code_example = {
            ...prev.code_example,
            code_content: editForm.code_content,
            explanation: editForm.explanation,
            language: lang,
            syntax_note: editForm.syntax_note,
            is_supported: editForm.is_supported,
          };
        } else {
          updatedLesson.code_example = null;
        }
        return updatedLesson;
      });
      alert("Cập nhật thành công!");
      setIsEditing(false);
    } catch (error) {
      alert(
        "Lưu thất bại: " + (error.response?.data?.message || error.message)
      );
    }
  };

  // --- TRƯỜNG HỢP 1: HIỂN THỊ KẾT QUẢ TÌM KIẾM A* ---
  if (searchResults) {
    if (searchResults.length === 0) {
      return (
        <div className="bg-white min-h-[500px] rounded-xl shadow-sm border border-gray-200 p-10 flex items-center justify-center text-gray-400">
          Không tìm thấy kết quả A* nào phù hợp.
        </div>
      );
    }

    return (
      <div className="bg-white h-[calc(100vh-140px)] min-h-[500px] overflow-y-auto custom-scrollbar rounded-xl shadow-sm border border-gray-200 p-6 md:p-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 p-2 rounded-lg">
            ⚡
          </span>
          Kết quả tìm kiếm A* (Heuristic Search)
        </h2>
        <div className="grid gap-4">
          {searchResults.map((result) => (
            <div
              key={result._id}
              onClick={() => onSelectResult(result.slug)}
              className="p-5 border rounded-lg hover:border-indigo-500 hover:shadow-md cursor-pointer transition-all group bg-gray-50 hover:bg-white"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-indigo-700 group-hover:text-indigo-600">
                  {result.title}
                </h3>
                {/* Hiển thị điểm A* cost */}
                {result.score !== undefined && (
                  <span className="text-xs font-mono bg-gray-200 text-gray-600 px-2 py-1 rounded">
                    Cost: {result.score}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">
                {result.snippet}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- TRƯỜNG HỢP 2: HIỂN THỊ CHI TIẾT BÀI HỌC (Logic cũ) ---
  if (!slug)
    return (
      <div className="bg-white min-h-[500px] rounded-xl shadow-sm border border-gray-200 p-10 flex items-center justify-center text-gray-400 flex-col">
        <p>Vui lòng chọn một bài học từ danh sách bên trái</p>
      </div>
    );
  if (loading)
    return (
      <div className="bg-white min-h-[500px] rounded-xl shadow-sm border border-gray-200 p-10">
        Đang tải nội dung...
      </div>
    );
  if (!lesson)
    return (
      <div className="bg-white min-h-[500px] rounded-xl shadow-sm border border-gray-200 p-10 text-red-500">
        Không tìm thấy nội dung.
      </div>
    );

  return (
    <div className="bg-white h-[calc(100vh-140px)] min-h-[500px] overflow-y-auto custom-scrollbar rounded-xl shadow-sm border border-gray-200 p-6 md:p-10 relative">
      {!isEditing ? (
        <>
          <div className="absolute top-6 right-8 z-10">
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase border border-gray-200">
              {lang}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span className="hover:text-blue-600 cursor-pointer">
              Trang chủ
            </span>
            <span>/</span>
            <span className="text-gray-800 font-medium">{lesson.title}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {lesson.title}
          </h1>

          <div
            className="prose prose-blue max-w-none text-gray-700 leading-relaxed mb-8"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />

          {lesson.code_example?.syntax_note && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-600">⚠</span>
                <h3 className="font-bold text-amber-800 uppercase text-sm">
                  Lưu ý trong {lang}:
                </h3>
              </div>
              <div
                className="text-amber-900 text-sm"
                dangerouslySetInnerHTML={{
                  __html: lesson.code_example.syntax_note,
                }}
              />
            </div>
          )}

          {lesson.code_example ? (
            lesson.code_example.is_supported === false ? (
              <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-5 flex items-start gap-3">
                <h3 className="font-bold text-red-700">
                  Không hỗ trợ trong {lang.toUpperCase()}
                </h3>
              </div>
            ) : lesson.code_example.code_content &&
              lesson.code_example.code_content.trim() !== "" ? (
              <div className="mt-8 border-t border-gray-100 pt-6">
                <div
                  className="flex items-center gap-3 mb-4 select-none cursor-pointer w-fit"
                  onClick={() => setShowCode(!showCode)}
                >
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      showCode
                        ? "bg-indigo-600 border-indigo-600"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {showCode && <span className="text-white text-xs">✓</span>}
                  </div>
                  <label className="font-bold text-gray-700 cursor-pointer text-sm md:text-base">
                    {showCode ? "Ẩn ví dụ minh họa" : "Xem ví dụ minh họa"}
                  </label>
                </div>

                {showCode && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">
                      Ví dụ minh họa (
                      {lesson.code_example.language.toUpperCase()})
                    </h3>
                    <div className="relative group rounded-lg overflow-hidden border border-gray-700 shadow-inner">
                      <SyntaxHighlighter
                        language={
                          lesson.code_example.language === "csharp"
                            ? "c#"
                            : lesson.code_example.language
                        }
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          padding: "1.5rem",
                          fontSize: "0.875rem",
                          backgroundColor: "#1e1e1e",
                        }}
                        showLineNumbers={true}
                        wrapLongLines={true}
                      >
                        {lesson.code_example.code_content}
                      </SyntaxHighlighter>
                    </div>
                    {lesson.code_example.explanation && (
                      <div className="mt-4 bg-blue-50 text-blue-800 p-4 rounded-lg text-sm border border-blue-100">
                        <strong>💡 Giải thích:</strong>{" "}
                        {lesson.code_example.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : null
          ) : null}

          {user && (
            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
              <button
                onClick={handleEditClick}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-sm active:scale-95"
              >
                Chỉnh sửa nội dung
              </button>
            </div>
          )}
        </>
      ) : (
        // FORM EDIT (Rút gọn cho ngắn, bạn dùng lại phần cũ)
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-indigo-700">
            Chỉnh sửa bài học
          </h2>
          {/* ... Inputs cho Title, Content, Code ... */}
          {/* Giữ nguyên phần Form Inputs như file cũ của bạn */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded font-medium"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-indigo-600 text-white rounded font-bold hover:bg-indigo-700 shadow-md active:scale-95"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
