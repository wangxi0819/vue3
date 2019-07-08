//定义一个发送ajax请求的函数
import axios from 'axios'
//引入依赖包
const qs = require('qs')

/* 
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
 */

//  请求超时的全局配置
axios.defaults.timeout = 20000 
//添加请求拦截器（对post参数转化做了一个统一的处理）,请求拦截器一直传递的是config配置对象
axios.interceptors.request.use((config)=>{ //返回成功的回调函数
//要求： 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
    //从config配置对象中获取method 和data（指定post请求的参数）
    const {method,data} = config
    //判断，首先必须是post请求方式，必须携带参数，typeof null的值也是object
    if(method.toLowerCase() === 'post' && data && typeof data === 'object'){
        //解析json格式的参数为ulencode形式的字符串
        config.data= qs.stringify(data) // {name: 'tom', pwd: '123'} ==> name=tom&pwd=123
    }
    return config
})

//添加响应请求拦截器
axios.interceptors.response.use(response =>{//成功的回调
    //异步请求成功的数据不是response, 而是response.data
    return response.data
},error =>{//失败的回调
    alert('请求异常'+error.message)
    //统一处理请求异常 ,通过返回pending状态的promise对象，也就是没有指定成功/失败的回调函数，就不会进入.then
    return new Promise(()=>{}) //中断promise链
})

export default axios

//测试请求
/* axios.get('/api/test_get',{
    params:{
        name:'xiong',
        pwd:123
    }
})
axios.post('/api/test_get',{name:'xixi',pwd:445})
axios.post('/baidu/test_get',{name:'haha',pwd:666}) */