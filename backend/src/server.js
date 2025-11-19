import express from "express";
import LessonRoute from "./routes/LessonRouter.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

const __dirname = path.resolve();
const envFile = process.env.NODE_ENV === "production" ? ".env" : ".env.development";
dotenv.config({ path: path.resolve(__dirname, envFile) });

const PORT = process.env.PORT || 5001;

const app = express();

// 2. Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" 
      ? "*"
      : "http://localhost:5173", // URL của Frontend Vite
    credentials: true
  })
);

app.use("/api/lesson", LessonRoute)

console.log(`Đang kết nối đến MongoDB... (${process.env.MONGODB_CONNECT_STRING})`);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server đang chạy tại: http://localhost:${PORT}`);
      console.log(`Môi trường: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch((err) => {
    console.error("❌ Lỗi kết nối MongoDB:", err.message);
    process.exit(1);
  });
