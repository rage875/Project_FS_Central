// Require express package
const express = require("express");

// Get port from command line
const port = process.argv[2];

// Create express application
const app = express();

// Get method
app.get("/", (req, res) =>{
  res.send("GET method from root");
});

// Remain listening from the port
app.listen(port, ()=>{
  console.log(`Server listening at http://localhost:${port}`);
});