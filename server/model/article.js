const mongoose = require('mongoose')

const articleSchma = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    readcount: {
        type: Number,
        default: 1
    },
    author: {
        type: String,
        default: '李晴朗'
    },
    body: {
        type: String
    },
    cover : {
        type : String ,
        default : 'default.png'
    },
    category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
    tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Tag' }],
    comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Comment' }]
}, {
    timestamps: true //自动添加craeteAt 和 updateAt 两个字段 代表更新时间和创建时间
})

module.exports = mongoose.model('Article', articleSchma)