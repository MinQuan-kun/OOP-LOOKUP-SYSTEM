import Lesson from "../models/Lesson.js";
import Chapter from "../models/Chapter.js";
import CodeExample from "../models/CodeExample.js";
import KnowledgeType from "../models/KnowledgeType.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Khởi tạo model Embedding
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

// Hàm phụ trợ: Tạo Embedding từ văn bản
async function getEmbedding(text) {
  try {
    const result = await embeddingModel.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error("Lỗi tạo embedding:", error);
    return null;
  }
}

// 1. Lấy Cây kiến thức (GIỮ NGUYÊN)
export const getKnowledgeTree = async (req, res) => {
  // ... (Giữ nguyên code cũ của bạn) ...
  try {
    const chapters = await Chapter.find().sort({ order: 1 }).lean();
    const lessons = await Lesson.find()
      .select("title slug chapter knowledge_type")
      .lean() // Đã tối ưu select
      .populate("knowledge_type", "slug")
      .lean();

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
          type: l.knowledge_type ? l.knowledge_type.slug : "",
        })),
      };
    });
    res.status(200).json(treeData);
  } catch (error) {
    console.error("Error getting knowledge tree:", error);
    res.status(500).json({ message: "Lỗi Server khi lấy cây kiến thức" });
  }
};

// 2. Lấy chi tiết bài học (GIỮ NGUYÊN)
export const getLessonDetail = async (req, res) => {
  // ... (Giữ nguyên code cũ của bạn) ...
  try {
    const { slug } = req.params;
    const lang = req.query.lang || "cpp";

    const lesson = await Lesson.findOne({ slug })
      .populate("chapter", "title")
      .populate("knowledge_type", "name");

    if (!lesson)
      return res.status(404).json({ message: "Không tìm thấy bài học" });

    // Tăng view (nếu muốn)
    // lesson.views += 1;
    // await lesson.save();

    const codeExample = await CodeExample.findOne({
      lesson: lesson._id,
      language: lang,
    });

    res.status(200).json({
      ...lesson.toObject(),
      code_example: codeExample || null,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server khi lấy chi tiết" });
  }
};

// --- 3. TÌM KIẾM AI (VECTOR SEARCH) ---
export const searchLessons = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) return res.status(400).json({ message: "Vui lòng nhập từ khóa" });

    // Bước 1: Tạo Vector cho từ khóa tìm kiếm
    const queryVector = await getEmbedding(q);

    if (!queryVector) {
      // Fallback: Nếu AI lỗi, dùng tìm kiếm thường (Regex)
      const basicResults = await Lesson.find({
        $or: [
          { title: { $regex: q, $options: "i" } },
          { content: { $regex: q, $options: "i" } },
        ],
      })
        .select("title slug content chapter")
        .limit(5);
      return res.status(200).json(basicResults);
    }

    // Bước 2: Tìm kiếm Vector trên MongoDB Atlas
    const results = await Lesson.aggregate([
      {
        $vectorSearch: {
          index: "vector_index", // Tên Index bạn tạo trên Compass
          path: "embedding",
          queryVector: queryVector,
          numCandidates: 100,
          limit: 10,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          slug: 1,
          content: 1, // Lấy content để cắt snippet
          score: { $meta: "vectorSearchScore" }, // Điểm tương đồng
        },
      },
    ]);

    // Bước 3: Làm sạch kết quả trả về (cắt ngắn nội dung)
    const formattedResults = results.map((item) => {
      const cleanContent =
        item.content.replace(/<[^>]*>?/gm, " ").substring(0, 150) + "...";
      return {
        _id: item._id,
        title: item.title,
        slug: item.slug,
        snippet: cleanContent,
        score: item.score,
      };
    });

    res.status(200).json(formattedResults);
  } catch (error) {
    console.error("Error searching lessons:", error);
    res.status(500).json({ message: "Lỗi Server khi tìm kiếm" });
  }
};

// 4. Cập nhật bài học (CÓ TỰ ĐỘNG CẬP NHẬT VECTOR)
export const updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      code_content,
      explanation,
      has_code,
      lang,
      syntax_note,
      is_supported,
    } = req.body;

    // --- LOGIC AI MỚI ---
    // Tạo embedding mới dựa trên Title + Content mới
    const cleanText = `${title}. ${content.replace(
      /<[^>]*>?/gm,
      " "
    )}`.substring(0, 8000);
    const newEmbedding = await getEmbedding(cleanText);

    // Cập nhật Lesson kèm Embedding
    const updateData = { title, content };
    if (newEmbedding) {
      updateData.embedding = newEmbedding; // Lưu vector vào DB
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedLesson)
      return res.status(404).json({ message: "Không tìm thấy bài học" });

    // Xử lý Code Example (Giữ nguyên logic của bạn)
    if (has_code === true) {
      await CodeExample.findOneAndUpdate(
        { lesson: id, language: lang },
        {
          code_content,
          explanation,
          syntax_note: syntax_note || "",
          is_supported: is_supported,
        },
        { upsert: true, new: true }
      );
    } else {
      await CodeExample.findOneAndDelete({ lesson: id, language: lang });
    }

    res
      .status(200)
      .json({ message: "Cập nhật thành công!", lesson: updatedLesson });
  } catch (error) {
    console.error("Error updating lesson:", error);
    res.status(500).json({ message: "Lỗi Server: " + error.message });
  }
};

// 5. Tạo bài học mới (CÓ TỰ ĐỘNG TẠO VECTOR)
export const createLesson = async (req, res) => {
  try {
    const { title, chapter_id, knowledge_type_slug } = req.body;

    const kType = await KnowledgeType.findOne({ slug: knowledge_type_slug });
    if (!kType)
      return res.status(400).json({ message: "Loại kiến thức không hợp lệ" });

    const generateSlug = (str) => {
      return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/([^0-9a-z-\s])/g, "")
        .replace(/(\s+)/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
    };

    const slug = generateSlug(title) + "-" + Date.now();
    const defaultContent = "<p>Nội dung đang cập nhật...</p>";

    // --- LOGIC AI MỚI ---
    const textToEmbed = `${title}. Nội dung đang cập nhật`;
    const embedding = await getEmbedding(textToEmbed);

    const newLesson = await Lesson.create({
      title,
      slug,
      chapter: chapter_id,
      knowledge_type: kType._id,
      content: defaultContent,
      embedding: embedding || [], // Lưu vector ngay khi tạo
    });

    res.status(201).json(newLesson);
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: error.message });
  }
};

// 6. Xóa bài học (Giữ nguyên)
export const deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;
    await Lesson.findByIdAndDelete(id);
    await CodeExample.deleteMany({ lesson: id });
    res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
