const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 255,
        required: true
    },
    email: {
        type: String,
        max: 255,
        min: 6,
        required: true
    },
    password: {
        type: String,
        max: 1205,
        min: 6,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)