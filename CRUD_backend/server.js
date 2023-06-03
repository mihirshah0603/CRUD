const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());
const cors = require('cors');
server.use(cors());

// Establish connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_crud",
});

db.connect(function (error) {
  if (error) {
    console.log("Error connecting to DB");
  } else {
    console.log("Successfully connected to DB");
  }
});

// Establishing port
server.listen(8808, function check(err) {
  if (err) {
    console.log("Error starting the server");
  } else {
    console.log("Server is running on port 8808");
  }
});

// Adding details
server.post("/api/table1/add/", (req, res) => {
  let details = {
    name: req.body.name,
    mobileNumber: req.body.mobileNumber,
    gender: req.body.gender,
    age: req.body.age,
  };
  let sql = "INSERT INTO table1 SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Details not updated" });
    } else {
      res.send({ status: true, message: "Details updated" });
    }
  });
});

// View details
server.get("/api/table1/", (req, res) => {
  let sql = "SELECT * FROM table1";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Failed to retrieve details");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Search details
server.get("/api/table1/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM table1 WHERE id=" + id;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error connecting");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update details
server.put("/api/table1/update/:id/", (req, res) => {
  const sql = `UPDATE table1 SET name = '${req.body.name}', mobileNumber = '${req.body.mobileNumber}', gender = '${req.body.gender}', age = '${req.body.age}' WHERE id='${req.params.id}'`;
  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Update failed" });
    } else {
      res.send({ status: true, message: "Update successful" });
    }
  });
});

// Delete details
server.delete("/api/table1/delete/:id/", (req, res) => {
  const sql = "DELETE FROM table1 WHERE id=" + req.params.id;
  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Not deleted" });
    } else {
      res.send({ status: true, message: "Delete successful" });
    }
  });
});
