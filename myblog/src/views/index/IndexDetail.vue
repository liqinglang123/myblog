<template>
    <div class='index-detail'>
        <Title><span slot="content">首页</span></Title>

        <div class="index-box">
            <!-- 左侧主体部分 -->
            <div class="index-body col-xs-12 col-sm-8">
                <!-- 轮播图部分 -->
                <div class="caroucel hidden-xs" style="width: 100%;margin-top: 20px;">
                    <Carousel autoplay :height="180" :autoplay-speed="4000" loop>
                        <CarouselItem>
                            <div class="demo-carousel"><img style="width: 100%" :src="BASE_URL_Img + 'yinyi2.jpg'"
                                    alt=""></div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel"><img style="width: 100%" :src="BASE_URL_Img + 'yinyi2.jpg'"
                                    alt=""></div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel"><img style="width: 100%" :src="BASE_URL_Img + 'yinyi3.jpg'"
                                    alt=""></div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel"><img style="width: 100%" :src="BASE_URL_Img + 'yinyi4.jpg'"
                                    alt=""></div>
                        </CarouselItem>
                    </Carousel>
                </div>
                <!-- 文章列表 -->
                <div class="article-list">
                    <div class="article-box" v-for="(item, index) in articleList" :key="index">
                        <div class="cover">
                            <img style="width: 100%;height: 100%;" :src="BASE_URL_Img + (item.cover || 'default.png')" alt="">
                        </div>
                        <div class="a-content">
                            <h3 class="article-title" @click="clickarticle(item._id)">
                                {{item.title}}</h3>
                            <div class="article-info">
                                <span id="author">
                                    <Icon type="md-person" size="14" />&nbsp;{{item.author}}
                                </span>
                                <span id="category">
                                    <Icon type="ios-eye" size="16" />&nbsp;浏览({{item.readcount}})
                                </span>
                            </div>
                        </div>
                        <div class="article-time">{{item.createdAt | formatDate}}</div>
                    </div>
                    <divider v-show="articleList.length !== 0" />
                </div>
                <h5 style="margin-top: 30px;text-align: center;" v-show="articleList.length === 0">还没有新文章哦~</h5>
                <!-- 分页 -->
                <div class="page animated fadeInUpBig" v-show="articleList.length !== 0">
                    <Page :total="total" :page-size="pagesize" :current="pageindex" @on-change="change"></Page>
                </div>
            </div>
            <div class="index-extra col-xs-12 col-sm-4">
                <div class="row">
                    <!-- 搜索框 -->
                    <div class="search">
                        <h5 class="item-title">
                            搜索一下
                        </h5>
                        <div class="search-box">
                            <Input v-model="searchstr" size="small" placeholder="输入内容搜索" style="width: 70%"></Input>
                            <Button type="primary" shape="circle" icon="ios-search" size="small"
                                @click="search"></Button>
                        </div>
                    </div>
                    <!-- 个人名片 -->
                    <div class="card">
                        <h5 class="item-title">
                            个人名片
                        </h5>
                        <div class="card-content">
                            <h6>姓名:&nbsp;&nbsp;{{this.$store.state.admin.information.name}}</h6>
                            <h6>职业:&nbsp;&nbsp;{{this.$store.state.admin.information.occupation}}</h6>
                            <h6>现居:&nbsp;&nbsp;{{this.$store.state.admin.information.nativePlace}}</h6>
                            <h6>邮箱:&nbsp;&nbsp;{{this.$store.state.admin.information.email}}</h6>
                            <div class="to-detail" @click="$router.push('/profile')">
                                详情>></div>
                        </div>
                    </div>

                    <!-- 热门标签 -->
                    <div class="hot-tag" style="background-color: #fff;">
                        <h5 class="item-title">
                            热门标签
                        </h5>
                        <div class="tag-box" style="padding: 10px;margin-bottom: 10px;">
                            <Tag v-for="(item , index) in tags" :key="index"
                                :color="colors[Math.floor(Math.random()*8)]" @click.native="searchByTag(item._id)">
                                {{item.name}}</Tag>
                        </div>
                    </div>

                    <!-- 所有分类 -->
                    <div class="categories" style="background-color: #fff;margin-bottom: 10px;">
                        <h5 class="item-title">
                            所有分类
                        </h5>
                        <div class="category-box" style="padding: 10px;">
                            <Button v-for="(item , index) in categories" :key="index" style="margin:2px"
                                @click.native="searchByCategory(item._id)">
                                {{item.name}}</Button>
                        </div>
                    </div>

                    <!-- 友情链接 -->
                    <div class="categories" style="background-color: #fff;">
                        <h5 class="item-title">
                            友情链接
                        </h5>
                        <div class="category-box" style="padding: 10px;">
                                <a href="http://47.95.123.41/backend">博客后台管理</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { BASE_URL_Img } from '@/config/index'
    import Title from 'components/content/Title'
    const colors = ['blue', 'green', 'yellow', 'red', 'pink', 'purple', 'orange', 'blue']

    export default {
        components: {
            Title
        },
        async created() {
            this.getArticles();
            this.getTags();
            this.getCategories();
        },
        data() {
            return {
                value2: 0,
                searchtype: 'default',
                // 文章数据
                BASE_URL_Img,
                articleList: [],
                originaldata: [],
                // 标签数据
                tags: [],
                // 分类数据
                categories: [],
                // 数据总条数
                total: 10,
                // 每页条数
                pagesize: 6,
                // 页码
                pageindex: 1,
                // 搜索字符串
                searchstr: '',
                colors
            }
        },
        filters: {
            // 格式时间
            formatDate(str) {
                let time = new Date(str)
                let year = time.getFullYear()
                const month = (time.getMonth() + 1).toString().padStart(2, '0')
                const date = (time.getDate()).toString().padStart(2, '0')
                return year + '-' + month + '-' + date
            }
        },
        methods: {
            // 获取文章数据
            async getArticles() {
                let result = await this.$get('/articles')
                this.originaldata = result
                this.total = result.length
                // 第一页
                this.pageindex = 1
                this.pagination(1)
            },
            // 获取标签
            async getTags() {
                let data = await this.$get('/hot-tag')
                this.tags = data
            },
            // 获取分类
            async getCategories() {
                let data = await this.$get('/categories')
                this.categories = data
            },
            // 分页函数
            pagination(pageindex) {
                let start = (pageindex - 1) * this.pagesize
                let end = start + this.pagesize
                this.articleList = this.originaldata.slice(start, end)
            },
            // 页码改变
            change(pageindex) {
                this.pageindex = pageindex
                this.pagination(pageindex)
            },
            // 文章详情
            clickarticle(id) {
                this.$router.push({ path: `/detail/${id}` })
            },
            // 搜索方法
            async search() {
                // 搜索前页码置零
                let result = await this.$get('/search', { str: this.searchstr, })
                this.originaldata = result
                this.total = result.length
                this.pageindex = 1
                this.pagination(1)
            },
            // 根据标签查找文章
            async searchByTag(id) {
                let result = await this.$get('/find-tag', { id })
                this.originaldata = result
                this.total = result.length
                this.pageindex = 1
                this.pagination(1)
            },
            // 根据分类查找文章
            async searchByCategory(id) {
                let result = await this.$get('/find-category', { id })
                this.originaldata = result
                this.total = result.length
                this.pageindex = 1
                this.pagination(1)
            }
        },
    }
</script>

<style scoped>
    .index-detail {
        overflow-y: auto;
        width: 100%;
        height: 100%;
        padding: 10px;
        background-color: #f4f4f4;
    }

    /* 侧边栏 */
    .index-extra {
        margin-top: 20px;
    }

    .item-title {
        border-bottom: 1px solid #f6f6f6;
        line-height: 30px;
        padding-left: 10px;
        color: #000;
    }

    .search {
        height: 70px;
        background-color: #fff;
        margin-bottom: 10px;
    }

    .search-box {
        height: 40px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .card {
        margin-bottom: 10px;
        background-color: #fff
    }

    .to-detail {
        text-align: right;
        color: #3c5a98;
        padding-right: 10px;
        line-height: 25px;
        cursor: pointer;
    }


    /* 文章盒子 */
    .article-box {
        width: 100%;
        height: 100px;
        background-color: white;
        margin-top: 30px;
        padding: 0 10px;
        position: relative;
        display: flex;
    }

    .cover {
        width: 35%;
        padding: 10px;
        padding-left: 0;
    }

    .a-content {
        width: 65%;
    }

    .article-box .content {
        width: 65%;
    }

    .article-title {
        padding: 22px 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
    }

    .article-title:hover {
        padding-left: 15px;
        color: #3c5a98;
    }

    .article-info {
        display: flex;
        justify-content: space-around;
        color: black;
        border-top: 1px solid #aaa;
        line-height: 25px;
        cursor: pointer
    }

    #author {
        width: 50%;
        text-align: left;
    }

    #category {
        width: 50%;
        text-align: right;
    }

    .article-time {
        position: absolute;
        top: -15px;
        left: -15px;
        width: 80px;
        height: 20px;
        color: white;
        text-align: center;
        line-height: 20px;
        border-radius: 10px;
        background-color: #3c5a98;

    }

    /* 名片 */
    .card-content h6 {
        padding-left: 10px;
        line-height: 25px;
    }

    /* 分页 */
    .page {
        display: flex;
        justify-content: center;
        height: 80px;
    }

    @media screen and (max-width : 767px) {
        .index-detail{
            /* overflow-y:initial; */
        }

        .article-box .cover {
            display: none;
        }

        .a-content {
            width: 100%;
        }

        .page {
            height: auto;
        }

    }
</style>