const {User} = require('../common/module')

module.exports = async function (req, res) {
    User.find({}, { password: 0 }, (err, data) => {
        res.send(data)
    })
}