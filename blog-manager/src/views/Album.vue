<template>
    <div class='albums'>
        <el-row>
            <el-button type="primary" @click="addAlbum">添加相册</el-button>
        </el-row>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 95%" size="mini">
            <el-table-column label="相册名称" width="250">
                <template slot-scope="scope">
                    <el-tag type="success">{{ scope.row.name }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="照片数量" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.pictures.length }}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否保密" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.secrecy ? "是" : "否"}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="success" @click="handleShowImg(scope.$index, scope.row)">图片</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 抽屉 -->
        <el-drawer :title="isAdd ? '添加相册' : '编辑相册'" :visible.sync="drawer" direction="rtl" size="40%">
            <div class="form" style="width : 90% ;padding: 40px 20px;">
                <el-form label-position="top" :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
                    label-width="100px" class="demo-ruleForm" size="mini">
                    <el-form-item label="相册名称" prop="name" required>
                        <el-input type="text" v-model="ruleForm.name" autocomplete="off" placeholder="填写相册名称">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="图片集" prop="secrecy">
                        <el-upload class="upload-demo" :multiple="true" ref="upload" :action="Upload_Album_URL"
                            :on-success="uploadSuccess" :on-remove="handleRemove" :file-list="fileList"
                            :auto-upload="false" :before-upload="beforeImageUpload">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">
                                上传到服务器</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="是否保密" prop="secrecy">
                        <el-switch v-model="ruleForm.secrecy" active-color="#13ce66" inactive-color="gray">
                        </el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">{{ isAdd ? '添加' : '保存' }}</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-drawer>
        <!-- 图片弹出层 -->
        <el-dialog title="相册图片" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
            <!-- 图片上传组件 -->
            <el-upload :action="Upload_Album_URL" list-type="picture-card" :file-list="fileList2"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove2" :on-success="handleImageSuccess"
                :before-upload="beforeImageUpload">
                <i class="el-icon-plus"></i>
            </el-upload>
            <!-- 图片弹出层：用于显示 大图 -->
            <el-dialog :visible.sync="dialogVisible2" append-to-body>
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-dialog>



    </div>
</template>

<script>
    import { Upload_Album_URL, BASE_URL_Img } from '../config'
    export default {
        data() {
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入相册名称'));
                } else {
                    callback();
                }
            };
            return {
                isAdd: true,
                // 查看相册的id
                album_id: '',

                tableData: [],
                drawer: false,
                fileList: [],
                fileList2: [],
                // 图片上传路径
                Upload_Album_URL,
                // 图片根路径
                BASE_URL_Img,
                // 缓存照片集
                dialogImageUrl: "",

                dialogVisible: false,
                dialogVisible2: false,

                // fileList: [],
                ruleForm: {
                    name: '',
                    pictures: [],
                    secrecy: false,
                },
                rules: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            // 获取表格数据
            this.getTableData()
            // console.log(this.Upload_Album_URL)
        },
        methods: {
            // 获取表格数据的方法
            async getTableData() {
                let res = await this.$get('/albums')
                // console.log(res)
                this.tableData = res
            },
            addAlbum() {
                // 提前重置表单
                this.resetForm('ruleForm')
                this.isAdd = true
                this.drawer = true
            },
            // 编辑相册
            async handleEdit(index, row) {
                this.isAdd = false
                // 打开抽屉
                this.drawer = true
                // 获取数据
                let res = await this.$get('/album-one', { id: row._id })
                this.ruleForm = res
                this.fileList = res.pictures.map(item => {
                    return {
                        name: item,
                        url: `${this.BASE_URL_Img}?filename=${item}`
                    }
                })
            },
            // 删除相册
            async handleDelete(index, row) {
                await this.$con_f("确认删除该相册？")
                let { success, msg } = await this.$get('/album-delete', { id: row._id })
                if (success) {
                    this.$msg_s(msg)
                    this.getTableData()
                } else {
                    this.$msg_e(msg)
                }
            },
            // 图片集显示
            async handleShowImg(index, row) {
                this.fileList2 = []
                this.dialogVisible = true
                let id = row._id
                this.album_id = row._id
                // console.log(id)
                // 查找相册集
                let res = await this.$get('/album-one', { id })
                // console.log(res)
                this.fileList2 = res.pictures.map(item => {
                    return {
                        name: item,
                        url: `${this.BASE_URL_Img}?filename=${item}`
                    }
                })
                // console.log(this.fileList2)
            },
            // 上传
            submitUpload() {
                this.$refs.upload.submit();
            },
            // 创建相册时的删除图片函数
            handleRemove(file, fileList) {
                // console.log('删除了', fileList)
                this.fileList = fileList
            },
            // 中途删除相册图片函数
            async handleRemove2(file, fileList) {
                console.log('删除了', fileList)
                // 根据后端只提取照片的名字保存
                let pictures = fileList.map(item => {
                    return item.name
                })
                let { success, msg } = await this.$post('/album-update', {
                    id: this.album_id,
                    pictures
                })

                // 判断更新是否成功
                if (success) {
                    this.getTableData()
                    this.$msg_s(msg)
                } else {
                    this.$msg_e(msg)
                }

            },
            // 上传成功时（新建编辑相册)
            uploadSuccess(response, file, fileList) {
                // console.log('添加了', fileList)
                this.fileList = fileList
            },
            // 预览
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible2 = true;
            },
            // 上传成功
            async handleImageSuccess(res, file, fileList) {
                let { success } = res
                // 表示头像上传成功
                if (success) {
                    // 上传成功后的图片名称数组
                    let pictures = fileList.map(item => {
                        return item.name
                    })
                    // 发送请求更改数组
                    let { success, msg } = await this.$post('/album-update', {
                        id: this.album_id,
                        pictures
                    })

                    // 判断更新是否成功
                    if (success) {
                        this.getTableData()
                        this.$msg_s(msg)
                    } else {
                        this.$msg_e(msg)
                    }
                }
            },
            // 上传之前
            beforeImageUpload(file) {
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
            handleClose(done) {
                // this.resetForm('ruleForm')
                done()
            },
            // 表单提交
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        console.log('提交了', this.fileList)
                        // 先把相册数组清空
                        this.ruleForm.pictures = []
                        // 将照片名字提取
                        this.fileList.forEach(item => {
                            this.ruleForm.pictures.push(item.name)
                        })
                        let path = this.isAdd ? '/album-add' : '/album-update'
                        let { success, msg } = await this.$post(path, this.ruleForm)

                        if (success) {
                            this.getTableData()
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
            // 重置表单
            resetForm(formName) {
                this.ruleForm = {
                    name: '',
                    pictures: [],
                    secrecy: false,
                }
                this.fileList = []
            }
        }
    }
</script>

<style scoped>

</style>