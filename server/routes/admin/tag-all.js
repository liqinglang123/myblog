const { Tag } = require('../common/module')

module.exports = async (req, res) => {
    let data = await Tag.find()
    res.send(data)
}