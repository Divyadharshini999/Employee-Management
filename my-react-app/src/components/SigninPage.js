import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SigninPage() {
  const navigate1 = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();

    // Send a POST request to your backend API to handle the signin
    axios
      .post("http://localhost:5000/api/signin", { email, password })
      .then((response) => {
        console.log("Signin successful");
        navigate1("/read");
      })
      .catch((error) => {
        console.error("Signin error:", error);
        if (error.response && error.response.status === 401) {
          setErrorMessage("Incoorect email or Password . Please try again");
        } else {
          setErrorMessage(
            "An error occurred during sign-in.Please try again later."
          );
        }
      });
  };

  return (
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
        <br></br>
        {errorMessage && <h5 className="error-message">{errorMessage}</h5>}
      </form>
    </div>
  );
}

export default SigninPage;
