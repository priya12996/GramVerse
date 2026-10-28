// import { Link } from "react-router-dom";



// export default NotFound;
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>404 — Page Not Found</h1>
      <p>This page doesn't exist yet.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default NotFound;