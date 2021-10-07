const { Article } = require('../common/module')

module.exports = function (req, res) {
    let { id, readcount } = req.query
    Article.findByIdAndUpdate({ _id: id }, { readcount: readcount }, err => {
        res.send()
    })
}