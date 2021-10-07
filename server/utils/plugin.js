const md5 = require('md5')

// 密码加密
const encrypt = function (str) {
    return md5(md5(str).split("").reverse().join(""));
}

module.exports = {
    encrypt
}