const express = require('express')
const { registerUser, verifyUser } = require('../controllers/userControllers')
const router = express.Router()

// API endpoints
// uses controllers

// register
router.route('/').post(registerUser);

// login
router.route('/login').post(verifyUser);

module.exports = router;