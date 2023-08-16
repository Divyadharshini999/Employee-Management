const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
const mysql = require("mysql2");

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
  db.query("SELECT * FROM emplyee_management", (err, data) => {
    if (err) {
      console.error("Error connecting to mysql:", err);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(data);
  });
});

// Get data by ID
app.get("/api/emplyee_management/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find((item) => item.id === id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

//create new data
app.post("/api/emplyee_management", (req, res) => {
  const { names, Experiences, dojs } = req.body;
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

  db.query("INSERT INTO emplyee_management SET ?", newItem, (err, result) => {
    if (err) {
      console.error("Error adding employee:", err);
      return res.status(500).json({ message: "Error adding employee" });
    }
    newItem.id = result.insertId;
    res.status(201).json(newItem);
  });
});

// Update data by ID
app.put("/api/emplyee_management/:id", (req, res) => {
  const { id } = req.params;
  const { names, Experiences, dojs } = req.body;
  if (!names) {
    return res.status(400).json({ message: "Name is required" });
  }
  if (!Experiences) {
    return res.status(400).json({ message: "Experience is required" });
  }
  if (!dojs) {
    return res.status(400).json({ message: "Date Of Joining is required" });
  }

  db.query(
    "UPDATE emplyee_management SET `names`= ?,`Experiences` = ?,`dojs`=? WHERE id = ?",
    [names, Experiences, dojs, id],
    (err, data) => {
      if (err) {
        console.error("Error updating employee:", err);
        return res.status(500).json({ message: "Error updating employee" });
      }
      res.json({ message: "Employee updated successfully" });
    }
  );
});

// Delete data by ID
app.delete("/api/emplyee_management/:id", (req, res) => {
  // const id = parseInt(req.params.id);
  const id = req.params.id;
  db.query("DELETE FROM emplyee_management where id = ?", [id], (err, data) => {
    if (err) {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ message: "Error deleting employee" });
    }
    res.json({ message: "Employee deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
