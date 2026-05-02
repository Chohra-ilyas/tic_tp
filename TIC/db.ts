import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Department } from "./entity/Department.js";
import { Module } from "./entity/Module.js";
import { Sale } from "./entity/Sale.js";
import { Student } from "./entity/Student.js";
import { Teacher } from "./entity/Teacher.js";
import { ExamSchedule } from "./entity/ExamSchedule.js";
import { Alert } from "./entity/Alert.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true, // Disable in production
  logging: false,
  entities: [Department, Module, Sale, Student, Teacher, ExamSchedule, Alert],
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});
