const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    secondName: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    birthday : {
        type: Date,
        required: true
    },
    uniqueId : {
        type: Date,
        default: Date.now()
    },

}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);