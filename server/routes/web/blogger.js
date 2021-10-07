const { Blogger } = require('../common/module')

module.exports = async function (req, res) {
    Blogger.findOne((err, data) => {
        if (!err) {
            res.send(data)
        }
    })
}


