import { Request, Response } from "express";
import { SaleService } from "../services/saleService.js";

export const createSale = async (req: Request, res: Response) => {
  try {
    const sale = await SaleService.create(req.body);
    res.status(201).json(sale);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllSales = async (_: Request, res: Response) => {
  try {
    const sales = await SaleService.getAll();
    res.json(sales);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
