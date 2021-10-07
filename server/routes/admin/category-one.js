const { Category } = require('../common/module')

module.exports = async (req, res) => {
    let { _id } = req.query
    let data = await Category.find({ _id })
    res.send(data[0])
}