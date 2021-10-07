<template>
    <div id="app">
        <vue-particles color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4"
            linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150"
            :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push"
            class="partical hidden-xs" />
        <div class="container">
            <div class="row">
                <!-- 主要信息展示 -->
                <div class="animated slideInLeft profile_left col-md-3">
                    <personal-info></personal-info>
                </div>
                <!-- 小屏幕导航栏加页面内容 -->
                <div class="col-xs-12 visible-xs">
                    <nav-bar-mobile>
                        <router-view slot="/index" class="animated bounceIn"
                            v-show="this.$route.path.indexOf('/index')!==-1"></router-view>
                        <router-view slot="/profile" class="animated bounceIn"
                            v-show="this.$route.path.indexOf('/profile')!==-1"></router-view>
                        <router-view slot="/album" class="animated bounceIn"
                            v-show="this.$route.path.indexOf('/album')!==-1"></router-view>
                        <router-view slot="/blog" v-show="blogShow"></router-view>
                        <router-view slot="/diary" class="animated bounceIn"
                            v-show="this.$route.path.indexOf('/diary')!==-1"></router-view>
                        <router-view slot="/message" class="animated bounceIn"
                            v-show="this.$route.path.indexOf('/message')!==-1"></router-view>
                    </nav-bar-mobile>
                </div>

                <!-- 大屏幕导航栏 -->
                <div class="animated slideInRight profile_right col-md-9 hidden-xs">
                    <div class="row">
                        <nav-bar class="nav-bar col-xs-12"></nav-bar>
                        <div class="profile_content">
                            <keep-alive exclude="Profile">
                                <router-view style="animation-duration: 1000ms" class="animated bounceIn show">
                                </router-view>
                            </keep-alive>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from 'views/navbar/NavBar'
    import PersonalInfo from 'views/personalinfo/PersonalInfo'
    import NavBarMobile from 'views/navbar/NavBarMobile'

    export default {
        name: 'App',
        components: {
            NavBar,
            PersonalInfo,
            NavBarMobile
        },
        data() {
            return {

            };
        },
        methods: {

        },
        watch: {

        },
        computed: {
            blogShow() {
                return this.$route.path.indexOf('/blog') !== -1 || this.$route.path.indexOf('/detail') !== -1
            }
        }
    }
</script>

<style>
    /* @import "assets/css/iconfont.css"; */

    @import "assets/css/base.css";
    @import "assets/css/normalize.css";
    @import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
    @import "~assets/font/iconfont.css";

    @media screen and (max-width: 767px) {
        ::-webkit-scrollbar {
            width: 3px;
        }

        #app {
            padding-top: 15px;
        }

        .container {
            padding-left: 15px;
            padding-right: 15px;
        }

        .profile_left {
            height: 230px;
            margin-bottom: 20px;
        }
    }

    @media screen and (min-width :768px) {
        #app {
            overflow-x: hidden;
            width: 100vw;
            height: 100vh;
            padding-top: 15px;
        }

        .nav-bar {
            float: left;
            width: 80px;
        }

        .profile_left {
            height: 180px;
            margin-bottom: 20px;
        }

        .profile_content {
            float: right;
            width: 87%;
            height: 520px;
        }
    }

    @media screen and (min-width: 992px) {
        #app {
            padding-top: 50px;
        }

        .container {
            width: 1000px;
        }

        .profile_left {
            height: 600px;
            margin-bottom: 0;
        }

        .profile_content {
            width: 86%;
            height: 600px;
        }

        .nav-bar {
            margin-left: 10px;
        }
    }

    @media screen and (min-width: 1200px) {}

    #app {
        width: 100vw;
        height: 100vh;
        position: relative;
        overflow-y: auto;
        background: url(~assets/img/bg/yinyi4.jpg);
        background-size: cover;
    }

    .partical {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }

    .container {
        /* background-color: pink; */
    }

    .profile_left {
        background-color: #3b5998;
    }

    .show {
        padding: 10px;
    }
</style>