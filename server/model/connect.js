// 引入mongoose模块
const mongoose = require('mongoose')

const config = require("../config/develpment.json")

// 连接数据库
mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'))