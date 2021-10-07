import Vue from 'vue'
import VueRouter from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const Profile = () => import('views/profile/Profile')
const Album = () => import('views/album/Album')
const AlbumList = () => import('views/album/AlbumList')
const AlbumDetail = () => import('views/album/AlbumDetail')

const Blog = () => import('views/blog/Blog')
const Message = () => import('views/message/Message')
const BlogList = () => import('views/blog/BlogList')
const ArticleDetail = () => import('views/blog/Detail.vue')
const Diary = () => import('views/diary/Diary.vue')

const Null = () => import('views/Null')
const Index = () => import('views/index/Index')
const IndexDetail = () => import('views/index/IndexDetail')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [
    {
        path : '/',
        meta : {title: '首页'},
        component : Index
    },
    {
        path: '/index',
        meta: { title: '首页' },
        children: [
            {
                path : '/',
                component : IndexDetail
            }
        ],
        component: Index
    },
    {
        path: '/profile',
        meta: { title: '关于我' },
        component: Profile
    },
    {
        path: '/album',
        meta: { title: '我的相册' },
        component: Album,
        children: [
            {
                path: '/',
                meta: { title: '相册列表' },
                component: AlbumList
            },
            {
                path: '/album-detail/:id',
                meta: { title: '相册详情' },
                component: AlbumDetail
            }
        ]
    },
    {
        path: '/blog',
        meta: { title: '我的文章' },
        component: Blog,
        children: [
            // 文章列表
            {
                path: '/',
                meta: { title: '文章列表' },
                component: BlogList
            },
            // 文章详情
            {
                path: '/detail/:id',
                meta: { title: '文章详情' },
                component: ArticleDetail
            }
        ]
    },
    {
        path: '/message',
        meta: { title: '给我留言' },
        component: Message
    },
    {
        path: '/null',
        component: Null
    },
    {
        path: '/diary',
        meta: { title: '随笔' },
        component: Diary
    }
]

const router = new VueRouter({
    routes,
    mode: 'hash'
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.meta && to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})

// 3.导出
export default router