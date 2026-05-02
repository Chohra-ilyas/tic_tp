// src/entity/Module.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import type { Relation } from "typeorm";
import { Department } from "./Department.js";

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("int")
  credits: number;

  @ManyToOne(() => Department, (department) => department.modules)
  department: Relation<Department>;
}
