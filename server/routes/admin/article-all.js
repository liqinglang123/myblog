const { Article } = require('../common/module')
const qs = require('qs')

module.exports = async function (req, res) {
    // let tags = []
    // // 获取tags属性
    // Object.keys(req.body).forEach(item => {
    //     if (item.indexOf('tags') !== -1) {
    //         tags.push(req.body[item])
    //     }
    // })

    // 格式化参数并且获取tags
    const tags = qs.parse(req.body).tags || []

    // 过滤数据
    let filters = function (arr) {
        // let { pageIndex, pageSize } = req.body
        // let skipCount = (pageIndex - 1) * pageSize
        let result = []
        arr.forEach(item => {
            if (tags.every(val => item.tags.includes(val))) {
                result.push(item)
            }
        })
        // let count = result.length
        // // 截取数据
        // let data = result.splice(skipCount, pageSize)
        // // console.log(data)

        // return res.send({ data, count })
        res.send(result)
    }

    if (req.body.category === "") {
        Article.find({}, { comments: 0, body: 0 }).sort({ updatedAt: -1 }).populate('category').exec((err, data) => {
            // res.send(filters(data))
            filters(data)
        })
    } else {
        Article.find({ category: { $eq: req.body.category } }, { comments: 0, body: 0 }).sort({ updatedAt: -1 }).populate('category').exec((err, data) => {
            filters(data)
        })
    }
}