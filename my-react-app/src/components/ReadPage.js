import axios from "axios";
import React, { useState, useEffect } from "react";
//import { API_URL } from "../Constants/Url";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../Constants/Url";
import "../index1.css";
import WelcomeLayout from "./WelcomeLayout";

function ReadPage() {
  const [data, setAPIData1] = useState([]);
  //const navigate1 = useNavigate();

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    callGetApi1();
  };
  //passing the values to the update page ,we have to use Local Storage

  const callGetApi1 = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const role = localStorage.getItem("userRole");
      const id = localStorage.getItem("userId");
      const response = await axios.get(API_URL, {
        headers: { Authorization: token, role, id },
      });

      setAPIData1(response.data);
    } catch (error) {
      // if (response.status === 200) {
      // setAPIData1(response.data);
      console.error("Errr fetching data:", error);
    }
  };

  console.log(data);
  //setAPIData1(resp.data);

  //for getting same input values from API ,we have to use "useEffect" and with "dependency[]"->dependency is mainly use to change the input values
  useEffect(() => {
    callGetApi1();
  }, []);

  return (
    // <div>Read_1</div>
    <div className="rinnercontainer">
      <br></br>
      <br></br>
      <br></br>

      <WelcomeLayout></WelcomeLayout>
      {/* <div className="readpage"> */}
      <br></br>
      <br></br>
      <br></br>
      {/* <br></br>
      <br></br> */}
      <Link to="/create" className="newcreatelink">
        CREATE NEW EMPLOYEE
      </Link>
      <br></br>
      <br></br>
      {/* </div>  */}
      <div className="readtables">
        <table className="readtable" cellPadding={10}>
          <thead>
            <tr className="theading">
              <th>ID</th>
              <th>NAME</th>
              <th>EXPERIENCE</th>
              <th>DATE OF JOINING</th>
              <th>DELETE</th>
              <th>UPDATE</th>
            </tr>
          </thead>
          {/* the values we gonna read it in the table format by using "map()method" and assigning "id"as a key*/}
          <tbody>
            {data.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.names}</td>
                <td>{data.Experiences}</td>
                <td>{data.dojs}</td>

                {/* for deleting the values , that particular "ID" or Array will be deleted */}
                <td>
                  <button
                    className="deletebutton"
                    onClick={() => handleDelete(data.id)}
                  >
                    DELETE
                  </button>
                </td>

                {/* for updating the values, all the datas should be pass to Update page*/}
                <td>
                  <Link
                    to={`/updatebyadmin/${data.id} `}
                    className="updatebutton"
                  >
                    UPDATE
                  </Link>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReadPage;
