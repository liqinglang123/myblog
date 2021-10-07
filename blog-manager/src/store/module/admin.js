// 当前登录账户模块
export default {
    // 设置为私有命名空间
    namespaced: true,
    state: {
        admin: {
            role: { username: "李晴朗" }
        }
    },
    mutations: {
        // 该方法用于对admin对象赋值
        setAdmin(state, val) {
            state.admin = val
        }
    }
}