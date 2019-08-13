// Require express package for server
const express = require("express");
// Require body-parser package for json body parsing
const bodyParser = require("body-parser");
// Require CORS package
const cors = require("cors");

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
app.use(cors());

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

  let userInfo = { username: "", token:""};
  const token = await dbLogicObj.loginHandler(req.body);

  if (token) {
    userInfo.username = req.body.username;
    userInfo.token = token;
  }

  console.log("[server] login:",JSON.stringify(userInfo))

  res.send(JSON.stringify(userInfo));
})

///////////////////////////////////////////////////////////////////////////////
// Post method - Register
app.post("/register", async (req, res) => {
  console.log("POST: register operation");

  let userInfo = { username: "" };
  userInfo.username = await dbLogicObj.registerHandler(req.body);

  console.log(`[server] register: ${JSON.stringify(userInfo)}`)

  res.send(JSON.stringify(userInfo));
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

  console.log(`[server] Post profile: ${JSON.stringify(userInfo)}`);

  res.send(userInfo);
})

///////////////////////////////////////////////////////////////////////////////
// Put method - Profile
app.put("/profile", async (req, res) => {
  //console.log("PUT: profile operation:", req.body);

  await dbLogicObj.updateProfileInfoHandler(req.body)

  console.log(`[server] Put profile`);

  res.status(200).send('Updated');
})

///////////////////////////////////////////////////////////////////////////////
// Remain listening from the port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
