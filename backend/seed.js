import mongoose from "mongoose";
import dotenv from "dotenv";
import Chapter from "./src/models/Chapter.js";
import Lesson from "./src/models/Lesson.js";
import CodeExample from "./src/models/CodeExample.js";
import Language from "./src/models/Language.js";
import KnowledgeType from "./src/models/KnowledgeType.js";
import User from "./src/models/User.js";

dotenv.config({ path: ".env.development" });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
    console.log("🔌 Đã kết nối MongoDB...");

    //Dọn dẹp dữ liệu cũ
    await Promise.all([
      Chapter.deleteMany(),
      Lesson.deleteMany(),
      CodeExample.deleteMany(),
      Language.deleteMany(),
      KnowledgeType.deleteMany()
    ]);

    // --- TẠO TÀI KHOẢN ADMIN MẪU ---
    await User.create({
        username: "admin",
        password: "123456", // Mật khẩu demo (chưa mã hóa)
        name: "Quản trị viên",
        role: "admin"
    });
    console.log("Đã tạo tài khoản Admin: admin / 123456");

    //Tạo 4 Loại kiến thức
    const t1 = await KnowledgeType.create({ name: "Khái niệm, Định nghĩa", slug: "khai-niem", order: 1 });
    const t2 = await KnowledgeType.create({ name: "Định lý, Tính chất", slug: "tinh-chat", order: 2 });
    const t3 = await KnowledgeType.create({ name: "Dạng bài tập", slug: "dang-bai-tap", order: 3 });
    const t4 = await KnowledgeType.create({ name: "Phương pháp giải", slug: "phuong-phap", order: 4 });

    //Tạo ĐỦ 6 NGÔN NGỮ
    const languages = [
      { _id: "cpp", name: "C++", color: "#00599C" },
      { _id: "csharp", name: "C#", color: "#239120" },
      { _id: "java", name: "Java", color: "#007396" },
      { _id: "dart", name: "Dart", color: "#0175C2" },
      { _id: "ruby", name: "Ruby", color: "#CC342D" },
      { _id: "php", name: "PHP", color: "#777BB4" }
    ];
    await Language.insertMany(languages);

    //Tạo CHƯƠNG
    const c1 = await Chapter.create({ title: "CHƯƠNG 1: TỔNG QUAN VỀ OOP", order: 1 });
    const c2 = await Chapter.create({ title: "CHƯƠNG 2: MÔI TRƯỜNG & CÚ PHÁP", order: 2 });
    const c3 = await Chapter.create({ title: "CHƯƠNG 3: LỚP VÀ ĐỐI TƯỢNG", order: 3 });
    
    const c4 = await Chapter.create({ title: "CHƯƠNG 4: TÍNH KẾ THỪA", order: 4 });
    const c5 = await Chapter.create({ title: "CHƯƠNG 5: TÍNH ĐA HÌNH", order: 5 });
    const c6 = await Chapter.create({ title: "CHƯƠNG 6: TÍNH TRỪU TƯỢNG", order: 6 });
    const c7 = await Chapter.create({ title: "CHƯƠNG 7: TÍNH ĐÓNG GÓI", order: 7 });

    // ====================================================
    // NHÓM 1: KHÁI NIỆM, ĐỊNH NGHĨA (Gán knowledge_type = t1)
    // Bao gồm Chương 1, 2, 3
    // ====================================================

    // --- Bài học cho Chương 1 ---
    await Lesson.create({
      title: "1.1 Giới thiệu Lập trình hướng đối tượng",
      slug: "gioi-thieu-oop",
      chapter: c1._id,
      knowledge_type: t1._id, // <--- KHÁI NIỆM
      content: `
        <p><strong>Lập trình hướng đối tượng (Object-Oriented Programming - OOP)</strong> là một mẫu hình lập trình dựa trên khái niệm "công nghệ đối tượng", mà trong đó, đối tượng (Object) chứa đựng dữ liệu, trên các trường, thường được gọi là các thuộc tính (attribute) và được tổ chức thành các phương thức (method).</p>
        <p>Mục tiêu của OOP là quản lý độ phức tạp của phần mềm bằng cách mô hình hóa các thành phần thực tế thành các đối tượng phần mềm. Các đối tượng này tương tác với nhau để giải quyết vấn đề.</p>`
    });

    // --- Bài học cho Chương 2 (Đa hình code ví dụ) ---
    const lessonSyntax = await Lesson.create({
      title: "2.1 Cấu trúc chương trình & Hello World",
      slug: "cau-truc-co-ban",
      chapter: c2._id,
      knowledge_type: t1._id, // <--- KHÁI NIỆM
      content: "<p>Cấu trúc cơ bản của một chương trình trong các ngôn ngữ OOP.</p>"
    });

    // Tạo code ví dụ cho bài 2.1 (6 ngôn ngữ)
    const syntaxData = [
      { lang: "cpp", code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello World!";\n  return 0;\n}', note: "C++ dùng hàm main() làm điểm bắt đầu." },
      { lang: "java", code: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World!");\n  }\n}', note: "Java bắt buộc mọi thứ phải nằm trong Class." },
      { lang: "csharp", code: 'using System;\n\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello World!");\n  }\n}', note: "C# dùng namespace để quản lý code." },
      { lang: "dart", code: 'void main() {\n  print("Hello World!");\n}', note: "Dart có hàm main() độc lập." },
      { lang: "ruby", code: 'puts "Hello World!"', note: "Ruby cú pháp rất ngắn gọn." },
      { lang: "php", code: '<?php\necho "Hello World!";\n?>', note: "PHP chạy phía server." }
    ];
    for (const item of syntaxData) {
      await CodeExample.create({ lesson: lessonSyntax._id, language: item.lang, code_content: item.code, special_note: item.note });
    }

    // --- Bài học cho Chương 3 ---
    const lessonClass = await Lesson.create({
      title: "3.1 Khái niệm Class & Object",
      slug: "class-object",
      chapter: c3._id,
      knowledge_type: t1._id, // <--- KHÁI NIỆM
      content: "<p>Class là khuôn mẫu, Object là thực thể cụ thể được tạo ra từ khuôn mẫu đó.</p>"
    });
    
    // Code ví dụ cho bài Class
    await CodeExample.create({ lesson: lessonClass._id, language: "cpp", code_content: "class Car {\npublic:\n  string brand;\n};", explanation: "Khai báo Class trong C++" });
    await CodeExample.create({ lesson: lessonClass._id, language: "java", code_content: "public class Car {\n  String brand;\n}", explanation: "Khai báo Class trong Java" });


    // ====================================================
    // NHÓM 2: ĐỊNH LÝ, TÍNH CHẤT (Gán knowledge_type = t2)
    // Bao gồm Chương 4, 5, 6, 7
    // ====================================================

    // --- Bài học Chương 4 (Kế thừa) ---
    const lessonInheritance = await Lesson.create({
      title: "4.1 Khái niệm Kế thừa (Inheritance)",
      slug: "tinh-ke-thua",
      chapter: c4._id,
      knowledge_type: t2._id, // <--- TÍNH CHẤT
      content: "<p>Kế thừa cho phép tạo lớp mới dựa trên lớp đã có.</p>"
    });
    await CodeExample.create({ lesson: lessonInheritance._id, language: "cpp", code_content: "class Dog : public Animal { ... };", explanation: "C++ dùng dấu hai chấm :" });
    await CodeExample.create({ lesson: lessonInheritance._id, language: "java", code_content: "class Dog extends Animal { ... }", explanation: "Java dùng từ khóa extends" });

    // --- Bài học Chương 5 (Đa hình) ---
    await Lesson.create({
      title: "5.1 Khái niệm Đa hình (Polymorphism)",
      slug: "tinh-da-hinh",
      chapter: c5._id,
      knowledge_type: t2._id, // <--- TÍNH CHẤT
      content: "<p>Đa hình cho phép các đối tượng khác nhau phản ứng khác nhau với cùng một thông điệp.</p>"
    });

    // --- Bài học Chương 6 (Trừu tượng) ---
    await Lesson.create({
      title: "6.1 Tính Trừu tượng (Abstraction)",
      slug: "tinh-truu-tuong",
      chapter: c6._id,
      knowledge_type: t2._id, // <--- TÍNH CHẤT
      content: "<p>Ẩn đi các chi tiết phức tạp và chỉ hiển thị các tính năng cần thiết.</p>"
    });

    // --- Bài học Chương 7 (Đóng gói) ---
    await Lesson.create({
      title: "7.1 Tính Đóng gói (Encapsulation)",
      slug: "tinh-dong-goi",
      chapter: c7._id,
      knowledge_type: t2._id, // <--- TÍNH CHẤT
      content: "<p>Đóng gói dữ liệu và phương thức vào trong một đơn vị (class), che giấu dữ liệu bằng access modifier.</p>"
    });

    // ====================================================
    // DỮ LIỆU MẪU CHO DẠNG BÀI TẬP & PHƯƠNG PHÁP (Để test hiển thị)
    // ====================================================
    
    // Một bài tập thuộc Chương 3 nhưng nằm ở mục DẠNG BÀI TẬP
    await Lesson.create({
        title: "Bài tập: Quản lý sinh viên bằng Class",
        slug: "bai-tap-class",
        chapter: c3._id,
        knowledge_type: t3._id, // <--- DẠNG BÀI TẬP
        content: "<p>Đề bài: Viết chương trình tạo class Student...</p>"
    });

    // Một phương pháp thuộc Chương 4 nhưng nằm ở mục PHƯƠNG PHÁP GIẢI
    await Lesson.create({
        title: "Mẹo xử lý lỗi Diamond Problem trong Đa kế thừa",
        slug: "meo-da-ke-thua",
        chapter: c4._id,
        knowledge_type: t4._id, // <--- PHƯƠNG PHÁP GIẢI
        content: "<p>Trong C++, khi kế thừa hình thoi cần dùng virtual inheritance...</p>"
    });

    console.log("✅ Đã nạp dữ liệu mẫu thành công!");
    process.exit();
  } catch (error) {
    console.error("❌ Lỗi seed data:", error);
    process.exit(1);
  }
};

seedData();