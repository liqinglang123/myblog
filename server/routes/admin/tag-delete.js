const { Article, Tag } = require('../common/module')

module.exports = async function (req, res) {
    let { _id, name } = req.body

    // 判断是否有文章使用该标签
    let articles = await Article.find({ tags: { $in: [_id] } })

    // 如果有文章使用该标签
    if (articles.length) {
        res.send({ success: false, msg: '删除失败 , 已有文章使用该标签' })
    } else {
        Tag.findByIdAndDelete({ _id }, err => {
            if (!err) {
                res.send({ success: true, msg: '标签删除成功' })
            } else {
                res.send({ success: false, msg: '标签删除失败' })
            }
        })
    }
}