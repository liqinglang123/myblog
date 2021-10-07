<template>
    <div class='diary'>
        <Title><span slot="content">个人随笔</span></Title>
        <div class="diary-show" ref="show">
            <Timeline class="animated fadeInUpBig" style="margin-top: 30px;" ref="test1">
                <TimelineItem class="time-line-item animated rubberBand" v-for="(item , index) in diaryList" :color="item.color">
                    <div class="card">
                        <h4 class="timestamp" style="color: #aaa;">
                            <Icon type="md-calendar" size="20" style="padding-right: 5px;" />{{ item.time | formatDate
                            }}
                        </h4>
                        <p class="thing" v-html="item.thing"></p>
                    </div>
                </TimelineItem>
                <TimelineItem color="blue">起点</TimelineItem>
            </Timeline>
        </div>
    </div>
</template>

<script>
    import Title from 'components/content/Title'
    import { getYMD } from '@/utils/date'
    export default {
        created() {
            // 调用获取记录的方法
            this.getDiaryList()
        },
        mounted() {
            // var box = this.$refs.show
            // console.log(ss)
            // this.$refs.show.onscroll = ()=>{
            //     // console.log()
            //     console.log( box.offsetHeight, zz.offsetHeight)
            //     console.log(ss.offsetHeight , ss.offsetTop )
            //     console.log(box.scrollTop , box.offsetTop)
            // }

            // var wow = new WOW({
            //     boxClass: 'wow',
            //     animateClass: 'animated',
            //     offset: 0,
            //     mobile: true,
            //     live: true
            // })

            // wow.init();
        },
        components: {
            Title
        },
        data() {
            return {
                diaryList: []
            }
        },
        methods: {
            // 获取日记数据
            async getDiaryList() {
                // console.log('ddfdsda')
                let res = await this.$get('/diary-all')
                this.diaryList = res
            }
        },
        filters: {
            formatDate(str) {
                return getYMD(str)
            }
        }
    }
</script>

<style scoped>
    /* 进度条 */
    ::-webkit-scrollbar {
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
    }

    .diary {
        background-color: #f4f4f4;
        height: 100%;
    }

    .diary-show {
        height: 90%;
        overflow-y: auto;
        margin-top: 50px;
        padding: 0 30px;
    }

    .time-line-item {
        /* margin-bottom: 20px!important; */
        padding-bottom: 30px;
    }

    /* 卡片内容 */
    .card {
        position: relative;
        padding: 10px;
        margin-top: -17px;
        margin-left: 10px;
        background-color: #fff;
        border-radius: 5px;
    }

    .card:hover {
        box-shadow: 0 0 5px rgb(0, 0, 0, 0.3);
    }

    /* 三角 */
    .card::after {
        content: '';
        position: absolute;
        top: 15px;
        left: -30px;
        border-width: 10px 15px;
        border-style: solid;
        border-color: transparent #fff transparent transparent;
    }

    /* 时间 */
    .timestamp {
        padding-bottom: 3px;
        margin-bottom: 5px;
        border-bottom: 1px solid #e8eaec;
    }

    /* 卡片内容 */
    .thing {
        font-size: 16px;
        color: #515a6e;
        margin: 15px 0;
    }

    .thing>>> img {
        max-width: 100%;
    }
</style>