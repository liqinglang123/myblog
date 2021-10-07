const { Article } = require('../common/module')

module.exports = async function (req, res) {
    let { id } = req.query
    let data = await Article.find({ category: { $eq: id } }, { body: 0 })
    res.send(data)
}