// 使用 jsonwebtoken + expressjwt 
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')

// 设置密钥
const secret = 'liqinglang'

// 生成token 
const createToken = (data, exp) => {
    let obj = {};
    obj.data = data ? data : null
    obj.type = 'express-jwt'
    // token的创建时间
    obj.ctime = new Date().getTime
    // 设置过期时间，不设置就默认一天
    exp = exp ? exp : 60 * 60 * 24
    // exp = 30

    let token = 'Bearer ' + jwt.sign(obj, secret, { expiresIn: exp });
    console.log('Token generated successfully....')
    return token
}

// 验证token
const varifyToken = () => {
    return expressJWT({
        secret,
        algorithms: ['HS256'],
        // 是否允许无token请求
        // credentialsRequired: false
    }).unless({
        // 设置白名单，出了这个地址，其他URL都需要验证
        path: ['/admin/login']
    })
}

// 失败处理
const errorToken = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        let obj = {}
        obj.msg = "token验证失败"
        obj.code = '666'
        res.send(obj)
    }
}

module.exports = {
    createToken,
    varifyToken,
    errorToken
}

