const User = require('../model/userModel')
const asyncHandler = require('express-async-handler');
const generateToken = require('../util/generateToken');
// asyncHander for async errors with user registration

// controllers for API endpoints
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, tags, pic } = req.body;

    // check if user already exists by their email
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User Already Exists');
    }

    // if user does not exist, create a new user post
    const user = await User.create({
        name, email, password, tags, pic,
    });

    // if user create successfully
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            tags: user.tags,
            pic: user.pic,
            token: generateToken(user._id), // generate a token for the user to give them a JWT identity
        }) // otherwise there was an error with creating the user
    } else {
        res.status(404);
        throw new Error('Error Occurred!');
    }

    // res.json({
    //     name,
    //     email,
    //     password,
    //     pic,
    // })
});

// authorize user logging in
const verifyUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // find email by user
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            tags: user.tags,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid email or password!")
    }
});


module.exports = { registerUser, verifyUser }