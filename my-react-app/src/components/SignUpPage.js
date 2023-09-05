import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function SignUpPage() {
  const navigate1 = useNavigate();
  const [newadmin, setnewAdmin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    axios
      .post("http://localhost:5000/api/signup", { newadmin, email, password })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error(error.response.data.error);
      });
    navigate1("/signin");
  };

  return (
    <div className="signup">
      <br></br>
      <br></br>
      <form>
        <div className="innercontainerOfDivup">
          <input
            type="type"
            value={newadmin}
            onChange={(e) => setnewAdmin(e.target.value)}
            placeholder="Enetr the Admin Name"
          ></input>
          <br></br>
          <br></br>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter the Email"
          ></input>
          <br></br> <br></br>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter the Password"
          ></input>
          <br></br>
          <br></br>
          {/* </div> */}
          <button type="submit" className="addleave" onClick={handleSignup}>
            SIGN UP
          </button>
          <br></br>
          <hr className="hr"></hr>
          <Link to={"/signin"} className="addleave">
            already Registered
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
