const { Album } = require('../common/module')

module.exports = async function (req, res) {
    // console.log(req.query)
    let { id } = req.query

    // 删除相册
    Album.findByIdAndRemove({ _id: id }, err => {
        if (!err) {
            res.send({ success: true, msg: '相册删除成功' })
        } else {
            res.send({ success: false, msg: '相册删除失败' })
        }
    })
}