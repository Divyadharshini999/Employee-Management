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

function App() {
  return (
    <div className="container">
      <nav class=" navbar  bg-primary ">
        <div class="container-fluid justify-content-center  ">
          <span class=" nav navbar-brand mb-0 h1 ">
            Welome to the react project
          </span>
        </div>
      </nav>

      <div className="innercontainer bg-primary">
        <br></br>
        <br></br>

        <ul class="nav flex-column">
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
      </div>
      <div className="addinput">
        <Routes>
          <Route path="/create" element={<CreatePage />} />
          <Route path="/" element={<ReadPage />} />
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
