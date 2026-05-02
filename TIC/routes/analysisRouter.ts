// src/routes/analysisRouter.ts
import {Router} from "express";
import {getSwotAnalysis} from "../controller/analysisController.js";

const router = Router();

router.post("/swot", getSwotAnalysis);

export default router;
