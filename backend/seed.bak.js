
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

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
    "_id": "cpp",
    "name": "C++"
  },
  {
    "_id": "csharp",
    "name": "C#"
  },
  {
    "_id": "java",
    "name": "Java"
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
    "_id": "php",
    "name": "PHP"
  }
];

const lessons = [
  {
    "_id": "692ae7567fdaad24a2aec4ee",
    "chapter": "692ae7567fdaad24a2aec4e0",
    "knowledge_type": "692ae7567fdaad24a2aec4d7",
    "title": "1.1 Giới thiệu Lập trình hướng đối tượng",
    "slug": "gioi-thieu-oop",
    "content": "\n        <p><strong>Lập trình hướng đối tượng (Object-Oriented Programming - OOP)</strong> là một mẫu hình lập trình dựa trên khái niệm \"công nghệ đối tượng\", mà trong đó, đối tượng (Object) chứa đựng dữ liệu, trên các trường, thường được gọi là các thuộc tính (attribute) và được tổ chức thành các phương thức (method).</p>\n        <p>Mục tiêu của OOP là quản lý độ phức tạp của phần mềm bằng cách mô hình hóa các thành phần thực tế thành các đối tượng phần mềm. Các đối tượng này tương tác với nhau để giải quyết vấn đề.</p>"
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
    "_id": "692ae7577fdaad24a2aec4fe",
    "chapter": "692ae7567fdaad24a2aec4e4",
    "knowledge_type": "692ae7567fdaad24a2aec4d7",
    "title": "3.1 Khái niệm Class & Object",
    "slug": "class-object",
    "content": "<p>Class là khuôn mẫu, Object là thực thể cụ thể được tạo ra từ khuôn mẫu đó.</p>"
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
    "_id": "692ae7577fdaad24a2aec50a",
    "chapter": "692ae7567fdaad24a2aec4e8",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "5.1 Khái niệm Đa hình (Polymorphism)",
    "slug": "tinh-da-hinh",
    "content": "<p>Đa hình cho phép các đối tượng khác nhau phản ứng khác nhau với cùng một thông điệp.</p>"
  },
  {
    "_id": "692ae7577fdaad24a2aec50c",
    "chapter": "692ae7567fdaad24a2aec4ea",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "6.1 Tính Trừu tượng (Abstraction)",
    "slug": "tinh-truu-tuong",
    "content": "<big><strong>1. Định nghĩa</strong></big><p>Trong Lập trình hướng đối tượng (OOP), <strong>Abstraction (Tính trừu tượng)</strong> là quá trình chọn lọc các đặc điểm chung, thiết yếu của một đối tượng để xây dựng mô hình, đồng thời <strong>ẩn đi các chi tiết thực thi phức tạp</strong> không cần thiết đối với người sử dụng.</p>\n<p>Tư duy cốt lõi của Abstraction là tập trung vào câu hỏi: <strong>&quot;Hệ thống này làm được cái gì?&quot; (WHAT)</strong> thay vì đi sâu vào việc <strong>&quot;Nó hoạt động chi tiết ra sao?&quot; (HOW)</strong>.</p><big><strong>2. Ví dụ thực tế: Chiếc xe hơi (Car)</big></strong><p>Để lái được xe, bạn không cần phải là một kỹ sư cơ khí. Đây là cách Abstraction hoạt động:</p>\n<ul>\n<li><strong>- Phần Trừu tượng (Giao diện):</strong> Vô lăng, Chân ga, Chân phanh. Đây là những thứ bạn tương tác. Bạn biết rằng đạp phanh thì xe sẽ dừng.</li>\n<li><strong>- Phần Ẩn (Triển khai):</strong> Hệ thống piston, trục khuỷu, cơ chế bơm xăng, hay hệ thống phanh ABS điện tử. Những thứ này cực kỳ phức tạp nhưng được giấu kín dưới nắp ca-pô.</li></ul>\n<big><strong>3. Tại sao Abstraction lại quan trọng?</big></strong><ul>\n<li><strong>- Giảm độ phức tạp (Complexity Management):</strong> Giúp lập trình viên không bị choáng ngợp bởi hàng nghìn dòng code chi tiết. Họ chỉ cần gọi hàm và tin tưởng nó chạy đúng.</li>\n<li><strong>- Tăng tính bảo mật (Security):</strong> Giấu đi các dữ liệu hoặc thuật toán nhạy cảm, chỉ lộ ra những gì an toàn cho người dùng cuối.</li>\n<li><strong>- Dễ dàng nâng cấp:</strong> Bạn có thể thay đổi hoàn toàn động cơ từ &quot;Xăng&quot; sang &quot;Điện&quot; (thay đổi Implementation) mà người lái xe không cần học lái lại từ đầu (Giao diện giữ nguyên).</li>\n</ul>\n<div style=\"background-color: #e8f4fd; border-left: 4px solid #3498db; padding: 10px; margin-top: 15px; font-size = 5px;\">\n<p><strong>Ghi nhớ: Nguyên tắc &quot;Tảng băng trôi&quot;:\"</strong></p>\n<ul>\n<li><strong>Phần nổi (Abstraction):</strong> Là những gì người dùng thấy và sử dụng (Giao diện, Tên hàm).</li>\n<li><strong>● Phần chìm (Implementation):</strong> Là logic phức tạp bên dưới (Code xử lý).</li>\n<li><strong>● Khẩu quyết:</strong> &quot;Quan tâm <strong>WHAT</strong> (Làm gì), bỏ qua <strong>HOW</strong> (Làm thế nào).&quot;</li>\n</ul>\n</div>"
  },
  {
    "_id": "692ae7577fdaad24a2aec50e",
    "chapter": "692ae7567fdaad24a2aec4ec",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "7.1 Khái niệm",
    "slug": "tinh-dong-goi-kn",
    "content": "<h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Định nghĩa Encapsulation</h2>\n<p>Đóng gói (Encapsulation), theo nghĩa đen, là hành động gói (bundle) dữ liệu (thuộc tính) và phương thức (hành vi) thành một đơn vị duy nhất: <strong>đối tượng (Object)</strong>.</p>\n<p>Hãy tưởng tượng đối tượng giống như một \"viên thuốc\" (capsule). Lớp vỏ bên ngoài bảo vệ các thành phần bên trong, ngăn chặn việc truy cập hoặc sửa đổi dữ liệu tùy tiện từ bên ngoài.</p>\n\n<h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Mục đích</h2>\n<p>Tính đóng gói mang lại các lợi ích chính:</p>\n<ul style=\"list-style-type: disc; margin-left: 20px;\">\n    <li><strong>Bảo vệ dữ liệu (Data Protection):</strong> Ngăn chặn việc gán giá trị sai quy tắc (ví dụ: tuổi âm, số dư âm), giúp đối tượng luôn ở trạng thái hợp lệ.</li>\n    <li><strong>Ẩn thông tin (Information Hiding):</strong> Che giấu sự phức tạp bên trong. Người dùng chỉ cần biết \"dùng như thế nào\" (qua hàm public) mà không cần quan tâm \"nó được lưu trữ ra sao\".</li>\n    <li><strong>Kiểm soát truy cập (Access Control):</strong> Giúp lập trình viên quyết định ai được phép xem, ai được phép sửa đổi dữ liệu.</li>\n</ul>\n\n<h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Vai trò</h2>\n<p>Đóng gói biến đối tượng thành một <strong>\"hộp đen\"</strong> (black box). Các thành phần bên ngoài chỉ giao tiếp với hộp này thông qua các nút bấm (giao diện) có sẵn mà không cần nhìn thấy cấu tạo bên trong.</p>\n<ul style=\"list-style-type: disc; margin-left: 20px;\">\n    <li><strong>Dễ bảo trì:</strong> Sửa logic bên trong không làm ảnh hưởng đến code bên ngoài, miễn là các \"nút bấm\" không đổi.</li>\n    <li><strong>Dễ kiểm thử:</strong> Dữ liệu và hành vi được cô lập trong từng Class, giúp việc tìm và sửa lỗi dễ dàng hơn.</li>\n</ul>\n\n<div style=\"background-color: #e8f4fd; border-left: 4px solid #3498db; padding: 10px; margin-top: 15px;\">\n    <strong>Ghi nhớ:</strong> Tính đóng gói giống như việc sử dụng một chiếc TV. Bạn chỉ cần dùng điều khiển (Remote) để chuyển kênh, tăng âm lượng mà không cần tháo vỏ TV ra để nối dây điện bên trong.\n</div>"
  },
  {
    "_id": "692ae7577fdaad24a2aec510",
    "chapter": "692ae7567fdaad24a2aec4e4",
    "knowledge_type": "692ae7567fdaad24a2aec4db",
    "title": "Bài tập: Quản lý sinh viên bằng Class",
    "slug": "bai-tap-class",
    "content": "<p>Đề bài: Viết chương trình tạo class Student...</p>"
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
    "_id": "692b1bf0c5044e5f5eff746d",
    "chapter": "692ae7567fdaad24a2aec4ec",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "7.3 Data Hiding",
    "slug": "tinh-dong-goi-hd",
    "content": "<h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Tại sao biến không nên để public?</h2>\n<p>Khi bạn để một biến là <code>public</code>, bạn mất hoàn toàn quyền kiểm soát nó. Bất kỳ ai cũng có thể gán giá trị sai, gây lỗi logic nghiêm trọng cho chương trình.</p>\n\n<h2 style=\"font-weight: bold; font-size: 1.5em; margin-top: 20px; color: #2c3e50;\">Nguyên tắc ẩn dữ liệu (Data Hiding)</h2>\n<p>Nguyên tắc vàng trong OOP: <strong>Thuộc tính nên là <code>private</code>, phương thức giao tiếp nên là <code>public</code>.</strong></p>\n<p>Điều này giúp:</p>\n<ul style=\"list-style-type: disc; margin-left: 20px;\">\n    <li><strong>Kiểm soát dữ liệu đầu vào:</strong> Chỉ chấp nhận giá trị hợp lệ.</li>\n    <li><strong>Bảo vệ toàn vẹn dữ liệu:</strong> Ngăn chặn truy cập trái phép.</li>\n    <li><strong>Dễ bảo trì:</strong> Thay đổi logic bên trong không ảnh hưởng bên ngoài.</li>\n</ul>\n\n<div style=\"background-color: #e8f4fd; border-left: 4px solid #3498db; padding: 10px; margin-top: 15px;\">\n    <strong>Ghi nhớ:</strong> Đóng gói biến đối tượng thành một chiếc \"hộp đen\". Người dùng chỉ cần biết các nút bấm (hàm public) mà không cần quan tâm đến dây điện bên trong (biến private).\n</div>"
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
    "_id": "692b1c28c5044e5f5eff746f",
    "chapter": "692ae7567fdaad24a2aec4ec",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "7.5 Tổng kết",
    "slug": "tinh-dong-goi-tk",
    "content": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Chương 3: Tính Đóng Gói - Tổng Kết</title>\n</head>\n<body>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">Điểm cốt lõi cần nhớ</h2>\n    <p>Tính đóng gói không phải là cấm đoán truy cập, mà là <strong>quản lý truy cập</strong>. Nó giúp mã nguồn của bạn trở nên chuyên nghiệp, an toàn và dễ sửa lỗi hơn.</p>\n    <blockquote>\n        <p><strong>Công thức Đóng gói = Dữ liệu Private + Phương thức Public (Getter/Setter).</strong></p>\n    </blockquote>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">Vai trò của đóng gói trong 4 tính chất OOP</h2>\n    <p>Đóng gói là nền tảng đầu tiên để xây dựng một đối tượng hoàn chỉnh:</p>\n    <ul>\n        <li>Nó tạo ra ranh giới rõ ràng cho đối tượng.</li>\n        <li>Nó chuẩn bị cơ sở dữ liệu an toàn để các tính chất khác như Kế thừa và Đa hình có thể hoạt động chính xác mà không lo ngại dữ liệu bị hỏng hóc từ bên trong.</li>\n    </ul>\n\n    <h2 style=\"font-weight: bold; font-size: 1.5em;\">Đóng gói và Trừu tượng: Khác nhau thế nào?</h2>\n    <p>Sinh viên thường hay nhầm lẫn hai khái niệm này. Cách đơn giản nhất để phân biệt:</p>\n    <ul>\n        <li><strong>Tính trừu tượng (Abstraction):</strong> Là về mặt <em>thiết kế</em>. Giúp người dùng chỉ nhìn thấy những gì họ CẦN thấy (đơn giản hóa).</li>\n        <li><strong>Tính đóng gói (Encapsulation):</strong> Là về mặt <em>thực thi</em>. Giúp bảo vệ những gì người dùng KHÔNG CẦN (và không nên) thấy (an toàn dữ liệu).</li>\n    </ul>\n\n</body>\n</html>"
  },
  {
    "_id": "692bb799a0a7add9d4493891",
    "chapter": "692ae7567fdaad24a2aec4ea",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "6.2 Phương thức trừu tượng (Abstraction Method)",
    "slug": "phuong-thuc-truu-tuong",
    "content": "<p><strong>1. Định nghĩa:</strong> Là một hàm chỉ có tên, kiểu dữ liệu trả về và tham số đầu vào, nhưng <strong>hoàn toàn không có nội dung (body)</strong>.</p><p><strong>2. Ý nghĩa:</strong> Giống như một lời tuyên bố: <em>&quot;Tôi yêu cầu chức năng này phải có, nhưng cụ thể làm thế nào thì để các lớp con tự quyết định.&quot;</em></p><p><strong>3. Ví dụ:</strong> Hàm <code>tinhDienTich()</code>.</p>\n<ul>\n<li style=\"padding-left=10px;>● Lớp cha (Hình học): Chỉ khai báo tên hàm.</li><li>Lớp con (Hình tròn): Viết công thức S = π x r².</li>\n<li style=\"padding-left=10px;>● Lớp con (Hình vuông): Viết công thức S = a².</li>\n</ul>"
  },
  {
    "_id": "692bb7dba0a7add9d4493892",
    "chapter": "692ae7567fdaad24a2aec4ea",
    "knowledge_type": "692ae7567fdaad24a2aec4d9",
    "title": "6.3 Lớp trừu tượng và interface",
    "slug": "lop-truu-tuong-va-interface",
    "content": "<p><strong>1. Bản chất:</strong> Abstraction là kỹ thuật ẩn đi các chi tiết xử lý phức tạp bên dưới và chỉ cung cấp những tính năng cần thiết ra bên ngoài.</p><p><strong>2. Mục tiêu:</strong> Giúp người dùng tập trung vào việc <em>&quot;đối tượng làm được gì&quot;</em> thay vì <em>&quot;nó làm như thế nào&quot;</em>.</p><p><strong>3. Ví dụ thực tế:</strong> Chiếc điều khiển Tivi (Remote).</p>\n<ul>\n<li style=\"padding-left=10px;\">● Người dùng thấy: Các nút bấm (Tăng âm lượng, Chuyển kênh).</li>\n<li style=\"padding-left=10px;\">● Bị ẩn đi: Mạch điện tử phát tín hiệu hồng ngoại và cách Tivi giải mã tín hiệu đó.</li>\n</ul>"
  }
];

const examples = [
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
    "_id": "692ae7577fdaad24a2aec502",
    "lesson": "692ae7577fdaad24a2aec4fe",
    "language": "java",
    "code_content": "public class Car {\n  String brand;\n}",
    "explanation": "Khai báo Class trong Java",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692ae7577fdaad24a2aec506",
    "lesson": "692ae7577fdaad24a2aec504",
    "language": "cpp",
    "code_content": "class Dog : public Animal { ... };",
    "explanation": "C++ dùng dấu hai chấm :",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692ae7577fdaad24a2aec508",
    "lesson": "692ae7577fdaad24a2aec504",
    "language": "java",
    "code_content": "class Dog extends Animal { ... }",
    "explanation": "Java dùng từ khóa extends",
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
  },
  {
    "_id": "692b0707eaa2f83d2b96657f",
    "language": "csharp",
    "lesson": "692ae7577fdaad24a2aec50c",
    "code_content": "using System;\n\n// Giao diện trừu tượng\npublic interface IShape {\n    double CalculateArea();  // Phương thức trừu tượng\n}\n\n// Lớp triển khai cụ thể\npublic class Circle : IShape {\n    private double radius;\n\n    public Circle(double radius) {\n        this.radius = radius;\n    }\n\n    public double CalculateArea() {\n        return Math.PI * radius * radius;  // Triển khai cụ thể\n    }\n}\n\n// Sử dụng\nclass Program {\n    static void Main(string[] args) {\n        IShape circle = new Circle(5);  // Trừu tượng: Chỉ biết là IShape\n        Console.WriteLine(\"Diện tích: \" + circle.CalculateArea());  // Kết quả: ~78.54\n    }\n}",
    "explanation": "Shape định nghĩa \"tính diện tích\" nhưng không chỉ rõ cách tính. Circle triển khai cụ thể nhưng người dùng chỉ tượng tác qua Shape bỏ qua chi tiết.",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692b0712eaa2f83d2b966580",
    "lesson": "692ae7577fdaad24a2aec50c",
    "language": "ruby",
    "code_content": "# Module trừu tượng (tương tự interface)\nmodule Shape\n  def calculate_area\n    raise NotImplementedError, \"Phương thức calculate_area phải được triển khai\"\n  end\nend\n\n// Lớp triển khai cụ thể\nclass Circle\n  include Shape\n\n  def initialize(radius)\n    @radius = radius\n  end\n\n  def calculate_area\n    Math::PI * @radius * @radius  # Triển khai cụ thể\n  end\nend\n\n// Sử dụng\ncircle = Circle.new(5)  # Trừu tượng: Sử dụng qua module Shape\nputs \"Diện tích: #{circle.calculate_area}\"  # Kết quả: ~78.54",
    "explanation": "Shape định nghĩa \"tính diện tích\" nhưng không chỉ rõ cách tính. Circle triển khai cụ thể nhưng người dùng chỉ tượng tác qua Shape bỏ qua chi tiết.",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692b071deaa2f83d2b966581",
    "language": "php",
    "lesson": "692ae7577fdaad24a2aec50c",
    "code_content": "<?php\n\n// Interface trừu tượng\ninterface Shape {\n    public function calculateArea();  // Phương thức trừu tượng\n}\n\n// Lớp triển khai cụ thể\nclass Circle implements Shape {\n    private $radius;\n\n    public function __construct($radius) {\n        $this->radius = $radius;\n    }\n\n    public function calculateArea() {\n        return pi() * $this->radius * $this->radius;  // Triển khai cụ thể\n    }\n}\n\n// Sử dụng\n$circle = new Circle(5);  // Trừu tượng: Sử dụng qua interface Shape\necho \"Diện tích: \" . $circle->calculateArea();  // Kết quả: ~78.54\n?>",
    "explanation": "Shape định nghĩa \"tính diện tích\" nhưng không chỉ rõ cách tính. Circle triển khai cụ thể nhưng người dùng chỉ tượng tác qua Shape bỏ qua chi tiết.",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692b072eeaa2f83d2b966582",
    "language": "dart",
    "lesson": "692ae7577fdaad24a2aec50c",
    "code_content": "import 'dart:math';\n\n// Lớp trừu tượng\nabstract class Shape {\n  double calculateArea();  // Phương thức trừu tượng\n}\n\n// Lớp triển khai cụ thể\nclass Circle extends Shape {\n  double radius;\n\n  Circle(this.radius);\n\n  @override\n  double calculateArea() {\n    return pi * radius * radius;  // Triển khai cụ thể\n  }\n}\n\n// Sử dụng\nvoid main() {\n  Shape circle = Circle(5);  // Trừu tượng: Chỉ biết là Shape\n  print(\"Diện tích: ${circle.calculateArea()}\");  // Kết quả: ~78.54\n}",
    "explanation": "Shape định nghĩa \"tính diện tích\" nhưng không chỉ rõ cách tính. Circle triển khai cụ thể nhưng người dùng chỉ tượng tác qua Shape bỏ qua chi tiết.",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692b32adeaa2f83d2b966590",
    "language": "java",
    "lesson": "692b1c06c5044e5f5eff746e",
    "code_content": "// Ví dụ Getter Setter trong Java\npublic class Person {\n    private String name;\n    // Getter\n    public String getName() {\n        return name;\n    }\n    // Setter\n    public void setName(String newName) {\n        this.name = newName;\n    }\n}",
    "explanation": "Ví dụ cơ bản về Getter Setter",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692b33b6eaa2f83d2b966591",
    "language": "dart",
    "lesson": "692b1b8ec5044e5f5eff746c",
    "code_content": "// Trong Dart, thuộc tính bắt đầu bằng _ là private\nclass BankAccount {\n  double _balance = 0.0;\n}",
    "explanation": "Ví dụ về Access Modifier trong Dart",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692b3591eaa2f83d2b966593",
    "language": "cpp",
    "lesson": "692ae7577fdaad24a2aec50a",
    "code_content": "// Ví dụ đa hình C++\nclass Animal {\npublic:\n  virtual void sound() {\n    cout << \"Animal sound\" << endl;\n  }\n};\nclass Dog : public Animal {\npublic:\n  void sound() override {\n    cout << \"Woof\" << endl;\n  }\n};",
    "explanation": "Ví dụ về tính đa hình",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692b3ea6eaa2f83d2b966594",
    "language": "cpp",
    "lesson": "692b1bf0c5044e5f5eff746d",
    "code_content": "#include <iostream>\nusing namespace std;\n\n// 1. CÁCH LÀM SAI: Dùng public\nclass TaiKhoanSai {\npublic:\n    double soDu; // Nguy hiểm! Ai cũng sửa được\n};\n\n// 2. CÁCH LÀM ĐÚNG: Dùng private + Encapsulation\nclass TaiKhoanDung {\nprivate:\n    double soDu; // Chỉ nội bộ class mới thấy\n\npublic:\n    // Constructor: Khởi tạo giá trị ban đầu\n    TaiKhoanDung() {\n        soDu = 0.0;\n    }\n\n    // Setter: Kiểm soát việc thay đổi dữ liệu\n    void NapTien(double tien) {\n        if (tien > 0) {\n            soDu += tien;\n            cout << \"Da nap: \" << tien << endl;\n        } else {\n            cout << \"Loi: So tien nap phai duong!\" << endl;\n        }\n    }\n\n    // Getter: Chỉ cho phép xem, không cho sửa trực tiếp\n    double laySoDu() {\n        return soDu;\n    }\n};\n\nint main() {\n    // --- Test Class Sai ---\n    TaiKhoanSai tk1;\n    tk1.soDu = -1000000; // LỖI: Gán số âm vô lý nhưng chương trình vẫn chạy!\n    \n    // --- Test Class Đúng ---\n    TaiKhoanDung tk2;\n    // tk2.soDu = 100; // Lỗi biên dịch ngay lập tức (vì là private)\n    \n    tk2.NapTien(500000);   // Hợp lệ\n    tk2.NapTien(-200000);  // Bị chặn bởi logic trong Setter\n    \n    cout << \"So du hien tai: \" << tk2.laySoDu() << endl;\n    return 0;\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692b412eeaa2f83d2b966595",
    "language": "java",
    "lesson": "692b1bf0c5044e5f5eff746d",
    "code_content": "public class Main {\n    // 1. CÁCH LÀM SAI: Dùng public\n    static class TaiKhoanSai {\n        public double soDu; // Nguy hiểm!\n    }\n\n    // 2. CÁCH LÀM ĐÚNG: Dùng private + Encapsulation\n    static class TaiKhoanDung {\n        private double soDu; // Chỉ nội bộ class mới thấy\n\n        public TaiKhoanDung() {\n            this.soDu = 0.0;\n        }\n\n        public void napTien(double tien) {\n            if (tien > 0) {\n                this.soDu += tien;\n                System.out.println(\"Da nap: \" + tien);\n            } else {\n                System.out.println(\"Loi: So tien nap phai duong!\");\n            }\n        }\n\n        public double laySoDu() {\n            return this.soDu;\n        }\n    }\n\n    public static void main(String[] args) {\n        // --- Test Class Sai ---\n        TaiKhoanSai tk1 = new TaiKhoanSai();\n        tk1.soDu = -1000000; // LỖI LOGIC: Gán trực tiếp số âm\n\n        // --- Test Class Đúng ---\n        TaiKhoanDung tk2 = new TaiKhoanDung();\n        // tk2.soDu = 100; // Lỗi biên dịch nếu bỏ comment (vì là private)\n\n        tk2.napTien(500000);\n        tk2.napTien(-200000); // Bị chặn\n\n        System.out.println(\"So du hien tai: \" + tk2.laySoDu());\n    }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692b413eeaa2f83d2b966596",
    "language": "csharp",
    "lesson": "692b1bf0c5044e5f5eff746d",
    "code_content": "using System;\n\nclass Program {\n    // 1. CÁCH LÀM SAI\n    class TaiKhoanSai {\n        public double soDu; // Ai cũng sửa được\n    }\n\n    // 2. CÁCH LÀM ĐÚNG\n    class TaiKhoanDung {\n        private double soDu; // Biến private\n\n        public TaiKhoanDung() {\n            soDu = 0.0;\n        }\n\n        public void NapTien(double tien) {\n            if (tien > 0) {\n                soDu += tien;\n                Console.WriteLine(\"Da nap: \" + tien);\n            } else {\n                Console.WriteLine(\"Loi: So tien nap phai duong!\");\n            }\n        }\n\n        public double LaySoDu() {\n            return soDu;\n        }\n    }\n\n    static void Main(string[] args) {\n        // --- Test Sai ---\n        TaiKhoanSai tk1 = new TaiKhoanSai();\n        tk1.soDu = -1000000; // Gán thoải mái -> Lỗi\n\n        // --- Test Đúng ---\n        TaiKhoanDung tk2 = new TaiKhoanDung();\n        // tk2.soDu = 100; // Lỗi biên dịch ngay lập tức\n\n        tk2.NapTien(500000);\n        tk2.NapTien(-200000); // Bị chặn\n\n        Console.WriteLine(\"So du hien tai: \" + tk2.LaySoDu());\n    }\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692b414feaa2f83d2b966597",
    "lesson": "692b1bf0c5044e5f5eff746d",
    "language": "dart",
    "code_content": "// Giả sử đây là file taikhoan.dart\n\n// 1. CÁCH LÀM SAI\nclass TaiKhoanSai {\n  double soDu = 0.0; // Public mặc định\n}\n\n// 2. CÁCH LÀM ĐÚNG\nclass TaiKhoanDung {\n  double _soDu = 0.0; // Dấu gạch dưới (_) nghĩa là Private\n\n  void napTien(double tien) {\n    if (tien > 0) {\n      _soDu += tien;\n      print(\"Da nap: $tien\");\n    } else {\n      print(\"Loi: So tien nap phai duong!\");\n    }\n  }\n\n  double laySoDu() {\n    return _soDu;\n  }\n}\n\nvoid main() {\n  var tk1 = TaiKhoanSai();\n  tk1.soDu = -1000000; // Lỗi logic\n\n  var tk2 = TaiKhoanDung();\n  // tk2._soDu = 100; // Sẽ báo lỗi nếu truy cập từ file khác\n  \n  tk2.napTien(500000);\n  print(\"So du hien tai: ${tk2.laySoDu()}\");\n}",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692b4163eaa2f83d2b966598",
    "language": "php",
    "lesson": "692b1bf0c5044e5f5eff746d",
    "code_content": "<?php\n\n// 1. CÁCH LÀM SAI\nclass TaiKhoanSai {\n    public $soDu;\n}\n\n// 2. CÁCH LÀM ĐÚNG\nclass TaiKhoanDung {\n    private $soDu;\n\n    public function __construct() {\n        $this->soDu = 0.0;\n    }\n\n    public function napTien($tien) {\n        if ($tien > 0) {\n            $this->soDu += $tien;\n            echo \"Da nap: $tien\\n\";\n        } else {\n            echo \"Loi: So tien nap phai duong!\\n\";\n        }\n    }\n\n    public function laySoDu() {\n        return $this->soDu;\n    }\n}\n\n// --- Test ---\n$tk1 = new TaiKhoanSai();\n$tk1->soDu = -1000000; // Sai!\n\n$tk2 = new TaiKhoanDung();\n// $tk2->soDu = 100; // Lỗi Fatal Error vì truy cập property private\n\n$tk2->napTien(500000);\necho \"So du hien tai: \" . $tk2->laySoDu();\n?>",
    "explanation": "",
    "is_supported": true,
    "syntax_note": ""
  },
  {
    "_id": "692b4178eaa2f83d2b966599",
    "lesson": "692b1bf0c5044e5f5eff746d",
    "language": "ruby",
    "code_content": "# 1. CÁCH LÀM SAI: Mở quyền truy cập thoải mái\nclass TaiKhoanSai\n  attr_accessor :so_du # Tự động tạo Getter & Setter public\nend\n\n# 2. CÁCH LÀM ĐÚNG\nclass TaiKhoanDung\n  def initialize\n    @so_du = 0.0 # Biến instance mặc định là private\n  end\n\n  def nap_tien(tien)\n    if tien > 0\n      @so_du += tien\n      puts \"Da nap: #{tien}\"\n    else\n      puts \"Loi: So tien nap phai duong!\"\n    end\n  end\n\n  # Getter thủ công (chỉ cho xem)\n  def so_du\n    @so_du\n  end\nend\n\n# --- Test ---\ntk1 = TaiKhoanSai.new\ntk1.so_du = -1000000 # Gán vô tư -> Lỗi logic\n\ntk2 = TaiKhoanDung.new\n# tk2.so_du = 100 # Lỗi NoMethodError vì không có setter\n\ntk2.nap_tien(500000)\nputs \"So du hien tai: #{tk2.so_du}\"",
    "explanation": "",
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
      User.deleteMany({}) // Xóa Users cũ
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
    await User.insertMany(users);

    console.log('🎉 SEED DỮ LIỆU THÀNH CÔNG!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi seed:', error);
    process.exit(1);
  }
};

seedDB();
