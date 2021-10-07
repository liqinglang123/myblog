<template>
    <div class=''>
        <div class="title">
            <i class="el-icon-collection" style="color:#67C23A;font-size: 25px;"></i>
            <span class="text">新建分类</span>
        </div>
        <div class="form">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px"
                class="demo-ruleForm" size="mini">
                <el-form-item label="分类名称" prop="name">
                    <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入分类名称'));
                } else {
                    callback();
                }
            };

            return {
                ruleForm: {
                    name: ''
                },
                rules: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ]
                },
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let { success, msg } = await this.$post('/category-add', this.ruleForm)
                        // 添加是否成功
                        if (success) {
                            this.$msg_s(msg)
                            this.resetForm('ruleForm')
                        } else {
                            this.$msg_e(msg)
                        }
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped lang="scss">
    .title {
        font-size: 25px;
        color: #606266;
        margin-bottom: 40px;

        .text {
            font-family: "宋体";
            font-weight: bold
        }
    }

    .form {
        width: 400px;
    }
</style>