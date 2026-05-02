import { Request, Response } from "express";
import { ExamService } from "../services/examService.js";

export const createExam = async (req: Request, res: Response) => {
  try {
    const exam = await ExamService.createExam(req.body);
    res.status(201).json(exam);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllExams = async (_: Request, res: Response) => {
  const exams = await ExamService.getAll();
  res.json(exams);
};
