import express from "express";
import userAuth from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routes
//Get USERS || GET

//Update USER || PUT
router.put("/update-user", userAuth);

export default user;
