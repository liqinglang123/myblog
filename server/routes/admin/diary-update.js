const {Diary} = require('../common/module')

module.exports = async function (req, res) {
    // console.log(req.body)
    let { _id } = req.body
    Diary.findByIdAndUpdate({ _id }, req.body, err => {
        if (!err) {
            res.send({ success: true, msg: '日记更新成功' })
        } else {
            res.send({ success: false, msg: '日记更新失败' })
        }
    })
}

