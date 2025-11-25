import Lesson from "../models/Lesson.js";
import Chapter from "../models/Chapter.js";
import CodeExample from "../models/CodeExample.js";
import KnowledgeType from "../models/KnowledgeType.js"; 

// 1. Lấy Cây kiến thức (Sidebar Tree)
export const getKnowledgeTree = async (req, res) => {
  try {
    // Lấy tất cả chương, sắp xếp theo thứ tự (order)
    const chapters = await Chapter.find().sort({ order: 1 }).lean();

    // Lấy tất cả bài học, chỉ lấy các trường cần thiết để nhẹ gánh
    const lessons = await Lesson.find()
    .select("title slug chapter").lean()
    .populate("knowledge_type", "slug")
    .lean();

    // Ghép bài học vào chương tương ứng
    const treeData = chapters.map((chapter) => {
      const chapterLessons = lessons.filter(
        (lesson) => lesson.chapter.toString() === chapter._id.toString()
      );

      return {
        id: chapter._id,
        title: chapter.title,
        children: chapterLessons.map((l) => ({
          id: l._id,
          title: l.title,
          slug: l.slug,
          type: l.knowledge_type ? l.knowledge_type.slug : "" 
        })),
      };
    });

    res.status(200).json(treeData);
  } catch (error) {
    console.error("Error getting knowledge tree:", error);
    res.status(500).json({ message: "Lỗi Server khi lấy cây kiến thức" });
  }
};

// 2. Lấy chi tiết bài học theo Slug + Ngôn ngữ
// API: /api/lessons/:slug?lang=cpp
export const getLessonDetail = async (req, res) => {
  try {
    const { slug } = req.params;
    const lang = req.query.lang || "cpp"; // Mặc định là C++ nếu không truyền

    // Tìm bài học
    const lesson = await Lesson.findOne({ slug })
    .populate("chapter", "title")
    .populate("knowledge_type", "name");

    if (!lesson) {
      return res.status(404).json({ message: "Không tìm thấy bài học" });
    }

    // Tăng lượt xem (View count)
    await lesson.save();

    // Tìm ví dụ code tương ứng với ngôn ngữ được chọn
    const codeExample = await CodeExample.findOne({
      lesson: lesson._id,
      language: lang,
    });

    // Trả về dữ liệu gộp
    res.status(200).json({
      ...lesson.toObject(), // Convert mongoose doc to JS object
      code_example: codeExample || null, // Nếu chưa có code ngôn ngữ này thì trả về null
    });
  } catch (error) {
    console.error("Error getting lesson detail:", error);
    res.status(500).json({ message: "Lỗi Server khi lấy chi tiết bài học" });
  }
};

// 3. Tìm kiếm bài học
// API: /api/lessons/search?q=ke+thua
export const searchLessons = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Vui lòng nhập từ khóa" });
    }

    // Tìm kiếm theo tiêu đề hoặc nội dung (Regex - không phân biệt hoa thường)
    const results = await Lesson.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ],
    })
      .select("title slug views") // Chỉ lấy field cần hiển thị ở kết quả tìm kiếm
      .limit(10); // Giới hạn 10 kết quả

    res.status(200).json(results);
  } catch (error) {
    console.error("Error searching lessons:", error);
    res.status(500).json({ message: "Lỗi Server khi tìm kiếm" });
  }
};

// 4. Cập nhật bài học (Update Lesson) - ĐÃ NÂNG CẤP LOGIC
export const updateLesson = async (req, res) => {
  try {
    const { id } = req.params; // ID của Lesson
    const { title, content, code_content, explanation, has_code, lang } = req.body;

    // 1. Cập nhật nội dung bài học (Tiêu đề, Nội dung HTML)
    const updatedLesson = await Lesson.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedLesson) {
      return res.status(404).json({ message: "Không tìm thấy bài học" });
    }

    // 2. Xử lý Code Example (Dùng Lesson ID + Language làm khóa chính)
    if (has_code === true) {
        await CodeExample.findOneAndUpdate(
            { lesson: id, language: lang }, // Điều kiện tìm
            { code_content, explanation },  // Dữ liệu update
            { upsert: true, new: true }     // Tùy chọn: tạo mới nếu ko tìm thấy
        );
    } else {
        // Bỏ code example
        await CodeExample.findOneAndDelete({ lesson: id, language: lang });
    }

    res.status(200).json({ message: "Cập nhật thành công!", lesson: updatedLesson });

  } catch (error) {
    console.error("Error updating lesson:", error);
    res.status(500).json({ message: "Lỗi Server khi cập nhật: " + error.message });
  }
};