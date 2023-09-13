import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
//import { API_URL } from "../Constants/Url";
//import DatePicker from "react-datepicker";

function LeaveFormEmployee() {
  //const { id } = useParams();
  const navigate1 = useNavigate();
  const [names, setnames] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [leavetypeNames, setLeaveTypeNames] = useState([]);
  const [selectleavetype, setSelectLeavetype] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [leaveData, setLeaveData] = useState([]);
  const [data, setdata] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/emplyee_management")
      .then((response) => {
        setnames(response.data);
        //setLeaveData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:5000/api/leaves")
      .then((response) => {
        setLeaveTypeNames(response.data);
        //setLeaveData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedEmployeeObject = names.find(
      (employee) => employee.names === selectedEmployee
    );
    const selectleavetypeObject = leavetypeNames.find(
      (leave) => leave.leavetypeNames === selectleavetype
    );

    if (selectedEmployeeObject && selectleavetypeObject) {
      const selectedEmployeeId = selectedEmployeeObject.id;

      const selectleavetypeId = selectleavetypeObject.leave_id;

      // Create a new leave object
      const newLeave = {
        id: selectedEmployeeId,
        leave_id: selectleavetypeId,
        names: selectedEmployee,
        selectleavetype: selectleavetype,
        startDate: startDate,
        endDate: endDate,
      };
      console.log("Data to be sent to theserver", newLeave);
      try {
        await axios.post(
          `http://localhost:5000/api/leavedetailstables/${id}`,
          newLeave
        );

        setLeaveData([...leaveData, newLeave]);
        setSelectedEmployee("");
        setSelectLeavetype("");
        setStartDate(null);
        setEndDate(null);
      } catch (error) {
        console.error("Error inserting leavedetails", error);
      }
    } else {
      console.log("Selected employee not found");
    }
    //navigate1(`/visitprofile/${data.id} `);
    navigate1("/employeepages ");
  };

  return (
    <div className="rinnercontainer">
      <br></br>
      <br></br>

      <ul class="nav flex-row">
        {/* <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/read">
            Home
          </a>
        </li> */}
        {/* <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/leave">
            Leave Type
          </a>
        </li> */}
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/rangeemployee">
            Apply Leave
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/logout">
            Logout
          </a>
        </li>
        {/* <li class="nav-item">
          <a
            class="nav-link active"
            aria-current="page"
            href="newprofile/${id}"
          >
            Profile
          </a>
        </li> */}
      </ul>

      <form className="leaverangeform">
        <div className="innercontainerOfDivrange">
          Select Employee Name
          <select
            style={{ color: "black" }}
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option className="optionnames" value="">
              Employee Name
            </option>
            {names.map((nameOption) => (
              <option
                style={{ color: "black" }}
                key={nameOption.id}
                value={nameOption.names}
                className="optionnames"
              >
                {nameOption.names}
              </option>
            ))}
          </select>
        </div>
        <br></br>
        <div className="innercontainerOfDivrange">
          Select Leave Type
          <select
            value={selectleavetype}
            onChange={(e) => setSelectLeavetype(e.target.value)}
          >
            <option value="">Leave Type </option>
            {leavetypeNames.map((leaveOption) => (
              <option key={leaveOption.id} value={leaveOption.id}>
                {leaveOption.leavetypeNames}
              </option>
            ))}
          </select>
        </div>
        <br></br>
        <div className="innercontainerOfDivrange">
          Select Starting Date Of Leave
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></input>
          <br></br>
        </div>
        <br></br>
        <div className="innercontainerOfDivrange">
          Select Endind Date Of Leave
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          ></input>
          <br></br>
        </div>
        <br></br>

        <button type="submit" className="addleave" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </div>
  );
}

export default LeaveFormEmployee;
