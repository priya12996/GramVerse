// import { useState, useEffect } from "react";
// import { getComplaints, createComplaint } from "../services/complaintService";
// import ComplaintForm from "../assets/components/complaints/ComplaintForm";
// import ComplaintCard from "../assets/components/complaints/ComplaintCard";

// function Complaints() {
//   const [complaints, setComplaints] = useState([]);
//   const [message, setMessage] = useState("");

//   const loadComplaints = async () => {
//     try {
//       const data = await getComplaints();
//       setComplaints(data);
//     } catch (error) {
//       console.error(error);
//       setMessage("Unable to load complaints.");
//     }
//   };

//   useEffect(() => {
//     loadComplaints();
//   }, []);

//   const handleSubmit = async (formData) => {
//     try {
//       await createComplaint(formData);
//       setMessage("Complaint submitted!");
//       loadComplaints();
//     } catch (error) {
//       console.error(error);
//       setMessage(error.message || "Failed to submit complaint.");
//     }
//   };

//   return (
//     <div style={{ padding: "50px", maxWidth: "600px", margin: "auto" }}>
//       <h1>Complaints</h1>

//       <ComplaintForm onSubmit={handleSubmit} />

//       {message && <p>{message}</p>}

//       {complaints.map((c) => (
//         <ComplaintCard key={c.id} complaint={c} />
//       ))}
//     </div>
//   );
// }

// export default Complaints;

import { useState, useEffect } from "react";
import { getComplaints, createComplaint } from "../services/complaintService";
import ComplaintForm from "../assets/components/complaints/ComplaintForm";
import ComplaintCard from "../assets/components/complaints/ComplaintCard";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState("");

  const loadComplaints = async () => {
    try {
      const data = await getComplaints();
      setComplaints(data);
    } catch (error) {
      console.error(error);
      setMessage("Unable to load complaints.");
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      await createComplaint(formData);
      setMessage("Complaint submitted!");
      loadComplaints();
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to submit complaint.");
    }
  };

  return (
    <div style={{ padding: "50px", maxWidth: "600px", margin: "auto" }}>
      <h1>Complaints</h1>

      <ComplaintForm onSubmit={handleSubmit} />

      {message && <p>{message}</p>}

      {complaints.map((c) => (
        <ComplaintCard key={c.id} complaint={c} />
      ))}
    </div>
  );
}

export default Complaints;