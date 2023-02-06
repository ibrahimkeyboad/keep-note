const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utilities/catchAsync');
const User = require('../model/userModel');
const AppError = require('../utilities/appError');

function jwtToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

exports.registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new AppError('Please add all fields', 400));
  }

  ///check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new AppError('User already exists'));
  }

  // Hash password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    // passwordConfirm,
  });

  console.log(user);

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: jwtToken(user._id),
    });
  } else {
    return next(new AppError('Invalid data', 400));
  }
});
exports.logInUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.json({
      status: 'success',
      name: user.name,
      token: jwtToken(user._id),
      message: 'Your login 😎',
    });
  } else {
    return next(new AppError('please inter valid password or email'));
  }
});
exports.getUser = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: 'success',
  });
});
