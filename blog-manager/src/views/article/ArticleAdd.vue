<template>
    <div class='main'>
        <!-- 表单区 -->
        <div class="form">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px"
                label-position="right" class="demo-ruleForm" size="mini">
                <el-form-item label="文章标题" prop="title">
                    <el-input type="text" v-model="ruleForm.title" autocomplete="off" placeholder="请在此输入文章标题">
                    </el-input>
                </el-form-item>
                <el-form-item label="文章分类" prop="category">
                    <el-select v-model="ruleForm.category" clearable placeholder="请选择文章分类">
                        <el-option v-for="item in categoryList" :key="item._id" :label="item.name" :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章标签" prop="tags">
                    <el-select v-model="ruleForm.tags" multiple placeholder="请选择文章标签">
                        <el-option v-for="item in tagList" :key="item._id" :label="item.name" :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章封面" prop="cover">
                    <el-upload class="avatar-uploader" :action="Upload_Album_URL" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="文章详情" prop="body">
                    <quill-editor class="ql-editor" v-model="ruleForm.body" ref="myQuillEditor">
                    </quill-editor>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { Upload_Album_URL, BASE_URL_Img } from '@/config'
    export default {
        created() {
            // 获取分类列表
            this.getCategoryList();
            // 获取标签列表
            this.getTagList();
        },
        data() {
            // 验证名称
            var validateTitle = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入文章标题'));
                } else {
                    callback();
                }
            };
            // 验证分类
            var validateCategory = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择文章分类'));
                } else {
                    callback();
                }
            };
            return {
                imageUrl: '',
                BASE_URL_Img,
                Upload_Album_URL,
                // 分类列表
                categoryList: [],
                // 标签列表
                tagList: [],
                ruleForm: {
                    title: '',
                    category: '',
                    tags: [],
                    // 封面
                    cover: '',
                    body: "",
                },
                rules: {
                    title: [{ validator: validateTitle, trigger: 'blur' }],
                    category: [{ validator: validateCategory, trigger: 'blur' }]
                }
            };
        },
        methods: {
            // 获取分类列表的方法
            async getCategoryList() {
                let res = await this.$get('/category-all')
                this.categoryList = res
            },
            // 获取标签列表的方法
            async getTagList() {
                let res = await this.$get('/tag-all')
                this.tagList = res
            },
            // 表单提交
            submitForm(formName) {
                console.log(this.ruleForm)
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        // 发送请求
                        let { success, msg } = await this.$post('/article-add', this.ruleForm)

                        // 判断是否添加成功
                        if (success) {
                            this.$msg_s(msg)
                            this.resetForm('ruleForm')
                        } else {
                            this.$msg_e(msg)
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 上传成功
            handleAvatarSuccess(res, file) {
                // console.log(res, file)
                if (res.success) {
                    this.$msg_s("文章封面上传成功")
                    this.ruleForm.cover = res.filename
                    this.imageUrl = URL.createObjectURL(file.raw);
                    // console.log(this.ruleForm)
                } else {
                    this.$msg_e("文章封面上传失败")
                }
            },
            // 上传封面成功函数
            beforeAvatarUpload(file) {
                // 定义可以上传的图片格式类型数组
                let img_type_list = ["image/jpeg", "image/png", "image/gif"];
                const isJPG = img_type_list.includes(file.type);
                const isLt2M = file.size / 1024 / 1024 < 1;
                if (!isJPG) {
                    this.$message.error('上传客房图片只能是 JPG PNG GIF 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传客房图片大小不能超过 1MB!');
                }
                return isJPG && isLt2M;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.imageUrl = ""
            },
        }
    }
</script>

<style scoped lang="scss">
    .main {
        overflow-y: auto;
        width: 100%;
        height: calc(86vh);
    }


    .form {
        width: 70%;
    }

    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        width: 200px;
        height: 160px;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 200px;
        height: 160px;
        line-height: 160px;
        text-align: center;
    }

    .avatar {
        width: 200px;
        height: 160px;
        display: block;
    }
</style>