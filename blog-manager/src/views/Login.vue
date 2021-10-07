<template>
    <div class='login'>
        <!-- 粒子效果 -->
        <vue-particles class="particle" color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle"
            :particleSize="4" linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4"
            :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true"
            clickMode="push">
        </vue-particles>
        <!-- 表单 -->
        <div class="form">
            <div class="title">个人博客管理系统</div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="50px" size="mini"
                class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="请输入账号">
                    </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"
                        @keydown.native.enter="submitEnter">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checked">记住密码</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            var validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    callback();
                }
            };
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                checked: false,
                ruleForm: {
                    username: "",
                    password: ""
                },
                rules: {
                    username: [
                        { validator: validateUsername, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            // 敲击回车键，提交表单
            submitEnter() {
                this.submitForm('ruleForm')
            },
            // 表单提交
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let { success, msg, token } = await this.$post('/login', this.ruleForm)
                        // 判断是否登录成功
                        if (success) {
                            sessionStorage.setItem("token", token)
                            // 保存用户名
                            localStorage.setItem('username', this.ruleForm.username)
                            // 判断是否记住密码
                            if (this.checked) {
                                // 保存密码
                                localStorage.setItem("password", this.ruleForm.password)
                            }
                            // 将token信息保存到请求头中
                            this.$setToken();
                            this.$router.push("/layout")
                        } else {
                            this.$msg_e(msg, 4000)
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped lang="scss">
    .login {
        overflow: hidden;
        width: 100%;
        height: 100%;
        background: url(../assets/img/yinyi4.jpg) no-repeat fixed;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;

        .form {
            color: #2b1216;
            font-family: '宋体';
            font-size: 20px;
            font-weight: bold;
            width: 420px;
            padding: 20px;
            border: 1px solid gray;

            border-radius: 15px;

            .title {
                text-align: center;
                margin-bottom: 20px
            }
        }

        .particle {
            width: 100%;
            height: 100%;
            position: fixed;
        }
    }
</style>