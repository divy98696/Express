const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamp');

//Include other resource routers
const cousreRouter = require('./courses');

// Advanced Result Filtering
const Bootcamp = require('../models/Bootcamp');
const advancedResult = require('../middleware/advancedResult');

const router = express.Router();

//Re-route into other resource routers
router.use('/:bootcampId/courses', cousreRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router
  .route('/')
  .get(advancedResult(Bootcamp, 'courses'), getBootcamps)
  .post(createBootcamps);

router.route('/:id/photo').put(bootcampPhotoUpload);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamps);

module.exports = router;
