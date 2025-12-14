import React, { useState, useEffect } from 'react';
import API from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MainContent = ({ slug, lang }) => {
  const [lesson, setLesson] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // State cho chế độ chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    code_content: '',
    explanation: '',
    has_code: true,
    // --- THÊM MỚI ---
    syntax_note: '',      // Lưu ý đặc thù cho ngôn ngữ
    is_supported: true    // Ngôn ngữ này có hỗ trợ tính năng này không?
  });

  useEffect(() => {
    // SỬA: Đổi 'currentUser' thành 'user' cho khớp với AuthContext
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Reset showCode khi đổi bài hoặc đổi ngôn ngữ
  useEffect(() => {
    setShowCode(false);
  }, [slug, lang]);

  // Fetch data
  useEffect(() => {
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
  }, [slug, lang]);

  // Bấm nút Sửa
  const handleEditClick = () => {
    setEditForm({
      title: lesson.title || '',
      content: lesson.content || '',
      code_content: lesson.code_example?.code_content || '',
      explanation: lesson.code_example?.explanation || '',
      has_code: !!lesson.code_example,
      // --- THÊM MỚI ---
      // Lấy dữ liệu cũ hoặc để trống
      syntax_note: lesson.code_example?.syntax_note || '',
      // Mặc định là true nếu chưa có trong DB
      is_supported: lesson.code_example?.is_supported ?? true
    });
    setIsEditing(true);
  };

  // Bấm nút Lưu
  const handleSave = async () => {
    try {
      // Gọi API PUT
      await API.put(`/lesson/${lesson._id}`, {
        ...editForm,
        lang: lang
      });

      // Cập nhật UI ngay lập tức
      setLesson(prev => {
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
            // --- CẬP NHẬT UI ---
            syntax_note: editForm.syntax_note,
            is_supported: editForm.is_supported
          };
        } else {
          updatedLesson.code_example = null;
        }

        return updatedLesson;
      });

      alert("Cập nhật thành công!");
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi lưu bài học:", error);
      alert("Lưu thất bại: " + (error.response?.data?.message || error.message));
    }
  };

  if (!slug) return <div className="bg-white min-h-[500px] rounded-xl shadow-sm border border-gray-200 p-10 flex items-center justify-center text-gray-400 flex-col"><p>Vui lòng chọn một bài học từ danh sách bên trái</p></div>;
  if (loading) return <div className="bg-white min-h-[500px] rounded-xl shadow-sm border border-gray-200 p-10">Đang tải nội dung...</div>;
  if (!lesson) return <div className="bg-white min-h-[500px] rounded-xl shadow-sm border border-gray-200 p-10 text-red-500">Không tìm thấy nội dung.</div>;

  return (
    <div className="bg-white h-[calc(100vh-140px)] min-h-[500px] overflow-y-auto custom-scrollbar rounded-xl shadow-sm border border-gray-200 p-6 md:p-10 relative">

      {!isEditing ? (
        <>
          {/* Header*/}
          <div className="absolute top-6 right-8 z-10">
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase border border-gray-200">{lang}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span><span>/</span><span className="text-gray-800 font-medium">{lesson.title}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>

          {/* 1. LÝ THUYẾT CHUNG */}
          <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: lesson.content }} />

          {/* --- 2. LƯU Ý NGÔN NGỮ (SYNTAX NOTE) --- */}
          {/* Phần này hiển thị độc lập, không phụ thuộc vào code */}
          {lesson.code_example?.syntax_note && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                </span>
                <h3 className="font-bold text-amber-800 uppercase text-sm">Lưu ý trong {lang}:</h3>
              </div>
              <div className="text-amber-900 text-sm" dangerouslySetInnerHTML={{ __html: lesson.code_example.syntax_note }} />
            </div>
          )}

          {/* --- 3. CODE VÍ DỤ --- */}
          {lesson.code_example ? (
            // TRƯỜNG HỢP 1: Không hỗ trợ -> Hiện thông báo đỏ
            lesson.code_example.is_supported === false ? (
              <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-5 flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div>
                  <h3 className="font-bold text-red-700">Không hỗ trợ trong {lang.toUpperCase()}</h3>
                  <p className="text-sm text-red-600 mt-1">
                    Khái niệm này không tồn tại hoặc không được hỗ trợ trực tiếp trong ngôn ngữ này.
                    {lesson.code_example.syntax_note ? " (Xem lưu ý ở trên)" : ""}
                  </p>
                </div>
              </div>
            ) : (
              // TRƯỜNG HỢP 2: Có hỗ trợ -> KIỂM TRA CODE CÓ RỖNG KHÔNG?
              (lesson.code_example.code_content && lesson.code_example.code_content.trim() !== "") ? (
                <div className="mt-8 border-t border-gray-100 pt-6">

                  {/* --- CHECKBOX BẬT/TẮT CODE --- */}
                  <div className="flex items-center gap-3 mb-4 select-none cursor-pointer w-fit" onClick={() => setShowCode(!showCode)}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${showCode ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'}`}>
                      {showCode && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <label className="font-bold text-gray-700 cursor-pointer text-sm md:text-base">
                      {showCode ? 'Ẩn ví dụ minh họa' : 'Xem ví dụ minh họa'}
                    </label>
                  </div>

                  {/* --- KHUNG CODE --- */}
                  {showCode && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        Ví dụ minh họa ({lesson.code_example.language.toUpperCase()})
                      </h3>

                      <div className="relative group rounded-lg overflow-hidden border border-gray-700 shadow-inner">
                        {/* Label ngôn ngữ ở góc */}
                        <div className="absolute top-0 right-0 bg-gray-700 text-xs text-white px-2 py-1 rounded-bl-md z-10">
                          {lesson.code_example.language}
                        </div>

                        {/* Component Highlighting */}
                        <SyntaxHighlighter
                          language={lesson.code_example.language === 'csharp' ? 'c#' : lesson.code_example.language} // Fix nhỏ cho C# nếu cần
                          style={vscDarkPlus}
                          customStyle={{
                            margin: 0,
                            padding: '1.5rem',
                            fontSize: '0.875rem',
                            lineHeight: '1.5',
                            backgroundColor: '#1e1e1e',
                          }}
                          showLineNumbers={true}
                          wrapLongLines={true}
                        >
                          {lesson.code_example.code_content}
                        </SyntaxHighlighter>
                      </div>

                      <div className="mt-4 space-y-3">
                        {lesson.code_example.explanation && (
                          <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm border border-blue-100">
                            <strong>💡 Giải thích:</strong> {lesson.code_example.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : null // Nếu Code rỗng thì ẩn toàn bộ phần code
            )
          ) : null}

          {user && (
            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
              <button onClick={handleEditClick} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-sm active:scale-95">Chỉnh sửa nội dung</button>
            </div>
          )}
        </>
      ) : (
        // --- FORM CHỈNH SỬA ---
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold text-indigo-700">Chỉnh sửa bài học</h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">✕ Hủy bỏ</button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề bài học</label>
            <input type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung lý thuyết (HTML)</label>
            <textarea rows={10} className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm" value={editForm.content} onChange={(e) => setEditForm({ ...editForm, content: e.target.value })} />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="has_code" checked={editForm.has_code} onChange={(e) => setEditForm({ ...editForm, has_code: e.target.checked })} className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300 cursor-pointer" />
              <label htmlFor="has_code" className="text-sm font-bold text-gray-700 select-none cursor-pointer">Có ví dụ code minh họa ({lang.toUpperCase()})?</label>
            </div>

            {editForm.has_code && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-200 space-y-4 pl-6 border-l-2 border-indigo-200">
                {/* 1. CHECKBOX HỖ TRỢ */}
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="is_supported" checked={editForm.is_supported} onChange={(e) => setEditForm({ ...editForm, is_supported: e.target.checked })} className="w-4 h-4 text-green-600 rounded focus:ring-green-500 border-gray-300 cursor-pointer" />
                  <label htmlFor="is_supported" className="text-sm font-semibold text-gray-700 cursor-pointer">
                    Ngôn ngữ {lang.toUpperCase()} có hỗ trợ tính năng này không?
                  </label>
                </div>

                {/* 2. TEXTAREA LƯU Ý RIÊNG */}
                <div>
                  <label className="block text-xs font-bold text-amber-600 mb-1">Lưu ý đặc thù / Sự khác biệt cú pháp (HTML)</label>
                  <textarea rows={3} className="w-full p-2 border border-amber-200 rounded focus:ring-2 focus:ring-amber-500 outline-none text-sm bg-amber-50/50" value={editForm.syntax_note} onChange={(e) => setEditForm({ ...editForm, syntax_note: e.target.value })} placeholder="Ví dụ: C++ dùng dấu :, Java dùng extends..." />
                </div>

                {/* 3. CODE CONTENT*/}
                {editForm.is_supported && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Đoạn mã nguồn</label>
                      <textarea rows={6} className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm bg-slate-900 text-slate-100" value={editForm.code_content} onChange={(e) => setEditForm({ ...editForm, code_content: e.target.value })} placeholder="// Nhập code ví dụ tại đây..." />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Giải thích code</label>
                      <input type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none text-sm" value={editForm.explanation} onChange={(e) => setEditForm({ ...editForm, explanation: e.target.value })} placeholder="Giải thích ngắn gọn..." />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded font-medium">Hủy bỏ</button>
            <button onClick={handleSave} className="px-6 py-2 bg-indigo-600 text-white rounded font-bold hover:bg-indigo-700 shadow-md active:scale-95">Lưu thay đổi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;