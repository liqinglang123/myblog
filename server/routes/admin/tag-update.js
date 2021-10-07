const { Article, Tag } = require('../common/module')


module.exports = async function (req, res) {
    let { _id, name } = req.body

    // 判断是否有文章使用该标签
    let articles = await Article.find({ tags: { $in: [_id] } })

    // 如果有文章使用该标签
    if (articles.length) {
        res.send({ success: false, msg: '修改失败 , 标签正在使用中...' })
    } else {
        let data = await Tag.find({ name })

        // 判断标签是否已经存在
        if (data.length) {
            res.send({ success: false, msg: '标签重复!修改失败' })
        } else {
            await Tag.findByIdAndUpdate({ _id }, { name }, err => {
                if (!err) {
                    res.send({ success: true, msg: '标签修改成功' })
                } else {
                    res.send({ success: false, msg: '标签修改失败' })
                }
            })
        }
    }
}