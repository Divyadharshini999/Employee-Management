import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
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

    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
