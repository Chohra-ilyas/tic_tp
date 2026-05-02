import { Request, Response } from "express";
import { TeacherService } from "../services/teacherService.js";

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await TeacherService.create(req.body);
    res.status(201).json(teacher);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllTeachers = async (_: Request, res: Response) => {
  try {
    const teachers = await TeacherService.getAll();
    res.json(teachers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
