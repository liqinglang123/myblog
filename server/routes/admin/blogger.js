const {Blogger} = require('../common/module')

module.exports = async function (req, res)  {
    let data = await Blogger.findOne()
    res.send(data)
}