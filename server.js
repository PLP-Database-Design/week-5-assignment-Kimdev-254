const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
const dotenv = require("dotenv")

const app = express()
app.use(express.static(__dirname + "/public"))
app.use(express.json())
app.use(cors())
dotenv.config()

// Connect to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

// Check if connection is successful
db.connect((err) => {
  if (err) return console.log("Error connecting mysql db")
  console.log("Connected to mysql as id:", db.threadId)
})

// Set up view engine
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

// Question 1: Retrieve all patients
app.get("/patients", (req, res) => {
  db.query("SELECT * FROM patients", (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send("Error retrieving data")
    } else {
      res.render("data", { results: results })
    }
  })
})

// Question 2: Retrieve all providers
app.get("/providers", (req, res) => {
  db.query("SELECT * FROM providers", (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send("Error retrieving data")
    } else {
      res.render("providers", { results: results })
    }
  })
})

// Question 3: Retrieve Patients by their first names
app.get("/patients/firstname", (req, res) => {
  db.query("SELECT first_name FROM patients", (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send("Error retrieving patients")
    } else {
      if (results.length > 0) {
        res.render("firstnames", { firstNames: results }) // Render a new template with first names
      } else {
        res.status(404).send("No patients found")
      }
    }
  })
})

// Question 4: Retrieve all providers by their specialty
app.get("/providers/specialty", (req, res) => {
  db.query("SELECT DISTINCT provider_specialty FROM providers", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving specialty");
    } else {
      if (results.length > 0) {
        res.render("specialty", { specialty: results });
      } else {
        res.status(404).send("Specialty not found");
      }
    }
  });
});


// Server listening
const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
