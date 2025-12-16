import express from "express";
import { 
  getKnowledgeTree, 
  getLessonDetail, 
  searchLessons,
  updateLesson,
  createLesson,
  deleteLesson
} from "../controllers/LessonControllers.js";

const router = express.Router();

// 1. Lấy cây kiến thức (Sidebar)
router.get("/tree", getKnowledgeTree);

// 2. Tìm kiếm
router.get("/search", searchLessons);

// 3. Lấy chi tiết bài học
router.get("/:slug", getLessonDetail);

// 4. Cập nhật bài học
router.put("/:id", updateLesson);

// 5. Tạo bài học mới
router.post("/", createLesson);  

// 6. Xóa bài học
router.delete("/:id", deleteLesson);
export default router;