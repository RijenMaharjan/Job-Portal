//Imports
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import express from "express";
import dotenv from "dotenv";
const colors = require("colors");
//DOT ENV config
dotenv.config();

//rest object
const app = express();

//route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to JOB PORTAL</h1>");
});

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode on port no. ${PORT}`
      .bgCyan.white
  );
});
