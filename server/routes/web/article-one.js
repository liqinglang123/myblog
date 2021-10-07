const {Article} = require('../common/module')

module.exports = async function (req, res) {
    let _id = req.query.id
    // 根据id查询文章
    Article.findOne({ _id }).populate('tags').populate('category').populate('comments').exec((err, result) => {
        res.send(result)
    })
}