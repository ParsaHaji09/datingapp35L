// JWT token verifies the user's identity when interacting with the backend

const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    // generate a token and assign the token
    return jwt.sign({ id} , process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};


module.exports = generateToken;