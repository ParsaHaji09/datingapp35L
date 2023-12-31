const User = require('../model/userModel')
const asyncHandler = require('express-async-handler');
const generateToken = require('../util/generateToken');
// asyncHander for async errors with user registration

// controllers for API endpoints
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, tags, pic, birthday, phone, pronouns, year, major } = req.body;

    // check if user already exists by their email
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User Already Exists');
    }

    // if user does not exist, create a new user post
    const user = await User.create({
        name, email, password, tags, pic, birthday, phone, major, year, pronouns
    });

    // if user create successfully
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            tags: user.tags,
            pic: user.pic,
            birthday: user.birthday,
            phone: user.phone,
            major: user.major,
            year: user.year,
            pronouns: user.pronouns,
            token: generateToken(user._id), // generate a token for the user to give them a JWT identity
        }) // otherwise there was an error with creating the user
    } else {
        res.status(400);
        throw new Error('Error Occurred!');
    }

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
            birthday: user.birthday,
            major: user.major,
            year: user.year,
            pronouns: user.year,
            phone: user.phone,
            attractiveness: user.attractiveness,
            conversation: user.conversation,
            decency: user.decency,
            activity: user.activity,
            humor: user.humor,
            after: user.after,
            matches: user.matches,
            viewed: user.viewed,
            incoming: user.incoming,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid email or password!")
    }
});

// get all users in DB
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error fetching users"});
    }
});

//get one instance of user from id
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found." });
    }
});

//updates user with req parameters
const updateUser = asyncHandler(async (req, res) => {
    // need id and updated traits/tags
    const { tags, matches, pic, incoming, viewed } = req.body;

    const includedKeys = ['attractiveness', 'conversation', 'activity', 'humor', 'decency', 'after'];
    const simpleUpdates = ['bio', 'year', 'major', 'name', 'pronouns', 'instagram', 'snapchat', 'facebook', 'twitter', 'spotify', 'tiktok'];

    const user = await User.findById(req.params.id);


    if (user) {

        if (pic){
            user["pic"] = pic;
        }

        if (tags){
            user["tags"] = tags;
        }

        if (incoming) {
            user["incoming"] = incoming;
        }

        if (viewed){
            user["viewed"] = viewed;
        }


        for (const key in req.body) {
            const value = req.body[key];
            
            if (includedKeys.includes(key)) {
                // Check if the value exists before updating the user property
                if (value !== undefined && value !== null) {
                    // Use square bracket notation to dynamically set the user property
                    user[key][0] += value;
                    if (user[key][1]==null){
                        user[key][1] = 1
                    }
                    user[key][1] += 1;
                }
            }

            if (simpleUpdates.includes(key)){
                if (value !== undefined) {
                    user[key] = value;
                }
            }


        }

        if (matches){
            if (matches.type==="remove"){
                user["matches"] = user["matches"].filter(item => item !== matches.value);
            } else {
                user.matches = [...user["matches"], matches.value];
            }
        }

        const updateUser = await user.save();
        res.json(updateUser);
    } else {
        res.status(404);
        throw new Error("User not found.");
    }
});


module.exports = { registerUser, verifyUser, getAllUsers, getUser, updateUser }