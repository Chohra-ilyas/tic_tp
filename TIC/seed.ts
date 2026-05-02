import { AppDataSource } from "./db.js";
import { Alert } from "./entity/Alert.js";
import { Department } from "./entity/Department.js";
import { Student } from "./entity/Student.js";
import { Teacher } from "./entity/Teacher.js";
import { Module } from "./entity/Module.js";
import { ExamSchedule } from "./entity/ExamSchedule.js";
import { Sale } from "./entity/Sale.js";

async function seedData() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");

    // Create sample departments
    const dept1 = AppDataSource.getRepository(Department).create({
      name: "Computer Science",
    });
    const dept2 = AppDataSource.getRepository(Department).create({
      name: "Mathematics",
    });
    const dept3 = AppDataSource.getRepository(Department).create({
      name: "Physics",
    });
    await AppDataSource.getRepository(Department).save([dept1, dept2, dept3]);
    console.log("Departments created");

    // Create sample students
    const student1 = AppDataSource.getRepository(Student).create({
      name: "Ahmed Ali",
      email: "ahmed@example.com",
      department: dept1,
    });
    const student2 = AppDataSource.getRepository(Student).create({
      name: "Fatima Mohamed",
      email: "fatima@example.com",
      department: dept1,
    });
    const student3 = AppDataSource.getRepository(Student).create({
      name: "Omar Hassan",
      email: "omar@example.com",
      department: dept2,
    });
    const student4 = AppDataSource.getRepository(Student).create({
      name: "Noor Saleh",
      email: "noor@example.com",
      department: dept3,
    });
    await AppDataSource.getRepository(Student).save([
      student1,
      student2,
      student3,
      student4,
    ]);
    console.log("Students created");

    // Create sample teachers
    const teacher1 = AppDataSource.getRepository(Teacher).create({
      name: "Dr. Karim Mohamed",
      specialty: "Database Management",
      department: dept1,
    });
    const teacher2 = AppDataSource.getRepository(Teacher).create({
      name: "Prof. Leyla Ahmed",
      specialty: "Algorithms",
      department: dept1,
    });
    const teacher3 = AppDataSource.getRepository(Teacher).create({
      name: "Dr. Hassan Ibrahim",
      specialty: "Linear Algebra",
      department: dept2,
    });
    const teacher4 = AppDataSource.getRepository(Teacher).create({
      name: "Prof. Amal Nasser",
      specialty: "Quantum Physics",
      department: dept3,
    });
    await AppDataSource.getRepository(Teacher).save([
      teacher1,
      teacher2,
      teacher3,
      teacher4,
    ]);
    console.log("Teachers created");

    // Create sample modules
    const module1 = AppDataSource.getRepository(Module).create({
      title: "Database Systems",
      credits: 3,
      department: dept1,
    });
    const module2 = AppDataSource.getRepository(Module).create({
      title: "Data Structures",
      credits: 4,
      department: dept1,
    });
    const module3 = AppDataSource.getRepository(Module).create({
      title: "Calculus I",
      credits: 4,
      department: dept2,
    });
    const module4 = AppDataSource.getRepository(Module).create({
      title: "Linear Algebra",
      credits: 3,
      department: dept2,
    });
    const module5 = AppDataSource.getRepository(Module).create({
      title: "Mechanics",
      credits: 4,
      department: dept3,
    });
    await AppDataSource.getRepository(Module).save([
      module1,
      module2,
      module3,
      module4,
      module5,
    ]);
    console.log("Modules created");

    // Create sample exam schedules
    const exam1 = AppDataSource.getRepository(ExamSchedule).create({
      module: module1,
      teacher: teacher1,
      department: dept1,
      room: "Lab A101",
      examDate: "2026-03-15",
      startTime: "09:00",
      endTime: "11:00",
    });
    const exam2 = AppDataSource.getRepository(ExamSchedule).create({
      module: module2,
      teacher: teacher2,
      department: dept1,
      room: "Hall B201",
      examDate: "2026-03-16",
      startTime: "14:00",
      endTime: "16:00",
    });
    const exam3 = AppDataSource.getRepository(ExamSchedule).create({
      module: module3,
      teacher: teacher3,
      department: dept2,
      room: "Room C102",
      examDate: "2026-03-17",
      startTime: "10:00",
      endTime: "12:00",
    });
    const exam4 = AppDataSource.getRepository(ExamSchedule).create({
      module: module5,
      teacher: teacher4,
      department: dept3,
      room: "Lab D303",
      examDate: "2026-03-18",
      startTime: "13:00",
      endTime: "15:00",
    });
    await AppDataSource.getRepository(ExamSchedule).save([
      exam1,
      exam2,
      exam3,
      exam4,
    ]);
    console.log("Exam schedules created");

    // Create sample sales
    const sale1 = AppDataSource.getRepository(Sale).create({
      amount: 500,
      department: dept1,
    });
    const sale2 = AppDataSource.getRepository(Sale).create({
      amount: 750,
      department: dept1,
    });
    const sale3 = AppDataSource.getRepository(Sale).create({
      amount: 600,
      department: dept2,
    });
    const sale4 = AppDataSource.getRepository(Sale).create({
      amount: 1200,
      department: dept3,
    });
    await AppDataSource.getRepository(Sale).save([sale1, sale2, sale3, sale4]);
    console.log("Sales created");

    // Create sample alerts
    const alert1 = AppDataSource.getRepository(Alert).create({
      announcement: "Important: System Maintenance Schedule",
      scheduledTime: new Date("2026-02-28T10:00:00"),
      description:
        "The system will be under maintenance on February 28th from 10 AM to 2 PM.",
      department: dept1,
      teacher: teacher1,
      students: [student1, student2],
    });

    const alert2 = AppDataSource.getRepository(Alert).create({
      announcement: "Midterm Exams Announcement",
      scheduledTime: new Date("2026-03-10T09:00:00"),
      description:
        "Midterm exams will be held starting from March 10th. Please prepare accordingly.",
      department: dept1,
      teacher: teacher2,
      students: [student1, student2],
    });

    const alert3 = AppDataSource.getRepository(Alert).create({
      announcement: "Holiday Notice",
      scheduledTime: new Date("2026-03-05T00:00:00"),
      description: "University will be closed on March 5th for a public holiday.",
      department: dept2,
      teacher: teacher3,
      students: [student3],
    });

    const alert4 = AppDataSource.getRepository(Alert).create({
      announcement: "Assignment Submission Deadline",
      scheduledTime: new Date("2026-03-01T23:59:59"),
      description:
        "All assignments must be submitted by March 1st at 11:59 PM.",
      department: dept3,
      teacher: teacher4,
      students: [student4],
    });

    await AppDataSource.getRepository(Alert).save([
      alert1,
      alert2,
      alert3,
      alert4,
    ]);
    console.log("Alerts seeded successfully");

    await AppDataSource.destroy();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

seedData();
