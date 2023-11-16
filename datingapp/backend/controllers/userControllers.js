const User = require('../model/userModel')
const asyncHandler = require('express-async-handler');
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
        name, email, password, tags, pic
    });

    // if user create successfully
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            tags: user.tags,
            pic: user.pic,
        }) // otherwise there was an error with creating the user
    } else {
        res.status(400);
        throw new Error('Error Occurred!');
    }

    // res.json({
    //     name,
    //     email,
    //     password,
    //     pic,
    // })
});


module.exports = { registerUser }