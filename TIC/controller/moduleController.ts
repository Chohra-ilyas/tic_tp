import { Request, Response } from "express";
import { ModuleService } from "../services/moduleService.js";

export const createModule = async (req: Request, res: Response) => {
  try {
    const module = await ModuleService.create(req.body);
    res.status(201).json(module);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllModules = async (_: Request, res: Response) => {
  try {
    const modules = await ModuleService.getAll();
    res.json(modules);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
