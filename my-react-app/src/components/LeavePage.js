// Leave.js
import React, { useState, useEffect } from "react";
import axios from "axios";
//import { useParams, useNavigate, Link } from "react-router-dom";

function LeavePage() {
  const [leavetypeNames, setLeaveTypeName] = useState("");
  const [message, setMessage] = useState("");
  const [leaveData, setLeaveData] = useState([]);

  const addLeave = () => {
    axios
      .post("http://localhost:5000/api/leave", {
        // leave_id: leave_id,
        leavetypeNames: leavetypeNames,
      })
      .then(() => {
        setMessage("Leave added successfully");
        loadLeaveData();
      })
      .catch((error) => {
        console.error(error);
        setMessage("Error adding leave");
      });
  };

  const loadLeaveData = () => {
    axios
      .get("http://localhost:5000/api/leaves")
      .then((response) => {
        setLeaveData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadLeaveData();
  }, []);

  return (
    <div className="rinnercontainer">
      <br></br>
      <br></br>

      <ul class="nav flex-row">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/leave">
            Leave Type
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/range">
            Leave form
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/leaveDetails">
            Leave Details
          </a>
        </li>
      </ul>

      <div className="containerLeaveForm">
        {/* <h5>Add Leave</h5> */}

        <input
          type="text"
          placeholder="Leave Type Name"
          value={leavetypeNames}
          onChange={(e) => setLeaveTypeName(e.target.value)}
        />
        <br></br>
        <button className="addleave" onClick={addLeave}>
          Add Leave
        </button>
        <br></br>
        <h5 className="h5">{message}</h5>
        <br></br>

        <table className="tableLeave" cellPadding={10}>
          <thead>
            <tr>
              {/* <th>Leave ID</th> */}
              <th>Leave Type Name</th>
            </tr>
          </thead>
          <tbody className="tableLeave">
            {leaveData.map((leaveData) => (
              <tr key={leaveData.leave_id}>
                {/* <td>{leaveData.leave_id}</td> */}
                <td>{leaveData.leavetypeNames}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeavePage;
