const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  console.log(req.body);
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  console.log(user);

  if (!user) {
    return next(new AppError("No User found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  console.log(user);

  if (!user) {
    return next(new AppError("No User found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};
