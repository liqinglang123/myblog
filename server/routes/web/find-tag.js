const {Article} = require('../common/module')

module.exports = async function (req, res) {
    let { id } = req.query
    let result = await Article.find({ tags: { $in: id } }, { body: 0 })
    res.send(result)
}