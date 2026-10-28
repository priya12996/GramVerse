import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSummary } from "../services/analyticsService";

function Analytics() {
  const [summary, setSummary] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getSummary()
      .then(setSummary)
      .catch((error) => {
        console.error(error);
        setMessage("Unable to load analytics.");
      });
  }, []);

  return (
    <div style={{ padding: "50px", maxWidth: "700px", margin: "auto" }}>
      <Link to="/">← Back to Home</Link>
      <h1>📊 Village Analytics</h1>
      <p style={{ color: "#555" }}>Live statistics pulled from the GramVerse backend.</p>

      {message && <p>{message}</p>}

      {summary && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "15px", marginTop: "20px" }}>
            <StatCard label="Villages" value={summary.total_villages} />
            <StatCard label="Complaints" value={summary.total_complaints} />
            <StatCard label="Predictions Run" value={summary.total_predictions} />
            <StatCard label="Active Outages" value={summary.active_outages} />
          </div>

          <div style={{ marginTop: "30px" }}>
            <h3>Complaints by Category</h3>
            <BreakdownList data={summary.complaints_by_category} />
          </div>

          <div style={{ marginTop: "20px" }}>
            <h3>Complaints by Status</h3>
            <BreakdownList data={summary.complaints_by_status} />
          </div>

          <div style={{ marginTop: "20px" }}>
            <h3>Predictions by Type</h3>
            <BreakdownList data={summary.predictions_by_type} />
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", textAlign: "center" }}>
      <div style={{ fontSize: "28px", fontWeight: "bold" }}>{value}</div>
      <div style={{ color: "#555" }}>{label}</div>
    </div>
  );
}

function BreakdownList({ data }) {
  const entries = Object.entries(data || {});
  if (entries.length === 0) return <p style={{ color: "#888" }}>No data yet.</p>;

  return (
    <ul>
      {entries.map(([key, value]) => (
        <li key={key}>{key}: {value}</li>
      ))}
    </ul>
  );
}

export default Analytics;