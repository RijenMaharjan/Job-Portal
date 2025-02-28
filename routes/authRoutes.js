import express from "express";
import { registerController } from "../controllers/authController.js";

//router objects
const router = express.Router();

//routes
// REGISTER||POST
router.post("/register", registerController);

//export
export default router;
