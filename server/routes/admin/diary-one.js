const {Diary} = require('../common/module')

module.exports = function (req, res) {
    let { id } = req.query
    Diary.findOne({ _id: id }, (err, data) => {
        res.send(data)
    })
}