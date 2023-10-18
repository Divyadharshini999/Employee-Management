//server.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
//const secretKey = "ypur-secret-key";
//const { Connection } = require("mysql2/typings/mysql/lib/Connection");

let data = [
  { id: 1, names: "hbmju", Experiences: 1, dojs: "2000-01-03" },
  { id: 2, names: "Jane Smith", Experiences: 2, dojs: "2020-06-06" },
  // Add more sample data here
];

app.use(bodyParser.json());

app.use(cors());

//connect mysql
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "firstdb",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to mysql:", err);
    return;
  }
  console.log("connected to mysql");
});

const secretKey = "secretKey";

// API endpoint for user login and generating JWT
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Verify the email and password against the database (you should hash and compare passwords securely)
  db.query(
    "SELECT * FROM signup WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        throw err;
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // User authenticated, generate JWT
      const user = results[0];
      const token = jwt.sign({ id: user.id, role: user.role }, secretKey, {
        expiresIn: "1h", // Token expires in 1 hour
      });

      res.json({ token });
    }
  );
});

// API route to fetch data by ID
app.get("/api/emplyee_management/:id", (req, res) => {
  const id = req.params.id;
  const selectQuery = `SELECT names, Experiences,dojs,email FROM emplyee_management WHERE id = ?`;
  console.log(req.role);
  // console.log("User role:",req.user.role);
  db.query(selectQuery, [id], (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ message: "Data fetch failed" });
    } else if (result.length === 0) {
      res.status(404).json({ message: "employee not found" });
    } else {
      res.json({
        id: result[0].id,
        names: result[0].names,
        Experiences: result[0].Experiences,
        dojs: result[0].dojs,
        // role: result[0].role,
        email: result[0].email,
      });
    }
  });
});

// API route to update data by ID
app.put("/api/emplyee_management/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { names, Experiences, dojs } = req.body;

  // Update data in MySQL
  const updateQuery =
    "UPDATE emplyee_management SET `names` = ?,`Experiences`= ?,`dojs`=? WHERE id = ?";
  db.query(updateQuery, [names, Experiences, dojs, id], (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      res.status(500).json({ message: "Update failed" });
    } else {
      console.log("Data updated successfully");
      res.json({ message: "Data updated successfully" });
    }
  });
});
// Delete data by ID
app.delete("/api/emplyee_management/:id", (req, res) => {
  const id = req.params.id;
  const deleteQuery = "DELETE FROM emplyee_management where id = ?";
  db.query(deleteQuery, [id], (err, data) => {
    if (err) {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ message: "Error deleting employee" });
    }
    res.json({ message: "Employee deleted successfully" });
  });
});

//create leavetypename
app.post("/api/leave", (req, res) => {
  const { leave_id, leavetypeNames } = req.body;
  const insertQuery =
    "INSERT INTO  leaveTypeNameTables (leave_id, leavetypeNames) VALUES (?, ?)";

  db.query(insertQuery, [leave_id, leavetypeNames], (err, result) => {
    if (err) {
      console.error("Error adding leave type:", err);
      return res.status(500).json({ message: "Error adding leave type" });
    }
    res.status(201).json({ message: "Leave type added successfully" });
  });
});

//get leavetypenames
app.get("/api/leaves", (req, res) => {
  const selectQuery = "SELECT * FROM leaveTypeNameTables ";
  db.query(selectQuery, (err, data) => {
    if (err) {
      console.error("Error connecting to mysql:", err);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(data);
  });
});

//api get names from leavetypetable
app.get("/api/leaves", (req, res) => {
  const query = "SELECT leave_id,leavetypeNames from leavetypenametables";
  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

app.get("/api/leavedetailstables", (req, res) => {
  // const selectQuery = "SELECT * FROM   leavedetailstables ";
  const selectQuery = `
    SELECT 
      l.lea_det_id,
      l.id,
      l.leave_id,
      e.names AS selectedEmployee,
      lt.leavetypeNames AS selectleavetype,
      l.startDate,
      l.endDate
    FROM
      leavedetailstables AS l
    LEFT JOIN
      emplyee_management AS e
    ON
      l.id = e.id
    LEFT JOIN
      leaveTypeNameTables AS lt
    ON
      l.leave_id = lt.leave_id
  `;
  db.query(selectQuery, (err, data) => {
    if (err) {
      console.error("Error connecting to mysql:", err);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(data);
  });
});

app.post("/api/leavedetailstables", (req, res) => {
  const { id, leave_id, startDate, endDate } = req.body;
  const insertQuery =
    "INSERT INTO leavedetailstables (id,leave_id, startDate, endDate) VALUES ( ?, ?, ?,?)";
  if (!id || !leave_id || !startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Invalid Data. All fields are required" });
  }

  db.query(insertQuery, [id, leave_id, startDate, endDate], (err, result) => {
    if (err) {
      console.error("Error adding leave details:", err);
      return res.status(500).json({ message: "Error adding leave details" });
    }
    res.status(201).json({ message: "Leave details added successfully" });
  });
});

app.post("/api/leavedetailstables/:id", (req, res) => {
  const { id, leave_id, startDate, endDate } = req.body;
  const insertQuery =
    "INSERT INTO leavedetailstables (id,leave_id, startDate, endDate) VALUES ( ?, ?, ?,?)";
  if (!id || !leave_id || !startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Invalid Data. All fields are required" });
  }

  db.query(insertQuery, [id, leave_id, startDate, endDate], (err, result) => {
    if (err) {
      console.error("Error adding leave details:", err);
      return res.status(500).json({ message: "Error adding leave details" });
    }
    res.status(201).json({ message: "Leave details added successfully" });
  });
});

//signup
app.post("/api/signup", (req, res) => {
  const { usernames, email, password, role, id } = req.body;

  // Hash the password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      res.status(500).json({ message: "Error hashing password" });
    } else {
      // Store the hashed password in database
      const insertQuery =
        "INSERT INTO signup (usernames,email, password,role,id) VALUES (?,?, ?,?,?)";
      db.query(
        insertQuery,
        [usernames, email, hash, role, id],
        (err, result) => {
          if (err) {
            console.error("Error inserting user:", err);
            res.status(500).json({ message: "Error inserting user" });
          } else {
            res.status(201).json({ message: "User registered successfully" });
          }
        }
      );
    }
  });
});

app.get("/api/signup/:email", (req, res) => {
  const email = req.params.email;
  const selectQuery = "SELECT id FROM signup WHERE email = ?";
  db.query(selectQuery, [email], (err, result) => {
    if (err) {
      console.error("Error fetching employee ID:", err);
      res.status(500).json({ message: "Error fetching employee ID" });
    } else if (result.length === 0) {
      res.status(404).json({ message: "Employee not found" });
    } else {
      res.json(result[0]);
      //console.log(result[0]);
    }
  });
});

const verifyToken = (req, res, next) => {
  //const user=admin;
  const token = req.headers.authorization;
  //const token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error("Token verification failed", err);
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    req.user = decoded;
    next();
  });
};

app.get("/api/emplyee_management", verifyToken, (req, res) => {
  const selectQuery = "SELECT * FROM emplyee_management ";
  db.query(selectQuery, (err, data) => {
    if (err) {
      console.error("Error connecting to mysql:", err);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(data);
  });
});

app.get("/api/profile", verifyToken, (req, res) => {
  const id = req.query.id;

  const selectQuery = `
    SELECT em.id, em.names, em.Experiences, em.dojs, p.email
    FROM emplyee_management em
    LEFT JOIN profile p ON em.id = p.id
    WHERE em.id = ?
  `;

  db.query(selectQuery, [id], (err, result) => {
    if (err) {
      console.error("Error fetching profile data:", err);
      res.status(500).json({ message: "Data fetch failed" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Return the combined data for the specified id
    res.json(result[0]);
    //res.json({ message: "Profile data" });
  });
});

//signin//////.....
app.post("/api/signin", (req, res) => {
  const { email, password } = req.body;
  //const role = "admin";
  //const token = jwt.sign({ role: role }, "secretkey");

  const selectQuery = "SELECT * FROM signup WHERE email = ?";
  db.query(selectQuery, [email], (err, result) => {
    if (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ message: "Error fetching user" });
    } else if (result.length === 0) {
      res.status(401).json({ message: "User not found" });
    } else {
      const storedHash = result[0].password;
      //const token = jwt.sign({ role: role }, "secretkey");

      bcrypt.compare(password, storedHash, (err, match) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          res.status(500).json({ message: "Error comparing passwords" });
        } else if (match) {
          const role = result[0].role;
          const token = jwt.sign({ role: role }, "secretKey");
          res.status(200).json({
            message: "Sign-in successful",
            //role,

            role: role,
            id: result[0].id,
            token,
          });
          console.log("correct email and password", result, token);
          //res.json({ token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
          console.error("Password or email not match");
        }
      });
    }
  });
});

app.post("/api/profile", verifyToken, (req, res) => {
  const { id, email } = req.body;
  const insertQuery = "INSERT INTO profile SET ?";
  if (!id || !email) {
    return res.status(400).json({ message: "Both id and email are required" });
  }

  const newItem = { id, email };

  db.query(insertQuery, newItem, (err, result) => {
    if (err) {
      console.error("Error adding profile:", err);
      return res.status(500).json({ message: "Error adding profile" });
    }
    newItem.id = result.insertId;
    res.status(201).json(newItem);
  });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Logout failed" });
    } else {
      res.json({ message: "Logout successful" });
    }
  });
});
//const port = process.env.PORT || 3000;

//new api
app.get("/api/user", verifyToken, (req, res) => {
  // Inside this endpoint, you can access the user's information based on their token.
  // You should replace this code with your actual logic to fetch user data from your database.

  const userId = req.user.id; // Access the user's ID from the token

  // Fetch user data from your database (replace with your database logic)
  const selectQuery = "SELECT * FROM signup WHERE id = ?";
  db.query(selectQuery, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ message: "Error fetching user data" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data as a JSON response
    const userData = {
      id: result[0].id,
      usernames: result[0].usernames,
      email: result[0].email,
      // Add other user data fields as needed
    };

    res.json(userData);
  });
});

const isTokenValid = (token) => {
  try {
    // Use your secret key (or public key for RS256) to verify the token's signature
    // Replace 'yourSecretKey' with your actual secret key.
    const decoded = jwt.verify(token, "yourSecretKey");

    // Check if the token has expired
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return false; // Token is expired
    }

    // Add any additional custom validation logic here
    // For example, you might check custom claims in the token.

    return true; // Token is valid
  } catch (error) {
    return false; // Token is invalid or has an issue (e.g., expired, malformed)
  }
};
app.get("/api/employees", (req, res) => {
  const userRole = getUserRole(req);

  if (userRole === "admin") {
    // Handle logic for admin role
    res.json({ message: "You have admin access to employee data" });
  } else if (userRole === "employee") {
    // Handle logic for employee role
    res.json({ message: "You have employee access to employee data" });
  } else {
    // Handle cases where the role is not defined or unauthorized
    res.status(403).json({ message: "Access denied" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
