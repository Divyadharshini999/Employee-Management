//SigninPage.js
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SigninPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  const handleSignin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/signin", { email, password })
      .then((response) => {
        if (response.data.message === "Sign-in successful") {
          setUser(response.data);

          if (response.data.role === "admin") {
            navigate("/read");
          } else if (response.data.role === "employee") {
            navigate("/employeepages"); // Navigate to employeepages for employees
          }
        } else {
          navigate("/"); // Navigate to a default page if sign-in is not successful
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

      <ul class="nav flex-row">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">
            Welcome to React
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/signin">
            Signin
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">
            Signup
          </a>
        </li>
      </ul>
      <div className="container">
        <form className="leaverangeformin" onSubmit={handleSignin}>
          <div className="innercontainerOfDiv">
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
