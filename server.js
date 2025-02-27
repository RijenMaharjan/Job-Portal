//Imports
import express from "express";

//rest object
const app = express();

//route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to JOB PORTAL</h1>");
});

//listen
app.listen(8080, () => {
  console.log("Node Server Running");
});
