const { Article } = require('../common/module')

module.exports = async function (req, res) {
    let { _id } = req.query
    Article.findById({ _id }, (err, result) => res.send(result))
}