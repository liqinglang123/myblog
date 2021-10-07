<template>
    <div class='album-detail'>
        <!-- 相册详情 -->
        <Title><span slot="content">{{albumdata.name}}</span></Title>
        <div class="album-container" v-show="isShow">
            <div v-for="(item , index) in albumdata.pictures"
                :class="{animated : true , slideInLeft : index % 2 == 0 , slideInRight : index % 2 == 1}" :key="index">
                <img style="width: 100%;height: 100%;" v-lazy="BASE_URL_Img+item" alt="" :title="item" srcset="">
            </div>
        </div>
        <!-- 返回所有文章 -->
        <div class="return" v-show="isShow">
            <div @click="returnlist">
                <Icon type="ios-arrow-back" />
                <span>返回相册集</span>
            </div>
        </div>

        <!-- 相册密码验证框 -->
        <div class="secrecy animated bounce" v-show="!isShow">
            <div class="box">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" inline size="mini">
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="输入相册密码进行访问">
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formInline')">验证</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
        
    </div>
</template>

<script>
    import Title from 'components/content/Title'
    import { BASE_URL_Img } from '@/config'
    export default {
        created() {
            this.getAlbumData()
        },
        components: {
            Title
        },
        data() {
            return {
                // 相册id
                albumdata: {},
                isShow: true,

                // 照片路径
                BASE_URL_Img,
                formInline: {
                    password: ''
                },
                ruleInline: {
                    password: [
                        { required: true, message: '请输入相册密码', trigger: 'blur' }]
                }
            }
        },
        methods: {
            async getAlbumData() {
                // 获取相册id
                let id = this.$route.params.id

                let res = await this.$get('/album-one', { id })
                this.albumdata = res
                this.isShow = !res.secrecy
                // console.log(res)
            },
            returnlist() {
                this.$router.push('/album')
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.formInline.password === '123456') {
                            this.isShow = true
                        } else {
                            this.$Message.error('相册密码错误!');
                        }
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .album-detail {
        width: 100%;
        height: 100%;
        background-color: #f4f4f4;
        padding: 10px 10px;
        overflow-y: auto;
    }

    .album-container {
        /* width: 100%; */
        margin-top: 50px;
        padding: 0 20px;
        column-count: 3;
    }

    @media screen and (max-width : 767px) {
        .album-container {
            column-count: 2;
            padding: 0;
        }
    }

    .album-container div {
        break-inside: avoid;
        margin-bottom: 10px;
        padding: 10px;
        background-color: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, .5);
        cursor: pointer;
    }

    /* 密码验证框 */
    .secrecy {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: calc(100% - 50px);
        margin-top: 50px;
    }

    .return {
        display: flex;
        justify-content: flex-end;
        padding: 0 30px;
        margin: 20px 0;
        width: 100%;
        font-size: 16px;
    }

    .return div {
        width: 110px;
        height: 34px;
        line-height: 34px;
        font-weight: bold;
        text-align: center;
        border: 1px solid #dadada;
        cursor: pointer;
    }

    .return div:hover {
        color: #fff;
        border: none;
        background-color: #3b5998;
    }
</style>