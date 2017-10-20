<template>
  <div id="businessIntro">
    <div class="intro">
      <div class="flex">
        <div class="title">业务名称</div>
        <div class="flex-1">{{ bus_data.BussinessName }}</div>
      </div>
      <div class="flex">
        <div class="title">业务内容</div>
        <div class="flex-1">{{ bus_data.Content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'businessIntro',
  data () {
    return {
      bus_data: {}
    }
  },
  props: ['childIntro'],
  watch: {
    childIntro () {
      this.bus_data = this.childIntro
      // console.log(this.bus_data.BussinessName +'--'+ this.bus_data.Content)
    }
  },
  mounted () {
    // let bd = window.localStorage.getItem('BUS_DATA')
    // bd = JSON.parse(bd)
    // if(bd){
    //   this.bus_data = bd
    // }
  }
}
</script>

<style scoped>
.intro{
  padding: 0 0.3rem 0.05rem;
  font-size: 0.28rem;
}
.intro>div{
  margin-bottom: 0.2rem;
  line-height: 1.5
}
.title{
  margin-right: 0.6rem;
  color: #999;
}
</style>
