const {Tag} = require('../common/module')

module.exports = async function (req, res) {
    Tag.find((err, data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log(err)
        }
    })
}