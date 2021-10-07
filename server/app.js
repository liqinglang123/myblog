// 引入express模块
const express = require('express')

// 引入body-parser处理post请求参数
const bodyParser = require('body-parser')

// 连接数据库
require("./model/connect")

const cors = require('cors');

// 创建服务应用程序
const app = express()

//跨域问题解决方案
app.use(cors()) // 为所有源启用跨域
// app.use(cors({
//     origin: ['http://localhost:8080', 'http://localhost:8081'],
//     methods: ['GET', 'POST'],
// }));

// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     next();
// })

// app.use((req, res, next) => {
//     console.log('有人访问了')
//     next()
// })

const admin = require('./routes/admin')
const web = require('./routes/web')
const upload = require('./routes/upload')

app.use(bodyParser.json({ limit: '50mb' }));
// 处理body请求参数
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: false
}))

app.use('/admin', admin)
app.use('/web', web)
app.use('/upload', upload)

app.listen(8888, () => {
    console.error("Server is running at port 8888")
})


