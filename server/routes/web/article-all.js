const {Article} = require('../common/module')


module.exports = async function (req, res) {
    // console.log(req.query)
    let { pageindex, pagesize } = req.query

    let result = await Article.find()
    let count = result.length

    let data = await Article.find().limit(pagesize - 0).skip((pageindex - 0 - 1) * (pagesize - 0)).populate('tags').populate('category').populate('comments').sort({ readcount: -1 }).exec()

    res.status(200).send({ count, data })

}