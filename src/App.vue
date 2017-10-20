<template>
  <div id="app">
    <keep-alive>
        <router-view :key="$route.params.businessId" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      keys : 1
    }
  },
  mounted () {
    this.keys = this.$route.params.businessId ? this.$route.params.businessId : this.$route.params.questionId
  }
}
</script>

<style>
body{
  background: #fff;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #fff;
}
.separate{
  background: #f2f2f2;
  height: 0.2rem;
}
.nothing {
  text-align: center;
  padding: 0.4rem 0;
  color: #808080;
  font-size: 0.32rem;
}
.nothing p{
  margin-top: 0.2rem
}
</style>
