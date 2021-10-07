const { Album } = require('../common/module')
const qs = require('qs')

module.exports = function (req, res) {
    let data = qs.parse(req.body)
    let id = data.id || data._id
    if (!data.pictures) {
        data.pictures = []
    }
    // 查找并更新相册
    Album.findByIdAndUpdate({ _id: id }, data, err => {
        if (!err) {
            res.send({ success: true, msg: '相册更新成功' })
        } else {
            res.send({ success: false, msg: '相册更新失败' })
        }
    })
}

