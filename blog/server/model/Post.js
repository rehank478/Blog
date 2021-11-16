const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    path:{
        type: String,
        required: true
    },
    numberOfCounts: {
        type: Number,
        min: 0
    }
});

module.exports = mongoose.model('Post', postSchema);