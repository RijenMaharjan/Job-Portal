import jobModels from "../models/jobModels.js";
import mongoose from "mongoose";
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
  //find job
  const job = await jobModels.findOne({ _id: id });
  //validation
  if (!job) {
    next(`No jobs found with this id ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not authorized to update this job");
    return;
  }
  const updateJob = await jobModels.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  //res
  res.status(200).json({ updateJob });
};

//delete job
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  //find job based on id
  const job = await jobModels.findOne({ _id: id });
  //validation
  if (!job) {
    next(`No job found whith this id ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not authorized to delete this job");
    return;
  }
  await job.deleteOne();
  res.status(200).json({
    message: "Success, job deleted",
  });
};

//jobs stats and filtter
export const jobStatsController = async (req, res) => {
  const stats = await jobModels.aggregate([
    //search by  user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    totalJob: stats.length,
    stats,
  });
};
