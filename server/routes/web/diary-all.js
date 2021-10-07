const { Diary } = require('../common/module')

module.exports = function (req, res) {
    Diary.find().sort({ time: -1 }).exec((err, data) => {
        // console.log(err)
        if (!err) {
            res.send(data)
        }
    })
}