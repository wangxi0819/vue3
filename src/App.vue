<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-if="$route.meta.isShowFooter"/>
  </div>
</template>     
<script type="text/ecmascript-6">
import FooterGuide from './components/FooterGuide/FooterGuide.vue';
  export default {
    name:"App",
    data(){
      return {
        msg:"App"
      }
    },
    async mounted(){
      //分发action，从后台获取数据存到state中，通过this.$state.dispatch()触发action函数的调用
      this.$store.dispatch('getAddress')
    },
    components:{
      FooterGuide
    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
