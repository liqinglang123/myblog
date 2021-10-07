const express = require('express')
const { encrypt } = require('../utils/plugin')

const qs = require('qs')

// 引入token的相关方法
const { createToken, varifyToken, errorToken } = require('../utils/token')

const admin = express.Router()

const md5 = require('md5')

// 验证token
admin.use(varifyToken())

async function createUser() {
    const user = await Blogger.create({
        name: 'lisi',
        sex: '男',
        phone: '18373298616',
        email: '3159956778@qq.com',
        nativePlace: '湖南扣滴',
        // 政治面貌
        politicalOutlook: '娄底',
        school: '湖南科技大学',
        birthday: '2001-01-12',
        // 学历
        degree: '本科',
        occupation: 'web前端',
        description: '我叫李晴朗',
        hobbies: '唱歌跳舞',
        sayings1: '勇往直前 向前冲',
        sayings2: '冲冲冲'
    })
}

// createUser();

// 实现登录功能
admin.post('/login', require('./admin/login'))

// 查询所有分类
admin.get('/category-all', require('./admin/category-all'))

// 查询某个分类
admin.get('/category-one',require('./admin/category-one'))

// 查询所有标签
admin.get('/tag-all',require('./admin/tag-all'))

// 查询某个标签
admin.get('/tag-one',require('./admin/tag-one'))

// 更新某个分类
admin.post('/category-update', require('./admin/category-update'))

// 删除某个分类
admin.post('/category-delete', require('./admin/category-delete'))

// 更新某个标签
admin.post('/tag-update', require('./admin/tag-update'))

// 删除某个标签
admin.post('/tag-delete', require('./admin/tag-delete'))

// 添加文章分类
admin.post('/category-add', require('./admin/category-add'))

// 添加标签
admin.post('/tag-add', require('./admin/tag-add'))

// 添加文章
admin.post('/article-add', require('./admin/article-add'))

// 查询所有文章
admin.post('/article-all', require('./admin/article-all'))

// 查询一篇文章
admin.get('/article-one', require('./admin/article-one'))

// 删除文章 
admin.post('/article-delete',require('./admin/article-delete'))

// 更新文章
admin.post('/article-update', require('./admin/article-update'))

// 查找博主信息
admin.get('/blogger', require('./admin/blogger'))

// 更新博主信息
admin.post('/blogger-update', require('./admin/blogger-update'))

// 查找所有用户
admin.get('/user-all',require('./admin/user-all'))

// 查询所有日记
admin.get('/diary-all', require('./admin/diary-all'))

// 查询一篇日记
admin.get('/diary-one',require('./admin/diary-one'))

// 添加日记
admin.post('/diary-add', require('./admin/diary-add'))

// 更新日记
admin.post('/diary-update', require('./admin/diary-update'))

// 删除日记
admin.get('/diary-delete', require('./admin/diary-delete'))

// 查询所有相册
admin.get('/albums',require('./admin/albums'))

// 相册
admin.post('/album-add', require('./admin/album-add'))

// 查询一个相册
admin.get('/album-one', require('./admin/album-one'))

// 更新相册
admin.post('/album-update', require('./admin/album-update'))

// 删除相册
admin.get('/album-delete', require('./admin/album-delete'))

// 处理错误组件
admin.use(errorToken)

module.exports = admin