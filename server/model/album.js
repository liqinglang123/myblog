const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    pictures: [{ type: String }],
    // 是否保密
    secrecy: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Album', albumSchema)