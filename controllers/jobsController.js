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
export const getAllJobsController = async (req, res, next) => {
  const jobs = await jobModels.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs: jobs.length,
    jobs,
  });
};

//update job
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  //validation
  if (!company || !position) {
    next("Please provide all fields.");
  }
};
