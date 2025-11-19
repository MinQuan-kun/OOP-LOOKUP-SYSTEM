import React, { useState, useEffect } from 'react';
import API from "@/lib/axios";

const MainContent = ({ slug, lang }) => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Nếu chưa chọn bài nào thì không gọi API
    if (!slug) return;

    const fetchLesson = async () => {
      setLoading(true);
      try {
        // Gọi API lấy chi tiết bài học theo Slug và Ngôn ngữ
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
  }, [slug, lang]); // Chạy lại khi slug hoặc lang thay đổi

  // Trạng thái chờ
  if (!slug) {
    return (
      <div className="bg-white min-h-[500px] rounded-xl shadow-sm border border-gray-200 p-10 flex items-center justify-center text-gray-400 flex-col">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
         <p>Vui lòng chọn một bài học từ danh sách bên trái</p>
      </div>
    );
  }

  if (loading) {
    return <div className="bg-white min-h-[500px] rounded-xl shadow-sm border border-gray-200 p-10">Đang tải nội dung...</div>;
  }

  if (!lesson) {
    return <div className="bg-white min-h-[500px] rounded-xl shadow-sm border border-gray-200 p-10 text-red-500">Không tìm thấy nội dung.</div>;
  }

  return (
    <div className="bg-white min-h-[500px] rounded-xl shadow-sm border border-gray-200 p-6 md:p-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
        <span>/</span>
        <span className="hover:text-blue-600 cursor-pointer">{lesson.chapter?.title}</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">{lesson.title}</span>
      </div>

      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>

      {/* Metadata */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 border-b pb-6">
        <div className="flex items-center gap-1">
          <span>Cập nhật: {new Date(lesson.updatedAt).toLocaleDateString('vi-VN')}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>{lesson.views} lượt xem</span>
        </div>
      </div>

      {/* Nội dung Lý thuyết (HTML) */}
      <div 
        className="prose prose-blue max-w-none text-gray-700 leading-relaxed mb-8"
        dangerouslySetInnerHTML={{ __html: lesson.content }} 
      />

      {/* CODE VÍ DỤ (Hiển thị nếu có) */}
      {lesson.code_example ? (
        <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                Ví dụ minh họa ({lesson.code_example.language.toUpperCase()})
            </h3>
            
            {/* Khung Code */}
            <div className="relative group">
                <div className="absolute top-0 right-0 bg-gray-700 text-xs text-white px-2 py-1 rounded-bl-md">
                    {lesson.code_example.language}
                </div>
                <pre className="bg-[#1e1e1e] text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm shadow-inner border border-gray-700">
                    <code>{lesson.code_example.code_content}</code>
                </pre>
            </div>

            {/* Giải thích & Lưu ý */}
            <div className="mt-4 space-y-3">
                {lesson.code_example.explanation && (
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm border border-blue-100">
                        <strong>💡 Giải thích:</strong> {lesson.code_example.explanation}
                    </div>
                )}
                
                {lesson.code_example.special_note && (
                    <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg text-sm border border-yellow-100 flex gap-2">
                        <span>⚠️</span>
                        <span><strong>Lưu ý:</strong> {lesson.code_example.special_note}</span>
                    </div>
                )}
            </div>
        </div>
      ) : (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center text-gray-500 italic text-sm">
            Chưa có ví dụ code cho ngôn ngữ {lang.toUpperCase()}
        </div>
      )}

    </div>
  );
};

export default MainContent;