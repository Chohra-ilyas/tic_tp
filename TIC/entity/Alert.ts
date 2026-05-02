import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import type { Relation } from "typeorm";
import { Department } from "./Department.js";
import { Student } from "./Student.js";
import { Teacher } from "./Teacher.js";

@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  announcement: string;

  @Column()
  scheduledTime: Date;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Department)
  department: Relation<Department>;

  @ManyToMany(() => Student)
  @JoinTable()
  students: Relation<Student[]>;

  @ManyToOne(() => Teacher)
  teacher: Relation<Teacher>;
}
