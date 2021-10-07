import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 导入当前登录用户模块
import admin from './module/admin'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    admin
  }
})
