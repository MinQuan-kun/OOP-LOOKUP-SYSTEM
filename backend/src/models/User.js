import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  }, // Trong dự án thật nên mã hóa password, demo thì lưu text thường
  name: { 
    type: String 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  } // Phân quyền: admin mới được sửa
}, { 
  timestamps: true 
});

const User = mongoose.model('User', userSchema);
export default User;