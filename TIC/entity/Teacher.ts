// src/entity/Teacher.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import type { Relation } from "typeorm";
import { Department } from "./Department.js";

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialty: string;

  @ManyToOne(() => Department, (department) => department.teachers)
  department: Relation<Department>;
}
