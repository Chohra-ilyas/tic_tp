import { AppDataSource } from "../db.js";
import { Alert } from "../entity/Alert.js";

export class AlertService {
  static async create(data: Partial<Alert>) {
    const repo = AppDataSource.getRepository(Alert);
    const alert = repo.create(data);
    return await repo.save(alert);
  }

  static async getAll() {
    const repo = AppDataSource.getRepository(Alert);
    return await repo.find({
      relations: ["department", "students", "teacher"],
    });
  }

  static async getById(id: number) {
    const repo = AppDataSource.getRepository(Alert);
    return await repo.findOne({
      where: { id },
      relations: ["department", "students", "teacher"],
    });
  }

  static async getByDepartment(departmentId: number) {
    const repo = AppDataSource.getRepository(Alert);
    return await repo.find({
      where: { department: { id: departmentId } },
      relations: ["department", "students", "teacher"],
    });
  }

  static async getByTeacher(teacherId: number) {
    const repo = AppDataSource.getRepository(Alert);
    return await repo.find({
      where: { teacher: { id: teacherId } },
      relations: ["department", "students", "teacher"],
    });
  }

  static async getByStudent(studentId: number) {
    const repo = AppDataSource.getRepository(Alert);
    return await repo
      .createQueryBuilder("alert")
      .leftJoinAndSelect("alert.department", "department")
      .leftJoinAndSelect("alert.students", "students")
      .leftJoinAndSelect("alert.teacher", "teacher")
      .where("students.id = :studentId", { studentId })
      .getMany();
  }

  static async getByStudentEmail(email: string) {
    const repo = AppDataSource.getRepository(Alert);
    return await repo
      .createQueryBuilder("alert")
      .innerJoin("alert.students", "studentFilter")
      .leftJoinAndSelect("alert.department", "department")
      .leftJoinAndSelect("alert.students", "students")
      .leftJoinAndSelect("alert.teacher", "teacher")
      .where("LOWER(studentFilter.email) = LOWER(:email)", { email })
      .distinct(true)
      .getMany();
  }

  static async update(id: number, data: Partial<Alert>) {
    const repo = AppDataSource.getRepository(Alert);
    await repo.update(id, data);
    return await this.getById(id);
  }

  static async delete(id: number) {
    const repo = AppDataSource.getRepository(Alert);
    return await repo.delete(id);
  }
}
