<template>
    <div class="blog-list">
        <Title><span slot="content">我的文章</span></Title>
        <!-- 文章 -->
        <div style="margin-top: 50px;padding: 0 10px;">
            <div  class="animated fadeInUpBig"  v-for="(item , index) in articleList" :key="index">
                <article-box :information="item"></article-box>
            </div>
        </div>
        <!-- 分页 -->
        <div class="page animated fadeInUpBig">
            <Page :total="total" :page-size="pagesize" :current="pageindex" @on-change="change"></Page>
        </div>
    </div>
</template>
<script>
    import Title from 'components/content/Title'
    import ArticleBox from './childComps/ArticleBox.vue'

    export default {
        async created() {
            // 获取文章数据
            this.getArticles()
        },
        components: {
            Title,
            ArticleBox
        },
        data() {
            return {
                articleList: [],
                // 数据总条数
                total: 10,
                // 每页条数
                pagesize: 3,
                pageindex: 1
            }
        },
        methods: {
            async getArticles() {
                let { count, data } = await this.$get('/article-all', {
                    pageindex: this.pageindex,
                    pagesize: this.pagesize
                })
                this.articleList = data
                this.total = count
            },
            change(pageindex) {
                // console.log(pageindex)
                this.pageindex = pageindex
                this.getArticles()
            }
        }

    }
</script>
<style scoped>
    .blog-list {
        overflow-y: auto;
        width: 100%;
        height: 100%;
        /* padding: 10px 20px; */
        background-color: #f4f4f4;
    }

    .page {
        display: flex;
        justify-content: center;
        height: 60px;
    }
</style>