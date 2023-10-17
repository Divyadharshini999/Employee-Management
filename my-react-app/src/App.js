// //App.js
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CreatePage from "./components/CreatePage";
import ReadPage from "./components/ReadPage";
import LeavePage from "./components/LeavePage";
import LeaveRange from "./components/LeaveRange";
import EmployeeLeaveDetails from "./components/EmployeeLeaveDetails";
import SignUpPage from "./components/SignUpPage";
import SigninPage from "./components/SigninPage";
import VisitProfile from "./components/VisitProfile";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";
import LeaveFormEmployee from "./components/LeaveFormEmployee";
import UpdatePageAdmin from "./components/UpdatePageAdmin";
import UpdatePage from "./components/UpdatePage";

function App() {
  const userRole = localStorage.getItem("userRole");

  return (
    <div className="rinnercontainer">
      <div className="container">
        <div className="addinput">
          <Routes>
            <Route path="/" element={<SignUpPage />} />
            <Route path="/signin" element={<SigninPage />} />

            {userRole === "admin" ? (
              // Admin Routes
              <>
                <Route path="/read" element={<ReadPage />} />
                <Route path="/leave" element={<LeavePage />} />
                <Route path="/range" element={<LeaveRange />} />
                <Route path="/create" element={<CreatePage />} />
                <Route
                  path="/leaveDetails"
                  element={<EmployeeLeaveDetails />}
                />
                <Route
                  path="/updatebyadmin/:id"
                  element={<UpdatePageAdmin />}
                />

                <Route
                  path="/visitprofile/:id"
                  element={<Navigate to="/404" />}
                />
                <Route path="/rangeemployee" element={<Navigate to="/404" />} />
              </>
            ) : userRole === "employee" ? (
              // Employee Routes
              <>
                <Route path="/visitprofile/:id" element={<VisitProfile />} />
                <Route path="/rangeemployee" element={<LeaveFormEmployee />} />
                <Route path="/update/:id" element={<UpdatePage />} />
                <Route path="/read" element={<Navigate to="/404" />} />
                <Route path="/leave" element={<Navigate to="/404" />} />
                <Route path="/range" element={<Navigate to="/404" />} />
                <Route path="/leaveDetails" element={<Navigate to="/404" />} />
                <Route
                  path="/updatebyadmin/:id"
                  element={<Navigate to="/404" />}
                />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/404" replace />} />
            )}

            <Route path="/logout" element={<Logout />} />
            <Route path="404" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
