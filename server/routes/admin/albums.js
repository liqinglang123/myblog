const {Album} = require('../common/module')

module.exports = function (req, res) {
    Album.find((err, data) => {
        if (!err) {
            res.send(data)
        }
    })
}