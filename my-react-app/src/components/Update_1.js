import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Update_1() {
  const [names, setnames] = useState("");
  const [Experiences, setExperiences] = useState("");
  const [dojs, setDoJs] = useState("");
  const [id, setId] = useState("");

  const navigate1 = useNavigate();
  useEffect(() => {
    // console.log(localStorage.getItem('id'))
    // console.log(localStorage.getItem('name'))
    // console.log(localStorage.getItem('Experience'))
    // console.log(localStorage.getItem('doj'))

    //getting the stored values
    setId(localStorage.getItem("id"));
    setnames(localStorage.getItem("names"));
    setExperiences(localStorage.getItem("Experiences"));
    setDoJs(localStorage.getItem("dojs"));
  }, []);

  const updateb1 = async () => {
    //put method is used for updating
    await axios.put(`http://localhost:5000/api/emplyee_management/${id}`, {
      names,
      Experiences,
      dojs,
    });

    //after the updating the values, it navigate to the read page
    navigate1("/read");
  };

  return (
    <div>
      {/* update form */}
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
      <button type="button" onClick={updateb1} className="updatebutton1">
        Update
      </button>
    </div>
  );
}

export default Update_1;
