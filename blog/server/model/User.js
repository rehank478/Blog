const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 255,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    numberOfPosts: {
        type: Number,
        min: 0
    },
});

module.exports = mongoose.model('User', userSchema);