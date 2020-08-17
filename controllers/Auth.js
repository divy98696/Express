const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc            Register user
// @route           POST /api/v1/auth/register
// @access          Public

exports.Register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendTokenResponse(user, 200, res);
});

// @desc            Login user
// @route           POST /api/v1/auth/login
// @access          Public

exports.Login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and passowd
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }

  // Create token
  sendTokenResponse(user, 200, res);
});

// @desc            Get current login in user
// @route           GET /api/v1/auth/me
// @access          Private

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});

// Get Token from model, create cookie and send response
const sendTokenResponse = (user, statsCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV == 'prodution') {
    options.secure = true;
  }

  res.status(statsCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};
