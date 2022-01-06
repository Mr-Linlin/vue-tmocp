import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: [
      {
        path: '/',
        title: '首页',
        name: 'home',
        icon: 'el-icon-s-home'
      }
    ]
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: {
  }
})
