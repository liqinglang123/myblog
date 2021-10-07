<template>
    <div class='detail'>
        <Title><span slot="content">文章详情</span></Title>
        <div class="animated fadeInUpBig box">
            <module-box>
                <span slot="module-title">{{detail.title}}</span>
            </module-box>
            <!-- 文章分类 -->
            <div class="category">分类:&nbsp;&nbsp;&nbsp;{{ detail.category && detail.category.name}}</div>
            <!-- 正文 -->
            <div class="body" v-html="detail.body"></div>
            <!-- 标签 -->
            <div class="tags">
                <Tag v-for="item in detail.tags" style="font-size: 14px ; color:black">#&nbsp;{{item.name}}</Tag>
            </div>
            <!-- 相关数据展示 -->
            <div class="information">
                <ul>
                    <li>
                        <Icon type="md-chatboxes" size="16" style="vertical-align: middle;" /><span
                            style="margin-left: 5px;">评论({{detail.comments &&
                            detail.comments.length}})</span>
                    </li>
                    <li>
                        <Icon type="ios-clock" size="16" style="vertical-align: middle;" /><span
                            style="margin-left: 5px;">{{detail.updatedAt | formatDate}}</span>
                    </li>
                    <li>
                        <Icon type="md-person" size="16" style="vertical-align: middle;" /><span
                            style="margin-left: 5px;">{{detail.author}}</span>
                    </li>
                    <li>
                        <Icon type="ios-eye" size="16" style="vertical-align: middle;" /><span
                            style="margin-left: 5px;">浏览({{detail.readcount}})</span>
                    </li>
                </ul>
            </div>
            <!-- 评论 -->
            <div class="comment">
                <module-box>
                    <span slot="module-title">评论列表({{detail.comments && detail.comments.length}})</span>
                </module-box>
                <div class="com-box" v-for="(item , index) in detail.comments" :key="index">
                    <div class="com-name">{{ item.name }}: <span class="com-content" style="font-weight: normal;">{{ item.content }}</span></div>
                    <div class="com-date">{{ item.createtime | dateToStr }}</div>
                    <!-- <div ></div> -->
                </div>
                <h5 v-show="detail.comments.length === 0" style="text-align: center; line-height: 50px;">暂时没有评论哦~</h5>
                <module-box>
                    <span slot="module-title">我要评论</span>
                </module-box>
                <!-- 写评论 -->
                <div class="write-comment">
                    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="60" size="mini">
                        <FormItem label="昵  称" prop="name" required>
                            <Input type="text" v-model="formCustom.name" placeholder="留下你的昵称吧"></Input>
                        </FormItem>
                        <FormItem label="邮  箱" prop="email">
                            <Input type="text" v-model="formCustom.email" placeholder="请输入邮箱"></Input>
                        </FormItem>
                        <FormItem label="评  论" prop="content" required>
                            <Input type="textarea" v-model="formCustom.content" :autosize="{minRows: 2,maxRows: 5}"
                                placeholder="期待你的精彩评论"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('formCustom')">评论</Button>
                            <Button type="default" @click="handleReset('formCustom')"
                                style="margin-left: 8px">重置</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
            <!-- <Drawer title="Basic Drawer" placement="bottom" :closable="false" v-model="value8">
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer> -->
            <!-- 返回所有文章 -->
            <div class="return">
                <div @click="returnlist">
                    <Icon type="ios-arrow-back" />
                    <span>所有文章</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Title from 'components/content/Title'
    import ModuleBox from 'components/content/ModuleBox'
    import { getYMD, getYMDHMS , dateStr} from '@/utils/date'

    export default {
        created() {
            // 获取文章详细数据
            this.getDetail()
        },
        components: {
            Title,
            ModuleBox
        },
        data() {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请留下你的大名吧'));
                } else {
                    callback();
                }
            };
            const validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback();
                } else if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
                    callback(new Error('邮箱格式不正确'));
                } else {
                    callback();
                }
            };
            const validateContent = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('评论内容不能为空'));
                } else {
                    callback();
                }
            };
            return {
                value8: false,
                id: '',
                detail: {},
                formCustom: {
                    id: '',
                    name: '',
                    email: '',
                    content: ''
                },
                ruleCustom: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    email: [
                        { validator: validateEmail, trigger: 'blur' }
                    ],
                    content: [
                        { validator: validateContent, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            replyBox() {

            },

            // 获取文章详细数据的方法
            async getDetail() {
                // console.log(this.$route.path)
                this.id = this.$route.params.id
                this.formCustom.id = this.$route.params.id
                let res = await this.$get('/article-one', { id: this.id })
                this.detail = res
                // console.log(res)
            },
            // 提交表单
            handleSubmit(name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        let { success, msg } = await this.$get('/post-comment', this.formCustom)
                        if (success) {
                            // 重新获取数据
                            this.getDetail()
                            this.$Message.success(msg)
                            // 重置表单
                            this.handleReset('formCustom')
                        } else {
                            this.$Message.error(msg);
                        }
                        // this.$Message.success('Success!');
                    } else {
                        this.$Message.error('表单验证不成功');
                    }
                })
            },
            // 重置表单
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            // 返回文章列表
            returnlist() {
                // 文章阅读量+1
                this.$router.push('/blog')
            },
        },

        destroyed() {
            // console.log('被销毁了')
            this.$get('/add-count', {
                id: this.id,
                readcount: this.detail.readcount + 1
            })
        },
        filters: {
            formatDate(str) {
                return getYMD(str)
            },
            formatDate2(str) {
                return getYMDHMS(str)
            },
            dateToStr(str){
                return dateStr(str)
            }
        }
    }
</script>

<style scoped>
    .detail {
        overflow-y: auto;
        width: 100%;
        height: 100%;
        padding: 0 10px;
        background-color: #f4f4f4;
    }

    /* 文章盒子 */
    .box {
        overflow: hidden;
        width: 100%;
        padding: 0 12px;
        margin-top: 50px;
        background-color: white;
        border-top: 5px solid #3b5998;
    }

    /* 分类 */
    .category {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        padding-right: 5px;
        margin: 10px 0;
        font-size: 16px;
        font-family: '宋体';
        font-weight: bold;
        color: black;
    }

    /* 正文 */
    .body {
        font-size: 14px;
        color: #657180;
        overflow: hidden;
    }

    .body::first-letter {
        font-size: 24px
    }

    .body>>> img {
       max-width: 100%;
    }

    /* 标签 */
    .tags {
        margin: 20px 0;
    }

    /* 信息展示 */
    ul {
        list-style-type: none;
        margin-bottom: 20px;
    }

    ul li {
        display: inline-block;
        color: black;
        margin-right: 10px;
    }

    /* 评论黑子 */
    .com-box {
        width: 100%;
        margin: 15px 0;
        padding: 10px 15px;
        color: #999;
        background-color: #f7f7f7;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    .com-name {
        font-size: 14px;
        font-weight: bold;
    }

    .com-date {
        color: #777;
        margin: 5px 0;
    }

    .write-comment {
        padding: 10px;
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

    @media screen and (max-width: 767px) {
        .information ul li {
            display: block;
            margin-bottom: 5px;
        }
    }
</style>