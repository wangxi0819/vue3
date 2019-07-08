<template>
  <div class="star" :class="'star-' + size">
    <!-- c就是每个星星的类名 -->
    <span class="star-item" v-for="(c,index) in starClasses" :key="index" :class="c"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props:{
      score:Number,//评分
      size:Number //尺寸
    },
    computed:{
      //星星类名的数组
      starClasses(){//根据评分来计算得到星星类名，并将类名添加到数组中
        //获取评分
        const {score} = this
        const arr = []
        //得到分数整数的部分就是 全星的个数
        const scoreInteger = Math.floor(score) 
        //添加n个on的数组
        for(let i = 0; i < scoreInteger; i++){
          arr.push('on')
        }
        //添加0/1个half的数组,都*10，避免小数操作，如果都大于等于0.5说明有一个
        if(score*10 - scoreInteger*10 >= 5){
          arr.push('half')
        }
        //添加m个off的数组
        while(arr.length < 5){
          arr.push('off')
        }

        return arr
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
 .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
                      .star-item
                        width 10px
                        height 10px
                        margin-right 3px
                        background-size 10px 10px
                        &:last-child
                          margin-right 0
                        &.on
                          bg-image('./images/star24_on')
                        &.half
                          bg-image('./images/star24_half')
                        &.off
                          bg-image('./images/star24_off')
 
</style>

