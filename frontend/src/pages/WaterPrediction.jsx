import { useState } from "react";
import { Link } from "react-router-dom";
import { predictWater } from "../services/waterService";

const riskColors = { low: "#1a7f37", medium: "#b08800", high: "#c0392b" };

function WaterPrediction() {
  const [form, setForm] = useState({ rainfall_mm: "", current_level_percent: "", population: "", location: "" });
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setResult(null);
    try {
      const data = await predictWater({
        rainfall_mm: Number(form.rainfall_mm),
        current_level_percent: Number(form.current_level_percent),
        population: form.population ? Number(form.population) : null,
        location: form.location,
      });
      setResult(data);
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Prediction failed.");
    }
  };

  return (
    <div style={{ padding: "50px", maxWidth: "500px", margin: "auto" }}>
      <Link to="/">← Back to Home</Link>
      <h1>💧 Water Shortage Prediction</h1>
      <p style={{ color: "#555" }}>
        Estimate projected water levels based on recent rainfall and current reserves.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label>Recent Rainfall (mm)</label>
          <br />
          <input name="rainfall_mm" type="number" value={form.rainfall_mm} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Current Water Level (%)</label>
          <br />
          <input name="current_level_percent" type="number" min="0" max="100" value={form.current_level_percent} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Population served (optional)</label>
          <br />
          <input name="population" type="number" value={form.population} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Location (optional)</label>
          <br />
          <input name="location" value={form.location} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
        </div>

        <button type="submit">Predict</button>
      </form>

      {message && <p>{message}</p>}

      {result && (
        <div style={{ marginTop: "25px", border: "1px solid #ddd", borderRadius: "8px", padding: "15px" }}>
          <h3 style={{ margin: "0 0 8px" }}>Projected Water Level: {result.projected_level}%</h3>
          <p style={{ margin: "0 0 8px", color: riskColors[result.risk] || "#333", fontWeight: "bold" }}>
            Risk: {result.risk.toUpperCase()}
          </p>
          <p style={{ margin: 0, color: "#555" }}>{result.note}</p>
        </div>
      )}
    </div>
  );
}

export default WaterPrediction;