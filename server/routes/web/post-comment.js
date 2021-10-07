const { Comment, Article } = require('../common/module')

module.exports = function (req, res) {
    // 获取文章id
    let { id } = req.query
    // console.log()
    Comment.create(req.query)
        .then(data => {
            // let id = data._id
            // res.send(data)
            Article.update({ _id: id }, { $push: { comments: data._id } }, err => {
                if (!err) {
                    res.send({ success: true, msg: '评论发表成功' })
                } else {
                    res.send({ success: false, msg: '评论发表失败' })
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.send({ success: false, msg: '评论失败' })
        })
}




