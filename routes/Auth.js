const express = require('express');
const {
  Register,
  Login,
  getMe,
  forgotPassword,
  resetPassword,
  updatedetails,
  updatepassword,
} = require('../controllers/Auth');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/register', Register);
router.post('/login', Login);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updatedetails);
router.put('/updatepassword', protect, updatepassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
