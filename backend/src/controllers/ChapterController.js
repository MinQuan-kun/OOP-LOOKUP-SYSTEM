import Chapter from "../models/Chapter.js";
import Lesson from "../models/Lesson.js";
// 1. Tạo Chương mới
export const createChapter = async (req, res) => {
  try {
    const { title, order } = req.body;
    const newChapter = await Chapter.create({ title, order });
    res.status(201).json(newChapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 2. Xóa Chương
export const deleteChapter = async (req, res) => {
  try {
    const { id } = req.params;
// Đếm số bài học thuộc chương này
    const lessonCount = await Lesson.countDocuments({ chapter: id });

    if (lessonCount > 0) {
// Nếu còn bài học, trả về lỗi 400 và thông báo
      return res.status(400).json({ 
        message: `Không thể xóa! Chương này đang chứa ${lessonCount} bài học. Vui lòng xóa hoặc di chuyển các bài học trước.` 
      });
    }

    await Chapter.findByIdAndDelete(id);
    
    res.status(200).json({ message: "Đã xóa chương thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};