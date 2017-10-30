<template>
  <div id="LawyerPersonBusiness">
    <div class="lawyerpersonbusiness">
      <div class="first flex">
        <div class="title">个人业务</div>
        <div class="info3 flex flex-1 flex-align-center">
          <span v-if="childData.first_profession">{{ childData.first_profession }}</span>
          <span v-if="childData.second_profession">{{ childData.second_profession }}</span>
          <span v-if="childData.profession3">{{ childData.profession3 }}</span>
        </div>
      </div>
      <div class="second flex align-center">
          <div class="customBusiness" v-for="(item, index) in customBusiness" :key='index' @click="toBusiness(item.UserID, item.Price, item.BussinessID, item.BussinessType, index)">
            <div class="money">{{ item.Price }}元</div>
            <!-- <img src="../../assets/images/icon_27.png"> -->
            <img :src="item.Icon">
            <div class="desc">
              {{ item.BussinessName }}
            </div>
          </div>
      </div>
    </div>
    <div class="separate"></div>
  </div>
</template>

<script>
export default {
  name: 'LawyerPersonBusiness',
  data () {
    return {
      customBusiness: []
    }
  },
  props: ['childData'],
  watch: {
    childData () {
      this.customBusiness = this.childData.AllBusinessInfo.BussinessInfos
    }
  },
  methods: {
    // BussinessType type 枚举： 0 图文咨询 1 电话咨询 2 法律事务
    toBusiness (userId, price, businessId, type, index) {
      // 本地存储 点击咨询自定义业务的详细信息
      let bus_data = this.customBusiness[index]
      bus_data = JSON.stringify(bus_data)
      window.localStorage.setItem('BUS_DATA', bus_data)
      window.localStorage.setItem('PRICE', price)
      if (type == 0) {
        this.$router.push({ name: 'customtext', params: { userId: userId, price: price * 100, businessId: businessId, businessType: type }})
      } else if (type == 1) {
        this.$router.push({ name: 'customtel', params: { userId: userId, price: price * 100, businessId: businessId, businessType: type }})
      } else {
        this.$router.push({ name: 'customentrust', params: { userId: userId, price: price * 100, businessId: businessId, businessType: type }})
      }
    }
  }
}
</script>

<style scoped>
#aLawyerPersonBusiness{}
.lawyerpersonbusiness{

}
.first{
  height: 0.9rem;
  padding: 0 0.3rem;
  border-bottom: 1px solid #EFEFEF;
}
.title{
  font-size: 0.32rem;
  color:#000;
  font-weight: bold;
  line-height: 0.9rem;
  margin-right: 0.2rem;
}
.info3 span{
  min-width: 1.3rem;
  height: 0.44rem;
  line-height: 0.44rem;
  color: #757575;
  background-color: #f2f2f2;
  border-radius: 0.06rem;
  margin-right: 0.20rem;
  text-align: center;
  font-size: 0.24rem;
  padding: 0 0.1rem;
}
.second{
  width: 7.5rem;
  flex-wrap: wrap;
}
.customBusiness{
  width:33%;
  border: 1px solid #EFEFEF;
  border-left: 0;
  padding-bottom: 0.15rem;
  border-top: 0;
}
div.customBusiness:nth-child(3n){
  border-right: 0;
}
.customBusiness>img{
  width: 0.8rem;
  height: 0.8rem;
  margin: 0.1rem 0;
}
.money{
  padding: 0.15rem 0.1rem 0;
  text-align: right;
  font-size: 0.24rem;
  color: #f58144;
}
.desc{
  max-width: 1.6rem;
  margin: auto;
  font-size: 0.24rem;
  line-height: 1.4;
}
</style>
