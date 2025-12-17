import express from "express";
import {
  getKnowledgeTree,
  getLessonDetail,
  searchLessons,
  searchLessonsAStar,
  updateLesson,
  createLesson,
  deleteLesson,
} from "../controllers/LessonControllers.js";

const router = express.Router();

// 1. Lấy cây kiến thức (Sidebar)
router.get("/tree", getKnowledgeTree);

// 2. Tìm kiếm AI (Cho Sidebar phải)
router.get("/search", searchLessons);

// 3 Tìm kiếm A* (Cho Main Content)
router.get("/search-astar", searchLessonsAStar);

// 4. Lấy chi tiết bài học
router.get("/:slug", getLessonDetail);

// 5. Cập nhật bài học
router.put("/:id", updateLesson);

// 6. Tạo bài học mới
router.post("/", createLesson);

// 7. Xóa bài học
router.delete("/:id", deleteLesson);

export default router;
