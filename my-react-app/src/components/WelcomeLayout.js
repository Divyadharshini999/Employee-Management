import React from "react";
//import ReactDOM from "react-dom/client";
//import "./index.css";
//  import App from './App';

// import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";

//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(

const useAuth = () => {
  const userRole = localStorage.getItem("userRole");
  if (userRole) {
    return true;
  } else {
    return false;
  }
};

function WelcomeLayout() {
  const user = useAuth();
  return (
    <div className="rinnercontainer">
      {/* <br></br>
      <br></br>
      <br></br>
      <br></br> */}
      <br></br>
      {user && (
        <>
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
              <a
                class="nav-link active"
                aria-current="page"
                href="/leaveDetails"
              >
                Leave Details
              </a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                href="/visitprofile/:id"
              >
                Visit Profile
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/logout">
                Logout
              </a>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
export default WelcomeLayout;

// import React from "react";
// import { Link } from "react-router-dom";
// //import jwt_decode from "jwt-decode"; // Import jwt-decode to decode JWT tokens

// // Check if the user is an admin based on their role obtained from JWT token
// const isAdmin = () => {
//   // Retrieve the role from JWT token (you need to pass the token from your authentication)
//   const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

//   if (!token) {
//     // No token found, not an admin
//     return false;
//   }

//   // Decode the token to access user information
//   const decodedToken = jwt_decode(token);

//   // Check if the user's role is "admin"
//   return decodedToken.role === "admin";
// };

// function WelcomeLayout({ children }) {
//   const userIsAdmin = isAdmin();

//   return (
//     <div className="rinnercontainer">
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <ul className="nav flex-row">
//         <li className="nav-item">
//           <Link className="nav-link active" to="/read">
//             Home
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link active" to="/leave">
//             Leave Type
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link active" to="/range">
//             Leave form
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link active" to="/leaveDetails">
//             Leave Details
//           </Link>
//         </li>
//         {userIsAdmin && (
//           <li className="nav-item">
//             {/* Show this link only if the user is an admin */}
//             <Link className="nav-link active" to="/visitprofile/admin">
//               Admin Profile
//             </Link>
//           </li>
//         )}
//         <li className="nav-item">
//           <Link className="nav-link active" to="/logout">
//             Logout
//           </Link>
//         </li>
//       </ul>
//       {children}
//     </div>
//   );
// }

// export default WelcomeLayout;

//
