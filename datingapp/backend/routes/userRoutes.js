const express = require('express')
const { registerUser, verifyUser, getAllUsers } = require('../controllers/userControllers')
const router = express.Router()

// API endpoints
// uses controllers

// register
router.route('/').post(registerUser);

// login
router.route('/login').post(verifyUser);

// retrieve users
router.route('/all-users').post(getAllUsers);

module.exports = router;