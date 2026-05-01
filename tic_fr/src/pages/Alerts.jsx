import { useState, useEffect } from "react";
import { alertService } from "../services/alertService";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [emailQuery, setEmailQuery] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const alertsData = await alertService.getAll();
      setAlerts(alertsData);
      setIsFiltered(false);
      setError(null);
    } catch (err) {
      setError("Failed to fetch alerts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFindByEmail = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const normalizedEmail = emailQuery.trim().toLowerCase();
      const alertsData = await alertService.getByStudentEmail(normalizedEmail);
      const filteredAlerts = alertsData.filter((alert) =>
        alert.students?.some(
          (student) => student.email?.toLowerCase() === normalizedEmail,
        ),
      );
      setAlerts(filteredAlerts);
      setIsFiltered(true);
      setError(null);
    } catch (err) {
      setError("Failed to find alerts by email");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetFilter = () => {
    setEmailQuery("");
    fetchData();
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page-container">
      <h1>Alerts</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="form-container">
        <h2>Find Alerts By Student Email</h2>
        <form onSubmit={handleFindByEmail}>
          <div className="form-group">
            <label htmlFor="studentEmailSearch">Student Email:</label>
            <input
              id="studentEmailSearch"
              type="email"
              value={emailQuery}
              onChange={(e) => setEmailQuery(e.target.value)}
              placeholder="ahmed@example.com"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Find Alerts
          </button>
          <button type="button" className="btn-primary" onClick={resetFilter}>
            Reset
          </button>
        </form>
      </div>

      <div className="list-container">
        <h2>{isFiltered ? "Filtered Alerts" : "All Alerts"}</h2>
        <div className="alerts-list">
          {alerts.map((alert) => (
            <div key={alert.id} className="alert-item">
              <div className="alert-header">
                <span className="alert-severity">{alert.announcement}</span>
                <span className="alert-id">#{alert.id}</span>
              </div>
              <p className="alert-message">
                {alert.description || "No description"}
              </p>
              <p>
                <strong>Scheduled:</strong>{" "}
                {alert.scheduledTime
                  ? new Date(alert.scheduledTime).toLocaleString()
                  : "N/A"}
              </p>
              <p>
                <strong>Department:</strong> {alert.department?.name || "N/A"}
              </p>
              <p>
                <strong>Teacher:</strong> {alert.teacher?.name || "N/A"}
                {alert.teacher?.specialty
                  ? ` (${alert.teacher.specialty})`
                  : ""}
              </p>
              <p>
                <strong>Students:</strong>{" "}
                {alert.students?.length
                  ? alert.students
                      .map((student) => `${student.name} (${student.email})`)
                      .join(", ")
                  : "No students"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Alerts;
