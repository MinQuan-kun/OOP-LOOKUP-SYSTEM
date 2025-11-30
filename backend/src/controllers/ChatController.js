import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import Lesson from "../models/Lesson.js";
import CodeExample from "../models/CodeExample.js";

dotenv.config();

// Kiểm tra API Key
if (!process.env.GEMINI_API_KEY) {
  console.error("Lỗi: Chưa cấu hình GEMINI_API_KEY trong file .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithBot = async (req, res) => {
  try {
    const { message, history } = req.body;
    
    // Lấy tên user
    const userName = req.user ? req.user.username : "Bạn học";

    if (!message) return res.status(400).json({ reply: "Hỏi gì về OOP đi bạn ơi! 😿" });

    // 1. XỬ LÝ LỊCH SỬ CHAT (QUAN TRỌNG)
    let cleanHistory = [];
    if (Array.isArray(history)) {
        // Lọc bỏ tin nhắn lỗi
        cleanHistory = history.filter(h => h && h.role && h.parts && h.parts[0] && h.parts[0].text);
        
        // Loại bỏ tin nhắn cuối nếu trùng với message hiện tại (để tránh lặp lại câu hỏi)
        const lastMsg = cleanHistory[cleanHistory.length - 1];
        if (lastMsg && lastMsg.role === 'user' && lastMsg.parts[0].text === message) {
            cleanHistory.pop();
        }

        while (cleanHistory.length > 0 && cleanHistory[0].role !== 'user') {
            cleanHistory.shift();
        }
    }

    // 2. TÌM KIẾM DỮ LIỆU (RAG)
    let knowledgeContext = "";
    try {
        const lessons = await Lesson.find({
            $or: [
                { title: { $regex: message, $options: 'i' } },
                { slug: { $regex: message, $options: 'i' } },
                { content: { $regex: message, $options: 'i' } }
            ]
        })
        .select('_id title slug content') 
        .limit(3); 

        if (lessons.length > 0) {
            const lessonsWithCode = await Promise.all(lessons.map(async (l) => {
                const codeEx = await CodeExample.findOne({ lesson: l._id });
                const cleanContent = l.content ? l.content.replace(/<[^>]*>?/gm, ' ').substring(0, 300) : "";

                return `
                📚 **Kiến thức tìm thấy:** "${l.title}"
                - **Tóm tắt:** ${cleanContent}...
                - **Code ví dụ (${codeEx ? codeEx.language : 'N/A'}):** \`\`\`${codeEx ? codeEx.language : ''}
                ${codeEx ? codeEx.code_content : '(Không có code mẫu)'}
                \`\`\`
                `;
            }));

            knowledgeContext = `\n--- DỮ LIỆU TỪ HỆ THỐNG TRA CỨU ---\n${lessonsWithCode.join("\n\n")}\n-----------------------------------\n`;
        } else {
            knowledgeContext = `\n--- HỆ THỐNG ---\n(Không tìm thấy bài học khớp chính xác. Hãy trả lời bằng kiến thức OOP chuẩn của bạn.)\n----------------\n`;
        }
    } catch (dbError) {
        console.error("⚠️ Lỗi truy vấn DB:", dbError);
        knowledgeContext = "";
    }

    // 3. CẤU HÌNH AI
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash", 
        systemInstruction: {
            role: "system",
            parts: [{ text: `
                Bạn là Hatsune Miku 🎵, trợ giảng ảo môn OOP dễ thương.
                Người dùng tên là: "${userName}".
                
                NHIỆM VỤ:
                1. Dựa vào "DỮ LIỆU TỪ HỆ THỐNG TRA CỨU" để trả lời (nếu có).
                2. Nếu không có dữ liệu, hãy tự giải thích ngắn gọn, dễ hiểu, kèm emoji 📘✨.
                3. Luôn trả lời bằng định dạng Markdown.
                
                ${knowledgeContext}
            `}]
        }
    });

    const chat = model.startChat({ history: cleanHistory });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    
    res.status(200).json({ reply: response.text() });

  } catch (error) {
    console.error("❌ Chat Error:", error);
    res.status(500).json({ reply: "Miku đang bị lỗi kết nối... 🎤😿", detail: error.message });
  }
};