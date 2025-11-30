import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Import Models
import Chapter from './src/models/Chapter.js';
import KnowledgeType from './src/models/KnowledgeType.js';
import Lesson from './src/models/Lesson.js';
import CodeExample from './src/models/CodeExample.js';
import Language from './src/models/Language.js';
import User from './src/models/User.js';

const __dirname = path.resolve();
dotenv.config({ path: path.resolve(__dirname, '.env') });

const SEED_FILE_PATH = path.join(__dirname, 'seed.js');

// --- HÀM HỖ TRỢ ĐỌC DỮ LIỆU CŨ TỪ FILE SEED.JS ---
// Cách hoạt động: Dùng Regex trích xuất phần mảng JSON từ file text
const extractArrayFromFile = (fileContent, variableName) => {
    try {
        // Regex này tìm: const variableName = [ ... ]; 
        // Nó dựa vào cấu trúc xuống dòng \n\nconst của file seed được generate
        const regex = new RegExp(`const ${variableName} = ([\\s\\S]*?);\\n\\nconst`, 'm');
        const match = fileContent.match(regex);
        
        // Nếu là biến cuối cùng (users), nó có thể không có \n\nconst phía sau
        if (!match && variableName === 'users') {
             const lastRegex = /const users = ([\s\S]*?);/;
             const lastMatch = fileContent.match(lastRegex);
             return lastMatch ? JSON.parse(lastMatch[1]) : [];
        }

        return match ? JSON.parse(match[1]) : [];
    } catch (error) {
        console.warn(`⚠️ Không thể đọc biến ${variableName} từ file cũ. Bỏ qua merge.`);
        return [];
    }
};

// --- HÀM TRỘN DỮ LIỆU (SMART MERGE) ---
const mergeData = (dbData, fileData, modelName) => {
    if (!fileData || fileData.length === 0) return dbData;

    const dbMap = new Map(dbData.map(item => [item._id.toString(), item]));
    const mergedList = [...dbData];
    let restoredCount = 0;

    fileData.forEach(fileItem => {
        // Nếu item có trong File cũ mà KHÔNG có trong DB (tức là đã bị xóa trong DB)
        if (!dbMap.has(fileItem._id)) {
            mergedList.push(fileItem); // Khôi phục lại
            restoredCount++;
        }
    });

    if (restoredCount > 0) {
        console.log(`♻️  Đã khôi phục ${restoredCount} ${modelName} từ file Seed cũ (bị thiếu trong DB).`);
    }
    
    // Sắp xếp lại theo thứ tự (nếu có field order)
    if (mergedList.length > 0 && mergedList[0].order) {
        mergedList.sort((a, b) => a.order - b.order);
    }

    return mergedList;
};

const exportData = async () => {
    try {
        // 1. Đọc dữ liệu cũ từ file seed.js (nếu có)
        let oldSeedContent = '';
        let oldData = {};
        if (fs.existsSync(SEED_FILE_PATH)) {
            console.log("📂 Phát hiện file seed.js cũ, đang đọc dữ liệu để merge...");
            oldSeedContent = fs.readFileSync(SEED_FILE_PATH, 'utf-8');
            
            // Backup file cũ trước khi làm bất cứ gì
            fs.writeFileSync(path.join(__dirname, 'seed.bak.js'), oldSeedContent);
            console.log("🛡️  Đã backup file cũ sang seed.bak.js");

            oldData = {
                chapters: extractArrayFromFile(oldSeedContent, 'chapters'),
                types: extractArrayFromFile(oldSeedContent, 'types'),
                languages: extractArrayFromFile(oldSeedContent, 'languages'),
                lessons: extractArrayFromFile(oldSeedContent, 'lessons'),
                examples: extractArrayFromFile(oldSeedContent, 'examples'),
                users: extractArrayFromFile(oldSeedContent, 'users'),
            };
        }

        console.log("⏳ Đang kết nối MongoDB...");
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        console.log("✅ Kết nối DB thành công! Đang lấy dữ liệu mới...");

        // 2. Lấy dữ liệu từ DB
        const dbChapters = await Chapter.find().lean();
        const dbTypes = await KnowledgeType.find().lean();
        const dbLanguages = await Language.find().lean();
        const dbLessons = await Lesson.find().lean();
        const dbExamples = await CodeExample.find().lean();
        const dbUsers = await User.find().lean();

        // Hàm làm sạch dữ liệu (bỏ __v, timestamp)
        const clean = (arr) => arr.map(item => {
            const { __v, createdAt, updatedAt, ...rest } = item;
            return rest;
        });

        // 3. MERGE: DB (Mới nhất) + File Cũ (Những cái đã bị xóa ở DB)
        console.log("🔄 Đang trộn dữ liệu (Merge)...");
        
        const finalChapters = mergeData(clean(dbChapters), oldData.chapters, 'Chapters');
        const finalTypes = mergeData(clean(dbTypes), oldData.types, 'Types');
        const finalLanguages = mergeData(clean(dbLanguages), oldData.languages, 'Languages');
        const finalLessons = mergeData(clean(dbLessons), oldData.lessons, 'Lessons');
        const finalExamples = mergeData(clean(dbExamples), oldData.examples, 'CodeExamples');
        const finalUsers = mergeData(clean(dbUsers), oldData.users, 'Users');

        // 4. Tạo nội dung file seed.js mới
        // Lưu ý: Thêm logic process.argv vào seed.js để tránh chạy seedDB() khi import
        const fileContent = `
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Models
import Chapter from './src/models/Chapter.js';
import KnowledgeType from './src/models/KnowledgeType.js';
import Lesson from './src/models/Lesson.js';
import CodeExample from './src/models/CodeExample.js';
import Language from './src/models/Language.js';
import User from './src/models/User.js';

const __dirname = path.resolve();
const envFile = process.env.NODE_ENV === "production" ? ".env" : ".env";
dotenv.config({ path: path.resolve(__dirname, envFile) });

// --- DỮ LIỆU ĐƯỢC EXPORT TỪ DB CŨ ---
const chapters = ${JSON.stringify(finalChapters, null, 2)};

const types = ${JSON.stringify(finalTypes, null, 2)};

const languages = ${JSON.stringify(finalLanguages, null, 2)};

const lessons = ${JSON.stringify(finalLessons, null, 2)};

const examples = ${JSON.stringify(finalExamples, null, 2)};

const users = ${JSON.stringify(finalUsers, null, 2)};

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
      User.deleteMany({}) 
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
    // Dùng create để kích hoạt hash password middleware nếu có
    for (const user of users) {
        await User.create(user); 
    }

    console.log('🎉 SEED DỮ LIỆU THÀNH CÔNG!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi seed:', error);
    process.exit(1);
  }
};

// Chỉ chạy hàm seed nếu file này được gọi trực tiếp (node seed.js)
// Không chạy nếu file này được import bởi file khác
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    seedDB();
}
`;

        // 5. Ghi ra file seed.js
        fs.writeFileSync(SEED_FILE_PATH, fileContent, 'utf-8');
        
        console.log(`✅ Đã xuất dữ liệu thành công ra file: ${SEED_FILE_PATH}`);
        console.log(`📊 Thống kê: Chapters(${finalChapters.length}), Lessons(${finalLessons.length}), Examples(${finalExamples.length})`);
        
        process.exit(0);

    } catch (error) {
        console.error("❌ Lỗi Export:", error);
        process.exit(1);
    }
};

exportData();