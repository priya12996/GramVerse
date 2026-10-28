
import { Link } from "react-router-dom";
import LocationButton from "../assets/components/LocationButton";
// import WeatherCard from "../components/WeatherCard";
import WeatherCard from "../assets/components/WeatherCard";
import AnnouncementBoard from "../assets/components/AnnouncementBoard";
import "./Dashboard.css";

// python -m uvicorn app.main:app --reload
function Dashboard() {
  // Demo data for now.
  // Later, these values will come from the backend API.
  const stats = [
    {
      icon: "🏠",
      title: "Total Houses",
      value: "1,245",
      status: "Village Population",
      type: "normal",
    },
    {
      icon: "📢",
      title: "Active Complaints",
      value: "32",
      status: "8 High Priority",
      type: "warning",
    },
    {
      icon: "💧",
      title: "Water Resources",
      value: "12",
      status: "2 Need Attention",
      type: "danger",
    },
    {
      icon: "🛣️",
      title: "Roads at Risk",
      value: "8",
      status: "3 High Risk",
      type: "danger",
    },
  ];
const modules = [
  {
    icon: "🤝",
    title: "Community Hub",
    description: "Read village updates, organise community tasks and find important services in one place.",
    path: "/community",
    button: "Open Community Hub",
  },
  {
    icon: "🗺️",
    title: "Village Map",
    description:
      "Explore houses, roads, farms, schools, water tanks and electricity infrastructure.",
    path: "/map",
    button: "Open Map",
  },
  {
    icon: "📢",
    title: "Complaints",
    description:
      "View and manage complaints reported by villagers.",
    path: "/complaints",
    button: "View Complaints",
  },
  {
    icon: "💧",
    title: "Water Prediction",
    description:
      "Monitor water levels and identify possible shortage risks.",
    path: "/water-prediction",
    button: "Check Water",
  },
  {
    icon: "🌱",
    title: "Crop Health",
    description:
      "Monitor crop conditions and identify agricultural risks using AI.",
    path: "/crop-health",
    button: "View Crops",
  },
  {
    icon: "⚡",
    title: "Electricity",
    description:
      "Monitor electricity infrastructure and possible failure risks.",
    path: "/electricity",
    button: "Check Electricity",
  },
  {
    icon: "📊",
    title: "Analytics",
    description:
      "Analyze village data, trends, risks and development indicators.",
    path: "/analytics",
    button: "View Analytics",
  },

  // ================= INFRASTRUCTURE =================
  {
    icon: "🏗️",
    title: "Infrastructure",
    description:
      "Manage village infrastructure such as schools, hospitals, roads, water facilities and other public resources.",
    path: "/infrastructure",
    button: "Manage Infrastructure",
  },
];
<LocationButton />
  const complaints = [
    {
      id: "C1024",
      category: "Road",
      location: "Ward 4",
      priority: "High",
      status: "Pending",
    },
    {
      id: "C1023",
      category: "Water",
      location: "Ward 2",
      priority: "High",
      status: "In Progress",
    },
    {
      id: "C1022",
      category: "Electricity",
      location: "Ward 5",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: "C1021",
      category: "Streetlight",
      location: "Ward 1",
      priority: "Low",
      status: "Resolved",
    },
  ];

  return (
    <div className="dashboard">

      {/* ================= HEADER ================= */}

      <header className="dashboard-header">

        <div className="dashboard-logo">
          <Link to="/">
            🌿 <span>GramVerse</span>
          </Link>
        </div>

        <nav className="dashboard-nav">

          <Link to="/">
            Home
          </Link>

          <Link to="/map">
            Village Map
          </Link>

          <Link to="/complaints">
            Complaints
          </Link>

          <Link to="/profile">
            Profile
          </Link>

        </nav>

      </header>


      {/* ================= MAIN ================= */}
      {/* python -m uvicorn app.main:app --reload */}

      <main className="dashboard-main">

        {/* Page heading */}

        <section className="dashboard-heading">

          <div>
            <span className="dashboard-label">
              GRAMVERSE OVERVIEW
            </span>

            <h1>
              Village Dashboard
            </h1>

            <p>
              Monitor your village, identify risks and make
              data-driven development decisions.
            </p>
          </div>

          <Link to="/map">
            <button className="map-button">
              🗺️ Explore Village Map
            </button>
          </Link>

        </section>


        {/* ================= STAT CARDS ================= */}

        <section className="stats-grid">

          {stats.map((stat) => (

            <div
              className={`stat-card ${stat.type}`}
              key={stat.title}
            >

              <div className="stat-top">

                <div className="stat-icon">
                  {stat.icon}
                </div>

                <span className="stat-menu">
                  ⋮
                </span>

              </div>

              <h3>
                {stat.title}
              </h3>

              <div className="stat-value">
                {stat.value}
              </div>

              <p>
                {stat.status}
              </p>

            </div>

          ))}

        </section>


        {/* ================= RISK OVERVIEW ================= */}

        <section className="dashboard-grid">

          <div className="panel risk-panel">

            <div className="panel-header">

              <div>
                <span className="panel-label">
                  AI RISK MONITORING
                </span>

                <h2>
                  Village Risk Overview
                </h2>
              </div>

              <span className="risk-status">
                Live
              </span>

            </div>


            <div className="risk-list">

              <div className="risk-item">

                <div className="risk-info">

                  <span className="risk-icon">
                    💧
                  </span>

                  <div>
                    <strong>
                      Water Shortage
                    </strong>

                    <small>
                      Ward 3
                    </small>
                  </div>

                </div>

                <div className="risk-right">

                  <strong>
                    82%
                  </strong>

                  <span className="high">
                    High
                  </span>

                </div>

              </div>


              <div className="risk-item">

                <div className="risk-info">

                  <span className="risk-icon">
                    🛣️
                  </span>

                  <div>
                    <strong>
                      Road Damage
                    </strong>

                    <small>
                      Ward 4
                    </small>
                  </div>

                </div>

                <div className="risk-right">

                  <strong>
                    76%
                  </strong>

                  <span className="high">
                    High
                  </span>

                </div>

              </div>


              <div className="risk-item">

                <div className="risk-info">

                  <span className="risk-icon">
                    ⚡
                  </span>

                  <div>
                    <strong>
                      Electricity Failure
                    </strong>

                    <small>
                      Transformer T12
                    </small>
                  </div>

                </div>

                <div className="risk-right">

                  <strong>
                    61%
                  </strong>

                  <span className="medium">
                    Medium
                  </span>

                </div>

              </div>


              <div className="risk-item">

                <div className="risk-info">

                  <span className="risk-icon">
                    🌾
                  </span>

                  <div>
                    <strong>
                      Crop Stress
                    </strong>

                    <small>
                      Farm Area B
                    </small>
                  </div>

                </div>

                <div className="risk-right">

                  <strong>
                    38%
                  </strong>

                  <span className="low">
                    Low
                  </span>

                </div>

              </div>

            </div>

          </div>

<WeatherCard/>
<AnnouncementBoard />
          {/* ================= VILLAGE HEALTH ================= */}

          <div className="panel health-panel">

            <div className="panel-header">

              <div>
                <span className="panel-label">
                  VILLAGE STATUS
                </span>

                <h2>
                  Overall Health
                </h2>
              </div>

            </div>


            <div className="health-circle">

              <div className="health-number">
                78%
              </div>

              <div className="health-text">
                Healthy
              </div>

            </div>


            <div className="health-details">

              <div>
                <span>
                  Infrastructure
                </span>

                <strong>
                  82%
                </strong>
              </div>

              <div>
                <span>
                  Agriculture
                </span>

                <strong>
                  75%
                </strong>
              </div>

              <div>
                <span>
                  Resources
                </span>

                <strong>
                  77%
                </strong>
              </div>

            </div>

          </div>

        </section>


        {/* ================= MODULES ================= */}

        <section className="modules-section">

          <div className="section-title">

            <div>
              <span className="panel-label">
                GRAMVERSE MODULES
              </span>

              <h2>
                Village Management
              </h2>
            </div>

          </div>


          <div className="module-grid">

            {modules.map((module) => (

              <Link
                to={module.path}
                className="module-card"
                key={module.title}
              >

                <div className="module-icon">
                  {module.icon}
                </div>

                <h3>
                  {module.title}
                </h3>

                <p>
                  {module.description}
                </p>

                <span className="module-button">
                  {module.button} →
                </span>

              </Link>

            ))}

          </div>

        </section>


        {/* ================= COMPLAINTS ================= */}

        <section className="panel complaints-panel">

          <div className="panel-header">

            <div>

              <span className="panel-label">
                RECENT ACTIVITY
              </span>

              <h2>
                Recent Complaints
              </h2>

            </div>

            <Link
              to="/complaints"
              className="view-all"
            >
              View All →
            </Link>

          </div>


          <div className="complaints-table-wrapper">

            <table className="complaints-table">

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {complaints.map((complaint) => (

                  <tr key={complaint.id}>

                    <td>
                      <strong>
                        {complaint.id}
                      </strong>
                    </td>

                    <td>
                      {complaint.category}
                    </td>

                    <td>
                      {complaint.location}
                    </td>

                    <td>

                      <span
                        className={`priority ${complaint.priority.toLowerCase()}`}
                      >
                        {complaint.priority}
                      </span>

                    </td>

                    <td>

                      <span
                        className={`status ${complaint.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {complaint.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>


        {/* ================= QUICK ACTIONS ================= */}

        <section className="quick-actions">

          <h2>
            Quick Actions
          </h2>

          <div className="quick-grid">

            <Link to="/complaints">
              <span>📢</span>
              Report Complaint
            </Link>

            <Link to="/map">
              <span>🗺️</span>
              Open Village Map
            </Link>

            <Link to="/water-prediction">
              <span>💧</span>
              Check Water Risk
            </Link>

            <Link to="/analytics">
              <span>📊</span>
              View Analytics
            </Link>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="dashboard-footer">

        <p>
          🌿 GramVerse — AI Powered Digital Twin for Rural Development
        </p>

        <span>
          © 2026 GramVerse
        </span>

      </footer>

    </div>
  );
}

export default Dashboard;