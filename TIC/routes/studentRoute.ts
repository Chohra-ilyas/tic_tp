import { Router } from "express";
import {
  createStudent,
  getAllStudents,
} from "../controller/studentController.js";

const router = Router();

router.post("/", createStudent);
router.get("/", getAllStudents);

export default router;
