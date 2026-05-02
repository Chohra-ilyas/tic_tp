import { Router } from "express";
import {
  createAlert,
  getAllAlerts,
  getAlertById,
  getAlertsByDepartment,
  getAlertsByTeacher,
  getAlertsByStudent,
  getAlertsByStudentEmail,
  updateAlert,
  deleteAlert,
} from "../controller/alertController.js";

const router = Router();

router.post("/", createAlert);
router.get("/", getAllAlerts);
router.get("/student/email/:email", getAlertsByStudentEmail);
router.get("/student/:studentId", getAlertsByStudent);
router.get("/department/:departmentId", getAlertsByDepartment);
router.get("/teacher/:teacherId", getAlertsByTeacher);
router.get("/:id", getAlertById);
router.put("/:id", updateAlert);
router.delete("/:id", deleteAlert);

export default router;
