// src/entity/Department.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Student } from "./Student.js";
import { Teacher } from "./Teacher.js";
import { Module } from "./Module.js";
import { Sale } from "./Sale.js";
import { Alert } from "./Alert.js";

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Student, (student) => student.department)
  students: Student[];

  @OneToMany(() => Teacher, (teacher) => teacher.department)
  teachers: Teacher[];

  @OneToMany(() => Module, (module) => module.department)
  modules: Module[];

  @OneToMany(() => Sale, (sale) => sale.department)
  sales: Sale[];

  @OneToMany(() => Alert, (alert) => alert.department)
  alerts: Alert[];
}
