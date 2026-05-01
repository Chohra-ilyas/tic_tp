import { useState, useEffect } from "react";
import { examService } from "../services/examService";

function Exams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const examsData = await examService.getAll();
      setExams(examsData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page-container">
      <h1>Exam Schedules</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="list-container">
        <h2>All Exams</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Exam Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Room</th>
              <th>Module</th>
              <th>Teacher</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.id}</td>
                <td>{exam.examDate || "N/A"}</td>
                <td>{exam.startTime || "N/A"}</td>
                <td>{exam.endTime || "N/A"}</td>
                <td>{exam.room || "N/A"}</td>
                <td>{exam.module?.title || "N/A"}</td>
                <td>{exam.teacher?.name || "N/A"}</td>
                <td>{exam.department?.name || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Exams;
