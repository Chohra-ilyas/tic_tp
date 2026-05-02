import { Router } from "express";
import {
  createDepartment,
  getAllDepartments,
} from "../controller/departmentController.js";

const router = Router();

router.post("/", createDepartment);
router.get("/", getAllDepartments);

export default router;
