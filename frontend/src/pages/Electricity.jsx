import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOutages, reportOutage, updateOutageStatus } from "../services/electricityService";
import { useAuth } from "../hooks/useAuth";

const statusColors = { reported: "#c0392b", in_progress: "#b08800", resolved: "#1a7f37" };

function Electricity() {
  const [outages, setOutages] = useState([]);
  const [form, setForm] = useState({ area: "", description: "" });
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const loadOutages = async () => {
    try {
      const data = await getOutages();
      setOutages(data);
    } catch (error) {
      console.error(error);
      setMessage("Unable to load outages.");
    }
  };

  useEffect(() => {
    loadOutages();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reportOutage({ ...form, reported_by: user?.id || null });
      setForm({ area: "", description: "" });
      loadOutages();
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to report outage.");
    }
  };

  const cycleStatus = async (outage) => {
    const next = outage.status === "reported" ? "in_progress" : outage.status === "in_progress" ? "resolved" : "reported";
    try {
      await updateOutageStatus(outage.id, next);
      loadOutages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "50px", maxWidth: "600px", margin: "auto" }}>
      <Link to="/">← Back to Home</Link>
      <h1>⚡ Electricity Outages</h1>
      <p style={{ color: "#555" }}>
        Report a power outage or check the status of ones already reported nearby.
      </p>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "12px" }}>
          <label>Area / Locality</label>
          <br />
          <input name="area" value={form.area} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label>Description (optional)</label>
          <br />
          <textarea name="description" value={form.description} onChange={handleChange} rows={2} style={{ width: "100%", padding: "8px" }} />
        </div>
        <button type="submit">Report Outage</button>
      </form>

      {message && <p>{message}</p>}

      {outages.map((o) => (
        <div key={o.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", marginBottom: "12px" }}>
          <h3 style={{ margin: "0 0 8px" }}>{o.area}</h3>
          {o.description && <p style={{ margin: "0 0 8px" }}>{o.description}</p>}
          <p style={{ margin: "0 0 8px", color: statusColors[o.status], fontWeight: "bold" }}>
            Status: {o.status.replace("_", " ")}
          </p>
          {user && (
            <button onClick={() => cycleStatus(o)} style={{ fontSize: "13px" }}>
              Advance Status
            </button>
          )}
        </div>
      ))}

      {outages.length === 0 && <p>No outages reported.</p>}
    </div>
  );
}

export default Electricity;