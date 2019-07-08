import { reqAddress,reqShops,reqCategorys } from "../api";

// 包含n个间接修改状态数据的方法的对象
//不在组件中发请求，在action中发请求，一但action中包含了异步代码，就是异步action了
//因为action是通过mutation来间接修改数据的，所以在action中通过commit（）来调用mutation

//引入mutation-types.js
import {RECEIVE_ADDRESS,RECEIVE_SHOPS,RECEIVE_CATEGORYS} from './mutation-types'

export default{
    
    //定义action函数，函数名任意区，在action函数中，发请求
    async getAddress({commit,state}){//传入对象，对象中有commit方法和state数据，
        //获取参数,state数据中有longitude...
        const {longitude,latitude} = state
        //发请求
       const result = await reqAddress(longitude,latitude)
       if(result.code === 0){
           //请求超过后，可以获取想要的数据
           const address = result.data
           //通过commit提交给mutation，触发mutation调用。那就可以间接修改数据了
           //commit('mutation')
           commit(RECEIVE_ADDRESS,address)
       }

    },
   async getShops({commit,state}){

        const {longitude,latitude} = state

       const result = await reqShops({latitude,longitude})

       if(result.code === 0){

           const shops = result.data
           commit(RECEIVE_SHOPS,shops)
       }
    },
   async getCategorys({commit},callback){

        const result = await reqCategorys()
       if(result.code === 0){
            const categorys = result.data
            commit(RECEIVE_CATEGORYS,categorys)
            //数据更新后执行回调函数
            typeof callback === 'function' && callback()
       }
    },
   
}