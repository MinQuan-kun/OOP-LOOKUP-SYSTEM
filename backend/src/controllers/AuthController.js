import User from "../models/User.js";

// --- Hàm Đăng ký ---
export const register = async (req, res) => {
  try {
    const { username, password, name } = req.body;

    // 1. Kiểm tra xem username đã tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Tên đăng nhập đã được sử dụng!" });
    }

    // 2. Tạo user mới
    const newUser = new User({
      username,
      password, 
      name
    });

    // 3. Lưu vào DB
    await newUser.save();

    res.status(201).json({ 
      message: "Đăng ký thành công!",
      user: {
        _id: newUser._id,
        username: newUser.username,
        name: newUser.name,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Lỗi Server khi đăng ký" });
  }
};

// --- Hàm Đăng nhập ---
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Tài khoản không tồn tại!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng!" });
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      name: user.name,
      role: user.role 
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};