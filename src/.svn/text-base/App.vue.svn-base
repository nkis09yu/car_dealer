<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" id="contanier"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" id="contanier"/>
    <Footer/>
  </div>
</template>
<script>
import Footer from './components/Footer'

export default {
  components: {
    Footer
  },
}
</script>
<style lang="scss">
  #app{
    height: 100%;
  }
  #contanier{
    background-color: #fff;
  }
  .van-loading__spinner--spinner i::before{
    background-color: #fff !important;
  }

</style>
