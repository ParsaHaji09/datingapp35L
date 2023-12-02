const express = require('express')
const { registerUser, verifyUser, getAllUsers } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router()

// API endpoints
// uses controllers

// register
router.route('/').post(registerUser);

// login
router.route('/login').post(verifyUser);

// retrieve users
router.route('/all-users').get(protect, getAllUsers);

module.exports = router;