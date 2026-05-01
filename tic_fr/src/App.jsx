import { useState } from "react";
import "./App.css";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Departments from "./pages/Departments";
import Modules from "./pages/Modules";
import Exams from "./pages/Exams";
import Alerts from "./pages/Alerts";
import Sales from "./pages/Sales";
import Admin from "./pages/Admin";

function App() {
  const [currentPage, setCurrentPage] = useState("students");

  const renderPage = () => {
    switch (currentPage) {
      case "students":
        return <Students />;
      case "teachers":
        return <Teachers />;
      case "departments":
        return <Departments />;
      case "modules":
        return <Modules />;
      case "exams":
        return <Exams />;
      case "alerts":
        return <Alerts />;
      case "sales":
        return <Sales />;
      case "admin":
        return <Admin />;
      default:
        return <Students />;
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h1>School Management System</h1>
        <div className="nav-links">
          <button
            className={currentPage === "students" ? "active" : ""}
            onClick={() => setCurrentPage("students")}
          >
            Students
          </button>
          <button
            className={currentPage === "teachers" ? "active" : ""}
            onClick={() => setCurrentPage("teachers")}
          >
            Teachers
          </button>
          <button
            className={currentPage === "departments" ? "active" : ""}
            onClick={() => setCurrentPage("departments")}
          >
            Departments
          </button>
          <button
            className={currentPage === "modules" ? "active" : ""}
            onClick={() => setCurrentPage("modules")}
          >
            Modules
          </button>
          <button
            className={currentPage === "exams" ? "active" : ""}
            onClick={() => setCurrentPage("exams")}
          >
            Exams
          </button>
          <button
            className={currentPage === "alerts" ? "active" : ""}
            onClick={() => setCurrentPage("alerts")}
          >
            Alerts
          </button>
          <button
            className={currentPage === "sales" ? "active" : ""}
            onClick={() => setCurrentPage("sales")}
          >
            Sales
          </button>
          <button
            className={currentPage === "admin" ? "active" : ""}
            onClick={() => setCurrentPage("admin")}
          >
            Admin
          </button>
        </div>
      </nav>
      <main className="main-content">{renderPage()}</main>
    </div>
  );
}

export default App;
