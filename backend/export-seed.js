// backend/export-seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Import các Models (đường dẫn từ backend/)
import Chapter from './src/models/Chapter.js';
import KnowledgeType from './src/models/KnowledgeType.js';
import Lesson from './src/models/Lesson.js';
import CodeExample from './src/models/CodeExample.js';
import Language from './src/models/Language.js';
import User from './src/models/User.js';

const __dirname = path.resolve();
dotenv.config({ path: path.resolve(__dirname, '.env') });

const exportData = async () => {
    try {
        console.log("⏳ Đang kết nối MongoDB...");
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        console.log("✅ Kết nối thành công! Đang lấy dữ liệu...");

        // 1. Lấy dữ liệu từ DB
        const chapters = await Chapter.find().lean();
        const types = await KnowledgeType.find().lean();
        const languages = await Language.find().lean();
        const lessons = await Lesson.find().lean();
        const examples = await CodeExample.find().lean();
        const users = await User.find().lean(); // <--- Lấy Users

        // Hàm làm sạch dữ liệu (bỏ __v, giữ _id)
        const clean = (arr) => arr.map(item => {
            const { __v, createdAt, updatedAt, ...rest } = item;
            return rest;
        });

        // 2. Tạo nội dung file seed.js
        // Lưu ý: Vì file seed.js nằm ở thư mục gốc backend, nên đường dẫn import model phải là './src/models/...'
        const fileContent = `
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Import Models
import Chapter from './src/models/Chapter.js';
import KnowledgeType from './src/models/KnowledgeType.js';
import Lesson from './src/models/Lesson.js';
import CodeExample from './src/models/CodeExample.js';
import Language from './src/models/Language.js';
import User from './src/models/User.js';

const __dirname = path.resolve();
const envFile = process.env.NODE_ENV === "production" ? ".env" : ".env.development";
dotenv.config({ path: path.resolve(__dirname, envFile) });

// --- DỮ LIỆU ĐƯỢC EXPORT TỪ DB CŨ ---
const chapters = ${JSON.stringify(clean(chapters), null, 2)};

const types = ${JSON.stringify(clean(types), null, 2)};

const languages = ${JSON.stringify(clean(languages), null, 2)};

const lessons = ${JSON.stringify(clean(lessons), null, 2)};

const examples = ${JSON.stringify(clean(examples), null, 2)};

const users = ${JSON.stringify(clean(users), null, 2)};

// --- HÀM SEED ---
const seedDB = async () => {
  try {
    console.log('⏳ Đang kết nối DB để seed...');
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
    console.log('✅ Đã kết nối!');

    // 1. Xóa dữ liệu cũ (Reset)
    console.log('🗑️ Đang xóa dữ liệu cũ...');
    await Promise.all([
      Chapter.deleteMany({}),
      KnowledgeType.deleteMany({}),
      Lesson.deleteMany({}),
      CodeExample.deleteMany({}),
      Language.deleteMany({}),
      User.deleteMany({}) // Xóa Users cũ
    ]);

    // 2. Nạp dữ liệu mới
    console.log('🌱 Đang nạp dữ liệu Chapters...');
    await Chapter.insertMany(chapters);

    console.log('🌱 Đang nạp dữ liệu KnowledgeTypes...');
    await KnowledgeType.insertMany(types);
    
    console.log('🌱 Đang nạp dữ liệu Languages...');
    await Language.insertMany(languages);

    console.log('🌱 Đang nạp dữ liệu Lessons...');
    await Lesson.insertMany(lessons);

    console.log('🌱 Đang nạp dữ liệu CodeExamples...');
    await CodeExample.insertMany(examples);

    console.log('🌱 Đang nạp dữ liệu Users...');
    await User.insertMany(users);

    console.log('🎉 SEED DỮ LIỆU THÀNH CÔNG!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi seed:', error);
    process.exit(1);
  }
};

seedDB();
`;

        // 3. Ghi ra file seed.js ngay tại thư mục backend
        const outputPath = path.join(__dirname, 'seed.js'); 
        fs.writeFileSync(outputPath, fileContent, 'utf-8');
        
        console.log(`✅ Đã xuất dữ liệu thành công ra file: ${outputPath}`);
        console.log("👉 Bạn có thể chạy 'node seed.js' để nạp lại dữ liệu này bất cứ lúc nào.");
        
        process.exit(0);

    } catch (error) {
        console.error("❌ Lỗi Export:", error);
        process.exit(1);
    }
};

exportData();