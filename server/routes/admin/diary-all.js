const {Diary} = require('../common/module')

module.exports = async function (req, res) {
    Diary.find().sort({ time: -1 }).exec((err, data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log(data)
        }
    })
}