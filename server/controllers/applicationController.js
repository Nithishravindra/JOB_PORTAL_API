const catchAsync = require("../utils/catchAsync");
const Application = require("../model/applicationModel");

exports.getAllApplications = catchAsync(async (req, res, next) => {
  const applications = await Application.find();
  // console.log(req.user);
  res.status(200).json({
    status: "success",
    results: applications.length,
    data: {
      applications,
    },
  });
});

exports.createApplication = catchAsync(async (req, res, next) => {
  // console.log(req.params.id);

  const application = await Application.create({
    user: req.user._id,
    job: req.params.id,
    description: req.body.description,
  });

  res.status(201).json({
    status: "success",
    data: {
      application,
    },
  });
});
