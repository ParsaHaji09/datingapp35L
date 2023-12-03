const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decodeToken.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token mismatch.");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, token mismatch.");
;    }
});

module.exports = { protect };