import React, { useState, useEffect } from 'react';
import API from "@/lib/axios";
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const KnowledgeTree = ({ onSelectLesson, filters = [] }) => {
  const { isAdmin } = useAuth();
  const [transformedData, setTransformedData] = useState([]);
  const [originalChapters, setOriginalChapters] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState([]);
  const [activeNode, setActiveNode] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // 1 Hộp thoại xóa  
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    type: null,
    id: null,
    title: ''
  });

  // 2 Hộp thoại thêm  
  const [addModal, setAddModal] = useState({
    isOpen: false,
    type: null,
    title: '',
    chapterId: null,
    rootSlug: null
  });

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
        setOriginalChapters(originalData);

        const newStructure = KNOWLEDGE_ROOTS.map(rootType => {
          const chaptersWithMatchingLessons = originalData.map(chapter => {
            const matchingLessons = chapter.children.filter(lesson => lesson.type === rootType.id);
            if (matchingLessons.length === 0 && !isAdmin) return null;

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
        if (expandedNodes.length === 0) setExpandedNodes(KNOWLEDGE_ROOTS.map(k => k.id));
        setLoading(false);
      } catch (error) {
        console.error("Lỗi xử lý cây kiến thức:", error);
        setLoading(false);
      }
    };
    fetchAndTransformData();
  }, [refreshKey, isAdmin]);

  const toggleNode = (id) => {
    if (expandedNodes.includes(id)) {
      setExpandedNodes(expandedNodes.filter(nodeId => nodeId !== id));
    } else {
      setExpandedNodes([...expandedNodes, id]);
    }
  };

  //  3. Các hàm mở model thêm
  const openAddChapterModal = (e) => {
    e.stopPropagation();
    setAddModal({
      isOpen: true,
      type: 'chapter',
      title: '',
      chapterId: null,
      rootSlug: null
    });
  };

  const openAddLessonModal = (e, chapterId, rootSlug) => {
    e.stopPropagation();
    setAddModal({
      isOpen: true,
      type: 'lesson',
      title: '',
      chapterId: chapterId,
      rootSlug: rootSlug
    });
  };

  //  4. Hàm thực thi thêm
  const executeAdd = async () => {
    if (!addModal.title.trim()) {
      toast.error("Vui lòng nhập tên!");
      return;
    }

    const isChapter = addModal.type === 'chapter';

    // Tạo promise request
    const addPromise = isChapter
      ? API.post('/chapter', { title: addModal.title, order: originalChapters.length + 1 })
      : API.post('/lesson', { title: addModal.title, chapter_id: addModal.chapterId, knowledge_type_slug: addModal.rootSlug });

    // Hiển thị toast loading -> success/error
    toast.promise(addPromise, {
      loading: 'Đang thêm mới...',
      success: isChapter ? 'Đã thêm chương mới!' : 'Đã thêm bài học!',
      error: (err) => `Lỗi: ${err.response?.data?.message || err.message}`
    });

    try {
      await addPromise;
      setRefreshKey(prev => prev + 1);
      setAddModal({ ...addModal, isOpen: false });
    } catch (error) {
      // Lỗi đã được toast xử lý
    }
  };

  // --- Hàm Xóa ---
  const openDeleteModal = (e, type, id, title) => {
    e.stopPropagation();
    setDeleteModal({ isOpen: true, type, id, title });
  };

  // 5. Hàm thực thi Xóa
  const executeDelete = async () => {
    const isChapter = deleteModal.type === 'chapter';

    // Tạo promise xóa
    const deletePromise = isChapter
      ? API.delete(`/chapter/${deleteModal.id}`)
      : API.delete(`/lesson/${deleteModal.id}`);

    // Hiển thị toast thông minh
    toast.promise(deletePromise, {
      loading: isChapter ? 'Đang xóa chương...' : 'Đang xóa bài học...',
      success: isChapter ? 'Đã xóa chương!' : 'Đã xóa bài học!',
      error: (err) => `Xóa thất bại: ${err.response?.data?.message || err.message}`
    });

    try {
      await deletePromise;

      // Nếu xóa bài đang xem thì reset view
      if (!isChapter && activeNode === deleteModal.id) {
        if (onSelectLesson) onSelectLesson('');
      }

      setRefreshKey(prev => prev + 1);
      setDeleteModal({ ...deleteModal, isOpen: false });

    } catch (error) {
      setDeleteModal({ ...deleteModal, isOpen: false });
    }
  };

  if (loading) return <div className="p-4 text-gray-500 text-sm italic">Đang tải cấu trúc...</div>;

  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col sticky top-24 max-h-[calc(100vh-120px)]">
        {/* Header */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 shrink-0 flex justify-between items-center">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            Cây kiến thức
          </h2>
          {isAdmin && (
            <button onClick={openAddChapterModal} className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-1" title="Thêm chương mới">
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
                <button onClick={() => toggleNode(rootFolder.id)} className="w-full flex items-center gap-2 px-2 py-2 text-left hover:bg-blue-50 rounded-lg transition-colors group">
                  <span className={`text-gray-400 transition-transform duration-200 ${isRootExpanded ? 'rotate-90' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                  </span>
                  <span className="text-green-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  </span>
                  <span className="font-bold text-sm text-green-800 uppercase">{rootFolder.title}</span>
                </button>

                {isRootExpanded && (
                  <div className="ml-3 pl-2 border-l border-gray-200 mt-1 space-y-1">
                    {rootFolder.children.length === 0 && <div className="text-xs text-gray-400 italic pl-4 py-1">Chưa có dữ liệu</div>}

                    {rootFolder.children.map(chapter => {
                      const isChapterExpanded = expandedNodes.includes(chapter.id);
                      return (
                        <div key={chapter.id}>
                          <div className="flex items-center justify-between hover:bg-gray-100 rounded transition-colors pr-2 group/chapter">
                            <button onClick={() => toggleNode(chapter.id)} className="flex-1 flex items-center gap-2 px-2 py-1.5 text-left">
                              <span className={`text-gray-400 transition-transform duration-200 ${isChapterExpanded ? 'rotate-90' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                              </span>
                              <span className="text-yellow-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                              </span>
                              <span className="font-semibold text-xs text-gray-700">{chapter.title}</span>
                            </button>

                            {isAdmin && (
                              <div className="flex items-center gap-1 opacity-0 group-hover/chapter:opacity-100 transition-opacity">
                                <button onClick={(e) => openAddLessonModal(e, chapter.originalChapterId, rootFolder.id)} className="p-1 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded" title="Thêm bài">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                </button>
                                <button onClick={(e) => openDeleteModal(e, 'chapter', chapter.originalChapterId, chapter.title)} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded" title="Xóa chương">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                </button>
                              </div>
                            )}
                          </div>

                          {isChapterExpanded && (
                            <div className="ml-4 pl-2 border-l border-gray-200 mt-1 space-y-1">
                              {chapter.children.length === 0 && <div className="text-xs text-gray-400 italic pl-6 py-1">Chưa có bài học</div>}
                              {chapter.children.map(lesson => (
                                <div key={lesson.id} className={`flex items-center justify-between rounded group/lesson pr-2 transition-colors ${activeNode === lesson.id ? 'bg-blue-100' : 'hover:bg-gray-50'}`}>
                                  <button onClick={() => { setActiveNode(lesson.id); if (onSelectLesson) onSelectLesson(lesson.slug); }} className={`flex-1 flex items-center gap-2 px-2 py-1.5 text-xs text-left ${activeNode === lesson.id ? 'text-blue-700 font-medium' : 'text-gray-600'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 shrink-0 ${activeNode === lesson.id ? 'text-blue-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    <span className="truncate">{lesson.title}</span>
                                  </button>
                                  {isAdmin && (
                                    <button onClick={(e) => openDeleteModal(e, 'lesson', lesson.id, lesson.title)} className="p-1 text-red-300 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover/lesson:opacity-100 transition-opacity" title="Xóa bài học">
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

      <Dialog open={deleteModal.isOpen} onOpenChange={(open) => setDeleteModal({ ...deleteModal, isOpen: open })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              Xác nhận xóa
            </DialogTitle>
            <DialogDescription className="pt-2">
              Bạn có chắc chắn muốn xóa <strong>{deleteModal.title}</strong>?
              {deleteModal.type === 'chapter' && (
                <span className="block mt-3 p-3 bg-amber-50 text-amber-800 text-sm rounded-md border border-amber-200">
                  ⚠️ <strong>Lưu ý:</strong> Nếu chương này đang chứa bài học, hệ thống sẽ ngăn chặn việc xóa.
                </span>
              )}
              {deleteModal.type === 'lesson' && <span className="block mt-2 text-gray-500">Hành động này không thể hoàn tác.</span>}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-end mt-4">
            <Button type="button" variant="secondary" onClick={() => setDeleteModal({ ...deleteModal, isOpen: false })}>Hủy bỏ</Button>
            <Button type="button" variant="destructive" onClick={executeDelete}>Xác nhận xóa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Dialog thêm --- */}
      <Dialog open={addModal.isOpen} onOpenChange={(open) => setAddModal({ ...addModal, isOpen: open })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-blue-700 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {addModal.type === 'chapter' ? 'Thêm Chương Mới' : 'Thêm Bài Học Mới'}
            </DialogTitle>
            <DialogDescription>
              Nhập tên cho {addModal.type === 'chapter' ? 'chương' : 'bài học'} mới của bạn.
            </DialogDescription>
          </DialogHeader>

          <div className="py-2">
            <Input
              value={addModal.title}
              onChange={(e) => setAddModal({ ...addModal, title: e.target.value })}
              placeholder={addModal.type === 'chapter' ? "Ví dụ: CHƯƠNG 8: Test" : "Nhập tên bài học..."}
              className="col-span-3 focus-visible:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') executeAdd();
              }}
              autoFocus
            />
          </div>

          <DialogFooter className="flex gap-2 sm:justify-end mt-2">
            <Button type="button" variant="secondary" onClick={() => setAddModal({ ...addModal, isOpen: false })}>
              Hủy bỏ
            </Button>
            <Button type="button" className="bg-blue-600 hover:bg-blue-700" onClick={executeAdd}>
              Thêm mới
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KnowledgeTree;