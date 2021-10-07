

export default {
    // 设置为私有命名空间
    namespaced: true,
    state: {
        information: {

        }
    },
    mutations: {
        // 用来对个人信息对象赋值
        setInformation(state, val) {
            state.information = val
        }
    }
}