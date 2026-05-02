import { Router } from "express";
import {
  createTeacher,
  getAllTeachers,
} from "../controller/teacherController.js";

const router = Router();

router.post("/", createTeacher);
router.get("/", getAllTeachers);

export default router;
