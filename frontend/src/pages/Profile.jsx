import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ padding: "50px", maxWidth: "400px", margin: "auto" }}>
      <Link to="/">← Back to Home</Link>
      <h1>My Profile</h1>

      <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", marginTop: "20px" }}>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>

      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
}

export default Profile;