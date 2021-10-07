const { Album } = require('../common/module')
const qs = require('qs')

module.exports = function (req, res) {
    // console.log(req.body)
    let data = qs.parse(req.body)
    Album.create(data, err => {
        if (err) {
            res.send({ success: false, msg: '相册创建失败' })
        } else {
            res.send({ success: true, msg: '相册创建成功' })
        }
    })
}