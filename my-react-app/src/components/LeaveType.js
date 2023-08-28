// import React, { useState, useEffect } from "react";

// function LeaveType() {
//   const [leaveTypeNames, setLeaveTypeNames] = useState("");
//   const [data, setData] = useState([]);

//   useEffect(() => {
// Fetch data from Express backend and update the "data" state
//   fetchData();
// }, []);

// const fetchData = async () => {
//   try {
//     const response = await fetch(
//       "http://localhost:5000/api/emplyee_management"
//     );
//     const jsonData = await response.json();
//     setData(jsonData);
//   } catch (error) {
//     console.error(error);
//   }
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();

// Send the entered name to your Express backend to store in MySQL
// try {
//   await fetch("http://localhost:5000/api/leave_type", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ leaveTypeNames }),
//   });

// Handle the response as needed.
// If successful, you may want to update the table data.
//       fetchData();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={leaveTypeNames}
//           onChange={(e) => setLeaveTypeNames(e.target.value)}
//         />
//         <button type="submit">Submit</button>
//       </form>
//       <table className="tableLeave">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>leaveTypeNames</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item.id}>
//               <td>{item.id}</td>
//               <td className="nameLeave">{item.leaveTypeNames}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default LeaveType;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function LeaveType() {
//   const [leavetypeid, setleavetypeId] = useState("");
//   const [leaveTypeNames, setLeaveTypeNames] = useState("");
//   const [message, setMessage] = useState("");
//   const [data, setData] = useState([]); // Add a state to store data

//   useEffect(() => {
//     //Fetch employee id when the component mounts
//     axios
//       .get("http://localhost:5000/api/emplyee_management")
//       .then((response) => {
//         if (response.data.length > 0) {
//           setleavetypeId(response.data[0].id);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//     // Fetch leave type data
//     axios
//       .get("http://localhost:5000/api/leave_type")
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const addLeaveType = () => {
//     axios
//       .post("http://localhost:5000/api/leave_type", {
//         leaveTypeNames: leaveTypeNames,
//         leavetype_id: leavetypeid,
//       })
//       .then(() => {
//         setMessage("Leave type added successfully");
//       })
//       .catch((error) => {
//         console.error(error);
//         setMessage("Error adding leave type");
//       });
//   };

//   return (
//     <div>
//       <h1>Add Leave Type</h1>
//       <input
//         type="text"
//         placeholder="Leave Type Name"
//         value={leaveTypeNames}
//         onChange={(e) => setLeaveTypeNames(e.target.value)}
//       />
//       <button onClick={addLeaveType}>Add Leave Type</button>
//       <p>{message}</p>

//       <h2>Leave Type Data</h2>
//       <table className="tableLeave">
//         <thead>
//           <tr>
//             <th>Leave Type Name</th>
//             <th>Leave Type ID</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index}>
//               <td>{item.leaveTypeNames}</td>
//               <td>{item.leavetype_id}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default LeaveType;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// function LeaveType() {
//   const { id } = useParams();
//   const [leaveType, setLeaveType] = useState({});

//   useEffect(() => {
//     const fetchLeaveType = async () => {
//       try {
//         const response = await axios.get(`/api/leave_type/${id}`);
//         setLeaveType(response.data);
//       } catch (error) {
//         console.error("Error fetching leave type:", error);
//       }
//     };

//     fetchLeaveType();
//   }, [id]);

//   return (
//     <div>
//       <h2>Leave Type Details</h2>
//       <table className="tableLeave">
//         <tbody>
//           <tr>
//             <td>Leave Type ID:</td>
//             <td>{id.leavetype_id}</td>
//           </tr>
//           <tr>
//             <td>Leave Type Name:</td>
//             <td>{leaveType.leaveTypeNames}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default LeaveType;

// import React, { useState } from "react";
// import axios from "axios";

// function LeaveType() {
//   const [leaveTypeNames, setLeaveTypeNames] = useState("");
//   const [submittedData, setSubmittedData] = useState(null);

//   const handleLeaveSubmit = async () => {
//     try {
//       // Send a POST request to your server to insert data into the leave_type table
//       const response = await axios.post(
//         "http://localhost:5000/api/leave_type",
//         {
//           leaveTypeNames,
//         }
//       );

//       // Handle success - set the submitted data to display in the table
//       setSubmittedData(response.data);
//     } catch (error) {
//       // Handle errors - display an error message or take appropriate action
//     }
//   };

//   return (
//     <div>
//       <h2>Leave Submission Form</h2>
//       <div>
//         <input
//           type="text"
//           placeholder="Leave Type Names"
//           value={leaveTypeNames}
//           onChange={(e) => setLeaveTypeNames(e.target.value)}
//         />
//         <button onClick={handleLeaveSubmit}>Leave Submit</button>
//       </div>
//       {submittedData && (
//         <div>
//           <h2>Submitted Data</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Leave Type Names</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{submittedData.id}</td>
//                 <td>{submittedData.leaveTypeNames}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LeaveType;

import axios from "axios";
import React, { useState, useEffect, useParams } from "react";
//import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../Constants/Url";

function LeaveType() {
  // const [names, setnames] = useState("");
  // const [Experiences, setExperiences] = useState("");
  // const [dojs, setDoJs] = useState("");
  //const [id, setId] = useState("");
  const [leaveTypeNames, setLeaveTypeNames] = useState("");
  const { id } = useParams();

  // const navigate1 = useNavigate();
  //useEffect(() => {
  //getting the stored values
  //   setId(localStorage.getItem("id"));
  //   setnames(localStorage.getItem("names"));
  //   setExperiences(localStorage.getItem("Experiences"));
  //   setDoJs(localStorage.getItem("dojs"));
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/leave_type/${id}`
      );
      // setnames(response.data.names);
      setLeaveTypeNames(response.data.leaveTypeNames);
      // setExperiences(response.data.Experiences);
      // setDoJs(response.data.dojs);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = async () => {
    try {
      await axios.get(`${API_URL}/${id}`, {
        // names,
        // Experiences,
        // dojs,
        id,
      });
      //navigate1("/");
      console.log("Data updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* update form */}

      <input
        type="text"
        placeholder="Enter ID"
        value={id}
        // onChange={(event) => setId(event.target.value)}
      ></input>
      <br></br>
      <input
        type="text"
        placeholder="Enetr Name"
        value={leaveTypeNames}
        onChange={(event) => setLeaveTypeNames(event.target.value)}
      ></input>
      <br></br>

      <br></br>
      <br></br>
      <button type="button" onClick={handleUpdate} className="updatebutton1">
        LEAVE
      </button>
    </div>
  );
}

export default LeaveType;
