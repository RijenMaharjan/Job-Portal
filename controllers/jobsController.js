import jobModels from "../models/jobModels.js";

//Create job
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please provide all fields.");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobModels.create(req.body);
  res.status(201).json({ job });
};

//get job
export const getAllJobsController = () => {};
