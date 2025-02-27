//Packages Imports
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const colors = require("colors");
import express from "express";
import dotenv from "dotenv";
//files imports
import cors from "cors";
import morgan from "morgan";
import { connect } from "http2";
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";

//DOT ENV config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//route
app.use("/api/v1/test", testRoutes);

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode on port no. ${PORT}`
      .bgCyan.white
  );
});
