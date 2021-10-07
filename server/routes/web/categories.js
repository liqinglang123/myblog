const {Category}  = require('../common/module')

module.exports = async function (req, res)  {
    let data = await Category.find()
    res.send(data)
}