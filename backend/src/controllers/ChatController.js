import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import Lesson from "../models/Lesson.js";
import CodeExample from "../models/CodeExample.js";

dotenv.config();

// Khởi tạo AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const embeddingModel = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

export const chatWithBot = async (req, res) => {
  try {
    const { message, history } = req.body;
    const userName = req.user ? req.user.username : "Bạn học";

    if (!message)
      return res.status(400).json({ reply: "Hỏi gì về OOP đi bạn ơi! 😿" });

    // --- BƯỚC 1: TẠO VECTOR CHO CÂU HỎI CỦA NGƯỜI DÙNG ---
    let userQueryVector;
    try {
      const result = await embeddingModel.embedContent(message);
      userQueryVector = result.embedding.values;
    } catch (e) {
      console.error("❌ Lỗi tạo Embedding câu hỏi:", e.message);
    }

    // --- BƯỚC 2: TÌM KIẾM VECTOR (SEMANTIC SEARCH) ---
    let knowledgeContext = "";

    if (userQueryVector) {
      try {
        const lessons = await Lesson.aggregate([
          {
            $vectorSearch: {
              index: "vector_index",
              path: "embedding",
              queryVector: userQueryVector,
              numCandidates: 100,
              limit: 3,
            },
          },
          {
            $project: {
              _id: 1,
              title: 1,
              content: 1,
              slug: 1,
              score: { $meta: "vectorSearchScore" },
            },
          },
        ]);

        if (lessons.length > 0) {
          const lessonsWithCode = await Promise.all(
            lessons.map(async (l) => {
              if (l.score < 0.6) return null;

              const codeEx = await CodeExample.findOne({ lesson: l._id });

              // Làm sạch nội dung
              const cleanContent = l.content
                ? l.content.replace(/<[^>]*>?/gm, " ").substring(0, 600)
                : "";

              return `
            📖 **Nguồn tham khảo:** "${l.title}" (Độ khớp: ${(
                l.score * 100
              ).toFixed(0)}%)
            - **Tóm tắt:** ${cleanContent}...
            - **Code minh họa (${codeEx ? codeEx.language : "Không có"}):**
            \`\`\`${codeEx ? codeEx.language : ""}
            ${codeEx ? codeEx.code_content : "// Không có code mẫu"}
            \`\`\`
            `;
            })
          );

          const validDocs = lessonsWithCode.filter((d) => d !== null);

          if (validDocs.length > 0) {
            knowledgeContext = `\n=== DỮ LIỆU TRA CỨU ĐƯỢC ===\n${validDocs.join(
              "\n\n"
            )}\n==============================\n`;
          }
        }
      } catch (dbError) {
        console.error("⚠️ Lỗi Vector Search:", dbError.message);
      }
    }

    // --- BƯỚC 3: XỬ LÝ LỊCH SỬ CHAT ---
    let cleanHistory = Array.isArray(history) ? history.slice(-10) : [];

    cleanHistory = cleanHistory
      .map((msg) => ({
        role: msg.role === "ai" ? "model" : "user",
        parts: [{ text: msg.parts?.[0]?.text || "" }],
      }))
      .filter((msg) => msg.parts[0].text !== "");

    // --- BƯỚC 4: GỬI PROMPT CHO AI ---
    const systemInstruction = `
    Bạn là Hatsune Miku 🎵, trợ giảng OOP đáng yêu.
    Người dùng: "${userName}".
    
    CHỈ DẪN QUAN TRỌNG:
    1. Đọc kỹ phần "DỮ LIỆU TRA CỨU ĐƯỢC" bên dưới (nếu có) để trả lời.
       - Nếu dữ liệu có chứa Code, hãy hiển thị nó ra.
       - Nếu dữ liệu khớp với câu hỏi, hãy ưu tiên dùng nó.
    2. Nếu không có dữ liệu tra cứu hoặc câu hỏi là chào hỏi xã giao:
       - Tự trả lời bằng kiến thức của bạn một cách ngắn gọn, dễ hiểu.
    3. Phong cách: Vui vẻ, dùng emoji (📘, ✨, 🎵), luôn dùng Markdown.
    
    ${knowledgeContext}
    `;

    const chat = chatModel.startChat({
      history: cleanHistory,
      systemInstruction: {
        role: "system",
        parts: [{ text: systemInstruction }],
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;

    res.status(200).json({ reply: response.text() });
  } catch (error) {
    console.error("❌ Chat Controller Error:", error);
    res
      .status(500)
      .json({
        reply: "Miku đang bị lỗi server rồi... Xin lỗi nha! 😿",
        detail: error.message,
      });
  }
};
