// Require express package for server
const express = require("express");
// Require body-parser package for json body parsing
const bodyParser = require("body-parser");

// Get port from command line
const port = process.argv[2];

// Create express application
const app = express();

// Use body parser as middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
// Add header for for 'Access-Control-Allow-Origin
app.use("*", (req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET", "POST");
  res.header("Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
})

// Get method
app.get("/", (req, res) =>{
  console.log("GET methods")
  res.send("GET method from root");
});

// Post method
app.post("/", (req, res) =>{
  const username = req.body.username;
  const password = req.body.password;

  console.log(`POST User: ${username}, Pass: ${password}`);
  res.status(200).end;
})

// Remain listening from the port
app.listen(port, ()=>{
  console.log(`Server listening at http://localhost:${port}`);
});