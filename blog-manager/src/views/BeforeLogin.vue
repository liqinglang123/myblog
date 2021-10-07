<template>
    <div class=''></div>
</template>

<script>
    export default {
        async created() {
            let username = localStorage.getItem('username')
            let password = localStorage.getItem('password')

            // 如果没有保存登录名或者密码
            if (!username || !password) {
                this.$router.push('/login')
            } else {
                let { success, token } = await this.$post('/login', {
                    username,
                    password
                })
                // 如果登录成功
                if (success) {
                    sessionStorage.setItem('token', token)
                    this.$setToken()
                    // 跳转到博客管理页面
                    this.$router.push('/layout')
                } else {
                    // 跳转到登录页
                    this.$router.push('/login')
                }
            }
        },
        data() {
            return {
            }
        },
        methods: {
        },
    }
</script>

<style scoped>

</style>