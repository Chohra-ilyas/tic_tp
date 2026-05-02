import { Router } from "express";
import { createModule, getAllModules } from "../controller/moduleController.js";

const router = Router();

router.post("/", createModule);
router.get("/", getAllModules);

export default router;
