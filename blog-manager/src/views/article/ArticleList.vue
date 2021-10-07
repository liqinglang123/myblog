<template>
    <div class='category-list'>
        <!-- 搜索区域 -->
        <div class="search" style="margin-bottom: 30px;">
            <label style="color: #666; font-size: 12px;">文章类型：</label>
            <el-select size="mini" v-model="category2" placeholder="请选择类型" clearable style="margin-right: 10px">
                <el-option v-for="item in categoryList" :key="item._id" :label="item.name" :value="item._id">
                </el-option>
            </el-select>
            <label style="color: #666; font-size: 12px">文章标签：</label>
            <el-select v-model="tags2" multiple placeholder="请选择文章标签" size="mini">
                <el-option v-for="item in tagList" :key="item._id" :label="item.name" :value="item._id">
                </el-option>
            </el-select>
            <el-button size="mini" type="success" @click="searchClick" style="margin-left: 15px;">查询</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 95%" size="mini">
            <el-table-column label="文章标题" width="180">
                <template slot-scope="scope">
                    <span style="color: #303133;font-weight: bold;">{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="作者" width="120">
                <template slot-scope="scope">
                    <span style="color: #303133;font-weight: bold;">{{ scope.row.author }}</span>
                </template>
            </el-table-column>
            <el-table-column label="文章分类" width="120">
                <template slot-scope="scope">
                    <span style="color: #303133;font-weight: bold;">{{ scope.row.category.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="标签个数" width="120">
                <template slot-scope="scope">
                    <span style="color: #303133;font-weight: bold;">{{ scope.row.tags.length}}</span>
                </template>
            </el-table-column>
            <el-table-column label="阅读量" width="120">
                <template slot-scope="scope">
                    <span style="color: #303133;font-weight: bold;">{{ scope.row.readcount}}</span>
                </template>
            </el-table-column>

            <el-table-column label="创建时间" width="200">
                <template slot-scope="scope">
                    <span style="color: #303133;font-weight: bold;">{{ scope.row.createdAt | formatDate }}</span>
                </template>
            </el-table-column>

            <el-table-column label="上次更新时间" width="200">
                <template slot-scope="scope">
                    <span style="color: #303133;font-weight: bold;">{{ scope.row.updatedAt | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination" style="margin-top: 5px">
            <el-pagination background layout="prev, pager, next" :total="count" :page-size="size"
                @current-change="currentChange">
            </el-pagination>
        </div>
        <!-- 编辑抽屉 -->
        <el-drawer title="编辑文章" :visible.sync="drawer" direction="rtl" :before-close="handleClose" size="60%">
            <div class="form" style="margin: 20px;">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px"
                    class="demo-ruleForm" size="mini">
                    <el-form-item label="文章标题" prop="title">
                        <el-input type="text" v-model="ruleForm.title" autocomplete="off" placeholder="请在此输入文章标题">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="文章分类" prop="category">
                        <el-select v-model="ruleForm.category" clearable placeholder="请选择文章分类">
                            <el-option v-for="item in categoryList" :key="item._id" :label="item.name"
                                :value="item._id">
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
                    <!-- 富文本编辑器 -->
                    <el-form-item label="文章详情" prop="body">
                        <quill-editor class="ql-editor" v-model="ruleForm.body" ref="myQuillEditor">
                        </quill-editor>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import { Upload_Album_URL, BASE_URL_Img } from '@/config'
    import { getYMDHMS } from '@/utils/date'
    export default {
        created() {
            // 获取表格数据
            this.getTableData();
            // 获取分类列表
            this.getCategoryList();
            // 获取标签列表
            this.getTagList();
        },
        data() {
            var validateTitle = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入文章名称'));
                } else {
                    callback();
                }
            };
            var validateCategory = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择文章分类'));
                } else {
                    callback();
                }
            };
            return {
                // 分类列表
                categoryList: [],
                // 标签列表
                tagList: [],
                Upload_Album_URL,

                // 数据总数量
                count: 0,
                // 当前页码
                pageIndex: 1,
                size: 6,

                // 用于搜索
                category2: "",
                tags2: [],
                imageUrl: '',
                ruleForm: {
                    title: '',
                    category: '',
                    tags: [],
                    cover: '',
                    body: "",
                },
                rules: {
                    title: [{ validator: validateTitle, trigger: 'blur' }],
                    category: [{ validator: validateCategory, trigger: 'blur' }]
                },
                drawer: false,
                tableData: [],
                originaldata: []
            }
        },
        computed: {
            convertTime() {
                return function (str) {
                    return getYMDHMS(str)
                }
            }
        },
        filters: {
            // 格式化时间
            formatDate(str) {
                return getYMDHMS(str)
            }
        },
        methods: {
            // 获取表格数据的方法
            async getTableData() {
                let result = await this.$post('/article-all', {
                    category: this.category2,
                    tags: this.tags2,
                })
                // console.log('----------请求完了---------------')
                // consovsle.log(res)
                this.count = result.length
                console.log(this.count)
                this.originaldata = result
                this.pagination(1)
            },

            // 搜索方法
            async searchClick() {
                this.getTableData()
            },

            // 分页函数
            pagination(pageindex) {
                let start = (pageindex - 1) * this.size
                let end = start + this.size
                this.tableData = this.originaldata.slice(start, end)
            },

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
            async handleEdit(index, row) {
                let _id = row._id
                let res = await this.$get('/article-one', { _id })
                // this.imageUrl = BASE_URL_Img + res.cover
                this.imageUrl = `${BASE_URL_Img}?filename=${res.cover}`
                // console.log(res)
                this.ruleForm = res
                this.drawer = true
            },
            async handleDelete(index, row) {
                await this.$con_f("确认删除该文章？")

                let { success, msg } = await this.$post('/article-delete', { _id: row._id })

                // 确定是否删除成功
                if (success) {
                    this.$msg_s(msg)
                    this.getTableData()
                } else {
                    this.$msg_e(msg)
                }
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
            // 分页方法
            currentChange(pageIndex) {
                // 设置当前页
                this.pageIndex = pageIndex;
                // 重新调用获取表格的方法
                this.pagination(pageIndex)
            },
            handleClose(done) {
                this.resetForm('ruleForm')
                done()
            },
            // 表单提交
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let { success, msg } = await this.$post('/article-update', this.ruleForm)
                        // 判断是否修改成功
                        if (success) {
                            this.getTableData();
                            this.resetForm('ruleForm')
                            this.$msg_s(msg)
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
                this.ruleForm = {
                    title: '',
                    category: '',
                    tags: [],
                    body: "",
                    imageUrl: ''
                }
            }
        }
    }
</script>

<style scoped>
    .pagination {
        display: flex;
        justify-content: center;
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