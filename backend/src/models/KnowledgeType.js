import mongoose from 'mongoose';

const knowledgeTypeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  }, // Ví dụ: "Khái niệm"
  slug: { 
    type: String, 
    required: true, 
    unique: true 
  }, // Ví dụ: "khai-niem" (Dùng để code frontend map vào)
  order: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true 
});

const KnowledgeType = mongoose.model('KnowledgeType', knowledgeTypeSchema);
export default KnowledgeType;