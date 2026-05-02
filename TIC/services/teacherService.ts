import { AppDataSource } from "../db.js";
import { Teacher } from "../entity/Teacher.js";

export class TeacherService {
  static async create(data: Partial<Teacher>) {
    const repo = AppDataSource.getRepository(Teacher);
    const teacher = repo.create(data);
    return await repo.save(teacher);
  }

  static async getAll() {
    const repo = AppDataSource.getRepository(Teacher);
    return await repo.find({ relations: ["department"] });
  }
}
