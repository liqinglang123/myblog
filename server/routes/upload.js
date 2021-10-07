const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()

// 上传图片的模板
const multer = require('multer')
const { RSA_NO_PADDING } = require('constants')

const upload = multer({ dest: 'uploads/' })

// 图片上传必须使用post方法
router.post('/img', upload.single('file'), (req, res) => {
    // console.log('请求了')
    fs.readFile(req.file.path, (err, data) => {
        // 读取失败, 没有上传成功
        if (err) {
            res.send({ success: false, msg: '图片上传失败' })
        }
        fs.writeFile(path.join(__dirname, '../static/img', req.file.originalname), data, err => {
            if (err) {
                res.send({ success: false, msg: '图片上传失败' })
            }
            // console.log('用户上传了一张图片')
            res.send({ success: true, filename: req.file.originalname, msg: '图片上传成功' })
        })
    })
})

// router.post('/img', upload.single('test'), (req, res) => {
//     // console.log(req.file);
//     console.log(req)
//     fs.readFile(req.file.path, (err, data) => {
//         console.log(req.file)
//         // 读取失败, 没有上传成功
//         if (err) {
//             res.send({ success: false, msg: '图片上传失败' })
//         }
//         console.log('sssss')
//         fs.writeFile(path.join(__dirname, '../static/img', req.file.originalname), data, err => {
//             if (err) {
//                 res.send({ success: false, msg: '图片上传失败' })
//             }
//             console.log('用户上传了一张图片')
//             res.send({ success: true, filename: req.file.originalname, msg: '图片上传成功' })
//         })
//     })
// })

router.get('/getImg', (req, res) => {
    let { filename } = req.query
    let filepath = path.join(__dirname, '../static/img', filename)
    // 设置响应类型
    res.set('content-type', 'image/png')
    // 读取图片返回
    fs.readFile(filepath, (err, data) => {
        res.send(data)
    })
})

module.exports = router


