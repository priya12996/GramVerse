// function ComplaintCard({ complaint }) {
//   return (
//     <div
//       style={{
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//         padding: "15px",
//         marginBottom: "12px",
//       }}
//     >
//       <h3 style={{ margin: "0 0 8px" }}>{complaint.title}</h3>
//       <p style={{ margin: "0 0 8px" }}>{complaint.description}</p>
//       <div style={{ fontSize: "14px", color: "#555" }}>
//         <span>Category: {complaint.category}</span>
//         {" · "}
//         <span>Status: {complaint.status}</span>
//         {complaint.location && (
//           <>
//             {" · "}
//             <span>Location: {complaint.location}</span>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ComplaintCard;
function ComplaintCard({ complaint }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "12px",
      }}
    >
      <h3 style={{ margin: "0 0 8px" }}>{complaint.title}</h3>
      <p style={{ margin: "0 0 8px" }}>{complaint.description}</p>
      <div style={{ fontSize: "14px", color: "#555" }}>
        <span>Category: {complaint.category}</span>
        {" · "}
        <span>Status: {complaint.status}</span>
        {complaint.location && (
          <>
            {" · "}
            <span>Location: {complaint.location}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default ComplaintCard;