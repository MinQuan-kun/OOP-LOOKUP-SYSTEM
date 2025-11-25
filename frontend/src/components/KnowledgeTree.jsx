import React, { useState, useEffect } from 'react';
import API from "@/lib/axios";

const KnowledgeTree = ({ onSelectLesson, filters = [] }) => {
  const [transformedData, setTransformedData] = useState([]); // Dữ liệu đã sắp xếp lại
  const [expandedNodes, setExpandedNodes] = useState([]);     // Danh sách ID các folder đang mở
  const [activeNode, setActiveNode] = useState('');           // Bài học đang chọn
  const [loading, setLoading] = useState(true);

  // Định nghĩa 4 thư mục gốc (ID phải khớp với slug trong Database)
  const KNOWLEDGE_ROOTS = [
    { id: 'khai-niem', label: 'KHÁI NIỆM, ĐỊNH NGHĨA' },
    { id: 'tinh-chat', label: 'TÍNH CHẤT' },
    { id: 'dang-bai-tap', label: 'DẠNG BÀI TẬP' },
    { id: 'phuong-phap', label: 'PHƯƠNG PHÁP GIẢI' }
  ];

  useEffect(() => {
    const fetchAndTransformData = async () => {
      try {
        // Gọi API lấy danh sách bài học (đang nhóm theo Chương)
        const res = await API.get('/lesson/tree');
        const originalData = res.data;

        // --- THUẬT TOÁN ĐẢO NGƯỢC CẤU TRÚC ---
        // Mục tiêu: Tạo ra 4 folder gốc -> Trong mỗi folder có các Chương -> Trong Chương có Bài học thuộc loại đó
        const newStructure = KNOWLEDGE_ROOTS.map(rootType => {

          // Duyệt qua tất cả các chương từ dữ liệu gốc
          const chaptersWithMatchingLessons = originalData.map(chapter => {
            // Lọc lấy các bài học có 'type' trùng với 'rootType.id'
            const matchingLessons = chapter.children.filter(lesson => lesson.type === rootType.id);

            if (matchingLessons.length === 0) return null; // Nếu chương này không có bài nào thuộc loại này thì bỏ qua

            return {
              ...chapter,
              // Tạo ID giả để không bị trùng lặp (VD: khai-niem-chuong1)
              id: `${rootType.id}-${chapter.id}`,
              children: matchingLessons
            };
          }).filter(Boolean); // Loại bỏ các giá trị null

          return {
            id: rootType.id,
            title: rootType.label,
            children: chaptersWithMatchingLessons,
            isRoot: true
          };
        });

        setTransformedData(newStructure);

        // Mặc định mở tất cả 4 folder gốc để người dùng thấy
        setExpandedNodes(KNOWLEDGE_ROOTS.map(k => k.id));
        setLoading(false);

      } catch (error) {
        console.error("Lỗi xử lý cây kiến thức:", error);
        setLoading(false);
      }
    };

    fetchAndTransformData();
  }, []);

  // Hàm đóng mở folder
  const toggleNode = (id) => {
    if (expandedNodes.includes(id)) {
      setExpandedNodes(expandedNodes.filter(nodeId => nodeId !== id));
    } else {
      setExpandedNodes([...expandedNodes, id]);
    }
  };

  if (loading) return <div className="p-4 text-gray-500 text-sm italic">Đang tải cấu trúc...</div>;

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col sticky top-24 max-h-[calc(100vh-120px)]">

      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 shrink-0">
        <h2 className="font-bold text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          Cây kiến thức
        </h2>
      </div>

      {/* Body Scrollable */}
      <div className="p-2 overflow-y-auto custom-scrollbar flex-1">
        {transformedData.map((rootFolder) => {
          const isRootExpanded = expandedNodes.includes(rootFolder.id);

          // LOGIC HIỂN THỊ: Nếu không chọn filter nào (length=0) -> Hiện hết
          // Nếu có chọn -> Chỉ hiện folder trùng ID
          const isVisible = filters.length === 0 || filters.includes(rootFolder.id);

          if (!isVisible) return null;

          return (
            <div key={rootFolder.id} className="mb-2 border-b border-gray-100 last:border-0 pb-2">

              {/* 1. FOLDER GỐC (CẤP 1) - VD: KHÁI NIỆM */}
              <button
                onClick={() => toggleNode(rootFolder.id)}
                className="w-full flex items-center gap-2 px-2 py-2 text-left hover:bg-blue-50 rounded-lg transition-colors group"
              >
                {/* Mũi tên */}
                <span className={`text-gray-400 transition-transform duration-200 ${isRootExpanded ? 'rotate-90' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                </span>
                {/* Icon Folder Màu */}
                <span className="text-green-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                </span>
                <span className="font-bold text-sm text-green-800 uppercase">
                  {rootFolder.title}
                </span>
              </button>

              {/* 2. DANH SÁCH CHƯƠNG (CẤP 2) */}
              {isRootExpanded && (
                <div className="ml-3 pl-2 border-l border-gray-200 mt-1 space-y-1">
                  {rootFolder.children.length === 0 && (
                    <div className="text-xs text-gray-400 italic pl-4 py-1">Không có bài học</div>
                  )}

                  {rootFolder.children.map(chapter => {
                    const isChapterExpanded = expandedNodes.includes(chapter.id);
                    return (
                      <div key={chapter.id}>
                        <button
                          onClick={() => toggleNode(chapter.id)}
                          className="w-full flex items-center gap-2 px-2 py-1.5 text-left hover:bg-gray-100 rounded transition-colors"
                        >
                          <span className={`text-gray-400 transition-transform duration-200 ${isChapterExpanded ? 'rotate-90' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                          </span>
                          <span className="text-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                          </span>
                          <span className="font-semibold text-xs text-gray-700">{chapter.title}</span>
                        </button>

                        {/* 3. BÀI HỌC (CẤP 3) */}
                        {isChapterExpanded && (
                          <div className="ml-4 pl-2 border-l border-gray-200 mt-1 space-y-1">
                            {chapter.children.map(lesson => (
                              <button
                                key={lesson.id}
                                onClick={() => {
                                  setActiveNode(lesson.id);
                                  if (onSelectLesson) onSelectLesson(lesson.slug);
                                }}
                                className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded transition-all text-left ${activeNode === lesson.id ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 shrink-0 ${activeNode === lesson.id ? 'text-blue-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                <span className="truncate">{lesson.title}</span>
                              </button>
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