import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import CreatePage from "./components/CreatePage";
import ReadPage from "./components/ReadPage";
import UpdatePage from "./components/UpdatePage";
//import LeaveType from "./components/LeaveType";
// import Leave from "./components/Leave";
import LeavePage from "./components/LeavePage";
import LeaveRange from "./components/LeaveRange";
import EmployeeLeaveDetails from "./components/EmployeeLeaveDetails";
import SignUpPage from "./components/SignUpPage";
import SigninPage from "./components/SigninPage";

function App() {
  return (
    <div className="container">
      <nav class=" navbar  bg-primary ">
        <div class="container-fluid justify-content-center  ">
          <span class=" nav navbar-brand mb-0 h1 ">
            Welome to the react project
          </span>
          <div className="links">
            <Link to="/signin" className="links">
              SIGN IN
            </Link>
            <Link to="/" className="links">
              SIGN UP
            </Link>
          </div>
        </div>
      </nav>

      <div className="rinnercontainer "></div>
      <div className="addinput">
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/read" element={<ReadPage />} />
          <Route path="/update/:id" element={<UpdatePage />} />
          {/* <Route path="/leave/:id" element={<Leave />} /> */}
          <Route path="/leave" element={<LeavePage />} />
          <Route path="/range" element={<LeaveRange />} />
          <Route path="/leaveDetails" element={<EmployeeLeaveDetails />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
