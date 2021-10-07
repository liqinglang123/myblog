const mongoose = require('mongoose')

mongoose.set("useFindAndModify", false)

// 创建集合规则
const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

// 根据规则创建集合并导出
module.exports = mongoose.model('Tag', tagSchema)