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
    ],
    menuActive: '',
    asyncRoutes: [],//用来存放静态路由加动态路由
    isLoginActive: false,//判断登录状态
    roles: '',//保存角色
    userInfo:{},//保存个人信息
    examInfo:{},//试卷的详细信息
    token:''
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: {
  }
})
