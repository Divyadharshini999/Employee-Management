//SigninPage.js
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useUser } from "./userContext1"; // Import the useUser hook

function SigninPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [id, setid] = useState();

  const handleSignin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/signin", { email, password })
      .then((response) => {
        if (response.data.message === "Sign-in successful") {
          // Store user data in local storage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userRole", response.data.role);
          localStorage.setItem("userId", response.data.id);
          //localStorage.setItem("token", response.data.token);

          if (response.data.role === "admin") {
            navigate("/read");
          } else if (response.data.role === "employee") {
            const employeeId = response.data.id;
            if (employeeId) {
              // navigate("/visitprofile/" + response.data.id);
              // navigate(`/visitprofile/${response.data.id}`);
              navigate(`/visitprofile/${employeeId}`);
            }
          }
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Signin error:", error);
        if (error.response && error.response.status === 401) {
          setErrorMessage("Incorrect email or password. Please try again");
        } else {
          setErrorMessage(
            "An error occurred during sign-in. Please try again later."
          );
        }
      });
  };

  return (
    <div className="rinnercontainer">
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="container">
        <form className="leaverangeformin" onSubmit={handleSignin}>
          <div className="innercontainerOfDiv">
            {/* Your input fields and other form elements here */}
            {/* ... */}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter the Email"
            />
            <br />
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter the Password"
            />
            <br />
            <br />
            <button type="submit" className="addleave">
              SIGN IN
            </button>
          </div>
          <br />
          {errorMessage && <h5 className="error-message">{errorMessage}</h5>}
        </form>
      </div>
    </div>
  );
}

export default SigninPage;
