<template>
    <div class='category-list'>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 95%" size="mini">
            <el-table-column label="标签ID" width="250">
                <template slot-scope="scope">
                    <span style="color: #409eff;">{{ scope.row._id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="标签名称" width="180">
                <template slot-scope="scope">
                    <el-tag type="success">{{ scope.row.name }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑抽屉 -->
        <el-drawer title="编辑标签" :visible.sync="drawer" direction="rtl" :before-close="handleClose" size="30%">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                class="demo-ruleForm" style="padding-right: 20px;">
                <el-form-item label="标签ID" prop="_id">
                    <span>{{ ruleForm._id }}</span>
                </el-form-item>
                <el-form-item label="标签名称" prop="name">
                    <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<script>
    export default {
        data() {
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入标签名称'));
                } else {
                    callback();
                }
            };
            return {
                tagName: "",
                ruleForm: {
                    _id: '',
                    name: ''
                },
                rules: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ]
                },
                drawer: false,
                tableData: [],
            }
        },
        created() {
            // 获取表格数据
            this.getTableData()
        },
        methods: {
            // 获取表格数据的方法
            async getTableData() {
                let res = await this.$get('/tag-all')
                this.tableData = res
            },
            async handleEdit(index, row) {
                this.tagName = row.name
                let _id = row._id
                let res = await this.$get('/tag-one', { _id })
                this.ruleForm = res
                this.drawer = true
            },
            async handleDelete(index, row) {
                await this.$con_f("确认删除该标签？")

                let { success, msg } = await this.$post('/tag-delete', row)

                // 确定是否删除成功
                if (success) {
                    this.$msg_s(msg)
                    this.getTableData()
                } else {
                    this.$msg_e(msg)
                }
            },
            handleClose(done) {
                this.resetForm('ruleForm')
                done()
            },
            // 表单提交
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        if (this.ruleForm.name === this.tagName) {
                            this.$msg_w('未对标签进行修改')
                            return
                        }

                        let { success, msg } = await this.$post('/tag-update', this.ruleForm)
                        // 判断是否修改成功
                        if (success) {
                            this.getTableData();
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
                this.ruleForm.name = ""
            }
        }
    }
</script>

<style scoped>

</style>