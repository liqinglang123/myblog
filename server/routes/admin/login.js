const { User } = require('../common/module')
const {encrypt} = require('../../utils/plugin')
const {createToken} = require('../../utils/token')

module.exports = async function (req, res) {
    // 获取参数
    let { username, password } = req.body
    // 对密码进行加密
    password = encrypt(password)
    // 查询用户是否存在
    let user = await User.findOne({ username, password })
    if (user) {
        let token = createToken(user.username, 60 * 60 * 24)
        res.status(200).send({ success: true, msg: '用户名和密码正确', token })
    } else {
        res.status(200).send({ success: false, msg: '用户名或密码错误' })
    }
}

