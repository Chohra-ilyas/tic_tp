import { AppDataSource } from "../db.js";
import { Student } from "../entity/Student.js";

export class StudentService {
  static async create(data: Partial<Student>) {
    const repo = AppDataSource.getRepository(Student);
    const student = repo.create(data);
    return await repo.save(student);
  }

  static async getAll() {
    const repo = AppDataSource.getRepository(Student);
    return await repo.find({ relations: ["department"] });
  }
}
