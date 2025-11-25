import express from "express";
import { 
  getKnowledgeTree, 
  getLessonDetail, 
  searchLessons,
  updateLesson
} from "../controllers/LessonControllers.js";

const router = express.Router();

// Định nghĩa các route

// 1. Lấy cây kiến thức (Sidebar)
router.get("/tree", getKnowledgeTree);

// 2. Tìm kiếm (Đặt trước route /:slug để tránh nhầm lẫn search là slug)
router.get("/search", searchLessons);

// 3. Lấy chi tiết bài học (Vd: /api/lesson/tinh-ke-thua?lang=java)
router.get("/:slug", getLessonDetail);

// 4. Cập nhật bài học
router.put("/:id", updateLesson);
export default router;