const catchAsync = require("../utils/catchAsync");
const Application = require("../model/applicationModel");
const factory = require("./handleFactory");

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

exports.getAllApplications = factory.getAll(Application);
exports.getApplication = factory.getOne(Application);
exports.deleteApplication = factory.deleteOne(Application);
