const { Article } = require('../common/module')

module.exports = async function (req, res) {
    let { str } = req.query
    let result = await Article.find({ $or: [{ "title": { $regex: str, $options: "i" } }, { "body": { $regex: str, $options: "i" } }] }, { body: 0 })
    res.send(result)
}