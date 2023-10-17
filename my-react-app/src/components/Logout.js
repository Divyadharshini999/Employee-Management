import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("userRole");

    localStorage.removeItem("userId");
    //localStorage.clear("userRole");
    //localStorage.clear("userId");
    navigate("/signin");
  }, [navigate]);

  return <div>logging out...</div>;
  //   const handleLogout = async () => {
  //     try {
  //       await axios.post("/api/logout");
  //       window.location.href = "/signin";
  //     } catch (error) {
  //       console.log("Logout failed", error);
  //     }
  //   };
  //   return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
