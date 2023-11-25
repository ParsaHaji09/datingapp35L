// the type of data that user will have
// currently tentative and adjustable

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
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
        },
        pic: {
            type: String,
            default: ""
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

const User = mongoose.model('USer', userSchema);

module.exports = User;