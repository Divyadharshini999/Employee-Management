//import cors from "cors";
//import bodyParser from "body-parser";
//import { Express } from "express";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;

// const inputDate = "6.6.2020";
// const parts = inputDate.split(".");
// const formattedDate = `${parts[2]}-${parts[1].padStart(
//   2,
//   "0"
// )}-${parts[0].padStart(2, "0")}`;
// console.log(formattedDate);
// Output: "2020-06-06"

let data = [
  { id: 1, names: "John Doe", Experiences: 30, dojs: "2000-01-03" },
  { id: 2, names: "Jane Smith", Experiences: 2, dojs: "2020-06-06" },
  // Add more sample data here
];

app.use(bodyParser.json());

app.use(cors());

// Get all data
app.get("/api/data", (req, res) => {
  res.json(data);
});

// Get data by ID
app.get("/api/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find((item) => item.id === id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

// Create new data
app.post("/api/data", express.json(), (req, res) => {
  const newItem = req.body;
  newItem.id = data.length + 1;
  data.push(newItem);
  res.status(201).json(newItem);
});

// Update data by ID
app.put("/api/data/:id", express.json(), (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;

  data = data.map((item) => {
    if (item.id === id) {
      return { ...item, ...updatedItem };
    }
    return item;
  });

  //res.json(updatedItem);
});

// Delete data by ID
app.delete("/api/data/:id", (req, res) => {
  const id = parseInt(req.params.id);

  data = data.filter((item) => item.id !== id);

  res.json({ message: "Data deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
