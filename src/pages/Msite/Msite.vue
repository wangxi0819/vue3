<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name || '正在定位中'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- categorysArr -->
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList/>
  </section>
</template>
<script type="text/ecmascript-6">
//注册局部组件
import ShopList from '../../components/ShopList/ShopList'
import Swiper from 'swiper'
import "swiper/dist/css/swiper.css"
import { mapState } from 'vuex'


  export default {
    computed:{
      
      ...mapState(['address','categorys']), //从state中获取到address数据

      //根据现有数据categorys(一维数组)，计算得到需要的二维数组
      //一维数组的最大长度是8
      categorysArr(){ 
        //定义一位数组和二维数组为空
        const bigArr = []
        let smallArr = [] //let定义变量
        //获取现有的数据（一维数组）
        const {categorys} = this  //this是当前组件，因为当前组件就有categorys
        categorys.forEach(c =>{
           //生成二位数组（同一个小数组只能被保存一次）
           if(smallArr.length === 0){ 
               bigArr.push(smallArr)
           }
         
         //一维数组的最大长度是8
          smallArr.push(c)
          if(smallArr.length === 8){//一旦等于八，就再创建一个空的数组，把c放在另一个空的数组中
            smallArr = []
          }
          

        })
       

        //返回结果
        return bigArr
      }

    
    },
    
   async mounted(){

       //在父组件分发action，??为什么发在下面不行？
       this.$store.dispatch('getShops')
        
        //方法三
        await this.$store.dispatch('getCategorys') //返回promise结果，说明数据状态更新且界面更新了
        //状态更新且界面更新后new Swiper,轮播才有效果
         new Swiper('.swiper-container', {
                // direction: 'vertical', // 垂直切换选项
                loop: true, // 循环模式选项
        
                // 如果需要分页器
                pagination: {
                  el: '.swiper-pagination',
                }
            }) 
        //方法二
      // this.$store.dispatch("getCategorys",()=>{
      //   this.$nextTick(()=>{//$nextTick是实例对象的方法，组件（this）也可以用
      //     ///为什么去掉var mySwiper？
      //          new Swiper('.swiper-container', {
      //           // direction: 'vertical', // 垂直切换选项
      //           loop: true, // 循环模式选项
        
      //           // 如果需要分页器
      //           pagination: {
      //             el: '.swiper-pagination',
      //           }
      //       }) 
      //     })
      // })
     
      

      /* //创建对象的时机，是在列表显示之后，所以放在mounted异步函数（初始化异步显示）
       var mySwiper = new Swiper('.swiper-container', {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
    
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
        }) */
        
       

    },
     /* 
    解决创建swiper对象之后不能正常轮播
    原因: 创建对象的时机太早(必须在列表显示之后)
    解决: 
      1. watch + nextTick()  //watch监视数据变了，nextTick监视界面是否变了
      2. callback + nextTick()
      3. 利用dispatch()返回的promise
    */

    /* watch:{//监视属性categorys属性的变化
      //更新数据后=》调用监视的回调函数=》异步更新界面（在界面更新后执行$nextTick中的回调函数
      
     
      categorys(){//这个函数属于监视的回调函数

          this.$nextTick(()=>{//$nextTick是实例对象的方法，组件（this）也可以用
          ///为什么去掉var mySwiper？
               new Swiper('.swiper-container', {
                // direction: 'vertical', // 垂直切换选项
                loop: true, // 循环模式选项
        
                // 如果需要分页器
                pagination: {
                  el: '.swiper-pagination',
                }
            }) 
          })

      }

    }, */

    components: {
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
  .msite  
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>
