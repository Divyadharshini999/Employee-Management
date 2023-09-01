const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
const mysql = require("mysql2");
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

// Get all data
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

// API route to fetch data by ID
app.get("/api/emplyee_management/:id", (req, res) => {
  const id = req.params.id;
  const selectQuery = `SELECT names, Experiences,dojs FROM emplyee_management WHERE id = ?`;

  db.query(selectQuery, [id], (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ message: "Data fetch failed" });
    } else {
      res.json({
        names: result[0].names,
        Experiences: result[0].Experiences,
        dojs: result[0].dojs,
      });
    }
  });
});

//create new data
app.post("/api/emplyee_management", (req, res) => {
  const { names, Experiences, dojs } = req.body;
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

  const newItem = { names, Experiences, dojs };

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

//api call get id,names from emplyee_management table
app.get("/api/emplyee_management", (req, res) => {
  const query = "SELECT id, names from emplyee_management";
  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
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

//signup
app.post("/api/signup", (req, res) => {
  const { s_no, newadmin, email, password } = req.body;
  const insertQuery =
    "INSERT INTO signup (s_no,newadmin,email,password) VALUES (?,?,?,?)";
  if (!newadmin || !email || !password) {
    return res.status(400).json({ message: "Datas are not Inserted" });
  }
  db.query(insertQuery, [s_no, newadmin, email, password], (err, result) => {
    if (err) {
      console.error("Error adding Admin", err);
      return res.status(500).json({ message: "Error adding Admin " });
    }
    res.status(201).json({ message: "Adim added successfully" });
  });
});

app.post("/api/signin", (req, res) => {
  const { email, password } = req.body;

  // Debugging: Log the received email and password
  console.log("Received email:", email);
  console.log("Received password:", password);

  // Add code to check user credentials in the database
  const query = `SELECT s_no, email FROM signup WHERE email = ? AND password = ?`;

  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ message: "Database error" });
      return;
    }

    console.log("Query result:", result);

    if (result.length === 1) {
      // User credentials are correct
      const user = result[0];
      res
        .status(200)
        .json({ message: "Authentication successful", userId: user.s_no });
    } else {
      // User credentials are incorrect
      console.log("Authentication failed for email:", email);
      res.status(401).json({ message: "Authentication failed" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
