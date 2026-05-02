import { Request, Response } from "express";
import { AlertService } from "../services/alertService.js";

export const createAlert = async (req: Request, res: Response) => {
  try {
    const alert = await AlertService.create(req.body);
    res.status(201).json(alert);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllAlerts = async (req: Request, res: Response) => {
  try {
    const studentEmailQuery = req.query.studentEmail;
    let studentEmail = "";

    if (typeof studentEmailQuery === "string") {
      studentEmail = studentEmailQuery.trim();
    } else if (
      Array.isArray(studentEmailQuery) &&
      typeof studentEmailQuery[0] === "string"
    ) {
      studentEmail = studentEmailQuery[0].trim();
    }

    if (studentEmail) {
      const alerts = await AlertService.getByStudentEmail(studentEmail);
      res.json(alerts);
      return;
    }

    const alerts = await AlertService.getAll();
    res.json(alerts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAlertById = async (req: Request, res: Response) => {
  try {
    const alert = await AlertService.getById(Number(req.params.id));
    if (!alert) {
      res.status(404).json({ message: "Alert not found" });
      return;
    }
    res.json(alert);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAlertsByDepartment = async (req: Request, res: Response) => {
  try {
    const alerts = await AlertService.getByDepartment(
      Number(req.params.departmentId),
    );
    res.json(alerts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAlertsByTeacher = async (req: Request, res: Response) => {
  try {
    const alerts = await AlertService.getByTeacher(
      Number(req.params.teacherId),
    );
    res.json(alerts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAlertsByStudent = async (req: Request, res: Response) => {
  try {
    const alerts = await AlertService.getByStudent(
      Number(req.params.studentId),
    );
    res.json(alerts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAlertsByStudentEmail = async (req: Request, res: Response) => {
  try {
    const emailParam = req.params.email;
    const email = Array.isArray(emailParam)
      ? emailParam[0]?.trim()
      : emailParam?.trim();

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const alerts = await AlertService.getByStudentEmail(email);
    res.json(alerts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAlert = async (req: Request, res: Response) => {
  try {
    const alert = await AlertService.update(Number(req.params.id), req.body);
    res.json(alert);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAlert = async (req: Request, res: Response) => {
  try {
    await AlertService.delete(Number(req.params.id));
    res.json({ message: "Alert deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
