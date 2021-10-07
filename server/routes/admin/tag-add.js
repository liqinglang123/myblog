const {Tag} = require('../common/module')


module.exports = async function (req, res) {
    let { name } = req.body
    // 查询该标签是否存在
    Tag.find({ name }, (err, result) => {
        if (result.length) {
            res.send({ success: false, msg: '该标签已经存在,添加失败' })
        } else {
            Tag.create({ name }, err => {
                if (!err) {
                    res.send({ success: true, msg: '标签添加成功' })
                } else {
                    res.send({ success: true, msg: '标签添加失败' })
                }
            })
        }
    })
}