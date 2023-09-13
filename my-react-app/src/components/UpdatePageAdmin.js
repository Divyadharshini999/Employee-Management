import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../Constants/Url";

function UpdatePageAdmin() {
  const [names, setnames] = useState("");
  const [Experiences, setExperiences] = useState("");
  const [dojs, setDoJs] = useState("");
  //const [data, setdata] = useState();
  //const [id, setId] = useState("");
  const { id } = useParams();

  const navigate1 = useNavigate();
  //useEffect(() => {
  //getting the stored values
  //   setId(localStorage.getItem("id"));
  //   setnames(localStorage.getItem("names"));
  //   setExperiences(localStorage.getItem("Experiences"));
  //   setDoJs(localStorage.getItem("dojs"));
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setnames(response.data.names);
      setExperiences(response.data.Experiences);
      setDoJs(response.data.dojs);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${id}`, {
        names,
        Experiences,
        dojs,
        id,
      });
      navigate1("/read");
      console.log("Data updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rinnercontainer">
      <br></br>
      <br></br>

      <ul class="nav flex-row">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/read">
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

      <div className="updateform">
        {/* update form */}

        <input
          type="text"
          placeholder="Enter ID"
          value={id}
          // onChange={(event) => setId(event.target.value)}
        ></input>
        <br></br>
        <input
          type="text"
          placeholder="Enetr Name"
          value={names}
          onChange={(event) => setnames(event.target.value)}
        ></input>
        <br></br>

        <input
          type="text"
          placeholder="Experience in years"
          value={Experiences}
          onChange={(event) => setExperiences(event.target.value)}
        ></input>
        <br></br>
        <input
          type="date"
          className="date"
          placeholder="Enter the Date of Joining"
          value={dojs}
          onChange={(event) => setDoJs(event.target.value)}
        ></input>
        <br></br>
        <br></br>
        <button type="button" onClick={handleUpdate} className="updatebutton1">
          Update
        </button>
      </div>
    </div>
  );
}

export default UpdatePageAdmin;
