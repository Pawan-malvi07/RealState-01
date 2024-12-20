// models/Villa.js
const mongoose = require('mongoose');

const villaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
       type: [String],
       require:true
    },
    guest: {
        type: Number,
        required: true
    },
    bedroom: {
        type: Number,

        required: true
    },
    bathroom: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    meters: {
        type: String,
        required: true
    },
    checkin: {
        type: Date,
        required: true
    },
    checkout: {
        type: Date,
        required: true
    },
});

const Villa = mongoose.model('Villa', villaSchema);

module.exports = Villa;
