import React, { useState } from 'react';

// TODO: Đang sử dụng dữ liệu giả, cần fix sau này
const treeData = [
  {
    id: 'c1',
    title: 'Chương 1: Giới thiệu OOP',
    children: [
      { id: 'bai1', title: '1.1 Khái niệm cơ bản' },
      { id: 'bai2', title: '1.2 Lịch sử phát triển' },
      { id: 'bai3', title: '1.3 Môi trường cài đặt' },
    ]
  },
  {
    id: 'c2',
    title: 'Chương 2: Các tính chất',
    children: [
      { id: 'bai4', title: '2.1 Tính đóng gói (Encapsulation)' },
      { id: 'bai5', title: '2.2 Tính kế thừa (Inheritance)' },
      { id: 'bai6', title: '2.3 Tính đa hình (Polymorphism)' },
      { id: 'bai7', title: '2.4 Tính trừu tượng (Abstraction)' },
    ]
  },
  {
    id: 'c3',
    title: 'Chương 3: Lớp và Đối tượng',
    children: [
      { id: 'bai8', title: '3.1 Định nghĩa Class' },
      { id: 'bai9', title: '3.2 Khởi tạo Object' },
      { id: 'bai10', title: '3.3 Constructor & Destructor' },
    ]
  },
];

const KnowledgeTree = () => {
  // State lưu các chương đang mở
  const [expandedNodes, setExpandedNodes] = useState(['c1', 'c2', 'c3']);
  // State lưu bài học đang chọn
  const [activeNode, setActiveNode] = useState('');

  // Xử lý đóng/mở thư mục
  const toggleNode = (id) => {
    if (expandedNodes.includes(id)) {
      setExpandedNodes(expandedNodes.filter(nodeId => nodeId !== id));
    } else {
      setExpandedNodes([...expandedNodes, id]);
    }
  };

  return (
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col sticky top-[250px] max-h-[calc(100vh-260px)]">
      
      {/* Header của Cây kiến thức */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 shrink-0">
        <h2 className="font-bold text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Cây kiến thức
        </h2>
      </div>

      {/* Danh sách cây (Có thanh cuộn riêng bên trong) */}
      <div className="p-2 overflow-y-auto custom-scrollbar flex-1">
        {treeData.map((chapter) => {
            const isExpanded = expandedNodes.includes(chapter.id);
            
            return (
              <div key={chapter.id} className="mb-2 last:mb-0">
                {/* Node Cha (Chương) */}
                <button 
                  onClick={() => toggleNode(chapter.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100 rounded-lg transition-colors group"
                >
                  {/* Icon mũi tên xoay */}
                  <span className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                     </svg>
                  </span>
                  
                  {/* Icon Folder */}
                  <span className="text-yellow-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                  </span>

                  <span className="font-semibold text-sm text-gray-700 group-hover:text-gray-900">
                    {chapter.title}
                  </span>
                </button>

                {/* Node Con (Bài học) */}
                {isExpanded && (
                  <div className="ml-4 pl-3 border-l border-gray-200 mt-1 space-y-1">
                    {chapter.children.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveNode(lesson.id)}
                        className={`
                          w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-all text-left
                          ${activeNode === lesson.id 
                            ? 'bg-blue-50 text-blue-700 font-medium' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }
                        `}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 shrink-0 ${activeNode === lesson.id ? 'text-blue-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="truncate">
                            {lesson.title}
                        </span>
                      </button>
                    ))}
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