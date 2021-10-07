const { Diary } = require('../common/module')

const qs = require('qs')

module.exports = async function (req, res) {
    const data = qs.parse(req.body)
    Diary.create(data, err => {
        if (!err) {
            res.send({ success: true, msg: '日记添加成功' })
        } else {
            res.send({ success: false, msg: '日记添加失败' })
        }
    })
}