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

// 4. Cập nhật bài học (Update Lesson)
export const updateLesson = async (req, res) => {
  try {
    const { id } = req.params; 
    // 1. Lấy thêm syntax_note và is_supported từ request
    const { 
      title, 
      content, 
      code_content, 
      explanation, 
      has_code, 
      lang,
      syntax_note,   
      is_supported   
    } = req.body;

    // Cập nhật nội dung bài học (Tiêu đề, Nội dung HTML)
    const updatedLesson = await Lesson.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedLesson) {
      return res.status(404).json({ message: "Không tìm thấy bài học" });
    }

    // 2. Xử lý Code Example 
    if (has_code === true) {
        await CodeExample.findOneAndUpdate(
            { lesson: id, language: lang }, 
            { 
              code_content, 
              explanation,
              // 3. Cập nhật thêm 2 trường này vào Database
              syntax_note: syntax_note || "", 
              is_supported: is_supported 
            },  
            { upsert: true, new: true }     
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

// 5. Tạo bài học mới (Create Lesson)
export const createLesson = async (req, res) => {
  try {
    const { title, chapter_id, knowledge_type_slug } = req.body;

    // 1. Tìm KnowledgeType ID từ slug (vd: 'khai-niem' -> ObjectId)
    const kType = await KnowledgeType.findOne({ slug: knowledge_type_slug });
    if (!kType) return res.status(400).json({ message: "Loại kiến thức không hợp lệ" });

    // 2. Tạo Slug từ Title (Tiếng Việt có dấu -> Slug không dấu)
    // Vd: "Bài học mới" -> "bai-hoc-moi"
    const generateSlug = (str) => {
      return str
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/([^0-9a-z-\s])/g, "")
        .replace(/(\s+)/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
    };
    
    // Thêm timestamp để tránh trùng slug
    const slug = generateSlug(title) + "-" + Date.now();

    // 3. Tạo bài học
    const newLesson = await Lesson.create({
      title,
      slug,
      chapter: chapter_id,
      knowledge_type: kType._id,
      content: "<p>Nội dung mới đang cập nhật...</p>" // Nội dung mặc định
    });

    res.status(201).json(newLesson);
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: error.message });
  }
};

// --- 6. XÓA BÀI HỌC ---
export const deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;
    await Lesson.findByIdAndDelete(id);
    // Xóa luôn Code Example liên quan (nếu có)
    await CodeExample.deleteMany({ lesson: id });
    
    res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: error.message });
  }
};