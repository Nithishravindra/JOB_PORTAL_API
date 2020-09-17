const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getOnlyEmployers = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: 'employer' });

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      user: users
    }
  });
});

exports.getOnlyUsers = catchAsync(async (req, res, next) => {
  const employers = await User.find({ role: 'user' });

  res.status(200).json({
    status: 'success',
    results: employers.length,
    data: {
      user: employers
    }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('Cannot update password.', 400));
  }
  const filteredBody = filterObj(req.body, 'name', 'email', 'role');
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.deleteUser = factory.deleteOne(User);
