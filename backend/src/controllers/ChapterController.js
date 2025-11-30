import Chapter from "../models/Chapter.js";
import Lesson from "../models/Lesson.js"; // Import nếu muốn xóa cascade (xóa chương -> xóa bài)

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
    await Chapter.findByIdAndDelete(id);
    
    // (Tùy chọn) Xóa luôn các bài học thuộc chương này để sạch database
    // await Lesson.deleteMany({ chapter: id });

    res.status(200).json({ message: "Đã xóa chương" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};