import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 导入nprogress进度条
import NProgress from 'nprogress'
import "nprogress/nprogress.css"

const Login = () => import('@/views/Login.vue')
const Layout = () => import('@/views/Layout.vue')

const TagList = () => import('@/views/tag/TagList.vue')
const TagAdd = () => import('@/views/tag/TagAdd.vue')

const CategoryList = () => import('@/views/category/CategoryList.vue')
const CategoryAdd = () => import('@/views/category/CategoryAdd.vue')

const ArticleAdd = () => import('@/views/article/ArticleAdd.vue')
const ArticleList = () => import('@/views/article/ArticleList.vue')

const BeforeLogin = () => import('@/views/BeforeLogin.vue')
const Error = () => import('@/views/Error.vue')

const Blogger = () => import('@/views/user/Blogger.vue')
const Diary = () => import('@/views/Diary.vue')
const Album = () => import('@/views/Album.vue')


const routes = [
  // 登录之前
  {
    path: '/',
    component: BeforeLogin
  },
  // 登录页面
  {
    path: '/login',
    meta: { title: '登录' },
    component: Login
  },
  // 后台管理布局页面
  {
    path: '/layout',
    meta: { title: '博客后台管理系统' },
    component: Layout,
    // 子路由
    children: [
      // 默认路由
      {
        path: '/',
        meta: { title: '博客后台管理系统' },
        component: ArticleList
      },
      // 新建文章
      {
        path: '/articleadd',
        meta: { title: '新建文章' },
        component: ArticleAdd
      },
      // 文章列表
      {
        path: '/articlelist',
        meta: { title: '文章列表' },
        component: ArticleList
      },
      // 分类列表
      {
        path: '/categorylist',
        meta: { title: '文章分类列表' },
        component: CategoryList
      },
      // 添加分类
      {
        path: '/categoryadd',
        meta: { title: '添加分类' },
        component: CategoryAdd
      },
      // 标签列表
      {
        path: '/taglist',
        meta: { title: '文章标签列表' },
        component: TagList
      },
      // 添加标签
      {
        path: '/tagadd',
        meta: { title: '添加标签' },
        component: TagAdd
      },
      // 博主信息
      {
        path: '/blogger',
        meta: { title: '博主信息' },
        component: Blogger
      },
      // 生活点滴
      {
        path: '/diary',
        meta: { title: '生活点滴' },
        component: Diary
      },
      //个人相册
      {
        path: '/album',
        meta: { title: '个人相册' },
        component: Album
      }
    ]
  },
  {
    path: '*',
    component: Error
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()

  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }

  next()
})

// 路由后置守卫
router.afterEach((to, from) => {
  // 关闭加载进度条
  NProgress.done()
})

export default router
