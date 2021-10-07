const mongoose = require('mongoose')

const diarySchema = new mongoose.Schema({
    thing: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true,
    },
    color: {
        type: String,
        default: 'green'
    }
})

module.exports = mongoose.model('Diary', diarySchema)