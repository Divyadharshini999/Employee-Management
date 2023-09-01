import axios from "axios";
import React, { useState, useEffect } from "react";
//import { API_URL } from "../Constants/Url";
import { Link } from "react-router-dom";
//import { API_URL } from "../Constants/Url";

function EmployeeLeaveDetails() {
  const [data, setAPIData1] = useState([]);

  const callGetApi1 = async () => {
    // try {
    const response = await axios
      .get("http://localhost:5000/api/leavedetailstables")
      .then((response) => {
        setAPIData1(response.data);
        console.log(response.data);
      })

      .catch((error) => {
        // if (response.status === 200) {
        // setAPIData1(response.data);
        console.error("Errr fetching data:", error);
      });
  };
  console.log(data);

  //for getting same input values from API ,we have to use "useEffect" and with "dependency[]"->dependency is mainly use to change the input values
  useEffect(() => {
    callGetApi1();
  }, []);

  return (
    <div className="rinnercontainer">
      <br></br>
      <br></br>

      <ul class="nav flex-row">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/read">
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

      <div className="readpage1">
        <br></br>
        <br></br>
        <Link to="/range" className="leavecreatelink">
          LEAVE FORM
        </Link>
        <br></br>
        <br></br>

        <table className="tableLeave" cellPadding={10}>
          <thead>
            <tr>
              <th>SI.NO</th>
              <th>EMPLOYEE NAMES</th>
              <th>LEAVE TYPE NAME</th>
              <th>STARTING DATE OF LEAVE</th>
              <th>ENDING DATE OF LEAVE</th>
              <th>leave id</th>
            </tr>
          </thead>
          <tbody className="tableLeave">
            {data.map((dataItem) => (
              <tr key={dataItem.id}>
                <td>{dataItem.lea_det_id}</td>
                <td>{dataItem.selectedEmployee}</td>
                <td>{dataItem.selectleavetype}</td>
                <td>{dataItem.startDate}</td>
                <td>{dataItem.endDate}</td>
                <td>{dataItem.leave_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeLeaveDetails;
