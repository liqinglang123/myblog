<template>
    <div>
        <ul class="infomation">
            <li class="animated slideInLeft infomation-item"><div class="item-key"><i class="glyphicon glyphicon-user"></i> <span>姓名</span>
            </div><div class="item-value">{{information.name}}</div></li>

            <li class="animated slideInRight infomation-item"><div class="item-key"><i class="glyphicon glyphicon-calendar"></i> <span>出生日期</span>
            </div><div class="item-value">{{information.birthday | formatDate}}</div></li>

            <li class="animated slideInLeft infomation-item"><div class="item-key"><i class="glyphicon glyphicon-map-marker"></i> <span>地址</span>
            </div><div class="item-value">{{information.nativePlace}}</div></li>

            <li class="animated slideInRight infomation-item"><div class="item-key"><i class="glyphicon glyphicon-envelope"></i> <span>邮箱</span>
            </div><div class="item-value">{{information.email}}</div></li>

            <li class="animated slideInLeft infomation-item"><div class="item-key"><i class="glyphicon glyphicon-phone"></i> <span>电话</span>
            </div><div class="item-value">{{information.phone}}</div></li>

            <li class="animated slideInRight infomation-item"><div class="item-key"><i class="glyphicon glyphicon-globe"></i> <span>网站</span>
            </div><div class="item-value"><a href="http://47.95.123.41/backend">博客后台管理</a></div></li>
        </ul>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import {getYMD} from '@/utils/date'
    export default {
        name: 'Infomation',
        computed: {
            ...mapState('admin' ,['information'])
        },
        filters : {
            formatDate(str) {
                return getYMD(str)
            }
        }
    }
</script>
<style scoped>
    .infomation {
        margin-top: 10px;
        list-style: none;
    }

    .animated {
        animation-duration: 1000ms
    }
    
    .infomation li {
        height: 20px;
        font-size: 15px;
        line-height: 20px;
        box-sizing: content-box;
    }
    
    .infomation li+li {
        margin-top: 10px;
        border-top: 1px solid #e6e6e6;
    }
    
    .item-key {
        float: left;
        color: #3b5998;
    }
    
    .item-value {
        float: right;
        width: 200px;
        color: #717171;
    }
    
    @media screen and (max-width: 767px) {
        .infomation li {
            padding-top: 5px;
        }
    }
    
    @media screen and (min-width: 768px) {
        .infomation li {
            padding-top: 8px;
        }
    }
</style>