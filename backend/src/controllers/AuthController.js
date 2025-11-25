import User from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Tìm user trong DB
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(400).json({ message: "Tài khoản không tồn tại!" });
    }

    // 2. Kiểm tra mật khẩu (Lưu ý: Ở dự án thật phải dùng bcrypt để mã hóa, đây là demo nên so sánh chuỗi thường)
    if (user.password !== password) {
      return res.status(400).json({ message: "Mật khẩu không đúng!" });
    }

    // 3. Trả về thông tin user (bỏ password đi)
    res.status(200).json({
      _id: user._id,
      username: user.username,
      name: user.name,
      role: user.role // Quan trọng: để frontend biết có phải admin không
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};