import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobController,
  getAllJobsController,
  updateJobController,
} from "../controllers/jobsController.js";

const router = express.Router();

//routes
// CREATE JOB || POST
router.post("/create-job", userAuth, createJobController);

// GET JOB || GET
router.get("/get-job", userAuth, getAllJobsController);

// GET JOB || UPDATE || PUT || PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

// GET JOB || GET
// router.get("/get-job", userAuth, getAllJobsController);

export default router;
