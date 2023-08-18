import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import CreatePage from "./components/CreatePage";
import ReadPage from "./components/ReadPage";
import UpdatePage from "./components/UpdatePage";

function App() {
  return (
    <div className="container">
      <nav class=" navbar  bg-primary ">
        <div class="container-fluid justify-content-center  ">
          <span class=" nav navbar-brand mb-0 h1 ">
            Welome to the react project
          </span>
        </div>
      </nav>

      <div className="innercontainer bg-primary">
        <br></br>
        <br></br>

        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">
              Home
            </a>
          </li>
        </ul>
      </div>
      <div className="addinput">
        <Routes>
          <Route path="/create" element={<CreatePage />} />
          <Route path="/" element={<ReadPage />} />
          <Route path="/update/:id" element={<UpdatePage />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
