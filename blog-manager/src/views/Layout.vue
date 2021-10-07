<template>
    <div class='layout'>
        <!-- 侧边导航栏 -->
        <div class="left" :style="{width:(!isCollapse? '200px' : 'auto') , paddingTop : (isCollapse ? '60px' : '0')}">
            <div class="logo" v-show="!isCollapse">BLOG</div>
            <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b" :collapse="isCollapse" router>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-reading"></i>
                        <span>文章管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="articleadd">新建文章</el-menu-item>
                        <el-menu-item index="articlelist">文章列表</el-menu-item>
                        <el-menu-item index="1-3">文章评论</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-collection"></i>
                        <span>分类管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="categoryadd">新建分类</el-menu-item>
                        <el-menu-item index="categorylist">所有分类</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-collection-tag"></i>
                        <span>标签管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="tagadd">新建标签</el-menu-item>
                        <el-menu-item index="taglist">标签列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-user-solid"></i>
                        <span>个人日记</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="diary">生活点滴</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-picture"></i>
                        <span>个人相册</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="album">相册集</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <!-- 右边内容 -->
        <div class="right">
            <!-- 导航栏 -->
            <div class="nav">
                <div class="icon" @click="isCollapse=!isCollapse">
                    <i :class="!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
                </div>
                <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
                    active-text-color="#ffd04b" router>
                    <el-menu-item index="0"> <i class="el-icon-s-home"></i>首页</el-menu-item>
                    <el-menu-item index="blogger"> <i class="el-icon-document"></i>博主信息</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"> <i class="el-icon-user-solid"></i>用户</template>
                        <el-menu-item index="/layout/mine">个人中心</el-menu-item>
                        <el-menu-item index="/layout/resetPwd">修改密码</el-menu-item>
                        <el-menu-item index="2-3" @click="exit">退出</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
            <!-- 内容区 -->
            <div class="content">
                <keep-alive include="*">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
    // 导入 vuex 的映射函数
    import { mapState, mapMutations } from 'vuex'
    export default {
        created(){
            let loginId = localStorage.getItem('username');
            // 如果用户名为空，就回到登录页面
            if (!loginId) {
                this.$router.push('/login')
            }
        },
        data() {
            return {
                isCollapse: false
            }
        },
        methods: {
            // 导入登录账户的方法
            ...mapMutations('admin', ['setAdmin']),
            // 点击退出
            exit() {
                sessionStorage.clear()
                localStorage.clear()
                this.$router.push('/login')
            }
        },
        computed: {
            // 导入vuex账号数据
            ...mapState('admin', ['admin'])
        }
    }
</script>

<style scoped lang="scss">
    .layout {
        display: flex;
        width: 100vw;
        height: 100vh;

        .left {
            width: 200px;
            background-color: rgb(84, 92, 100);

            .logo {
                /* width: 100%; */
                margin: 40px 20px 20px 0;
                color: #74759b;
                text-align: center;
                font-size: 20px;
                font-family: '宋体';
                font-weight: bold;
            }
        }

        .right {
            flex: 1;

            /* 导航区 */
            .nav {
                display: flex;
                height: 60px;
                justify-content: space-between;
                align-items: center;
                background-color: rgb(84, 92, 100);

                .icon {
                    padding-left: 5px;

                    i {
                        color: white;
                        font-size: 20px;

                    }
                }
            }

            /* 内容区 */
            .content {
                padding: 20px;
            }

        }
    }
</style>