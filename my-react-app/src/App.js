// App.js

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CreatePage from "./components/CreatePage";
import ReadPage from "./components/ReadPage";
// import ReadParticularIDPage "./components/ReadParticularIDPage";
import UpdatePage from "./components/UpdatePage";
import LeavePage from "./components/LeavePage";
import LeaveRange from "./components/LeaveRange";
import EmployeeLeaveDetails from "./components/EmployeeLeaveDetails";
import SignUpPage from "./components/SignUpPage";
import SigninPage from "./components/SigninPage";
import AdminPage from "./components/AdminPage";
import EmployeePage from "./components/EmployeePage";
//import Profile from "./components/Profile";
//import NewProfile from "./components/NewProfile";
import LeaveFormEmployee from "./components/LeaveFormEmployee";
import EmployeePages from "./components/EmployeePages";
import VisitProfile from "./components/VisitProfile";
import UpdatePageAdmin from "./components/UpdatePageAdmin";

function ProtectedRoute({ role, children }) {
  // Check the user's role and render the component or redirect accordingly
  if (role === "admin" || role === "employee") {
    return children;
  } else {
    return <Navigate to="/employeepages" />;
  }
}

function App() {
  const user = {
    // Simulated user data with role
    role: "employee", // Change this based on the actual user's role
  };

  return (
    <div className="container">
      {/* ... your navigation */}
      <div className="addinput">
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/employeepages" element={<EmployeePages />} />
          <Route path="/visitprofile/:id" element={<VisitProfile />} />
          <Route path="/rangeemployee" element={<LeaveFormEmployee />} />
          <Route path="/updatebyadmin/:id" element={<UpdatePageAdmin />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute role={user.role}>
                <CreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/read"
            element={
              <ProtectedRoute role={user.role}>
                <ReadPage />
              </ProtectedRoute>
            }
          />

          <Route path="/update/:id" element={<UpdatePage />} />
          <Route
            path="/leave"
            element={
              <ProtectedRoute role={user.role}>
                <LeavePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/range"
            element={
              <ProtectedRoute role={user.role}>
                <LeaveRange />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employeepage"
            element={
              <ProtectedRoute role={user.role}>
                <EmployeePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leaveDetails"
            element={
              <ProtectedRoute role={user.role}>
                <EmployeeLeaveDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
