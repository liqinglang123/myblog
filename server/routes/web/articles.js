const { Article } = require('../common/module')

module.exports = async function (req, res) {
    let result = await Article.find({}, { body: 0 }).populate('tags').populate('category').populate('comments').sort({ readcount: -1 }).exec()
    res.status(200).send(result)
}