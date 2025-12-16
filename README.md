# 🔍 **OOP Lookup System**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)]()
[![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)]()
[![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js&logoColor=white)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-darkgreen?logo=mongodb&logoColor=white)]()
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-teal?logo=tailwindcss&logoColor=white)]()
[![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange?logo=google&logoColor=white)]()
[![Docker](https://img.shields.io/badge/Docker-Compose-blue?logo=docker&logoColor=white)]()

---

## 📌 **Giới thiệu**

**OOP Lookup System** là đồ án môn Trí tuệ nhân tạo, hệ thống tra cứu kiến thức Lập trình Hướng Đối Tượng (OOP) thông minh, tích hợp:

* 🧠 **Trợ lý ảo AI (Chatbot):** Giải đáp thắc mắc về OOP theo thời gian thực sử dụng Google Gemini.
* 📚 **Tra cứu kiến thức:** Xem các khái niệm OOP theo cấu trúc chương/mục chi tiết.
* 🚀 **Công nghệ hiện đại:** Sử dụng Next.js (App Router) cho tốc độ tải trang nhanh và chuẩn SEO.

### 🔧 Thành phần hệ thống

* **Frontend**: Next.js 15 (App Router) + TailwindCSS 4 + ShadCN UI
* **Backend**: Node.js + Express (Proxy AI Server)
* **Database**: MongoDB (Lưu trữ bài học & lịch sử chat)
* **AI Engine**: Google Gemini Pro API
* **Triển khai**: Docker Compose

---

## ⚙️ **Công nghệ sử dụng**

| Công nghệ          | Vai trò                           |
| ------------------ | --------------------------------- |
| **Next.js 15** | Framework Fullstack (SSR + CSR)   |
| **Google Gemini** | Trí tuệ nhân tạo (Chatbot)        |
| **ExpressJS** | Server Backend API & Auth         |
| **MongoDB** | Lưu trữ dữ liệu phi cấu trúc      |
| **TailwindCSS 4** | Tối ưu UI nhanh & responsive      |
| **Docker Compose** | Triển khai nhanh toàn bộ hệ thống |

---

# 🚀 **Cách chạy dự án**

Bạn có **2 cách chạy**:

---

# 🅰️ **Cách 1 — Chạy nhanh bằng Docker (Khuyến nghị)**

### 1️⃣ Clone dự án

```bash
git clone [https://github.com/MinQuan-kun/OOP-LOOKUP-SYSTEM.git](https://github.com/MinQuan-kun/OOP-LOOKUP-SYSTEM.git)
cd oop-lookup-system
````

### 2️⃣ Chạy toàn bộ bằng Docker (MongoDB + Backend + Frontend)

Nếu đang dùng Windows, chỉ cần chạy file batch:

```bash
start.bat
```

Hoặc chạy lệnh thủ công (cho Mac/Linux):

```bash
docker compose up --build -d
```

### 3️⃣ Truy cập ứng dụng

| Thành phần  | URL                                                    |
| ----------- | ------------------------------------------------------ |
| Frontend    | [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)         |
| Backend API | [http://localhost:5001/api](https://www.google.com/search?q=http://localhost:5001/api) |
| MongoDB     | `mongodb://localhost:27017`                            |

### 4️⃣ Dừng ứng dụng

```bash
docker compose down
```

-----

# 🅱️ **Cách 2 — Chạy thủ công không dùng Docker**

Nếu máy bạn **không có Docker** hoặc muốn chạy môi trường phát triển (Dev).

### 1️⃣ Cài đặt Dependencies

**Backend:**

```bash
cd backend
npm install
# Tạo file .env và điền GEMINI_API_KEY nếu cần
```

**Frontend:**

```bash
cd ../frontend
npm install
```

### 2️⃣ Chạy Backend

Mở terminal 1:

```bash
cd backend
npm run dev
```

👉 Server chạy tại: [http://localhost:5001](https://www.google.com/search?q=http://localhost:5001)

### 3️⃣ Chạy Frontend (Next.js)

Mở terminal 2:

```bash
cd frontend
npm run dev
```

👉 Web chạy tại: [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)

-----

## 📂 **Cấu trúc thư mục**

```
oop-lookup-system/
│
├── backend/        # Express API + AI Controller
├── frontend/       # Next.js App Router Source Code
├── start.bat       # Script khởi động nhanh (Windows)
├── docker-compose.yml
└── README.md
```

-----

## 🧰 **Lệnh hữu ích**

| Mục tiêu             | Lệnh                            |
| -------------------- | ------------------------------- |
| Build Docker (Sạch)  | `docker compose build --no-cache`|
| Xem logs             | `docker compose logs -f`        |
| Cài thư viện         | `npm install`                   |
| Chạy Dev Mode        | `npm run dev`                   |


