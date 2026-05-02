// src/entity/Sale.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { Department } from "./Department.js";

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("decimal")
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Department, (department) => department.sales)
  department: Relation<Department>;
}
