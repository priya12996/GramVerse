import { useState } from "react";
import { Link } from "react-router-dom";
import { predictCrop } from "../services/cropService";

const riskColors = { low: "#1a7f37", medium: "#b08800", high: "#c0392b" };

function CropHealth() {
  const [form, setForm] = useState({ soil_type: "loamy", season: "kharif", rainfall_mm: "", location: "" });
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
      const data = await predictCrop({ ...form, rainfall_mm: Number(form.rainfall_mm) });
      setResult(data);
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Prediction failed.");
    }
  };

  return (
    <div style={{ padding: "50px", maxWidth: "500px", margin: "auto" }}>
      <Link to="/">← Back to Home</Link>
      <h1>🌱 Crop Health Advisory</h1>
      <p style={{ color: "#555" }}>
        Get a quick crop recommendation and risk estimate based on soil, season and rainfall.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label>Soil Type</label>
          <br />
          <select name="soil_type" value={form.soil_type} onChange={handleChange} style={{ width: "100%", padding: "8px" }}>
            <option value="loamy">Loamy</option>
            <option value="sandy">Sandy</option>
            <option value="clay">Clay</option>
            <option value="black">Black</option>
          </select>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Season</label>
          <br />
          <select name="season" value={form.season} onChange={handleChange} style={{ width: "100%", padding: "8px" }}>
            <option value="kharif">Kharif</option>
            <option value="rabi">Rabi</option>
          </select>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Rainfall (mm)</label>
          <br />
          <input name="rainfall_mm" type="number" value={form.rainfall_mm} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Location (optional)</label>
          <br />
          <input name="location" value={form.location} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
        </div>

        <button type="submit">Get Recommendation</button>
      </form>

      {message && <p>{message}</p>}

      {result && (
        <div style={{ marginTop: "25px", border: "1px solid #ddd", borderRadius: "8px", padding: "15px" }}>
          <h3 style={{ margin: "0 0 8px" }}>Recommended Crops</h3>
          <p style={{ margin: "0 0 8px" }}>{result.crops.join(", ")}</p>
          <p style={{ margin: "0 0 8px", color: riskColors[result.risk] || "#333", fontWeight: "bold" }}>
            Risk: {result.risk.toUpperCase()}
          </p>
          <p style={{ margin: 0, color: "#555" }}>{result.note}</p>
        </div>
      )}
    </div>
  );
}

export default CropHealth;