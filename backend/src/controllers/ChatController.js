import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import Lesson from "../models/Lesson.js"; // Import Model Lesson thay vì Task
import CodeExample from "../models/CodeExample.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithBot = async (req, res) => {
  try {
    const { message, history } = req.body;
    
    // Lấy tên user nếu đã đăng nhập, nếu không gọi là "Bạn học"
    const userName = req.user ? req.user.username : "Bạn học";

    if (!message) return res.status(400).json({ reply: "Hỏi gì về OOP đi bạn ơi! 😿" });

    // 1. Xử lý lịch sử chat (Giữ nguyên logic để tránh lỗi Gemini)
    let cleanHistory = [];
    if (Array.isArray(history)) {
        cleanHistory = [...history];
        const lastMsg = cleanHistory[cleanHistory.length - 1];
        if (lastMsg && lastMsg.role === 'user' && lastMsg.parts[0].text === message) {
            cleanHistory.pop();
        }
        while (cleanHistory.length > 0 && cleanHistory[0].role === 'model') {
            cleanHistory.shift();
        }
    }

    // 2. TÌM KIẾM DỮ LIỆU (RAG - Retrieval Augmented Generation)
    // Thay vì tìm Task, ta tìm Lesson liên quan đến câu hỏi
    let knowledgeContext = "";
    
    // Tìm các bài học có tiêu đề hoặc nội dung chứa từ khóa trong tin nhắn
    const lessons = await Lesson.find({
        $or: [
            { title: { $regex: message, $options: 'i' } }, // Tìm theo tiêu đề (không phân biệt hoa thường)
            { slug: { $regex: message, $options: 'i' } }
        ]
    })
    .select('title slug content') // Chỉ lấy các trường cần thiết
    .limit(3); // Lấy tối đa 3 bài học liên quan nhất để không bị quá token

    if (lessons.length > 0) {
        // Tạo chuỗi ngữ cảnh từ các bài học tìm được
        const lessonListStr = lessons.map((l, index) => {
            // Cắt bớt content nếu quá dài để tiết kiệm token
            const snippet = l.content.replace(/<[^>]*>?/gm, '').substring(0, 200) + "..."; 
            return `
            ${index + 1}. **Bài học:** ${l.title} (Slug: ${l.slug})
               - **Nội dung trích dẫn:** ${snippet}
            `;
        }).join("\n");
        
        knowledgeContext = `\n--- DỮ LIỆU TÌM THẤY TRONG HỆ THỐNG OOP LOOKUP ---\n${lessonListStr}\n-----------------------------------\n`;
    } else {
        knowledgeContext = `\n--- DỮ LIỆU HỆ THỐNG ---\n(Không tìm thấy bài học nào khớp chính xác trong Database, hãy trả lời dựa trên kiến thức chung về OOP của bạn)\n--------------------------\n`;
    }

    // 3. Gọi Gemini
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: {
            role: "system",
            parts: [{ text: `
                Bạn là Hatsune Miku 🎵, trợ giảng ảo cho môn Lập trình Hướng Đối Tượng (OOP).
                Gọi người dùng là "${userName}". Dùng tone giọng dễ thương, nhiệt tình, dùng nhiều emoji 📘💻✨.
                
                NHIỆM VỤ:
                1. Trả lời câu hỏi về OOP dựa trên "DỮ LIỆU TÌM THẤY" được cung cấp bên dưới (nếu có).
                2. Nếu dữ liệu hệ thống có bài học liên quan, hãy gợi ý Master xem chi tiết bằng cách nhắc đến tên bài học đó (in đậm).
                3. Nếu không có dữ liệu trong hệ thống, hãy dùng kiến thức lập trình của bạn để giải thích ngắn gọn, dễ hiểu.
                4. Nếu Master hỏi xin code ví dụ, hãy viết code minh họa (ưu tiên C++ hoặc Java).

                ${knowledgeContext}
                
                Lưu ý: Luôn trả lời bằng định dạng Markdown đẹp mắt.
            `}]
        }
    });

    const chat = model.startChat({ history: cleanHistory });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    
    res.status(200).json({ reply: response.text() });

  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ reply: "Miku bị lỗi server rồi... 🎤😿", detail: error.message });
  }
};