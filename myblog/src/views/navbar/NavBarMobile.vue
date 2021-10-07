<template>
    <div class="nav-bar-mobile row animated slideInRight">

        <div v-for="(item , index) in items" :key="index">
            <nav-bar-mobile-item :detail="item"></nav-bar-mobile-item>
            <slot :name="item.path"></slot>
        </div>

    </div>
</template>
<script>
    import NavBarMobileItem from './childComps/NavBarMobileItem'
    export default {
        name: 'NavBarMobile',
        components: {
            NavBarMobileItem
        },
        data() {
            return {
                items: [
                    {
                        icon : "glyphicon glyphicon-th",
                        title : '首页',
                        path : '/index'
                    },
                    {
                        icon: 'glyphicon glyphicon-user',
                        title: '个人信息',
                        path: '/profile',
                    }, {
                        icon: 'glyphicon glyphicon-picture',
                        title: '我的相册',
                        path: '/album'
                    }, {
                        icon: 'glyphicon glyphicon-bullhorn',
                        title: '我的文章',
                        path: '/blog',
                    }, {
                        icon: 'glyphicon glyphicon-pencil',
                        title: '个人随笔',
                        path: '/diary',
                    }, {
                        icon: 'glyphicon glyphicon-comment',
                        title: '给我留言',
                        path: '/message'
                    }]
            }
        }
    }
</script>
<style scoped>

</style>