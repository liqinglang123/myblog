<template>
    <div class="contact hidden-sm hidden-xs">
        <!-- <div class="row">  -->
        <div class="title" style="text-align: left;font-size:14px ;">
            <Icon type="ios-link" size="20" />个人社交
        </div>
        <div class="box">
            <div class="contact-item">
                <a href="https://github.com/liqinglang123"><i style="color: #9ea7b4!important;"
                        class="iconfont">&#xe718;</i></a>
            </div>
            <div class="contact-item" id="qq">
                <i style="color: #18acfc;" class="iconfont">&#xe62e;</i>
                <div class="two-code qq" style="padding: 0 10px;width: 180px;height: 210px;">
                    <h5 class="info">扫描下方二维码，加我QQ</h5>
                    <img src="~assets/img/qq.png" style="width: 100%;" alt="">
                </div>
            </div>
            <div class="contact-item" id="wechat">
                <i style="color: #5fc948;" class="iconfont">&#xe62a;</i>
                <div class="two-code wechat" style="padding: 0 10px;">
                    <h5 class="info">扫描下方二维码，加我微信</h5>
                    <img src="~assets/img/wechat.png" style="width: 100%;" alt="">
                </div>
            </div>
            <div class="contact-item">
                <a href="https://twitter.com/liqinglang1"><i style="color: #2eb1eb;" class="iconfont">&#xe627;</i></a>
            </div>
        </div>
        <!-- </div> -->
    </div>
</template>
<script>
    export default {
        name: 'Contact',
        props: {
            contact: {
                type: Object,
                default() {
                    return {
                        github: 'https://github.com/liqinglang123',
                        qq: 'javascript:;',
                        wechat: 'javascript:;',
                    }
                }
            }
        }

    }
</script>
<style scoped>
    .contact {
        border-top: 1px solid #839ccf;
        padding-top: 15px;
    }

    .contact-item {
        position: relative;
        display: inline-block;
        cursor: pointer;
        width: 50%;
    }

    .contact-item a {
        outline: none;
        text-decoration: none;
    }

    .two-code {
        position: absolute;
        display: none;
        top: -240px;
        left: -42px;
        z-index: 999;
        width: 200px;
        height: 230px;
        border-radius: 5px;
        background-color: #fff;
    }

    .two-code::after {
        content: "";
        position: absolute;
        bottom: -26px;
        left: 85px;
        border-width: 13px;
        border-style: solid;
        border-color: #fff transparent transparent transparent;
    }

    .info {
        border-bottom: 1px solid #e8eaec;
        color: #17233d;
        margin: 5px 0;
        line-height: 30px;
        font-weight: bold;
        font-family: '宋体';
    }

    #qq:hover .qq {
        display: inline-block;
    }

    #wechat:hover .wechat {
        display: inline-block;
    }

    .iconfont {
        font-size: 40px;
    }
</style>