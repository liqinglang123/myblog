const {Album} = require('../common/module')


module.exports =function (req, res)  {
    let { id } = req.query
    // 查找并返回数据
    Album.findOne({ _id: id }, (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log(err)
            res.send()
        }
    })
}