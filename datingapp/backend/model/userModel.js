// the type of data that user will have
// currently tentative and adjustable

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            default: []
        },
        pic: {
            type: String,
            default: "https://res.cloudinary.com/deyvjcuxo/image/upload/v1701495688/funny-profile-picture-7k1legjukiz1lju7_vg3ia2.jpg"
        },
        attractiveness: {
            type: Array,
            default: [0, 0]
        },
        conversation: {
            type: Array,
            default: [0, 0]
        },
        activity: {
            type: Array,
            default: [0, 0]
        },
        humor: {
            type: Array,
            default: [0, 0]
        },
        decency: {
            type: Array,
            default: [0, 0]
        },
        after: {
            type: Array,
            default: [0, 0]
        },
        matches: {
            type: Array,
            default: []
        },
        incoming: {
            type: Array,
            default: []
        },
    }, // track time of creation and modification
    {
        timestamps: true,
    }
)

// encrypt password
// pre means "before saving password, we run this function"
userSchema.pre('save', async function (next) {
    // if password is unmodified, move on
    if (!this.isModified('password')) {
        next();
    }

    // otherwise, generate salt from bcrypt to secure password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// decrypt password for login check
userSchema.methods.matchPassword = async function (pwd) {
    return await bcrypt.compare(pwd, this.password);
} 

const User = mongoose.model('User', userSchema);

module.exports = User;