import React, { useState, useEffect } from 'react';
import API from "@/lib/axios";
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const KnowledgeTree = ({ onSelectLesson, filters = [] }) => {
  const { isAdmin } = useAuth(); // Lấy trạng thái Admin
  const [transformedData, setTransformedData] = useState([]);
  const [originalChapters, setOriginalChapters] = useState([]); // Lưu data gốc để đếm số chương
  const [expandedNodes, setExpandedNodes] = useState([]);
  const [activeNode, setActiveNode] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const KNOWLEDGE_ROOTS = [
    { id: 'khai-niem', label: 'KHÁI NIỆM, ĐỊNH NGHĨA' },
    { id: 'tinh-chat', label: 'TÍNH CHẤT' },
    { id: 'dang-bai-tap', label: 'DẠNG BÀI TẬP' },
    { id: 'phuong-phap', label: 'PHƯƠNG PHÁP GIẢI' }
  ];

  useEffect(() => {
    const fetchAndTransformData = async () => {
      try {
        const res = await API.get('/lesson/tree');
        const originalData = res.data;
        setOriginalChapters(originalData); // Lưu lại để dùng khi thêm chương

        const newStructure = KNOWLEDGE_ROOTS.map(rootType => {
          const chaptersWithMatchingLessons = originalData.map(chapter => {
            // Lọc bài học theo loại
            const matchingLessons = chapter.children.filter(lesson => lesson.type === rootType.id);
            
            // Nếu chương không có bài học nào VÀ không phải Admin -> Ẩn chương đó
            if (matchingLessons.length === 0 && !isAdmin) {
                return null;
            }

            return {
              ...chapter,
              id: `${rootType.id}-${chapter.id}`,
              originalChapterId: chapter.id, 
              children: matchingLessons
            };
          }).filter(Boolean);

          return {
            id: rootType.id,
            title: rootType.label,
            children: chaptersWithMatchingLessons,
            isRoot: true
          };
        });

        setTransformedData(newStructure);
        
        // Mặc định mở hết các folder gốc nếu chưa mở
        if (expandedNodes.length === 0) {
            setExpandedNodes(KNOWLEDGE_ROOTS.map(k => k.id));
        }
        setLoading(false);

      } catch (error) {
        console.error("Lỗi xử lý cây kiến thức:", error);
        setLoading(false);
      }
    };

    fetchAndTransformData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey, isAdmin]);

  const toggleNode = (id) => {
    if (expandedNodes.includes(id)) {
      setExpandedNodes(expandedNodes.filter(nodeId => nodeId !== id));
    } else {
      setExpandedNodes([...expandedNodes, id]);
    }
  };

  // --- 1. XỬ LÝ THÊM CHƯƠNG (MỚI) ---
  const handleAddChapter = async (e) => {
    e.stopPropagation();
    const title = window.prompt("Nhập tên CHƯƠNG mới (Ví dụ: CHƯƠNG 8: DESIGN PATTERN):");
    if (!title) return;

    try {
        // Tự động tính order để chương mới nằm cuối cùng
        const newOrder = originalChapters.length + 1;
        
        await API.post('/chapter', {
            title: title,
            order: newOrder
        });
        toast.success("Đã thêm chương mới!");
        setRefreshKey(prev => prev + 1);
    } catch (error) {
        toast.error("Lỗi thêm chương: " + (error.response?.data?.message || error.message));
    }
  };

  // --- 2. XỬ LÝ XÓA CHƯƠNG (MỚI) ---
  const handleDeleteChapter = async (e, chapterId, chapterTitle) => {
    e.stopPropagation();
    // Cảnh báo kỹ hơn vì xóa chương có thể ảnh hưởng bài học (tùy backend config)
    if (!window.confirm(`CẢNH BÁO: Bạn có chắc muốn xóa "${chapterTitle}"?\nNếu xóa, các bài học trong chương này cũng có thể bị mất hoặc ẩn đi.`)) return;

    try {
        await API.delete(`/chapter/${chapterId}`);
        toast.success("Đã xóa chương!");
        setRefreshKey(prev => prev + 1);
    } catch (error) {
        toast.error("Lỗi xóa chương: " + (error.response?.data?.message || error.message));
    }
  };

  // --- 3. XỬ LÝ THÊM BÀI HỌC (ĐÃ CÓ) ---
  const handleAddLesson = async (e, chapterId, rootSlug) => {
    e.stopPropagation();
    const title = window.prompt("Nhập tên BÀI HỌC mới:");
    if (!title) return;

    try {
        await API.post('/lesson', {
            title: title,
            chapter_id: chapterId,
            knowledge_type_slug: rootSlug
        });
        toast.success("Đã thêm bài học!");
        setRefreshKey(prev => prev + 1);
    } catch (error) {
        toast.error("Lỗi: " + error.response?.data?.message);
    }
  };

  // --- 4. XỬ LÝ XÓA BÀI HỌC (ĐÃ CÓ) ---
  const handleDeleteLesson = async (e, lessonId, lessonTitle) => {
    e.stopPropagation();
    if (!window.confirm(`Xóa bài "${lessonTitle}"?`)) return;

    try {
        await API.delete(`/lesson/${lessonId}`);
        toast.success("Đã xóa bài học!");
        setRefreshKey(prev => prev + 1);
        if (activeNode === lessonId) onSelectLesson('');
    } catch (error) {
        toast.error("Lỗi xóa: " + error.message);
    }
  };

  if (loading) return <div className="p-4 text-gray-500 text-sm italic">Đang tải cấu trúc...</div>;

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col sticky top-24 max-h-[calc(100vh-120px)]">

      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 shrink-0 flex justify-between items-center">
        <h2 className="font-bold text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          Cây kiến thức
        </h2>
        
        {/* Nút Thêm Chương (Chỉ Admin) */}
        {isAdmin && (
            <button 
                onClick={handleAddChapter}
                className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-1"
                title="Thêm chương mới"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                Chương
            </button>
        )}
      </div>

      {/* Body Scrollable */}
      <div className="p-2 overflow-y-auto custom-scrollbar flex-1">
        {transformedData.map((rootFolder) => {
          const isRootExpanded = expandedNodes.includes(rootFolder.id);
          const isVisible = filters.length === 0 || filters.includes(rootFolder.id);

          if (!isVisible) return null;

          return (
            <div key={rootFolder.id} className="mb-2 border-b border-gray-100 last:border-0 pb-2">

              {/* 1. FOLDER GỐC (Loại kiến thức) */}
              <button
                onClick={() => toggleNode(rootFolder.id)}
                className="w-full flex items-center gap-2 px-2 py-2 text-left hover:bg-blue-50 rounded-lg transition-colors group"
              >
                <span className={`text-gray-400 transition-transform duration-200 ${isRootExpanded ? 'rotate-90' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                </span>
                <span className="text-green-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                </span>
                <span className="font-bold text-sm text-green-800 uppercase">
                  {rootFolder.title}
                </span>
              </button>

              {/* 2. DANH SÁCH CHƯƠNG */}
              {isRootExpanded && (
                <div className="ml-3 pl-2 border-l border-gray-200 mt-1 space-y-1">
                  
                  {rootFolder.children.length === 0 && (
                    <div className="text-xs text-gray-400 italic pl-4 py-1">Chưa có dữ liệu</div>
                  )}

                  {rootFolder.children.map(chapter => {
                    const isChapterExpanded = expandedNodes.includes(chapter.id);
                    return (
                      <div key={chapter.id}>
                        {/* Wrapper div cho Chương + Nút Action */}
                        <div className="flex items-center justify-between hover:bg-gray-100 rounded transition-colors pr-2 group/chapter">
                            <button
                              onClick={() => toggleNode(chapter.id)}
                              className="flex-1 flex items-center gap-2 px-2 py-1.5 text-left"
                            >
                              <span className={`text-gray-400 transition-transform duration-200 ${isChapterExpanded ? 'rotate-90' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                              </span>
                              <span className="text-yellow-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                              </span>
                              <span className="font-semibold text-xs text-gray-700">{chapter.title}</span>
                            </button>

                            {/* --- ADMIN ACTION BUTTONS CHO CHƯƠNG --- */}
                            {isAdmin && (
                                <div className="flex items-center gap-1 opacity-0 group-hover/chapter:opacity-100 transition-opacity">
                                    {/* Nút Thêm bài vào chương */}
                                    <button 
                                        onClick={(e) => handleAddLesson(e, chapter.originalChapterId, rootFolder.id)}
                                        className="p-1 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                                        title="Thêm bài học mới vào chương này"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                    </button>
                                    
                                    {/* Nút Xóa chương */}
                                    <button 
                                        onClick={(e) => handleDeleteChapter(e, chapter.originalChapterId, chapter.title)}
                                        className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                                        title="Xóa chương này"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* 3. BÀI HỌC */}
                        {isChapterExpanded && (
                          <div className="ml-4 pl-2 border-l border-gray-200 mt-1 space-y-1">
                            {chapter.children.length === 0 && <div className="text-xs text-gray-400 italic pl-6 py-1">Chưa có bài học</div>}
                            
                            {chapter.children.map(lesson => (
                              // Wrapper div cho Bài học + Nút Delete
                              <div key={lesson.id} className={`flex items-center justify-between rounded group/lesson pr-2 transition-colors ${activeNode === lesson.id ? 'bg-blue-100' : 'hover:bg-gray-50'}`}>
                                  <button
                                    onClick={() => {
                                      setActiveNode(lesson.id);
                                      if (onSelectLesson) onSelectLesson(lesson.slug);
                                    }}
                                    className={`flex-1 flex items-center gap-2 px-2 py-1.5 text-xs text-left ${activeNode === lesson.id ? 'text-blue-700 font-medium' : 'text-gray-600'}`}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 shrink-0 ${activeNode === lesson.id ? 'text-blue-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    <span className="truncate">{lesson.title}</span>
                                  </button>

                                  {/* Nút (x) Xóa bài học - Chỉ hiện khi Admin hover */}
                                  {isAdmin && (
                                    <button 
                                        onClick={(e) => handleDeleteLesson(e, lesson.id, lesson.title)}
                                        className="p-1 text-red-300 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover/lesson:opacity-100 transition-opacity"
                                        title="Xóa bài học này"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                    </button>
                                  )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KnowledgeTree;