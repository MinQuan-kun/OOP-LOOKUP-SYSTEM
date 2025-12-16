
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Models
import Chapter from './src/models/Chapter.js';
import KnowledgeType from './src/models/KnowledgeType.js';
import Lesson from './src/models/Lesson.js';
import CodeExample from './src/models/CodeExample.js';
import Language from './src/models/Language.js';
import User from './src/models/User.js';

const __dirname = path.resolve();
const envFile = process.env.NODE_ENV === "production" ? ".env" : ".env";
dotenv.config({ path: path.resolve(__dirname, envFile) });

// --- DỮ LIỆU ĐƯỢC EXPORT TỪ DB CŨ ---
const chapters = [
  {
    "_id": "692ae7567fdaad24a2aec4e0",
    "title": "CHƯƠNG 1: TỔNG QUAN VỀ OOP",
    "order": 1
  },
  {
    "_id": "692ae7567fdaad24a2aec4e2",
    "title": "CHƯƠNG 2: MÔI TRƯỜNG & CÚ PHÁP",
    "order": 2
  },
  {
    "_id": "692ae7567fdaad24a2aec4e4",
    "title": "CHƯƠNG 3: LỚP VÀ ĐỐI TƯỢNG",
    "order": 3
  },
  {
    "_id": "692ede83d34cc6910180d487",
    "title": "CHƯƠNG 4: TÍNH KẾ THỪA",
    "order": 4
  },
  {
    "_id": "692ae7567fdaad24a2aec4e6",
    "title": "CHƯƠNG 4: TÍNH KẾ THỪA",
    "order": 4
  },
  {
    "_id": "692ae7567fdaad24a2aec4e8",
    "title": "CHƯƠNG 5: TÍNH ĐA HÌNH",
    "order": 5
  },
  {
    "_id": "692ae7567fdaad24a2aec4ea",
    "title": "CHƯƠNG 6: TÍNH TRỪU TƯỢNG",
    "order": 6
  },
  {
    "_id": "692ae7567fdaad24a2aec4ec",
    "title": "CHƯƠNG 7: TÍNH ĐÓNG GÓI",
    "order": 7
  }
];

const types = [
  {
    "_id": "692ae7567fdaad24a2aec4d7",
    "name": "Khái niệm, Định nghĩa",
    "slug": "khai-niem",
    "order": 1
  },
  {
    "_id": "692ae7567fdaad24a2aec4d9",
    "name": "Định lý, Tính chất",
    "slug": "tinh-chat",
    "order": 2
  },
  {
    "_id": "692ae7567fdaad24a2aec4db",
    "name": "Dạng bài tập",
    "slug": "dang-bai-tap",
    "order": 3
  },
  {
    "_id": "692ae7567fdaad24a2aec4dd",
    "name": "Phương pháp giải",
    "slug": "phuong-phap",
    "order": 4
  }
];

const languages = [
  {
    "_id": "php",
    "name": "PHP"
  },
  {
    "_id": "java",
    "name": "Java"
  },
  {
    "_id": "csharp",
    "name": "C#"
  },
  {
    "_id": "dart",
    "name": "Dart"
  },
  {
    "_id": "ruby",
    "name": "Ruby"
  },
  {
    "_id": "cpp",
    "name": "C++"
  }
];

const lessons = [
  {
    "_id": "692ae7577fdaad24a2aec50e",
    "chapter": "692ae7567fdaad24a2aec4ec",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "7.1 Khái niệm",
    "slug": "tinh-dong-goi-kn",
    "content": "<h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Định nghĩa Encapsulation</h2>\n<p>Đóng gói (Encapsulation), theo nghĩa đen, là hành động gói (bundle) dữ liệu (thuộc tính) và phương thức (hành vi) thành một đơn vị duy nhất: <strong>đối tượng (Object)</strong>.</p>\n<p>Hãy tưởng tượng đối tượng giống như một \"viên thuốc\" (capsule). Lớp vỏ bên ngoài bảo vệ các thành phần bên trong, ngăn chặn việc truy cập hoặc sửa đổi dữ liệu tùy tiện từ bên ngoài.</p>\n\n<h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Mục đích</h2>\n<p>Tính đóng gói mang lại các lợi ích chính:</p>\n<ul style=\"list-style-type: disc; margin-left: 20px;\">\n    <li><strong>Bảo vệ dữ liệu (Data Protection):</strong> Ngăn chặn việc gán giá trị sai quy tắc (ví dụ: tuổi âm, số dư âm), giúp đối tượng luôn ở trạng thái hợp lệ.</li>\n    <li><strong>Ẩn thông tin (Information Hiding):</strong> Che giấu sự phức tạp bên trong. Người dùng chỉ cần biết \"dùng như thế nào\" (qua hàm public) mà không cần quan tâm \"nó được lưu trữ ra sao\".</li>\n    <li><strong>Kiểm soát truy cập (Access Control):</strong> Giúp lập trình viên quyết định ai được phép xem, ai được phép sửa đổi dữ liệu.</li>\n</ul>\n\n<h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Vai trò</h2>\n<p>Đóng gói biến đối tượng thành một <strong>\"hộp đen\"</strong> (black box). Các thành phần bên ngoài chỉ giao tiếp với hộp này thông qua các nút bấm (giao diện) có sẵn mà không cần nhìn thấy cấu tạo bên trong.</p>\n<ul style=\"list-style-type: disc; margin-left: 20px;\">\n    <li><strong>Dễ bảo trì:</strong> Sửa logic bên trong không làm ảnh hưởng đến code bên ngoài, miễn là các \"nút bấm\" không đổi.</li>\n    <li><strong>Dễ kiểm thử:</strong> Dữ liệu và hành vi được cô lập trong từng Class, giúp việc tìm và sửa lỗi dễ dàng hơn.</li>\n</ul>\n\n<div style=\"background-color: #e8f4fd; border-left: 4px solid #3498db; padding: 10px; margin-top: 15px;\">\n    <strong>Ghi nhớ:</strong> Tính đóng gói giống như việc sử dụng một chiếc TV. Bạn chỉ cần dùng điều khiển (Remote) để chuyển kênh, tăng âm lượng mà không cần tháo vỏ TV ra để nối dây điện bên trong.\n</div>"
  },
  {
    "_id": "692ae7577fdaad24a2aec512",
    "chapter": "692ae7567fdaad24a2aec4e6",
    "knowledge_type": "692ae7567fdaad24a2aec4dd",
    "title": "Mẹo xử lý lỗi Diamond Problem trong Đa kế thừa",
    "slug": "meo-da-ke-thua",
    "content": "<p>Trong C++, khi kế thừa hình thoi cần dùng virtual inheritance...</p>"
  },
  {
    "_id": "692b1b8ec5044e5f5eff746c",
    "chapter": "692ae7567fdaad24a2aec4ec",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "7.2 Access Modifier",
    "slug": "tinh-dong-goi-am",
    "content": "<!DOCTYPE html><html lang=\"vi\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>Chương 3: Tính Đóng Gói - Access Modifier</title></head><body><h2 style=\"font-weight: bold; font-size: 1.5em;\">Khái niệm</h2><p>Access Modifier giống như các ổ khóa và chìa khóa. Chúng xác định xem ai (lớp nào, gói nào) có quyền mở cửa để xem hoặc chỉnh sửa các thành phần bên trong một lớp.</p><h2 style=\"font-weight: bold; font-size: 1.5em;\">Các mức truy cập và Phạm vi (Scope)</h2><p>Trong lập trình hướng đối tượng, quyền truy cập thường được phân chia thành bốn mức độ cơ bản, sắp xếp theo thứ tự từ ít hạn chế nhất đến hạn chế nhất:</p><ul><li><strong>Public (Công khai):</strong> Đây là mức truy cập rộng nhất. Các thành phần được khai báo là <code>public</code> có thể được truy cập từ bất kỳ đâu trong chương trình: từ nội bộ lớp, từ các lớp khác trong cùng gói, hoặc từ bất kỳ lớp nào bên ngoài (miễn là có tham chiếu tới đối tượng).</li><li><strong>Protected (Được bảo vệ):</strong> Mức truy cập này được thiết kế chủ yếu cho cơ chế kế thừa. Thành phần <code>protected</code> cho phép truy cập từ bên trong cùng lớp, các lớp khác trong cùng gói và đặc biệt là các lớp con (subclass), ngay cả khi lớp con đó nằm ở một gói khác. Tuy nhiên, nó vẫn đóng lại đối với các lớp không liên quan nằm ngoài gói.</li><li><strong>Default (Mặc định - Package Private):</strong> Đây là mức truy cập được áp dụng khi lập trình viên không chỉ định từ khóa nào (đặc thù trong Java). Phạm vi của nó giới hạn trong \"gói\" (package). Chỉ các lớp nằm cùng gói mới có thể nhìn thấy và truy cập thành phần này.</li><li><strong>Private (Riêng tư):</strong> Đây là mức truy cập hạn chế nhất và là nền tảng cốt lõi của kỹ thuật ẩn dữ liệu. Thành phần <code>private</code> chỉ có thể được truy cập và thao tác từ bên trong chính lớp khai báo nó. Mọi nỗ lực truy cập từ bên ngoài, kể cả từ lớp con, đều bị trình biên dịch từ chối.</li></ul><h2 style=\"font-weight: bold; font-size: 1.5em;\"> Ý nghĩa của access modifier với đóng gói</h2><p>Để đạt được sự đóng gói chuẩn mực, chúng ta thường tuân theo quy tắc:</p><ul><li><strong>Dữ liệu (Thuộc tính):</strong> Luôn để <code>private</code> để giấu kín bên trong.</li><li><strong>Hành vi (Phương thức):</strong> Để <code>public</code> nếu muốn bên ngoài sử dụng, hoặc <code>private</code> nếu chỉ dùng nội bộ.</li></ul></body></html>"
  },
  {
    "_id": "692b1c06c5044e5f5eff746e",
    "chapter": "692ae7567fdaad24a2aec4ec",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "7.4 Getter & Setter",
    "slug": "tinh-dong-goi-gs",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 3: Tính Đóng Gói - Getter và Setter</title>\n</head>\n<body>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">Khái niệm và vai trò</h2>\n    \n    <ul>\n        <li><strong>Getter:</strong> Phương thức công khai giúp bên ngoài \"xem\" giá trị.</li>\n        <li><strong>Setter:</strong> Phương thức công khai giúp bên ngoài \"đề nghị thay đổi\" giá trị. Tại đây, ta có thể chấp nhận hoặc từ chối đề nghị đó.</li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">Validate dữ liệu trong setter</h2>\n    <p>Sức mạnh thực sự của Setter nằm ở khả năng <strong>kiểm tra tính hợp lệ (Validation)</strong>. Nếu dữ liệu đầu vào không hợp lệ, Setter sẽ chặn lại ngay lập tức, bảo vệ đối tượng khỏi trạng thái lỗi.</p>\n    \n    <p><strong>Ví dụ minh họa Logic kiểm tra (C++):</strong></p>\n    <pre style=\"background-color: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; font-family: monospace;\">\n#include &lt;iostream&gt;\nusing namespace std;\n\nclass NhanVien {\nprivate:\n    int tuoi; // Dữ liệu bị ẩn\n\npublic:\n    // Getter: Cho phép xem tuổi\n    int getTuoi() {\n        return tuoi;\n    }\n\n    // Setter: Kiểm tra tuổi trước khi gán\n    void setTuoi(int tuoiMoi) {\n        // Validation: Tuổi phải từ 18 đến 65\n        if (tuoiMoi >= 18 && tuoiMoi <= 65) {\n            tuoi = tuoiMoi;\n        } else {\n            cout << \"Tuổi không hợp lệ!\" << endl;\n        }\n    }\n};\n    </pre>\n    <p>Trong ví dụ trên, nếu ai đó cố tình gán <code>setTuoi(-5)</code>, đoạn code trong <code>if</code> sẽ chặn lại, giữ cho biến <code>tuoi</code> luôn an toàn.</p>\n\n</body>\n</html>"
  },
  {
    "_id": "692c08e3e45d607d648891a4",
    "chapter": "692ae7567fdaad24a2aec4e0",
    "knowledge_type": "692ae7567fdaad24a2aec4dd",
    "title": "Đáp án",
    "slug": "dap-an-1764493539032",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Đáp án Trắc nghiệm OOP</title>\n</head>\n<body style=\"font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;\">\n\n    <p style=\"color: black; font-size: 1.6em; font-weight: bold; border-bottom: 2px solid #eee; padding-bottom: 10px; text-align: left; margin-bottom: 25px;\">\n        <big><strong>ĐÁP ÁN VÀ GIẢI THÍCH CHI TIẾT (TỔNG QUAN OOP)</strong></big>\n    </p>\n\n    <div style=\"margin-bottom: 30px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-bottom: 5px;\">\n            <big><strong>Câu 1: Lập trình hướng đối tượng (OOP) là gì?</strong></big>\n        </h3>\n        <div style=\"margin-bottom: 10px; color: #555;\">\n            A. Là phương pháp lập trình dựa trên các hàm và thủ tục tuyến tính.<br>\n            <strong style=\"color: #000;\">B. Là mô hình lập trình dựa trên khái niệm \"đối tượng\" chứa dữ liệu và mã nguồn.</strong><br>\n            C. Là ngôn ngữ lập trình chỉ dùng để thiết kế giao diện web.<br>\n            D. Là cách viết code không cần sử dụng biến hay hàm.\n        </div>\n        \n        <div style=\"border: 1px solid #333; background-color: #f9f9f9; padding: 15px;\">\n            <strong>Giải thích:</strong> OOP (Object-Oriented Programming) là mô hình xoay quanh các \"đối tượng\" (Objects). Mục tiêu của nó là mô phỏng thế giới thực vào trong code để dễ quản lý, thay vì chỉ viết các hàm xử lý tuyến tính (Procedural Programming).\n        </div>\n    </div>\n\n    <div style=\"border-top: 2px solid #ddd; padding-top: 20px; margin-bottom: 30px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-bottom: 5px;\">\n            <big><strong>Câu 2: Sự khác nhau cơ bản giữa Class (Lớp) và Object (Đối tượng) là gì?</strong></big>\n        </h3>\n        <div style=\"margin-bottom: 10px; color: #555;\">\n            A. Class là thực thể cụ thể, Object là bản thiết kế.<br>\n            B. Class và Object là hai tên gọi khác nhau của cùng một thứ.<br>\n            <strong style=\"color: #000;\">C. Class là bản thiết kế (khuôn mẫu), Object là thực thể cụ thể được tạo ra từ Class.</strong><br>\n            D. Object dùng để lưu trữ dữ liệu, Class dùng để xóa dữ liệu.\n        </div>\n        \n        <div style=\"border: 1px solid #333; background-color: #f9f9f9; padding: 15px;\">\n            <strong>Giải thích:</strong> Hãy tưởng tượng <strong>Class</strong> như bản vẽ thiết kế của một ngôi nhà (Blueprint) - nó chỉ nằm trên giấy. Còn <strong>Object</strong> là ngôi nhà thực tế được xây dựng từ bản vẽ đó (Instance) - chiếm diện tích đất thực sự.\n        </div>\n    </div>\n\n    <div style=\"border-top: 2px solid #ddd; padding-top: 20px; margin-bottom: 30px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-bottom: 5px;\">\n            <big><strong>Câu 3: Bốn tính chất quan trọng nhất của OOP là gì?</strong></big>\n        </h3>\n        <div style=\"margin-bottom: 10px; color: #555;\">\n            A. Cộng, Trừ, Nhân, Chia.<br>\n            <strong style=\"color: #000;\">B. Đóng gói, Kế thừa, Đa hình, Trừu tượng.</strong><br>\n            C. HTML, CSS, JavaScript, SQL.<br>\n            D. Biến, Mảng, Vòng lặp, Hàm.\n        </div>\n        \n        <div style=\"border: 1px solid #333; background-color: #f9f9f9; padding: 15px;\">\n            <strong>Giải thích:</strong> 4 trụ cột bắt buộc phải nhớ:\n            <ul style=\"margin-top: 5px; margin-bottom: 0;\">\n                <li><strong>Đóng gói (Encapsulation):</strong> Bảo vệ dữ liệu.</li>\n                <li><strong>Kế thừa (Inheritance):</strong> Tái sử dụng code từ cha sang con.</li>\n                <li><strong>Đa hình (Polymorphism):</strong> Linh hoạt trong hành động.</li>\n                <li><strong>Trừu tượng (Abstraction):</strong> Ẩn đi sự phức tạp bên dưới.</li>\n            </ul>\n        </div>\n    </div>\n\n    <div style=\"border-top: 2px solid #ddd; padding-top: 20px; margin-bottom: 30px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-bottom: 5px;\">\n            <big><strong>Câu 4: Tại sao OOP giúp code dễ bảo trì hơn?</strong></big>\n        </h3>\n        <div style=\"margin-bottom: 10px; color: #555;\">\n            A. Vì OOP bắt buộc code phải ngắn hơn.<br>\n            B. Vì OOP không cho phép sửa lỗi sau khi viết xong.<br>\n            <strong style=\"color: #000;\">C. Vì tính chất tái sử dụng (Kế thừa) và khả năng quản lý code theo từng module (Đóng gói).</strong><br>\n            D. Vì máy tính chạy code OOP nhanh hơn gấp đôi code thường.\n        </div>\n        \n        <div style=\"border: 1px solid #333; background-color: #f9f9f9; padding: 15px;\">\n            <strong>Giải thích:</strong> Nhờ tính <strong>Kế thừa</strong>, ta không phải viết lại code lặp. Nhờ tính <strong>Đóng gói</strong>, khi sửa lỗi ở một module (đối tượng) này sẽ ít ảnh hưởng đến các module khác, giúp việc nâng cấp và sửa lỗi an toàn hơn.\n        </div>\n    </div>\n\n    <div style=\"border-top: 2px solid #ddd; padding-top: 20px; margin-bottom: 30px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-bottom: 5px;\">\n            <big><strong>Câu 5: Đa hình (Polymorphism) được hiểu như thế nào?</strong></big>\n        </h3>\n        <div style=\"margin-bottom: 10px; color: #555;\">\n            <strong style=\"color: #000;\">A. Một hành động có thể được thực hiện theo nhiều cách khác nhau tùy thuộc vào đối tượng gọi nó.</strong><br>\n            B. Khả năng che giấu dữ liệu quan trọng không cho người dùng thấy.<br>\n            C. Việc tạo ra nhiều bản sao của cùng một file code.<br>\n            D. Chỉ cho phép sử dụng một tên hàm duy nhất trong toàn bộ chương trình.\n        </div>\n        \n        <div style=\"border: 1px solid #333; background-color: #f9f9f9; padding: 15px;\">\n            <strong>Giải thích:</strong> \"Đa hình\" nghĩa là \"nhiều hình thái\". Ví dụ: Hành động \"Phát ra tiếng kêu\" (Speak). Với đối tượng Chó sẽ là \"Gâu gâu\", với Mèo là \"Meo meo\". Cùng một tên hàm nhưng cách thực hiện khác nhau tùy đối tượng.\n        </div>\n    </div>\n\n</body>\n</html>"
  },
  {
    "_id": "692edefed34cc6910180d4c7",
    "chapter": "692ae7567fdaad24a2aec4e4",
    "knowledge_type": "692ae7567fdaad24a2aec4db",
    "title": "Bài tập: HinhChuNhat",
    "slug": "bai-tap-hinhchunhat-1764679422505",
    "content": "<!doctype html>\n<html lang=\"vi\">\n<head>\n  <meta charset=\"utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\" />\n  <title>Bài tập thực hành OOP: Lớp Hình Chữ Nhật</title>\n  \n</head>\n<body>\n  <div class=\"card\">\n    <h1><strong>Yêu cầu:</strong></h1>\n    <ol>\n      <li>\n        <strong>Tạo lớp \"HinhChuNhat\" với các thuộc tính: chiều dài, chiều rộng.  \n        Viết các phương thức: tính diện tích, tính chu vi và hiển thị thông tin.</strong>\n        <div class=\"note\">\n            Công thức: \n            Diện tích = dài * rộng; \n            Chu vi = (dài + rộng) * 2.<br>\n            Yêu cầu: Tạo một vài đối tượng với kích thước khác nhau và in kết quả ra màn hình.\n        </div>\n      </li>\n    </ol>\n  </div>\n</body>\n</html>"
  },
  {
    "_id": "692edfe7d34cc6910180d52c",
    "chapter": "692ae7567fdaad24a2aec4e4",
    "knowledge_type": "692ae7567fdaad24a2aec4dd",
    "title": "Lời giải: HinhChuNhat",
    "slug": "loi-giai-hinhchunhat-1764679655541",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Bài tập OOP - HinhChuNhat</title>\n</head>\n<body>\n\n    <big><strong>Bài tập OOP: Lớp HinhChuNhat</strong></big>\n\n    <p><strong>Yêu cầu:</strong></p>\n    <ul>\n        <li>Tạo lớp <code>HinhChuNhat</code> với thuộc tính: <strong>chieuDai</strong>, <strong>chieuRong</strong>.</li>\n        <li>Viết các phương thức:\n            <ul>\n                <li>Tính diện tích: <code>dientich = dai * rong</code></li>\n                <li>Tính chu vi: <code>chuvi = (dai + rong) * 2</code></li>\n                <li>Hiển thị thông tin</li>\n            </ul>\n        </li>\n        <li>Tạo vài đối tượng và in kết quả.</li>\n    </ul>\n</body>\n</html>\n"
  },
  {
    "_id": "692edff1d34cc6910180d532",
    "chapter": "692ae7567fdaad24a2aec4e4",
    "knowledge_type": "692ae7567fdaad24a2aec4dd",
    "title": "Lời giải: NguyenLieu",
    "slug": "loi-giai-nguyenlieu-1764679665448",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Bài tập OOP - NguyenLieu</title>\n</head>\n\n<body>\n\n<big><strong>Bài tập OOP: Lớp NguyenLieu</strong></big>\n\n<h3><strong>Yêu cầu</strong></h3>\n<ul>\n    <li>Tạo lớp <strong>NguyenLieu</strong> gồm:\n        <ul>\n            <li>Tên nguyên liệu</li>\n            <li>Số lượng</li>\n            <li>Đơn vị (gram, ml, cái,...)</li>\n        </ul>\n    </li>\n    <li>Viết các phương thức:\n        <ul>\n            <li><code>hienThi()</code> – In thông tin nguyên liệu</li>\n            <li><code>capNhatSoLuong()</code> – Thay đổi số lượng</li>\n        </ul>\n    </li>\n    <li>Tạo danh sách nguyên liệu và thay đổi số lượng một vài nguyên liệu.</li>\n</ul>\n</body>\n</html>\n"
  },
  {
    "_id": "692ee21ed34cc6910180d655",
    "chapter": "692ede83d34cc6910180d487",
    "knowledge_type": "692ae7567fdaad24a2aec4db",
    "title": "Bài tập: DongVat",
    "slug": "bai-tap-dongvat-1764680222317",
    "content": "<!doctype html>\n<html lang=\"vi\">\n<head>\n  <meta charset=\"utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\" />\n  <title>Bài tập thực hành OOP: Kế thừa</title>\n \n</head>\n<body>\n  <div class=\"card\">\n    <h1>Bài tập thực hành OOP: Kế thừa</h1>\n    <ol>\n      <li>\n        <strong>Tạo lớp cha \"DongVat\" với phương thức \"phatTiengKeu()\".  \n        Tạo lớp con \"Cho\" và \"Meo\" kế thừa \"DongVat\" và override phương thức \"phatTiengKeu()\".</strong>\n        <div class=\"note\">Kiểm tra tạo đối tượng và gọi phương thức từ các lớp con để thấy đa hình.</div>\n      </li>\n    </ol>\n\n    <p class=\"note\">Có thể thực hiện bằng Java, C++, C#, Ruby, PHP hoặc Dart.</p>\n  </div>\n</body>\n</html>\n"
  },
  {
    "_id": "692ee226d34cc6910180d65b",
    "chapter": "692ede83d34cc6910180d487",
    "knowledge_type": "692ae7567fdaad24a2aec4db",
    "title": "Bài tập: HinhHoc",
    "slug": "bai-tap-hinhhoc-1764680230932",
    "content": "<!doctype html>\n<html lang=\"vi\">\n<head>\n  <meta charset=\"utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\" />\n  <title>Bài tập thực hành OOP: Kế thừa</title>\n \n</head>\n<body>\n  <div class=\"card\">\n    <h1>Bài tập thực hành OOP: Kế thừa</h1>\n    <ol>\n      <li>\n        <strong>Tạo lớp cha \"HinhHoc\" với phương thức trừu tượng \"tinhDienTich()\".  \n        Tạo các lớp con \"HinhVuong\", \"HinhTron\" kế thừa và cài đặt phương thức tính diện tích.</strong>\n        <div class=\"note\">Nhập dữ liệu và hiển thị diện tích của từng hình.</div>\n      </li>\n    </ol>\n\n    <p class=\"note\">Có thể thực hiện bằng Java, C++, C#, Ruby, PHP hoặc Dart.</p>\n  </div>\n</body>\n</html>\n"
  },
  {
    "_id": "692ee23fd34cc6910180d66d",
    "chapter": "692ede83d34cc6910180d487",
    "knowledge_type": "692ae7567fdaad24a2aec4dd",
    "title": "Lời giải: HinhHoc",
    "slug": "loi-giai-hinhhoc-1764680255996",
    "content": "<!DOCTYPE html>\n<html>\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Bài tập OOP – Tính trừu tượng & Kế thừa</title>\n</head>\n<body>\n    <big><strong>Bài tập: Lớp HinhHoc và các lớp kế thừa</strong></big>\n\n    <h2>Yêu cầu:</h2>\n    <ul>\n        <li>Tạo lớp cha <b>HinhHoc</b> có phương thức trừu tượng <b>tinhDienTich()</b>.</li>\n        <li>Tạo các lớp con:\n            <ul>\n                <li><b>HinhVuong</b> – nhập cạnh và tính diện tích theo công thức <code>S = a × a</code>.</li>\n                <li><b>HinhTron</b> – nhập bán kính và tính diện tích theo công thức <code>S = π × r²</code>.</li>\n            </ul>\n        </li>\n        <li>Cả hai lớp con phải <b>override</b> phương thức <i>tinhDienTich()</i>.</li>\n        <li>Tạo một vài đối tượng và in ra diện tích từng hình.</li>\n    </ul>\n\n    <h2>Hướng dẫn thực hiện:</h2>\n    <ol>\n        <li>Tạo lớp trừu tượng hoặc abstract class tên <b>HinhHoc</b>.</li>\n        <li>Khai báo phương thức trừu tượng <code>tinhDienTich()</code> trong lớp cha.</li>\n        <li>Tạo lớp <b>HinhVuong</b> và <b>HinhTron</b> kế thừa lớp cha.</li>\n        <li>Ở từng lớp con, cài đặt lại phương thức tính diện tích theo công thức riêng.</li>\n        <li>Tạo đối tượng và gọi phương thức để kiểm tra.</li>\n    </ol>\n</body>\n</html>"
  },
  {
    "_id": "692bb799a0a7add9d4493891",
    "chapter": "692ae7567fdaad24a2aec4ea",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "6.2 Phương thức trừu tượng (Abstraction Method)",
    "slug": "phuong-thuc-truu-tuong",
    "content": "<big><strong>Khái niệm</strong></big><p>Phương thức trừu tượng (Abstract Method), hay trong C++ gọi là <em>Hàm ảo thuần túy (Pure Virtual Function)</em>, là một phương thức được khai báo trong lớp cha nhưng <strong>hoàn toàn không có phần thân (body)</strong>. Nó kết thúc bằng dấu chấm phẩy <code>;</code> thay vì cặp ngoặc nhọn <code>{}</code>.</p><big><strong>Tại sao lại sinh ra hàm &quot;rỗng&quot; này?</big></strong><p>Nó đóng vai trò như một <strong>bản hợp đồng bắt buộc</strong>. Lớp cha (Parent Class) biết rằng hành động này tồn tại, nhưng nhường quyền quyết định cách thực hiện chi tiết cho các lớp con (Child Class).</p><big><strong>Ví dụ minh họa: Hệ thống gửi thông báo</big></strong><p>Giả sử bạn có lớp cha là <code>ThongBao</code>. Ta biết mọi thông báo đều cần phải <code>guiDi()</code>, nhưng:</p><ul><li>Với <strong>SMS</strong>: Cần kết nối mạng viễn thông, giới hạn 160 ký tự.</li><li>Với <strong>Email</strong>: Cần giao thức SMTP, có tiêu đề và nội dung HTML.</li></ul><p>Lúc này, tại lớp cha, bạn chỉ khai báo: <code>abstract void guiDi();</code>. Các lớp con <code>SMS</code> và <code>Email</code> bắt buộc phải <strong>Ghi đè (Override)</strong> hàm này. Nếu không viết, chương trình sẽ báo lỗi.</p>"
  },
  {
    "_id": "692bb7dba0a7add9d4493892",
    "chapter": "692ae7567fdaad24a2aec4ea",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "6.3 Lớp trừu tượng và interface",
    "slug": "lop-truu-tuong-va-interface",
    "content": "<big><strong>Lớp trừu tượng (Abstract Class)</big></strong>\n<p><strong>Bản chất:</strong> Là một bản thiết kế &quot;bán hoàn thiện&quot;. Nó thường đóng vai trò là lớp cha (Base Class) cho các đối tượng có cùng huyết thống.</p>\n<ul><li><strong>Đặc điểm:</strong> Có thể chứa cả hàm đã viết xong (logic chung) và hàm chưa viết (abstract).</li>\n<li><strong>Quy tắc:</strong> Không thể tạo đối tượng trực tiếp (<code>new AbstractClass()</code> là lỗi).</li>\n<li><strong>Ví dụ:</strong> Lớp <code>DongVat</code> có hàm <code>Ngu()</code> (ai cũng ngủ giống nhau) và hàm abstract <code>Keu()</code> (mỗi con kêu một kiểu).</li>\n</ul>\n<big><strong>Giao diện (Interface)</big></strong>\n<p><strong>Bản chất:</strong> Là một bản hợp đồng hay chuẩn kết nối. Nó quy định các hành vi &quot;phải có&quot; mà không quan tâm đối tượng đó là gì.</p>\n<ul>\n<li><strong>Đặc điểm:</strong> Chỉ chứa các khai báo hàm (rỗng hoàn toàn) và hằng số (trong OOP thuần túy).</li>\n<li><strong>Sức mạnh:</strong> Hỗ trợ <strong>Đa kế thừa (Multiple Inheritance)</strong>. Một lớp có thể thực thi nhiều Interface cùng lúc.</li>\n<li><strong>Ví dụ:</strong> Interface <code>USB</code>. Chuột, Phím, Ổ cứng đều có thể cắm vào cổng USB dù chúng khác nhau hoàn toàn.</li>\n</ul>\n<big><strong>Phân biệt abstract class và interface</strong></big>\n<table style=\"border-collapse: collapse; width: 100%; text-align: center;\">\n    <thead>\n        <tr style=\"background-color: #f2f2f2;\">\n            <th style=\"border: 1px solid black; text-align: center;\">Tiêu chí</th>\n            <th style=\"border: 1px solid black; text-align: center;\">Abstract Class</th>\n            <th style=\"border: 1px solid black; text-align: center;\">Interface</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td style=\"border: 1px solid black; text-align: center;\"><strong>Mối quan hệ</strong></td>\n            <td style=\"border: 1px solid black; text-align: center;\">\n                <strong>IS-A</strong> (Là một...)<br><em>VD: Chó là Động vật.</em>\n            </td>\n            <td style=\"border: 1px solid black; text-align: center;\">\n                <strong>CAN-DO</strong> (Có khả năng...)<br><em>VD: Chó biết Bơi.</em>\n            </td>\n        </tr>\n        <tr>\n            <td style=\"border: 1px solid black; text-align: center;\"><strong>Dữ liệu</strong></td>\n            <td style=\"border: 1px solid black; text-align: center;\">Có thể lưu trạng thái (biến).</td>\n            <td style=\"border: 1px solid black; text-align: center;\">Chỉ chứa hằng số (không đổi).</td>\n        </tr>\n        <tr>\n            <td style=\"border: 1px solid black; text-align: center;\"><strong>Kế thừa</strong></td>\n            <td style=\"border: 1px solid black; text-align: center;\">Đơn kế thừa (Chỉ 1 cha).</td>\n            <td style=\"border: 1px solid black; text-align: center;\">Đa kế thừa (Nhiều interface).</td>\n        </tr>\n    </tbody>\n</table>"
  },
  {
    "_id": "692c0259e45d607d6488908c",
    "chapter": "692ae7567fdaad24a2aec4ea",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "6.4 Tổng kết",
    "slug": "64-tong-ket-1764491865046",
    "content": "<big><strong>Hệ thống hóa kiến thức</big></strong><p>Chúng ta đã đi qua một trong những khái niệm quan trọng nhất của OOP. Bây giờ ta hãy nhìn lại bức tranh toàn cảnh:</p>\n<ul>\n<li><strong>Abstraction (Tư duy):</strong> Là nền tảng. Mục tiêu là đơn giản hóa hệ thống bằng cách ẩn đi sự phức tạp (Hide Implementation) và chỉ hiện ra giao diện sử dụng (Show Interface).</li>\n<li><strong>Abstract Method (Công cụ nhỏ):</strong> Là những viên gạch nhỏ nhất để ép buộc các lớp con phải tuân thủ logic.</li>\n<li><strong>Abstract Class &amp; Interface (Công cụ lớn):</strong> Là các khuôn mẫu thiết kế để tổ chức code, giúp code dễ bảo trì và mở rộng.</li>\n</ul>\n<big><strong>Những sai lầm thường gặp (Common Pitfalls)</big></strong>\n<ul>\n<li><strong>Lầm tưởng:</strong> Nghĩ rằng Abstraction chỉ để cho &quot;ngầu&quot;. <br><em>Thực tế:</em> Nó giúp bảo vệ code của chúng ta khỏi bị phá vỡ khi yêu cầu thay đổi.</li>\n<li><strong>Lạm dụng:</strong> Tạo ra quá nhiều Interface/Abstract class cho những thứ đơn giản. <br><em>Lời khuyên:</em> Chỉ dùng khi thấy có khả năng mở rộng hoặc có nhiều đối tượng chia sẻ chung logic.</li>\n</ul>\n<big><strong>Từ khóa cốt lõi (Keywords)</big></strong>\n<ul>\n<li><strong>What vs How:</strong> Quan tâm cái gì, bỏ qua thế nào.</li>\n<li><strong>Blueprint:</strong> Bản thiết kế (Abstract Class).</li>\n<li><strong>Contract:</strong> Hợp đồng (Interface).</li><li><strong>Decoupling:</strong> Giảm sự phụ thuộc giữa các thành phần.</li>\n</ul>\n<div style=\"background-color: #e8f4fd; border-left: 4px solid #3498db; padding: 10px; margin-top: 15px; font-size = 5px;\"><p><big><strong>Tổng kết cuối cùng:</strong></big></p><p>Abstraction giống như việc ta dùng một chiếc ổ cắm điện. Ta không cần biết điện được tạo ra từ thủy điện hay nhiệt điện, đi dây như thế nào. Ta chỉ cần biết ổ cắm có 2 lỗ (Interface) và cắm phích vào là có điện. Đó chính là đỉnh cao của thiết kế phần mềm.</p></div>"
  },
  {
    "_id": "692c0855e45d607d64889190",
    "chapter": "692ae7567fdaad24a2aec4e6",
    "knowledge_type": "692ae7567fdaad24a2aec4db",
    "title": "Bài tập: Tính kế thừa",
    "slug": "bai-tap-tinh-ke-thua-1764493397085",
    "content": "<!doctype html>\n<html lang=\"vi\">\n<head>\n  <meta charset=\"utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\" />\n  <style>\n    body {\n      font-family: system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial;\n      line-height: 1.6;\n      padding: 24px;\n      background: #f9f9fb;\n      color: #111;\n    }\n    .card {\n      max-width: 800px;\n      margin: 0 auto 24px auto;\n      background: #fff;\n      border: 1px solid #e5e7eb;\n      border-radius: 8px;\n      padding: 20px;\n      box-shadow: 0 6px 18px rgba(18,24,31,0.04);\n    }\n    h1 {\n      font-size: 20px;\n      margin: 0 0 12px;\n    }\n    ol {\n      padding-left: 20px;\n    }\n    li {\n      margin: 16px 0;\n      font-size: 16px;\n    }\n    .note {\n      margin-top: 12px;\n      font-size: 14px;\n      color: #555;\n    }\n  </style>\n</head>\n<body>\n  <div class=\"card\">\n<p><big><strong>Bài tập thực hành OOP: Kế thừa</strong></big></p>\n    <ol>\n      <li>\n        <strong>Tạo lớp cha \"DongVat\" với phương thức \"phatTiengKeu()\".  \n        Tạo lớp con \"Cho\" và \"Meo\" kế thừa \"DongVat\" và override phương thức \"phatTiengKeu()\".</strong>\n        <div class=\"note\">Kiểm tra tạo đối tượng và gọi phương thức từ các lớp con để thấy đa hình.</div>\n      </li>\n      <li>\n        <strong>Tạo lớp cha \"HinhHoc\" với phương thức trừu tượng \"tinhDienTich()\".  \n        Tạo các lớp con \"HinhVuong\", \"HinhTron\" kế thừa và cài đặt phương thức tính diện tích.</strong>\n        <div class=\"note\">Nhập dữ liệu và hiển thị diện tích của từng hình.</div>\n      </li>\n      <li>\n        <strong>Tạo lớp \"NhanVien\" với các thuộc tính cơ bản (tên, lương).  \n        Tạo lớp con \"NhanVienFullTime\" và \"NhanVienPartTime\" kế thừa và thêm phương thức tính thu nhập riêng.</strong>\n        <div class=\"note\">Tạo vài đối tượng nhân viên và in ra thu nhập của từng loại.</div>\n      </li>\n    </ol>\n\n    <p class=\"note\">Có thể thực hiện bằng Java, C++, C#, Python hoặc Dart.</p>\n  </div>\n</body>\n</html>\n"
  },
  {
    "_id": "692edf71d34cc6910180d4e8",
    "chapter": "692ae7567fdaad24a2aec4e4",
    "knowledge_type": "692ae7567fdaad24a2aec4dd",
    "title": "Lời giải: SinhVien",
    "slug": "loi-giai-sinhvien-1764679537309",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Bài tập OOP - SinhVien</title>\n</head>\n<body>\n\n    <p><strong>Yêu cầu:</strong></p>\n    <ul>\n        <li>Tạo lớp <code>SinhVien</code> với thuộc tính: <strong>ten</strong>, <strong>tuoi</strong>, <strong>diemTrungBinh</strong>.</li>\n        <li>Viết các phương thức:\n            <ul>\n                <li>Nhập thông tin sinh viên</li>\n                <li>Hiển thị thông tin</li>\n                <li>Tính xếp loại học lực:\n                    <ul>\n                        <li><strong> + A</strong> nếu <code>diem &ge; 8</code></li>\n                        <li><strong> +  B</strong> nếu <code>diem &ge; 6.5</code></li>\n                        <li><strong> +  C</strong> nếu <code>diem &ge; 5</code></li>\n                        <li><strong> +  D</strong> nếu <code>diem < 5</code></li>\n                    </ul>\n                </li>\n            </ul>\n        </li>\n        <li>Tạo vài đối tượng và in kết quả.</li>\n    </ul>\n</body>\n</html>"
  },
  {
    "_id": "692ee235d34cc6910180d667",
    "chapter": "692ede83d34cc6910180d487",
    "knowledge_type": "692ae7567fdaad24a2aec4dd",
    "title": "Lời giải: DongVat",
    "slug": "loi-giai-dongvat-1764680245468",
    "content": "<!DOCTYPE html>\n<html>\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Bài tập OOP – Kế thừa và Đa hình</title>\n</head>\n<body>\n    <big><strong>Bài tập: Kế thừa & Đa hình với lớp <i>DongVat</i></strong></big>\n\n    <h2>Yêu cầu:</h2>\n    <ul>\n        <li>Tạo lớp cha <b>DongVat</b> có phương thức <b>phatTiengKeu()</b>.</li>\n        <li>Tạo lớp con:\n            <ul>\n                <li><b>Cho</b> kế thừa <i>DongVat</i> và override phương thức phát tiếng “Gâu gâu”.</li>\n                <li><b>Meo</b> kế thừa <i>DongVat</i> và override tiếng “Meow meow”.</li>\n            </ul>\n        </li>\n        <li>Tạo đối tượng và sử dụng tính đa hình để gọi phương thức.</li>\n    </ul>\n\n    <h2>Hướng dẫn thực hiện:</h2>\n    <ol>\n        <li>Tạo lớp cha với phương thức chung.</li>\n        <li>Dùng từ khóa <b>extends</b> (Java, PHP), <b>:</b> (C#, C++), <b>&lt;</b> (Ruby), <b>extends</b> (Dart) để kế thừa.</li>\n        <li>Override phương thức trong lớp con.</li>\n        <li>Tạo mảng hoặc danh sách động vật và duyệt để thấy đa hình.</li>\n    </ol>\n</body>\n</html>\n"
  },
  {
    "_id": "692ae7567fdaad24a2aec4ee",
    "chapter": "692ae7567fdaad24a2aec4e0",
    "knowledge_type": "692ae7567fdaad24a2aec4d7",
    "title": "1.1 Khái niệm",
    "slug": "gioi-thieu-oop",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 1: Tổng quan OOP - Khái Niệm</title>\n</head>\n<body>\n    \n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Định nghĩa</h2>\n    <p>Lập trình hướng đối tượng (Object-Oriented Programming - OOP) là một mô hình lập trình dựa trên khái niệm <strong>\"đối tượng\" (Object)</strong>. Thay vì tập trung vào các hàm và logic thực thi tuần tự như lập trình thủ tục, OOP tổ chức phần mềm thành các đối tượng chứa đựng cả dữ liệu (thuộc tính) và mã nguồn (phương thức) thao tác trên dữ liệu đó.</p>\n    <p>Mục tiêu cốt lõi của OOP là mô hình hóa các thực thể trong thế giới thực (như Sinh viên, Ô tô, Tài khoản ngân hàng) vào trong mã nguồn máy tính, giúp hệ thống trở nên gần gũi với tư duy con người.</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Sự chuyển dịch tư duy</h2>\n    <p>Để hiểu OOP, cần phân biệt rõ với Lập trình thủ tục (Procedural Programming):</p>\n    <ul style=\"list-style-type: disc; margin-left: 20px;\">\n        <li><strong>Lập trình thủ tục (Ví dụ: PHP thuần, C++ phong cách C):</strong> Tập trung vào hành động. Câu hỏi chính là: <em>\"Hệ thống cần làm gì?\"</em> (Viết hàm A, hàm B, hàm C và chạy tuần tự).</li>\n        <li><strong>Lập trình hướng đối tượng (Ví dụ: Java, C#):</strong> Tập trung vào chủ thể. Câu hỏi chính là: <em>\"Hệ thống bao gồm những cái gì?\"</em> (Đối tượng Khách hàng, Đối tượng Hóa đơn) và chúng tương tác với nhau ra sao.</li>\n    </ul>\n\n    <div style=\"background-color: #e8f4fd; border-left: 4px solid #3498db; padding: 10px; margin-top: 15px;\">\n        <strong>Ghi nhớ:</strong> Nếu lập trình thủ tục giống như làm theo một công thức nấu ăn (Bước 1, Bước 2...), thì OOP giống như việc lắp ráp một chiếc xe hơi từ các linh kiện (Động cơ, Bánh xe, Khung xe) hoạt động phối hợp với nhau.\n    </div>\n\n</body>\n</html>"
  },
  {
    "_id": "692ae7577fdaad24a2aec50a",
    "chapter": "692ae7567fdaad24a2aec4e8",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "5.1 Khái niệm",
    "slug": "tinh-da-hinh",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 5: Khái niệm Đa hình</title>\n</head>\n<body>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Định nghĩa</h2>\n    <p>Thuật ngữ <strong>\"Polymorphism\"</strong> xuất phát từ tiếng Hy Lạp, là sự kết hợp của <em>\"Poly\"</em> (nhiều) và <em>\"Morphs\"</em> (hình thái). Trong khoa học máy tính, Đa hình là khả năng một đối tượng hoặc một hành động có thể giả lập nhiều hình thái khác nhau tùy thuộc vào ngữ cảnh sử dụng.</p>\n    <p>Nói một cách ngắn gọn theo tư duy lập trình: <strong>\"Một giao diện (interface), nhiều cách thực thi (implementation).\"</strong></p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Ví dụ thực tế</h2>\n    <p>Hãy xem xét hành động <strong>\"Phát âm thanh\"</strong>:</p>\n    <ul style=\"list-style-type: disc; margin-left: 20px;\">\n        <li>Khi ngữ cảnh là một con <strong>Người</strong>, âm thanh là tiếng nói.</li>\n        <li>Khi ngữ cảnh là một con <strong>Chó</strong>, âm thanh là tiếng sủa.</li>\n        <li>Khi ngữ cảnh là một con <strong>Mèo</strong>, âm thanh là tiếng kêu meo meo.</li>\n    </ul>\n    <p>Hệ thống chỉ cần gửi đi một thông điệp duy nhất là \"Phát âm thanh\", nhưng mỗi đối tượng sẽ tự biết cách phản hồi theo bản chất riêng của nó mà không cần hệ thống phải kiểm tra từng loại đối tượng thủ công.</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Phân loại</h2>\n    <p>Đa hình thường được chia thành hai loại chính dựa trên thời điểm liên kết (Binding):</p>\n    <ul style=\"list-style-type: disc; margin-left: 20px;\">\n        <li><strong>Đa hình tĩnh (Compile-time Polymorphism):</strong> Xử lý thông qua Nạp chồng (Overloading).</li>\n        <li><strong>Đa hình động (Runtime Polymorphism):</strong> Xử lý thông qua Ghi đè (Overriding).</li>\n    </ul>\n\n</body>\n</html>"
  },
  {
    "_id": "692ae7577fdaad24a2aec50c",
    "chapter": "692ae7567fdaad24a2aec4ea",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "6.1 Tính Trừu tượng (Abstraction)",
    "slug": "tinh-truu-tuong",
    "content": "<big><strong>Định nghĩa</strong></big><p>Trong Lập trình hướng đối tượng (OOP), <strong>Abstraction (Tính trừu tượng)</strong> là quá trình chọn lọc các đặc điểm chung, thiết yếu của một đối tượng để xây dựng mô hình, đồng thời <strong>ẩn đi các chi tiết thực thi phức tạp</strong> không cần thiết đối với người sử dụng.</p>\n<p>Tư duy cốt lõi của Abstraction là tập trung vào câu hỏi: <strong>&quot;Hệ thống này làm được cái gì?&quot; (WHAT)</strong> thay vì đi sâu vào việc <strong>&quot;Nó hoạt động chi tiết ra sao?&quot; (HOW)</strong>.</p><big><strong>Ví dụ thực tế: Chiếc xe hơi (Car)</big></strong><p>Để lái được xe, bạn không cần phải là một kỹ sư cơ khí. Đây là cách Abstraction hoạt động:</p>\n<ul>\n<li><strong>- Phần Trừu tượng (Giao diện):</strong> Vô lăng, Chân ga, Chân phanh. Đây là những thứ bạn tương tác. Bạn biết rằng đạp phanh thì xe sẽ dừng.</li>\n<li><strong>- Phần Ẩn (Triển khai):</strong> Hệ thống piston, trục khuỷu, cơ chế bơm xăng, hay hệ thống phanh ABS điện tử. Những thứ này cực kỳ phức tạp nhưng được giấu kín dưới nắp ca-pô.</li></ul>\n<big><strong>Tại sao Abstraction lại quan trọng?</big></strong><ul>\n<li><strong>- Giảm độ phức tạp (Complexity Management):</strong> Giúp lập trình viên không bị choáng ngợp bởi hàng nghìn dòng code chi tiết. Họ chỉ cần gọi hàm và tin tưởng nó chạy đúng.</li>\n<li><strong>- Tăng tính bảo mật (Security):</strong> Giấu đi các dữ liệu hoặc thuật toán nhạy cảm, chỉ lộ ra những gì an toàn cho người dùng cuối.</li>\n<li><strong>- Dễ dàng nâng cấp:</strong> Bạn có thể thay đổi hoàn toàn động cơ từ &quot;Xăng&quot; sang &quot;Điện&quot; (thay đổi Implementation) mà người lái xe không cần học lái lại từ đầu (Giao diện giữ nguyên).</li>\n</ul>\n<div style=\"background-color: #e8f4fd; border-left: 4px solid #3498db; padding: 10px; margin-top: 15px; font-size = 5px;\">\n<p><strong>Ghi nhớ: Nguyên tắc &quot;Tảng băng trôi&quot;</strong></p>\n<ul>\n<li><strong>● Phần nổi (Abstraction):</strong> Là những gì người dùng thấy và sử dụng (Giao diện, Tên hàm).</li>\n<li><strong>● Phần chìm (Implementation):</strong> Là logic phức tạp bên dưới (Code xử lý).</li>\n<li><strong>● Khẩu quyết:</strong> &quot;Quan tâm <strong>WHAT</strong> (Làm gì), bỏ qua <strong>HOW</strong> (Làm thế nào).&quot;</li>\n</ul>\n</div>"
  },
  {
    "_id": "692b1bf0c5044e5f5eff746d",
    "chapter": "692ae7567fdaad24a2aec4ec",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "7.3 Data Hiding",
    "slug": "tinh-dong-goi-hd",
    "content": "<h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Tại sao biến không nên để public?</h2>\n<p>Khi bạn để một biến là <code>public</code>, bạn mất hoàn toàn quyền kiểm soát nó. Bất kỳ ai cũng có thể gán giá trị sai, gây lỗi logic nghiêm trọng cho chương trình.</p>\n\n<h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Nguyên tắc ẩn dữ liệu (Data Hiding)</h2>\n<p>Nguyên tắc vàng trong OOP: <strong>Thuộc tính nên là <code>private</code>, phương thức giao tiếp nên là <code>public</code>.</strong></p>\n<p>Điều này giúp:</p>\n<ul style=\"list-style-type: disc; margin-left: 20px;\">\n    <li><strong>Kiểm soát dữ liệu đầu vào:</strong> Chỉ chấp nhận giá trị hợp lệ.</li>\n    <li><strong>Bảo vệ toàn vẹn dữ liệu:</strong> Ngăn chặn truy cập trái phép.</li>\n    <li><strong>Dễ bảo trì:</strong> Thay đổi logic bên trong không ảnh hưởng bên ngoài.</li>\n</ul>\n\n<div style=\"background-color: #e8f4fd; border-left: 4px solid #3498db; padding: 10px; margin-top: 15px;\">\n    <strong>Ghi nhớ:</strong> Đóng gói biến đối tượng thành một chiếc \"hộp đen\". Người dùng chỉ cần biết các nút bấm (hàm public) mà không cần quan tâm đến dây điện bên trong (biến private).\n</div>"
  },
  {
    "_id": "692b1c28c5044e5f5eff746f",
    "chapter": "692ae7567fdaad24a2aec4ec",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "7.5 Tổng kết",
    "slug": "tinh-dong-goi-tk",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 3: Tính Đóng Gói - Tổng Kết</title>\n</head>\n<body>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">Điểm cốt lõi cần nhớ</h2>\n    <p>Tính đóng gói không phải là cấm đoán truy cập, mà là <strong>quản lý truy cập</strong>. Nó giúp mã nguồn của bạn trở nên chuyên nghiệp, an toàn và dễ sửa lỗi hơn.</p>\n    <blockquote>\n        <p><strong>Công thức Đóng gói = Dữ liệu Private + Phương thức Public (Getter/Setter).</strong></p>\n    </blockquote>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">Vai trò của đóng gói trong 4 tính chất OOP</h2>\n    <p>Đóng gói là nền tảng đầu tiên để xây dựng một đối tượng hoàn chỉnh:</p>\n    <ul>\n        <li>Nó tạo ra ranh giới rõ ràng cho đối tượng.</li>\n        <li>Nó chuẩn bị cơ sở dữ liệu an toàn để các tính chất khác như Kế thừa và Đa hình có thể hoạt động chính xác mà không lo ngại dữ liệu bị hỏng hóc từ bên trong.</li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">Đóng gói và Trừu tượng: Khác nhau thế nào?</h2>\n    <p>Sinh viên thường hay nhầm lẫn hai khái niệm này. Cách đơn giản nhất để phân biệt:</p>\n    <ul>\n        <li><strong>Tính trừu tượng (Abstraction):</strong> Là về mặt <em>thiết kế</em>. Giúp người dùng chỉ nhìn thấy những gì họ CẦN thấy (đơn giản hóa).</li>\n        <li><strong>Tính đóng gói (Encapsulation):</strong> Là về mặt <em>thực thi</em>. Giúp bảo vệ những gì người dùng KHÔNG CẦN (và không nên) thấy (an toàn dữ liệu).</li>\n    </ul>\n\n</body>\n</html>"
  },
  {
    "_id": "692edef3d34cc6910180d4c1",
    "chapter": "692ae7567fdaad24a2aec4e4",
    "knowledge_type": "692ae7567fdaad24a2aec4db",
    "title": "Bài tập: SinhVien",
    "slug": "bai-tap-sinhvien-1764679411912",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Bài tập OOP - SinhVien</title>\n</head>\n<body>\n\n    <p><strong>Yêu cầu:</strong></p>\n    <ul>\n        <li>Tạo lớp <code>SinhVien</code> với thuộc tính: <strong>ten</strong>, <strong>tuoi</strong>, <strong>diemTrungBinh</strong>.</li>\n        <li>Viết các phương thức:\n            <ul>\n                <li>Nhập thông tin sinh viên</li>\n                <li>Hiển thị thông tin</li>\n                <li>Tính xếp loại học lực:\n                    <ul>\n                        <li><strong> + A</strong> nếu <code>diem &ge; 8</code></li>\n                        <li><strong> +  B</strong> nếu <code>diem &ge; 6.5</code></li>\n                        <li><strong> +  C</strong> nếu <code>diem &ge; 5</code></li>\n                        <li><strong> +  D</strong> nếu <code>diem < 5</code></li>\n                    </ul>\n                </li>\n            </ul>\n        </li>\n        <li>Tạo vài đối tượng và in kết quả.</li>\n    </ul>\n</body>\n</html>"
  },
  {
    "_id": "692ee24bd34cc6910180d673",
    "chapter": "692ede83d34cc6910180d487",
    "knowledge_type": "692ae7567fdaad24a2aec4dd",
    "title": "Lời giải: NhanVien",
    "slug": "loi-giai-nhanvien-1764680267906",
    "content": "<!DOCTYPE html>\n<html>\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Bài tập OOP – Nhân viên</title>\n</head>\n<body>\n    <big><strong>Bài tập: Lớp NhanVien và các lớp kế thừa</strong></big>\n\n    <h2>Yêu cầu:</h2>\n    <ul>\n        <li>Tạo lớp cha <b>NhanVien</b> với các thuộc tính: Tên nhân viên, lương cơ bản.\n        <li>Tạo các lớp con:\n            <ul>\n                <li><b>NhanVienFullTime</b> – thêm phương thức tính thu nhập theo lương cơ bản + thưởng.</li>\n                <li><b>NhanVienPartTime</b> – tính thu nhập theo số giờ làm việc × lương giờ.</li>\n            </ul>\n        </li>\n        <li>Tạo vài đối tượng và in ra thu nhập của từng nhân viên.</li>\n    </ul>\n\n    <h2>Hướng dẫn thực hiện:</h2>\n    <ol>\n        <li>Tạo lớp cha <b>NhanVien</b> với các thuộc tính chung.</li>\n        <li>Trong lớp cha, khai báo phương thức <code>tinhThuNhap()</code> (có thể là abstract hoặc virtual).</li>\n        <li>Tạo lớp con <b>NhanVienFullTime</b> và <b>NhanVienPartTime</b> kế thừa lớp cha.</li>\n        <li>Override phương thức <code>tinhThuNhap()</code> theo cách tính riêng của từng loại nhân viên.</li>\n        <li>Tạo đối tượng, gọi phương thức <code>tinhThuNhap()</code> và in kết quả.</li>\n    </ol>\n</body>\n</html>\n"
  },
  {
    "_id": "692ae7577fdaad24a2aec4fe",
    "chapter": "692ae7567fdaad24a2aec4e4",
    "knowledge_type": "692ae7567fdaad24a2aec4d7",
    "title": "3.1 Khái niệm",
    "slug": "class-object",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 3: Class và Object</title>\n</head>\n<body>\n\n    <p>Đây là hai khái niệm nền tảng không thể tách rời trong OOP. Hiểu đúng mối quan hệ giữa chúng là bước đầu tiên để làm chủ mô hình này.</p>\n    \n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Lớp (Class) - Bản thiết kế</h2>\n    <p>Lớp là một khuôn mẫu (template) hoặc bản vẽ kỹ thuật dùng để tạo ra các đối tượng. Nó định nghĩa các đặc tính và hành vi chung mà mọi đối tượng thuộc loại đó sẽ có.</p>\n    <p>Ví dụ: Class <code>Car</code> (Ô tô) sẽ quy định rằng mọi chiếc xe đều phải có thuộc tính <code>color</code> (màu sắc) và phương thức <code>drive()</code> (lái), nhưng nó không chứa dữ liệu cụ thể của chiếc xe nào.</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Đối tượng (Object) - Thực thể cụ thể</h2>\n    <p>Đối tượng là một <strong>thể hiện (instance)</strong> cụ thể được tạo ra từ Lớp. Nó tồn tại thực sự trong bộ nhớ khi chương trình chạy và chứa các giá trị dữ liệu riêng biệt.</p>\n    <p>Ví dụ: Từ Class <code>Car</code>, ta tạo ra:</p>\n    <ul style=\"list-style-type: disc; margin-left: 20px;\">\n        <li>Object A: Chiếc Ferrari màu đỏ.</li>\n        <li>Object B: Chiếc Toyota màu trắng.</li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Sự khác nhau giữa các ngôn ngữ</h2>\n    <p>Mặc dù khái niệm là nhất quán, cú pháp để định nghĩa Lớp và khởi tạo Đối tượng có sự khác biệt nhất định giữa các ngôn ngữ lập trình:</p>\n\n    <div style=\"overflow-x: auto;\">\n        <table style=\"border-collapse: collapse; width: 100%; border: 1px solid black; margin-top: 15px; font-size: 0.8em;\">\n            <thead>\n                <tr style=\"background-color: #f2f2f2;\">\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left; min-width: 100px;\">Đặc trưng</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">C++</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Java</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">C#</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Dart</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Ruby</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">PHP</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style=\"border: 1px solid black; padding: 5px; font-weight: bold;\">Kết thúc Class</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Dấu ngoặc nhọn + chấm phẩy<br><code>};</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Dấu ngoặc nhọn<br><code>}</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Dấu ngoặc nhọn<br><code>}</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Dấu ngoặc nhọn<br><code>}</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Từ khóa<br><code>end</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Dấu ngoặc nhọn<br><code>}</code></td>\n                </tr>\n                <tr>\n                    <td style=\"border: 1px solid black; padding: 5px; font-weight: bold;\">Khởi tạo Object (Instantiation)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Stack: <code>Car c;</code><br>Heap: <code>new Car();</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Bắt buộc dùng<br><code>new Car();</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Bắt buộc dùng<br><code>new Car();</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Có thể bỏ <code>new</code><br><code>Car();</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Dùng phương thức<br><code>Car.new</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Dùng<br><code>new Car();</code></td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n\n</body>\n</html>"
  },
  {
    "_id": "692ae7577fdaad24a2aec504",
    "chapter": "692ae7567fdaad24a2aec4e6",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "4.1 Khái niệm Kế thừa (Inheritance)",
    "slug": "tinh-ke-thua",
    "content": "<p>Kế thừa cho phép tạo lớp mới dựa trên lớp đã có.</p>"
  },
  {
    "_id": "692c0988e45d607d648891bd",
    "chapter": "692ae7567fdaad24a2aec4e2",
    "knowledge_type": "692ae7567fdaad24a2aec4dd",
    "title": "Đáp án",
    "slug": "dap-an-1764493704324",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Đáp án Môi trường & Cú pháp OOP</title>\n</head>\n<body style=\"font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;\">\n\n    <p style=\"color: black; font-size: 1.6em; font-weight: bold; border-bottom: 2px solid #eee; padding-bottom: 10px; text-align: left; margin-bottom: 25px;\">\n        <big><strong>ĐÁP ÁN VÀ GIẢI THÍCH CHI TIẾT (MÔI TRƯỜNG & CÚ PHÁP)</strong></big>\n    </p>\n\n    <div style=\"margin-bottom: 30px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-bottom: 5px;\">\n            <big><strong>Câu 1: Cú pháp chuẩn để khởi tạo một đối tượng (Object) từ một Lớp (Class) trong Java/C# là gì?</strong></big>\n        </h3>\n        <div style=\"margin-bottom: 10px; color: #555;\">\n            A. <code>ClassName objectName = ClassName();</code><br>\n            <strong style=\"color: #000;\">B. <code>ClassName objectName = new ClassName();</code></strong><br>\n            C. <code>new ClassName objectName;</code><br>\n            D. <code>Object objectName = import ClassName;</code>\n        </div>\n        \n        <div style=\"border: 1px solid #333; background-color: #f9f9f9; padding: 15px;\">\n            <strong>Giải thích:</strong> Từ khóa <code>new</code> là bắt buộc để cấp phát bộ nhớ cho đối tượng mới. Cú pháp chuẩn: <code>TênLớp tênBiến = new TênLớp();</code>. Các phương án khác đều sai cú pháp trong Java/C#.\n        </div>\n    </div>\n\n    <div style=\"border-top: 2px solid #ddd; padding-top: 20px; margin-bottom: 30px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-bottom: 5px;\">\n            <big><strong>Câu 2: Điều nào sau đây là ĐÚNG về phương thức trừu tượng (abstract method)?</strong></big>\n        </h3>\n        <div style=\"margin-bottom: 10px; color: #555;\">\n            A. Có phần thân hàm đầy đủ và có thể chạy ngay.<br>\n            <strong style=\"color: #000;\">B. Không có phần thân hàm và bắt buộc lớp con (phi trừu tượng) phải ghi đè (override) lại.</strong><br>\n            C. Có thể khai báo là <code>private</code> để bảo mật.<br>\n            D. Không cần từ khóa <code>abstract</code> nếu nằm trong abstract class.\n        </div>\n        \n        <div style=\"border: 1px solid #333; background-color: #f9f9f9; padding: 15px;\">\n            <strong>Giải thích:</strong> Phương thức trừu tượng giống như một bản cam kết: \"Tôi chỉ đặt tên hàm ở đây, con cái tôi BẮT BUỘC phải viết code thực thi cho nó\". Nó không có thân hàm (<code>{}</code>) và không thể là <code>private</code> (vì nếu private thì con không thấy để mà ghi đè).\n        </div>\n    </div>\n\n    <div style=\"border-top: 2px solid #ddd; padding-top: 20px; margin-bottom: 30px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-bottom: 5px;\">\n            <big><strong>Câu 3: Lỗi cú pháp phổ biến nào thường gặp khi một lớp thực thi (implements) một Interface?</strong></big>\n        </h3>\n        <div style=\"margin-bottom: 10px; color: #555;\">\n            <strong style=\"color: #000;\">A. Quên không ghi đè (override) tất cả các phương thức của Interface đó.</strong><br>\n            B. Đặt tên lớp trùng với tên Interface.<br>\n            C. Thực thi quá nhiều Interface cùng lúc (Java cho phép đa thực thi).<br>\n            D. Khai báo các phương thức trong Interface là <code>public</code>.\n        </div>\n        \n        <div style=\"border: 1px solid #333; background-color: #f9f9f9; padding: 15px;\">\n            <strong>Giải thích:</strong> Khi một lớp (không phải abstract) chọn <code>implements</code> một Interface, nó ký một hợp đồng bắt buộc phải hiện thực hóa (override) <strong>TOÀN BỘ</strong> các phương thức trừu tượng có trong Interface đó. Nếu bỏ sót dù chỉ 1 hàm, trình biên dịch (Compiler) sẽ báo lỗi ngay lập tức.\n        </div>\n    </div>\n\n</body>\n</html>"
  },
  {
    "_id": "692edf08d34cc6910180d4cd",
    "chapter": "692ae7567fdaad24a2aec4e4",
    "knowledge_type": "692ae7567fdaad24a2aec4db",
    "title": "Bài tập: NguyenLieu",
    "slug": "bai-tap-nguyenlieu-1764679432086",
    "content": "<!doctype html>\n<html lang=\"vi\">\n<head>\n  <meta charset=\"utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\" />\n  <title>Bài tập thực hành OOP: Lớp và Đối tượng</title>\n \n</head>\n<body>\n  <div class=\"card\">\n    <h1><strong>Yêu cầu:</strong></h1>\n    <ol>\n      <li>\n        <strong>Tạo lớp \"NguyenLieu\" cho món ăn với các thuộc tính: tên nguyên liệu, số lượng, đơn vị.  \n        Viết phương thức hiển thị thông tin nguyên liệu và cập nhật số lượng.</strong>\n        <div class=\"note\">Tạo một danh sách các nguyên liệu và thử thay đổi số lượng cho một vài nguyên liệu.</div>\n      </li>\n    </ol>\n  </div>\n</body>\n</html>\n"
  },
  {
    "_id": "692ee22dd34cc6910180d661",
    "chapter": "692ede83d34cc6910180d487",
    "knowledge_type": "692ae7567fdaad24a2aec4db",
    "title": "Bài tập: NhanVien",
    "slug": "bai-tap-nhanvien-1764680237299",
    "content": "<!doctype html>\n<html lang=\"vi\">\n<head>\n  <meta charset=\"utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\" />\n  <title>Bài tập thực hành OOP: Kế thừa</title>\n \n</head>\n<body>\n  <div class=\"card\">\n    <h1>Bài tập thực hành OOP: Kế thừa</h1>\n    <ol>\n      <li>\n        <strong>Tạo lớp \"NhanVien\" với các thuộc tính cơ bản (tên, lương).  \n        Tạo lớp con \"NhanVienFullTime\" và \"NhanVienPartTime\" kế thừa và thêm phương thức tính thu nhập riêng.</strong>\n        <div class=\"note\">Tạo vài đối tượng nhân viên và in ra thu nhập của từng loại.</div>\n      </li>\n    </ol>\n\n    <p class=\"note\">Có thể thực hiện bằng Java, C++, C#, Ruby, PHP hoặc Dart.</p>\n  </div>\n</body>\n</html>\n"
  },
  {
    "_id": "69391bbd69385c5a72167b4c",
    "chapter": "692ae7567fdaad24a2aec4e2",
    "knowledge_type": "692ae7567fdaad24a2aec4d7",
    "title": "2.1 Cài đặt môi trường",
    "slug": "21-cai-dat-moi-truong-1765350333986",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>2.1. Cài Đặt Môi Trường Phát Triển</title>\n</head>\n<body>\n    \n    <p>\n        Trước khi bắt đầu code, sinh viên cần phân biệt rõ ràng giữa <strong>\"Bộ não\"</strong> (Compiler) và <strong>\"Bàn làm việc\"</strong> (IDE). Việc hiểu sai hai khái niệm này là nguyên nhân chính dẫn đến các lỗi cài đặt phổ biến.\n    </p>\n\n    <hr>\n    <br>\n    <p>\n        <big><strong>1. SDK / Compiler / Interpreter (Bộ não)</strong></big>\n    </p>\n    <p>\n        Đây là thành phần cốt lõi bắt buộc phải có. Máy tính <strong>KHÔNG</strong> hiểu mã nguồn bạn viết (tiếng Anh/Việt), nó chỉ hiểu mã máy (0 và 1).\n    </p>\n    <p>\n        <em><strong>Compiler</strong> đóng vai trò là \"người phiên dịch\", chuyển đổi code của bạn thành ngôn ngữ máy để CPU thực thi.</em>\n    </p>\n    <ul>\n        <li><strong>Java:</strong> Cần cài <code>JDK</code> (Java Development Kit).</li>\n        <li><strong>C++:</strong> Cần cài <code>GCC</code> hoặc <code>MinGW</code>.</li>\n        <li><strong>C#:</strong> Cần cài <code>.NET SDK</code>.</li>\n    </ul>\n\n    <br>\n\n    <p>\n        <big><strong>2. IDE - Integrated Development Environment (Bàn làm việc)</strong></big>\n    </p>\n    <p>\n        Đây là phần mềm cung cấp giao diện để viết code. Nó giúp việc lập trình trở nên dễ dàng hơn nhờ 4 tính năng vàng:\n    </p>\n    <ul>\n        <li><strong>Syntax Highlighting:</strong> Tô màu code để dễ nhìn.</li>\n        <li><strong>Auto Completion:</strong> Gợi ý code thông minh (gõ 1 ra 10).</li>\n        <li><strong>Debugging:</strong> Công cụ tìm và sửa lỗi.</li>\n        <li><strong>Project Management:</strong> Quản lý hàng trăm file code gọn gàng.</li>\n    </ul>\n    <p><em>Ví dụ phổ biến: Visual Studio Code, IntelliJ IDEA, Visual Studio.</em></p>\n\n    <br>\n\n    <p>\n        <big><strong>3. Quy trình cài đặt chuẩn (Best Practice)</strong></big>\n    </p>\n    <p>Nhiều bạn cài ngược (cài IDE trước) dẫn đến lỗi \"Compiler not found\". Hãy tuân thủ đúng thứ tự:</p>\n    \n    <ul>\n        <li>\n            <strong>Bước 1: Cài đặt Compiler / SDK</strong><br>\n            Luôn cài \"bộ não\" trước để máy tính có khả năng hiểu ngôn ngữ.\n        </li>\n        <li>\n            <strong>Bước 2: Cài đặt IDE</strong><br>\n            Cài \"bàn làm việc\" sau. IDE sẽ tự động quét và kết nối với Compiler đã cài ở Bước 1.\n        </li>\n        <li>\n            <strong>Bước 3: Cấu hình Biến môi trường (Environment Variables)</strong><br>\n            (Quan trọng với Windows) Giúp bạn gọi lệnh biên dịch từ bất kỳ thư mục nào.\n            <br>\n            <em>Ví dụ: Thêm đường dẫn thư mục `bin` của JDK vào biến `PATH`.</em>\n        </li>\n    </ul>\n\n</body>\n</html>"
  },
  {
    "_id": "69391be869385c5a72167b5e",
    "chapter": "692ae7567fdaad24a2aec4e2",
    "knowledge_type": "692ae7567fdaad24a2aec4d7",
    "title": "2.2 Cấu trúc chương trình & Cú pháp cơ bản",
    "slug": "22-cau-truc-chuong-trinh-cu-phap-co-ban-1765350376019",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>2.1. Cấu Trúc Chương Trình Trong OOP</title>\n</head>\n<body style=\"font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;\">\n\n<p style=\"color: black; font-size: 1.3em;\">\n            <big><strong>GIẢI PHẪU MỘT FILE MÃ NGUỒN OOP</strong></big>\n        </p>\n    <div style=\"margin-bottom: 30px; padding-left: 10px;\">\n        <p>Trong lập trình hướng đối tượng (OOP), chương trình là một <strong>hệ thống các đối tượng</strong> giao tiếp với nhau. Một file code thường đại diện cho một đối tượng ngoài đời thực (Ví dụ: <code>SinhVien.java</code>, <code>Car.cs</code>).</p>\n        \n        \n\n        <p style=\"margin-top: 20px;\">Cấu trúc tiêu chuẩn của một file OOP gồm 4 phần chính:</p>\n\n        <h3 style=\"color: #2c3e50; font-size: 1.1em; margin-top: 25px; margin-bottom: 5px;\">\n            <big><strong>1. Package / Namespace (Gói)</strong></big>\n        </h3>\n        <p style=\"padding-left: 10px; margin-top: 0;\">Đây là \"thùng chứa\" lớn nhất, giúp sắp xếp và phân loại code. Ví dụ: gói <code>NhanSu</code> chứa các lớp nhân viên.</p>\n\n        <h3 style=\"color: #2c3e50; font-size: 1.1em; margin-top: 25px; margin-bottom: 5px;\">\n            <big><strong>2. Import / Using (Thư viện)</strong></big>\n        </h3>\n        <p style=\"padding-left: 10px; margin-top: 0;\">Khai báo các công cụ bên ngoài cần mượn dùng (Ví dụ: Thư viện nhập xuất, Date Time).</p>\n\n        <h3 style=\"color: #2c3e50; font-size: 1.1em; margin-top: 25px; margin-bottom: 5px;\">\n            <big><strong>3. Class Definition (Khai báo lớp)</strong></big>\n        </h3>\n        <p style=\"padding-left: 10px; margin-top: 0;\">Phần quan trọng nhất. Đây chính là <strong>bản thiết kế (Blueprint)</strong> của một đối tượng.</p>\n\n        <h3 style=\"color: #2c3e50; font-size: 1.1em; margin-top: 25px; margin-bottom: 5px;\">\n            <big><strong>4. Class Members (Thành phần lớp)</strong></big>\n        </h3>\n        <ul style=\"margin-left: 30px; margin-top: 0;\">\n            <li><strong>Thuộc tính (Attributes):</strong> Mô tả dữ liệu (State).</li>\n            <li><strong>Phương thức (Methods):</strong> Mô tả hành vi (Behavior).</li>\n            <li><strong>Constructor:</strong> Hàm khởi tạo đối tượng.</li>\n            <li><strong>Main Method:</strong> Điểm bắt đầu chạy chương trình.</li>\n        </ul>\n    </div>\n\n    <div style=\"border-top: 2px solid #ddd; padding-top: 20px;\">\n        <p style=\"color: black; font-size: 1.3em;\">\n            <big><strong>CÁC CÚ PHÁP ĐẶC THÙ OOP</strong></big>\n        </p>\n        <p>Ngoài dấu chấm phẩy và ngoặc nhọn, bạn cần nắm vững 3 cú pháp cốt lõi sau:</p>\n\n        <h3 style=\"color: #2c3e50; font-size: 1.1em; margin-top: 30px; margin-bottom: 10px;\">\n            <big><strong>1. Cú pháp Khởi tạo (Instantiation)</strong></big>\n        </h3>\n        <p style=\"padding-left: 10px; margin-top: 0;\">Class chỉ là bản vẽ. Để dùng được, phải dùng từ khóa <code>new</code> để tạo đối tượng thực chiếm bộ nhớ.</p>\n        \n        \n\n        <div style=\"border: 1px solid #333; background-color: #f9f9f9; padding: 15px; margin: 10px 0 10px 10px; overflow-x: auto;\">\n            <pre style=\"margin: 0; font-family: Consolas, monospace; color: #000;\">\n// Cú pháp: ClassName varName = new ClassName();\nSinhVien sv = new SinhVien();\n            </pre>\n        </div>\n\n        <h3 style=\"color: #2c3e50; font-size: 1.1em; margin-top: 30px; margin-bottom: 10px;\">\n            <big><strong>2. Cú pháp Dấu chấm (Dot Operator)</strong></big>\n        </h3>\n        <p style=\"padding-left: 10px; margin-top: 0;\">Giống như chiếc điều khiển từ xa. Dùng để truy cập tài sản hoặc sai khiến đối tượng làm việc.</p>\n        \n        <div style=\"border: 1px solid #333; background-color: #f9f9f9; padding: 15px; margin: 10px 0 10px 10px; overflow-x: auto;\">\n            <pre style=\"margin: 0; font-family: Consolas, monospace; color: #000;\">\nsv.ten = \"Nam\";   // Truy cập thuộc tính\nsv.diHoc();       // Gọi phương thức\n            </pre>\n        </div>\n\n        <h3 style=\"color: #2c3e50; font-size: 1.1em; margin-top: 30px; margin-bottom: 10px;\">\n            <big><strong>3. Từ khóa <code>this</code></strong></big>\n        </h3>\n        <p style=\"padding-left: 10px; margin-top: 0;\">Đại diện cho <strong>chính đối tượng hiện tại</strong>. Dùng để tránh nhầm lẫn khi tên biến cục bộ trùng với tên thuộc tính.</p>\n        \n        <div style=\"border: 1px solid #333; background-color: #f9f9f9; padding: 15px; margin: 10px 0 10px 10px; overflow-x: auto;\">\n            <pre style=\"margin: 0; font-family: Consolas, monospace; color: #000;\">\npublic void setTen(String ten) {\n    this.ten = ten; // this.ten là của Object, ten là tham số\n}\n            </pre>\n        </div>\n    </div>\n\n    <div style=\"border-top: 2px solid #ddd; padding-top: 20px; margin-top: 30px;\">\n        <p style=\"color: black; font-size: 1.3em;\">\n            <big><strong>PHẠM VI TRUY CẬP (ACCESS MODIFIERS)</strong></big>\n        </p>\n        <p>Quy định \"ai được phép nhìn thấy ai\" trong chương trình:</p>\n        \n        <table style=\"width: 100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #333;\">\n            <thead>\n                <tr style=\"background-color: #f2f2f2; color: #333;\">\n                    <th style=\"padding: 12px; border: 1px solid #333; text-align: center;\">Từ khóa</th>\n                    <th style=\"padding: 12px; border: 1px solid #333; text-align: center;\">Ký hiệu UML</th>\n                    <th style=\"padding: 12px; border: 1px solid #333; text-align: center;\">Phạm vi</th>\n                    <th style=\"padding: 12px; border: 1px solid #333; text-align: center;\">Ví dụ ẩn dụ</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style=\"padding: 10px; border: 1px solid #333; text-align: center; font-weight: bold;\">public</td>\n                    <td style=\"padding: 10px; border: 1px solid #333; text-align: center;\"><strong>+</strong></td>\n                    <td style=\"padding: 10px; border: 1px solid #333; text-align: center;\">Công khai (Mọi nơi)</td>\n                    <td style=\"padding: 10px; border: 1px solid #333; text-align: center;\"><em>Công viên</em></td>\n                </tr>\n                <tr>\n                    <td style=\"padding: 10px; border: 1px solid #333; text-align: center; font-weight: bold;\">protected</td>\n                    <td style=\"padding: 10px; border: 1px solid #333; text-align: center;\"><strong>#</strong></td>\n                    <td style=\"padding: 10px; border: 1px solid #333; text-align: center;\">Lớp con & Cùng gói</td>\n                    <td style=\"padding: 10px; border: 1px solid #333; text-align: center;\"><em>Tài sản gia truyền</em></td>\n                </tr>\n                <tr>\n                    <td style=\"padding: 10px; border: 1px solid #333; text-align: center; font-weight: bold;\">default</td>\n                    <td style=\"padding: 10px; border: 1px solid #333; text-align: center;\"><strong>~</strong></td>\n                    <td style=\"padding: 10px; border: 1px solid #333; text-align: center;\">Trong cùng gói</td>\n                    <td style=\"padding: 10px; border: 1px solid #333; text-align: center;\"><em>Đồ dùng trong phòng</em></td>\n                </tr>\n                <tr>\n                    <td style=\"padding: 10px; border: 1px solid #333; text-align: center; font-weight: bold;\">private</td>\n                    <td style=\"padding: 10px; border: 1px solid #333; text-align: center;\"><strong>-</strong></td>\n                    <td style=\"padding: 10px; border: 1px solid #333; text-align: center;\">Chỉ nội bộ lớp</td>\n                    <td style=\"padding: 10px; border: 1px solid #333; text-align: center;\"><em>Nhật ký cá nhân</em></td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n\n</body>\n</html>"
  },
  {
    "_id": "69391c0669385c5a72167b6b",
    "chapter": "692ae7567fdaad24a2aec4e2",
    "knowledge_type": "692ae7567fdaad24a2aec4d7",
    "title": "2.3 Nhập xuất dữ liệu và Các toán tử",
    "slug": "23-nhap-xuat-du-lieu-va-cac-toan-tu-1765350406264",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Nhập Xuất và Toán Tử</title>\n</head>\n<body style=\"font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;\">\n\n    <div style=\"margin-bottom: 30px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-top: 30px; margin-bottom: 10px;\">\n            <big><strong>1. Nhập và Xuất dữ liệu (Input / Output)</strong></big>\n        </h3>\n        <p>Trước khi thực hiện tính toán, chương trình cần giao tiếp với người dùng: hiển thị thông báo và nhận dữ liệu vào.</p>\n\n        <p style=\"margin-top: 15px;\"><strong>🔹 Xuất dữ liệu (Output):</strong> Là hành động in kết quả ra màn hình (Console) để người dùng đọc được.</p>\n        \n        <div style=\"border: 1px solid #333; background-color: #f9f9f9; padding: 15px; margin: 10px 0; overflow-x: auto;\">\n            <pre style=\"margin: 0; font-family: Consolas, monospace; color: #000;\">\n// Java:\nSystem.out.println(\"Xin chào! Kết quả là: \" + 100);\n\n// C++:\ncout << \"Xin chào! Kết quả là: \" << 100;\n            </pre>\n        </div>\n\n        <p style=\"margin-top: 15px;\"><strong>🔹 Nhập dữ liệu (Input):</strong> Là hành động lấy dữ liệu từ bàn phím. Dữ liệu nhập vào thường ở dạng chuỗi (String), cần được ép kiểu nếu muốn tính toán.</p>\n        \n        <div style=\"border: 1px solid #333; background-color: #f9f9f9; padding: 15px; margin: 10px 0; overflow-x: auto;\">\n            <pre style=\"margin: 0; font-family: Consolas, monospace; color: #000;\">\n// Java (Sử dụng Scanner):\nScanner scanner = new Scanner(System.in);\n \nSystem.out.print(\"Nhập tuổi của bạn: \");\nint age = scanner.nextInt(); // Chờ người dùng nhập số\n            </pre>\n        </div>\n\n        <div style=\"border: 1px solid #333; background-color: #fff; padding: 15px; margin-top: 15px;\">\n            <strong>Lưu ý:</strong> Nhập dữ liệu là bước dễ gây lỗi nhất (Ví dụ: Bảo nhập số nhưng người dùng nhập chữ). Hãy luôn kiểm tra kỹ kiểu dữ liệu.\n        </div>\n    </div>\n\n    <div style=\"border-top: 2px solid #ddd; padding-top: 20px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-top: 20px; margin-bottom: 10px;\">\n            <big><strong>2. Phép gán (Assignment)</strong></big>\n        </h3>\n        <p>Phép gán là cách đưa một giá trị vào biến. Biểu thức bên phải được tính trước, sau đó kết quả được gán vào biến bên trái.</p>\n        \n        <div style=\"border: 1px solid #333; background-color: #f9f9f9; padding: 10px; margin: 10px 0;\">\n            <strong>Cú pháp:</strong> <code>biến = biểu thức;</code>\n        </div>\n\n        <p>Ví dụ về các loại biểu thức:</p>\n        <ul style=\"margin-left: 20px;\">\n            <li>Giá trị trực tiếp: <code>x = 10;</code></li>\n            <li>Biến khác: <code>x = y;</code></li>\n            <li>Biểu thức phức tạp: <code>x = y * 3 + 2;</code></li>\n        </ul>\n\n        <p style=\"margin-top: 15px;\"><strong>🔹 Phép gán phức hợp (Compound Assignment)</strong></p>\n        <p>Cách viết tắt khi thực hiện toán tử trên chính biến đó:</p>\n        \n        <table style=\"width: 100%; border-collapse: collapse; margin-top: 10px; border: 1px solid #333;\">\n            <tr style=\"background-color: #f2f2f2;\">\n                <th style=\"padding: 10px; border: 1px solid #333; text-align: left;\">Toán tử</th>\n                <th style=\"padding: 10px; border: 1px solid #333; text-align: left;\">Tương đương với</th>\n                <th style=\"padding: 10px; border: 1px solid #333; text-align: left;\">Ví dụ</th>\n            </tr>\n            <tr>\n                <td style=\"padding: 10px; border: 1px solid #333;\"><code>+=</code></td>\n                <td style=\"padding: 10px; border: 1px solid #333;\">biến = biến + biểu thức</td>\n                <td style=\"padding: 10px; border: 1px solid #333;\"><code>a += 2;</code> (a tăng thêm 2)</td>\n            </tr>\n            <tr>\n                <td style=\"padding: 10px; border: 1px solid #333;\"><code>-=</code></td>\n                <td style=\"padding: 10px; border: 1px solid #333;\">biến = biến - biểu thức</td>\n                <td style=\"padding: 10px; border: 1px solid #333;\"><code>a -= 5;</code> (a giảm đi 5)</td>\n            </tr>\n            <tr>\n                <td style=\"padding: 10px; border: 1px solid #333;\"><code>*=</code>, <code>/=</code></td>\n                <td style=\"padding: 10px; border: 1px solid #333;\">Nhân/Chia tương tự</td>\n                <td style=\"padding: 10px; border: 1px solid #333;\"><code>a *= 3;</code> (a gấp 3 lần)</td>\n            </tr>\n        </table>\n\n        <p style=\"margin-top: 15px;\"><strong>🔹 Toán tử Tăng/Giảm (++ và --)</strong></p>\n        <p>Đây là phần rất dễ nhầm lẫn. Hãy chú ý sự khác biệt giữa Tiền tố (Prefix) và Hậu tố (Postfix):</p>\n        \n        <div style=\"border: 1px solid #333; background-color: #f9f9f9; padding: 15px; margin: 10px 0; overflow-x: auto;\">\n            <pre style=\"margin: 0; font-family: Consolas, monospace; color: #000;\">\nint a = 1;\n// Tiền tố (++a): Tăng trước, dùng sau\nint b = ++a; // a lên 2, b bằng 2\n\nint x = 1;\n// Hậu tố (x++): Dùng trước, tăng sau\nint y = x++; // y bằng 1, sau đó x mới lên 2\n            </pre>\n        </div>\n    </div>\n\n    <div style=\"border-top: 2px solid #ddd; padding-top: 20px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-top: 20px; margin-bottom: 10px;\">\n            <big><strong>3. Các phép toán số học</strong></big>\n        </h3>\n        <p>Java hỗ trợ 5 phép toán cơ bản:</p>\n        <ul style=\"margin-left: 20px;\">\n            <li><code>+</code> (Cộng), <code>-</code> (Trừ), <code>*</code> (Nhân)</li>\n            <li><code>/</code> (Chia), <code>%</code> (Modulo - Chia lấy dư)</li>\n        </ul>\n\n        <div style=\"border: 1px solid #333; background-color: #fff; padding: 15px; margin-top: 15px;\">\n            <strong>Chú ý quan trọng:</strong> Khi chia hai số nguyên (integer), Java sẽ trả về <strong>thương nguyên</strong> (cắt bỏ phần thập phân).\n            <br>\n            <code>4 / 3 = 1</code> (Không phải 1.333)<br>\n            <code>4 % 3 = 1</code> (Dư 1)\n        </div>\n    </div>\n\n    <div style=\"border-top: 2px solid #ddd; padding-top: 20px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-top: 20px; margin-bottom: 10px;\">\n            <big><strong>4. So sánh và Logic</strong></big>\n        </h3>\n        \n        <p><strong>🔹 Toán tử so sánh (Relational Operators)</strong></p>\n        <p>Luôn trả về kết quả kiểu <strong>boolean</strong> (true/false).</p>\n        <table style=\"width: 100%; border-collapse: collapse; margin-top: 10px; border: 1px solid #333;\">\n            <tr style=\"background-color: #f2f2f2;\">\n                <th style=\"padding: 10px; border: 1px solid #333; text-align: left;\">Toán tử</th>\n                <th style=\"padding: 10px; border: 1px solid #333; text-align: left;\">Ý nghĩa</th>\n                <th style=\"padding: 10px; border: 1px solid #333; text-align: left;\">Ví dụ (x=5, y=3)</th>\n            </tr>\n            <tr>\n                <td style=\"padding: 10px; border: 1px solid #333;\"><code>&gt;</code>, <code>&lt;</code></td>\n                <td style=\"padding: 10px; border: 1px solid #333;\">Lớn hơn, Nhỏ hơn</td>\n                <td style=\"padding: 10px; border: 1px solid #333;\"><code>x > y</code> → true</td>\n            </tr>\n            <tr>\n                <td style=\"padding: 10px; border: 1px solid #333;\"><code>==</code></td>\n                <td style=\"padding: 10px; border: 1px solid #333;\">So sánh bằng</td>\n                <td style=\"padding: 10px; border: 1px solid #333;\"><code>x == 5</code> → true</td>\n            </tr>\n            <tr>\n                <td style=\"padding: 10px; border: 1px solid #333;\"><code>!=</code></td>\n                <td style=\"padding: 10px; border: 1px solid #333;\">So sánh khác</td>\n                <td style=\"padding: 10px; border: 1px solid #333;\"><code>x != y</code> → true</td>\n            </tr>\n        </table>\n\n        <p style=\"margin-top: 15px;\"><strong>🔹 Toán tử logic (Logical Operators)</strong></p>\n        <p>Dùng để kết hợp nhiều điều kiện:</p>\n        <table style=\"width: 100%; border-collapse: collapse; margin-top: 10px; border: 1px solid #333;\">\n            <tr style=\"background-color: #f2f2f2;\">\n                <th style=\"padding: 10px; border: 1px solid #333; text-align: left;\">Ký hiệu</th>\n                <th style=\"padding: 10px; border: 1px solid #333; text-align: left;\">Tên</th>\n                <th style=\"padding: 10px; border: 1px solid #333; text-align: left;\">Logic</th>\n            </tr>\n            <tr>\n                <td style=\"padding: 10px; border: 1px solid #333;\"><code>&amp;&amp;</code></td>\n                <td style=\"padding: 10px; border: 1px solid #333;\">AND (Và)</td>\n                <td style=\"padding: 10px; border: 1px solid #333;\">Đúng khi <strong>CẢ HAI</strong> cùng đúng.</td>\n            </tr>\n            <tr>\n                <td style=\"padding: 10px; border: 1px solid #333;\"><code>||</code></td>\n                <td style=\"padding: 10px; border: 1px solid #333;\">OR (Hoặc)</td>\n                <td style=\"padding: 10px; border: 1px solid #333;\">Đúng khi <strong>ÍT NHẤT MỘT</strong> vế đúng.</td>\n            </tr>\n            <tr>\n                <td style=\"padding: 10px; border: 1px solid #333;\"><code>!</code></td>\n                <td style=\"padding: 10px; border: 1px solid #333;\">NOT (Phủ định)</td>\n                <td style=\"padding: 10px; border: 1px solid #333;\">Đảo ngược kết quả (Đúng → Sai).</td>\n            </tr>\n        </table>\n    </div>\n\n    <div style=\"border-top: 2px solid #ddd; padding-top: 20px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-top: 20px; margin-bottom: 10px;\">\n            <big><strong>5. Độ ưu tiên toán tử</strong></big>\n        </h3>\n        <p>Khi biểu thức quá dài, máy tính sẽ tính cái nào trước?</p>\n\n        <ol style=\"margin-left: 20px;\">\n            <li><strong>Cao nhất:</strong> Các toán tử đơn (<code>++</code>, <code>--</code>, <code>!</code>)</li>\n            <li><strong>Nhân chia:</strong> <code>*</code>, <code>/</code>, <code>%</code></li>\n            <li><strong>Cộng trừ:</strong> <code>+</code>, <code>-</code></li>\n            <li><strong>Thấp nhất:</strong> So sánh và Gán</li>\n        </ol>\n\n        <div style=\"border: 1px solid #333; background-color: #f9f9f9; padding: 15px; margin: 10px 0; overflow-x: auto;\">\n            <pre style=\"margin: 0; font-family: Consolas, monospace; color: #000;\">\n// Ví dụ:\nint result = 3 + 4 * 2; \n// Nhân trước: 4 * 2 = 8\n// Cộng sau: 3 + 8 = 11\n \n// Muốn cộng trước thì ta dùng ngoặc đơn:\nint result2 = (3 + 4) * 2; // = 14\n            </pre>\n        </div>\n    </div>\n\n</body>\n</html>"
  },
  {
    "_id": "69399722cb8bff399ebd7278",
    "chapter": "692ae7567fdaad24a2aec4e8",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "5.2 Đa hình tĩnh và Nạp chồng",
    "slug": "52-da-hinh-tinh-va-nap-chong-1765381922377",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 5: Đa hình tĩnh</title>\n</head>\n<body>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Cơ chế hoạt động</h2>\n    <p>Đa hình tĩnh (còn gọi là Static Binding) xảy ra khi trình biên dịch (Compiler) xác định chính xác phương thức nào sẽ được gọi ngay tại thời điểm biên dịch code. Cơ chế phổ biến nhất để thực hiện điều này là <strong>Method Overloading (Nạp chồng phương thức)</strong>.</p>\n    \n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Nạp chồng phương thức (Method Overloading)</h2>\n    <p>Đây là kỹ thuật cho phép một lớp có nhiều phương thức <strong>cùng tên</strong> nhưng khác nhau về <strong>Chữ ký phương thức (Method Signature)</strong>. Trình biên dịch sẽ dựa vào danh sách tham số để phân biệt chúng.</p>\n    <p>Ví dụ hàm <code>tinhTong()</code>:</p>\n    <ul style=\"list-style-type: disc; margin-left: 20px;\">\n        <li><code>tinhTong(int a, int b)</code>: Xử lý số nguyên.</li>\n        <li><code>tinhTong(double a, double b)</code>: Xử lý số thực.</li>\n        <li><code>tinhTong(int a, int b, int c)</code>: Xử lý 3 tham số.</li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px;\">Sự khác nhau giữa các ngôn ngữ</h2>\n    <p>Khả năng hỗ trợ Overloading là điểm khác biệt lớn giữa các ngôn ngữ định kiểu tĩnh và định kiểu động:</p>\n\n    <div style=\"overflow-x: auto;\">\n        <table style=\"border-collapse: collapse; width: 100%; border: 1px solid black; margin-top: 15px; font-size: 0.8em;\">\n            <thead>\n                <tr style=\"background-color: #f2f2f2;\">\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left; min-width: 100px;\">Đặc trưng</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">C++ / Java / C#</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Dart</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Ruby / PHP</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style=\"border: 1px solid black; padding: 5px; font-weight: bold;\">Hỗ trợ Overloading truyền thống?</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\"><strong>CÓ</strong><br>Trình biên dịch tự động chọn hàm dựa trên tham số.</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\"><strong>KHÔNG</strong><br>Không cho phép 2 hàm cùng tên trong 1 lớp.</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\"><strong>KHÔNG</strong><br>Định nghĩa sau sẽ ghi đè định nghĩa trước.</td>\n                </tr>\n                <tr>\n                    <td style=\"border: 1px solid black; padding: 5px; font-weight: bold;\">Giải pháp thay thế</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Sử dụng trực tiếp.</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Dùng tham số tùy chọn (Optional parameters) hoặc Named Constructors.</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Dùng tham số mặc định (Default arguments) hoặc Magic Methods (<code>__call</code> trong PHP).</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n\n</body>\n</html>"
  },
  {
    "_id": "69399754cb8bff399ebd7285",
    "chapter": "692ae7567fdaad24a2aec4e8",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "5.3 Đa hình động và Ghi đè",
    "slug": "53-da-hinh-dong-va-ghi-de-1765381972827",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 5: Đa hình động</title>\n</head>\n<body>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Cơ chế hoạt động</h2>\n    <p>Đa hình động (còn gọi là Dynamic Binding) xảy ra khi việc quyết định gọi phương thức nào chỉ được thực hiện khi chương trình <strong>đang chạy (Runtime)</strong>. Cơ chế này phụ thuộc hoàn toàn vào quan hệ Kế thừa và kỹ thuật <strong>Ghi đè phương thức (Method Overriding)</strong>.</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Nguyên lý \"Upcasting\"</h2>\n    <p>Đây là chìa khóa của đa hình động: <strong>Một biến tham chiếu thuộc kiểu Lớp Cha có thể trỏ tới một đối tượng thuộc Lớp Con.</strong></p>\n    <p>Khi gọi một phương thức thông qua tham chiếu Lớp Cha, nếu phương thức đó đã được Ghi đè (Override) ở Lớp Con, hệ thống sẽ ưu tiên chạy phiên bản của Lớp Con. Điều này cho phép xử lý một danh sách các đối tượng hỗn hợp chỉ bằng một vòng lặp duy nhất.</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px;\">Sự khác nhau giữa các ngôn ngữ</h2>\n    <p>Để kích hoạt đa hình động, một số ngôn ngữ yêu cầu từ khóa tường minh (như <code>virtual</code>), trong khi số khác thì mặc định hỗ trợ:</p>\n\n    <div style=\"overflow-x: auto;\">\n        <table style=\"border-collapse: collapse; width: 100%; border: 1px solid black; margin-top: 15px; font-size: 0.8em;\">\n            <thead>\n                <tr style=\"background-color: #f2f2f2;\">\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left; min-width: 100px;\">Đặc trưng</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">C++</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">C#</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Java</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Dart / Ruby / PHP</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style=\"border: 1px solid black; padding: 5px; font-weight: bold;\">Tại Lớp Cha</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Bắt buộc dùng <code>virtual</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Bắt buộc dùng <code>virtual</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Mặc định là virtual (trừ khi dùng <code>final</code>)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Mặc định là virtual</td>\n                </tr>\n                <tr>\n                    <td style=\"border: 1px solid black; padding: 5px; font-weight: bold;\">Tại Lớp Con</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Từ khóa <code>override</code> (khuyên dùng)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Bắt buộc dùng <code>override</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Annotation <code>@Override</code> (khuyên dùng)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Annotation <code>@override</code> (Dart), viết lại tên (Ruby/PHP)</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n\n</body>\n</html>"
  },
  {
    "_id": "693997a1cb8bff399ebd7292",
    "chapter": "692ae7567fdaad24a2aec4e8",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "5.4 Tổng kết",
    "slug": "54-tong-ket-1765382049453",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 5: Tổng kết Đa hình</title>\n</head>\n<body>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Điểm cốt lõi cần nhớ</h2>\n    <p>Đa hình là đích đến cuối cùng của sự linh hoạt trong OOP. Nó giải phóng mã nguồn khỏi sự phụ thuộc vào các kiểu dữ liệu cụ thể.</p>\n    <blockquote>\n        <p><strong>Công thức Đa hình động = Kế thừa + Ghi đè (Override) + Upcasting (Tham chiếu Cha trỏ Đối tượng Con).</strong></p>\n    </blockquote>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">So sánh Overloading và Overriding</h2>\n    <p>Đây là hai khái niệm thường gây nhầm lẫn nhất. Bảng dưới đây tóm tắt sự khác biệt cơ bản:</p>\n\n    <div style=\"overflow-x: auto;\">\n        <table style=\"border-collapse: collapse; width: 100%; border: 1px solid black; margin-top: 15px; font-size: 0.8em;\">\n            <thead>\n                <tr style=\"background-color: #f2f2f2;\">\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left; min-width: 100px;\">Tiêu chí</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Overloading (Nạp chồng)</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Overriding (Ghi đè)</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style=\"border: 1px solid black; padding: 5px; font-weight: bold;\">Bản chất</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Đa hình Tĩnh (Compile-time)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Đa hình Động (Runtime)</td>\n                </tr>\n                <tr>\n                    <td style=\"border: 1px solid black; padding: 5px; font-weight: bold;\">Phạm vi</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Xảy ra trong <strong>cùng một lớp</strong></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Xảy ra giữa <strong>Lớp Cha và Lớp Con</strong></td>\n                </tr>\n                <tr>\n                    <td style=\"border: 1px solid black; padding: 5px; font-weight: bold;\">Tham số (Signature)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Phải <strong>KHÁC</strong> nhau</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Phải <strong>GIỐNG</strong> nhau tuyệt đối</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n\n</body>\n</html>"
  },
  {
    "_id": "693997e1cb8bff399ebd729f",
    "chapter": "692ede83d34cc6910180d487",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "4.1 Khái niệm",
    "slug": "41-khai-niem-1765382113568",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 4: Khái niệm Kế thừa</title>\n</head>\n<body>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Định nghĩa</h2>\n    <p>Kế thừa (Inheritance) là một cơ chế cốt lõi trong lập trình hướng đối tượng, cho phép một lớp mới (gọi là <strong>Lớp con</strong> - Derived Class) được xây dựng dựa trên các đặc tính và hành vi của một lớp đã tồn tại (gọi là <strong>Lớp cha</strong> - Base Class).</p>\n    <p>Thay vì phải viết lại mã nguồn từ đầu, lớp con sẽ tự động \"thừa hưởng\" các thuộc tính và phương thức của lớp cha, đồng thời có thể mở rộng hoặc tinh chỉnh chúng để phù hợp với mục đích sử dụng mới.</p>\n    \n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Mối quan hệ \"IS-A\"</h2>\n    <p>Điều kiện tiên quyết để áp dụng kế thừa là sự tồn tại của mối quan hệ <strong>\"Là một\" (IS-A Relationship)</strong>. Đây là thước đo logic để đảm bảo thiết kế hệ thống đúng đắn.</p>\n    <ul style=\"list-style-type: disc; margin-left: 20px;\">\n        <li><em>Ví dụ hợp lệ:</em> \"Sinh viên\" <strong>là một</strong> \"Con người\". \"Mèo\" <strong>là một</strong> \"Động vật\".</li>\n        <li><em>Ví dụ sai:</em> \"Bánh xe\" không phải là một \"Ô tô\" (Đây là quan hệ chứa đựng/thành phần).</li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Lợi ích cốt lõi</h2>\n    <ul style=\"list-style-type: disc; margin-left: 20px;\">\n        <li><strong>Tái sử dụng mã nguồn (Code Reusability):</strong> Giảm thiểu việc lặp lại code, giúp chương trình ngắn gọn và dễ quản lý hơn.</li>\n        <li><strong>Tính mở rộng (Extensibility):</strong> Dễ dàng bổ sung tính năng mới vào lớp con mà không làm ảnh hưởng đến sự ổn định của lớp cha.</li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px;\">Sự khác nhau giữa các ngôn ngữ</h2>\n    <p>Cú pháp để khai báo việc kế thừa có sự khác biệt nhất định về từ khóa và ký hiệu giữa các ngôn ngữ:</p>\n\n    <div style=\"overflow-x: auto;\">\n        <table style=\"border-collapse: collapse; width: 100%; border: 1px solid black; margin-top: 15px; font-size: 0.8em;\">\n            <thead>\n                <tr style=\"background-color: #f2f2f2;\">\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left; min-width: 100px;\">Đặc trưng</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">C++</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Java</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">C#</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Dart</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Ruby</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">PHP</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style=\"border: 1px solid black; padding: 5px; font-weight: bold;\">Ký hiệu / Từ khóa</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Dấu hai chấm <code>:</code><br><code>class Con : public Cha</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Từ khóa <code>extends</code><br><code>class Con extends Cha</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Dấu hai chấm <code>:</code><br><code>class Con : Cha</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Từ khóa <code>extends</code><br><code>class Con extends Cha</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Dấu nhỏ hơn <code>&lt;</code><br><code>class Con &lt; Cha</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Từ khóa <code>extends</code><br><code>class Con extends Cha</code></td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n\n</body>\n</html>"
  },
  {
    "_id": "6939980ecb8bff399ebd72ac",
    "chapter": "692ede83d34cc6910180d487",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "4.2 Các loại hình Kế thừa",
    "slug": "42-cac-loai-hinh-ke-thua-1765382158359",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 4: Các loại hình Kế thừa</title>\n</head>\n<body>\n\n    <h1 style=\"font-weight: bold; font-size: 2em;\">4.2. Các mô hình Kế thừa phổ biến</h1>\n    <p>Tùy thuộc vào kiến trúc của ngôn ngữ lập trình, hệ thống phân cấp lớp có thể được tổ chức theo nhiều mô hình khác nhau.</p>\n    \n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Đơn kế thừa (Single Inheritance)</h2>\n    <p>Đây là mô hình cơ bản và an toàn nhất, nơi một lớp con chỉ được phép kế thừa từ <strong>duy nhất một</strong> lớp cha. Điều này giúp tránh xung đột mã nguồn và giảm độ phức tạp.</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Đa kế thừa (Multiple Inheritance)</h2>\n    <p>Mô hình này cho phép một lớp con kế thừa từ <strong>nhiều lớp cha</strong> cùng lúc. Mặc dù mạnh mẽ, nó tiềm ẩn rủi ro xung đột (như vấn đề \"Diamond Problem\" - khi hai lớp cha có cùng một phương thức).</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Kế thừa đa cấp (Multilevel Inheritance)</h2>\n    <p>Hình thành một chuỗi kế thừa: Lớp C kế thừa B, lớp B kế thừa A. Khi đó, lớp C sẽ sở hữu đặc tính của cả B và A (Ví dụ: Cháu thừa hưởng gen của Cha và Ông).</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Kế thừa thứ bậc (Hierarchical Inheritance)</h2>\n    <p>Nhiều lớp con khác nhau cùng kế thừa từ một lớp cha chung. Ví dụ: Lớp \"Chó\" và \"Mèo\" đều kế thừa từ lớp \"Động Vật\".</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px;\">Sự khác nhau giữa các ngôn ngữ</h2>\n    <p>Khả năng hỗ trợ Đa kế thừa (nhiều Class cha) là điểm khác biệt lớn nhất về mặt thiết kế ngôn ngữ:</p>\n\n    <div style=\"overflow-x: auto;\">\n        <table style=\"border-collapse: collapse; width: 100%; border: 1px solid black; margin-top: 15px; font-size: 0.8em;\">\n            <thead>\n                <tr style=\"background-color: #f2f2f2;\">\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left; min-width: 100px;\">Đặc trưng</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">C++</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Java</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">C#</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Dart</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Ruby</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">PHP</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style=\"border: 1px solid black; padding: 5px; font-weight: bold;\">Hỗ trợ Đa kế thừa (Class)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\"><strong>Có</strong><br>(Hỗ trợ đầy đủ)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\"><strong>Không</strong><br>(Dùng Interface thay thế)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\"><strong>Không</strong><br>(Dùng Interface thay thế)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\"><strong>Không</strong><br>(Dùng Mixins thay thế)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\"><strong>Không</strong><br>(Dùng Modules/Mixins)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\"><strong>Không</strong><br>(Dùng Traits thay thế)</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n\n</body>\n</html>"
  },
  {
    "_id": "69399827cb8bff399ebd72b9",
    "chapter": "692ede83d34cc6910180d487",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "4.3 Quyền truy cập",
    "slug": "43-quyen-truy-cap-1765382183448",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 4: Quyền truy cập Protected</title>\n</head>\n<body>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Vấn đề chia sẻ dữ liệu</h2>\n    <p>Trong quan hệ cha-con, chúng ta thường gặp tình huống: Lớp cha muốn chia sẻ dữ liệu cho lớp con sử dụng, nhưng vẫn muốn giấu kín dữ liệu đó trước các đối tượng lạ bên ngoài.</p>\n    <ul style=\"list-style-type: disc; margin-left: 20px;\">\n        <li>Nếu dùng <code>private</code>: Lớp con không thể truy cập (Quá chặt).</li>\n        <li>Nếu dùng <code>public</code>: Ai cũng có thể truy cập (Quá lỏng, mất tính đóng gói).</li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Giải pháp: Protected</h2>\n    <p><code>protected</code> là mức truy cập được thiết kế dành riêng cho tính kế thừa. Nó hoạt động như một \"vùng an toàn\" cho gia đình:</p>\n    <ul style=\"list-style-type: disc; margin-left: 20px;\">\n        <li><strong>Với lớp con:</strong> <code>protected</code> hoạt động giống như <code>public</code> (có thể truy cập trực tiếp).</li>\n        <li><strong>Với bên ngoài:</strong> <code>protected</code> hoạt động giống như <code>private</code> (bị chặn truy cập).</li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px;\">Sự khác nhau giữa các ngôn ngữ</h2>\n    <p>Cách định nghĩa và hành vi của <code>protected</code> có sự tương đồng lớn, nhưng C++ có thêm khái niệm \"Chế độ kế thừa\" đặc biệt:</p>\n\n    <div style=\"overflow-x: auto;\">\n        <table style=\"border-collapse: collapse; width: 100%; border: 1px solid black; margin-top: 15px; font-size: 0.8em;\">\n            <thead>\n                <tr style=\"background-color: #f2f2f2;\">\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left; min-width: 100px;\">Đặc trưng</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">C++</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Java / C# / PHP</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Dart</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Ruby</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style=\"border: 1px solid black; padding: 5px; font-weight: bold;\">Từ khóa</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\"><code>protected:</code><br>(Theo block)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\"><code>protected</code><br>(Trước mỗi biến)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\"><code>_</code> (Dart coi thư viện là ranh giới, không có protected thuần túy)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\"><code>protected</code><br>(Phương thức)</td>\n                </tr>\n                <tr>\n                    <td style=\"border: 1px solid black; padding: 5px; font-weight: bold;\">Chế độ kế thừa</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Có thể chọn:<br><code>public</code>, <code>protected</code>, <code>private</code> inheritance</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Luôn là Public Inheritance (Không thể thay đổi)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">N/A</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">N/A</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n\n</body>\n</html>"
  },
  {
    "_id": "6939986fcb8bff399ebd72c8",
    "chapter": "692ede83d34cc6910180d487",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "4.4 Ghi đè phương thức",
    "slug": "44-ghi-de-phuong-thuc-1765382255695",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 4: Ghi đè phương thức</title>\n\n    <style>\n        .oop-table {\n            width: 100%;\n            border-collapse: collapse;\n            margin-top: 16px;\n            font-size: 0.95em;\n            color: #2c3e50;\n        }\n\n        .oop-table thead {\n            background-color: #34495e;\n            color: #ffffff;\n        }\n\n        .oop-table th,\n        .oop-table td {\n            padding: 12px 14px;\n            text-align: left;\n            vertical-align: top;\n        }\n\n        .oop-table th {\n            font-weight: 600;\n            letter-spacing: 0.3px;\n        }\n\n        .oop-table tbody tr:nth-child(even) {\n            background-color: #f4f6f8;\n        }\n\n        .oop-table tbody tr:hover {\n            background-color: #eef2f5;\n        }\n\n        .oop-table code {\n            background-color: #ecf0f1;\n            padding: 2px 6px;\n            border-radius: 4px;\n            font-size: 0.9em;\n            color: #2c3e50;\n        }\n\n        .table-note {\n            margin-top: 8px;\n            font-size: 0.9em;\n            color: #555;\n            font-style: italic;\n        }\n    </style>\n</head>\n\n<body>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">\n        📌 Định nghĩa\n    </h2>\n    <p>\n        Ghi đè là kỹ thuật cho phép lớp con cung cấp một cài đặt (implementation) mới cho\n        một phương thức đã được định nghĩa ở lớp cha. Đây là cách lớp con điều chỉnh\n        hành vi mặc định cho đúng với vai trò của nó.\n    </p>\n    <p>\n        Ví dụ: Lớp <code>DongVat</code> có phương thức <code>diChuyen()</code>.\n        <code>Chim</code> ghi đè thành “Bay”, còn <code>Ca</code> ghi đè thành “Bơi”.\n    </p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">\n        📐 Quy tắc thực hiện\n    </h2>\n    <ul>\n        <li>Tên phương thức, danh sách tham số và kiểu trả về phải <strong>giống hệt</strong> lớp cha.</li>\n        <li>Phạm vi truy cập không được hẹp hơn lớp cha.</li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.4em; margin-top: 20px; color: #2c3e50;\">\n        🔍 So sánh cú pháp giữa các ngôn ngữ\n    </h2>\n    <p>\n        Mỗi ngôn ngữ có “chính sách kiểm soát” khác nhau để đảm bảo ghi đè an toàn và đúng ý đồ thiết kế.\n    </p>\n\n    <table class=\"oop-table\">\n        <thead>\n            <tr>\n                <th>Ngôn ngữ</th>\n                <th>Khai báo kế thừa</th>\n                <th>Từ khóa ghi đè</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>C++</td>\n                <td><code>class B : public A</code></td>\n                <td><code>virtual</code> (cha), <code>override</code> (con – khuyến nghị)</td>\n            </tr>\n            <tr>\n                <td>Java</td>\n                <td><code>class B extends A</code></td>\n                <td><code>@Override</code></td>\n            </tr>\n            <tr>\n                <td>C#</td>\n                <td><code>class B : A</code></td>\n                <td><code>virtual</code> (cha), <code>override</code> (con – bắt buộc)</td>\n            </tr>\n            <tr>\n                <td>Dart</td>\n                <td><code>class B extends A</code></td>\n                <td><code>@override</code></td>\n            </tr>\n            <tr>\n                <td>Ruby</td>\n                <td><code>class B &lt; A</code></td>\n                <td>Không có từ khóa riêng</td>\n            </tr>\n            <tr>\n                <td>PHP</td>\n                <td><code>class B extends A</code></td>\n                <td>Không có từ khóa riêng (<code>final</code> thì không ghi đè được)</td>\n            </tr>\n        </tbody>\n    </table>\n\n    <div class=\"table-note\">\n        Ghi chú: Các ngôn ngữ tĩnh (C++, Java, C#, Dart) kiểm soát ghi đè chặt chẽ hơn so với ngôn ngữ động (Ruby, PHP).\n    </div>\n\n</body>\n</html>\n"
  },
  {
    "_id": "6939988dcb8bff399ebd72d5",
    "chapter": "692ede83d34cc6910180d487",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "4.5 Tổng kết",
    "slug": "45-tong-ket-1765382285457",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 4: Tổng kết Kế thừa</title>\n</head>\n<body>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Điểm cốt lõi cần nhớ</h2>\n    <p>Kế thừa không chỉ là việc sao chép mã nguồn, mà là việc xây dựng một <strong>hệ thống phân cấp logic</strong> giữa các thực thể.</p>\n    <blockquote>\n        <p><strong>Công thức Kế thừa = Quan hệ IS-A + Tái sử dụng (Protected) + Mở rộng (Override).</strong></p>\n    </blockquote>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Mối liên hệ trong hệ sinh thái OOP</h2>\n    <p>Kế thừa đóng vai trò trung tâm, kết nối các tính chất khác:</p>\n    <ul style=\"list-style-type: disc; margin-left: 20px;\">\n        <li><strong>Với Đóng gói:</strong> Kế thừa mở rộng phạm vi truy cập thông qua <code>protected</code>, tạo ra sự chia sẻ dữ liệu an toàn trong nội bộ gia đình các lớp.</li>\n        <li><strong>Với Đa hình:</strong> Kế thừa là nền tảng bắt buộc để Đa hình hoạt động. Không có quan hệ cha-con và ghi đè phương thức, Đa hình động không thể tồn tại.</li>\n    </ul>\n\n    <div style=\"background-color: #e8f4fd; border-left: 4px solid #3498db; padding: 10px; margin-top: 15px;\">\n        <strong>Lưu ý quan trọng:</strong> Kế thừa tạo ra sự kết dính chặt chẽ (Tight Coupling) giữa lớp cha và con. Hãy cân nhắc sử dụng Kế thừa (Inheritance) hay Thành phần (Composition - quan hệ \"Has-A\") tùy vào bài toán cụ thể để đảm bảo hệ thống linh hoạt.\n    </div>\n\n</body>\n</html>"
  },
  {
    "_id": "6939999ecb8bff399ebd72fc",
    "chapter": "692ae7567fdaad24a2aec4e0",
    "knowledge_type": "692ae7567fdaad24a2aec4d7",
    "title": "1.2 Các tính chất quan trọng",
    "slug": "12-cac-tinh-chat-quan-trong-1765382558118",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 1: Tổng quan OOP</title>\n</head>\n<body>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">1. Tính Kế thừa (Inheritance)</h2>\n    <p>Cho phép một lớp mới (Lớp con) kế thừa lại các thuộc tính và phương thức của một lớp đã có (Lớp cha). Điều này giúp tái sử dụng mã nguồn (Code Reusability) và tạo nên cấu trúc phân cấp logic.</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">2. Tính Đa hình (Polymorphism)</h2>\n    <p>Cho phép một hành động có thể được thực hiện theo nhiều cách khác nhau tùy thuộc vào đối tượng. Ví dụ, cùng là hành động \"Kêu\", nhưng Chó sẽ sủa, Mèo sẽ kêu meo meo.</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">3. Tính Trừu tượng (Abstraction)</h2>\n    <p>Là kỹ thuật chỉ trình bày những tính năng thiết yếu cho người dùng và ẩn đi những chi tiết phức tạp không cần thiết. Ví dụ, bạn lái xe bằng cách sử dụng vô lăng mà không cần hiểu cơ chế phun xăng điện tử bên trong.</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">4. Tính Đóng gói (Encapsulation)</h2>\n    <p>Là việc gói gọn dữ liệu và phương thức vào trong một lớp, đồng thời che giấu các chi tiết cài đặt nội bộ. Mục đích chính là bảo vệ sự toàn vẹn của dữ liệu và kiểm soát quyền truy cập.</p>\n\n</body>\n</html>"
  },
  {
    "_id": "693999d0cb8bff399ebd730b",
    "chapter": "692ae7567fdaad24a2aec4e0",
    "knowledge_type": "692ae7567fdaad24a2aec4d7",
    "title": "1.3 Các lợi ích của OOP",
    "slug": "13-cac-loi-ich-cua-oop-1765382608965",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 1: Tổng quan OOP - Ưu điểm</title>\n</head>\n<body>\n\n    <h1 style=\"font-weight: bold; font-size: 2em;\">Tại sao nên sử dụng OOP?</h1>\n    <p>OOP không chỉ là một trào lưu, nó là giải pháp cho việc phát triển các hệ thống phần mềm lớn và phức tạp.</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Khả năng tái sử dụng (Reusability)</h2>\n    <p>Thông qua cơ chế Kế thừa, lập trình viên có thể sử dụng lại các đoạn mã đã kiểm thử kỹ lưỡng thay vì viết lại từ đầu. Nguyên lý \"DRY\" (Don't Repeat Yourself) được thực hiện triệt để.</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Dễ bảo trì và nâng cấp (Maintainability)</h2>\n    <p>Nhờ tính Đóng gói và Trừu tượng, việc thay đổi logic bên trong một đối tượng ít gây ảnh hưởng dây chuyền đến các phần còn lại của hệ thống. Điều này giúp việc sửa lỗi và nâng cấp tính năng trở nên an toàn hơn.</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Khả năng mở rộng (Scalability)</h2>\n    <p>Tư duy hướng đối tượng giúp chia nhỏ một bài toán phức tạp thành các module (đối tượng) độc lập, dễ quản lý. Điều này cho phép nhiều lập trình viên cùng làm việc song song trên một dự án lớn.</p>\n\n</body>\n</html>"
  },
  {
    "_id": "69399a01cb8bff399ebd731d",
    "chapter": "692ae7567fdaad24a2aec4e4",
    "knowledge_type": "692ae7567fdaad24a2aec4d7",
    "title": "3.2 Thuộc tính và Phương thức",
    "slug": "32-thuoc-tinh-va-phuong-thuc-1765382657497",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 3: Thuộc tính và Phương thức</title>\n</head>\n<body>\n    \n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Thuộc tính (Attributes/Fields)</h2>\n    <p>Thuộc tính đại diện cho <strong>dữ liệu</strong> hoặc trạng thái của đối tượng. Ví dụ: Sinh viên có thuộc tính <code>hoTen</code>, <code>maSinhVien</code>, <code>diemTrungBinh</code>. Trong một lớp được thiết kế tốt, các thuộc tính thường được để ở chế độ <code>private</code> để bảo vệ dữ liệu.</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Phương thức (Methods)</h2>\n    <p>Phương thức đại diện cho <strong>hành vi</strong> hoặc chức năng của đối tượng. Chúng là các hàm được định nghĩa bên trong lớp để thao tác với các thuộc tính. Ví dụ: Sinh viên có phương thức <code>hocBai()</code>, <code>thi()</code>, <code>tinhDiem()</code>.</p>\n\n</body>\n</html>"
  },
  {
    "_id": "69399a1ecb8bff399ebd732a",
    "chapter": "692ae7567fdaad24a2aec4e4",
    "knowledge_type": "692ae7567fdaad24a2aec4d7",
    "title": "3.3 Hàm khởi tạo và Hàm hủy",
    "slug": "33-ham-khoi-tao-va-ham-huy-1765382686244",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 3: Constructor và Destructor</title>\n</head>\n<body>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Khái niệm</h2>\n    <ul style=\"list-style-type: disc; margin-left: 20px;\">\n        <li><strong>Constructor (Hàm khởi tạo):</strong> Là hàm đặc biệt được gọi tự động ngay khi đối tượng được tạo ra. Mục đích là thiết lập các giá trị ban đầu hợp lệ cho thuộc tính. Nó thường cùng tên với lớp và không có kiểu trả về.</li>\n        <li><strong>Destructor (Hàm hủy):</strong> Là hàm đặc biệt được gọi tự động khi đối tượng bị hủy (ra khỏi phạm vi hoặc bị xóa). Mục đích là giải phóng tài nguyên (bộ nhớ động, kết nối file, database) để tránh rò rỉ.</li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Tầm quan trọng</h2>\n    <p>Nếu thiếu Constructor, đối tượng có thể tồn tại ở trạng thái \"rác\" hoặc không xác định, dẫn đến lỗi logic. Nếu thiếu Destructor (đặc biệt trong C++), chương trình có thể bị rò rỉ bộ nhớ (memory leak), gây tốn tài nguyên và crash hệ thống.</p>\n    \n    <div style=\"background-color: #e8f4fd; border-left: 4px solid #3498db; padding: 10px; margin-top: 15px;\">\n        <strong>Nguyên tắc vàng:</strong> Nếu lớp của bạn có sử dụng con trỏ, cấp phát động hoặc quản lý tài nguyên bên ngoài (File, Socket), bạn BẮT BUỘC phải định nghĩa cả Constructor (để cấp phát) và Destructor (để giải phóng).\n    </div>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Sự khác nhau giữa các ngôn ngữ</h2>\n    <p>Cơ chế quản lý vòng đời đối tượng rất khác nhau giữa ngôn ngữ quản lý bộ nhớ thủ công (C++) và tự động (Java, C#, ...):</p>\n\n    <div style=\"overflow-x: auto;\">\n        <table style=\"border-collapse: collapse; width: 100%; border: 1px solid black; margin-top: 15px; font-size: 0.8em;\">\n            <thead>\n                <tr style=\"background-color: #f2f2f2;\">\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left; min-width: 100px;\">Đặc trưng</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">C++</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Java</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">C#</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Dart</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">Ruby</th>\n                    <th style=\"border: 1px solid black; padding: 5px; text-align: left;\">PHP</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style=\"border: 1px solid black; padding: 5px; font-weight: bold;\">Tên Constructor</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Trùng tên Class<br><code>TenLop()</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Trùng tên Class<br><code>TenLop()</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Trùng tên Class<br><code>TenLop()</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Trùng tên Class<br><code>TenLop()</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Từ khóa<br><code>initialize</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Từ khóa<br><code>__construct</code></td>\n                </tr>\n                <tr>\n                    <td style=\"border: 1px solid black; padding: 5px; font-weight: bold;\">Hàm hủy (Destructor)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\"><strong>Bắt buộc</strong> (nếu cấp phát động)<br><code>~TenLop()</code></td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Ít dùng (GC lo)<br><code>finalize()</code> (Deprecated)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Ít dùng (GC lo)<br><code>~TenLop()</code> (Finalizer)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Không có<br>(GC lo)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Không có<br>(GC lo)</td>\n                    <td style=\"border: 1px solid black; padding: 5px;\">Hữu ích cho Resource<br><code>__destruct</code></td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n\n</body>\n</html>"
  },
  {
    "_id": "69399b32cb8bff399ebd738a",
    "chapter": "692ae7567fdaad24a2aec4e8",
    "knowledge_type": "692ae7567fdaad24a2aec4db",
    "title": "Bài tập 1: Trắc nghiệm Lý thuyết",
    "slug": "bai-tap-1-trac-nghiem-ly-thuyet-1765382962275",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Bài tập Trắc nghiệm: Tính Đa Hình</title>\n</head>\n<body>\n\n    <h1 style=\"font-weight: bold; font-size: 2em;\">Bài tập Trắc nghiệm: Tính Đa Hình (Polymorphism)</h1>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">1. Ý nghĩa cốt lõi của \"Polymorphism\" trong OOP là gì?</h2>\n    <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q1\" value=\"A\"> <strong>A.</strong> Khả năng che giấu dữ liệu bên trong đối tượng.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q1\" value=\"B\"> <strong>B.</strong> Khả năng một hành động có thể được thực hiện theo nhiều hình thái khác nhau.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q1\" value=\"C\"> <strong>C.</strong> Khả năng tái sử dụng mã nguồn từ lớp cha.</label>\n        </li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">2. Hai loại hình chính của Tính đa hình là gì?</h2>\n    <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q2\" value=\"A\"> <strong>A.</strong> Compile-time (Lúc biên dịch) và Runtime (Lúc chạy).</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q2\" value=\"B\"> <strong>B.</strong> Single (Đơn) và Multiple (Đa).</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q2\" value=\"C\"> <strong>C.</strong> Public (Công khai) và Private (Riêng tư).</label>\n        </li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">3. \"Method Overloading\" (Nạp chồng phương thức) là ví dụ của loại đa hình nào?</h2>\n    <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q3\" value=\"A\"> <strong>A.</strong> Runtime Polymorphism (Đa hình động).</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q3\" value=\"B\"> <strong>B.</strong> Compile-time Polymorphism (Đa hình tĩnh).</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q3\" value=\"C\"> <strong>C.</strong> Không phải là đa hình.</label>\n        </li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">4. Khi lớp con định nghĩa lại (cung cấp cài đặt cụ thể) cho một phương thức đã có ở lớp cha, kỹ thuật này gọi là gì?</h2>\n    <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q4\" value=\"A\"> <strong>A.</strong> Method Overloading (Nạp chồng).</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q4\" value=\"B\"> <strong>B.</strong> Method Hiding (Ẩn phương thức).</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q4\" value=\"C\"> <strong>C.</strong> Method Overriding (Ghi đè).</label>\n        </li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">5. Trong C++, từ khóa nào được sử dụng để khai báo hàm ảo, cho phép thực hiện Runtime Polymorphism?</h2>\n    <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q5\" value=\"A\"> <strong>A.</strong> <code>static</code></label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q5\" value=\"B\"> <strong>B.</strong> <code>virtual</code></label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q5\" value=\"C\"> <strong>C.</strong> <code>abstract</code></label>\n        </li>\n    </ul>\n\n</body>\n</html>"
  },
  {
    "_id": "69399b36cb8bff399ebd7390",
    "chapter": "692ae7567fdaad24a2aec4ea",
    "knowledge_type": "692ae7567fdaad24a2aec4db",
    "title": "Bài tập 1: Trắc nghiệm Lý thuyết",
    "slug": "bai-tap-1-trac-nghiem-ly-thuyet-1765382966135",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Bài tập Trắc nghiệm: Tính Trừu Tượng</title>\n</head>\n<body>\n\n    <h1 style=\"font-weight: bold; font-size: 2em;\">Bài tập Trắc nghiệm: Tính Trừu Tượng (Abstraction)</h1>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">1. Mục đích cốt lõi của \"Abstraction\" trong lập trình hướng đối tượng là gì?</h2>\n    <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q1\" value=\"A\"> <strong>A.</strong> Để bảo vệ dữ liệu bằng cách sử dụng từ khóa private.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q1\" value=\"B\"> <strong>B.</strong> Để chỉ hiển thị các tính năng thiết yếu và ẩn đi chi tiết triển khai phức tạp.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q1\" value=\"C\"> <strong>C.</strong> Để cho phép một lớp con kế thừa từ nhiều lớp cha.</label>\n        </li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">2. Trong Java hoặc C#, hai cơ chế chính để thực hiện tính trừu tượng là gì?</h2>\n    <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q2\" value=\"A\"> <strong>A.</strong> Class và Object.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q2\" value=\"B\"> <strong>B.</strong> Abstract Class và Interface.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q2\" value=\"C\"> <strong>C.</strong> Getter và Setter.</label>\n        </li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">3. Điều nào sau đây là ĐÚNG khi nói về Lớp trừu tượng (Abstract Class)?</h2>\n    <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q3\" value=\"A\"> <strong>A.</strong> Có thể khởi tạo đối tượng trực tiếp bằng từ khóa <code>new</code>.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q3\" value=\"B\"> <strong>B.</strong> Không thể chứa các phương thức thông thường (non-abstract methods).</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q3\" value=\"C\"> <strong>C.</strong> Không thể khởi tạo đối tượng, chỉ dùng để làm lớp cha cho các lớp khác kế thừa.</label>\n        </li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">4. Phương thức trừu tượng (Abstract Method) là gì?</h2>\n    <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q4\" value=\"A\"> <strong>A.</strong> Là phương thức chỉ có phần khai báo, không có phần thân (body/implementation).</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q4\" value=\"B\"> <strong>B.</strong> Là phương thức được khai báo với từ khóa <code>private</code>.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q4\" value=\"C\"> <strong>C.</strong> Là phương thức không trả về giá trị (void).</label>\n        </li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">5. Ví dụ thực tế nào mô tả đúng nhất về tính trừu tượng?</h2>\n    <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q5\" value=\"A\"> <strong>A.</strong> Một đứa trẻ thừa hưởng màu mắt của cha mẹ.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q5\" value=\"B\"> <strong>B.</strong> Sử dụng điều khiển TV để chuyển kênh mà không cần biết mạch điện tử bên trong hoạt động ra sao.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q5\" value=\"C\"> <strong>C.</strong> Đóng gói quà trong một chiếc hộp kín để người khác không nhìn thấy bên trong.</label>\n        </li>\n    </ul>\n\n</body>\n</html>"
  },
  {
    "_id": "69399b39cb8bff399ebd7396",
    "chapter": "692ae7567fdaad24a2aec4ec",
    "knowledge_type": "692ae7567fdaad24a2aec4db",
    "title": "Bài tập 1: Trắc nghiệm Lý thuyết",
    "slug": "bai-tap-1-trac-nghiem-ly-thuyet-1765382969000",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Bài tập Trắc nghiệm: Tính Đóng Gói</title>\n</head>\n<body>\n\n    <h1 style=\"font-weight: bold; font-size: 2em;\">Bài tập Trắc nghiệm: Tính Đóng Gói (Encapsulation)</h1>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">1. Ý nghĩa chính của \"Encapsulation\" là gì?</h2>\n    <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q1\" value=\"A\"> <strong>A.</strong> Để tạo nhiều lớp con.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q1\" value=\"B\"> <strong>B.</strong> Để ẩn dữ liệu nhạy cảm khỏi người dùng.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q1\" value=\"C\"> <strong>C.</strong> Để viết code ngắn gọn hơn.</label>\n        </li>\n    </ul>\n    <p><em>(Tham khảo: W3Schools)</em></p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">2. Nếu một thuộc tính được khai báo là <code>private</code>, nó có thể được truy cập từ đâu?</h2>\n    <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q2\" value=\"A\"> <strong>A.</strong> Chỉ bên trong cùng một lớp.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q2\" value=\"B\"> <strong>B.</strong> Từ bất kỳ lớp nào trong chương trình.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q2\" value=\"C\"> <strong>C.</strong> Từ các lớp kế thừa nó.</label>\n        </li>\n    </ul>\n    <p><em>(Tham khảo: W3Schools)</em></p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">3. Để truy cập hoặc cập nhật giá trị của biến <code>private</code>, chúng ta nên sử dụng phương pháp nào?</h2>\n    <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q3\" value=\"A\"> <strong>A.</strong> Thay đổi biến private thành public.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q3\" value=\"B\"> <strong>B.</strong> Sử dụng con trỏ (pointer) để can thiệp.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q3\" value=\"C\"> <strong>C.</strong> Sử dụng các phương thức public <code>get</code> và <code>set</code>.</label>\n        </li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">4. Lợi ích lớn nhất của việc sử dụng <code>Setter</code> thay vì gán biến trực tiếp là gì?</h2>\n    <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q4\" value=\"A\"> <strong>A.</strong> Có thể kiểm tra tính hợp lệ (Validate) của dữ liệu trước khi gán.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q4\" value=\"B\"> <strong>B.</strong> Giúp chương trình chạy nhanh hơn.</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q4\" value=\"C\"> <strong>C.</strong> Giảm dung lượng bộ nhớ.</label>\n        </li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">5. Trong C++, nếu không khai báo Access Modifier trong <code>class</code>, mức truy cập mặc định là gì?</h2>\n    <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q5\" value=\"A\"> <strong>A.</strong> Public</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q5\" value=\"B\"> <strong>B.</strong> Private</label>\n        </li>\n        <li style=\"margin-bottom: 10px;\">\n            <label><input type=\"radio\" name=\"q5\" value=\"C\"> <strong>C.</strong> Protected</label>\n        </li>\n    </ul>\n\n</body>\n</html>"
  },
  {
    "_id": "69399b3ecb8bff399ebd739c",
    "chapter": "692ae7567fdaad24a2aec4e8",
    "knowledge_type": "692ae7567fdaad24a2aec4db",
    "title": "Bài tập 2: Coding",
    "slug": "bai-tap-2-coding-1765382974833",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Bài tập Đa hình: Payment Gateway</title>\n</head>\n<body>\n\n    <h1 style=\"font-weight: bold; font-size: 2em;\">Đề bài: Hệ thống Cổng Thanh toán Đa kênh</h1>\n    <p><strong>Mô tả bài toán:</strong> Bạn đang xây dựng module thanh toán cho một sàn thương mại điện tử. Hệ thống cần hỗ trợ nhiều phương thức thanh toán khác nhau (Thẻ tín dụng, Ví điện tử, v.v.). Dù phương thức thanh toán là gì, hệ thống chỉ cần gọi một lệnh <code>pay()</code> duy nhất, nhưng cách xử lý tiền và phí dịch vụ sẽ khác nhau tùy vào từng loại.</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">1. Lớp cha trừu tượng (Abstract Base Class)</h2>\n    <p>Tạo một lớp trừu tượng tên là <code>PaymentMethod</code>:</p>\n    <ul>\n        <li>Có phương thức trừu tượng (hoặc ảo) tên là <code>pay(double amount)</code>. Phương thức này không có thân hàm (hoặc thân hàm rỗng), nhiệm vụ của nó là bắt buộc các lớp con phải tự định nghĩa cách thanh toán.</li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">2. Các lớp con (Concrete Classes)</h2>\n    <p>Tạo 2 lớp kế thừa từ <code>PaymentMethod</code>:</p>\n    <ul>\n        <li><strong>Lớp <code>CreditCard</code> (Thẻ tín dụng):</strong>\n            <ul>\n                <li>Có thuộc tính: <code>cardNumber</code>.</li>\n                <li>Ghi đè hàm <code>pay(amount)</code>: Tính thêm <strong>2% phí dịch vụ</strong>. <br><em>(Công thức: Thực trả = amount + amount * 0.02)</em>.</li>\n                <li>In ra màn hình: \"Thanh toán [Tổng tiền] bằng thẻ [cardNumber]. Phí: 2%\".</li>\n            </ul>\n        </li>\n        <li><strong>Lớp <code>EWallet</code> (Ví điện tử):</strong>\n            <ul>\n                <li>Có thuộc tính: <code>phoneNumber</code>.</li>\n                <li>Ghi đè hàm <code>pay(amount)</code>: <strong>Không mất phí</strong> dịch vụ.</li>\n                <li>In ra màn hình: \"Thanh toán [amount] bằng ví [phoneNumber]. Không mất phí\".</li>\n            </ul>\n        </li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">3. Kiểm thử Đa hình (Polymorphism Test)</h2>\n    <p>Trong hàm <code>main</code>:</p>\n    <ul>\n        <li>Tạo một danh sách (List/Array/Vector) chứa lẫn lộn cả đối tượng <code>CreditCard</code> và <code>EWallet</code>.</li>\n        <li>Dùng một vòng lặp (for/foreach) để duyệt qua danh sách này.</li>\n        <li>Với mỗi phần tử, gọi hàm <code>pay(100.0)</code>.</li>\n        <li><strong>Yêu cầu:</strong> Chương trình phải tự động nhận diện đối tượng và tính phí đúng (Thẻ tín dụng mất 102, Ví chỉ mất 100) mà không cần dùng lệnh <code>if-else</code> để kiểm tra loại đối tượng.</li>\n    </ul>\n\n</body>\n</html>"
  },
  {
    "_id": "69399b48cb8bff399ebd73a2",
    "chapter": "692ae7567fdaad24a2aec4ea",
    "knowledge_type": "692ae7567fdaad24a2aec4db",
    "title": "Bài tập 2: Coding",
    "slug": "bai-tap-2-coding-1765382984951",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Bài tập Trừu tượng: Smart Home Controller</title>\n</head>\n<body>\n\n    <h1 style=\"font-weight: bold; font-size: 2em;\">Đề bài: Bộ Điều Khiển Nhà Thông Minh (Smart Home Controller)</h1>\n    <p><strong>Mô tả bài toán:</strong> Bạn đang viết phần mềm cho một bộ điều khiển trung tâm (Central Hub). Hệ thống này cần quản lý các thiết bị thông minh trong nhà. Vấn đề là mỗi thiết bị (Đèn, Máy lạnh) có cách hoạt động riêng biệt, nhưng chúng đều chia sẻ một quy trình kết nối mạng giống nhau.</p>\n    <p>Hãy sử dụng <strong>Lớp Trừu Tượng (Abstract Class)</strong> để giải quyết vấn đề này, đảm bảo tính nhất quán nhưng vẫn linh hoạt.</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">1. Lớp cha trừu tượng (Abstract Base Class)</h2>\n    <p>Tạo lớp <code>SmartDevice</code> với các yêu cầu sau:</p>\n    <ul>\n        <li><strong>Thuộc tính (Protected):</strong> <code>deviceID</code> (mã thiết bị), <code>deviceName</code> (tên thiết bị).</li>\n        <li><strong>Phương thức cụ thể (Concrete Method):</strong> <code>connect()</code>.\n            <br><em>Mô tả:</em> Phương thức này dùng chung cho mọi thiết bị. Nó in ra: \"Thiết bị [deviceName] đang kết nối đến WiFi Server... Đã kết nối!\".\n        </li>\n        <li><strong>Phương thức trừu tượng (Abstract Method):</strong> <code>operate()</code>.\n            <br><em>Mô tả:</em> Đây là hành động chính của thiết bị. Vì đèn thì \"phát sáng\", máy lạnh thì \"làm mát\", nên lớp cha không thể định nghĩa cụ thể. Hãy để lớp con tự quyết định.\n        </li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">2. Các lớp con (Concrete Classes)</h2>\n    <ul>\n        <li><strong>Lớp <code>SmartLight</code> (Đèn thông minh):</strong>\n            <ul>\n                <li>Kế thừa từ <code>SmartDevice</code>.</li>\n                <li>Triển khai hàm <code>operate()</code>: In ra \"Đèn [deviceName] đang bật chế độ ánh sáng vàng, độ sáng 70%.\"</li>\n            </ul>\n        </li>\n        <li><strong>Lớp <code>AirConditioner</code> (Máy lạnh):</strong>\n            <ul>\n                <li>Kế thừa từ <code>SmartDevice</code>.</li>\n                <li>Triển khai hàm <code>operate()</code>: In ra \"Máy lạnh [deviceName] đang làm lạnh ở mức 24 độ C, chế độ Cool.\"</li>\n            </ul>\n        </li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">3. Kịch bản chạy (Client Code)</h2>\n    <p>Trong hàm <code>main</code>:</p>\n    <ul>\n        <li>Tạo một danh sách các thiết bị (gồm cả Đèn và Máy lạnh).</li>\n        <li>Duyệt qua danh sách đó.</li>\n        <li>Với mỗi thiết bị, thực hiện tuần tự:\n            <ol>\n                <li>Gọi hàm <code>connect()</code> (Hành động chung - Abstraction ẩn đi sự phức tạp của kết nối mạng).</li>\n                <li>Gọi hàm <code>operate()</code> (Hành động riêng - Được định nghĩa cụ thể ở lớp con).</li>\n            </ol>\n        </li>\n    </ul>\n\n</body>\n</html>"
  },
  {
    "_id": "69399b4ccb8bff399ebd73a8",
    "chapter": "692ae7567fdaad24a2aec4ec",
    "knowledge_type": "692ae7567fdaad24a2aec4db",
    "title": "Bài tập 2: Coding",
    "slug": "bai-tap-2-coding-1765382988847",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Bài tập Thực hành: Smart Product System</title>\n</head>\n<body>\n\n    <h1 style=\"font-weight: bold; font-size: 2em;\">Đề bài: Hệ thống Quản lý Sản phẩm Thông minh</h1>\n    <p><strong>Mô tả bài toán:</strong> Bạn được thuê để xây dựng phần lõi (Back-end) cho một trang thương mại điện tử. Nhiệm vụ của bạn là thiết kế một Class có tên là <code>Product</code> (Sản phẩm) đảm bảo tính toàn vẹn dữ liệu tuyệt đối.</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">1. Dữ liệu ẩn (Private Fields)</h2>\n    <p>Class <code>Product</code> phải có các thuộc tính <strong>riêng tư</strong> (private) sau:</p>\n    <ul>\n        <li><code>name</code> (Tên sản phẩm - chuỗi): Không được rỗng.</li>\n        <li><code>price</code> (Giá bán - số thực): Phải lớn hơn 0.</li>\n        <li><code>stock</code> (Số lượng tồn kho - số nguyên): Phải lớn hơn hoặc bằng 0.</li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">2. Khởi tạo (Constructor)</h2>\n    <p>Viết Constructor để thiết lập giá trị ban đầu cho 3 thuộc tính trên ngay khi đối tượng được khởi tạo.</p>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">3. Kiểm soát truy cập (Encapsulation Logic)</h2>\n    <ul>\n        <li>Viết <strong>Getter</strong> cho tất cả các thuộc tính để xem dữ liệu.</li>\n        <li>Viết <strong>Setter</strong> cho <code>price</code> và <code>stock</code> với các điều kiện ràng buộc (Validation):\n            <ul>\n                <li>Nếu <code>price</code> truyền vào &le; 0: Giữ nguyên giá trị cũ và thông báo lỗi.</li>\n                <li>Nếu <code>stock</code> truyền vào &lt; 0: Giữ nguyên giá trị cũ và thông báo lỗi.</li>\n            </ul>\n        </li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">4. Phương thức nghiệp vụ (Business Methods)</h2>\n    <p>Xây dựng phương thức <code>sell(int quantity)</code> để xử lý việc bán hàng:</p>\n    <ul>\n        <li>Kiểm tra nếu <code>quantity</code> &gt; <code>stock</code> (không đủ hàng trong kho) &rarr; Trả về <code>false</code> (hoặc in thông báo lỗi).</li>\n        <li>Nếu đủ hàng &rarr; Trừ số lượng trong <code>stock</code> và trả về <code>true</code>.</li>\n    </ul>\n\n</body>\n</html>"
  },
  {
    "_id": "69399b6fcb8bff399ebd73ae",
    "chapter": "692ae7567fdaad24a2aec4e8",
    "knowledge_type": "692ae7567fdaad24a2aec4dd",
    "title": "Bài giải Bài tập 1",
    "slug": "bai-giai-bai-tap-1-1765383023414",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Đáp án và Giải thích chi tiết</title>\n</head>\n<body>\n\n    <h1 style=\"font-weight: bold; font-size: 2em; color: #2c3e50;\">Đáp án và Giải thích chi tiết</h1>\n    <p>Dưới đây là phân tích chi tiết cho từng câu hỏi để củng cố kiến thức về Tính đa hình.</p>\n\n    <hr>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; color: #2980b9;\">Câu 1: Ý nghĩa chính của Polymorphism</h2>\n    \n    <div style=\"background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px; border: 1px solid #c3e6cb;\">\n        <strong>Đáp án chính xác là: B. Khả năng một hành động có thể được thực hiện theo nhiều hình thái khác nhau.</strong>\n    </div>\n\n    <p>Từ \"Polymorphism\" xuất phát từ tiếng Hy Lạp (\"Poly\" = nhiều, \"Morph\" = hình thái). Trong OOP, nó cho phép một hành động hoạt động khác nhau tùy thuộc vào đối tượng thực hiện.</p>\n    \n    <ul>\n        <li><strong>Tại sao chọn B (Đa hình thái):</strong> Đây là định nghĩa cốt lõi. Ví dụ: cùng hàm <code>phatAmThanh()</code>, nhưng Mèo kêu \"Meo meo\", Chó sủa \"Gâu gâu\". Mã nguồn gọi hàm không cần biết chính xác loại đối tượng.</li>\n        <li><strong>Tại sao A sai (Che giấu dữ liệu):</strong> Đây là định nghĩa của <strong>Tính đóng gói (Encapsulation)</strong>.</li>\n        <li><strong>Tại sao C sai (Tái sử dụng mã):</strong> Đây là định nghĩa của <strong>Tính kế thừa (Inheritance)</strong>. Kế thừa để \"thừa hưởng\", Đa hình để \"ứng xử linh hoạt\".</li>\n    </ul>\n\n    <hr>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; color: #2980b9;\">Câu 2: Các loại hình của Đa hình</h2>\n\n    <div style=\"background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px; border: 1px solid #c3e6cb;\">\n        <strong>Đáp án chính xác là: A. Compile-time (Lúc biên dịch) và Runtime (Lúc chạy).</strong>\n    </div>\n\n    <p>Đa hình được chia thành hai giai đoạn dựa trên thời điểm quyết định phương thức nào sẽ được gọi.</p>\n\n    <ul>\n        <li><strong>Compile-time (Static Binding):</strong> Dựa vào <strong>Method Overloading</strong>. Trình biên dịch chốt hàm cần gọi dựa trên số lượng/kiểu tham số ngay khi biên dịch (Ví dụ: <code>tinhTong(int)</code> vs <code>tinhTong(int, int)</code>).</li>\n        <li><strong>Runtime (Dynamic Binding):</strong> Dựa vào <strong>Method Overriding</strong>. Hệ thống chỉ biết chính xác hàm của lớp con nào được gọi khi chương trình đang chạy (Ví dụ: <code>vatNuoi.keu()</code>).</li>\n        <li><strong>Các đáp án khác:</strong> Single/Multiple là phân loại của Kế thừa; Public/Private là mức truy cập của Đóng gói.</li>\n    </ul>\n\n    <hr>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; color: #2980b9;\">Câu 3: Phân loại Method Overloading</h2>\n\n    <div style=\"background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px; border: 1px solid #c3e6cb;\">\n        <strong>Đáp án chính xác là: B. Compile-time Polymorphism (Đa hình tĩnh).</strong>\n    </div>\n\n    <p>Method Overloading cho phép một lớp có nhiều phương thức cùng tên nhưng khác tham số.</p>\n\n    <ul>\n        <li><strong>Tại sao chọn B (Compile-time):</strong> Khi gọi hàm (ví dụ: <code>tinhTong(5, 10)</code>), trình biên dịch nhìn vào kiểu dữ liệu (int) và liên kết ngay với hàm tương ứng trước khi chương trình chạy (Static Binding).</li>\n        <li><strong>Tại sao A sai (Runtime):</strong> Đa hình động liên quan đến Ghi đè (Overriding), phụ thuộc vào đối tượng thực tế lúc chạy.</li>\n        <li><strong>Tại sao C sai:</strong> Overloading thỏa mãn định nghĩa đa hình: \"Một tên hàm, nhiều cách xử lý tùy vào tham số\".</li>\n    </ul>\n\n    <hr>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; color: #2980b9;\">Câu 4: Khái niệm Method Overriding</h2>\n\n    <div style=\"background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px; border: 1px solid #c3e6cb;\">\n        <strong>Đáp án chính xác là: C. Method Overriding (Ghi đè).</strong>\n    </div>\n\n    <p>Kỹ thuật cho phép lớp con cung cấp cách thực thi riêng biệt cho phương thức đã kế thừa từ lớp cha.</p>\n\n    <ul>\n        <li><strong>Tại sao chọn C (Ghi đè):</strong> Điều kiện là cùng tên, cùng tham số, cùng kiểu trả về. Mục đích để lớp con thể hiện hành vi đặc thù (Ví dụ: Xe đua chạy nhanh hơn xe thường).</li>\n        <li><strong>Tại sao A sai (Nạp chồng):</strong> Nạp chồng là cùng tên nhưng <strong>khác tham số</strong>.</li>\n        <li><strong>Tại sao B sai (Ẩn phương thức):</strong> Xảy ra với hàm <code>static</code>, hàm cha bị ẩn đi chứ không bị ghi đè theo cơ chế đa hình động.</li>\n    </ul>\n\n    <hr>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; color: #2980b9;\">Câu 5: Từ khóa trong C++</h2>\n\n    <div style=\"background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px; border: 1px solid #c3e6cb;\">\n        <strong>Đáp án chính xác là: B. virtual</strong>\n    </div>\n\n    <p>Trong C++, từ khóa này kích hoạt cơ chế Dynamic Binding (Liên kết động).</p>\n\n    <ul>\n        <li><strong>Tại sao chọn B (virtual):</strong> Nếu không có <code>virtual</code>, C++ mặc định dùng Static Binding (gọi hàm theo kiểu của con trỏ). Thêm <code>virtual</code> báo cho trình biên dịch chờ đến lúc chạy để xem đối tượng thực sự là gì.</li>\n        <li><strong>Tại sao A sai (static):</strong> Hàm <code>static</code> thuộc về lớp, không phụ thuộc đối tượng nên không tham gia đa hình.</li>\n        <li><strong>Tại sao C sai (abstract):</strong> Đây là từ khóa của Java/C#. C++ sử dụng hàm ảo thuần túy (pure virtual function).</li>\n    </ul>\n\n</body>\n</html>"
  },
  {
    "_id": "69399b74cb8bff399ebd73b4",
    "chapter": "692ae7567fdaad24a2aec4ea",
    "knowledge_type": "692ae7567fdaad24a2aec4dd",
    "title": "Bài giải Bài tập 1",
    "slug": "bai-giai-bai-tap-1-1765383028458",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Đáp án và Giải thích chi tiết</title>\n</head>\n<body>\n\n    <h1 style=\"font-weight: bold; font-size: 2em; color: #2c3e50;\">Đáp án và Giải thích chi tiết</h1>\n    <p>Dưới đây là phân tích chi tiết cho từng câu hỏi để củng cố kiến thức về Tính trừu tượng.</p>\n\n    <hr>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; color: #2980b9;\">Câu 1: Mục đích cốt lõi của Abstraction</h2>\n    \n    <div style=\"background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px; border: 1px solid #c3e6cb;\">\n        <strong>Đáp án chính xác là: B. Để chỉ hiển thị các tính năng thiết yếu và ẩn đi chi tiết triển khai phức tạp.</strong>\n    </div>\n\n    <p>Tính trừu tượng (Abstraction) là phương pháp tư duy tập trung vào \"Cái gì\" (What) mà đối tượng làm được, thay vì \"Làm như thế nào\" (How) nó thực hiện điều đó.</p>\n    \n\n    <ul>\n        <li><strong>Tại sao chọn B (Ẩn chi tiết phức tạp):</strong> Mục tiêu là giảm độ phức tạp bằng cách tách giao diện (interface) khỏi cài đặt (implementation). Ví dụ: Lái xe chỉ cần dùng vô lăng (giao diện), không cần hiểu động cơ đốt trong (chi tiết ẩn).</li>\n        <li><strong>Tại sao A sai (Bảo vệ dữ liệu):</strong> Việc dùng <code>private</code> để giấu dữ liệu là <strong>Tính đóng gói (Encapsulation)</strong>.</li>\n        <li><strong>Tại sao C sai (Đa kế thừa):</strong> Đây là tính năng của <strong>Tính kế thừa (Inheritance)</strong>.</li>\n    </ul>\n\n    <hr>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; color: #2980b9;\">Câu 2: Cơ chế thực hiện trong Java/C#</h2>\n\n    <div style=\"background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px; border: 1px solid #c3e6cb;\">\n        <strong>Đáp án chính xác là: B. Abstract Class và Interface.</strong>\n    </div>\n\n    <p>Trong Java và C#, đây là hai công cụ mạnh mẽ nhất để thiết kế hệ thống theo tư duy trừu tượng.</p>\n    \n\n    <ul>\n        <li><strong>Abstract Class (Lớp trừu tượng):</strong> Là lớp \"dở dang\", dùng cho quan hệ \"là một\" (Is-A). Có thể chứa cả hàm đã viết xong và hàm chưa viết xong.</li>\n        <li><strong>Interface (Giao diện):</strong> Là \"bản hợp đồng\" dùng cho quan hệ \"có thể làm\" (Can-Do). Bất kỳ lớp nào implements đều phải viết code cho các hàm trong đó.</li>\n        <li><strong>Tại sao A và C sai:</strong> Class/Object là khái niệm nền tảng, còn Getter/Setter thuộc về Đóng gói.</li>\n    </ul>\n\n    <hr>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; color: #2980b9;\">Câu 3: Đặc điểm Lớp trừu tượng</h2>\n\n    <div style=\"background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px; border: 1px solid #c3e6cb;\">\n        <strong>Đáp án chính xác là: C. Không thể khởi tạo đối tượng, chỉ dùng để làm lớp cha cho các lớp khác kế thừa.</strong>\n    </div>\n\n    <p>Lớp trừu tượng giống như một \"bản vẽ thiết kế chưa hoàn chỉnh\".</p>\n\n    <ul>\n        <li><strong>Tại sao chọn C (Không thể khởi tạo):</strong> Nếu cố tình viết <code>new AbstractClass()</code>, trình biên dịch sẽ báo lỗi. Nhiệm vụ của nó là làm khuôn mẫu cho lớp con.</li>\n        <li><strong>Tại sao A sai (Dùng từ khóa new):</strong> Bạn chỉ có thể dùng <code>new</code> với các lớp con cụ thể (concrete classes).</li>\n        <li><strong>Tại sao B sai (Không thể chứa phương thức thường):</strong> Abstract Class linh hoạt hơn Interface ở chỗ nó CÓ THỂ chứa các hàm đã viết sẵn code (non-abstract methods).</li>\n    </ul>\n\n    <hr>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; color: #2980b9;\">Câu 4: Phương thức trừu tượng</h2>\n\n    <div style=\"background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px; border: 1px solid #c3e6cb;\">\n        <strong>Đáp án chính xác là: A. Là phương thức chỉ có phần khai báo, không có phần thân (body/implementation).</strong>\n    </div>\n\n    <p>Nó là một \"lời hứa\" về hành động mà lớp cha bắt buộc các lớp con phải thực hiện.</p>\n\n    <ul>\n        <li><strong>Tại sao chọn A (Không có phần thân):</strong> Cú pháp kết thúc bằng dấu chấm phẩy <code>;</code> thay vì <code>{ ... }</code>. Ví dụ: Bản vẽ ghi \"Khu vực bếp\", thợ xây (lớp con) phải tự xây bếp.</li>\n        <li><strong>Tại sao B sai (Khai báo private):</strong> <code>abstract</code> (bắt con viết) và <code>private</code> (cấm con thấy) là hai từ khóa mâu thuẫn nhau.</li>\n        <li><strong>Tại sao C sai (Không trả về giá trị):</strong> Phương thức trừu tượng có thể trả về bất kỳ kiểu dữ liệu nào, không chỉ <code>void</code>.</li>\n    </ul>\n\n    <hr>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; color: #2980b9;\">Câu 5: Ví dụ thực tế</h2>\n\n    <div style=\"background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px; border: 1px solid #c3e6cb;\">\n        <strong>Đáp án chính xác là: B. Sử dụng điều khiển TV để chuyển kênh mà không cần biết mạch điện tử bên trong hoạt động ra sao.</strong>\n    </div>\n\n    <p>Đây là ví dụ kinh điển để phân biệt Trừu tượng hóa với các tính chất khác.</p>\n    \n\n    <ul>\n        <li><strong>Tại sao chọn B (Điều khiển TV):</strong> \"Mạch điện tử\" là sự phức tạp (Implementation), \"Nút bấm\" là giao diện đơn giản (Interface). Người dùng chỉ cần tương tác với giao diện.</li>\n        <li><strong>Tại sao A sai (Di truyền):</strong> Đây là ví dụ của <strong>Tính kế thừa</strong>.</li>\n        <li><strong>Tại sao C sai (Hộp quà kín):</strong> Đây là ví dụ của <strong>Tính đóng gói</strong> (che giấu để bảo vệ nội dung).</li>\n    </ul>\n\n</body>\n</html>"
  },
  {
    "_id": "69399b77cb8bff399ebd73ba",
    "chapter": "692ae7567fdaad24a2aec4ec",
    "knowledge_type": "692ae7567fdaad24a2aec4dd",
    "title": "Bài giải Bài tập 1",
    "slug": "bai-giai-bai-tap-1-1765383031337",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Đáp án và Giải thích chi tiết</title>\n</head>\n<body>\n\n    <h1 style=\"font-weight: bold; font-size: 2em; color: #2c3e50;\">Đáp án và Giải thích chi tiết</h1>\n    <p>Dưới đây là phân tích chi tiết cho từng câu hỏi để củng cố kiến thức về Tính đóng gói.</p>\n\n    <hr>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; color: #2980b9;\">Câu 1: Ý nghĩa chính của Encapsulation</h2>\n    \n    <div style=\"background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px; border: 1px solid #c3e6cb;\">\n        <strong>Đáp án chính xác là: B. Để ẩn dữ liệu nhạy cảm khỏi người dùng.</strong>\n    </div>\n\n    <p>Trong Lập trình Hướng đối tượng (OOP), Tính đóng gói có ý nghĩa cốt lõi là bảo vệ trạng thái bên trong của một đối tượng.</p>\n    \n    <ul>\n        <li><strong>Tại sao chọn B (Ẩn dữ liệu):</strong> Encapsulation cho phép khai báo các biến là <code>private</code>. Người dùng phải thông qua các phương thức <code>public</code> (getter/setter) để truy cập. Điều này giúp kiểm soát dữ liệu nào được phép thay đổi và thay đổi như thế nào.</li>\n        <li><strong>Tại sao A sai (Tạo nhiều lớp con):</strong> Việc phân cấp lớp liên quan đến <strong>Tính kế thừa (Inheritance)</strong>, không phải Tính đóng gói.</li>\n        <li><strong>Tại sao C sai (Viết code ngắn gọn hơn):</strong> Thực tế, đóng gói thường làm code dài hơn do phải viết thêm hàm getter/setter. Tuy nhiên, đổi lại là sự an toàn, dễ bảo trì và mở rộng.</li>\n    </ul>\n\n    <hr>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; color: #2980b9;\">Câu 2: Phạm vi của Private</h2>\n\n    <div style=\"background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px; border: 1px solid #c3e6cb;\">\n        <strong>Đáp án chính xác là: A. Chỉ bên trong cùng một lớp.</strong>\n    </div>\n\n    <p>Các từ khóa Access Modifiers đóng vai trò như những \"cánh cổng\" kiểm soát ai được phép thấy dữ liệu.</p>\n\n    <ul>\n        <li><strong>Tại sao chọn A (Chỉ bên trong cùng lớp):</strong> <code>private</code> là cấp độ bảo mật cao nhất. Nó \"khóa\" hoàn toàn thành phần bên trong lớp đó. Không mã nguồn nào bên ngoài (kể cả hàm main) có thể gọi trực tiếp.</li>\n        <li><strong>Tại sao B sai (Từ bất kỳ lớp nào):</strong> Đây là đặc điểm của từ khóa <code>public</code>.</li>\n        <li><strong>Tại sao C sai (Từ các lớp kế thừa):</strong> Đây là đặc điểm của từ khóa <code>protected</code>. Lớp con không thể truy cập trực tiếp thành phần <code>private</code> của lớp cha.</li>\n    </ul>\n\n    <hr>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; color: #2980b9;\">Câu 3: Cách truy cập biến Private</h2>\n\n    <div style=\"background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px; border: 1px solid #c3e6cb;\">\n        <strong>Đáp án chính xác là: C. Sử dụng các phương thức public get và set.</strong>\n    </div>\n\n    <p>Đây là mô hình tiêu chuẩn để thực hiện Tính đóng gói: thay vì để cửa mở toang, ta xây dựng \"cửa có bảo vệ\".</p>\n\n    <ul>\n        <li><strong>Tại sao chọn C (Getter và Setter):</strong>\n            <ul>\n                <li><em>Kiểm soát:</em> Setter cho phép kiểm tra tính hợp lệ (Validate) trước khi gán.</li>\n                <li><em>Linh hoạt:</em> Có thể tạo thuộc tính chỉ đọc (read-only) bằng cách chỉ viết Getter.</li>\n                <li><em>Ẩn chi tiết:</em> Thay đổi cách lưu trữ bên trong mà không ảnh hưởng người dùng bên ngoài.</li>\n            </ul>\n        </li>\n        <li><strong>Tại sao A sai (Đổi thành public):</strong> Phá vỡ tính đóng gói, dẫn đến dữ liệu rác không kiểm soát.</li>\n        <li><strong>Tại sao B sai (Dùng con trỏ):</strong> Đây là kỹ thuật tồi (bad practice), phá vỡ sự an toàn bộ nhớ và nguyên tắc OOP.</li>\n    </ul>\n\n    <hr>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; color: #2980b9;\">Câu 4: Lợi ích của Setter</h2>\n\n    <div style=\"background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px; border: 1px solid #c3e6cb;\">\n        <strong>Đáp án chính xác là: A. Có thể kiểm tra tính hợp lệ (Validate) của dữ liệu trước khi gán.</strong>\n    </div>\n\n    <p>Đây là lý do thực tiễn quan trọng nhất khi sử dụng Setter.</p>\n\n    <ul>\n        <li><strong>Tại sao chọn A (Kiểm tra tính hợp lệ):</strong> Khi dùng Setter (ví dụ <code>setAge(-5)</code>), ta có thể chèn điều kiện <code>if-else</code> để chặn giá trị sai ngay từ cửa vào, đảm bảo tính toàn vẹn dữ liệu.</li>\n        <li><strong>Tại sao B sai (Chạy nhanh hơn):</strong> Gọi hàm thực tế tốn tài nguyên CPU hơn một chút so với gán trực tiếp, nhưng sự chênh lệch là không đáng kể so với lợi ích an toàn.</li>\n        <li><strong>Tại sao C sai (Giảm dung lượng bộ nhớ):</strong> Setter là cách thao tác, không phải cách tiết kiệm bộ nhớ. Dữ liệu vẫn chiếm không gian như nhau.</li>\n    </ul>\n\n    <hr>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em; color: #2980b9;\">Câu 5: Mặc định trong C++</h2>\n\n    <div style=\"background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px; border: 1px solid #c3e6cb;\">\n        <strong>Đáp án chính xác là: B. Private</strong>\n    </div>\n\n    <p>Đây là điểm khác biệt quan trọng của C++ so với Java/C# và so với struct.</p>\n\n    <ul>\n        <li><strong>Tại sao chọn B (Private):</strong> C++ ưu tiên sự an toàn. Nếu không ghi rõ Access Modifier, trình biên dịch mặc định coi đó là <code>private</code> để tránh lộ dữ liệu nhạy cảm.</li>\n        <li><strong>Lưu ý về struct:</strong> Trong C++, <code>struct</code> có mặc định là <code>public</code> (để tương thích ngược với ngôn ngữ C).</li>\n    </ul>\n\n</body>\n</html>"
  },
  {
    "_id": "69399b7bcb8bff399ebd73c0",
    "chapter": "692ae7567fdaad24a2aec4e8",
    "knowledge_type": "692ae7567fdaad24a2aec4dd",
    "title": "Bài giải Bài tập 2",
    "slug": "bai-giai-bai-tap-2-1765383035898",
    "content": "<p>Bài giải mẫu</p>"
  },
  {
    "_id": "69399b7fcb8bff399ebd73c6",
    "chapter": "692ae7567fdaad24a2aec4ea",
    "knowledge_type": "692ae7567fdaad24a2aec4dd",
    "title": "Bài giải Bài tập 2",
    "slug": "bai-giai-bai-tap-2-1765383039538",
    "content": "<h1>Bài giải mẫu</h1>"
  },
  {
    "_id": "69399b81cb8bff399ebd73cc",
    "chapter": "692ae7567fdaad24a2aec4ec",
    "knowledge_type": "692ae7567fdaad24a2aec4dd",
    "title": "Bài giải Bài tập 2",
    "slug": "bai-giai-bai-tap-2-1765383041740",
    "content": "<p>Bài giải mẫu</p>"
  },
  {
    "_id": "693fae85927ab03537c0de89",
    "chapter": "692ae7567fdaad24a2aec4e0",
    "knowledge_type": "692ae7567fdaad24a2aec4db",
    "title": "Câu hỏi trắc nghiệm",
    "slug": "cau-hoi-trac-nghiem-1765781125443",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Trắc nghiệm Tổng quan OOP</title>\n</head>\n<body style=\"font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;\">\n\n\n    <div style=\"margin-bottom: 30px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-bottom: 10px;\">\n            <big><strong>Câu 1: Lập trình hướng đối tượng (OOP) là gì?</strong></big>\n        </h3>\n        <div style=\"border: 1px solid #333; padding: 15px; background-color: #fff;\">\n            <p style=\"margin: 5px 0;\"><strong>A.</strong> Là phương pháp lập trình dựa trên các hàm và thủ tục tuyến tính.</p>\n            <p style=\"margin: 5px 0;\"><strong>B.</strong> Là mô hình lập trình dựa trên khái niệm \"đối tượng\" chứa dữ liệu và mã nguồn.</p>\n            <p style=\"margin: 5px 0;\"><strong>C.</strong> Là ngôn ngữ lập trình chỉ dùng để thiết kế giao diện web.</p>\n            <p style=\"margin: 5px 0;\"><strong>D.</strong> Là cách viết code không cần sử dụng biến hay hàm.</p>\n        </div>\n    </div>\n\n    <div style=\"margin-bottom: 30px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-bottom: 10px;\">\n            <big><strong>Câu 2: Sự khác nhau cơ bản giữa Class (Lớp) và Object (Đối tượng) là gì?</strong></big>\n        </h3>\n        <div style=\"border: 1px solid #333; padding: 15px; background-color: #fff;\">\n            <p style=\"margin: 5px 0;\"><strong>A.</strong> Class là thực thể cụ thể, Object là bản thiết kế.</p>\n            <p style=\"margin: 5px 0;\"><strong>B.</strong> Class và Object là hai tên gọi khác nhau của cùng một thứ.</p>\n            <p style=\"margin: 5px 0;\"><strong>C.</strong> Class là bản thiết kế (khuôn mẫu), Object là thực thể cụ thể được tạo ra từ Class.</p>\n            <p style=\"margin: 5px 0;\"><strong>D.</strong> Object dùng để lưu trữ dữ liệu, Class dùng để xóa dữ liệu.</p>\n        </div>\n    </div>\n\n    <div style=\"margin-bottom: 30px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-bottom: 10px;\">\n            <big><strong>Câu 3: Bốn tính chất quan trọng nhất của OOP là gì?</strong></big>\n        </h3>\n        <div style=\"border: 1px solid #333; padding: 15px; background-color: #fff;\">\n            <p style=\"margin: 5px 0;\"><strong>A.</strong> Cộng, Trừ, Nhân, Chia.</p>\n            <p style=\"margin: 5px 0;\"><strong>B.</strong> Đóng gói, Kế thừa, Đa hình, Trừu tượng.</p>\n            <p style=\"margin: 5px 0;\"><strong>C.</strong> HTML, CSS, JavaScript, SQL.</p>\n            <p style=\"margin: 5px 0;\"><strong>D.</strong> Biến, Mảng, Vòng lặp, Hàm.</p>\n        </div>\n    </div>\n\n    <div style=\"margin-bottom: 30px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-bottom: 10px;\">\n            <big><strong>Câu 4: Tại sao OOP giúp code dễ bảo trì hơn?</strong></big>\n        </h3>\n        <div style=\"border: 1px solid #333; padding: 15px; background-color: #fff;\">\n            <p style=\"margin: 5px 0;\"><strong>A.</strong> Vì OOP bắt buộc code phải ngắn hơn.</p>\n            <p style=\"margin: 5px 0;\"><strong>B.</strong> Vì OOP không cho phép sửa lỗi sau khi viết xong.</p>\n            <p style=\"margin: 5px 0;\"><strong>C.</strong> Vì tính chất tái sử dụng (Kế thừa) và khả năng quản lý code theo từng module (Đóng gói).</p>\n            <p style=\"margin: 5px 0;\"><strong>D.</strong> Vì máy tính chạy code OOP nhanh hơn gấp đôi code thường.</p>\n        </div>\n    </div>\n\n    <div style=\"margin-bottom: 30px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-bottom: 10px;\">\n            <big><strong>Câu 5: Đa hình (Polymorphism) được hiểu như thế nào?</strong></big>\n        </h3>\n        <div style=\"border: 1px solid #333; padding: 15px; background-color: #fff;\">\n            <p style=\"margin: 5px 0;\"><strong>A.</strong> Một hành động có thể được thực hiện theo nhiều cách khác nhau tùy thuộc vào đối tượng gọi nó.</p>\n            <p style=\"margin: 5px 0;\"><strong>B.</strong> Khả năng che giấu dữ liệu quan trọng không cho người dùng thấy.</p>\n            <p style=\"margin: 5px 0;\"><strong>C.</strong> Việc tạo ra nhiều bản sao của cùng một file code.</p>\n            <p style=\"margin: 5px 0;\"><strong>D.</strong> Chỉ cho phép sử dụng một tên hàm duy nhất trong toàn bộ chương trình.</p>\n        </div>\n    </div>\n\n</body>\n</html>"
  },
  {
    "_id": "693faeac927ab03537c0deb1",
    "chapter": "692ae7567fdaad24a2aec4e2",
    "knowledge_type": "692ae7567fdaad24a2aec4db",
    "title": "Câu hỏi trắc nghiệm",
    "slug": "cau-hoi-trac-nghiem-1765781164384",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Trắc nghiệm Môi trường & Cú pháp OOP</title>\n</head>\n<body style=\"font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;\">\n\n    <div style=\"margin-bottom: 30px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-bottom: 10px;\">\n            <big><strong>Câu 1: Cú pháp chuẩn để khởi tạo một đối tượng (Object) từ một Lớp (Class) trong Java/C# là gì?</strong></big>\n        </h3>\n        <div style=\"border: 1px solid #333; padding: 15px; background-color: #fff;\">\n            <p style=\"margin: 5px 0;\"><strong>A.</strong> <code>ClassName objectName = ClassName();</code></p>\n            <p style=\"margin: 5px 0;\"><strong>B.</strong> <code>ClassName objectName = new ClassName();</code></p>\n            <p style=\"margin: 5px 0;\"><strong>C.</strong> <code>new ClassName objectName;</code></p>\n            <p style=\"margin: 5px 0;\"><strong>D.</strong> <code>Object objectName = import ClassName;</code></p>\n        </div>\n    </div>\n\n    <div style=\"margin-bottom: 30px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-bottom: 10px;\">\n            <big><strong>Câu 2: Điều nào sau đây là ĐÚNG về phương thức trừu tượng (abstract method)?</strong></big>\n        </h3>\n        <div style=\"border: 1px solid #333; padding: 15px; background-color: #fff;\">\n            <p style=\"margin: 5px 0;\"><strong>A.</strong> Có phần thân hàm đầy đủ và có thể chạy ngay.</p>\n            <p style=\"margin: 5px 0;\"><strong>B.</strong> Không có phần thân hàm và bắt buộc lớp con (phi trừu tượng) phải ghi đè (override) lại.</p>\n            <p style=\"margin: 5px 0;\"><strong>C.</strong> Có thể khai báo là <code>private</code> để bảo mật.</p>\n            <p style=\"margin: 5px 0;\"><strong>D.</strong> Không cần từ khóa <code>abstract</code> nếu nằm trong abstract class.</p>\n        </div>\n    </div>\n\n    <div style=\"margin-bottom: 30px;\">\n        <h3 style=\"color: #000; font-size: 1.1em; margin-bottom: 10px;\">\n            <big><strong>Câu 3: Lỗi cú pháp phổ biến nào thường gặp khi một lớp thực thi (implements) một Interface?</strong></big>\n        </h3>\n        <div style=\"border: 1px solid #333; padding: 15px; background-color: #fff;\">\n            <p style=\"margin: 5px 0;\"><strong>A.</strong> Quên không ghi đè (override) tất cả các phương thức của Interface đó.</p>\n            <p style=\"margin: 5px 0;\"><strong>B.</strong> Đặt tên lớp trùng với tên Interface.</p>\n            <p style=\"margin: 5px 0;\"><strong>C.</strong> Thực thi quá nhiều Interface cùng lúc (Java cho phép đa thực thi).</p>\n            <p style=\"margin: 5px 0;\"><strong>D.</strong> Khai báo các phương thức trong Interface là <code>public</code>.</p>\n        </div>\n    </div>\n\n</body>\n</html>"
  },
  {
    "_id": "692ae7567fdaad24a2aec4f0",
    "chapter": "692ae7567fdaad24a2aec4e2",
    "knowledge_type": "692ae7567fdaad24a2aec4d7",
    "title": "2.1 Cấu trúc chương trình & Hello World",
    "slug": "cau-truc-co-ban",
    "content": "<p>Cấu trúc cơ bản của một chương trình trong các ngôn ngữ OOP.</p>"
  },
  {
    "_id": "692ae7577fdaad24a2aec510",
    "chapter": "692ae7567fdaad24a2aec4e4",
    "knowledge_type": "692ae7567fdaad24a2aec4db",
    "title": "Bài tập: Quản lý sinh viên bằng Class",
    "slug": "bai-tap-class",
    "content": "<p>Đề bài: Viết chương trình tạo class Student...</p>"
  }
];

const examples = [
  {
    "_id": "692b072eeaa2f83d2b966582",
    "lesson": "692ae7577fdaad24a2aec50c",
    "language": "dart",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "import 'dart:math';\n\n// Lớp trừu tượng\nabstract class Shape {\n  double calculateArea();  // Phương thức trừu tượng\n}\n\n// Lớp triển khai cụ thể\nclass Circle extends Shape {\n  double radius;\n\n  Circle(this.radius);\n\n  @override\n  double calculateArea() {\n    return pi * radius * radius;  // Triển khai cụ thể\n  }\n}\n\n// Sử dụng\nvoid main() {\n  Shape circle = Circle(5);  // Trừu tượng: Chỉ biết là Shape\n  print(\"Diện tích: ${circle.calculateArea()}\");  // Kết quả: ~78.54\n}",
    "explanation": "Shape định nghĩa \"tính diện tích\" nhưng không chỉ rõ cách tính. Circle triển khai cụ thể nhưng người dùng chỉ tượng tác qua Shape bỏ qua chi tiết."
  },
  {
    "_id": "692b3591eaa2f83d2b966593",
    "lesson": "692ae7577fdaad24a2aec50a",
    "language": "cpp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "",
    "explanation": "Ví dụ về tính đa hình"
  },
  {
    "_id": "692b412eeaa2f83d2b966595",
    "lesson": "692b1bf0c5044e5f5eff746d",
    "language": "java",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "public class Main {\n    // 1. CÁCH LÀM SAI: Dùng public\n    static class TaiKhoanSai {\n        public double soDu; // Nguy hiểm!\n    }\n\n    // 2. CÁCH LÀM ĐÚNG: Dùng private + Encapsulation\n    static class TaiKhoanDung {\n        private double soDu; // Chỉ nội bộ class mới thấy\n\n        public TaiKhoanDung() {\n            this.soDu = 0.0;\n        }\n\n        public void napTien(double tien) {\n            if (tien > 0) {\n                this.soDu += tien;\n                System.out.println(\"Da nap: \" + tien);\n            } else {\n                System.out.println(\"Loi: So tien nap phai duong!\");\n            }\n        }\n\n        public double laySoDu() {\n            return this.soDu;\n        }\n    }\n\n    public static void main(String[] args) {\n        // --- Test Class Sai ---\n        TaiKhoanSai tk1 = new TaiKhoanSai();\n        tk1.soDu = -1000000; // LỖI LOGIC: Gán trực tiếp số âm\n\n        // --- Test Class Đúng ---\n        TaiKhoanDung tk2 = new TaiKhoanDung();\n        // tk2.soDu = 100; // Lỗi biên dịch nếu bỏ comment (vì là private)\n\n        tk2.napTien(500000);\n        tk2.napTien(-200000); // Bị chặn\n\n        System.out.println(\"So du hien tai: \" + tk2.laySoDu());\n    }\n}",
    "explanation": ""
  },
  {
    "_id": "692b413eeaa2f83d2b966596",
    "lesson": "692b1bf0c5044e5f5eff746d",
    "language": "csharp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "using System;\n\nclass Program {\n    // 1. CÁCH LÀM SAI\n    class TaiKhoanSai {\n        public double soDu; // Ai cũng sửa được\n    }\n\n    // 2. CÁCH LÀM ĐÚNG\n    class TaiKhoanDung {\n        private double soDu; // Biến private\n\n        public TaiKhoanDung() {\n            soDu = 0.0;\n        }\n\n        public void NapTien(double tien) {\n            if (tien > 0) {\n                soDu += tien;\n                Console.WriteLine(\"Da nap: \" + tien);\n            } else {\n                Console.WriteLine(\"Loi: So tien nap phai duong!\");\n            }\n        }\n\n        public double LaySoDu() {\n            return soDu;\n        }\n    }\n\n    static void Main(string[] args) {\n        // --- Test Sai ---\n        TaiKhoanSai tk1 = new TaiKhoanSai();\n        tk1.soDu = -1000000; // Gán thoải mái -> Lỗi\n\n        // --- Test Đúng ---\n        TaiKhoanDung tk2 = new TaiKhoanDung();\n        // tk2.soDu = 100; // Lỗi biên dịch ngay lập tức\n\n        tk2.NapTien(500000);\n        tk2.NapTien(-200000); // Bị chặn\n\n        Console.WriteLine(\"So du hien tai: \" + tk2.LaySoDu());\n    }\n}",
    "explanation": ""
  },
  {
    "_id": "692b414feaa2f83d2b966597",
    "lesson": "692b1bf0c5044e5f5eff746d",
    "language": "dart",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "// Giả sử đây là file taikhoan.dart\n\n// 1. CÁCH LÀM SAI\nclass TaiKhoanSai {\n  double soDu = 0.0; // Public mặc định\n}\n\n// 2. CÁCH LÀM ĐÚNG\nclass TaiKhoanDung {\n  double _soDu = 0.0; // Dấu gạch dưới (_) nghĩa là Private\n\n  void napTien(double tien) {\n    if (tien > 0) {\n      _soDu += tien;\n      print(\"Da nap: $tien\");\n    } else {\n      print(\"Loi: So tien nap phai duong!\");\n    }\n  }\n\n  double laySoDu() {\n    return _soDu;\n  }\n}\n\nvoid main() {\n  var tk1 = TaiKhoanSai();\n  tk1.soDu = -1000000; // Lỗi logic\n\n  var tk2 = TaiKhoanDung();\n  // tk2._soDu = 100; // Sẽ báo lỗi nếu truy cập từ file khác\n  \n  tk2.napTien(500000);\n  print(\"So du hien tai: ${tk2.laySoDu()}\");\n}",
    "explanation": ""
  },
  {
    "_id": "692b4163eaa2f83d2b966598",
    "lesson": "692b1bf0c5044e5f5eff746d",
    "language": "php",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "<?php\n\n// 1. CÁCH LÀM SAI\nclass TaiKhoanSai {\n    public $soDu;\n}\n\n// 2. CÁCH LÀM ĐÚNG\nclass TaiKhoanDung {\n    private $soDu;\n\n    public function __construct() {\n        $this->soDu = 0.0;\n    }\n\n    public function napTien($tien) {\n        if ($tien > 0) {\n            $this->soDu += $tien;\n            echo \"Da nap: $tien\\n\";\n        } else {\n            echo \"Loi: So tien nap phai duong!\\n\";\n        }\n    }\n\n    public function laySoDu() {\n        return $this->soDu;\n    }\n}\n\n// --- Test ---\n$tk1 = new TaiKhoanSai();\n$tk1->soDu = -1000000; // Sai!\n\n$tk2 = new TaiKhoanDung();\n// $tk2->soDu = 100; // Lỗi Fatal Error vì truy cập property private\n\n$tk2->napTien(500000);\necho \"So du hien tai: \" . $tk2->laySoDu();\n?>",
    "explanation": ""
  },
  {
    "_id": "692c0451eaa2f83d2b9665a3",
    "lesson": "692bb7dba0a7add9d4493892",
    "language": "ruby",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "# Abstract Class\nclass DongVat\n  def an\n    raise NotImplementedError\n  end\nend\n\n# Interface → Module\nmodule BoiDuoc\n  def boi\n    raise NotImplementedError\n  end\nend\n\nclass Cho < DongVat\n  include BoiDuoc\n\n  def an; end\n  def boi; end\nend\n",
    "explanation": ""
  },
  {
    "_id": "692ee0c0eaa2f83d2b966648",
    "lesson": "692edfe7d34cc6910180d52c",
    "language": "dart",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class HinhChuNhat {\n    double dai, rong;\n\n    HinhChuNhat(this.dai, this.rong);\n\n    double dienTich() => dai * rong;\n    double chuVi() => (dai + rong) * 2;\n\n    void hienThi() {\n        print(\"Dài: $dai\");\n        print(\"Rộng: $rong\");\n        print(\"Diện tích: ${dienTich()}\");\n        print(\"Chu vi: ${chuVi()}\\n\");\n    }\n}\n\nvoid main() {\n    var h1 = HinhChuNhat(5, 3);\n    var h2 = HinhChuNhat(12, 4);\n\n    h1.hienThi();\n    h2.hienThi();\n}",
    "explanation": ""
  },
  {
    "_id": "692ee0d3eaa2f83d2b96664a",
    "lesson": "692edfe7d34cc6910180d52c",
    "language": "php",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class HinhChuNhat {\n    private $dai, $rong;\n\n    function __construct($dai, $rong) {\n        $this->dai = $dai;\n        $this->rong = $rong;\n    }\n\n    function dienTich() { return $this->dai * $this->rong; }\n    function chuVi() { return ($this->dai + $this->rong) * 2; }\n\n    function hienThi() {\n        echo \"Dài: $this->dai<br>\";\n        echo \"Rộng: $this->rong<br>\";\n        echo \"Diện tích: \" . $this->dienTich() . \"<br>\";\n        echo \"Chu vi: \" . $this->chuVi() . \"<br><br>\";\n    }\n}\n\n$h1 = new HinhChuNhat(5, 3);\n$h2 = new HinhChuNhat(7, 2);\n$h1->hienThi();\n$h2->hienThi();",
    "explanation": ""
  },
  {
    "_id": "692ee0e4eaa2f83d2b96664c",
    "lesson": "692edfe7d34cc6910180d52c",
    "language": "cpp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "#include <iostream>\nusing namespace std;\n\nclass HinhChuNhat {\nprivate:\n    double dai, rong;\n\npublic:\n    HinhChuNhat(double d, double r) : dai(d), rong(r) {}\n\n    double dienTich() { return dai * rong; }\n    double chuVi() { return (dai + rong) * 2; }\n\n    void hienThi() {\n        cout << \"Dài: \" << dai << \"\\n\";\n        cout << \"Rộng: \" << rong << \"\\n\";\n        cout << \"Diện tích: \" << dienTich() << \"\\n\";\n        cout << \"Chu vi: \" << chuVi() << \"\\n\\n\";\n    }\n};\n\nint main() {\n    HinhChuNhat h1(5, 3), h2(8, 4);\n    h1.hienThi();\n    h2.hienThi();\n}",
    "explanation": ""
  },
  {
    "_id": "692ee0eceaa2f83d2b96664d",
    "lesson": "692edfe7d34cc6910180d52c",
    "language": "java",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class HinhChuNhat {\n    double dai, rong;\n\n    HinhChuNhat(double dai, double rong) {\n        this.dai = dai;\n        this.rong = rong;\n    }\n\n    double dienTich() { return dai * rong; }\n    double chuVi() { return (dai + rong) * 2; }\n\n    void hienThi() {\n        System.out.println(\"Dài: \" + dai);\n        System.out.println(\"Rộng: \" + rong);\n        System.out.println(\"Diện tích: \" + dienTich());\n        System.out.println(\"Chu vi: \" + chuVi());\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        HinhChuNhat h1 = new HinhChuNhat(5, 3);\n        HinhChuNhat h2 = new HinhChuNhat(7, 4);\n\n        h1.hienThi();\n        h2.hienThi();\n    }\n}",
    "explanation": ""
  },
  {
    "_id": "692ee1d5eaa2f83d2b96664e",
    "lesson": "692edff1d34cc6910180d532",
    "language": "java",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class NguyenLieu {\n    String ten;\n    double soLuong;\n    String donVi;\n\n    public NguyenLieu(String ten, double soLuong, String donVi) {\n        this.ten = ten;\n        this.soLuong = soLuong;\n        this.donVi = donVi;\n    }\n\n    void hienThi() {\n        System.out.println(ten + \": \" + soLuong + \" \" + donVi);\n    }\n\n    void capNhat(double slMoi) {\n        this.soLuong = slMoi;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        NguyenLieu nl1 = new NguyenLieu(\"Thịt bò\", 500, \"gram\");\n        NguyenLieu nl2 = new NguyenLieu(\"Hành lá\", 2, \"cây\");\n\n        nl1.hienThi();\n        nl2.hienThi();\n\n        nl1.capNhat(600);\n        nl2.capNhat(3);\n\n        System.out.println(\"Sau khi cập nhật:\");\n        nl1.hienThi();\n        nl2.hienThi();\n    }\n}",
    "explanation": ""
  },
  {
    "_id": "692ee208eaa2f83d2b966652",
    "lesson": "692edff1d34cc6910180d532",
    "language": "dart",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class NguyenLieu {\n  String ten;\n  double soLuong;\n  String donVi;\n\n  NguyenLieu(this.ten, this.soLuong, this.donVi);\n\n  void hienThi() {\n    print(\"$ten: $soLuong $donVi\");\n  }\n\n  void capNhat(double slMoi) {\n    soLuong = slMoi;\n  }\n}\n\nvoid main() {\n  var nl1 = NguyenLieu(\"Cà chua\", 3, \"quả\");\n  var nl2 = NguyenLieu(\"Ớt\", 2, \"trái\");\n\n  nl1.hienThi();\n  nl2.hienThi();\n\n  nl1.capNhat(5);\n  nl2.capNhat(4);\n\n  print(\"Sau khi cập nhật:\");\n  nl1.hienThi();\n  nl2.hienThi();\n}",
    "explanation": ""
  },
  {
    "_id": "692ee21aeaa2f83d2b966653",
    "lesson": "692edff1d34cc6910180d532",
    "language": "php",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "<?php\nclass NguyenLieu {\n    public $ten;\n    public $soLuong;\n    public $donVi;\n\n    function __construct($ten, $soLuong, $donVi) {\n        $this->ten = $ten;\n        $this->soLuong = $soLuong;\n        $this->donVi = $donVi;\n    }\n\n    function hienThi() {\n        echo $this->ten . \": \" . $this->soLuong . \" \" . $this->donVi . \"<br>\";\n    }\n\n    function capNhat($slMoi) {\n        $this->soLuong = $slMoi;\n    }\n}\n\n$nl1 = new NguyenLieu(\"Nước mắm\", 50, \"ml\");\n$nl2 = new NguyenLieu(\"Tỏi\", 3, \"tép\");\n\n$nl1->hienThi();\n$nl2->hienThi();\n\n$nl1->capNhat(80);\n$nl2->capNhat(5);\n\necho \"Sau khi cập nhật:<br>\";\n$nl1->hienThi();\n$nl2->hienThi();",
    "explanation": ""
  },
  {
    "_id": "692ee324eaa2f83d2b966655",
    "lesson": "692ee235d34cc6910180d667",
    "language": "cpp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "#include <iostream>\nusing namespace std;\n\nclass DongVat {\npublic:\n    virtual void phatTiengKeu() {\n        cout << \"Động vật phát tiếng kêu...\" << endl;\n    }\n};\n\nclass Cho : public DongVat {\npublic:\n    void phatTiengKeu() override {\n        cout << \"Gâu gâu!\" << endl;\n    }\n};\n\nclass Meo : public DongVat {\npublic:\n    void phatTiengKeu() override {\n        cout << \"Meow meow!\" << endl;\n    }\n};\n\nint main() {\n    DongVat* dv1 = new Cho();\n    DongVat* dv2 = new Meo();\n\n    dv1->phatTiengKeu();\n    dv2->phatTiengKeu();\n}",
    "explanation": ""
  },
  {
    "_id": "692ee3bbeaa2f83d2b96665f",
    "lesson": "692ee23fd34cc6910180d66d",
    "language": "php",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "<?php\nabstract class HinhHoc {\n    abstract function tinhDienTich();\n}\n\nclass HinhVuong extends HinhHoc {\n    private $canh;\n\n    function __construct($c) {\n        $this->canh = $c;\n    }\n\n    function tinhDienTich() {\n        return $this->canh * $this->canh;\n    }\n}\n\nclass HinhTron extends HinhHoc {\n    private $r;\n\n    function __construct($r) {\n        $this->r = $r;\n    }\n\n    function tinhDienTich() {\n        return pi() * $this->r * $this->r;\n    }\n}\n\n$hv = new HinhVuong(5);\n$ht = new HinhTron(3);\n\necho \"Diện tích hình vuông: \" . $hv->tinhDienTich() . \"<br>\";\necho \"Diện tích hình tròn: \" . $ht->tinhDienTich();",
    "explanation": ""
  },
  {
    "_id": "692ee492eaa2f83d2b966664",
    "lesson": "692ee24bd34cc6910180d673",
    "language": "dart",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "abstract class NhanVien {\n  String ten;\n  double luong;\n  NhanVien(this.ten, this.luong);\n  double tinhThuNhap();\n}\n\nclass NhanVienFullTime extends NhanVien {\n  double thuong;\n  NhanVienFullTime(String ten, double luong, this.thuong) : super(ten, luong);\n  @override\n  double tinhThuNhap() => luong + thuong;\n}\n\nclass NhanVienPartTime extends NhanVien {\n  double soGio, luongGio;\n  NhanVienPartTime(String ten, this.soGio, this.luongGio) : super(ten,0);\n  @override\n  double tinhThuNhap() => soGio * luongGio;\n}\n\nvoid main() {\n  var nv1 = NhanVienFullTime(\"An\", 1000, 200);\n  var nv2 = NhanVienPartTime(\"Binh\", 30, 50);\n\n  print(\"${nv1.ten} thu nhập: ${nv1.tinhThuNhap()}\");\n  print(\"${nv2.ten} thu nhập: ${nv2.tinhThuNhap()}\");\n}",
    "explanation": ""
  },
  {
    "_id": "692ee49aeaa2f83d2b966665",
    "lesson": "692ee24bd34cc6910180d673",
    "language": "php",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "<?php\nabstract class NhanVien {\n    public $ten;\n    public $luong;\n    function __construct($ten, $luong) {\n        $this->ten = $ten;\n        $this->luong = $luong;\n    }\n    abstract function tinhThuNhap();\n}\n\nclass NhanVienFullTime extends NhanVien {\n    private $thuong;\n    function __construct($ten, $luong, $thuong) {\n        parent::__construct($ten,$luong);\n        $this->thuong = $thuong;\n    }\n    function tinhThuNhap() {\n        return $this->luong + $this->thuong;\n    }\n}\n\nclass NhanVienPartTime extends NhanVien {\n    private $soGio;\n    private $luongGio;\n    function __construct($ten, $soGio, $luongGio) {\n        parent::__construct($ten,0);\n        $this->soGio = $soGio;\n        $this->luongGio = $luongGio;\n    }\n    function tinhThuNhap() {\n        return $this->soGio * $this->luongGio;\n    }\n}\n\n$nv1 = new NhanVienFullTime(\"An\", 1000, 200);\n$nv2 = new NhanVienPartTime(\"Binh\", 30, 50);\n\necho $nv1->ten . \" thu nhập: \" . $nv1->tinhThuNhap() . \"<br>\";\necho $nv2->ten . \" thu nhập: \" . $nv2->tinhThuNhap();\n?>",
    "explanation": ""
  },
  {
    "_id": "692ae7577fdaad24a2aec502",
    "lesson": "692ae7577fdaad24a2aec4fe",
    "language": "java",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "public class Car {\n  String brand;\n}",
    "explanation": "Khai báo Class trong Java"
  },
  {
    "_id": "692b0707eaa2f83d2b96657f",
    "lesson": "692ae7577fdaad24a2aec50c",
    "language": "csharp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "using System;\n\n// Giao diện trừu tượng\npublic interface IShape {\n    double CalculateArea();  // Phương thức trừu tượng\n}\n\n// Lớp triển khai cụ thể\npublic class Circle : IShape {\n    private double radius;\n\n    public Circle(double radius) {\n        this.radius = radius;\n    }\n\n    public double CalculateArea() {\n        return Math.PI * radius * radius;  // Triển khai cụ thể\n    }\n}\n\n// Sử dụng\nclass Program {\n    static void Main(string[] args) {\n        IShape circle = new Circle(5);  // Trừu tượng: Chỉ biết là IShape\n        Console.WriteLine(\"Diện tích: \" + circle.CalculateArea());  // Kết quả: ~78.54\n    }\n}",
    "explanation": "Shape định nghĩa \"tính diện tích\" nhưng không chỉ rõ cách tính. Circle triển khai cụ thể nhưng người dùng chỉ tượng tác qua Shape bỏ qua chi tiết."
  },
  {
    "_id": "692b32adeaa2f83d2b966590",
    "lesson": "692b1c06c5044e5f5eff746e",
    "language": "java",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "// Ví dụ Getter Setter trong Java\npublic class Person {\n    private String name;\n    // Getter\n    public String getName() {\n        return name;\n    }\n    // Setter\n    public void setName(String newName) {\n        this.name = newName;\n    }\n}",
    "explanation": "Ví dụ cơ bản về Getter Setter"
  },
  {
    "_id": "692b33b6eaa2f83d2b966591",
    "lesson": "692b1b8ec5044e5f5eff746c",
    "language": "dart",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "// Trong Dart, thuộc tính bắt đầu bằng _ là private\nclass BankAccount {\n  double _balance = 0.0;\n}",
    "explanation": "Ví dụ về Access Modifier trong Dart"
  },
  {
    "_id": "692b3ea6eaa2f83d2b966594",
    "lesson": "692b1bf0c5044e5f5eff746d",
    "language": "cpp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "#include <iostream>\nusing namespace std;\n\n// 1. CÁCH LÀM SAI: Dùng public\nclass TaiKhoanSai {\npublic:\n    double soDu; // Nguy hiểm! Ai cũng sửa được\n};\n\n// 2. CÁCH LÀM ĐÚNG: Dùng private + Encapsulation\nclass TaiKhoanDung {\nprivate:\n    double soDu; // Chỉ nội bộ class mới thấy\n\npublic:\n    // Constructor: Khởi tạo giá trị ban đầu\n    TaiKhoanDung() {\n        soDu = 0.0;\n    }\n\n    // Setter: Kiểm soát việc thay đổi dữ liệu\n    void NapTien(double tien) {\n        if (tien > 0) {\n            soDu += tien;\n            cout << \"Da nap: \" << tien << endl;\n        } else {\n            cout << \"Loi: So tien nap phai duong!\" << endl;\n        }\n    }\n\n    // Getter: Chỉ cho phép xem, không cho sửa trực tiếp\n    double laySoDu() {\n        return soDu;\n    }\n};\n\nint main() {\n    // --- Test Class Sai ---\n    TaiKhoanSai tk1;\n    tk1.soDu = -1000000; // LỖI: Gán số âm vô lý nhưng chương trình vẫn chạy!\n    \n    // --- Test Class Đúng ---\n    TaiKhoanDung tk2;\n    // tk2.soDu = 100; // Lỗi biên dịch ngay lập tức (vì là private)\n    \n    tk2.NapTien(500000);   // Hợp lệ\n    tk2.NapTien(-200000);  // Bị chặn bởi logic trong Setter\n    \n    cout << \"So du hien tai: \" << tk2.laySoDu() << endl;\n    return 0;\n}",
    "explanation": ""
  },
  {
    "_id": "692b4178eaa2f83d2b966599",
    "lesson": "692b1bf0c5044e5f5eff746d",
    "language": "ruby",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "# 1. CÁCH LÀM SAI: Mở quyền truy cập thoải mái\nclass TaiKhoanSai\n  attr_accessor :so_du # Tự động tạo Getter & Setter public\nend\n\n# 2. CÁCH LÀM ĐÚNG\nclass TaiKhoanDung\n  def initialize\n    @so_du = 0.0 # Biến instance mặc định là private\n  end\n\n  def nap_tien(tien)\n    if tien > 0\n      @so_du += tien\n      puts \"Da nap: #{tien}\"\n    else\n      puts \"Loi: So tien nap phai duong!\"\n    end\n  end\n\n  # Getter thủ công (chỉ cho xem)\n  def so_du\n    @so_du\n  end\nend\n\n# --- Test ---\ntk1 = TaiKhoanSai.new\ntk1.so_du = -1000000 # Gán vô tư -> Lỗi logic\n\ntk2 = TaiKhoanDung.new\n# tk2.so_du = 100 # Lỗi NoMethodError vì không có setter\n\ntk2.nap_tien(500000)\nputs \"So du hien tai: #{tk2.so_du}\"",
    "explanation": ""
  },
  {
    "_id": "692c000ceaa2f83d2b96659b",
    "lesson": "692bb799a0a7add9d4493891",
    "language": "java",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "abstract class ThongBao {\n    abstract void guiDi();\n}\n\nclass SMS extends ThongBao {\n    private String noiDung;\n\n    public SMS(String noiDung) {\n        this.noiDung = noiDung;\n    }\n\n    @Override\n    void guiDi() {\n        if (noiDung.length() > 160) {\n            System.out.println(\"SMS vượt quá 160 ký tự!\");\n        } else {\n            System.out.println(\"Gửi SMS: \" + noiDung);\n        }\n    }\n}\n\nclass Email extends ThongBao {\n    private String tieuDe;\n    private String html;\n\n    public Email(String tieuDe, String html) {\n        this.tieuDe = tieuDe;\n        this.html = html;\n    }\n\n    @Override\n    void guiDi() {\n        System.out.println(\"Gửi Email\");\n        System.out.println(\"Tiêu đề: \" + tieuDe);\n        System.out.println(\"HTML: \" + html);\n    }\n}\n",
    "explanation": ""
  },
  {
    "_id": "692c0405eaa2f83d2b9665a1",
    "lesson": "692bb7dba0a7add9d4493892",
    "language": "cpp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "// Abstract Class\nclass DongVat {\npublic:\n    virtual void an() = 0;\n    int tuoi; // Có dữ liệu được\n};\n\n// Interface (Pure abstract)\nclass BoiDuoc {\npublic:\n    virtual void boi() = 0;\n};\n\n// Implement\nclass Cho : public DongVat, public BoiDuoc {\npublic:\n    void an() override {}\n    void boi() override {}\n};\n",
    "explanation": ""
  },
  {
    "_id": "692c0475eaa2f83d2b9665a5",
    "lesson": "692bb7dba0a7add9d4493892",
    "language": "php",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "<?php\n\n// Abstract Class\nabstract class DongVat {\n    public $tuoi; // Có biến\n    abstract public function an();\n}\n\n// Interface\ninterface BoiDuoc {\n    public function boi();\n}\n\nclass Cho extends DongVat implements BoiDuoc {\n    public function an() {}\n    public function boi() {}\n}\n",
    "explanation": ""
  },
  {
    "_id": "692ee036eaa2f83d2b966642",
    "lesson": "692edf71d34cc6910180d4e8",
    "language": "cpp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "#include <iostream>\nusing namespace std;\n\nclass SinhVien {\nprivate:\n    string ten;\n    int tuoi;\n    float diemTB;\n\npublic:\n    void nhap() {\n        cout << \"Nhap ten: \";\n        getline(cin, ten);\n        cout << \"Nhap tuoi: \";\n        cin >> tuoi;\n        cout << \"Nhap diem trung binh: \";\n        cin >> diemTB;\n    }\n\n    string xepLoai() {\n        if (diemTB >= 8) return \"A\";\n        if (diemTB >= 6.5) return \"B\";\n        if (diemTB >= 5) return \"C\";\n        return \"D\";\n    }\n\n    void hienThi() {\n        cout << \"Ten: \" << ten << endl;\n        cout << \"Tuoi: \" << tuoi << endl;\n        cout << \"Diem TB: \" << diemTB << endl;\n        cout << \"Xep loai: \" << xepLoai() << endl;\n    }\n};",
    "explanation": ""
  },
  {
    "_id": "692ee05aeaa2f83d2b966644",
    "lesson": "692edf71d34cc6910180d4e8",
    "language": "csharp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "using System;\n\nclass SinhVien {\n    public string Ten;\n    public int Tuoi;\n    public double DiemTB;\n\n    public void Nhap() {\n        Console.Write(\"Nhap ten: \");\n        Ten = Console.ReadLine();\n        Console.Write(\"Nhap tuoi: \");\n        Tuoi = int.Parse(Console.ReadLine());\n        Console.Write(\"Nhap diem trung binh: \");\n        DiemTB = double.Parse(Console.ReadLine());\n    }\n\n    public string XepLoai() {\n        if (DiemTB >= 8) return \"A\";\n        if (DiemTB >= 6.5) return \"B\";\n        if (DiemTB >= 5) return \"C\";\n        return \"D\";\n    }\n\n    public void HienThi() {\n        Console.WriteLine($\"Ten: {Ten}\");\n        Console.WriteLine($\"Tuoi: {Tuoi}\");\n        Console.WriteLine($\"Diem TB: {DiemTB}\");\n        Console.WriteLine($\"Xep loai: {XepLoai()}\");\n    }\n}",
    "explanation": ""
  },
  {
    "_id": "692ee06deaa2f83d2b966646",
    "lesson": "692edf71d34cc6910180d4e8",
    "language": "ruby",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class SinhVien\n  attr_accessor :ten, :tuoi, :diemTB\n\n  def nhap\n    print \"Nhap ten: \"\n    @ten = gets.chomp\n    print \"Nhap tuoi: \"\n    @tuoi = gets.to_i\n    print \"Nhap diem trung binh: \"\n    @diemTB = gets.to_f\n  end\n\n  def xep_loai\n    return \"A\" if @diemTB >= 8\n    return \"B\" if @diemTB >= 6.5\n    return \"C\" if @diemTB >= 5\n    \"D\"\n  end\n\n  def hien_thi\n    puts \"Ten: #{@ten}\"\n    puts \"Tuoi: #{@tuoi}\"\n    puts \"Diem TB: #{@diemTB}\"\n    puts \"Xep loai: #{xep_loai}\"\n  end\nend",
    "explanation": ""
  },
  {
    "_id": "692ee344eaa2f83d2b966656",
    "lesson": "692ee235d34cc6910180d667",
    "language": "csharp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class DongVat {\n    public virtual void PhatTiengKeu() {\n        Console.WriteLine(\"Động vật phát tiếng kêu...\");\n    }\n}\n\nclass Cho : DongVat {\n    public override void PhatTiengKeu() {\n        Console.WriteLine(\"Gâu gâu!\");\n    }\n}\n\nclass Meo : DongVat {\n    public override void PhatTiengKeu() {\n        Console.WriteLine(\"Meow meow!\");\n    }\n}\n\nclass Program {\n    static void Main() {\n        DongVat dv1 = new Cho();\n        DongVat dv2 = new Meo();\n\n        dv1.PhatTiengKeu();\n        dv2.PhatTiengKeu();\n    }\n}",
    "explanation": ""
  },
  {
    "_id": "692ee375eaa2f83d2b966658",
    "lesson": "692ee235d34cc6910180d667",
    "language": "dart",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class DongVat {\n  void phatTiengKeu() {\n    print(\"Động vật phát tiếng kêu...\");\n  }\n}\n\nclass Cho extends DongVat {\n  @override\n  void phatTiengKeu() {\n    print(\"Gâu gâu!\");\n  }\n}\n\nclass Meo extends DongVat {\n  @override\n  void phatTiengKeu() {\n    print(\"Meow meow!\");\n  }\n}\n\nvoid main() {\n  DongVat dv1 = Cho();\n  DongVat dv2 = Meo();\n\n  dv1.phatTiengKeu();\n  dv2.phatTiengKeu();\n}",
    "explanation": ""
  },
  {
    "_id": "692ee38deaa2f83d2b96665a",
    "lesson": "692ee23fd34cc6910180d66d",
    "language": "java",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "abstract class HinhHoc {\n    abstract double tinhDienTich();\n}\n\nclass HinhVuong extends HinhHoc {\n    double canh;\n\n    HinhVuong(double canh) {\n        this.canh = canh;\n    }\n\n    double tinhDienTich() {\n        return canh * canh;\n    }\n}\n\nclass HinhTron extends HinhHoc {\n    double banKinh;\n\n    HinhTron(double r) {\n        this.banKinh = r;\n    }\n\n    double tinhDienTich() {\n        return Math.PI * banKinh * banKinh;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        HinhHoc hv = new HinhVuong(5);\n        HinhHoc ht = new HinhTron(3);\n\n        System.out.println(\"Diện tích hình vuông: \" + hv.tinhDienTich());\n        System.out.println(\"Diện tích hình tròn: \" + ht.tinhDienTich());\n    }\n}",
    "explanation": ""
  },
  {
    "_id": "692ee395eaa2f83d2b96665b",
    "lesson": "692ee23fd34cc6910180d66d",
    "language": "cpp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "#include <iostream>\n#include <cmath>\nusing namespace std;\n\nclass HinhHoc {\npublic:\n    virtual double tinhDienTich() = 0;\n};\n\nclass HinhVuong : public HinhHoc {\n    double canh;\npublic:\n    HinhVuong(double c) : canh(c) {}\n    double tinhDienTich() { return canh * canh; }\n};\n\nclass HinhTron : public HinhHoc {\n    double r;\npublic:\n    HinhTron(double r) : r(r) {}\n    double tinhDienTich() { return 3.14159 * r * r; }\n};\n\nint main() {\n    HinhHoc* hv = new HinhVuong(5);\n    HinhHoc* ht = new HinhTron(3);\n\n    cout << \"Diện tích hình vuông: \" << hv->tinhDienTich() << endl;\n    cout << \"Diện tích hình tròn: \" << ht->tinhDienTich() << endl;\n}",
    "explanation": ""
  },
  {
    "_id": "692ee39deaa2f83d2b96665c",
    "lesson": "692ee23fd34cc6910180d66d",
    "language": "csharp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "abstract class HinhHoc {\n    public abstract double TinhDienTich();\n}\n\nclass HinhVuong : HinhHoc {\n    double canh;\n    public HinhVuong(double c) { canh = c; }\n    public override double TinhDienTich() => canh * canh;\n}\n\nclass HinhTron : HinhHoc {\n    double r;\n    public HinhTron(double r) { this.r = r; }\n    public override double TinhDienTich() => Math.PI * r * r;\n}\n\nclass Program {\n    static void Main() {\n        HinhHoc hv = new HinhVuong(5);\n        HinhHoc ht = new HinhTron(3);\n\n        Console.WriteLine(\"Diện tích hình vuông: \" + hv.TinhDienTich());\n        Console.WriteLine(\"Diện tích hình tròn: \" + ht.TinhDienTich());\n    }\n}",
    "explanation": ""
  },
  {
    "_id": "692ee3abeaa2f83d2b96665d",
    "lesson": "692ee23fd34cc6910180d66d",
    "language": "ruby",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class HinhHoc\n  def tinh_dien_tich\n    raise \"Phải override phương thức này!\"\n  end\nend\n\nclass HinhVuong < HinhHoc\n  def initialize(canh)\n    @canh = canh\n  end\n\n  def tinh_dien_tich\n    @canh * @canh\n  end\nend\n\nclass HinhTron < HinhHoc\n  def initialize(r)\n    @r = r\n  end\n\n  def tinh_dien_tich\n    Math::PI * @r * @r\n  end\nend\n\nhv = HinhVuong.new(5)\nht = HinhTron.new(3)\n\nputs \"Diện tích hình vuông: #{hv.tinh_dien_tich}\"\nputs \"Diện tích hình tròn: #{ht.tinh_dien_tich}\"",
    "explanation": ""
  },
  {
    "_id": "692ee48aeaa2f83d2b966663",
    "lesson": "692ee24bd34cc6910180d673",
    "language": "ruby",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class NhanVien\n  attr_accessor :ten, :luong\n  def initialize(ten, luong)\n    @ten = ten\n    @luong = luong\n  end\n  def tinh_thu_nhap\n    raise \"Phải override phương thức này!\"\n  end\nend\n\nclass NhanVienFullTime < NhanVien\n  def initialize(ten, luong, thuong)\n    super(ten, luong)\n    @thuong = thuong\n  end\n  def tinh_thu_nhap\n    @luong + @thuong\n  end\nend\n\nclass NhanVienPartTime < NhanVien\n  def initialize(ten, so_gio, luong_gio)\n    super(ten,0)\n    @so_gio = so_gio\n    @luong_gio = luong_gio\n  end\n  def tinh_thu_nhap\n    @so_gio * @luong_gio\n  end\nend\n\nnv1 = NhanVienFullTime.new(\"An\", 1000, 200)\nnv2 = NhanVienPartTime.new(\"Binh\", 30, 50)\n\nputs \"#{nv1.ten} thu nhập: #{nv1.tinh_thu_nhap}\"\nputs \"#{nv2.ten} thu nhập: #{nv2.tinh_thu_nhap}\"",
    "explanation": ""
  },
  {
    "_id": "692ae7577fdaad24a2aec506",
    "lesson": "692ae7577fdaad24a2aec504",
    "language": "cpp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class Dog : public Animal { ... };",
    "explanation": "C++ dùng dấu hai chấm :"
  },
  {
    "_id": "692ae7577fdaad24a2aec508",
    "lesson": "692ae7577fdaad24a2aec504",
    "language": "java",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class Dog extends Animal { ... }",
    "explanation": "Java dùng từ khóa extends"
  },
  {
    "_id": "692b071deaa2f83d2b966581",
    "lesson": "692ae7577fdaad24a2aec50c",
    "language": "php",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "<?php\n\n// Interface trừu tượng\ninterface Shape {\n    public function calculateArea();  // Phương thức trừu tượng\n}\n\n// Lớp triển khai cụ thể\nclass Circle implements Shape {\n    private $radius;\n\n    public function __construct($radius) {\n        $this->radius = $radius;\n    }\n\n    public function calculateArea() {\n        return pi() * $this->radius * $this->radius;  // Triển khai cụ thể\n    }\n}\n\n// Sử dụng\n$circle = new Circle(5);  // Trừu tượng: Sử dụng qua interface Shape\necho \"Diện tích: \" . $circle->calculateArea();  // Kết quả: ~78.54\n?>",
    "explanation": "Shape định nghĩa \"tính diện tích\" nhưng không chỉ rõ cách tính. Circle triển khai cụ thể nhưng người dùng chỉ tượng tác qua Shape bỏ qua chi tiết."
  },
  {
    "_id": "692c0032eaa2f83d2b96659d",
    "lesson": "692bb799a0a7add9d4493891",
    "language": "ruby",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class ThongBao\n  def gui_di\n    raise NotImplementedError, \"Phải override gui_di\"\n  end\nend\n\nclass SMS < ThongBao\n  def initialize(noi_dung)\n    @noi_dung = noi_dung\n  end\n\n  def gui_di\n    if @noi_dung.length > 160\n      puts \"SMS vượt 160 ký tự!\"\n    else\n      puts \"Gửi SMS: #{@noi_dung}\"\n    end\n  end\nend\n\nclass Email < ThongBao\n  def initialize(tieu_de, html)\n    @tieu_de = tieu_de\n    @html = html\n  end\n\n  def gui_di\n    puts \"Gửi Email\"\n    puts \"Tiêu đề: #{@tieu_de}\"\n    puts \"HTML: #{@html}\"\n  end\nend\n",
    "explanation": ""
  },
  {
    "_id": "692c006feaa2f83d2b96659f",
    "lesson": "692bb799a0a7add9d4493891",
    "language": "php",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "<?php\n\nabstract class ThongBao {\n    abstract public function guiDi();\n}\n\nclass SMS extends ThongBao {\n    private $noiDung;\n\n    public function __construct($nd) {\n        $this->noiDung = $nd;\n    }\n\n    public function guiDi() {\n        if (strlen($this->noiDung) > 160)\n            echo \"SMS vượt 160 ký tự!\\n\";\n        else\n            echo \"Gửi SMS: {$this->noiDung}\\n\";\n    }\n}\n\nclass Email extends ThongBao {\n    private $tieuDe;\n    private $html;\n\n    public function __construct($td, $h) {\n        $this->tieuDe = $td;\n        $this->html = $h;\n    }\n\n    public function guiDi() {\n        echo \"Gửi Email\\n\";\n        echo \"Tiêu đề: {$this->tieuDe}\\n\";\n        echo \"HTML: {$this->html}\\n\";\n    }\n}\n",
    "explanation": ""
  },
  {
    "_id": "692c0437eaa2f83d2b9665a2",
    "lesson": "692bb7dba0a7add9d4493892",
    "language": "csharp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "// Abstract Class\nabstract class DongVat {\n    public int tuoi; // Có biến\n    public abstract void An();\n}\n\n// Interface\ninterface IBoiDuoc {\n    void Boi();\n}\n\nclass Cho : DongVat, IBoiDuoc {\n    public override void An() {}\n    public void Boi() {}\n}\n",
    "explanation": ""
  },
  {
    "_id": "692c0461eaa2f83d2b9665a4",
    "lesson": "692bb7dba0a7add9d4493892",
    "language": "dart",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "// Abstract Class\nabstract class DongVat {\n  int tuoi = 0; // Có biến\n  void an();\n}\n\n// Interface (Dart: mọi class đều là interface)\nabstract class BoiDuoc {\n  void boi();\n}\n\nclass Cho implements DongVat, BoiDuoc {\n  int tuoi = 0;\n\n  @override\n  void an() {}\n\n  @override\n  void boi() {}\n}\n",
    "explanation": ""
  },
  {
    "_id": "692ee040eaa2f83d2b966643",
    "lesson": "692edf71d34cc6910180d4e8",
    "language": "java",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "import java.util.Scanner;\n\nclass SinhVien {\n    String ten;\n    int tuoi;\n    double diemTB;\n\n    void nhap() {\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"Nhap ten: \");\n        ten = sc.nextLine();\n        System.out.print(\"Nhap tuoi: \");\n        tuoi = sc.nextInt();\n        System.out.print(\"Nhap diem trung binh: \");\n        diemTB = sc.nextDouble();\n    }\n\n    void hienThi() {\n        System.out.println(\"Ten: \" + ten);\n        System.out.println(\"Tuoi: \" + tuoi);\n        System.out.println(\"Diem TB: \" + diemTB);\n        System.out.println(\"Xep loai: \" + xepLoai());\n    }\n\n    String xepLoai() {\n        if (diemTB >= 8) return \"A\";\n        if (diemTB >= 6.5) return \"B\";\n        if (diemTB >= 5) return \"C\";\n        return \"D\";\n    }\n}",
    "explanation": ""
  },
  {
    "_id": "692ee064eaa2f83d2b966645",
    "lesson": "692edf71d34cc6910180d4e8",
    "language": "php",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "<?php\nclass SinhVien {\n    public $ten;\n    public $tuoi;\n    public $diemTB;\n\n    function nhap($ten, $tuoi, $diem) {\n        $this->ten = $ten;\n        $this->tuoi = $tuoi;\n        $this->diemTB = $diem;\n    }\n\n    function xepLoai() {\n        if ($this->diemTB >= 8) return \"A\";\n        if ($this->diemTB >= 6.5) return \"B\";\n        if ($this->diemTB >= 5) return \"C\";\n        return \"D\";\n    }\n\n    function hienThi() {\n        echo \"Ten: $this->ten<br>\";\n        echo \"Tuoi: $this->tuoi<br>\";\n        echo \"Diem TB: $this->diemTB<br>\";\n        echo \"Xep loai: \" . $this->xepLoai();\n    }\n}\n?>",
    "explanation": ""
  },
  {
    "_id": "692ee0dbeaa2f83d2b96664b",
    "lesson": "692edfe7d34cc6910180d52c",
    "language": "csharp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class HinhChuNhat {\n    public double Dai, Rong;\n\n    public HinhChuNhat(double dai, double rong) {\n        Dai = dai;\n        Rong = rong;\n    }\n\n    public double DienTich() => Dai * Rong;\n    public double ChuVi() => (Dai + Rong) * 2;\n\n    public void HienThi() {\n        Console.WriteLine($\"Dài: {Dai}\");\n        Console.WriteLine($\"Rộng: {Rong}\");\n        Console.WriteLine($\"Diện tích: {DienTich()}\");\n        Console.WriteLine($\"Chu vi: {ChuVi()}\\n\");\n    }\n}\n\nclass Program {\n    static void Main() {\n        HinhChuNhat h1 = new HinhChuNhat(5, 3);\n        HinhChuNhat h2 = new HinhChuNhat(9, 4);\n        h1.HienThi();\n        h2.HienThi();\n    }\n}",
    "explanation": ""
  },
  {
    "_id": "692ee1e9eaa2f83d2b966650",
    "lesson": "692edff1d34cc6910180d532",
    "language": "csharp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class NguyenLieu {\n    public string Ten;\n    public double SoLuong;\n    public string DonVi;\n\n    public NguyenLieu(string ten, double sl, string dv) {\n        Ten = ten;\n        SoLuong = sl;\n        DonVi = dv;\n    }\n\n    public void HienThi() {\n        Console.WriteLine($\"{Ten}: {SoLuong} {DonVi}\");\n    }\n\n    public void CapNhat(double slMoi) {\n        SoLuong = slMoi;\n    }\n}\n\nclass Program {\n    static void Main() {\n        var nl1 = new NguyenLieu(\"Sữa\", 1, \"lít\");\n        var nl2 = new NguyenLieu(\"Bơ\", 200, \"gram\");\n\n        nl1.HienThi();\n        nl2.HienThi();\n\n        nl1.CapNhat(2);\n        nl2.CapNhat(180);\n\n        Console.WriteLine(\"Sau khi cập nhật:\");\n        nl1.HienThi();\n        nl2.HienThi();\n    }\n}",
    "explanation": ""
  },
  {
    "_id": "692ee1fdeaa2f83d2b966651",
    "lesson": "692edff1d34cc6910180d532",
    "language": "ruby",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class NguyenLieu\n  def initialize(ten, so_luong, don_vi)\n    @ten = ten\n    @so_luong = so_luong\n    @don_vi = don_vi\n  end\n\n  def hien_thi\n    puts \"#{@ten}: #{@so_luong} #{@don_vi}\"\n  end\n\n  def cap_nhat(sl_moi)\n    @so_luong = sl_moi\n  end\nend\n\nnl1 = NguyenLieu.new(\"Trứng\", 4, \"quả\")\nnl2 = NguyenLieu.new(\"Bột mì\", 500, \"gram\")\n\nnl1.hien_thi\nnl2.hien_thi\n\nnl1.cap_nhat(6)\nnl2.cap_nhat(450)\n\nputs \"Sau khi cập nhật:\"\nnl1.hien_thi\nnl2.hien_thi",
    "explanation": ""
  },
  {
    "_id": "692ee31beaa2f83d2b966654",
    "lesson": "692ee235d34cc6910180d667",
    "language": "java",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class DongVat {\n    void phatTiengKeu() {\n        System.out.println(\"Động vật phát ra tiếng kêu...\");\n    }\n}\n\nclass Cho extends DongVat {\n    @Override\n    void phatTiengKeu() {\n        System.out.println(\"Gâu gâu!\");\n    }\n}\n\nclass Meo extends DongVat {\n    @Override\n    void phatTiengKeu() {\n        System.out.println(\"Meow meow!\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        DongVat dv1 = new Cho();\n        DongVat dv2 = new Meo();\n\n        dv1.phatTiengKeu();\n        dv2.phatTiengKeu();\n    }\n}",
    "explanation": ""
  },
  {
    "_id": "692ee34beaa2f83d2b966657",
    "lesson": "692ee235d34cc6910180d667",
    "language": "ruby",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class DongVat\n  def phat_tieng_keu\n    puts \"Động vật phát tiếng kêu...\"\n  end\nend\n\nclass Cho < DongVat\n  def phat_tieng_keu\n    puts \"Gâu gâu!\"\n  end\nend\n\nclass Meo < DongVat\n  def phat_tieng_keu\n    puts \"Meow meow!\"\n  end\nend\n\ndv1 = Cho.new\ndv2 = Meo.new\n\ndv1.phat_tieng_keu\ndv2.phat_tieng_keu",
    "explanation": ""
  },
  {
    "_id": "692ee3b3eaa2f83d2b96665e",
    "lesson": "692ee23fd34cc6910180d66d",
    "language": "dart",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "abstract class HinhHoc {\n  double tinhDienTich();\n}\n\nclass HinhVuong extends HinhHoc {\n  double canh;\n  HinhVuong(this.canh);\n\n  @override\n  double tinhDienTich() => canh * canh;\n}\n\nclass HinhTron extends HinhHoc {\n  double r;\n  HinhTron(this.r);\n\n  @override\n  double tinhDienTich() => 3.14159 * r * r;\n}\n\nvoid main() {\n  HinhHoc hv = HinhVuong(5);\n  HinhHoc ht = HinhTron(3);\n\n  print(\"Diện tích hình vuông: ${hv.tinhDienTich()}\");\n  print(\"Diện tích hình tròn: ${ht.tinhDienTich()}\");\n}",
    "explanation": ""
  },
  {
    "_id": "692ee481eaa2f83d2b966662",
    "lesson": "692ee24bd34cc6910180d673",
    "language": "csharp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "abstract class NhanVien {\n    public string Ten;\n    public double Luong;\n    public NhanVien(string ten, double luong) {\n        Ten = ten; Luong = luong;\n    }\n    public abstract double TinhThuNhap();\n}\n\nclass NhanVienFullTime : NhanVien {\n    public double Thuong;\n    public NhanVienFullTime(string ten, double luong, double thuong) : base(ten, luong) {\n        Thuong = thuong;\n    }\n    public override double TinhThuNhap() => Luong + Thuong;\n}\n\nclass NhanVienPartTime : NhanVien {\n    public double SoGio, LuongGio;\n    public NhanVienPartTime(string ten, double soGio, double luongGio) : base(ten,0) {\n        SoGio = soGio; LuongGio = luongGio;\n    }\n    public override double TinhThuNhap() => SoGio * LuongGio;\n}\n\nclass Program {\n    static void Main() {\n        NhanVien nv1 = new NhanVienFullTime(\"An\", 1000, 200);\n        NhanVien nv2 = new NhanVienPartTime(\"Binh\", 30, 50);\n\n        Console.WriteLine($\"{nv1.Ten} thu nhập: {nv1.TinhThuNhap()}\");\n        Console.WriteLine($\"{nv2.Ten} thu nhập: {nv2.TinhThuNhap()}\");\n    }\n}",
    "explanation": ""
  },
  {
    "_id": "692b0712eaa2f83d2b966580",
    "lesson": "692ae7577fdaad24a2aec50c",
    "language": "ruby",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "# Module trừu tượng (tương tự interface)\nmodule Shape\n  def calculate_area\n    raise NotImplementedError, \"Phương thức calculate_area phải được triển khai\"\n  end\nend\n\n// Lớp triển khai cụ thể\nclass Circle\n  include Shape\n\n  def initialize(radius)\n    @radius = radius\n  end\n\n  def calculate_area\n    Math::PI * @radius * @radius  # Triển khai cụ thể\n  end\nend\n\n// Sử dụng\ncircle = Circle.new(5)  # Trừu tượng: Sử dụng qua module Shape\nputs \"Diện tích: #{circle.calculate_area}\"  # Kết quả: ~78.54",
    "explanation": "Shape định nghĩa \"tính diện tích\" nhưng không chỉ rõ cách tính. Circle triển khai cụ thể nhưng người dùng chỉ tượng tác qua Shape bỏ qua chi tiết."
  },
  {
    "_id": "692c002aeaa2f83d2b96659c",
    "lesson": "692bb799a0a7add9d4493891",
    "language": "csharp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "abstract class ThongBao\n{\n    public abstract void GuiDi();\n}\n\nclass SMS : ThongBao\n{\n    private string noiDung;\n\n    public SMS(string nd)\n    {\n        noiDung = nd;\n    }\n\n    public override void GuiDi()\n    {\n        if (noiDung.Length > 160)\n            Console.WriteLine(\"SMS vượt 160 ký tự!\");\n        else\n            Console.WriteLine(\"Gửi SMS: \" + noiDung);\n    }\n}\n\nclass Email : ThongBao\n{\n    private string tieuDe;\n    private string html;\n\n    public Email(string td, string h)\n    {\n        tieuDe = td;\n        html = h;\n    }\n\n    public override void GuiDi()\n    {\n        Console.WriteLine(\"Gửi Email\");\n        Console.WriteLine(\"Tiêu đề: \" + tieuDe);\n        Console.WriteLine(\"HTML: \" + html);\n    }\n}\n",
    "explanation": ""
  },
  {
    "_id": "692c003beaa2f83d2b96659e",
    "lesson": "692bb799a0a7add9d4493891",
    "language": "dart",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "abstract class ThongBao {\n  void guiDi();\n}\n\nclass SMS extends ThongBao {\n  String noiDung;\n\n  SMS(this.noiDung);\n\n  @override\n  void guiDi() {\n    if (noiDung.length > 160) {\n      print(\"SMS vượt 160 ký tự!\");\n    } else {\n      print(\"Gửi SMS: $noiDung\");\n    }\n  }\n}\n\nclass Email extends ThongBao {\n  String tieuDe;\n  String html;\n\n  Email(this.tieuDe, this.html);\n\n  @override\n  void guiDi() {\n    print(\"Gửi Email\");\n    print(\"Tiêu đề: $tieuDe\");\n    print(\"HTML: $html\");\n  }\n}\n",
    "explanation": ""
  },
  {
    "_id": "692c0093eaa2f83d2b9665a0",
    "lesson": "692bb799a0a7add9d4493891",
    "language": "cpp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "#include <iostream>\n#include <string>\nusing namespace std;\nclass ThongBao {\npublic:\n    virtual void guiDi() = 0;\n};\n\nclass SMS : public ThongBao {\nprivate:\n    string noiDung;\npublic:\n    SMS(const string& nd) : noiDung(nd) {}\n\n    void guiDi() override {\n        if (noiDung.size() > 160)\n            cout << \"SMS vượt 160 ký tự!\\n\";\n        else\n            cout << \"Gửi SMS: \" << noiDung << \"\\n\";\n    }\n};\n\nclass Email : public ThongBao {\nprivate:\n    string tieuDe;\n    string html;\npublic:\n    Email(const string& td, const string& h) : tieuDe(td), html(h) {}\n\n    void guiDi() override {\n        cout << \"Gửi Email\\nTiêu đề: \" << tieuDe << \"\\nHTML: \" << html << \"\\n\";\n    }\n};\n",
    "explanation": ""
  },
  {
    "_id": "692c047feaa2f83d2b9665a6",
    "lesson": "692bb7dba0a7add9d4493892",
    "language": "java",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "abstract class DongVat {\n    int tuoi; // Có dữ liệu\n    abstract void an();\n}\n\ninterface BoiDuoc {\n    void boi();\n}\n\nclass Cho extends DongVat implements BoiDuoc {\n    @Override void an() {}\n    @Override public void boi() {}\n}\n",
    "explanation": ""
  },
  {
    "_id": "692ee076eaa2f83d2b966647",
    "lesson": "692edf71d34cc6910180d4e8",
    "language": "dart",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class SinhVien {\n  String ten = \"\";\n  int tuoi = 0;\n  double diemTB = 0;\n\n  void nhap(String t, int age, double diem) {\n    ten = t;\n    tuoi = age;\n    diemTB = diem;\n  }\n\n  String xepLoai() {\n    if (diemTB >= 8) return \"A\";\n    if (diemTB >= 6.5) return \"B\";\n    if (diemTB >= 5) return \"C\";\n    return \"D\";\n  }\n\n  void hienThi() {\n    print(\"Ten: $ten\");\n    print(\"Tuoi: $tuoi\");\n    print(\"Diem TB: $diemTB\");\n    print(\"Xep loai: ${xepLoai()}\");\n  }\n}",
    "explanation": ""
  },
  {
    "_id": "692ee0caeaa2f83d2b966649",
    "lesson": "692edfe7d34cc6910180d52c",
    "language": "ruby",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "class HinhChuNhat\n    def initialize(dai, rong)\n        @dai = dai\n        @rong = rong\n    end\n\n    def dien_tich\n        @dai * @rong\n    end\n\n    def chu_vi\n        (@dai + @rong) * 2\n    end\n\n    def hien_thi\n        puts \"Dài: #{@dai}\"\n        puts \"Rộng: #{@rong}\"\n        puts \"Diện tích: #{dien_tich}\"\n        puts \"Chu vi: #{chu_vi}\\n\\n\"\n    end\nend\n\nh1 = HinhChuNhat.new(5, 3)\nh2 = HinhChuNhat.new(10, 4)\nh1.hien_thi\nh2.hien_thi",
    "explanation": ""
  },
  {
    "_id": "692ee1ddeaa2f83d2b96664f",
    "lesson": "692edff1d34cc6910180d532",
    "language": "cpp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "#include <iostream>\nusing namespace std;\n\nclass NguyenLieu {\nprivate:\n    string ten;\n    double soLuong;\n    string donVi;\n\npublic:\n    NguyenLieu(string t, double sl, string dv)\n        : ten(t), soLuong(sl), donVi(dv) {}\n\n    void hienThi() {\n        cout << ten << \": \" << soLuong << \" \" << donVi << endl;\n    }\n\n    void capNhat(double slMoi) {\n        soLuong = slMoi;\n    }\n};\n\nint main() {\n    NguyenLieu nl1(\"Muối\", 1, \"muỗng\");\n    NguyenLieu nl2(\"Đường\", 200, \"gram\");\n\n    nl1.hienThi();\n    nl2.hienThi();\n\n    nl1.capNhat(2);\n    nl2.capNhat(150);\n\n    cout << \"Sau khi cập nhật:\" << endl;\n    nl1.hienThi();\n    nl2.hienThi();\n}",
    "explanation": ""
  },
  {
    "_id": "692ee37deaa2f83d2b966659",
    "lesson": "692ee235d34cc6910180d667",
    "language": "php",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "<?php\nclass DongVat {\n    function phatTiengKeu() {\n        echo \"Động vật phát tiếng kêu...<br>\";\n    }\n}\n\nclass Cho extends DongVat {\n    function phatTiengKeu() {\n        echo \"Gâu gâu!<br>\";\n    }\n}\n\nclass Meo extends DongVat {\n    function phatTiengKeu() {\n        echo \"Meow meow!<br>\";\n    }\n}\n\n$dv1 = new Cho();\n$dv2 = new Meo();\n\n$dv1->phatTiengKeu();\n$dv2->phatTiengKeu();",
    "explanation": ""
  },
  {
    "_id": "692ee46feaa2f83d2b966660",
    "lesson": "692ee24bd34cc6910180d673",
    "language": "java",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "abstract class NhanVien {\n    String ten;\n    double luong;\n\n    NhanVien(String ten, double luong) {\n        this.ten = ten;\n        this.luong = luong;\n    }\n\n    abstract double tinhThuNhap();\n}\n\nclass NhanVienFullTime extends NhanVien {\n    double thuong;\n\n    NhanVienFullTime(String ten, double luong, double thuong) {\n        super(ten, luong);\n        this.thuong = thuong;\n    }\n\n    @Override\n    double tinhThuNhap() {\n        return luong + thuong;\n    }\n}\n\nclass NhanVienPartTime extends NhanVien {\n    double soGio;\n    double luongGio;\n\n    NhanVienPartTime(String ten, double soGio, double luongGio) {\n        super(ten, 0);\n        this.soGio = soGio;\n        this.luongGio = luongGio;\n    }\n\n    @Override\n    double tinhThuNhap() {\n        return soGio * luongGio;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        NhanVien nv1 = new NhanVienFullTime(\"An\", 1000, 200);\n        NhanVien nv2 = new NhanVienPartTime(\"Binh\", 0, 50);\n        ((NhanVienPartTime) nv2).soGio = 30;\n\n        System.out.println(nv1.ten + \" thu nhập: \" + nv1.tinhThuNhap());\n        System.out.println(nv2.ten + \" thu nhập: \" + nv2.tinhThuNhap());\n    }\n}",
    "explanation": ""
  },
  {
    "_id": "692ee478eaa2f83d2b966661",
    "lesson": "692ee24bd34cc6910180d673",
    "language": "cpp",
    "is_supported": true,
    "syntax_note": "",
    "code_content": "#include <iostream>\nusing namespace std;\n\nclass NhanVien {\npublic:\n    string ten;\n    double luong;\n    NhanVien(string t, double l) : ten(t), luong(l) {}\n    virtual double tinhThuNhap() = 0;\n};\n\nclass NhanVienFullTime : public NhanVien {\n    double thuong;\npublic:\n    NhanVienFullTime(string t, double l, double th) : NhanVien(t,l), thuong(th) {}\n    double tinhThuNhap() override { return luong + thuong; }\n};\n\nclass NhanVienPartTime : public NhanVien {\n    double soGio;\n    double luongGio;\npublic:\n    NhanVienPartTime(string t, double sg, double lg) : NhanVien(t,0), soGio(sg), luongGio(lg) {}\n    double tinhThuNhap() override { return soGio * luongGio; }\n};\n\nint main() {\n    NhanVien* nv1 = new NhanVienFullTime(\"An\", 1000, 200);\n    NhanVien* nv2 = new NhanVienPartTime(\"Binh\", 30, 50);\n\n    cout << nv1->ten << \" thu nhập: \" << nv1->tinhThuNhap() << endl;\n    cout << nv2->ten << \" thu nhập: \" << nv2->tinhThuNhap() << endl;\n}",
    "explanation": ""
  },
  {
    "_id": "69393820eaa2f83d2b96679e",
    "lesson": "69391be869385c5a72167b5e",
    "language": "cpp",
    "code_content": "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass SinhVien {\npublic:\n    // 1. Thuộc tính\n    string ten;\n    int tuoi;\n\n    // 2. Constructor\n    SinhVien(string t, int a) {\n        ten = t;\n        tuoi = a;\n    }\n\n    // 3. Phương thức\n    void diHoc() {\n        cout << ten << \" (\" << tuoi << \" tuoi) dang di hoc...\" << endl;\n    }\n};\n\n// 4. Main function\nint main() {\n    SinhVien sv1(\"Nguyen Van A\", 20);\n    sv1.diHoc();\n    return 0;\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69393835eaa2f83d2b96679f",
    "language": "java",
    "lesson": "69391be869385c5a72167b5e",
    "code_content": "public class SinhVien {\n    // 1. Thuộc tính\n    public String ten;\n    public int tuoi;\n\n    // 2. Constructor\n    public SinhVien(String ten, int tuoi) {\n        this.ten = ten;\n        this.tuoi = tuoi;\n    }\n\n    // 3. Phương thức\n    public void diHoc() {\n        System.out.println(this.ten + \" (\" + this.tuoi + \" tuổi) đang đi học...\");\n    }\n\n    // 4. Main function\n    public static void main(String[] args) {\n        SinhVien sv1 = new SinhVien(\"Nguyen Van A\", 20);\n        sv1.diHoc();\n    }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "6939383eeaa2f83d2b9667a0",
    "language": "csharp",
    "lesson": "69391be869385c5a72167b5e",
    "code_content": "using System;\n\npublic class SinhVien {\n    // 1. Thuộc tính\n    public string Ten;\n    public int Tuoi;\n\n    // 2. Constructor\n    public SinhVien(string ten, int tuoi) {\n        this.Ten = ten;\n        this.Tuoi = tuoi;\n    }\n\n    // 3. Phương thức\n    public void DiHoc() {\n        Console.WriteLine($\"{this.Ten} ({this.Tuoi} tuổi) đang đi học...\");\n    }\n\n    // 4. Main function\n    public static void Main(string[] args) {\n        SinhVien sv1 = new SinhVien(\"Nguyen Van A\", 20);\n        sv1.DiHoc();\n    }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69393846eaa2f83d2b9667a1",
    "lesson": "69391be869385c5a72167b5e",
    "language": "dart",
    "code_content": "class SinhVien {\n  // 1. Thuộc tính\n  String ten;\n  int tuoi;\n\n  // 2. Constructor (Viết tắt)\n  SinhVien(this.ten, this.tuoi);\n\n  // 3. Phương thức\n  void diHoc() {\n    print('$ten ($tuoi tuổi) đang đi học...');\n  }\n}\n\n// 4. Main function\nvoid main() {\n  var sv1 = SinhVien('Nguyen Van A', 20);\n  sv1.diHoc();\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "6939384feaa2f83d2b9667a2",
    "language": "ruby",
    "lesson": "69391be869385c5a72167b5e",
    "code_content": "class SinhVien\n  # 1. Constructor (initialize) và Thuộc tính (@)\n  def initialize(ten, tuoi)\n    @ten = ten\n    @tuoi = tuoi\n  end\n\n  # 2. Phương thức\n  def di_hoc\n    puts \"#{@ten} (#{@tuoi} tuổi) đang đi học...\"\n  end\nend\n\n# 3. Main execution\nsv1 = SinhVien.new(\"Nguyen Van A\", 20)\nsv1.di_hoc",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69393858eaa2f83d2b9667a3",
    "language": "php",
    "lesson": "69391be869385c5a72167b5e",
    "code_content": "<?php\nclass SinhVien {\n    // 1. Thuộc tính\n    public $ten;\n    public $tuoi;\n\n    // 2. Constructor\n    public function __construct($ten, $tuoi) {\n        $this->ten = $ten;\n        $this->tuoi = $tuoi;\n    }\n\n    // 3. Phương thức\n    public function diHoc() {\n        echo \"$this->ten ($this->tuoi tuổi) đang đi học...\\n\";\n    }\n}\n\n// 4. Main execution\n$sv1 = new SinhVien(\"Nguyen Van A\", 20);\n$sv1->diHoc();\n?>",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399bd9eaa2f83d2b9667cc",
    "language": "cpp",
    "lesson": "69399b7fcb8bff399ebd73c6",
    "code_content": "#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\n// 1. Abstract Base Class\nclass SmartDevice {\nprotected:\n    string deviceID;\n    string deviceName;\n\npublic:\n    SmartDevice(string id, string name) : deviceID(id), deviceName(name) {}\n\n    // Concrete Method (Logic chung)\n    void connect() {\n        cout << \"System: \" << deviceName << \" (\" << deviceID << \") dang ket noi den WiFi... Thanh cong!\" << endl;\n    }\n\n    // Abstract Method (Pure virtual function)\n    virtual void operate() = 0;\n\n    // Virtual Destructor\n    virtual ~SmartDevice() {}\n};\n\n// 2. Concrete Class: SmartLight\nclass SmartLight : public SmartDevice {\npublic:\n    SmartLight(string id, string name) : SmartDevice(id, name) {}\n\n    void operate() override {\n        cout << \"Action: Den \" << deviceName << \" dang bat che do anh sang vang, do sang 70%.\" << endl;\n    }\n};\n\n// 3. Concrete Class: AirConditioner\nclass AirConditioner : public SmartDevice {\npublic:\n    AirConditioner(string id, string name) : SmartDevice(id, name) {}\n\n    void operate() override {\n        cout << \"Action: May lanh \" << deviceName << \" dang lam lanh o muc 24 do C.\" << endl;\n    }\n};\n\nint main() {\n    // 4. Client Code\n    vector<SmartDevice*> devices;\n    devices.push_back(new SmartLight(\"L01\", \"Den Phong Khach\"));\n    devices.push_back(new AirConditioner(\"AC01\", \"Panasonic Master\"));\n\n    for (SmartDevice* device : devices) {\n        device->connect(); // Gọi logic chung\n        device->operate(); // Gọi logic riêng\n        cout << \"-----------------\" << endl;\n    }\n\n    // Cleanup\n    for (auto d : devices) delete d;\n    return 0;\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399c10eaa2f83d2b9667cd",
    "language": "java",
    "lesson": "69399b7fcb8bff399ebd73c6",
    "code_content": "import java.util.ArrayList;\nimport java.util.List;\n\n// 1. Abstract Base Class\nabstract class SmartDevice {\n    protected String deviceID;\n    protected String deviceName;\n\n    public SmartDevice(String id, String name) {\n        this.deviceID = id;\n        this.deviceName = name;\n    }\n\n    // Concrete Method\n    public void connect() {\n        System.out.println(\"System: \" + deviceName + \" (\" + deviceID + \") dang ket noi den WiFi... Thanh cong!\");\n    }\n\n    // Abstract Method\n    public abstract void operate();\n}\n\n// 2. Concrete Class: SmartLight\nclass SmartLight extends SmartDevice {\n    public SmartLight(String id, String name) {\n        super(id, name);\n    }\n\n    @Override\n    public void operate() {\n        System.out.println(\"Action: Den \" + deviceName + \" dang bat che do anh sang vang, do sang 70%.\");\n    }\n}\n\n// 3. Concrete Class: AirConditioner\nclass AirConditioner extends SmartDevice {\n    public AirConditioner(String id, String name) {\n        super(id, name);\n    }\n\n    @Override\n    public void operate() {\n        System.out.println(\"Action: May lanh \" + deviceName + \" dang lam lanh o muc 24 do C.\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        List<SmartDevice> devices = new ArrayList<>();\n        devices.add(new SmartLight(\"L01\", \"Den Phong Khach\"));\n        devices.add(new AirConditioner(\"AC01\", \"Panasonic Master\"));\n\n        for (SmartDevice device : devices) {\n            device.connect();\n            device.operate();\n            System.out.println(\"-----------------\");\n        }\n    }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399c1feaa2f83d2b9667ce",
    "language": "csharp",
    "lesson": "69399b7fcb8bff399ebd73c6",
    "code_content": "using System;\nusing System.Collections.Generic;\n\n// 1. Abstract Base Class\npublic abstract class SmartDevice {\n    protected string DeviceID;\n    protected string DeviceName;\n\n    public SmartDevice(string id, string name) {\n        DeviceID = id;\n        DeviceName = name;\n    }\n\n    // Concrete Method\n    public void Connect() {\n        Console.WriteLine($\"System: {DeviceName} ({DeviceID}) dang ket noi den WiFi... Thanh cong!\");\n    }\n\n    // Abstract Method\n    public abstract void Operate();\n}\n\n// 2. Concrete Classes\npublic class SmartLight : SmartDevice {\n    public SmartLight(string id, string name) : base(id, name) {}\n\n    public override void Operate() {\n        Console.WriteLine($\"Action: Den {DeviceName} dang bat che do anh sang vang, do sang 70%.\");\n    }\n}\n\npublic class AirConditioner : SmartDevice {\n    public AirConditioner(string id, string name) : base(id, name) {}\n\n    public override void Operate() {\n        Console.WriteLine($\"Action: May lanh {DeviceName} dang lam lanh o muc 24 do C.\");\n    }\n}\n\nclass Program {\n    static void Main(string[] args) {\n        List<SmartDevice> devices = new List<SmartDevice> {\n            new SmartLight(\"L01\", \"Den Phong Khach\"),\n            new AirConditioner(\"AC01\", \"Panasonic Master\")\n        };\n\n        foreach (var device in devices) {\n            device.Connect();\n            device.Operate();\n            Console.WriteLine(\"-----------------\");\n        }\n    }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399c2deaa2f83d2b9667cf",
    "language": "dart",
    "lesson": "69399b7fcb8bff399ebd73c6",
    "code_content": "// 1. Abstract Base Class\nabstract class SmartDevice {\n  String _deviceID;\n  String _deviceName;\n\n  SmartDevice(this._deviceID, this._deviceName);\n\n  // Concrete Method\n  void connect() {\n    print(\"System: $_deviceName ($_deviceID) dang ket noi den WiFi... Thanh cong!\");\n  }\n\n  // Abstract Method (hàm không có thân)\n  void operate();\n}\n\n// 2. Concrete Classes\nclass SmartLight extends SmartDevice {\n  SmartLight(String id, String name) : super(id, name);\n\n  @override\n  void operate() {\n    print(\"Action: Den $_deviceName dang bat che do anh sang vang, do sang 70%.\");\n  }\n}\n\nclass AirConditioner extends SmartDevice {\n  AirConditioner(String id, String name) : super(id, name);\n\n  @override\n  void operate() {\n    print(\"Action: May lanh $_deviceName dang lam lanh o muc 24 do C.\");\n  }\n}\n\nvoid main() {\n  List<SmartDevice> devices = [\n    SmartLight(\"L01\", \"Den Phong Khach\"),\n    AirConditioner(\"AC01\", \"Panasonic Master\")\n  ];\n\n  for (var device in devices) {\n    device.connect();\n    device.operate();\n    print(\"-----------------\");\n  }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399c3ceaa2f83d2b9667d0",
    "language": "ruby",
    "lesson": "69399b7fcb8bff399ebd73c6",
    "code_content": "# 1. Abstract Base Class (Simulation)\nclass SmartDevice\n  def initialize(id, name)\n    @device_id = id\n    @device_name = name\n  end\n\n  # Concrete Method\n  def connect\n    puts \"System: #{@device_name} (#{@device_id}) dang ket noi den WiFi... Thanh cong!\"\n  end\n\n  # Abstract Method\n  def operate\n    raise NotImplementedError, \"Lớp con phải định nghĩa phương thức 'operate'\"\n  end\nend\n\n# 2. Concrete Classes\nclass SmartLight < SmartDevice\n  def operate\n    puts \"Action: Den #{@device_name} dang bat che do anh sang vang, do sang 70%.\"\n  end\nend\n\nclass AirConditioner < SmartDevice\n  def operate\n    puts \"Action: May lanh #{@device_name} dang lam lanh o muc 24 do C.\"\n  end\nend\n\n# 3. Client Code\ndevices = [\n  SmartLight.new(\"L01\", \"Den Phong Khach\"),\n  AirConditioner.new(\"AC01\", \"Panasonic Master\")\n]\n\ndevices.each do |device|\n  device.connect\n  device.operate\n  puts \"-----------------\"\nend",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399c48eaa2f83d2b9667d1",
    "language": "php",
    "lesson": "69399b7fcb8bff399ebd73c6",
    "code_content": "<?php\n// 1. Abstract Base Class\nabstract class SmartDevice {\n    protected $deviceID;\n    protected $deviceName;\n\n    public function __construct($id, $name) {\n        $this->deviceID = $id;\n        $this->deviceName = $name;\n    }\n\n    // Concrete Method\n    public function connect() {\n        echo \"System: \" . $this->deviceName . \" (\" . $this->deviceID . \") dang ket noi den WiFi... Thanh cong!\\n\";\n    }\n\n    // Abstract Method\n    abstract public function operate();\n}\n\n// 2. Concrete Classes\nclass SmartLight extends SmartDevice {\n    public function operate() {\n        echo \"Action: Den \" . $this->deviceName . \" dang bat che do anh sang vang, do sang 70%.\\n\";\n    }\n}\n\nclass AirConditioner extends SmartDevice {\n    public function operate() {\n        echo \"Action: May lanh \" . $this->deviceName . \" dang lam lanh o muc 24 do C.\\n\";\n    }\n}\n\n// 3. Client Code\n$devices = [\n    new SmartLight(\"L01\", \"Den Phong Khach\"),\n    new AirConditioner(\"AC01\", \"Panasonic Master\")\n];\n\nforeach ($devices as $device) {\n    $device->connect();\n    $device->operate();\n    echo \"-----------------\\n\";\n}\n?>",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399ce8eaa2f83d2b9667d2",
    "language": "cpp",
    "lesson": "69399b7bcb8bff399ebd73c0",
    "code_content": "#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\n// 1. Abstract Base Class\nclass PaymentMethod {\npublic:\n    // Pure virtual function\n    virtual void pay(double amount) = 0;\n    \n    // Virtual destructor (Quan trọng trong C++)\n    virtual ~PaymentMethod() {} \n};\n\n// 2. Concrete Class: CreditCard\nclass CreditCard : public PaymentMethod {\nprivate:\n    string cardNumber;\npublic:\n    CreditCard(string number) : cardNumber(number) {}\n\n    // Ghi đè hàm pay\n    void pay(double amount) override {\n        double total = amount + (amount * 0.02); // Phí 2%\n        cout << \"Thanh toan \" << total << \" bang the \" << cardNumber << \". Phi: 2%\" << endl;\n    }\n};\n\n// 3. Concrete Class: EWallet\nclass EWallet : public PaymentMethod {\nprivate:\n    string phoneNumber;\npublic:\n    EWallet(string phone) : phoneNumber(phone) {}\n\n    // Ghi đè hàm pay\n    void pay(double amount) override {\n        cout << \"Thanh toan \" << amount << \" bang vi \" << phoneNumber << \". Khong mat phi\" << endl;\n    }\n};\n\nint main() {\n    // 4. Polymorphism Test\n    vector<PaymentMethod*> payments;\n    \n    payments.push_back(new CreditCard(\"1234-5678\"));\n    payments.push_back(new EWallet(\"0909-123-456\"));\n    payments.push_back(new CreditCard(\"9876-5432\"));\n\n    // Vòng lặp đa hình\n    for (PaymentMethod* pm : payments) {\n        pm->pay(100.0); // Gọi cùng 1 hàm, nhưng hành vi khác nhau\n    }\n\n    // Dọn dẹp bộ nhớ\n    for (PaymentMethod* pm : payments) {\n        delete pm;\n    }\n\n    return 0;\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399d07eaa2f83d2b9667d3",
    "language": "java",
    "lesson": "69399b7bcb8bff399ebd73c0",
    "code_content": "import java.util.ArrayList;\nimport java.util.List;\n\n// 1. Abstract Base Class\nabstract class PaymentMethod {\n    public abstract void pay(double amount);\n}\n\n// 2. Concrete Class: CreditCard\nclass CreditCard extends PaymentMethod {\n    private String cardNumber;\n\n    public CreditCard(String cardNumber) {\n        this.cardNumber = cardNumber;\n    }\n\n    @Override\n    public void pay(double amount) {\n        double total = amount + (amount * 0.02);\n        System.out.println(\"Thanh toan \" + total + \" bang the \" + cardNumber + \". Phi: 2%\");\n    }\n}\n\n// 3. Concrete Class: EWallet\nclass EWallet extends PaymentMethod {\n    private String phoneNumber;\n\n    public EWallet(String phoneNumber) {\n        this.phoneNumber = phoneNumber;\n    }\n\n    @Override\n    public void pay(double amount) {\n        System.out.println(\"Thanh toan \" + amount + \" bang vi \" + phoneNumber + \". Khong mat phi\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // 4. Polymorphism Test\n        List<PaymentMethod> payments = new ArrayList<>();\n        \n        payments.add(new CreditCard(\"1234-5678\"));\n        payments.add(new EWallet(\"0909-123-456\"));\n\n        // Vòng lặp đa hình\n        for (PaymentMethod pm : payments) {\n            pm.pay(100.0);\n        }\n    }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399d37eaa2f83d2b9667d4",
    "lesson": "69399b7bcb8bff399ebd73c0",
    "language": "csharp",
    "code_content": "using System;\nusing System.Collections.Generic;\n\n// 1. Abstract Base Class\npublic abstract class PaymentMethod {\n    public abstract void Pay(double amount);\n}\n\n// 2. Concrete Class: CreditCard\npublic class CreditCard : PaymentMethod {\n    private string CardNumber;\n\n    public CreditCard(string cardNumber) {\n        CardNumber = cardNumber;\n    }\n\n    public override void Pay(double amount) {\n        double total = amount + (amount * 0.02);\n        Console.WriteLine($\"Thanh toan {total} bang the {CardNumber}. Phi: 2%\");\n    }\n}\n\n// 3. Concrete Class: EWallet\npublic class EWallet : PaymentMethod {\n    private string PhoneNumber;\n\n    public EWallet(string phoneNumber) {\n        PhoneNumber = phoneNumber;\n    }\n\n    public override void Pay(double amount) {\n        Console.WriteLine($\"Thanh toan {amount} bang vi {PhoneNumber}. Khong mat phi\");\n    }\n}\n\nclass Program {\n    static void Main(string[] args) {\n        // 4. Polymorphism Test\n        List<PaymentMethod> payments = new List<PaymentMethod>();\n        \n        payments.Add(new CreditCard(\"1234-5678\"));\n        payments.Add(new EWallet(\"0909-123-456\"));\n\n        foreach (PaymentMethod pm in payments) {\n            pm.Pay(100.0);\n        }\n    }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399d85eaa2f83d2b9667d5",
    "lesson": "69399b7bcb8bff399ebd73c0",
    "language": "dart",
    "code_content": "// 1. Abstract Base Class\nabstract class PaymentMethod {\n  void pay(double amount);\n}\n\n// 2. Concrete Class: CreditCard\nclass CreditCard extends PaymentMethod {\n  String cardNumber;\n\n  CreditCard(this.cardNumber);\n\n  @override\n  void pay(double amount) {\n    double total = amount + (amount * 0.02);\n    print(\"Thanh toan $total bang the $cardNumber. Phi: 2%\");\n  }\n}\n\n// 3. Concrete Class: EWallet\nclass EWallet extends PaymentMethod {\n  String phoneNumber;\n\n  EWallet(this.phoneNumber);\n\n  @override\n  void pay(double amount) {\n    print(\"Thanh toan $amount bang vi $phoneNumber. Khong mat phi\");\n  }\n}\n\nvoid main() {\n  // 4. Polymorphism Test\n  List<PaymentMethod> payments = [\n    CreditCard(\"1234-5678\"),\n    EWallet(\"0909-123-456\")\n  ];\n\n  for (var pm in payments) {\n    pm.pay(100.0);\n  }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399d92eaa2f83d2b9667d6",
    "lesson": "69399b7bcb8bff399ebd73c0",
    "language": "ruby",
    "code_content": "# 1. Base Class (Optional in Ruby, but good for structure)\nclass PaymentMethod\n  def pay(amount)\n    raise NotImplementedError, \"Subclasses must define 'pay'.\"\n  end\nend\n\n# 2. Concrete Class: CreditCard\nclass CreditCard < PaymentMethod\n  def initialize(card_number)\n    @card_number = card_number\n  end\n\n  def pay(amount)\n    total = amount + (amount * 0.02)\n    puts \"Thanh toan #{total} bang the #{@card_number}. Phi: 2%\"\n  end\nend\n\n# 3. Concrete Class: EWallet\nclass EWallet < PaymentMethod\n  def initialize(phone_number)\n    @phone_number = phone_number\n  end\n\n  def pay(amount)\n    puts \"Thanh toan #{amount} bang vi #{@phone_number}. Khong mat phi\"\n  end\nend\n\n# 4. Polymorphism Test\npayments = [\n  CreditCard.new(\"1234-5678\"),\n  EWallet.new(\"0909-123-456\")\n]\n\npayments.each do |pm|\n  pm.pay(100.0)\nend",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399da1eaa2f83d2b9667d7",
    "language": "php",
    "lesson": "69399b7bcb8bff399ebd73c0",
    "code_content": "<?php\n// 1. Abstract Base Class\nabstract class PaymentMethod {\n    abstract public function pay($amount);\n}\n\n// 2. Concrete Class: CreditCard\nclass CreditCard extends PaymentMethod {\n    private $cardNumber;\n\n    public function __construct($cardNumber) {\n        $this->cardNumber = $cardNumber;\n    }\n\n    public function pay($amount) {\n        $total = $amount + ($amount * 0.02);\n        echo \"Thanh toan $total bang the $this->cardNumber. Phi: 2%\\n\";\n    }\n}\n\n// 3. Concrete Class: EWallet\nclass EWallet extends PaymentMethod {\n    private $phoneNumber;\n\n    public function __construct($phoneNumber) {\n        $this->phoneNumber = $phoneNumber;\n    }\n\n    public function pay($amount) {\n        echo \"Thanh toan $amount bang vi $this->phoneNumber. Khong mat phi\\n\";\n    }\n}\n\n// 4. Polymorphism Test\n$payments = [\n    new CreditCard(\"1234-5678\"),\n    new EWallet(\"0909-123-456\")\n];\n\nforeach ($payments as $pm) {\n    $pm->pay(100.0);\n}\n?>",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399e3beaa2f83d2b9667d8",
    "language": "cpp",
    "lesson": "69399b81cb8bff399ebd73cc",
    "code_content": "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Product {\nprivate:\n    string name;\n    double price;\n    int stock;\n\npublic:\n    // Constructor\n    Product(string n, double p, int s) {\n        name = n;\n        setPrice(p); // Tận dụng logic validation của setter\n        setStock(s);\n    }\n\n    // Getter\n    string getName() { return name; }\n    double getPrice() { return price; }\n    int getStock() { return stock; }\n\n    // Setter với Validation\n    void setPrice(double p) {\n        if (p > 0) {\n            price = p;\n        } else {\n            cout << \"Error: Price must be > 0\" << endl;\n        }\n    }\n\n    void setStock(int s) {\n        if (s >= 0) {\n            stock = s;\n        } else {\n            cout << \"Error: Stock cannot be negative\" << endl;\n        }\n    }\n\n    // Business Method\n    bool sell(int quantity) {\n        if (quantity > 0 && quantity <= stock) {\n            stock -= quantity;\n            return true;\n        }\n        return false;\n    }\n};\n\nint main() {\n    Product p1(\"Laptop\", 1000.0, 10);\n    p1.setPrice(-500); // Test logic sai\n    p1.sell(3);        // Bán 3 cái\n    cout << \"Current Stock: \" << p1.getStock() << endl; // Kết quả: 7\n    return 0;\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399e46eaa2f83d2b9667d9",
    "language": "java",
    "lesson": "69399b81cb8bff399ebd73cc",
    "code_content": "public class Product {\n    private String name;\n    private double price;\n    private int stock;\n\n    public Product(String name, double price, int stock) {\n        this.name = name;\n        setPrice(price); // Gọi setter để validate ngay từ đầu\n        setStock(stock);\n    }\n\n    // Getters\n    public String getName() { return name; }\n    public double getPrice() { return price; }\n    public int getStock() { return stock; }\n\n    // Setters with Validation\n    public void setPrice(double price) {\n        if (price > 0) {\n            this.price = price;\n        } else {\n            System.out.println(\"Error: Price must be > 0\");\n        }\n    }\n\n    public void setStock(int stock) {\n        if (stock >= 0) {\n            this.stock = stock;\n        } else {\n            System.out.println(\"Error: Stock cannot be negative\");\n        }\n    }\n\n    public boolean sell(int quantity) {\n        if (quantity > 0 && quantity <= stock) {\n            this.stock -= quantity;\n            return true;\n        }\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Product p = new Product(\"Phone\", 500.0, 20);\n        p.setStock(-5); // Lỗi\n        p.sell(5);\n        System.out.println(\"Stock: \" + p.getStock()); // 15\n    }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399e50eaa2f83d2b9667da",
    "language": "csharp",
    "lesson": "69399b81cb8bff399ebd73cc",
    "code_content": "using System;\n\npublic class Product {\n    // Backing fields (biến ẩn)\n    private string _name;\n    private double _price;\n    private int _stock;\n\n    public Product(string name, double price, int stock) {\n        _name = name;\n        Price = price; // Gán qua Property để kích hoạt validation\n        Stock = stock;\n    }\n\n    // Property cho Price\n    public double Price {\n        get { return _price; }\n        set {\n            if (value > 0) _price = value;\n            else Console.WriteLine(\"Error: Price must be > 0\");\n        }\n    }\n\n    // Property cho Stock\n    public int Stock {\n        get { return _stock; }\n        set {\n            if (value >= 0) _stock = value;\n            else Console.WriteLine(\"Error: Stock cannot be negative\");\n        }\n    }\n\n    // Business Method\n    public bool Sell(int quantity) {\n        if (quantity > 0 && quantity <= _stock) {\n            _stock -= quantity;\n            return true;\n        }\n        return false;\n    }\n\n    public static void Main() {\n        Product p = new Product(\"Mouse\", 20.0, 50);\n        p.Price = -10; // Setter chạy logic in lỗi\n        p.Sell(10);\n        Console.WriteLine(\"Stock: \" + p.Stock); // 40\n    }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399e5beaa2f83d2b9667db",
    "language": "dart",
    "lesson": "69399b81cb8bff399ebd73cc",
    "code_content": "class Product {\n  // Private fields (bắt đầu bằng _)\n  String _name;\n  double _price;\n  int _stock;\n\n  // Constructor\n  Product(this._name, double price, int stock) \n      : _price = 0, _stock = 0 { // Khởi tạo tạm\n    this.price = price; // Gọi setter\n    this.stock = stock; // Gọi setter\n  }\n\n  // Getter & Setter cho Price\n  double get price => _price;\n  set price(double value) {\n    if (value > 0) _price = value;\n    else print(\"Error: Price must be > 0\");\n  }\n\n  // Getter & Setter cho Stock\n  int get stock => _stock;\n  set stock(int value) {\n    if (value >= 0) _stock = value;\n    else print(\"Error: Stock cannot be negative\");\n  }\n\n  bool sell(int quantity) {\n    if (quantity > 0 && quantity <= _stock) {\n      _stock -= quantity;\n      return true;\n    }\n    return false;\n  }\n}\n\nvoid main() {\n  var p = Product(\"Keyboard\", 30.0, 10);\n  p.stock = -5; // Gọi setter, in lỗi\n  p.sell(2);\n  print(\"Stock: ${p.stock}\"); // 8\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399e68eaa2f83d2b9667dc",
    "lesson": "69399b81cb8bff399ebd73cc",
    "language": "ruby",
    "code_content": "class Product\n  def initialize(name, price, stock)\n    @name = name\n    self.price = price # Gọi setter\n    self.stock = stock # Gọi setter\n  end\n\n  # Getter thủ công (hoặc dùng attr_reader)\n  def name\n    @name\n  end\n  \n  def price\n    @price\n  end\n\n  def stock\n    @stock\n  end\n\n  # Setter thủ công (Ruby convention dùng dấu =)\n  def price=(value)\n    if value > 0\n      @price = value\n    else\n      puts \"Error: Price must be > 0\"\n    end\n  end\n\n  def stock=(value)\n    if value >= 0\n      @stock = value\n    else\n      puts \"Error: Stock cannot be negative\"\n    end\n  end\n\n  def sell(quantity)\n    if quantity > 0 && quantity <= @stock\n      @stock -= quantity\n      true\n    else\n      false\n    end\n  end\nend\n\n# Main\np = Product.new(\"Screen\", 150.0, 5)\np.price = -20 # In lỗi\np.sell(1)\nputs \"Stock: #{p.stock}\" # 4",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "69399e73eaa2f83d2b9667de",
    "language": "php",
    "lesson": "69399b81cb8bff399ebd73cc",
    "code_content": "<?php\nclass Product {\n    private $name;\n    private $price;\n    private $stock;\n\n    public function __construct($name, $price, $stock) {\n        $this->name = $name;\n        $this->setPrice($price);\n        $this->setStock($stock);\n    }\n\n    public function getPrice() { return $this->price; }\n    public function getStock() { return $this->stock; }\n\n    public function setPrice($price) {\n        if ($price > 0) {\n            $this->price = $price;\n        } else {\n            echo \"Error: Price must be > 0\\n\";\n        }\n    }\n\n    public function setStock($stock) {\n        if ($stock >= 0) {\n            $this->stock = $stock;\n        } else {\n            echo \"Error: Stock cannot be negative\\n\";\n        }\n    }\n\n    public function sell($quantity) {\n        if ($quantity > 0 && $quantity <= $this->stock) {\n            $this->stock -= $quantity;\n            return true;\n        }\n        return false;\n    }\n}\n\n// Main\n$p = new Product(\"USB\", 10.0, 100);\n$p->setStock(-10); // Lỗi\n$p->sell(10);\necho \"Stock: \" . $p->getStock(); // 90\n?>",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fb4cbeaa2f83d2b966887",
    "language": "cpp",
    "lesson": "69399a01cb8bff399ebd731d",
    "code_content": "#include <iostream>\n\nclass Rectangle {\npublic: // Access specifier\n    double length;\n    double width;\n\n    // Member function (method)\n    double calculateArea() {\n        return length * width;\n    }\n};\n\nint main() {\n    Rectangle rect1; // Create an object of the Rectangle class\n    rect1.length = 10.0;\n    rect1.width = 5.0;\n\n    double area = rect1.calculateArea(); // Call a member function\n    std::cout << \"Area: \" << area << std::endl;\n    return 0;\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fb4f0eaa2f83d2b966888",
    "language": "java",
    "lesson": "69399a01cb8bff399ebd731d",
    "code_content": "// Định nghĩa một class cơ bản\nclass Car {\n    // Thuộc tính (state)\n    String brand;\n    int year;\n\n    // Constructor để khởi tạo object\n    Car(String brand, int year) {\n        this.brand = brand;\n        this.year = year;\n    }\n\n    // Phương thức (behavior)\n    void displayInfo() {\n        System.out.println(\"Brand: \" + brand);\n        System.out.println(\"Year: \" + year);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n\n        // Tạo object từ class Car\n        Car myCar = new Car(\"Toyota\", 2020);\n\n        // Gọi phương thức của object\n        myCar.displayInfo();\n    }\n}\n",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fb548eaa2f83d2b966889",
    "lesson": "69399a01cb8bff399ebd731d",
    "language": "csharp",
    "code_content": "class Car\n{\n  string color = \"red\";\n\n  static void Main(string[] args)\n  {\n    CarmyObj = new Car();\n    Console.WriteLine(myObj.color);\n  }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fb561eaa2f83d2b96688a",
    "lesson": "69399a01cb8bff399ebd731d",
    "language": "dart",
    "code_content": "    class Car {\n      String brand;\n      int year;\n\n      void drive() {\n        print('$brand is driving.');\n      }\n    }\n    \n      Car myCar = Car(); // Creates an object of the Car class\n      \n    myCar.brand = 'Toyota';\n    myCar.year = 2023;\n    myCar.drive(); // Calls the drive method",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fb59beaa2f83d2b96688b",
    "lesson": "69399a01cb8bff399ebd731d",
    "language": "ruby",
    "code_content": "def method_name\n\n# statements or code to be executed\n\nend\n\n# defining class \nclass TestClass\n\n# defining method\ndef greeting\n\n# printing result\nputs \"Hello OOP Nerds!\"\n\n# end of method\nend\n\n# end of class TestClass\nend\n\n# creating object\nobj = TestClass.new\n\n# calling method using object\nobj.greeting",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fb5ceeaa2f83d2b96688c",
    "language": "php",
    "lesson": "69399a01cb8bff399ebd731d",
    "code_content": "<?php\nclass Fruit {\n  // Attributes\n  public $name;\n  public $color;\n\n  // Methods\n  function set_name($name) {\n    $this->name = $name;\n  }\n  function get_name() {\n    return $this->name;\n  }\n}\n\n$apple = new Fruit();\n$banana = new Fruit();\n$apple->set_name('Apple');\n$banana->set_name('Banana');\n\necho $apple->get_name();\necho \"<br>\";\necho $banana->get_name();\n?>",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fb65ceaa2f83d2b96688d",
    "language": "cpp",
    "lesson": "69399a1ecb8bff399ebd732a",
    "code_content": "// Trường hợp CẦN cả constructor và destructor\nclass QuanLyFile {\nprivate:\n    FILE* file;\n    char* buffer;\n\npublic:\n    // Constructor: khởi tạo tài nguyên\n    QuanLyFile(const char* tenFile) {\n        file = fopen(tenFile, \"r\");\n        buffer = new char[1024];\n\n        if(!file) {\n            throw runtime_error(\"Không mở được file\");\n        }\n    }\n\n    // Destructor: PHẢI có để giải phóng\n    ~QuanLyFile() {\n        if(file) fclose(file);\n        delete[] buffer;\n    }\n};\n\n// Trường hợp KHÔNG CẦN\nclass ThongTinCoBan {\n    string ten = \"Unknown\";\n    int tuoi = 0;\n    // Default constructor và destructor tự động là đủ\n};\n",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fc953eaa2f83d2b96689c",
    "language": "java",
    "lesson": "69399a1ecb8bff399ebd732a",
    "code_content": "class SinhVien {\n    private String ten;\n    private int tuoi;\n    \n    // Constructor - Được gọi khi tạo đối tượng\n    public SinhVien(String ten, int tuoi) {\n        this.ten = ten;\n        this.tuoi = tuoi;\n        System.out.println(\"Constructor: Đã tạo sinh viên \" + ten);\n    }\n    \n    public void hienThi() {\n        System.out.println(\"Tên: \" + ten + \", Tuổi: \" + tuoi);\n    }\n    \n    // finalize() - Tương tự Destructor (được gọi trước khi xóa đối tượng)\n    @Override\n    protected void finalize() {\n        System.out.println(\"Destructor: Đã xóa sinh viên \" + ten);\n    }\n}\n\n// Sử dụng\npublic class Main {\n    public static void main(String[] args) {\n        SinhVien sv1 = new SinhVien(\"An\", 20);\n        sv1.hienThi();\n        \n        sv1 = null; // Đánh dấu để garbage collector xóa\n        System.gc(); // Yêu cầu chạy garbage collector\n    }\n}\n\n/* Output:\nConstructor: Đã tạo sinh viên An\nTên: An, Tuổi: 20\nDestructor: Đã xóa sinh viên An\n*/",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fc964eaa2f83d2b96689d",
    "language": "csharp",
    "lesson": "69399a1ecb8bff399ebd732a",
    "code_content": "using System;\n\nclass SinhVien {\n    private string ten;\n    private int tuoi;\n    \n    // Constructor - Được gọi khi tạo đối tượng\n    public SinhVien(string ten, int tuoi) {\n        this.ten = ten;\n        this.tuoi = tuoi;\n        Console.WriteLine($\"Constructor: Đã tạo sinh viên {ten}\");\n    }\n    \n    public void HienThi() {\n        Console.WriteLine($\"Tên: {ten}, Tuổi: {tuoi}\");\n    }\n    \n    // Destructor - Được gọi trước khi xóa đối tượng (dùng ký hiệu ~)\n    ~SinhVien() {\n        Console.WriteLine($\"Destructor: Đã xóa sinh viên {ten}\");\n    }\n}\n\nclass Program {\n    static void Main() {\n        SinhVien sv1 = new SinhVien(\"Bình\", 21);\n        sv1.HienThi();\n        // Destructor sẽ tự động được gọi khi kết thúc chương trình\n    }\n}\n\n/* Output:\nConstructor: Đã tạo sinh viên Bình\nTên: Bình, Tuổi: 21\nDestructor: Đã xóa sinh viên Bình\n*/",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fc979eaa2f83d2b96689e",
    "language": "dart",
    "lesson": "69399a1ecb8bff399ebd732a",
    "code_content": "class SinhVien {\n  String ten;\n  int tuoi;\n  \n  // Constructor - Tên trùng với class\n  SinhVien(this.ten, this.tuoi) {\n    print('Constructor: Đã tạo sinh viên $ten');\n  }\n  \n  // Constructor có tên (Named Constructor)\n  SinhVien.macDinh() : ten = 'Chưa đặt tên', tuoi = 18 {\n    print('Constructor mặc định được gọi');\n  }\n  // Lưu ý: Dart KHÔNG có Destructor\n  // Dart tự động quản lý bộ nhớ thông qua Garbage Collection\n  void hienThi() {\n    print('Tên: $ten, Tuổi: $tuoi');\n  }\n}\n\nvoid main() {\n  var sv1 = SinhVien('Em', 19);\n  sv1.hienThi();\n  \n  print('---');\n  \n  var sv2 = SinhVien.macDinh();\n  sv2.hienThi();\n}\n\n/* Output:\nConstructor: Đã tạo sinh viên Em\nTên: Em, Tuổi: 19\n---\nConstructor mặc định được gọi\nTên: Chưa đặt tên, Tuổi: 18\n*/",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fc9baeaa2f83d2b96689f",
    "lesson": "69399a1ecb8bff399ebd732a",
    "language": "ruby",
    "code_content": "class SinhVien\n  # Constructor - Phương thức initialize\n  def initialize(ten, tuoi)\n    @ten = ten\n    @tuoi = tuoi\n    puts \"Constructor: Đã tạo sinh viên #{@ten}\"\n  end\n  \n  def hien_thi\n    puts \"Tên: #{@ten}, Tuổi: #{@tuoi}\"\n  end\n  \n  # Destructor - Phương thức finalize (tự động gọi khi đối tượng bị xóa)\n  def finalize\n    puts \"Destructor: Đã xóa sinh viên #{@ten}\"\n  end\nend\n\n# Sử dụng\nsv1 = SinhVien.new(\"Cường\", 22)\nsv1.hien_thi\n\n# Ruby tự động dọn dẹp bộ nhớ khi kết thúc chương trình\n\n=begin\nOutput:\nConstructor: Đã tạo sinh viên Cường\nTên: Cường, Tuổi: 22\n=end",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fc9cdeaa2f83d2b9668a0",
    "language": "php",
    "lesson": "69399a1ecb8bff399ebd732a",
    "code_content": "<?php\nclass SinhVien {\n    private $ten;\n    private $tuoi;\n    \n    // Constructor - Phương thức __construct()\n    public function __construct($ten, $tuoi) {\n        $this->ten = $ten;\n        $this->tuoi = $tuoi;\n        echo \"Constructor: Đã tạo sinh viên $ten\\n\";\n    }\n    \n    public function hienThi() {\n        echo \"Tên: $this->ten, Tuổi: $this->tuoi\\n\";\n    }\n    \n    // Destructor - Phương thức __destruct()\n    public function __destruct() {\n        echo \"Destructor: Đã xóa sinh viên $this->ten\\n\";\n    }\n}\n\n$sv1 = new SinhVien(\"Dũng\", 23);\n$sv1->hienThi();\n?>",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fcb52eaa2f83d2b9668a1",
    "language": "cpp",
    "lesson": "6939986fcb8bff399ebd72c8",
    "code_content": "#include <iostream>\nusing namespace std;\n\nclass Animal\n{\n  public:\n    void sound()\n    {\n        cout << \"Animal makes a sound\" << endl;\n    }\n};\n\nclass Dog : public Animal\n{\n  public:\n    void sound()\n    {\n        cout << \"Dog barks\" << endl;\n    }\n};\n\nclass Cat : public Animal\n{\n  public:\n    void sound()\n    {\n        cout << \"Cat meows\" << endl;\n    }\n};\n\nint main()\n{\n    Dog d;\n    d.sound();\n    Cat c;\n    c.sound();\n\n    return 0;\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fcc56eaa2f83d2b9668a2",
    "lesson": "6939980ecb8bff399ebd72ac",
    "language": "cpp",
    "code_content": "#include <iostream>\nusing namespace std;\n\n// Base class\nclass Vehicle {\npublic:\n    Vehicle() {\n        cout << \"This is a Vehicle\" << endl;\n    }\n};\n\n// Derived class from Vehicle, also a base class for the next level\nclass FourWheeler : public Vehicle {\npublic:\n    FourWheeler() {\n        cout << \"4 Wheeler Vehicles\" << endl;\n    }\n};\n\n// Derived class from FourWheeler\nclass Car : public FourWheeler {\npublic:\n    Car() {\n        cout << \"This 4 Wheeler Vehicle is a Car\" << endl;\n    }\n};\n\nint main() {\n    Car obj;\n    // Output will show constructors called from top to bottom\n    return 0;\n}\n",
    "explanation": "",
    "is_supported": true,
    "syntax_note": "Trong kế thừa đa cấp, một lớp được kế thừa từ một lớp dẫn xuất, tạo thành một chuỗi liên kết."
  },
  {
    "_id": "693fcc79eaa2f83d2b9668a3",
    "language": "java",
    "lesson": "6939986fcb8bff399ebd72c8",
    "code_content": "class Animal {\n    void eat() {\n        System.out.println(\"This animal eats food.\");\n    }\n}\n\nclass Dog extends Animal { // Dog inherits from Animal\n    void bark() {\n        System.out.println(\"The dog barks.\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Dog myDog = new Dog();\n        myDog.eat();  // Inherited from Animal\n        myDog.bark(); // Defined in Dog\n    }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fcc9beaa2f83d2b9668a4",
    "language": "dart",
    "lesson": "6939986fcb8bff399ebd72c8",
    "code_content": "class Animal {\n  String name;\n\n  Animal(this.name);\n\n  void eat() {\n    print('$name is eating.');\n  }\n}\n\nclass Dog extends Animal {\n  Dog(String name) : super(name); // Call the superclass constructor\n\n  void bark() {\n    print('$name is barking.');\n  }\n}\n\nvoid main() {\n  Dog myDog = Dog('Buddy');\n  myDog.eat();  // Inherited from Animal\n  myDog.bark(); // Specific to Dog\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fccb4eaa2f83d2b9668a5",
    "language": "ruby",
    "lesson": "6939986fcb8bff399ebd72c8",
    "code_content": "# Lớp cha định nghĩa năng lực nền tảng\nclass Vehicle\n  def initialize(name)\n    @name = name\n  end\n\n  def start\n    puts \"#{@name} is starting...\"\n  end\nend\n\n# Lớp con mở rộng tính năng, kế thừa toàn bộ năng lực của Vehicle\nclass Car < Vehicle\n  def honk\n    puts \"#{@name} is honking!\"\n  end\nend\n\n# Triển khai: Car kế thừa start và sở hữu honk\ncar = Car.new(\"Sedan\")\ncar.start\ncar.honk",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fcce9eaa2f83d2b9668a6",
    "language": "php",
    "lesson": "6939986fcb8bff399ebd72c8",
    "code_content": "<?php\nclass Fruit {\n  public $name;\n  public $color;\n  public function __construct($name, $color) {\n    $this->name = $name;\n    $this->color = $color;\n  }\n  public function intro() {\n    echo \"The fruit is {$this->name} and the color is {$this->color}.\";\n  }\n}\n\n// Strawberry is inherited from Fruit\nclass Strawberry extends Fruit {\n  public function message() {\n    echo \"Am I a fruit or a berry? \";\n  }\n}\n$strawberry = new Strawberry(\"Strawberry\", \"red\");\n$strawberry->message();\n$strawberry->intro();\n?>",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "693fcd30eaa2f83d2b9668a7",
    "lesson": "6939986fcb8bff399ebd72c8",
    "language": "csharp",
    "code_content": "using System;\n\nclass Animal {\n  \n    // Base class\n    public virtual void Move()\n    {\n        Console.WriteLine(\"Animal is moving.\");\n    }\n\n    public void Eat()\n    {\n        Console.WriteLine(\"Animal is eating.\");\n    }\n}\n\nclass Dog : Animal {\n  \n    // Overriding the Move method from the base class\n    public override void Move()\n    {\n        Console.WriteLine(\"Dog is running.\");\n    }\n\n    public void Bark()\n    {\n        Console.WriteLine(\"Dog is barking.\");\n    }\n}\n\nclass Geeks {\n    static void Main()\n    {\n        Dog d = new Dog();\n        d.Move();\n        d.Eat();\n        d.Bark();\n    }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "694136668c131588eaec6792",
    "language": "cpp",
    "lesson": "69399722cb8bff399ebd7278",
    "code_content": "#include <iostream>\n#include <string>\n\nusing namespace std;\n\n// 1. Lớp Cha (Base Class)\nclass Animal {\npublic:\n    // Từ khóa 'virtual' cho phép các lớp con ghi đè phương thức này\n    virtual void makeSound() {\n        cout << \"Animal makes a sound\" << endl;\n    }\n};\n\n// 2. Lớp Con (Derived Class) - Chó\nclass Dog : public Animal {\npublic:\n    // Ghi đè phương thức của lớp cha\n    void makeSound() override {\n        cout << \"Gâu Gâu! (Dog barks)\" << endl;\n    }\n};\n\n// 3. Lớp Con (Derived Class) - Mèo\nclass Cat : public Animal {\npublic:\n    // Ghi đè phương thức của lớp cha\n    void makeSound() override {\n        cout << \"Meo Meo! (Cat meows)\" << endl;\n    }\n};\n\nint main() {\n    // Tạo con trỏ kiểu Animal (Lớp cha)\n    Animal* myAnimal;\n\n    Dog myDog;\n    Cat myCat;\n\n    // Trỏ đến Dog và gọi hàm\n    myAnimal = &myDog;\n    cout << \"Dog says: \";\n    myAnimal->makeSound(); // Kết quả: Gâu Gâu!\n\n    // Trỏ đến Cat và gọi hàm\n    myAnimal = &myCat;\n    cout << \"Cat says: \";\n    myAnimal->makeSound(); // Kết quả: Meo Meo!\n\n    return 0;\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "694136828c131588eaec6793",
    "lesson": "69399722cb8bff399ebd7278",
    "language": "java",
    "code_content": "class Animal {\n    // Trong Java, mặc định các hàm đều có thể bị ghi đè\n    void makeSound() {\n        System.out.println(\"Animal makes a sound\");\n    }\n}\n\nclass Dog extends Animal {\n    @Override // Chỉ dẫn cho trình biên dịch rằng đây là hàm ghi đè\n    void makeSound() {\n        System.out.println(\"Gâu Gâu! (Dog barks)\");\n    }\n}\n\nclass Cat extends Animal {\n    @Override\n    void makeSound() {\n        System.out.println(\"Meo Meo! (Cat meows)\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Tính đa hình: Khai báo kiểu Cha, khởi tạo kiểu Con\n        Animal myDog = new Dog();\n        Animal myCat = new Cat();\n\n        myDog.makeSound(); // In ra: Gâu Gâu!\n        myCat.makeSound(); // In ra: Meo Meo!\n    }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "694136998c131588eaec6794",
    "language": "csharp",
    "lesson": "69399722cb8bff399ebd7278",
    "code_content": "using System;\n\n// Lớp Cha\nclass Animal {\n    // Phải có từ khóa virtual thì lớp con mới ghi đè được\n    public virtual void MakeSound() {\n        Console.WriteLine(\"Animal makes a sound\");\n    }\n}\n\n// Lớp Con\nclass Dog : Animal {\n    // Phải có từ khóa override\n    public override void MakeSound() {\n        Console.WriteLine(\"Gâu Gâu! (Dog barks)\");\n    }\n}\n\nclass Cat : Animal {\n    public override void MakeSound() {\n        Console.WriteLine(\"Meo Meo! (Cat meows)\");\n    }\n}\n\nclass Program {\n    static void Main() {\n        // Tính đa hình\n        Animal myAnimal;\n\n        myAnimal = new Dog();\n        myAnimal.MakeSound(); // In ra: Gâu Gâu!\n\n        myAnimal = new Cat();\n        myAnimal.MakeSound(); // In ra: Meo Meo!\n    }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "694136e38c131588eaec6795",
    "lesson": "69399754cb8bff399ebd7285",
    "language": "cpp",
    "code_content": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\n// 1. Lớp Cha\nclass Animal {\npublic:\n    virtual void introduce() {\n        cout << \"I am a generic animal.\" << endl;\n    }\n};\n\n// 2. Lớp Con\nclass Dog : public Animal {\npublic:\n    void introduce() override {\n        cout << \"I am a Dog (Woof Woof)!\" << endl;\n    }\n    \n    void bark() {\n        cout << \"Only dogs can bark!\" << endl;\n    }\n};\n\n// 3. Lớp Con khác\nclass Cat : public Animal {\npublic:\n    void introduce() override {\n        cout << \"I am a Cat (Meow Meow)!\" << endl;\n    }\n};\n\nint main() {\n    Dog myDog;\n    \n    // Upcasting: Chuyển từ Dog* sang Animal*\n    // Việc này luôn AN TOÀN và tự động trong C++\n    Animal* animalPtr = &myDog; \n    \n    cout << \"Calling via Upcasted pointer:\" << endl;\n    \n    // Nhờ tính Đa hình, dù là con trỏ Animal nhưng nó vẫn gọi đúng hàm của Dog\n    animalPtr->introduce(); \n    \n    // LƯU Ý: Sau khi upcast, bạn không thể gọi các hàm riêng biệt của lớp con\n    // animalPtr->bark(); // LỖI: Animal không có hàm bark()\n\n    cout << \"\\n--- UPCASTING TRONG MẢNG (Ứng dụng thực tế) ---\" << endl;\n\n    // Chúng ta có thể quản lý một danh sách gồm cả Chó và Mèo bằng một mảng Animal\n    Animal* zoo[2];\n    zoo[0] = new Dog(); // Upcasting tự động\n    zoo[1] = new Cat(); // Upcasting tự động\n\n    for(int i = 0; i < 2; i++) {\n        zoo[i]->introduce(); // Mỗi con tự giới thiệu theo cách của mình\n    }\n\n    // Giải phóng bộ nhớ\n    delete zoo[0];\n    delete zoo[1];\n\n    return 0;\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "694137048c131588eaec6796",
    "lesson": "69399754cb8bff399ebd7285",
    "language": "java",
    "code_content": "class Shape {\n    void draw() {\n        System.out.println(\"Drawing a generic shape\");\n    }\n}\n\nclass Circle extends Shape {\n    @Override\n    void draw() {\n        System.out.println(\"Drawing a Circle\");\n    }\n\n    void roll() {\n        System.out.println(\"Circle is rolling\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // 1. Tạo đối tượng lớp con\n        Circle myCircle = new Circle();\n\n        // 2. Upcasting: Gán đối tượng Circle cho tham chiếu kiểu Shape\n        // Diễn ra tự động, không cần ép kiểu\n        Shape myShape = myCircle; \n\n        System.out.println(\"Calling via Upcasted reference:\");\n        myShape.draw(); // Kết quả: Drawing a Circle (Tính đa hình)\n\n        // myShape.roll(); // LỖI: Kiểu Shape không có phương thức roll()\n        \n        // 3. Ứng dụng: Mảng các hình dạng\n        Shape[] shapes = { new Circle(), new Shape() };\n        for (Shape s : shapes) {\n            s.draw();\n        }\n    }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": "Trong Java, Upcasting thường được dùng khi ta muốn lưu trữ các đối tượng khác nhau vào một danh sách (ArrayList) hoặc truyền chúng vào các phương thức dùng chung."
  },
  {
    "_id": "694137248c131588eaec6797",
    "lesson": "69399754cb8bff399ebd7285",
    "language": "csharp",
    "code_content": "using System;\nusing System.Collections.Generic;\n\nclass Vehicle {\n    public virtual void Run() {\n        Console.WriteLine(\"Vehicle is running\");\n    }\n}\n\nclass Car : Vehicle {\n    public override void Run() {\n        Console.WriteLine(\"Car is running on 4 wheels\");\n    }\n\n    public void OpenTrunk() {\n        Console.WriteLine(\"Trunk opened\");\n    }\n}\n\nclass Program {\n    static void Main() {\n        // 1. Upcasting: Đối tượng Car được coi như một Vehicle\n        // Đây là chuyển đổi ngầm định (Implicit conversion)\n        Vehicle myVehicle = new Car();\n\n        Console.WriteLine(\"Upcasting in C#:\");\n        myVehicle.Run(); // Kết quả: Car is running on 4 wheels\n\n        // myVehicle.OpenTrunk(); // LỖI: Vehicle không biết 'OpenTrunk' là gì\n\n        // 2. Ứng dụng thực tế: List chứa nhiều loại xe\n        List<Vehicle> garage = new List<Vehicle>();\n        garage.Add(new Car());\n        garage.Add(new Vehicle());\n\n        foreach (var v in garage) {\n            v.Run();\n        }\n    }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": "C# xử lý Upcasting tương tự Java. Điểm khác biệt duy nhất là cú pháp khai báo phương thức virtual và override để đảm bảo tính đa hình hoạt động chính xác sau khi upcast."
  },
  {
    "_id": "694137478c131588eaec6798",
    "language": "dart",
    "lesson": "69399754cb8bff399ebd7285",
    "code_content": "// 1. Lớp Cha\nclass Printer {\n  void printContent() {\n    print(\"Printing generic content...\");\n  }\n}\n\n// 2. Lớp Con\nclass LaserPrinter extends Printer {\n  @override\n  void printContent() {\n    print(\"Printing with high-quality Laser technology.\");\n  }\n\n  void checkToner() {\n    print(\"Checking toner levels...\");\n  }\n}\n\nvoid main() {\n  // Đối tượng con (LaserPrinter) được gán cho kiểu cha (Printer)\n  // Đây là Upcasting tự động (implicit)\n  Printer myPrinter = LaserPrinter();\n\n  print(\"--- Dart Upcasting & Overriding ---\");\n  \n  // Tính đa hình: Gọi hàm lớp cha nhưng thực thi logic lớp con\n  myPrinter.printContent(); \n\n  // myPrinter.checkToner(); // LỖI: Kiểu Printer không có hàm checkToner()\n  \n  // Ứng dụng: Danh sách các máy in\n  List<Printer> officePrinters = [\n    Printer(),\n    LaserPrinter(),\n  ];\n\n  for (var p in officePrinters) {\n    p.printContent();\n  }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": "Dart là một ngôn ngữ \"strongly typed\" (kiểu dữ liệu mạnh), nên khái niệm Upcasting rất rõ ràng. Nó sử dụng từ khóa extends để kế thừa và @override để ghi đè."
  },
  {
    "_id": "694137678c131588eaec6799",
    "language": "ruby",
    "lesson": "69399754cb8bff399ebd7285",
    "code_content": "# 1. Lớp Cha\nclass Bird\n  def speak\n    puts \"Bird is making a sound\"\n  end\nend\n\n# 2. Lớp Con\nclass Duck < Bird\n  # Method Overriding\n  def speak\n    puts \"Quack! Quack!\"\n  end\n\n  def swim\n    puts \"Duck is swimming\"\n  end\nend\n\n# 3. Lớp Con khác\nclass Owl < Bird\n  def speak\n    puts \"Hoot! Hoot!\"\n  end\nend\n\n# Trong Ruby, một biến có thể giữ bất kỳ đối tượng nào.\n# Tính đa hình thể hiện qua việc gửi cùng một thông điệp (message)\ndef animal_concert(bird)\n  # Đây chính là lúc ta coi 'bird' là một đối tượng lớp Bird (tương đương Upcasting)\n  bird.speak\nend\n\nputs \"--- Ruby Polymorphism ---\"\n\nmy_duck = Duck.new\nmy_owl = Owl.new\n\nanimal_concert(my_duck) # Kết quả: Quack! Quack!\nanimal_concert(my_owl)  # Kết quả: Hoot! Hoot!\n\n# Lưu ý: Ruby không ngăn cản bạn gọi hàm riêng của lớp con \n# trừ khi bạn kiểm tra kiểu dữ liệu một cách thủ công.",
    "explanation": "",
    "is_supported": true,
    "syntax_note": "Ruby là một ngôn ngữ Duck Typing (\"Nếu nó đi như vịt và kêu như vịt, thì nó là vịt\"). Trong Ruby, biến không có kiểu dữ liệu cố định nên khái niệm \"Upcasting\" về mặt cú pháp không rõ rệt như Java hay C++, nhưng về mặt tư duy hướng đối tượng thì nó vẫn tồn tại."
  },
  {
    "_id": "694137908c131588eaec679a",
    "language": "php",
    "lesson": "69399754cb8bff399ebd7285",
    "code_content": "<?php\n\n// 1. Lớp Cha\nclass Employee {\n    public $name;\n\n    public function __construct($name) {\n        $this->name = $name;\n    }\n\n    // Phương thức sẽ được ghi đè\n    public function getJobDescription() {\n        return \"Generic employee task\";\n    }\n}\n\n// 2. Lớp Con\nclass Developer extends Employee {\n    // Method Overriding: Ghi đè phương thức của lớp cha\n    public function getJobDescription() {\n        return \"Writing code and fixing bugs\";\n    }\n\n    // Phương thức riêng chỉ lớp con mới có\n    public function getMainLanguage() {\n        return \"PHP\";\n    }\n}\n\n// 3. Lớp Con khác\nclass Designer extends Employee {\n    public function getJobDescription() {\n        return \"Creating UI/UX designs\";\n    }\n}\n\n// --- MINH HỌA ---\n\n// Khởi tạo đối tượng lớp con\n$dev = new Developer(\"Alice\");\n\n/**\n * TRONG PHP: Upcasting diễn ra tự động khi ta truyền đối tượng \n * vào một hàm yêu cầu kiểu dữ liệu của lớp Cha (Type Hinting).\n */\nfunction printJob(Employee $emp) {\n    // Tại đây, $emp được coi là một Employee (Upcasting)\n    // Nhưng nhờ Đa hình, nó vẫn gọi đúng hàm của lớp con tương ứng\n    echo \"Name: \" . $emp->name . \" | Task: \" . $emp->getJobDescription() . \"\\n\";\n    \n    // Lưu ý: $emp->getMainLanguage(); // Sẽ gây lỗi vì kiểu Employee không có hàm này\n}\n\necho \"--- Upcasting & Overriding in PHP ---\\n\";\n\nprintJob($dev);               // Truyền Developer vào hàm nhận Employee\nprintJob(new Designer(\"Bob\")); // Truyền Designer vào hàm nhận Employee\n\n?>",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692ae7567fdaad24a2aec4f2",
    "lesson": "692ae7567fdaad24a2aec4f0",
    "language": "cpp",
    "code_content": "#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << \"Hello World!\";\n  return 0;\n}",
    "special_note": "C++ dùng hàm main() làm điểm bắt đầu.",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692ae7577fdaad24a2aec4f4",
    "lesson": "692ae7567fdaad24a2aec4f0",
    "language": "java",
    "code_content": "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello World!\");\n  }\n}",
    "special_note": "Java bắt buộc mọi thứ phải nằm trong Class.",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692ae7577fdaad24a2aec4f6",
    "lesson": "692ae7567fdaad24a2aec4f0",
    "language": "csharp",
    "code_content": "using System;\n\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Hello World!\");\n  }\n}",
    "special_note": "C# dùng namespace để quản lý code.",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692ae7577fdaad24a2aec4f8",
    "lesson": "692ae7567fdaad24a2aec4f0",
    "language": "dart",
    "code_content": "void main() {\n  print(\"Hello World!\");\n}",
    "special_note": "Dart có hàm main() độc lập.",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692ae7577fdaad24a2aec4fa",
    "lesson": "692ae7567fdaad24a2aec4f0",
    "language": "ruby",
    "code_content": "puts \"Hello World!\"",
    "special_note": "Ruby cú pháp rất ngắn gọn.",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692ae7577fdaad24a2aec4fc",
    "lesson": "692ae7567fdaad24a2aec4f0",
    "language": "php",
    "code_content": "<?php\necho \"Hello World!\";\n?>",
    "special_note": "PHP chạy phía server.",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692ae7577fdaad24a2aec500",
    "lesson": "692ae7577fdaad24a2aec4fe",
    "language": "cpp",
    "code_content": "class Car {\npublic:\n  string brand;\n};",
    "explanation": "Khai báo Class trong C++",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692b06feeaa2f83d2b96657e",
    "language": "cpp",
    "lesson": "692ae7577fdaad24a2aec50c",
    "code_content": "#include <iostream>\n#include <cmath>\n\n// Lớp trừu tượng\nclass Shape {\npublic:\n    virtual double calculateArea() const = 0;  // Phương thức thuần ảo\n};\n\n// Lớp triển khai cụ thể\nclass Circle : public Shape {\nprivate:\n    double radius;\npublic:\n    Circle(double r) : radius(r) {}\n    double calculateArea() const override {\n        return M_PI * radius * radius;  // Triển khai cụ thể\n    }\n};\n\n// Sử dụng\nint main() {\n    Shape* circle = new Circle(5);  // Trừu tượng: Chỉ biết là Shape\n    std::cout << \"Diện tích: \" << circle->calculateArea() << std::endl;  // Kết quả: ~78.54\n    delete circle;\n    return 0;\n}",
    "explanation": "Shape định nghĩa \"tính diện tích\" nhưng không chỉ rõ cách tính. Circle triển khai cụ thể nhưng người dùng chỉ tượng tác qua Shape bỏ qua chi tiết.",
    "is_supported": true,
    "syntax_note": ""
  }
];

const users = [
  {
    "_id": "692ae7557fdaad24a2aec4d5",
    "username": "admin",
    "password": "123456",
    "name": "Quản trị viên",
    "role": "admin"
  }
];

// --- HÀM SEED ---
const seedDB = async () => {
  try {
    console.log('⏳ Đang kết nối DB để seed...');
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
    console.log('✅ Đã kết nối!');

    // 1. Xóa dữ liệu cũ (Reset)
    console.log('🗑️ Đang xóa dữ liệu cũ...');
    await Promise.all([
      Chapter.deleteMany({}),
      KnowledgeType.deleteMany({}),
      Lesson.deleteMany({}),
      CodeExample.deleteMany({}),
      Language.deleteMany({}),
      User.deleteMany({}) 
    ]);

    // 2. Nạp dữ liệu mới
    console.log('🌱 Đang nạp dữ liệu Chapters...');
    await Chapter.insertMany(chapters);

    console.log('🌱 Đang nạp dữ liệu KnowledgeTypes...');
    await KnowledgeType.insertMany(types);
    
    console.log('🌱 Đang nạp dữ liệu Languages...');
    await Language.insertMany(languages);

    console.log('🌱 Đang nạp dữ liệu Lessons...');
    await Lesson.insertMany(lessons);

    console.log('🌱 Đang nạp dữ liệu CodeExamples...');
    await CodeExample.insertMany(examples);

    console.log('🌱 Đang nạp dữ liệu Users...');
    // Dùng create để kích hoạt hash password middleware nếu có
    for (const user of users) {
        await User.create(user); 
    }

    console.log('🎉 SEED DỮ LIỆU THÀNH CÔNG!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi seed:', error);
    process.exit(1);
  }
};

// Chỉ chạy hàm seed nếu file này được gọi trực tiếp (node seed.js)
// Không chạy nếu file này được import bởi file khác
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    seedDB();
}
