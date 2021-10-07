const {Diary} = require('../common/module')

module.exports = function (req, res) {
    let { id } = req.query
    Diary.findByIdAndDelete({ _id: id }, err => {
        if (!err) {
            res.send({ success: true, msg: '日记删除成功' })
        } else {
            res.send({ success: false, msg: '日记删除失败' })
        }
    })
}


