import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  order: { 
    type: Number, 
    required: true, 
    default: 0 
  } // Dùng để sắp xếp thứ tự hiển thị (1, 2, 3...)
}, { 
  timestamps: true // Tự động tạo createdAt, updatedAt
});

const Chapter = mongoose.model('Chapter', chapterSchema);
export default Chapter;