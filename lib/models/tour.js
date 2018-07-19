const mongoose = require('mongoose');
const { Schema } = mongoose;

const tour = new Schema({
    title: String,
    activities: [String],
    launchDate: {
        type: Date,
        default: Date.now()
    },
    stops: {
        location: {
            city: String,
            state: String,
            zip: Number
        },
        weather: {
            temperature: Number,
            sunset: String
        },
        attendance: {
            type: Number,
            min: 1
        }
    }
});

module.exports = mongoose.model('Tour', tour);