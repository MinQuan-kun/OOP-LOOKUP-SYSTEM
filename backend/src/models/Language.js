import mongoose from 'mongoose';

const languageSchema = new mongoose.Schema({
  _id: { 
    type: String, 
    required: true 
  }, // Dùng ID tự đặt: 'cpp', 'java', 'csharp'...
  name: { 
    type: String, 
    required: true 
  }, // Tên hiển thị: 'C++', 'Java'
}, { 
  timestamps: true,
  _id: false
});

const Language = mongoose.model('Language', languageSchema);
export default Language;