const { Article, Category } = require('../common/module')

module.exports = async function (req, res) {
    let { _id, name } = req.body

    // 判断是否有文章使用该分类
    let articles = await Article.find({ category: { $eq: _id } })

    // 如果有文章使用该分类
    if (articles.length) {
        res.send({ success: false, msg: '删除失败 , 已有文章使用该分类' })
    } else {
        await Category.findByIdAndDelete({ _id, name }, err => {
            if (!err) {
                res.send({ success: true, msg: '分类删除成功' })
            } else {
                res.send({ success: false, msg: '分类删除失败' })
            }
        })
    }
}
