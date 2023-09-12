import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function SignUpPage() {
  const navigate1 = useNavigate();
  const [usernames, setusernames] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setrole] = useState("");
  const [id, setid] = useState("");

  const handleSignup = () => {
    axios
      .post("http://localhost:5000/api/signup", {
        usernames,
        email,
        password,
        role,
        id,
      })
      .then((response) => {
        console.log("Signup successful");
      })
      .catch((error) => {
        console.error("Signup error:", error);
      });
    navigate1("/signin");
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
      <div className="signup">
        <br></br>
        <br></br>
        <form>
          <div className="innercontainerOfDivup">
            <input
              type="type"
              value={usernames}
              onChange={(e) => setusernames(e.target.value)}
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
            <input
              type="type"
              value={id}
              onChange={(e) => setid(e.target.value)}
              placeholder="Enter the id"
            ></input>
            <br></br>
            {/* <input type="radio"></input> */}
            <br></br>
            <select
              style={{ color: "black" }}
              value={role}
              onChange={(e) => setrole(e.target.value)}
            >
              <option className="optionnames" value="">
                selectrole
              </option>

              <option>admin</option>
              <option>employee</option>
            </select>
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
    </div>
  );
}

export default SignUpPage;
