import axios from "axios";
import React, { useState, useEffect } from "react";
//import { API_URL } from "../Constants/Url";
import { Link } from "react-router-dom";
//import { API_URL } from "../Constants/Url";

function EmployeeLeaveDetails() {
  const [data, setAPIData1] = useState([]);

  const callGetApi1 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/leavedetails"
      );
      setAPIData1(response.data);
    } catch (error) {
      // if (response.status === 200) {
      // setAPIData1(response.data);
      console.error("Errr fetching data:", error);
    }
  };
  console.log(data);

  //for getting same input values from API ,we have to use "useEffect" and with "dependency[]"->dependency is mainly use to change the input values
  useEffect(() => {
    callGetApi1();
  }, []);

  return (
    <div className="readpage">
      <br></br>
      <br></br>
      <Link to="/range" className="createlink">
        LEAVE FORM
      </Link>
      <br></br>
      <br></br>

      <table className="tableLeave" cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Leave Type</th>
            <th>Starting Date</th>
            <th>Ending Date</th>
          </tr>
        </thead>
        <tbody className="tableLeave">
          {data.map((dataItem) => (
            <tr key={dataItem.id}>
              <td>{dataItem.id}</td>
              <td>{dataItem.names}</td>
              <td>{dataItem.selectleavetype}</td>
              <td>{dataItem.startDate}</td>
              <td>{dataItem.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeLeaveDetails;
