import { Request, Response } from "express";
import { DepartmentService } from "../services/departmentService.js";

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const department = await DepartmentService.create(req.body);
    res.status(201).json(department);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllDepartments = async (_: Request, res: Response) => {
  try {
    const departments = await DepartmentService.getAll();
    res.json(departments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
