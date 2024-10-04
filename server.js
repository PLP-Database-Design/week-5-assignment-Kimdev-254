const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
const dotenv = require("dotenv")

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

// connect to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

//Check if DB connection works
db.connect((err) => {
  if (err) return console.log("Error connecting to mysql db")

  console.log("Connected to mysql db as id:", db.threadId)
})

//listen to the server
const port = process.env.DB_PORT
app.listen(port, () => {
  console.log(`Server runnign on http:${port}`)
})
