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

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next(); // User is an admin, allow access
  } else {
    return res.status(403).json({ message: "Access denied" });
  }
};

//////////////////////////////////////////////////////////////

// JWT secret key (should be stored securely)
const secretKey = "your-secret-key";

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

// Get all data.............[original]
app.get("/api/emplyee_management", (req, res) => {
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
//.............................

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

//create new data
app.post("/api/emplyee_management", isAdmin, (req, res) => {
  const { names, Experiences, dojs, email } = req.body;
  const insertQuery = "INSERT INTO emplyee_management SET ?";
  if (!names) {
    return res.status(400).json({ message: "Name is required" });
  }
  if (!Experiences) {
    return res.status(400).json({ message: "Experience is required" });
  }
  if (!dojs) {
    return res.status(400).json({ message: "Date Of Joining is required" });
  }
  if (!email) {
    return res.status(400).json({ message: "email is required" });
  }

  const newItem = { names, Experiences, dojs, email };

  db.query(insertQuery, newItem, (err, result) => {
    if (err) {
      console.error("Error adding employee:", err);
      return res.status(500).json({ message: "Error adding employee" });
    }
    newItem.id = result.insertId;
    res.status(201).json(newItem);
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
    }
  });
});

function verifyToken(req, res, next) {
  const token = req.header("authorization");
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid  token" });
  }
}

//signin//////.....
app.post("/api/signin", (req, res) => {
  const { email, password } = req.body;
  const role = "admin";
  const token = jwt.sign({ role: role }, "secret-key");

  const selectQuery = "SELECT * FROM signup WHERE email = ?";
  db.query(selectQuery, [email], (err, result) => {
    if (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ message: "Error fetching user" });
    } else if (result.length === 0) {
      res.status(401).json({ message: "User not found" });
    } else {
      const storedHash = result[0].password;

      bcrypt.compare(password, storedHash, (err, match) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          res.status(500).json({ message: "Error comparing passwords" });
        } else if (match) {
          res.status(200).json({
            message: "Sign-in successful",
            role: result[0].role,
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

app.post("/api/profile", (req, res) => {
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

// API route to fetch profile data by ID from both tables
app.get("/api/profile", (req, res) => {
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
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
