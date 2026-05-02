import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from "typeorm";
import { Module } from "./Module.js";
import { Teacher } from "./Teacher.js";
import { Department } from "./Department.js";

@Entity()
export class ExamSchedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Module, { eager: true })
  module!: Module;

  @ManyToOne(() => Teacher, { eager: true })
  teacher!: Teacher;

  @ManyToOne(() => Department, { eager: true })
  department!: Department;

  @Column()
  room!: string;

  @Column({ type: "date" })
  examDate!: string;

  @Column({ type: "time" })
  startTime!: string;

  @Column({ type: "time" })
  endTime!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
  