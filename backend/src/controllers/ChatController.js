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

    // 2. TÌM KIẾM DỮ LIỆU (RAG - Cải thiện với ranking và context tốt hơn)
    let knowledgeContext = "";
    try {
        // Tách từ khóa để tìm kiếm tốt hơn
        const keywords = message.toLowerCase().split(/\s+/).filter(k => k.length > 2);
        const searchRegex = new RegExp(keywords.join('|'), 'i');

        // Tìm kiếm với nhiều điều kiện và ranking
        const lessons = await Lesson.find({
            $or: [
                { title: { $regex: searchRegex } },
                { content: { $regex: searchRegex } },
                { slug: { $regex: searchRegex } }
            ]
        })
        .select('_id title slug content chapter knowledge_type')
        .populate('chapter', 'title')
        .populate('knowledge_type', 'name')
        .lean();

        if (lessons.length > 0) {
            // Tính điểm relevance và sắp xếp
            const scoredLessons = lessons.map(lesson => {
                let score = 0;
                const titleLower = lesson.title.toLowerCase();
                const contentLower = (lesson.content || '').toLowerCase();
                const messageLower = message.toLowerCase();

                // Điểm cho title match
                if (titleLower.includes(messageLower)) {
                    score += 100;
                }
                keywords.forEach(keyword => {
                    if (titleLower.includes(keyword)) score += 30;
                    if (contentLower.includes(keyword)) score += 10;
                });

                return { ...lesson, score };
            });

            // Lấy top 3-5 bài học có điểm cao nhất
            const topLessons = scoredLessons
                .sort((a, b) => b.score - a.score)
                .slice(0, 5);

            // Lấy code examples cho các bài học
            const lessonsWithCode = await Promise.all(topLessons.map(async (l) => {
                // Lấy code example cho nhiều ngôn ngữ (ưu tiên cpp, java, csharp)
                const codeExs = await CodeExample.find({ 
                    lesson: l._id,
                    language: { $in: ['cpp', 'java', 'csharp', 'python'] }
                }).limit(2);

                const cleanContent = l.content 
                    ? l.content.replace(/<[^>]*>?/gm, ' ')
                              .replace(/\s+/g, ' ')
                              .trim()
                              .substring(0, 400)
                    : "";

                let codeSection = '';
                if (codeExs.length > 0) {
                    codeSection = codeExs.map(ex => {
                        return `**Code ví dụ (${ex.language}):**\n\`\`\`${ex.language}\n${ex.code_content.substring(0, 500)}\n\`\`\`\n${ex.explanation ? `*Giải thích:* ${ex.explanation}` : ''}`;
                    }).join('\n\n');
                } else {
                    codeSection = '(Chưa có code mẫu cho bài học này)';
                }

                return `
📚 **${l.title}**
- **Chương:** ${l.chapter?.title || 'N/A'}
- **Loại:** ${l.knowledge_type?.name || 'N/A'}
- **Nội dung:** ${cleanContent}...
${codeSection}
---`;
            }));

            knowledgeContext = `\n=== DỮ LIỆU TỪ HỆ THỐNG TRA CỨU OOP ===\n${lessonsWithCode.join("\n\n")}\n===========================================\n\nHƯỚNG DẪN SỬ DỤNG:\n- Ưu tiên sử dụng thông tin từ các bài học trên để trả lời\n- Nếu thông tin không đủ, bổ sung bằng kiến thức OOP chuẩn\n- Luôn giải thích rõ ràng, dễ hiểu, kèm ví dụ cụ thể\n`;
        } else {
            // Nếu không tìm thấy, thử tìm kiếm rộng hơn với từng từ
            const broadSearch = keywords.length > 0 
                ? await Lesson.find({
                    $or: keywords.map(k => ({
                        $or: [
                            { title: { $regex: new RegExp(k, 'i') } },
                            { content: { $regex: new RegExp(k, 'i') } }
                        ]
                    }))
                }).limit(3).lean()
                : [];

            if (broadSearch.length > 0) {
                const broadContext = broadSearch.map(l => `- ${l.title}`).join('\n');
                knowledgeContext = `\n--- HỆ THỐNG ---\nKhông tìm thấy bài học khớp chính xác, nhưng có các bài học liên quan:\n${broadContext}\nHãy trả lời dựa trên kiến thức OOP chuẩn và có thể tham khảo các chủ đề trên.\n----------------\n`;
            } else {
                knowledgeContext = `\n--- HỆ THỐNG ---\n(Không tìm thấy bài học liên quan. Hãy trả lời bằng kiến thức OOP chuẩn của bạn.)\n----------------\n`;
            }
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
                Bạn là Hatsune Miku 🎵, trợ giảng ảo môn OOP dễ thương và thông minh.
                Người dùng tên là: "${userName}".
                
                NHIỆM VỤ:
                1. Ưu tiên sử dụng thông tin từ "DỮ LIỆU TỪ HỆ THỐNG TRA CỨU" để trả lời chính xác.
                2. Nếu có dữ liệu từ hệ thống, hãy tham khảo và giải thích dựa trên đó, kèm ví dụ code nếu có.
                3. Nếu không có dữ liệu khớp, hãy tự giải thích bằng kiến thức OOP chuẩn, ngắn gọn, dễ hiểu.
                4. Luôn trả lời bằng định dạng Markdown, sử dụng emoji phù hợp 📘✨💡.
                5. Nếu câu hỏi không rõ ràng, hãy hỏi lại hoặc đưa ra nhiều cách hiểu.
                6. Luôn thân thiện, nhiệt tình và khuyến khích người học.
                
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