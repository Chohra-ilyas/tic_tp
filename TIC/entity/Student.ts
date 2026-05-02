// src/entity/Student.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import type { Relation } from "typeorm";
import { Department } from "./Department.js";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToOne(() => Department, (department) => department.students, {
    onDelete: "CASCADE",
  })
  department: Relation<Department>;
}
