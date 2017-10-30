<template>
  <div id="lawyerHeader">
    <div class="first flex flex-align-center">
      <img class="avatar" v-if="!childData.avatar" src="../../assets/images/9.png">
      <img class="avatar" v-else :src="childData.avatar">
      <div class="info flex-1">
        <div class="info-div1">
          <span class="name">{{ childData.lawyer_name }}</span>&nbsp;&nbsp;<span>{{ childData.city_name }}</span>&nbsp;<span>|</span>&nbsp;<span>{{ childData.experience_years }}年</span>
        </div>
        <div class="info-div2">
          律所:&nbsp;&nbsp;<span>{{ childData.company_name }}</span>
        </div>
      </div>
      <div class="collect"  @click="guideShow">
        <img src="../../assets/images/icon_10.png">
        <div>收藏</div>
      </div>
      <div class="collect-guide" v-show="showGuide" @click.self="guideHide">
        <img class="img1" src="../../assets/images/h52.png">
        <img class="img2" src="../../assets/images/h51.png">
      </div>
    </div>
    <div class="second flex">
      <div class="second-div1"><span>已认证</span></div>
      <div class="second-div2 flex-1" v-show="!introShow" @click="introShow=!introShow">展开简介&nbsp;<i></i></div>
      <div class="placeholder"></div>
    </div>
    <el-collapse-transition>
      <div class="intro" v-show="introShow">
        <div class="intro-count flex flex-pack-justify">
          <div class="box1 flex">
            <p>{{ childData.ViewCount | ChangeNum }}</p>
            <p>&nbsp;&nbsp;热度</p>
          </div>
          <div class="box-line">
            <span></span>
          </div>
          <div class="box5 flex">
            <p>{{ childData.CompleteOrderCount | ChangeNum }}</p>
            <p>&nbsp;&nbsp;服务</p>
          </div>
          <div class="box-line">
            <span></span>
          </div>
          <div class="box2 flex">
            <p>{{ childData.FavoriteCount | ChangeNum }}</p>
            <p>&nbsp;&nbsp;收藏</p>
          </div>
        </div>
        <div class="intro-con">
          <div class="intro-title">简介</div>
          <div class="intro-content" v-if="childData.description" v-html="childData.description"></div>
          <div class="intro-content" v-else>暂无简介</div>
          <div class="intro-close" @click="introShow=!introShow">
            收起简介&nbsp;<i></i>
          </div>
        </div>
      </div>
    </el-collapse-transition>
    <div class="third" v-if="honor">
      <div class="flex" v-for="(item, index) in honor" :key="index">
        <img src="../../assets/images/6.png">
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  Vue.filter('ChangeNum',function(num){
    var val = ''
    if(num>=10000){
      num = num/10000;
      val = num.toFixed(1)+'万';
    }else{
      val = num
    }
    return val
  })
  Vue.filter('Percent',function(num){
    var val = num.toFixed(2) * 100 + '%'
    return val
  })
export default {
  name: 'lawyerHeader',
  data () {
    return {
      introShow: false,
      // 荣誉
      honor: '',
      showGuide: false
    }
  },
  props: ['childData'],
  methods: {
    guideShow () {
      this.showGuide = true
    },
    guideHide () {
      this.showGuide = false
    }
  },
  watch: {
    childData () {
      if(this.childData.award_winning){
        this.honor = this.childData.award_winning.split(';')
      }
    }
  }
}
</script>

<style scoped>
#lawyerHeader{
  padding-top: 0.4rem;
}
.first{
  margin-bottom: 0.2rem;
  padding: 0 0.3rem;
}
.second{
  margin-bottom: 0.3rem;
  padding: 0 0.3rem;
}
.third{
  padding:0.3rem 0;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  box-shadow: 0 0 2px rgba(25,119,225,0.3);
}
.avatar{
  width: 1.4rem;
  height: 1.4rem;
  border-radius: .06rem;
}
.collect img{
  width: 0.48rem;
  height: 0.48rem;
  margin-bottom: 0.22rem;
}
.collect{
  text-align: center;
}
.info{
  margin-left: 0.4rem;
}
.info-div1{
  margin-bottom: 0.2rem;
  color: #999;
  font-size: 0.24rem;
}
.info-div2{
  font-size: 0.28rem;
}
.name{
  font-size: 0.32rem;
  font-weight: bold;
  color: #000;
}
.second-div1{
  width: 1.4rem;
}
.second-div1 span{
  display: block;
  width: 1.0rem;
  margin: 0 auto;
  font-size: 0.24rem;
  background: #ffbb2a;
  border-radius: 0.04rem;
  height: 0.34rem;
  line-height: 0.38rem;
  color: #fff;
  text-align: center;
}
.second-div2{
  font-size: 0.24rem;
  color: #999;
  height: 0.34rem;
  line-height: 0.38rem;
  text-align: center;
}
.second-div2 i{
  display: inline-block;
  width: 0.28rem;
  height: 0.15rem;
  background: url(../../assets/images/icon_03.png) no-repeat;
  background-size: cover;
}
.placeholder{
  width: 0.6rem;
  height: 0.34rem;
}
.third img{
  width: 0.26rem;
  height: 0.30rem;
  margin-right: 0.2rem;
  margin-left: 0.2rem;
}
.third>div{
  margin-bottom: 0.2rem;
  font-size: 0.28rem;
}
.box-line>span{
  display: inline-block;
  height: 0.4rem;
  width: 1px;
  margin-top: 0.1rem;
  background-color: #ccc;
}
.intro-count{
  font-size: 0.24rem;
  color: #333;
  padding: 0 0.3rem;
  line-height: 0.6rem;
}
.intro-count>div>p:nth-child(1){
  font-size: 0.28rem;
  font-weight: bold;
}
.intro-con{
  padding: 0 0.3rem 0.35rem;
}
.intro-content{
  line-height: 1.6;
  font-size: 0.28rem;
  color: #333;
}
.intro-title{
  font-size: 0.32rem;
  color: #333;
  padding: 0.15rem 0 0.3rem;
}
.intro-close{
  text-align: center;
  margin-top: 0.3rem;
}
.intro-close i{
  display: inline-block;
  width: 0.28rem;
  height: 0.15rem;
  background: url(../../assets/images/icon_04.png) no-repeat;
  background-size: cover;
}
.collect-guide{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 999;
  padding: 0.4rem 0.3rem 0.3rem 0.3rem;
}
.img1{
  width: 2.98rem;
  height: 2.79rem;
  float: right;
  margin-bottom: 0.6rem;
  padding-right: 0.3rem;
}
.img2{
  width: 6.90rem;
  height: 6.17rem
}
</style>
