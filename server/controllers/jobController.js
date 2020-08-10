const Job = require("../model/jobModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handleFactory");

exports.createJob = catchAsync(async (req, res, next) => {
  const job = await Job.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      Job: job,
    },
  });
});

exports.getAllJobs = factory.getAll(Job);
exports.getJob = factory.getOne(Job);
exports.deleteJob = factory.deleteOne(Job);
