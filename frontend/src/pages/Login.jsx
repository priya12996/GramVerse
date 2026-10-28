// // // import { useState } from "react";

// // // function Login() {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [message, setMessage] = useState("");

// // //   const handleLogin = async (e) => {
// // //     e.preventDefault();

// // //     try {
// // //       const response = await fetch("http://127.0.0.1:8000/auth/login", {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({
// // //           email: email,
// // //           password: password,
// // //         }),
// // //       });

// // //       const data = await response.json();

// // //       if (response.ok && data.status === "success") {
// // //         setMessage("Login Successful!");

// // //         // Save logged-in user
// // //         localStorage.setItem("user", JSON.stringify(data.user));

// // //         console.log("Logged in user:", data.user);
// // //       } else {
// // //         setMessage(data.message || "Login failed");
// // //       }
// // //     } catch (error) {
// // //       console.error("Login error:", error);
// // //       setMessage("Unable to connect to backend");
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h1>Login Page</h1>

// // //       <form onSubmit={handleLogin}>
// // //         <div>
// // //           <label>Email</label>
// // //           <input
// // //             type="email"
// // //             value={email}
// // //             onChange={(e) => setEmail(e.target.value)}
// // //             placeholder="Enter your email"
// // //             required
// // //           />
// // //         </div>

// // //         <div>
// // //           <label>Password</label>
// // //           <input
// // //             type="password"
// // //             value={password}
// // //             onChange={(e) => setPassword(e.target.value)}
// // //             placeholder="Enter your password"
// // //             required
// // //           />
// // //         </div>

// // //         <button type="submit">
// // //           Login
// // //         </button>
// // //       </form>

// // //       {message && <p>{message}</p>}
// // //     </div>
// // //   );
// // // }

// // // export default Login;

// // import { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";

// // function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [message, setMessage] = useState("");

// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setMessage("");

// //     try {
// //       const response = await fetch("http://127.0.0.1:8000/auth/login", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           email,
// //           password,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (response.ok && data.status === "success") {
// //         localStorage.setItem("user", JSON.stringify(data.user));

// //         setMessage("Login Successful!");

// //         // After successful login
// //         navigate("/");
// //       } else {
// //         setMessage(data.message || "Invalid email or password");
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       setMessage("Backend se connection nahi ho pa raha.");
// //     }
// //   };

// //   return (
// //     <div style={{ padding: "50px", maxWidth: "400px", margin: "auto" }}>
// //       <h1>GramVerse Login</h1>

// //       <form onSubmit={handleLogin}>
// //         <div style={{ marginBottom: "15px" }}>
// //           <label>Email</label>
// //           <br />
// //           <input
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             placeholder="Enter email"
// //             required
// //             style={{ width: "100%", padding: "10px" }}
// //           />
// //         </div>

// //         <div style={{ marginBottom: "15px" }}>
// //           <label>Password</label>
// //           <br />
// //           <input
// //             type="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             placeholder="Enter password"
// //             required
// //             style={{ width: "100%", padding: "10px" }}
// //           />
// //         </div>

// //         <button type="submit">
// //           Login
// //         </button>
// //       </form>

// //       {message && (
// //         <p style={{ marginTop: "20px" }}>
// //           {message}
// //         </p>
// //       )}

// //       <p>
// //         Don't have an account?{" "}
// //         <Link to="/register">Register</Link>
// //       </p>
// //     </div>
// //   );
// // }

// // export default Login;

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { loginUser } from "../services/authService";
// import { useAuth } from "../hooks/useAuth";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const data = await loginUser(email, password);

//       if (data.status === "success") {
//         login(data.user);
//         setMessage("Login Successful!");
//         navigate("/");
//       } else {
//         setMessage(data.message || "Invalid email or password");
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage(error.message || "Unable to connect to backend");
//     }
//   };

//   return (
//     <div style={{ padding: "50px", maxWidth: "400px", margin: "auto" }}>
//       <h1>GramVerse Login</h1>

//       <form onSubmit={handleLogin}>
//         <div style={{ marginBottom: "15px" }}>
//           <label>Email</label>
//           <br />
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter email"
//             required
//             style={{ width: "100%", padding: "10px" }}
//           />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label>Password</label>
//           <br />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter password"
//             required
//             style={{ width: "100%", padding: "10px" }}
//           />
//         </div>

//         <button type="submit">Login</button>
//       </form>

//       {message && <p style={{ marginTop: "20px" }}>{message}</p>}

//       <p>
//         Don't have an account? <Link to="/register">Register</Link>
//       </p>
//     </div>
//   );
// }

// export default Login;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await loginUser(email, password);

      if (data.status === "success") {
        login(data.user);
        setMessage("Login Successful!");
        navigate("/");
      } else {
        setMessage(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Unable to connect to backend");
    }
  };

  return (
    <div style={{ padding: "50px", maxWidth: "400px", margin: "auto" }}>
      <h1>GramVerse Login</h1>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <button type="submit">Login</button>
      </form>

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;