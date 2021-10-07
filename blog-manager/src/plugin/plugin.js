import { get, post, setToken } from "../utils/request";

// 自定义插件
export default {
    install: function (Vue) {
        // 给vue混入成员
        Vue.mixin({
            methods: {
                $get(url, params) {
                    return get(url, params)
                },
                $post(url, params) {
                    return post(url, params)
                },
                $setToken() {
                    setToken()
                },
                // 成功消息框
                $msg_s(message, duration = 3000) {
                    this.$message({
                        // 显示关闭图标
                        showClose: true,
                        message,
                        type: 'success',
                        duration
                    })
                },
                // 警告消息框
                $msg_w(message, duration = 3000) {
                    this.$message({
                        // 显示关闭图标
                        showClose: true,
                        message,
                        type: 'warning',
                        duration
                    })
                },
                // 错误消息框
                $msg_e(message, duration = 3000) {
                    this.$message({
                        // 显示关闭图标
                        showClose: true,
                        message,
                        type: 'error',
                        duration
                    })
                },
                // 确认消息框
                $con_f(message) {
                    return new Promise((resolve, reject) => {
                        this.$confirm(message)
                            .then(_ => {
                                resolve()
                            })
                            .catch(_ => {
                                reject()
                            });
                    })
                }
            }
        })
    }



}