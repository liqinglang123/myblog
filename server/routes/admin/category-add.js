const { Category } = require('../common/module')

module.exports = async function (req, res) {
    let { name } = req.body
    // 查询分类是否存在
    Category.find({ name }, (err, result) => {
        if (result.length) {
            res.send({ success: false, msg: '该分类已经存在,添加失败' })
        } else {
            Category.create({ name }, err => {
                if (!err) {
                    res.send({ success: true, msg: '分类添加成功' })
                } else {
                    res.send({ success: false, msg: '分类添加失败' })
                }
            })
        }
    })
}