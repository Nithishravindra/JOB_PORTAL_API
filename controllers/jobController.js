const Job = require('../model/jobModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');

exports.createJob = catchAsync(async (req, res, next) => {
  const employer = { employer: req.params.empID };
  const obj = Object.assign({}, req.body, employer);

  const job = await Job.create(obj);

  res.status(201).json({
    status: 'success',
    data: {
      Job: job
    }
  });
});

exports.getAllJobs = factory.getAll(Job);
exports.getJob = factory.getOne(Job);
exports.deleteJob = factory.deleteOne(Job);
