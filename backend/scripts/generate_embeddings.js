import mongoose from "mongoose";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Lesson from "../src/models/Lesson.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// 1. CẤU HÌNH MÔI TRƯỜNG & API KEY
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hàm helper để load env
const loadEnv = (fileName) => {
  const filePath = path.resolve(__dirname, `../${fileName}`);
  if (fs.existsSync(filePath)) {
    dotenv.config({ path: filePath });
    console.log(`📂 Đã load file: ${fileName}`);
  }
};

// Ưu tiên load .env, nếu không có thì load .env.development
loadEnv(".env");
if (!process.env.GEMINI_API_KEY) {
  loadEnv(".env.development");
}

const apiKey = process.env.GEMINI_API_KEY;

// Kiểm tra Key
if (!apiKey) {
  console.error("❌ LỖI NGHIÊM TRỌNG: Không tìm thấy 'GEMINI_API_KEY'!");
  console.error(
    "👉 Hãy tạo file 'backend/.env' và thêm dòng: GEMINI_API_KEY=AIzaSy..."
  );
  process.exit(1);
} else {
  console.log(
    `🔑 API Key hiện tại: ${apiKey.substring(0, 8)}...${apiKey.substring(
      apiKey.length - 4
    )}`
  );
}

// 2. KẾT NỐI DB & AI
const connectDB = async () => {
  try {
    // Nếu trong env không có MONGODB_CONNECT_STRING thì dùng fallback localhost
    const mongoURI =
      process.env.MONGODB_CONNECT_STRING ||
      "mongodb://localhost:27017/oop-lookup-system";
    await mongoose.connect(mongoURI);
    console.log(`✅ Đã kết nối MongoDB: ${mongoURI}`);
  } catch (err) {
    console.error("❌ Lỗi kết nối DB:", err.message);
    process.exit(1);
  }
};

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

// 3. HÀM TẠO EMBEDDING
async function generateEmbeddings() {
  await connectDB();
  console.log("\n🚀 Đang bắt đầu tạo Embeddings...");

  const lessons = await Lesson.find({}).select("_id title content");

  if (lessons.length === 0) {
    console.log(
      "⚠️ Không tìm thấy bài học nào trong DB. Hãy chạy 'npm run seed' trước!"
    );
    process.exit(0);
  }

  let successCount = 0;
  let failCount = 0;

  for (const lesson of lessons) {
    try {
      // Làm sạch content (xóa thẻ HTML) và cắt ngắn
      const cleanContent = lesson.content
        .replace(/<[^>]*>?/gm, " ")
        .substring(0, 9000);
      const textToEmbed = `Title: ${lesson.title}\nContent: ${cleanContent}`;

      const result = await model.embedContent(textToEmbed);
      const embedding = result.embedding.values;

      await Lesson.findByIdAndUpdate(lesson._id, { embedding });

      process.stdout.write("."); // In dấu chấm tiến độ
      successCount++;

      // Delay để tránh rate limit (Google cho phép 60 req/min với gói free)
      await new Promise((r) => setTimeout(r, 1500));
    } catch (error) {
      console.log(`\n❌ Lỗi bài "${lesson.title}": ${error.message}`);
      failCount++;
    }
  }

  console.log(
    `\n\n🎉 HOÀN TẤT! Thành công: ${successCount} - Thất bại: ${failCount}`
  );
  process.exit();
}

generateEmbeddings();
