const { Article } = require('../common/module')
const qs = require('qs')

module.exports = function (req, res) {
    const { _id } = req.body
    const data = qs.parse(req.body)
    // 没有使用qs时
    // let tags = []

    // // 获取tags属性
    // Object.keys(req.body).forEach(item => {
    //     if (item.indexOf('tags') !== -1) {
    //         tags.push(req.body[item])
    //     }
    // })

    // // 给data添加tags属性
    // Object.defineProperty(data, "tags", { enumerable: true, configurable: true, writable: true, value: tags })

    // 更新文章
    Article.findByIdAndUpdate({ _id }, data, (err) => {
        if (!err) {
            res.send({ success: true, msg: '文章更新成功' })
        } else {
            res.send({ success: false, msg: '文章更新失败' })
        }
    })
}