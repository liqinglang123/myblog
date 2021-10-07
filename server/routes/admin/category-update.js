const { Article, Category } = require('../common/module')


module.exports = async function (req, res) {
    let { _id, name } = req.body

    // 判断是否有文章使用该分类
    let articles = await Article.find({ category: { $eq: _id } })

    // 如果有文章使用该分类
    if (articles.length) {
        res.send({ success: false, msg: '修改失败 , 该分类正在使用中...' })
    } else {
        let data = await Category.find({ name })

        // 如果分类已经存在
        if (data.length) {
            res.send({ success: false, msg: '分类重复! 修改失败' })
        } else {
            await Category.findByIdAndUpdate({ _id }, { name }, err => {
                if (!err) {
                    res.send({ success: true, msg: '修改成功' })
                } else {
                    res.send({ success: false, msg: '修改失败' })
                }
            })
        }
    }
}