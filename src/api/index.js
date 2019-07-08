// 包含n个接口请求函数的模块，每个函数的返回值都是promise对象

import ajax from './ajax'
const BASE = '/api'
//根据经纬度获取位置详情  ajax，以对象的方式发送get请求 实参数据 传参，有顺序要求，没有名字要求
export const reqAddress= (longitude,latitude) => ajax.get(BASE + `/position/${latitude},${longitude}`)

//获取食品分类列表
export const reqCategorys= () => ajax.get(BASE + '/index_category')

//根据经纬度获取商铺列表,ajax函数的方式发送get请求。对象形式的传参，没有顺序要求（属性没有顺序），但有名字要求（属性名不乱写）
export const reqShops= ({latitude,longitude})=> ajax({
    method:'GET',
    url:BASE + '/shops',
    params:{latitude,longitude}
})
