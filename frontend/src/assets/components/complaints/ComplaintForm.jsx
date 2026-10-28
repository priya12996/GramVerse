// import { useState } from "react";

// function ComplaintForm({ onSubmit }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("road");
//   const [location, setLocation] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ title, description, category, location });
//     setTitle("");
//     setDescription("");
//     setLocation("");
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
//       <div style={{ marginBottom: "12px" }}>
//         <label>Title</label>
//         <br />
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           style={{ width: "100%", padding: "8px" }}
//         />
//       </div>

//       <div style={{ marginBottom: "12px" }}>
//         <label>Description</label>
//         <br />
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//           rows={3}
//           style={{ width: "100%", padding: "8px" }}
//         />
//       </div>

//       <div style={{ marginBottom: "12px" }}>
//         <label>Category</label>
//         <br />
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           style={{ width: "100%", padding: "8px" }}
//         >
//           <option value="road">Road</option>
//           <option value="water">Water</option>
//           <option value="electricity">Electricity</option>
//           <option value="sanitation">Sanitation</option>
//           <option value="other">Other</option>
//         </select>
//       </div>

//       <div style={{ marginBottom: "12px" }}>
//         <label>Location</label>
//         <br />
//         <input
//           type="text"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           style={{ width: "100%", padding: "8px" }}
//         />
//       </div>

//       <button type="submit">Submit Complaint</button>
//     </form>
//   );
// }

// export default ComplaintForm;
import { useState } from "react";

function ComplaintForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("road");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, category, location });
    setTitle("");
    setDescription("");
    setLocation("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
      <div style={{ marginBottom: "12px" }}>
        <label>Title</label>
        <br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Description</label>
        <br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Category</label>
        <br />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        >
          <option value="road">Road</option>
          <option value="water">Water</option>
          <option value="electricity">Electricity</option>
          <option value="sanitation">Sanitation</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Location</label>
        <br />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <button type="submit">Submit Complaint</button>
    </form>
  );
}

export default ComplaintForm;