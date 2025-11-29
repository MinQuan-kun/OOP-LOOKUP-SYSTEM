import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load biến môi trường để lấy chuỗi kết nối DB
const __dirname = path.resolve();
dotenv.config({ path: path.resolve(__dirname, '.env') }); // Hoặc .env tùy bạn

// Định nghĩa lại Schema rút gọn để update (khỏi cần import file model phức tạp)
const codeExampleSchema = new mongoose.Schema({}, { strict: false });
const CodeExample = mongoose.model('CodeExample', codeExampleSchema);

const migrate = async () => {
  try {
    console.log("⏳ Đang kết nối MongoDB...");
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
    console.log("✅ Kết nối thành công!");

    console.log("⏳ Đang cập nhật dữ liệu cũ...");

    // Lệnh này tìm tất cả bản ghi chưa có trường 'is_supported'
    // và cập nhật thêm 2 trường mới vào.
    const result = await CodeExample.updateMany(
      { is_supported: { $exists: false } }, // Điều kiện: Tìm cái nào chưa có
      { 
        $set: { 
          is_supported: true,
          syntax_note: "" 
        } 
      }
    );

    console.log(`✅ Đã cập nhật xong: ${result.modifiedCount} bản ghi.`);
    process.exit(0);

  } catch (error) {
    console.error("❌ Lỗi Migration:", error);
    process.exit(1);
  }
};

migrate();