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
  color: { 
    type: String,
    default: '#000000'
  }, // Màu sắc đại diện 
  icon: { 
    type: String 
  } // Đường dẫn icon
}, { 
  timestamps: true,
  _id: false // Tắt ID tự động của Mongo đã tự set _id ở trên
});

const Language = mongoose.model('Language', languageSchema);
export default Language;