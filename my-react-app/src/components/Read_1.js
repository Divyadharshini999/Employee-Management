import axios from "axios";
import React, { useState, useEffect } from "react";
//import { API_URL } from "../Constants/Url";
import { Link, useNavigate } from "react-router-dom";

function Read_1() {
  const [data, setAPIData1] = useState([]);
  const navigate1 = useNavigate();

  const deleteUser1 = async (id) => {
    await axios.delete(`http://localhost:5000/api/data/${id}`);
    callGetApi1();
  };
  //passing the values to the update page ,we have to use Local Storage
  const updateUser = ({ names, Experiences, dojs, id }) => {
    //setting the keys and values
    localStorage.setItem("id", id);
    localStorage.setItem("names", names);
    localStorage.setItem("Experiences", Experiences);
    localStorage.setItem("dojs", dojs);

    //navigate to Update page
    navigate1("/update");
  };

  const callGetApi1 = async () => {
    const response = await axios.get("http://localhost:5000/api/data");
    if (response.status === 200) {
      setAPIData1(response.data);
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

    <div>
      <br></br>
      <br></br>
      <Link to="/create" className="create">
        CREATE NEW EMPLOYEE
      </Link>
      <br></br>
      <br></br>
      {/* </div>  */}
      <table cellPadding={10}>
        <tr className="theading">
          <td>NAME</td>
          <td>EXPERIENCE</td>
          <td>DATE OF JOINING</td>
          <td>DELETE</td>
          <td>UPDATE</td>
        </tr>
        {/* the values we gonna read it in the table format by using "map()method" and assigning "id"as a key*/}
        {data.map((data) => (
          <tr key={data.id}>
            <td>{data.names}</td>
            <td>{data.Experiences}</td>
            <td>{data.dojs}</td>

            {/* for deleting the values , that particular "ID" or Array will be deleted */}
            <td>
              <button
                className="deletebutton"
                onClick={() => deleteUser1(data.id)}
              >
                Delete
              </button>
            </td>

            {/* for updating the values, all the datas should be pass to Update page*/}
            <td>
              <button className="updatebutton" onClick={() => updateUser(data)}>
                UPDATE
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Read_1;
