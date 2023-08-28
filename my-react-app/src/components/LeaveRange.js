import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { API_URL } from "../Constants/Url";
//import DatePicker from "react-datepicker";

function LeaveRange() {
  //const { id } = useParams();
  const navigate1 = useNavigate();
  const [names, setnames] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [leavetypeNames, setLeaveTypeNames] = useState([]);
  const [selectleavetype, setSelectLeavetype] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [leaveData, setLeaveData] = useState([]);

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

    if (selectedEmployeeObject) {
      const selectedEmployeeId = selectedEmployeeObject.id;

      // Create a new leave object
      const newLeave = {
        id: selectedEmployeeId,
        names: selectedEmployee,
        selectleavetype: selectleavetype,
        startDate: startDate,
        endDate: endDate,
      };
      console.log("Data to be sent to theserver", newLeave);
      try {
        await axios.post("http://localhost:5000/api/leavedetails", newLeave);

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
    navigate1("/leaveDetails");
  };

  return (
    <form className="leaverangeform">
      <div className="innercontainerOfDiv">
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
      <div className="innercontainerOfDiv">
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
      <div className="innercontainerOfDiv">
        Select Starting Date Of Leave
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        ></input>
        <br></br>
      </div>
      <br></br>
      <div className="innercontainerOfDiv">
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
  );
}

export default LeaveRange;
