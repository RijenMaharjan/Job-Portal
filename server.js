//Packages Imports
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const colors = require("colors");
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connect } from "http2";

//files IMPORTS
import connectDB from "./config/db.js";

//ROUTES IMPORTS
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

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

//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

//validation middleware
app.use(errorMiddleware);

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode on port no. ${PORT}`
      .bgCyan.white
  );
});
