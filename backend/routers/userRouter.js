const express = require('express');
const { protect } = require('../controllers/authController');
const {
  registerUser,
  logInUser,
  getUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/', registerUser);
router.post('/login', logInUser);
router.get('/user', protect, getUser);

module.exports = router;
