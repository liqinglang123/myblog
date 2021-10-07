<template>
    <div class=''>
        <!-- 时间轴展示 -->
        <div class="diary-show">
            <el-timeline :reverse="reverse" style="width: 60%;">
                <!-- 添加日记 -->
                <el-timeline-item icon="el-icon-circle-plus" size="large" color="#545c64"
                    style="cursor: pointer;font-weight: bold;" @click.native="addDiary">
                    点击添加
                </el-timeline-item>
                <el-timeline-item v-for="(activity, index) in diaryList" :key="index"
                    :timestamp="activity.time | formatDate" :color="activity.color" placement="top">
                    <el-card style="overflow: hidden;">
                        <div class="thing" v-html="activity.thing" ></div>
                        <div class="options">
                            <el-button type="primary" icon="el-icon-edit" circle size="mini"
                                @click="edit(activity._id)"> </el-button>
                            <el-button type="danger" icon="el-icon-delete" circle size="mini"
                                @click="del(activity._id)"></el-button>
                        </div>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item style="cursor: pointer;font-weight: bold;">
                    结束
                </el-timeline-item>
            </el-timeline>
        </div>
        <!-- 抽屉 -->
        <el-drawer :title="isAdd ? '添加点滴' : '修改点滴'" :visible.sync="drawer" direction="rtl" size="55%">
            <div class="box" style="padding-right: 50px;">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px"
                    class="demo-ruleForm">
                    <el-form-item label="时间" prop="time" required>
                        <el-date-picker v-model="ruleForm.time" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="点滴" prop="thing" required>
                        <!-- <textarea name="" id="" cols="50" v-model="ruleForm.thing"
                            style="height: 200px; resize: none;border-radius: 5px; padding: 10px; outline: none; border-color: #dcdfe6; font-size: 12px;color: #909399;"
                            placeholder="有趣的事分享出去吧...."></textarea> -->
                        <quill-editor class="ql-editor" v-model="ruleForm.thing" ref="myQuillEditor">
                        </quill-editor>
                    </el-form-item>
                    <el-form-item label="颜色" prop="color">
                        <el-color-picker v-model="ruleForm.color"></el-color-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">{{ isAdd ? '添加' : '修改'}}</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-drawer>

    </div>
</template>

<script>
    import { getYMD } from '@/utils/date'
    export default {
        created() {
            // 获取记录
            this.getDiary()
        },
        data() {
            var validateTime = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择一个日期'));
                } else {
                    callback();
                }
            };
            var validateThing = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请记录你的心情'));
                } else {
                    callback();
                }
            };
            return {
                // 用于判断添加还是修改
                isAdd: true,
                diaryList: [],
                drawer: false,
                reverse: false,
                ruleForm: {
                    time: '',
                    thing: '',
                    color: '',
                },
                rules: {
                    time: [
                        { validator: validateTime, trigger: 'blur' }
                    ],
                    thing: [
                        { validator: validateThing, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            async getDiary() {
                let res = await this.$get('/diary-all')
                this.diaryList = res
                // console.log(res)
            },
            // 添加点击事件
            addDiary() {
                this.isAdd = true
                this.drawer = true
            },
            async edit(id) {
                let res = await this.$get('/diary-one', { id })
                // console.log(res)
                this.ruleForm = res
                this.isAdd = false
                this.drawer = true
            },
            async del(id) {
                await this.$con_f('确认删除该日记吗?')

                let { success, msg } = await this.$get('/diary-delete', { id })
                // 判断是否添加成功
                if (success) {
                    // 重新获取数据
                    this.getDiary()
                    this.$msg_s(msg)
                    // this.resetForm('ruleForm')
                } else {
                    this.$msg_e(msg)
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        if (this.isAdd) {
                            let { success, msg } = await this.$post('/diary-add', this.ruleForm)
                            // 判断是否添加成功
                            if (success) {
                                // 重新获取数据
                                this.getDiary()
                                this.$msg_s(msg)
                                this.resetForm('ruleForm')
                            } else {
                                this.$msg_e(msg)
                            }
                        } else {
                            let { success, msg } = await this.$post('/diary-update', this.ruleForm)
                            // 判断是否修改成功
                            if (success) {
                                // 重新获取日记数据
                                this.getDiary()
                                this.$msg_s(msg)
                                this.resetForm('ruleForm')
                            } else {
                                this.$msg_e(msg)
                            }
                        }

                    } else {
                        console.log('还没有填完哦');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.ruleForm = {
                    time: '',
                    thing: '',
                    color: '',
                }
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
    .diary-show {
        width: 100%;
        height: 550px;
        margin-top: 50px;
        padding-left: 20px;
        overflow-y: auto;
    }

    .add:hover {
        transform: scale(1.2);
    }

   .thing>>> img {
        max-width: 100%!important;
    }

    .options {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
</style>