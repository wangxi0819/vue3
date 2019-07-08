//直接修改状态数据
//引入
import {RECEIVE_ADDRESS,RECEIVE_SHOPS,RECEIVE_CATEGORYS} from './mutation-types'

export default{
    //定义mutation函数
    [RECEIVE_ADDRESS](state,address){
        //直接修改数据
        state.address = address
    },
    //
    [RECEIVE_SHOPS](state,shops){
        //直接修改数据
        state.shops = shops
    },
    //
    [RECEIVE_CATEGORYS](state,categorys){
        //直接修改数据
        state.categorys = categorys
    }
    
}