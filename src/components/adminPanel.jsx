import React from "react";
import AdminSidebar from "./adminSidebar";
import "bootstrap/dist/css/bootstrap.min.css";
const AdminPanel = (props) => {
  return (
    <div className="d-flex">
      <div className="w-auto">
        <AdminSidebar />
      </div>
    </div>
  );
};
export default AdminPanel;

// import React from "react";
// import { useState, useEffect } from "react";
// import "../adminPanel.css";
// const AdminPanel = (props) => {
//   const [usersData, setUsersData] = useState(null);

//   const getAllUsers = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/getAllUsers`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (!response.ok) {
//         throw new Error("Request failed");
//       }
//       const data = await response.json();
//       setUsersData(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   const handleDelete = async (userId) => {
//     console.log(userId);
//     // Logic to reject the connection request
//     try {
//       const res = await fetch(`http://localhost:3001/deleteUser/${userId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (res.ok) {
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const userData = null;
//   return (
//     <div>
//       <div className="network-container">
//         <h1>My Connections</h1>
//         {usersData &&
//           usersData.map((d) => (
//             <React.Fragment key={d._id}>
//               <div className="user-container">
//                 <div className="user-details">
//                   <span className="user-name">{d.username}</span>
//                   <span className="user-connection">1st degree connection</span>
//                 </div>
//                 <div className="action-buttons">
//                   <button
//                     className="action-button reject"
//                     onClick={() => handleDelete(d._id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </React.Fragment>
//           ))}
//       </div>
//     </div>
//   );
// };
// export default AdminPanel;

// import React from "react";
// const AdminPanel = (props) => {
//   return <h4>Hi ,{props.location.state.name}</h4>;
// };
// export default AdminPanel;
