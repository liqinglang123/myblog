const {Category} = require('../common/module')

module.exports = async (req, res) => {
    let data = await Category.find()
    res.send(data)
}