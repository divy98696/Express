const express = require('express');
const { Register, Login, getMe } = require('../controllers/Auth');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/register', Register);

router.post('/login', Login);

router.get('/me', protect, getMe);

module.exports = router;
