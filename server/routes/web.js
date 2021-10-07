const express = require('express')

const web = express.Router()

// 获取个人信息
web.get('/blogger', require('./web/blogger'))

// 查询所有文章
web.get('/article-all',require('./web/article-all'))

// 获取一篇文章
web.get('/article-one',require('./web/article-one'))

// 文章阅读量增加
web.get('/add-count',require('./web/add-count'))

// 评论
web.get('/post-comment', require('./web/post-comment'))

// 获取所有日记
web.get('/diary-all', require('./web/diary-all'))

// 获取所有相册
web.get('/albums',require('./web/albums'))

// 查询一个相册
web.get('/album-one', require('./web/album-one'))

// 添加留言
web.get('/add-message', require('./web/add-message'))

// 查询所有留言
web.get('/message-all', require('./web/message-all'))

// 查询所有文章用于首页
web.get('/articles', require('./web/articles'))

// 精确查询根据标题和正文的内容
web.get('/search', require('./web/search'))

// 查询所有热门标签
web.get('/hot-tag',require('./web/hot-tag'))

//根据标签id查找文章
web.get('/find-tag', require('./web/find-tag'))


// 获取所有标签
web.get('/categories', require('./web/categories'))

// 根据分类查找文章
web.get('/find-category', require('./web/find-category'))

module.exports = web