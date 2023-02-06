const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const AppError = require('../utilities/appError');
const catchAsync = require('../utilities/catchAsync');

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];

  // console.log(token);

  // check if there is no token
  if (!token) {
    return next(new AppError('Not authorized'), 401);
  }

  // verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // console.log(decoded);
  // GET user from the token
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    next(new AppError('Not authorized', 401));
  }

  req.user = freshUser;

  next();
});
