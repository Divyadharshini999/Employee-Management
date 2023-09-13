import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function VisitProfile() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profile?id=${id}`
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="rinnercontainer">
      <br></br>
      <br></br>

      <ul class="nav flex-row">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">
            Welcome {profileData.names}!
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/rangeemployee">
            Apply Leave
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/logout">
            Logout
          </a>
        </li>
      </ul>
      {/* Display the profileData */}
      <table className="profiletable" cellPadding={10}>
        <tr>
          <h3></h3>
        </tr>
        <tr>
          <td>
            <h5>ID</h5>
          </td>{" "}
          <td>
            <h5>{profileData.id}</h5>
          </td>
        </tr>
        <tr>
          <td>
            <h5>Name</h5>
          </td>{" "}
          <td>
            <h5>{profileData.names}</h5>
          </td>
        </tr>

        <tr>
          <td>
            <h5>Date of Joining</h5>
          </td>{" "}
          <td>
            <h5>{profileData.dojs}</h5>
          </td>
        </tr>

        <tr>
          <td>
            <h5>Experiences</h5>{" "}
          </td>
          <td>
            <h5>{profileData.Experiences} Year</h5>
          </td>
        </tr>
        <tr>
          <td>
            {" "}
            <h5>Email</h5>
          </td>{" "}
          <td>
            <h5>{profileData.email}</h5>
          </td>
        </tr>
      </table>

      <br></br>
      <br></br>
      {/* <Link to="/profile">Back to Profile</Link> */}
      <Link to={`/update/${profileData.id} `} className="updatebutton">
        UPDATE
      </Link>
    </div>
  );
}

export default VisitProfile;
