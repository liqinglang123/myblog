const { Message } = require('../common/module')

module.exports = async function (req, res) {
    let messages = await Message.find()
    let count = messages.length
    // 先查找所有评论
    let data = await Message.find({ parentId: { $eq: '' } }).sort({ updatedAt: -1 })
    // 为所有评论查找回复
    data.forEach(async (item, index) => {
        let result = await Message.find({ parentId: { $eq: item._id } }).sort({ updatedAt: 1 })
        item.replys = result
        if (index === data.length - 1) {
            res.send({ data, count })
        }
    })
}