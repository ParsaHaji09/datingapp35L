const express = require('express')
const { registerUser, verifyUser, getAllUsers, getUser, updateUser } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router()

// API endpoints
// uses controllers

// register
router.route('/').post(registerUser);

// login
router.route('/login').post(verifyUser);

// retrieve users
router.route('/all-users').get(getAllUsers);

//add protect

// retrieve specific user
router.route('/:id').get(getUser).put(updateUser);

module.exports = router;