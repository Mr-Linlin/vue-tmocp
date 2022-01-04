import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import less from 'less'
import './assets/icon/iconfont.css'

Vue.config.productionTip = false

Vue.use(less)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
