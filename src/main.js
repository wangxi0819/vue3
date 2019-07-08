// 放在入口文件的模块，都会被打包
import Vue from 'vue'
import App from './App'
import router from './router'
import Header from './components/Header/Header'
import ajax from './api/ajax'  
import store from './vuex/store'
import Star from './components/Star/Star.vue'

//注册全局组件,到处都可以用
Vue.component('Header',Header)
Vue.component('Star',Star)


new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,//配置store对象,才能用store
})