import { AppDataSource } from "../db.js";
import { Sale } from "../entity/Sale.js";

export class SaleService {
  static async create(data: Partial<Sale>) {
    const repo = AppDataSource.getRepository(Sale);
    const sale = repo.create(data);
    return await repo.save(sale);
  }

  static async getAll() {
    const repo = AppDataSource.getRepository(Sale);
    return await repo.find({ relations: ["department"] });
  }
}
