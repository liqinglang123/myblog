const mongoose = require("mongoose")

const { encrypt } = require("../utils/plugin")

const Joi = require('joi')

// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        required: true
    }
})

// 创建集合
// const User = mongoose.model('User', userSchema)

// 验证用户信息
async function createUser() {
    const password = encrypt("123456")
    const user = await User.create({
        username: 'lilang',
        email: '3159956778@qq.com',
        password,
        role: 'admin'
    })
}

// createUser();

// 验证用户信息
// const validateUser = user => {
//     // 定义对象的验证规则
//     const schema = {
//         username: Joi.string().required().error(new Error("用户名不符合要求")),
//         email : ''
//     }
// }

module.exports = mongoose.model('User', userSchema)