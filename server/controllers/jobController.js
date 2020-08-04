const Job = require("../model/jobModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllJobs = catchAsync(async (req, res, next) => {
  const jobs = await Job.find();

  res.status(200).json({
    status: "success",
    results: jobs.length,
    data: {
      jobs,
    },
  });
});

exports.getJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new AppError("No User found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      job,
    },
  });
});

exports.createJob = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const job = await Job.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      Job: job,
    },
  });
});
