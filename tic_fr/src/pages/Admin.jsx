import { useEffect, useState } from "react";
import { studentService } from "../services/studentService";
import { teacherService } from "../services/teacherService";
import { alertService } from "../services/alertService";
import { departmentService } from "../services/departmentService";
import { moduleService } from "../services/moduleService";
import { saleService } from "../services/saleService";
import { examService } from "../services/examService";

function Admin() {
  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [modules, setModules] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const [departmentForm, setDepartmentForm] = useState({ name: "" });

  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    departmentId: "",
  });

  const [teacherForm, setTeacherForm] = useState({
    name: "",
    specialty: "",
    departmentId: "",
  });

  const [moduleForm, setModuleForm] = useState({
    title: "",
    credits: "",
    departmentId: "",
  });

  const [saleForm, setSaleForm] = useState({
    amount: "",
    departmentId: "",
  });

  const [examForm, setExamForm] = useState({
    moduleId: "",
    teacherId: "",
    departmentId: "",
    room: "",
    examDate: "",
    startTime: "",
    endTime: "",
  });

  const [alertForm, setAlertForm] = useState({
    announcement: "",
    scheduledTime: "",
    description: "",
    departmentId: "",
    teacherId: "",
    studentIds: [],
  });

  useEffect(() => {
    fetchLookups();
  }, []);

  const fetchLookups = async () => {
    try {
      const [departmentsData, teachersData, studentsData, modulesData] =
        await Promise.all([
          departmentService.getAll(),
          teacherService.getAll(),
          studentService.getAll(),
          moduleService.getAll(),
        ]);
      setDepartments(departmentsData);
      setTeachers(teachersData);
      setStudents(studentsData);
      setModules(modulesData);
      setError(null);
    } catch (err) {
      setError("Failed to load admin lookup data");
      console.error(err);
    }
  };

  const submitDepartment = async (e) => {
    e.preventDefault();
    try {
      await departmentService.create({ name: departmentForm.name });
      setDepartmentForm({ name: "" });
      setMessage("Department created successfully");
      setError(null);
      fetchLookups();
    } catch (err) {
      setError("Failed to create department");
      console.error(err);
    }
  };

  const submitStudent = async (e) => {
    e.preventDefault();
    try {
      await studentService.create({
        name: studentForm.name,
        email: studentForm.email,
        department: { id: Number(studentForm.departmentId) },
      });
      setStudentForm({ name: "", email: "", departmentId: "" });
      setMessage("Student created successfully");
      setError(null);
      fetchLookups();
    } catch (err) {
      setError("Failed to create student");
      console.error(err);
    }
  };

  const submitTeacher = async (e) => {
    e.preventDefault();
    try {
      await teacherService.create({
        name: teacherForm.name,
        specialty: teacherForm.specialty,
        department: { id: Number(teacherForm.departmentId) },
      });
      setTeacherForm({ name: "", specialty: "", departmentId: "" });
      setMessage("Teacher created successfully");
      setError(null);
      fetchLookups();
    } catch (err) {
      setError("Failed to create teacher");
      console.error(err);
    }
  };

  const submitModule = async (e) => {
    e.preventDefault();
    try {
      await moduleService.create({
        title: moduleForm.title,
        credits: Number(moduleForm.credits),
        department: { id: Number(moduleForm.departmentId) },
      });
      setModuleForm({ title: "", credits: "", departmentId: "" });
      setMessage("Module created successfully");
      setError(null);
      fetchLookups();
    } catch (err) {
      setError("Failed to create module");
      console.error(err);
    }
  };

  const submitSale = async (e) => {
    e.preventDefault();
    try {
      await saleService.create({
        amount: Number(saleForm.amount),
        department: { id: Number(saleForm.departmentId) },
      });
      setSaleForm({ amount: "", departmentId: "" });
      setMessage("Sale created successfully");
      setError(null);
      fetchLookups();
    } catch (err) {
      setError("Failed to create sale");
      console.error(err);
    }
  };

  const submitExam = async (e) => {
    e.preventDefault();
    try {
      await examService.create({
        module: { id: Number(examForm.moduleId) },
        teacher: { id: Number(examForm.teacherId) },
        department: { id: Number(examForm.departmentId) },
        room: examForm.room,
        examDate: examForm.examDate,
        startTime: examForm.startTime,
        endTime: examForm.endTime,
      });
      setExamForm({
        moduleId: "",
        teacherId: "",
        departmentId: "",
        room: "",
        examDate: "",
        startTime: "",
        endTime: "",
      });
      setMessage("Exam created successfully");
      setError(null);
      fetchLookups();
    } catch (err) {
      setError("Failed to create exam");
      console.error(err);
    }
  };

  const submitAlert = async (e) => {
    e.preventDefault();
    try {
      await alertService.create({
        announcement: alertForm.announcement,
        scheduledTime: alertForm.scheduledTime,
        description: alertForm.description,
        department: { id: Number(alertForm.departmentId) },
        teacher: { id: Number(alertForm.teacherId) },
        students: alertForm.studentIds.map((id) => ({ id: Number(id) })),
      });

      setAlertForm({
        announcement: "",
        scheduledTime: "",
        description: "",
        departmentId: "",
        teacherId: "",
        studentIds: [],
      });
      setMessage("Alert created successfully");
      setError(null);
    } catch (err) {
      setError("Failed to create alert");
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <h1>Admin</h1>
      <p>Create all entities from one place.</p>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="form-container">
        <h2>Create Department</h2>
        <form onSubmit={submitDepartment}>
          <div className="form-group">
            <label htmlFor="departmentName">Department Name:</label>
            <input
              id="departmentName"
              type="text"
              value={departmentForm.name}
              onChange={(e) => setDepartmentForm({ name: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Create Department
          </button>
        </form>
      </div>

      <div className="form-container">
        <h2>Create Student</h2>
        <form onSubmit={submitStudent}>
          <div className="form-group">
            <label htmlFor="studentName">Name:</label>
            <input
              id="studentName"
              type="text"
              value={studentForm.name}
              onChange={(e) =>
                setStudentForm({ ...studentForm, name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentEmail">Email:</label>
            <input
              id="studentEmail"
              type="email"
              value={studentForm.email}
              onChange={(e) =>
                setStudentForm({ ...studentForm, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentDepartment">Department:</label>
            <select
              id="studentDepartment"
              value={studentForm.departmentId}
              onChange={(e) =>
                setStudentForm({ ...studentForm, departmentId: e.target.value })
              }
              required
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-primary">
            Create Student
          </button>
        </form>
      </div>

      <div className="form-container">
        <h2>Create Teacher</h2>
        <form onSubmit={submitTeacher}>
          <div className="form-group">
            <label htmlFor="teacherName">Name:</label>
            <input
              id="teacherName"
              type="text"
              value={teacherForm.name}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="teacherSpecialty">Specialty:</label>
            <input
              id="teacherSpecialty"
              type="text"
              value={teacherForm.specialty}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, specialty: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="teacherDepartment">Department:</label>
            <select
              id="teacherDepartment"
              value={teacherForm.departmentId}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, departmentId: e.target.value })
              }
              required
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-primary">
            Create Teacher
          </button>
        </form>
      </div>

      <div className="form-container">
        <h2>Create Module</h2>
        <form onSubmit={submitModule}>
          <div className="form-group">
            <label htmlFor="moduleTitle">Title:</label>
            <input
              id="moduleTitle"
              type="text"
              value={moduleForm.title}
              onChange={(e) =>
                setModuleForm({ ...moduleForm, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="moduleCredits">Credits:</label>
            <input
              id="moduleCredits"
              type="number"
              min="1"
              value={moduleForm.credits}
              onChange={(e) =>
                setModuleForm({ ...moduleForm, credits: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="moduleDepartment">Department:</label>
            <select
              id="moduleDepartment"
              value={moduleForm.departmentId}
              onChange={(e) =>
                setModuleForm({ ...moduleForm, departmentId: e.target.value })
              }
              required
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-primary">
            Create Module
          </button>
        </form>
      </div>

      <div className="form-container">
        <h2>Create Sale</h2>
        <form onSubmit={submitSale}>
          <div className="form-group">
            <label htmlFor="saleAmount">Amount:</label>
            <input
              id="saleAmount"
              type="number"
              step="0.01"
              min="0"
              value={saleForm.amount}
              onChange={(e) =>
                setSaleForm({ ...saleForm, amount: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="saleDepartment">Department:</label>
            <select
              id="saleDepartment"
              value={saleForm.departmentId}
              onChange={(e) =>
                setSaleForm({ ...saleForm, departmentId: e.target.value })
              }
              required
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-primary">
            Create Sale
          </button>
        </form>
      </div>

      <div className="form-container">
        <h2>Create Exam</h2>
        <form onSubmit={submitExam}>
          <div className="form-group">
            <label htmlFor="examModule">Module:</label>
            <select
              id="examModule"
              value={examForm.moduleId}
              onChange={(e) =>
                setExamForm({ ...examForm, moduleId: e.target.value })
              }
              required
            >
              <option value="">Select Module</option>
              {modules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="examTeacher">Teacher:</label>
            <select
              id="examTeacher"
              value={examForm.teacherId}
              onChange={(e) =>
                setExamForm({ ...examForm, teacherId: e.target.value })
              }
              required
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="examDepartment">Department:</label>
            <select
              id="examDepartment"
              value={examForm.departmentId}
              onChange={(e) =>
                setExamForm({ ...examForm, departmentId: e.target.value })
              }
              required
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="examRoom">Room:</label>
            <input
              id="examRoom"
              type="text"
              value={examForm.room}
              onChange={(e) =>
                setExamForm({ ...examForm, room: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="examDate">Exam Date:</label>
            <input
              id="examDate"
              type="date"
              value={examForm.examDate}
              onChange={(e) =>
                setExamForm({ ...examForm, examDate: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="examStartTime">Start Time:</label>
            <input
              id="examStartTime"
              type="time"
              value={examForm.startTime}
              onChange={(e) =>
                setExamForm({ ...examForm, startTime: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="examEndTime">End Time:</label>
            <input
              id="examEndTime"
              type="time"
              value={examForm.endTime}
              onChange={(e) =>
                setExamForm({ ...examForm, endTime: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Create Exam
          </button>
        </form>
      </div>

      <div className="form-container">
        <h2>Create Alert</h2>
        <form onSubmit={submitAlert}>
          <div className="form-group">
            <label htmlFor="alertAnnouncement">Announcement:</label>
            <input
              id="alertAnnouncement"
              type="text"
              value={alertForm.announcement}
              onChange={(e) =>
                setAlertForm({ ...alertForm, announcement: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="alertScheduledTime">Scheduled Time:</label>
            <input
              id="alertScheduledTime"
              type="datetime-local"
              value={alertForm.scheduledTime}
              onChange={(e) =>
                setAlertForm({ ...alertForm, scheduledTime: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="alertDescription">Description:</label>
            <textarea
              id="alertDescription"
              value={alertForm.description}
              onChange={(e) =>
                setAlertForm({ ...alertForm, description: e.target.value })
              }
              rows="3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="alertDepartment">Department:</label>
            <select
              id="alertDepartment"
              value={alertForm.departmentId}
              onChange={(e) =>
                setAlertForm({ ...alertForm, departmentId: e.target.value })
              }
              required
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="alertTeacher">Teacher:</label>
            <select
              id="alertTeacher"
              value={alertForm.teacherId}
              onChange={(e) =>
                setAlertForm({ ...alertForm, teacherId: e.target.value })
              }
              required
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="alertStudents">Students:</label>
            <select
              id="alertStudents"
              multiple
              value={alertForm.studentIds}
              onChange={(e) => {
                const selected = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value,
                );
                setAlertForm({ ...alertForm, studentIds: selected });
              }}
            >
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.email})
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-primary">
            Create Alert
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
