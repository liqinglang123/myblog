const { Message } = require('../common/module')

module.exports = function (req, res) {
    Message.create(req.query, error => {
        if (!error) {
            res.send({ success: true, msg: '评论发表成功' })
        } else {
            console.log(error)
            res.send({ success: false, msg: '评论发表失败' })
        }
    })
}