<template>
    <div class="message">
        <Title><span slot="content">给我留言</span></Title>
        <!-- 评论前设置邮箱、昵称、头像 -->
        <div v-if="!isShow" class="setting  animated bounce">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100" size="mini">
                <!-- <div class="title" style="text-align: center;">设置</div> -->
                <FormItem class="form-item" label="设置头像" prop="avator" required>
                    <div class="demo-avatar">
                        <Avatar :src="BASE_URL_Img+formCustom.avator" size="large" />
                        <Button style="margin-left: 10px;" size="small" @click="handleChange">随机切换</Button>
                    </div>
                </FormItem>

                <FormItem class="form-item" label="昵  称" prop="name" required>
                    <Input type="text" v-model="formCustom.name" placeholder="留下你的昵称吧"></Input>
                </FormItem>
                <FormItem class="form-item" label="邮  箱" prop="email" required>
                    <Input type="text" v-model="formCustom.email" placeholder="请输入邮箱"></Input>
                </FormItem>

                <FormItem>
                    <Button type="primary" @click="handleSubmit('formCustom')">保存</Button>
                    <Button type="default" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </div>

        <!-- 主盒子 -->
        <div v-if="isShow" class="comment-box">
            <!-- 写评论 -->
            <div class="write-comment">
                <div class="message-box">
                    <div style="display: flex;margin-bottom:10px">
                        <Avatar class="avator" :src="BASE_URL_Img+formCustom.avator" size="large" shape="square" />
                        <textarea class="message-textarea" v-model="formCustom.content" prop="content"
                            placeholder="相对我说点什么呢……"></textarea>
                    </div>
                    <div class="btns">
                        <Button type="primary" @click="submit">发表评论</Button>
                        <Button type="default" @click="reset" style="margin-left: 8px">重置</Button>
                    </div>
                </div>
            </div>

            <!-- 评论列表 -->
            <div class="messagecount">
                留言列表({{messagecount}})
            </div>

            <div v-if="messagecount === 0" style="text-align: center;">没有留言~</div>

            <!-- 评论展示 -->
            <div class="message-father" v-for="(item , index) in messagedata" :key="index">
                <Avatar :src="BASE_URL_Img+item.avator" size="large" style="width: 40px;" />
                <div class="message-box">
                    <span class="message-name">{{item.name}}</span>
                    <span class="message-time">{{item.updatedAt | dateToStr}}</span>
                    <span class="message-content">{{item.content}}</span>
                    <span class="reply-info" @click="inputboxshow(index , item._id , item.name)">回复</span>
                    <div class="reply">
                        <div class="reply-item" v-for="(item2 , index2) in item.replys" :key="index2">
                            <Avatar :src="BASE_URL_Img+item2.avator" style="width: 30px;" />
                            <div class="reply-box" style="margin-left: 10px;">
                                <span class="reply-name message-name">{{item2.name}}</span>
                                <span class="message-time">{{item2.updatedAt | dateToStr}}</span>
                                <span
                                    style="font-size: 14px;color: #a8a8b3;">回复&nbsp;&nbsp;{{item2.to}}&nbsp;:&nbsp;</span>
                                <span class="reply-content message-content">{{item2.content}}</span>
                                <span class="reply-info" @click="inputboxshow(index ,item._id , item2.name)">回复</span>
                            </div>
                        </div>
                    </div>
                    <div v-show="messagedata[index].show || false" class="reply-input" :id="item._id">
                        <div style="display: flex;margin-bottom:10px">
                            <Avatar :src="BASE_URL_Img+formCustom.avator" shape="square" />
                            <textarea v-model="content2" class="message-textarea reply-textarea"
                                :placeholder="reply_info"></textarea>
                        </div>
                        <div class="btns">
                            <Button type="primary" @click="submitreply">回复</Button>
                            <Button type="default" @click="closeReply(index)" style="margin-left: 8px">取消</Button>
                        </div>
                    </div>
                </div>
            </div>

            <h5 v-if="messagecount !== 0" style="text-align: center; line-height: 50px;">到底了哦~</h5>
        </div>
    </div>
</template>
<script>
    import { Upload_Album_URL, BASE_URL_Img } from '@/config'
    import { dateStr } from "@/utils/date.js"
    import Title from 'components/content/Title'
    import ModuleBox from 'components/content/ModuleBox'

    const avators = ['pp1.png', 'pp2.png', 'pp3.png', 'pp4.png', 'pp5.png', 'pp6.png', 'pp7.png', 'pp8.png', 'pp9.png']

    export default {
        name: 'Profile',
        components: {
            Title,
            ModuleBox,
        },
        created() {
            this.getMessageData()
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
                    callback(new Error('请填写邮箱'));
                } else if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
                    callback(new Error('邮箱格式不正确'));
                } else {
                    callback();
                }
            };
            return {
                isShow: false,
                // 留言条数
                messagecount: 0,
                // 图片路径
                BASE_URL_Img,
                // 留言数据
                messagedata: [],

                // 给回复框提示
                reply_info: '',

                message: [
                    {
                        _id: '10086',
                        avator: 'pp1.png',
                        content: '今天天气真好',
                        name: '法外狂徒张三',
                        parentId: '',
                        to: '',
                        reply: [
                            {
                                avator: 'pp2.png',
                                content: '哈哈哈哈\nfdfasf\n发生的发发',
                                name: 'lisi',
                                to: '法外狂徒张三'
                            },
                            {
                                avator: 'pp3.png',
                                content: '写的还行吧 个人觉得',
                                name: '王武',
                                to: 'lisi'
                            }
                        ]
                    }
                ],
                replyData: {

                },
                content2: '',
                formCustom: {
                    avator: 'pp1.png',
                    name: '',
                    email: '',
                    // 回复哪一位
                    to: '',
                    content: '',
                    // 父极id
                    parentId: ''
                },
                ruleCustom: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    email: [
                        { validator: validateEmail, trigger: 'blur' }
                    ]
                }
            }
        },
        filters: {
            dateToStr(date) {
                return dateStr(date)
            }
        },
        methods: {
            async submit() {
                // console.log(this.formCustom)
                if (this.formCustom.content.trim() === "") {
                    this.$Message.error('不能发表空评论')
                } else {
                    // 不用回复任何人 所以没有parentId 、to
                    this.formCustom.parentId = ""
                    this.formCustom.to = ""
                    let { success, msg } = await this.$get('/add-message', this.formCustom)
                    if (success) {
                        this.getMessageData()
                        this.formCustom.content = ""
                        this.$Message.success('评论发表成功')
                    } else {
                        this.$Message.error('评论发表失败')
                    }
                }
            },
            // 回复提交
            async submitreply() {
                if (this.content2.trim() === "") {
                    this.$Message.error('不能发表空评论')
                } else {
                    let data = {}
                    Object.assign(data, this.formCustom)
                    data.content = this.content2
                    let { success, msg } = await this.$get('/add-message', data)
                    if (success) {
                        this.getMessageData()
                        this.$Message.success('评论发表成功')
                    } else {
                        this.$Message.error('评论发表失败')
                    }
                }
            },
            reset() {
                this.formCustom.content = ""
            },
            // 随机切换头像
            handleChange() {
                let num = Math.floor(Math.random() * 9)
                this.formCustom.avator = avators[num]
            },
            // 获取评论信息
            async getMessageData() {
                let { data, count } = await this.$get('message-all')
                // console.log(data)
                this.messagedata = data
                this.messagecount = count

            },
            // 提交表单
            handleSubmit(name) {
                this.$refs[name].validate(async (valid) => {
                    // console.log(valid)
                    if (valid) {
                        this.isShow = true
                    }
                })
            },
            // 重置表单
            handleReset(name) {
                this.$refs[name].resetFields();
                this.formCustom = {
                    avator: 'pp1.png',
                    name: '',
                    email: '',
                    // 回复哪一位
                    to: '',
                    content: '',
                    // 父极id
                    parentId: ''
                }
            },
            // 关闭回复盒子
            closeReply(index) {
                this.$set(this.messagedata[index], "show", false)
                this.content2 = ""
            },
            // 回复盒子显示
            inputboxshow(index, id, to) {
                // 首先关闭所有盒子
                this.messagedata.forEach(item => {
                    this.$set(item, "show", false);
                })
                this.content2 = ""
                this.$set(this.messagedata[index], "show", true)
                this.reply_info = '回复 ' + to
                this.formCustom.parentId = id
                this.formCustom.to = to
            }
        },
    }
</script>
<style scoped>
    .message {
        overflow-y: auto;
        width: 100%;
        height: 100%;
        background-color: #f4f4f4;
    }

    .setting {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: calc(100% - 50px);
        margin-top: 50px;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }

    .comment-box {
        overflow-y: auto;
        margin-top: 50px;
    }

    .avator {
        width: 40px;
        margin-right: 5px;
    }

    @media screen and (max-width : 767px) {
        .avator {
            display: none;
        }

        .message-box {
            padding-right: 10px;
        }

        .message-father {
            padding: 0 10px;
        }
    }

    .message-textarea {
        flex: 1;
        border: 1px solid #dcdee2;
        outline: none;
        height: 50px;
        padding: 10px;
        resize: none;
        border-radius: 6px;
    }

    .messagecount {
        margin: 20px 0;
        padding: 10px;
        line-height: 20px;
        font-size: 16px;
        font-weight : bold;
        border-bottom: 1px solid #eae7f1;
        border-top: 1px solid #aaa;
      
    }

    .message-father {
        display: flex;
        margin-top: 15px;
        padding-top: 15px;
    }

    .message-father+.message-father {
        border-top: 1px solid #eae7f1;
    }

    .message-box {
        margin-left: 10px;
        flex: 1;
    }

    .message-name {
        display: block;
        font-size: 16px;
        font-weight: bold;
        color: black;
    }

    .message-time {
        color: #a8a8b3;
        font-size: 12px;
        display: block;
    }

    .message-content {
        font-size: 14px;
        color: black;
    }

    .reply-info {
        margin-left: 15px;
        color: #5090c4;
        cursor: pointer;
    }

    /* 回复 */
    .reply {
        background-color: #F4F4DE;
        margin-bottom: 10px;
    }

    .reply-item {
        display: flex;
        padding: 10px;
    }

    .reply-item+.reply-item {
        border-top: 1px solid #ACACFB;
    }

    .reply-textarea {
        height: 40px;
        margin-left: 5px;
    }
</style>