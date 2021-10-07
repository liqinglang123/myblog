const {Blogger} = require('../common/module')

module.exports = async function (req, res) {
    const { _id } = req.body
    const data = req.body
    data.birthday = new Date(req.body.birthday)
    Blogger.findByIdAndUpdate({ _id }, data, err => {
        if (!err) {
            res.send({ success: true, msg: '博主信息修改成功' })
        } else {
            res.send({ success: false, msg: '博主信息修改失败' })
        }
    })
}