const {Article} = require('../common/module')
const qs = require('qs')

module.exports = async function (req, res) {
    // res.send(req.body)
    // const { title, category, body, ...list } = req.body
    // const tags = Object.values(list)

    // 获取参数并且格式化
    const data = qs.parse(req.body)

    // 保存文章
    Article.create(data, err => {
        if (!err) {
            res.send({ success: true, msg: '文章添加成功！！' })
        } else {
            res.send({ success: false, msg: '文章添加失败！！' })
        }
    })
}