<template>
    <div class='information'>
        <div class="form">
            <div class="title">个人信息</div>
            <div class="box">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px"
                    class="demo-ruleForm" size="mini">
                    <el-form-item label="姓名" prop="name" required>
                        <el-input type="text" v-model="ruleForm.name" autocomplete="off" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex" required>
                        <el-select v-model="ruleForm.sex" clearable placeholder="选择性别">
                            <el-option v-for="item in sexs" :key="item" :label="item.label" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出生日期" prop="birthday" required>
                        <div class="block">
                            <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="籍贯" prop="nativePlace" required>
                        <el-input type="text" v-model="ruleForm.nativePlace" autocomplete="off" placeholder="请输入籍贯">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="phone" required>
                        <el-input type="text" v-model="ruleForm.phone" autocomplete="off" placeholder="请输入电话" required>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email" required>
                        <el-input type="text" v-model="ruleForm.email" autocomplete="off" placeholder="请输入邮箱" required>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="政治面貌" prop="politicalOutlook">
                        <el-select v-model="ruleForm.politicalOutlook" clearable placeholder="请选择">
                            <el-option v-for="item in politicalOutlooks" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学历" prop="degree" required>
                        <el-select v-model="ruleForm.degree" placeholder="请选择" clearable>
                            <el-option v-for="item in degrees" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="毕业院校" prop="school" required>
                        <el-select v-model="ruleForm.school" placeholder="请选择" clearable>
                            <el-option v-for="item in schools" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职业" prop="occupation" required>
                        <el-input type="text" v-model="ruleForm.occupation" autocomplete="off" placeholder="请输入职业"
                            required>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="座右铭1" prop="sayings1" >
                        <el-input type="text" v-model="ruleForm.sayings1" autocomplete="off" placeholder="">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="座右铭2" prop="sayings2" >
                        <el-input type="text" v-model="ruleForm.sayings2" autocomplete="off" placeholder="">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="兴趣爱好" prop="hobbies">
                        <textarea v-model="ruleForm.hobbies" name="" id="" cols="50" rows="5"
                            style="resize: none; padding: 10px;outline: none;border: 1px solid #aaa;border-radius: 10px;" placeholder="兴趣爱好"></textarea>
                    </el-form-item>

                    <el-form-item label="个人描述" prop="description">
                        <textarea v-model="ruleForm.description" name="" id="" cols="50" rows="10"
                            style="resize: none; padding: 10px;outline: none;border: 1px solid #aaa;border-radius: 10px;" placeholder="个人描述……"></textarea>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { getYMD } from '@/utils/date'
    export default {
        async created() {
            let res = await this.$get('/blogger')
            console.log(res)
            this.ruleForm = res
        },
        data() {
            // 验证名字
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入姓名'));
                } else {
                    callback();
                }
            };

            // 验证性别
            var validateSex = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择性别'));
                } else {
                    callback();
                }
            };

            // 验证出生日期
            var validateBirthday = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择出生日期'));
                } else {
                    callback();
                }
            };

            // 验证籍贯
            var validateNativePlace = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入籍贯'));
                } else {
                    callback();
                }
            };

            // 验证电话
            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入电话'));
                } else if (!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}/.test(value)) {
                    callback(new Error('请输入有效的电话'))
                } else {
                    callback();
                }
            };

            // 验证邮箱
            var validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱'));
                } else if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
                    callback(new Error('邮箱格式不正确'))
                } else {
                    callback();
                }
            };

            // 验证政治面貌
            var validatePoliticalOutlook = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择政治面貌'));
                } else {
                    callback();
                }
            };

            // 验证院校
            var validateSchool = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择院校'));
                } else {
                    callback();
                }
            };

            // 验证专业
            var validateAcadmic = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择专业'));
                } else {
                    callback();
                }
            };

            // 验证绩点
            var validateGPA = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入绩点'));
                } else {
                    callback();
                }
            };

            // 验证学历
            var validateDegree = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择学历'));
                } else {
                    callback();
                }
            };

            // 验证职业
            var validateOccupation = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入职业'));
                } else {
                    callback();
                }
            };

            return {
                // 性别
                sexs: ['男', '女'],
                // 学历
                degrees: ['初中', '高中', '本科', '硕士', '博士'],
                // 政治面貌
                politicalOutlooks: ['共青团员', '预备党员', '党员'],
                // 学校
                schools: ['湖南科技大学', '湘潭大学', '湖南大学', '长沙理工大学', '湖南软件职业技术学院', '湖南工程学院'],
                ruleForm: {
                    // 姓名
                    name: '',
                    // 性别
                    sex: '',
                    // 出生日期
                    birthday: '',
                    // 籍贯
                    nativePlace: '',
                    // 电话
                    phone: '',
                    // 邮箱
                    email: '',
                    // 政治面貌
                    politicalOutlook: '',
                    // 就读学校
                    school: '',
                    // 学历
                    degree: '',
                    // 应聘职位
                    occupation: '',
                    // 个人描述
                    description: '',
                    hobbies : '',
                    sayings1 : '',
                    sayings2 : ''
                },
                rules: {
                    name: [{ validator: validateName, trigger: 'blur' }],
                    sex: [{ validator: validateSex, trigger: 'blur' }],
                    birthday: [{ validator: validateBirthday, trigger: 'blur' }],
                    nativePlace: [{ validator: validateNativePlace, trigger: 'blur' }],
                    phone: [{ validator: validatePhone, trigger: 'blur' }],
                    email: [{ validator: validateEmail, trigger: 'blur' }],
                    PoliticalOutlook: [{ validator: validatePoliticalOutlook, trigger: 'blur' }],
                    school: [{ validator: validateSchool, trigger: 'blur' }],
                    acadmic: [{ validator: validateAcadmic, trigger: 'blur' }],
                    GPA: [{ validator: validateGPA, trigger: 'blur' }],
                    degree: [{ validator: validateDegree, trigger: 'blur' }],
                    occupation: [{ validator: validateOccupation, trigger: 'blur' }]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let { success, msg } = await this.$post('/blogger-update', this.ruleForm)
                        if (success) {
                            this.$msg_s(msg)
                        } else {
                            this.$msg_e(msg)
                        }

                    } else {
                        console.log('error submit!!');
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
    .information {
        display: flex;
        justify-content: center;

        .form {
            width: 55%;
            height: 80%;
            padding: 20px;
            padding-right: 40px;
            border: 2px solid #DCDFE6;
            border-radius: 15px;

            .title {
                margin: 20px 0;
                color: #303133;
                font-size: 20px;
                font-family: '宋体';
                font-weight: bolder;
                text-align: center;
            }

            .box {
                height: 500px;
                padding-right: 20px;
                overflow: auto;
            }
        }
    }
</style>