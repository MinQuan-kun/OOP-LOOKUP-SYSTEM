import express from "express";
import { createChapter, deleteChapter } from "../controllers/ChapterController.js";

const router = express.Router();

router.post("/", createChapter);       // POST /api/chapter
router.delete("/:id", deleteChapter);  // DELETE /api/chapter/:id

export default router;