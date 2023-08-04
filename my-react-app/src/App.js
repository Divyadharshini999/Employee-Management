import React from "react";
// import AddEmployee from './AddEmployee'
function EmployeeList() {
  const person = [
    {
      id: 1,
      Name: "Divya",
      Experience: "2 Years",
      Date_Of_Joining: "22.06.2020",
    },
    {
      id: 2,
      Name: "Divya",
      Experience: "2 Years",
      Date_Of_Joining: "22.06.2020",
    },
    {
      id: 3,
      Name: "Divya",
      Experience: "2 Years",
      Date_Of_Joining: "22.06.2020",
    },
    {
      id: 4,
      Name: "Divyasrii",
      Experience: "2 Years",
      Date_Of_Joining: "22.06.2020",
    },
  ];

  const listItems = person.map((element) => {
    return (
      <div className="ta">
        <tr>
          <td>Name</td>
        </tr>
        <table border={1} width="50%" cellPadding={10} bgcolor="lightgray">
          <tbody>
            <tr>
              <td>{element.id}</td>
              <td>{element.Name}</td>
              <td>{element.Experience}</td>
              <td>{element.Date_Of_Joining}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  });
  return listItems;
}
function App() {
  return <EmployeeList />;
}

export default App;

// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Create_1 from "./components/Create_1";
// import Read_1 from "./components/Read_1";
// import Update_1 from "./components/Update_1";
// function App(){
//   return(
//     <div>
//       {/* <BrowserRouter> */}
//       <Routes>
//         <Route path="/create_1" element={<Create_1/>}/>
//         <Route path="/read_1" element={<Read_1/>}/>
//         <Route path="/update_1" element={<Update_1/>}/>

//       </Routes>

//       {/* </BrowserRouter>
//      */}
//     </div>
//   )
// }
// export default App
