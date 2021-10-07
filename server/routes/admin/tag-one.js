const {Tag} = require('../common/module')

module.exports = async (req, res) => {
    let { _id } = req.query
    // 查找标签
    let data = await Tag.find({ _id })
    res.send(data[0])
}