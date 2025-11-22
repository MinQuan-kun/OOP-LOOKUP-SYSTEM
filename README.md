# 🔍 **OOP Lookup System**

[![React](https://img.shields.io/badge/React-18-blue?logo=react\&logoColor=white)]()
[![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js\&logoColor=white)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-darkgreen?logo=mongodb\&logoColor=white)]()
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-teal?logo=tailwindcss\&logoColor=white)]()
[![ShadCN](https://img.shields.io/badge/ShadCN-UI-purple)]()
[![Docker](https://img.shields.io/badge/Docker-Compose-blue?logo=docker\&logoColor=white)]()

---

## 📌 **Giới thiệu**

**OOP Lookup System** là đồ án môn trí tuệ nhân tạo, tra cứu kiến thức Lập trình Hướng Đối Tượng (OOP) thông qua giao diện web, hỗ trợ:

* Xem các khái niệm OOP theo chương/mục.
* Tìm kiếm và tra cứu nhanh.
* Giao diện hiện đại, tương thích mọi thiết bị.

### 🔧 Thành phần hệ thống

* **Frontend**: React + TailwindCSS 4 + ShadCN UI
* **Backend**: Node.js + Express
* **Database**: MongoDB
* **Triển khai**: Docker Compose hoặc chạy thủ công

---

## ⚙️ **Công nghệ sử dụng**

| Công nghệ          | Vai trò                           |
| ------------------ | --------------------------------- |
| **React**          | Xây dựng giao diện người dùng     |
| **ExpressJS**      | Server Backend API                |
| **MongoDB**        | Lưu trữ dữ liệu chương/mục        |
| **TailwindCSS 4**  | Tối ưu UI nhanh & responsive      |
| **ShadCN UI**      | Component hiện đại, dễ tùy chỉnh  |
| **Docker Compose** | Triển khai nhanh toàn bộ hệ thống |

---

# 🚀 **Cách chạy dự án**

Bạn có **2 cách chạy**:

---

# 🅰️ **Cách 1 — Chạy nhanh bằng Docker (Khuyến nghị)**

### 1️⃣ Clone dự án

```bash
https://github.com/MinQuan-kun/OOP-LOOKUP-SYSTEM.git
cd oop-lookup-system
```

### 2️⃣ Chạy toàn bộ bằng Docker (MongoDB + Backend + Frontend)

Nếu đang dùng Windows, chỉ cần chạy:

```bash
start.bat
```

Hoặc chạy thủ công:

```bash
docker compose up --build -d
```

### 3️⃣ Kiểm tra container

```bash
docker ps
```

### 4️⃣ Truy cập ứng dụng

| Thành phần  | URL                                                    |
| ----------- | ------------------------------------------------------ |
| Frontend    | [http://localhost:5173](http://localhost:5173)         |
| Backend API | [http://localhost:5001/api](http://localhost:5001/api) |
| MongoDB     | chạy trong container `oop-mongodb`                     |

### 5️⃣ Dừng ứng dụng

```bash
docker compose down
```

---

# 🅱️ **Cách 2 — Chạy thủ công không dùng Docker**

Nếu máy bạn **không có Docker**, dùng cách này.

### 1️⃣ Cài package cho cả frontend & backend

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2️⃣ Chạy Backend

```bash
cd backend
npm run dev
```

Backend mặc định chạy tại:

👉 [http://localhost:5001](http://localhost:5001)

### 3️⃣ Chạy Frontend

Mở terminal mới:

```bash
cd frontend
npm run dev
```

Frontend chạy tại:

👉 [http://localhost:5173](http://localhost:5173)

---

## 📂 **Cấu trúc thư mục**

```
oop-lookup-system/
│
├── backend/        # Node.js + Express API
├── frontend/       # React + Tailwind + ShadCN UI
├── start.bat       # Chạy Docker nhanh trên Windows
├── docker-compose.yml
└── README.md
```

---

## 🧰 **Lệnh hữu ích**

| Mục tiêu             | Lệnh                            |
| -------------------- | ------------------------------- |
| Build Docker         | `docker compose build`          |
| Xóa container        | `docker compose down`           |
| Xóa toàn bộ + volume | `docker compose down --volumes` |
| Cài frontend         | `npm install`                   |
| Chạy backend         | `npm run dev`                   |

---

