// vuex中最核心的状态管理对象
import Vue from 'vue'
import  Vuex ,{Store}  from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
//声明使用插件
Vue.use(Vuex)

//创建store对象
export default new Store({
    state,
    mutations,
    actions,
    getters

})

