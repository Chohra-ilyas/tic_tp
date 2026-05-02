import { AppDataSource } from "../db.js";
import { Module } from "../entity/Module.js";

export class ModuleService {
  static async create(data: Partial<Module>) {
    const repo = AppDataSource.getRepository(Module);
    const module = repo.create(data);
    return await repo.save(module);
  }

  static async getAll() {
    const repo = AppDataSource.getRepository(Module);
    return await repo.find({ relations: ["department"] });
  }
}
