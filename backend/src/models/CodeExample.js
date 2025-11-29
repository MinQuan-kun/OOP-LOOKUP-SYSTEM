import mongoose from 'mongoose';

const codeExampleSchema = new mongoose.Schema({
  lesson: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Lesson', 
    required: true 
  },
  language: { 
    type: String, 
    required: true 
  },
  
  // --- PHẦN THÊM MỚI ---
  is_supported: {
    type: Boolean,
    default: true // <--- QUAN TRỌNG: Mặc định là true cho data cũ
  },
  syntax_note: { 
    type: String,
    default: ""   // <--- QUAN TRỌNG: Mặc định là rỗng cho data cũ
  },
  // ---------------------

  code_content: { 
    type: String, 
    required: true 
  }, 
  explanation: { 
    type: String 
  }, 
  special_note: { 
    type: String 
  } 
}, { 
  timestamps: true 
});

codeExampleSchema.index({ lesson: 1, language: 1 }, { unique: true });

const CodeExample = mongoose.model('CodeExample', codeExampleSchema);
export default CodeExample;