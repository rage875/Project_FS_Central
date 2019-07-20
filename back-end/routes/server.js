// Require express package for server
const express = require("express");
// Require body-parser package for json body parsing
const bodyParser = require("body-parser");

// Require database logic module to handle db operations
const dbLogic = require("../database/logic");

// Get port from command line
const port = process.argv[2];

// Create express application
const app = express();
const dbLogicObj = new dbLogic();

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
app.get("/", async (req, res) =>{
  console.log("GET method from root")
  userList = await dbLogicObj.getUsersListHandler()
    .then(res => {return res});

  console.log("Users List:", userList);

  res.send(userList);
});

// Post method
app.post("/login", (req, res) =>{
  console.log("POST: login operation");

  dbLogicObj.loginHandler(req.body);

  res.status(200).end;
})

// Post method
app.post("/register", (req, res) =>{
  console.log("POST: register operation");

  dbLogicObj.registerHandler(req.body);

  res.status(200).end;
})

// Remain listening from the port
app.listen(port, ()=>{
  console.log(`Server listening at http://localhost:${port}`);
});