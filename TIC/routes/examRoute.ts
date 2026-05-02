import { Router } from "express";
import { createExam, getAllExams } from "../controller/examController.js";

const router = Router();

router.post("/", createExam);
router.get("/", getAllExams);

export default router;
