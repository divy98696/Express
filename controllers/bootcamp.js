const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');
// @desc            Get all bootcamps
// @route           GET /api/v1/bootcamps
// @access          Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcacmp = await Bootcamp.find();
  res.status(200).json({
    success: true,
    count: bootcacmp.length,
    data: bootcacmp,
  });
});

// @desc            Get single all bootcamps
// @route           GET /api/v1/bootcamps/:id
// @access          Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcacmp = await Bootcamp.findById(req.params.id);
  if (!bootcacmp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: bootcacmp,
  });
});

// @desc            Create new bootcacmp
// @route           POST /api/v1/bootcamps/
// @access          Private
exports.createBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// @desc            Update new bootcacmp
// @route           PUT /api/v1/bootcamps/:id
// @access          Private
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
  const bootcacmp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcacmp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: bootcacmp,
  });
});

// @desc            Delete new bootcacmp
// @route           DELETE /api/v1/bootcamps/:id
// @access          Private
exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  const bootcacmp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcacmp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});
