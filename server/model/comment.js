const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '匿名用户'
    },
    email: {
        type : String
        // required : true
    },
    content: {
        type: String,
    },
    createtime: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comment', commentSchema)