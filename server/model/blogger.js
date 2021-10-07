const mongoose = require('mongoose')

const bloggerSchema = new mongoose.Schema({
    name: String,
    sex: String,
    birthday: {
        type: Object,
        required: true
    },
    phone: String,
    email: String,
    nativePlace: String,
    // 政治面貌
    politicalOutlook: String,
    school: String,
    // 学历
    degree: String,
    occupation: String,
    description: String,
    hobbies: String,
    sayings1: String,
    sayings2: String,
})

module.exports = mongoose.model('Blogger', bloggerSchema)