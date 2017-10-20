<template>
  <div id="Business">
    <div class="business flex flex-pack-around">
      <div class="bbox flex flex-pack-around" v-for="(item, index) in sysBusiness" :key="index" @click="toConsult(item.UserID, item.Price, item.BussinessID, item.BussinessType, index)">
        <div class="flex flex-align-center link-box">
          <img v-if="!item.avatar" src="../../assets/images/icon_36.png">
          <img v-else :src="item.avatar">
            <div class="desc">
              <p>{{ item.BussinessName }}</p>
              <p>￥{{ item.Price }}</p>
            </div>
        </div>
        <div class="sp" v-if="index != (sysBusiness.length - 1)"><span></span></div>
      </div>
    </div>
    <div class="separate"></div>
  </div>
</template>

<script>
export default {
  name: 'Business',
  data () {
    return {
      sysBusiness: []
    }
  },
  props: ['childData'],
  watch: {
    childData () {
      this.sysBusiness = this.childData.AllBusinessInfo.SysBussinessInfos
    }
  },
  methods: {
    toConsult (userId, price, businessId, type, index ) {
      // 本地存储 点击咨询基础业务的详细信息
      let bus_data = this.sysBusiness[index]
      bus_data = JSON.stringify(bus_data)
      window.localStorage.setItem('BUS_DATA', bus_data)
      if (type == 0) {
        this.$router.push({ name: 'text', params: { userId: userId, price: price * 100, businessId: businessId, businessType: type } })
      } else if (type == 1) {
        this.$router.push({ name: 'tel', params: { userId: userId, price: price * 100, businessId: businessId, businessType: type } })
      } else {
        this.$router.push({ name: 'entrust', params: { userId: userId, price: price * 100, businessId: businessId, businessType: type } })
      }
    }
  }
}
</script>

<style scoped>
a{
  color:#333;
}
.business{
  padding: 0.3rem;
}
.link-box>img{
  width: 0.48rem;
  height: 0.48rem;
  margin-right: 0.2rem;
}
.sp{
  font-size: 0.4rem;
}
.desc{
  font-size: 0.24rem;
}
.desc>p:nth-child(1){
  font-size: 0.28rem;
  margin-bottom: 0.2rem
}
.sp span{
  display: block;
  width: 1px;
  height: 0.4rem;
  background: #ccc;
  margin-top: 0.16rem;
}
.bbox{
  width: 2.5rem
}
</style>
