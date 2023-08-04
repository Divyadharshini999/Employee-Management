import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import App from "../App";
import Create_1 from "./Create_1";
import Read_1 from "./Read_1";
import Update_1 from "./Update_1";

function AddEmployee() {
  // const name
  return (
    <div className="container">
      <p>Welome to the react project</p>
      <div className="innercontainer">
        <Link to="/employeelist">EMPLOYEE LIST</Link>
        <br></br>
        <br></br>
        {/* <Link to="/create">CREATE NEW EMPLOYEE </Link> */}
        <Link to="/create">NEW EMPLOYEE</Link>
      </div>
      <div className="addinput">
        <Routes>
          <Route path="/employeelist" element={<App />} />
          {/* <Route path="/addnew" element={<AddNew/>}/> */}
          <Route path="/create" element={<Create_1 />} />
          <Route path="/read" element={<Read_1 />} />
          {/* <Route path="/update/:id" element={<Update_1 />} /> */}
          <Route path="/update" element={<Update_1 />} />
        </Routes>
      </div>
    </div>
  );
}
export default AddEmployee;
