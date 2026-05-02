import { AppDataSource } from "../db.js";
import { ExamSchedule } from "../entity/ExamSchedule.js";

export class ExamService {
  static async createExam(data: Partial<ExamSchedule>) {
    const repo = AppDataSource.getRepository(ExamSchedule);

    const existingExams = await repo
      .createQueryBuilder("exam")
      .leftJoinAndSelect("exam.teacher", "teacher")
      .leftJoinAndSelect("exam.department", "department")
      .where("exam.examDate = :date", { date: data.examDate })
      .andWhere("exam.startTime < :endTime AND exam.endTime > :startTime", {
        startTime: data.startTime,
        endTime: data.endTime,
      })
      .getMany();

    for (const exam of existingExams) {
      if (exam.room === data.room) {
        throw new Error("Room already booked at this time");
      }

      if (exam.teacher.id === data.teacher?.id) {
        throw new Error("Teacher already has exam at this time");
      }

      if (exam.department.id === data.department?.id) {
        throw new Error("Department already has exam at this time");
      }
    }

    const newExam = repo.create(data);
    return await repo.save(newExam);
  }

  static async getAll() {
    return await AppDataSource.getRepository(ExamSchedule).find();
  }
}
