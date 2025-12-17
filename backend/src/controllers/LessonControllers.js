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

// --- HÀM PHỤ TRỢ: TÍNH KHOẢNG CÁCH LEVENSHTEIN (Cho thuật toán A*) ---
const levenshteinDistance = (a, b) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  // Khởi tạo dòng đầu tiên và cột đầu tiên
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Điền ma trận
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // Thay thế
          Math.min(
            matrix[i][j - 1] + 1, // Chèn
            matrix[i - 1][j] + 1 // Xóa
          )
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

// 1. Lấy Cây kiến thức
export const getKnowledgeTree = async (req, res) => {
  try {
    const chapters = await Chapter.find().sort({ order: 1 }).lean();
    const lessons = await Lesson.find()
      .select("title slug chapter knowledge_type")
      .lean()
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

// 2. Lấy chi tiết bài học
export const getLessonDetail = async (req, res) => {
  try {
    const { slug } = req.params;
    const lang = req.query.lang || "cpp";

    const lesson = await Lesson.findOne({ slug })
      .populate("chapter", "title")
      .populate("knowledge_type", "name");

    if (!lesson)
      return res.status(404).json({ message: "Không tìm thấy bài học" });

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

// --- 3. TÌM KIẾM AI 
export const searchLessons = async (req, res) => {
  try {
    const { q } = req.query;
    // 1. Chặn từ khóa quá ngắn hoặc rỗng để tránh spam kết quả rác
    if (!q || q.trim().length < 2) {
      return res.status(200).json([]); // Trả về rỗng ngay
    }

    let results = [];

    // BƯỚC 1: Thử tìm bằng AI (Vector Search)
    try {
      const queryVector = await getEmbedding(q);
      
      if (queryVector) {
        const vectorResults = await Lesson.aggregate([
          {
            $vectorSearch: {
              index: "vector_index", 
              path: "embedding",
              queryVector: queryVector,
              numCandidates: 100,
              limit: 10,
            },
          },
          {
            $project: {
              _id: 1, title: 1, slug: 1, content: 1,
              score: { $meta: "vectorSearchScore" },
            },
          },
          // Chỉ lấy kết quả giống trên 75%. 
          { $match: { score: { $gt: 0.75 } } } 
        ]);

        if (vectorResults.length > 0) {
          results = vectorResults;
        }
      }
    } catch (vectorError) {

    }

    // BƯỚC 2: Nếu không ra gì, thử tìm chính xác (Regex)
    if (results.length === 0) {
      results = await Lesson.find({
        $or: [
          // Tìm chính xác cụm từ trong tiêu đề
          { title: { $regex: q, $options: "i" } }, 
          // Tìm trong nội dung
          { content: { $regex: q, $options: "i" } }
        ],
      })
      .select("title slug content")
      .limit(10)
      .lean();
    }

    // BƯỚC 3: Format kết quả
    const formattedResults = results.map((item) => {
      const plainText = item.content ? item.content.replace(/<[^>]*>?/gm, " ") : "";
      return {
        _id: item._id,
        title: item.title,
        slug: item.slug,
        snippet: plainText.substring(0, 100) + (plainText.length > 100 ? "..." : ""),
        score: item.score ? item.score.toFixed(2) : "Match", 
      };
    });

    res.status(200).json(formattedResults);

  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};

// --- 3.5. TÌM KIẾM HEURISTIC (A*) - Dùng cho Main Content ---
export const searchLessonsAStar = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "Vui lòng nhập từ khóa" });

    const keyword = q.toLowerCase();

    // Lấy dữ liệu thô (có thể lọc sơ bộ bằng regex để tối ưu hiệu năng nếu DB lớn)
    const candidates = await Lesson.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
      ],
    })
      .select("title slug content chapter")
      .lean();

    // Tính toán f(n) = g(n) + h(n)
    const rankedResults = candidates.map((lesson) => {
      const titleLower = lesson.title.toLowerCase();

      // g(n): Chi phí thực tế (Khoảng cách Levenshtein giữa keyword và title)
      const g_score = levenshteinDistance(keyword, titleLower);

      // h(n): Heuristic (Ước lượng độ phù hợp)
      let h_score = 0;

      const contentLower = lesson.content.toLowerCase();
      // Đếm số lần xuất hiện trong content
      const frequency = contentLower.split(keyword).length - 1;

      if (frequency > 0) h_score -= Math.min(frequency, 5) * 2; // Thưởng điểm xuất hiện
      if (Math.abs(titleLower.length - keyword.length) < 3) h_score -= 3; // Thưởng điểm độ dài gần khớp

      // f(n) cuối cùng
      const f_score = g_score + h_score;

      // Tạo snippet
      const cleanContent =
        lesson.content.replace(/<[^>]*>?/gm, " ").substring(0, 200) + "...";

      return {
        _id: lesson._id,
        title: lesson.title,
        slug: lesson.slug,
        snippet: cleanContent,
        score: f_score, // Score càng THẤP càng tốt
      };
    });

    // Sắp xếp theo f(n) tăng dần (Cost thấp nhất lên đầu)
    rankedResults.sort((a, b) => a.score - b.score);

    res.status(200).json(rankedResults.slice(0, 15)); // Lấy top 15 cho Main Content
  } catch (error) {
    console.error("Error A* searching:", error);
    res.status(500).json({ message: "Lỗi Server khi tìm kiếm A*" });
  }
};

// 4. Cập nhật bài học
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

    // Tạo embedding mới
    const cleanText = `${title}. ${content.replace(
      /<[^>]*>?/gm,
      " "
    )}`.substring(0, 8000);
    const newEmbedding = await getEmbedding(cleanText);

    const updateData = { title, content };
    if (newEmbedding) {
      updateData.embedding = newEmbedding;
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedLesson)
      return res.status(404).json({ message: "Không tìm thấy bài học" });

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

// 5. Tạo bài học mới
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

    const textToEmbed = `${title}. Nội dung đang cập nhật`;
    const embedding = await getEmbedding(textToEmbed);

    const newLesson = await Lesson.create({
      title,
      slug,
      chapter: chapter_id,
      knowledge_type: kType._id,
      content: defaultContent,
      embedding: embedding || [],
    });

    res.status(201).json(newLesson);
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: error.message });
  }
};

// 6. Xóa bài học
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
