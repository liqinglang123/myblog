const {Article} = require('../common/module')

module.exports = async function (req, res) {
    let { _id } = req.body
    Article.deleteOne({ _id }, (err) => {
        if (!err) {
            res.send({ success: true, msg: '文章删除成功' })
        } else {
            res.send({ success: false, msg: '文章删除失败' })
        }
    })
}