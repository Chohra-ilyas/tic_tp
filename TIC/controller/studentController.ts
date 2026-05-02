import { Request, Response } from "express";
import { StudentService } from "../services/studentService.js";

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await StudentService.create(req.body);
    res.status(201).json(student);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllStudents = async (_: Request, res: Response) => {
  try {
    const students = await StudentService.getAll();
    res.json(students);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
