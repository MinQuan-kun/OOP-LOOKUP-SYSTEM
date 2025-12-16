import express from "express";
import { createChapter, deleteChapter } from "../controllers/ChapterController.js";

const router = express.Router();

router.post("/", createChapter);       
router.delete("/:id", deleteChapter); 

export default router;