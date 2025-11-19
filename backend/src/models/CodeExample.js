import mongoose from 'mongoose';

const codeExampleSchema = new mongoose.Schema({
  lesson: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Lesson', // Liên kết với bảng Lesson
    required: true 
  },
  language: { 
    type: String, 
    ref: 'Language', // Liên kết với bảng Language ('cpp', 'java'...)
    required: true 
  },
  code_content: { 
    type: String, 
    required: true 
  }, // Đoạn code mẫu
  explanation: { 
    type: String 
  }, // Giải thích chi tiết cho đoạn code này
  special_note: { 
    type: String 
  } // Lưu ý
}, { 
  timestamps: true 
});

// Tạo index kép để đảm bảo 1 bài học chỉ có 1 ví dụ cho 1 ngôn ngữ
codeExampleSchema.index({ lesson: 1, language: 1 }, { unique: true });

const CodeExample = mongoose.model('CodeExample', codeExampleSchema);
export default CodeExample;