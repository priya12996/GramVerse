import "./Home.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Home() {
  const { user } = useAuth();
  const features = [
    {
      icon: "🗺️",
      title: "Village Map",
      description: "Explore village infrastructure, roads, farms, water resources and important locations.",
      path: "/map",
    },
    {
      icon: "📢",
      title: "Complaints",
      description: "Report and monitor village problems such as roads, water, electricity and sanitation.",
      path: "/complaints",
    },
    {
      icon: "🌱",
      title: "Crop Health",
      description: "Monitor crop conditions and identify possible agricultural risks using AI.",
      path: "/crop-health",
    },
    {
      icon: "💧",
      title: "Water Prediction",
      description: "Monitor water resources and predict possible water shortages.",
      path: "/water-prediction",
    },
    {
      icon: "⚡",
      title: "Electricity",
      description: "Monitor electricity infrastructure and identify possible failure risks.",
      path: "/electricity",
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "View village statistics, trends, predictions and development insights.",
      path: "/analytics",
    },
  ];

  return (
    <div className="home">

      {/* ================= HEADER ================= */}
      <header className="header">

        <div className="logo">
          <Link to="/">
            🌿 <span>GramVerse</span>
          </Link>
        </div>

        <nav className="navbar">

          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/map" className="nav-link">
            Village Map
          </Link>

          <Link to="/complaints" className="nav-link">
            Complaints
          </Link>

          <Link to="/dashboard" className="nav-link dashboard-nav">
            Dashboard
          </Link>

                    {user ? (
            <Link to="/profile" className="login-button">
              👤 {user.name}
            </Link>
          ) : (
            <Link to="/login" className="login-button">
              Login
            </Link>
          )}

        </nav>

      </header>


      {/* ================= HERO SECTION ================= */}
      <main>

        <section className="hero">

          <div className="hero-content">

            <div className="hero-badge">
              🤖 AI Powered Rural Development
            </div>

            <h1>
              AI Powered Digital Twin
              <br />
              <span>for Rural Development</span>
            </h1>

            <p>
              GramVerse creates a virtual intelligent model of a village
              to monitor resources, predict problems and support smarter
              and sustainable development.
            </p>

            <div className="hero-buttons">

              <Link to="/dashboard">
                <button className="primary-button">
                  Explore Dashboard →
                </button>
              </Link>

              <Link to="/map">
                <button className="secondary-button">
                  🗺️ Explore Village
                </button>
              </Link>

            </div>

          </div>


          {/* Hero information card */}
          <div className="hero-card">

            <div className="hero-card-header">
              <span>🌍</span>
              <div>
                <h3>Village Digital Twin</h3>
                <p>Smart monitoring system</p>
              </div>
            </div>

            <div className="hero-stats">

              <div className="hero-stat">
                <span>🏠</span>
                <div>
                  <strong>Village</strong>
                  <small>Digitally Connected</small>
                </div>
              </div>

              <div className="hero-stat">
                <span>💧</span>
                <div>
                  <strong>Water</strong>
                  <small>Resource Monitoring</small>
                </div>
              </div>

              <div className="hero-stat">
                <span>🌾</span>
                <div>
                  <strong>Agriculture</strong>
                  <small>Crop Monitoring</small>
                </div>
              </div>

              <div className="hero-stat">
                <span>⚡</span>
                <div>
                  <strong>Electricity</strong>
                  <small>Risk Monitoring</small>
                </div>
              </div>

            </div>

          </div>

        </section>


        {/* ================= FEATURE SECTION ================= */}
        <section className="feature-section">

          <div className="section-heading">

            <span className="section-label">
              GRAMVERSE MODULES
            </span>

            <h2>
              Everything You Need for a
              <span> Smart Village</span>
            </h2>

            <p>
              Monitor, analyze and predict important aspects of rural
              infrastructure from one centralized platform.
            </p>

          </div>


          <div className="cards">

            {features.map((feature) => (

              <Link
                to={feature.path}
                className="card-link"
                key={feature.title}
              >

                <div className="card">

                  <div className="card-icon">
                    {feature.icon}
                  </div>

                  <h3>
                    {feature.title}
                  </h3>

                  <p>
                    {feature.description}
                  </p>

                  <span className="card-action">
                    Explore →
                  </span>

                </div>

              </Link>

            ))}

          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}
        <section className="how-section">

          <div className="section-heading">

            <span className="section-label">
              HOW GRAMVERSE WORKS
            </span>

            <h2>
              From Village Data to
              <span> Smart Decisions</span>
            </h2>

          </div>


          <div className="steps">

            <div className="step">

              <div className="step-number">
                01
              </div>

              <div className="step-icon">
                📡
              </div>

              <h3>
                Collect Data
              </h3>

              <p>
                Collect village information from maps, complaints,
                weather data, infrastructure and other sources.
              </p>

            </div>


            <div className="step">

              <div className="step-number">
                02
              </div>

              <div className="step-icon">
                🧠
              </div>

              <h3>
                Analyze with AI
              </h3>

              <p>
                AI and machine learning models analyze the collected
                data and identify possible risks and patterns.
              </p>

            </div>


            <div className="step">

              <div className="step-number">
                03
              </div>

              <div className="step-icon">
                📊
              </div>

              <h3>
                Visualize
              </h3>

              <p>
                Important information and predictions are displayed
                through maps, charts, statistics and alerts.
              </p>

            </div>


            <div className="step">

              <div className="step-number">
                04
              </div>

              <div className="step-icon">
                🎯
              </div>

              <h3>
                Take Action
              </h3>

              <p>
                Authorities can use these insights to prioritize
                resources and make better development decisions.
              </p>

            </div>

          </div>

        </section>


        {/* ================= SMART FEATURES ================= */}
        <section className="features">

          <div className="feature">

            <div className="feature-icon">
              🤖
            </div>

            <h3>
              AI Powered
            </h3>

            <p>
              Intelligent models help identify and predict village problems.
            </p>

          </div>


          <div className="feature">

            <div className="feature-icon">
              🌍
            </div>

            <h3>
              Smart Village
            </h3>

            <p>
              A virtual representation of the village and its resources.
            </p>

          </div>


          <div className="feature">

            <div className="feature-icon">
              📈
            </div>

            <h3>
              Predictive Analytics
            </h3>

            <p>
              Use historical and current data to identify future risks.
            </p>

          </div>


          <div className="feature">

            <div className="feature-icon">
              🛰️
            </div>

            <h3>
              Real-Time Monitoring
            </h3>

            <p>
              Monitor important village resources from one dashboard.
            </p>

          </div>

        </section>


        {/* ================= CTA ================= */}
        <section className="cta-section">

          <div className="cta-content">

            <span className="section-label">
              START EXPLORING
            </span>

            <h2>
              Build a Smarter Village
              <br />
              with <span>GramVerse</span>
            </h2>

            <p>
              Explore the digital twin, analyze village data and
              discover how AI can support rural development.
            </p>

            <Link to="/dashboard">
              <button className="primary-button">
                Open GramVerse Dashboard →
              </button>
            </Link>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <div className="footer-content">

          <div>
            <h3>
              🌿 GramVerse
            </h3>

            <p>
              AI-Powered Digital Twin for Rural Development
            </p>
          </div>


          <div className="footer-links">

            <Link to="/">
              Home
            </Link>

            <Link to="/map">
              Village Map
            </Link>

            <Link to="/complaints">
              Complaints
            </Link>

            <Link to="/dashboard">
              Dashboard
            </Link>

          </div>

        </div>


        <div className="footer-bottom">
          © 2026 GramVerse | Developed by Priya Bharti
        </div>

      </footer>

    </div>
  );
}

export default Home;