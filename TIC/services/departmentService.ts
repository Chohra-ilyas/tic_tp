import { AppDataSource } from "../db.js";
import { Department } from "../entity/Department.js";

export class DepartmentService {
  static async create(data: Partial<Department>) {
    const repo = AppDataSource.getRepository(Department);
    const department = repo.create(data);
    return await repo.save(department);
  }

  static async getAll() {
    const repo = AppDataSource.getRepository(Department);
    return await repo.find({
      relations: ["students", "teachers", "modules", "sales"],
    });
  }
}
