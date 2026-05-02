import { Router } from "express";
import { createSale, getAllSales } from "../controller/saleController.js";

const router = Router();

router.post("/", createSale);
router.get("/", getAllSales);

export default router;
