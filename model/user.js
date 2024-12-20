const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    gender: { type: String }
})

const userModel = mongoose.model("employees", userSchema)
module.exports = userModel