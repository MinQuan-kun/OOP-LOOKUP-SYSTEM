// Data test

import mongoose from "mongoose";
import dotenv from "dotenv";
import Chapter from "./src/models/Chapter.js";
import Language from "./src/models/Language.js";
import Lesson from "./src/models/Lesson.js";
import CodeExample from "./src/models/CodeExample.js";

dotenv.config({ path: ".env.development" }); // Load biến môi trường

const seedData = async () => {
  try {
    // 1. Kết nối MongoDB
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
    console.log("🔌 Đã kết nối MongoDB để seed data...");

    // 2. Xóa sạch dữ liệu cũ (Reset)
    await Chapter.deleteMany();
    await Lesson.deleteMany();
    await CodeExample.deleteMany();
    await Language.deleteMany();
    console.log("🧹 Đã dọn sạch dữ liệu cũ.");

    // 3. Tạo Ngôn ngữ
    const cpp = await Language.create({ _id: "cpp", name: "C++", color: "#00599C" });
    const java = await Language.create({ _id: "java", name: "Java", color: "#007396" });
    const csharp = await Language.create({ _id: "csharp", name: "C#", color: "#239120" });

    // 4. Tạo Chương
    const chuong1 = await Chapter.create({ title: "Chương 1: Giới thiệu OOP", order: 1 });
    const chuong2 = await Chapter.create({ title: "Chương 2: Các tính chất", order: 2 });

    // 5. Tạo Bài học
    const bai1 = await Lesson.create({
      chapter: chuong1._id,
      title: "1.1 Khái niệm cơ bản",
      slug: "khai-niem-co-ban",
      content: "<p>Lập trình hướng đối tượng (OOP) là mẫu hình lập trình dựa trên khái niệm 'công nghệ đối tượng'...</p>"
    });

    const bai2 = await Lesson.create({
      chapter: chuong2._id,
      title: "2.1 Tính kế thừa (Inheritance)",
      slug: "tinh-ke-thua",
      content: "<p>Kế thừa cho phép một class con sở hữu các thuộc tính và phương thức của class cha.</p>"
    });

    // 6. Tạo Code Ví dụ
    // Ví dụ cho bài "Tính kế thừa" bằng C++
    await CodeExample.create({
      lesson: bai2._id,
      language: "cpp",
      code_content: "class Animal {\npublic:\n  void eat() { cout << \"Eating...\"; }\n};\n\nclass Dog : public Animal {\n  void bark() { cout << \"Barking...\"; }\n};",
      explanation: "Trong C++, dùng dấu hai chấm : để kế thừa.",
      special_note: "C++ hỗ trợ đa kế thừa."
    });

    // Ví dụ cho bài "Tính kế thừa" bằng Java
    await CodeExample.create({
      lesson: bai2._id,
      language: "java",
      code_content: "class Animal {\n  void eat() { System.out.println(\"Eating...\"); }\n}\n\nclass Dog extends Animal {\n  void bark() { System.out.println(\"Barking...\"); }\n}",
      explanation: "Trong Java, dùng từ khóa 'extends' để kế thừa.",
      special_note: "Java chỉ hỗ trợ đơn kế thừa class."
    });

    console.log("✅ Đã nạp dữ liệu mẫu thành công!");
    process.exit();
  } catch (error) {
    console.error("❌ Lỗi seed data:", error);
    process.exit(1);
  }
};

seedData();