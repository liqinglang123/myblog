const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    avator : {
        type : String,
        default : 'pp1.png'
    },
    // 留言人名字
    name: {
        type: String,
        required: true,
        default: '匿名用户'
    },
    // 评论邮箱
    email: {
        type: String,
        required: true
    },
    // 回复哪一位
    to: {
        type: String
    },
    // 内容
    content: {
        type: String,
        required: true
    },
    replys : {
        type : Array
    },
    // 父极Id 
    parentId: {
        type: String,
        // required: true,
        default: '0'
    }
}, { timestamps: true })

module.exports = mongoose.model('Message', messageSchema)