import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import less from 'less'
import './assets/icon/iconfont.css'
import moment from 'moment'//导入文件 
import Player from "xgplayer";
moment.suppressDeprecationWarnings = true; // 关闭警告

Vue.prototype.$moment = moment;//赋值使用
Vue.prototype.$Player = Player
Vue.config.productionTip = false

Vue.use(less)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
