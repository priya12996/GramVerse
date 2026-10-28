import { useState } from "react";

const initialAnnouncements = [
  {
    id: 1,
    title: "Water Supply Maintenance",
    description:
      "Water supply will remain unavailable from 10:00 AM to 2:00 PM due to tank maintenance.",
    category: "Water",
    priority: "Important",
    date: "12 Sep 2026",
  },
  {
    id: 2,
    title: "Gram Sabha Meeting",
    description:
      "A Gram Sabha meeting will be held at the Panchayat office. All villagers are invited.",
    category: "Panchayat",
    priority: "Normal",
    date: "18 Sep 2026",
  },
  {
    id: 3,
    title: "Free Health Check-up Camp",
    description:
      "A free health check-up camp will be organized at the Primary Health Centre.",
    category: "Health",
    priority: "Important",
    date: "20 Sep 2026",
  },
];

export default function AnnouncementBoard() {
  const [announcements, setAnnouncements] = useState(
    initialAnnouncements
  );

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    priority: "Normal",
    date: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please enter title and description.");
      return;
    }

    const newAnnouncement = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      priority: formData.priority,
      date: formData.date || "Today",
    };

    setAnnouncements((previous) => [
      newAnnouncement,
      ...previous,
    ]);

    setFormData({
      title: "",
      description: "",
      category: "General",
      priority: "Normal",
      date: "",
    });

    setShowForm(false);
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements((previous) =>
      previous.filter((announcement) => announcement.id !== id)
    );
  };

  const getPriorityStyle = (priority) => {
    if (priority === "Urgent") {
      return {
        background: "#fee2e2",
        color: "#b91c1c",
      };
    }

    if (priority === "Important") {
      return {
        background: "#fef3c7",
        color: "#92400e",
      };
    }

    return {
      background: "#dcfce7",
      color: "#166534",
    };
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.heading}>📢 Village Announcements</h2>

          <p style={styles.subheading}>
            Important notices and updates for village residents
          </p>
        </div>

        <button
          style={styles.addButton}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "✕ Close" : "+ Add Notice"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.formTitle}>Create Announcement</h3>

          <label style={styles.label}>Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter announcement title"
            style={styles.input}
          />

          <label style={styles.label}>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter announcement details"
            rows="4"
            style={styles.textarea}
          />

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="General">General</option>
                <option value="Water">Water</option>
                <option value="Electricity">Electricity</option>
                <option value="Health">Health</option>
                <option value="Panchayat">Panchayat</option>
                <option value="Education">Education</option>
                <option value="Agriculture">Agriculture</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Priority</label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="Normal">Normal</option>
                <option value="Important">Important</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <label style={styles.label}>Date</label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.publishButton}>
            Publish Announcement
          </button>
        </form>
      )}

      <div style={styles.list}>
        {announcements.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>📢</div>
            <p>No announcements available.</p>
          </div>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              style={styles.card}
            >
              <div style={styles.cardTop}>
                <div>
                  <h3 style={styles.title}>
                    {announcement.title}
                  </h3>

                  <div style={styles.meta}>
                    <span style={styles.category}>
                      {announcement.category}
                    </span>

                    <span
                      style={{
                        ...styles.priority,
                        ...getPriorityStyle(
                          announcement.priority
                        ),
                      }}
                    >
                      {announcement.priority}
                    </span>

                    <span style={styles.date}>
                      📅 {announcement.date}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    deleteAnnouncement(announcement.id)
                  }
                  style={styles.deleteButton}
                  title="Delete announcement"
                >
                  🗑️
                </button>
              </div>

              <p style={styles.description}>
                {announcement.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "22px",
    marginBottom: "20px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e5e7eb",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },

  heading: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
  },

  subheading: {
    margin: "6px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },

  addButton: {
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },

  form: {
    background: "#f8fafc",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    border: "1px solid #e2e8f0",
  },

  formTitle: {
    marginTop: 0,
    marginBottom: "18px",
  },

  label: {
    display: "block",
    marginBottom: "6px",
    marginTop: "12px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    background: "#ffffff",
    fontSize: "14px",
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    resize: "vertical",
    fontSize: "14px",
  },

  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },

  formGroup: {
    minWidth: 0,
  },

  publishButton: {
    marginTop: "20px",
    border: "none",
    background: "#16a34a",
    color: "#ffffff",
    padding: "11px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  card: {
    padding: "17px",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    background: "#ffffff",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
  },

  title: {
    margin: 0,
    fontSize: "17px",
    fontWeight: "700",
  },

  meta: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "8px",
  },

  category: {
    background: "#eff6ff",
    color: "#1d4ed8",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
  },

  priority: {
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
  },

  date: {
    color: "#6b7280",
    fontSize: "12px",
  },

  description: {
    margin: "12px 0 0",
    color: "#4b5563",
    lineHeight: "1.6",
    fontSize: "14px",
  },

  deleteButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "16px",
    height: "32px",
  },

  empty: {
    textAlign: "center",
    padding: "30px",
    color: "#6b7280",
  },

  emptyIcon: {
    fontSize: "35px",
  },
};