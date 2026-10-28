import { useEffect, useState } from "react";
import "./Infrastructure.css";

const API_URL = "http://127.0.0.1:8000/infrastructure";

function Infrastructure() {
  const [infrastructures, setInfrastructures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    village_id: "",
    type: "",
    name: "",
    latitude: "",
    longitude: "",
    status: "",
    risk_score: "",
    description: "",
  });

  const fetchInfrastructure = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/`);

      if (!response.ok) {
        throw new Error("Failed to fetch infrastructure");
      }

      const data = await response.json();
      setInfrastructures(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const loadInfrastructure = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/`);

      if (!response.ok) {
        throw new Error("Failed to fetch infrastructure");
      }

      const data = await response.json();
      setInfrastructures(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  loadInfrastructure();
}, []);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      village_id: "",
      type: "",
      name: "",
      latitude: "",
      longitude: "",
      status: "",
      risk_score: "",
      description: "",
    });

    setEditingId(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        village_id: Number(form.village_id),
        type: form.type,
        name: form.name,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
        status: form.status || null,
        risk_score:
          form.risk_score === ""
            ? null
            : Number(form.risk_score),
        description: form.description || null,
      };

      const url = editingId
        ? `${API_URL}/${editingId}`
        : `${API_URL}/`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.detail || "Failed to save infrastructure"
        );
      }

      resetForm();
      await fetchInfrastructure();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      village_id: item.village_id ?? "",
      type: item.type ?? "",
      name: item.name ?? "",
      latitude: item.latitude ?? "",
      longitude: item.longitude ?? "",
      status: item.status ?? "",
      risk_score: item.risk_score ?? "",
      description: item.description ?? "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this infrastructure?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.detail || "Failed to delete infrastructure"
        );
      }

      await fetchInfrastructure();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleView = async (id) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`);

      if (!response.ok) {
        throw new Error("Infrastructure not found");
      }

      const data = await response.json();

      alert(
        `Name: ${data.name}\n` +
        `Type: ${data.type}\n` +
        `Village ID: ${data.village_id}\n` +
        `Status: ${data.status || "N/A"}\n` +
        `Risk Score: ${data.risk_score ?? "N/A"}\n` +
        `Location: ${data.latitude}, ${data.longitude}\n` +
        `Description: ${data.description || "N/A"}`
      );
    } catch (err) {
      setError(err.message);
    }
  };

 
  
  const handleVillageFilter = async (villageId) => {
    if (!villageId) {
      fetchInfrastructure();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/village/${villageId}`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch village infrastructure"
        );
      }

      const data = await response.json();

      setInfrastructures(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="infrastructure-page">

      
      <div className="infrastructure-header">

        <div>
          <span className="infrastructure-label">
            GRAMVERSE MODULE
          </span>

          <h1>🏗️ Infrastructure Management</h1>

          <p>
            Manage and monitor village infrastructure,
            resources and public facilities.
          </p>
        </div>

        <button
          className="refresh-button"
          onClick={fetchInfrastructure}
        >
          🔄 Refresh
        </button>

      </div>


     
      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}


     
      <section className="infrastructure-form-card">

        <div className="form-header">

          <div>
            <span className="form-label">
              {editingId
                ? "UPDATE INFRASTRUCTURE"
                : "ADD INFRASTRUCTURE"}
            </span>

            <h2>
              {editingId
                ? "Edit Infrastructure"
                : "Add New Infrastructure"}
            </h2>
          </div>

          {editingId && (
            <button
              type="button"
              className="cancel-button"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}

        </div>


        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            {/* Village ID */}

            <div className="form-group">
              <label>Village ID *</label>

              <input
                type="number"
                name="village_id"
                value={form.village_id}
                onChange={handleChange}
                placeholder="Enter village ID"
                required
              />
            </div>


           
            <div className="form-group">
              <label>Infrastructure Type *</label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select type
                </option>

                <option value="School">
                  School
                </option>

                <option value="Hospital">
                  Hospital
                </option>

                <option value="Road">
                  Road
                </option>

                <option value="Water Tank">
                  Water Tank
                </option>

                <option value="Electricity">
                  Electricity
                </option>

                <option value="Streetlight">
                  Streetlight
                </option>

                <option value="Community Center">
                  Community Center
                </option>

                <option value="Other">
                  Other
                </option>

              </select>
            </div>


           

            <div className="form-group">
              <label>Name *</label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Primary School"
                required
              />
            </div>


         
            <div className="form-group">
              <label>Latitude *</label>

              <input
                type="number"
                step="any"
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                placeholder="e.g. 29.3724"
                required
              />
            </div>


        

            <div className="form-group">
              <label>Longitude *</label>

              <input
                type="number"
                step="any"
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="e.g. 78.1358"
                required
              />
            </div>



            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="">
                  Select status
                </option>

                <option value="Operational">
                  Operational
                </option>

                <option value="Good">
                  Good
                </option>

                <option value="Needs Repair">
                  Needs Repair
                </option>

                <option value="Critical">
                  Critical
                </option>

                <option value="Under Construction">
                  Under Construction
                </option>

              </select>
            </div>


          

            <div className="form-group">
              <label>Risk Score</label>

              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                name="risk_score"
                value={form.risk_score}
                onChange={handleChange}
                placeholder="0 - 100"
              />
            </div>


          

            <div className="form-group full-width">
              <label>Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter infrastructure description..."
                rows="4"
              />
            </div>

          </div>


          <div className="form-actions">

            <button
              type="submit"
              className="save-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                ? "✏️ Update Infrastructure"
                : "➕ Add Infrastructure"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-button"
                onClick={resetForm}
              >
                Clear
              </button>
            )}

          </div>

        </form>

      </section>


    

      <section className="filter-card">

        <div>
          <label>
            🏘️ Filter by Village ID
          </label>

          <input
            type="number"
            placeholder="Enter village ID"
            onChange={(e) =>
              handleVillageFilter(e.target.value)
            }
          />
        </div>

        <button
          onClick={fetchInfrastructure}
          className="show-all-button"
        >
          Show All
        </button>

      </section>


    

      <section className="infrastructure-list-section">

        <div className="section-heading">

          <div>
            <span className="infrastructure-label">
              INFRASTRUCTURE DATA
            </span>

            <h2>
              Village Infrastructure
            </h2>
          </div>

          <span className="count-badge">
            {infrastructures.length} Records
          </span>

        </div>


        {loading ? (

          <div className="empty-state">
            <div className="loading-spinner">
              ⏳
            </div>

            <p>
              Loading infrastructure...
            </p>
          </div>

        ) : infrastructures.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              🏗️
            </div>

            <h3>
              No Infrastructure Found
            </h3>

            <p>
              Add your first infrastructure record
              using the form above.
            </p>

          </div>

        ) : (

          <div className="infrastructure-grid">

            {infrastructures.map((item) => (

              <div
                className="infrastructure-card"
                key={item.id}
              >

                <div className="card-top">

                  <div className="card-icon">
                    🏗️
                  </div>

                  <span
                    className={`status-badge ${
                      item.status
                        ? item.status
                            .toLowerCase()
                            .replaceAll(" ", "-")
                        : "unknown"
                    }`}
                  >
                    {item.status || "Unknown"}
                  </span>

                </div>


                <h3>
                  {item.name}
                </h3>

                <p className="infrastructure-type">
                  {item.type}
                </p>


                <div className="infrastructure-details">

                  <div>
                    <span>🏘️ Village</span>
                    <strong>
                      {item.village_id}
                    </strong>
                  </div>

                  <div>
                    <span>📍 Latitude</span>
                    <strong>
                      {item.latitude}
                    </strong>
                  </div>

                  <div>
                    <span>📍 Longitude</span>
                    <strong>
                      {item.longitude}
                    </strong>
                  </div>

                  <div>
                    <span>⚠️ Risk Score</span>
                    <strong>
                      {item.risk_score ?? "N/A"}
                    </strong>
                  </div>

                </div>


                {item.description && (
                  <p className="description">
                    {item.description}
                  </p>
                )}


                <div className="card-actions">

                  <button
                    onClick={() =>
                      handleView(item.id)
                    }
                  >
                    👁️ View
                  </button>

                  <button
                    onClick={() =>
                      handleEdit(item)
                    }
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDelete(item.id)
                    }
                  >
                    🗑️ Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default Infrastructure;