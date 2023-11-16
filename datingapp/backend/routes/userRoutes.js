const express = require('express')
const { registerUser } = require('../controllers/userControllers')
const router = express.Router()

// API endpoints
// uses controllers
router.route('/').post(registerUser);

module.exports = router;