import React, { useState, useEffect } from 'react';
import API from '@/lib/axios';

const MainContent = ({ slug, lang }) => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); 

  // State cho chế độ chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    code_content: '',
    explanation: '',
    has_code: true 
  });

  // Check login
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

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
      has_code: !!lesson.code_example 
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
                language: lang
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
    <div className="bg-white min-h-[500px] rounded-xl shadow-sm border border-gray-200 p-6 md:p-10 relative">
      
      {!isEditing ? (
        <>
            <div className="absolute top-6 right-6">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase border border-gray-200">{lang}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span><span>/</span><span className="text-gray-800 font-medium">{lesson.title}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 border-b pb-6">
                <div className="flex items-center gap-1"><span>Cập nhật: {new Date(lesson.updatedAt).toLocaleDateString('vi-VN')}</span></div>
                <div className="flex items-center gap-1"><span>{lesson.views} lượt xem</span></div>
            </div>
            <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: lesson.content }} />

            {lesson.code_example ? (
                <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">Ví dụ minh họa ({lesson.code_example.language.toUpperCase()})</h3>
                    <div className="relative group">
                        <div className="absolute top-0 right-0 bg-gray-700 text-xs text-white px-2 py-1 rounded-bl-md">{lesson.code_example.language}</div>
                        <pre className="bg-[#1e1e1e] text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm shadow-inner border border-gray-700"><code>{lesson.code_example.code_content}</code></pre>
                    </div>
                    <div className="mt-4 space-y-3">
                        {lesson.code_example.explanation && (<div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm border border-blue-100"><strong>💡 Giải thích:</strong> {lesson.code_example.explanation}</div>)}
                    </div>
                </div>
            ) : null}

            {user && (
                <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                    <button onClick={handleEditClick} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-sm active:scale-95">Chỉnh sửa nội dung</button>
                </div>
            )}
        </>
      ) : (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-xl font-bold text-indigo-700">Chỉnh sửa bài học</h2>
                <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">✕ Hủy bỏ</button>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề bài học</label>
                <input type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none" value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung lý thuyết (HTML)</label>
                <textarea rows={10} className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm" value={editForm.content} onChange={(e) => setEditForm({...editForm, content: e.target.value})} />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="has_code" checked={editForm.has_code} onChange={(e) => setEditForm({...editForm, has_code: e.target.checked})} className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300 cursor-pointer" />
                    <label htmlFor="has_code" className="text-sm font-bold text-gray-700 select-none cursor-pointer">Có ví dụ code minh họa ({lang.toUpperCase()})?</label>
                </div>
                {editForm.has_code && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-200 space-y-4 pl-6 border-l-2 border-indigo-200">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Đoạn mã nguồn</label>
                            <textarea rows={6} className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm bg-slate-900 text-slate-100" value={editForm.code_content} onChange={(e) => setEditForm({...editForm, code_content: e.target.value})} placeholder="// Nhập code ví dụ tại đây..." />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Giải thích code</label>
                            <input type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none text-sm" value={editForm.explanation} onChange={(e) => setEditForm({...editForm, explanation: e.target.value})} placeholder="Giải thích ngắn gọn..." />
                        </div>
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