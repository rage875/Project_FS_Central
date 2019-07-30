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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// Add header for for 'Access-Control-Allow-Origin
app.use("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET", "POST");
  res.header("Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
})

///////////////////////////////////////////////////////////////////////////////
// Get method
app.get("/", async (req, res) => {
  console.log("GET method from root")

  const type = "public";
  const usersListDB = await dbLogicObj.getUsersListHandler(type);

  res.send(JSON.stringify(usersListDB));
});

///////////////////////////////////////////////////////////////////////////////
// Post method - Login
app.post("/login", async (req, res) => {
  console.log("POST: login operation");

  let userInfo = { username: "" };
  const userDB = await dbLogicObj.loginHandler(req.body);

  if (userDB) {
    userInfo.username = userDB.public.username;
  }

  console.log(JSON.stringify(userInfo))

  res.send(JSON.stringify(userInfo));
})

///////////////////////////////////////////////////////////////////////////////
// Post method - Register
app.post("/register", (req, res) => {
  console.log("POST: register operation");
  dbLogicObj.registerHandler(req.body);

  res.status(200).end;
})

///////////////////////////////////////////////////////////////////////////////
// Post method - Profile
app.post("/profile", async (req, res) => {
  console.log("POST: profile operation");
  let userInfo = { public: { username: "" } };
  const userDB = await dbLogicObj.getProfileInfoHandler(req.body)

  if (userDB) {
    userInfo = userDB;
  }

  console.log(`[server] Profile: ${userInfo}`);

  res.send(userInfo);
})

///////////////////////////////////////////////////////////////////////////////
// Remain listening from the port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
