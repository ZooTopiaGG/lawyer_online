<template>
  <div class="Tel">
    <lawyer :child-lawyer="info_data"></lawyer>
    <business-intro :child-intro="bus_data"></business-intro>
    <div class="separate"></div>
    <commit></commit>
    <div class="part3">
      <a href="javascript:;" @click="prompt">
        立即支付[￥{{ $route.params.price / 100 }}元]
      </a>
    </div>
    <!-- <div class="prompt">律师说服务保障，不满意全额退款（？？？）</div> -->
  </div>
</template>

<script>
  import Lawyer from './Lawyer.vue'
  import Commit from './Commit.vue'
  import BusinessIntro from './BusinessIntro.vue'
  
  export default{
    name:'Tel',
    components: {
      Lawyer,
      Commit,
      BusinessIntro
    },
    data(){
      return {
        questionPrice:'',
        content:'',
        id:'',
        payType:'',
        caseid:'',
        qid:'',
        title: '',
        desc: '',
        pic: '',
        bus_data: {},
        info_data: {}
      }
    },
    methods:{
      getInfo () {
        return axios.get('lawyer/get_info_one/'+ this.$route.params.userId )
      },
      getBusinessById () {
        return axios.get('lawyer/GetBussinessByID/'+ this.$route.params.businessId )
      },
      prompt () {
        let data = {
          // type 判断类型 执行方法
          type: this.$route.params.businessId,
          questionPrice: this.$route.params.price,
          typeName: this.bus_data.BussinessName,
          businessType: this.bus_data.BussinessType,
          lawyerType: 900
        }
        this.$emit('parentMsg', data)
      }
    },
    created () {
      Indicator.open()
    },
    mounted(){
      // let bd = window.localStorage.getItem('BUS_DATA')
      // bd = JSON.parse(bd)
      // if(bd){
      //   this.bus_data = bd
      // }
      var self = this
      axios.all([ this.getInfo(), this.getBusinessById()])
        .then(axios.spread(function (acct, perms) {
        //两个请求现已完成
        let racct = acct.data
        if (racct.isSuc) {
          // 不能用this 
          self.info_data = racct.result
          // 遍历自定义业务列表 进行匹配
          if (racct.result.AllBusinessInfo.BussinessInfos) {
            racct.result.AllBusinessInfo.BussinessInfos.forEach((val, index) => {
              if (val.BussinessID == self.$route.params.businessId ) {
                window.localStorage.setItem('PRICE', val.Price)
              } 
            })
          }
          // 本地保存数据
          // let dt = JSON.stringify(racct.result)
          // window.localStorage.setItem('LAWYER_DATA', dt)
          let good = new Array(3)
          good[0] = racct.result.first_profession
          good[1] = racct.result.second_profession
          good[2] = racct.result.profession3
          good = good.join('、')
          self.title = '【律师说】为您推荐'+racct.result.lawyer_name+'律师'
          self.desc = '执业于'+racct.result.company_name+'，擅长'+good+'领域'
          if(racct.result.avatar){
            self.pic = racct.result.avatar
          }else{
            self.pic = ''
          }
          // 动态更换title
          var head = document.getElementsByTagName('head')[0];
          document.title = racct.result.lawyer_name+'律师的微网站'
          // hack在微信等webview中无法修改document.title的情况
          var  iframe = document.createElement('iframe');
          head.appendChild(iframe);
          iframe.addEventListener('load',function(){
            setTimeout(function() {
               iframe.removeEventListener('load');
               head.removeChild(iframe)
            },0)
          },false)
          // 准备微信分享
          // self.share();
          Coms.share(self.title, self.desc, self.pic);
        } else {
          Toast(racct.message)
        }
        if (perms.data.isSuc) {
          self.bus_data = perms.data.result
        } else {
          Toast(perms.data.message)
          self.$router.push({ path: '/', params: { userId: self.$route.params.userId } })
        }
      })) 
    },
  }
</script>

<style scoped>
  
  .Tel{
    background: #fff
  }
  .part1{
    padding: 0.4rem 0.3rem 0;
    border-bottom: 1px solid #ebebeb;
  }
  #textarea{
    width: 6.5rem;
    min-height: 3.38rem;
    border: 0;
    outline: none;
    border-top: 1px solid rgba(0,0,0,0.15);
    padding: 0.28rem 0.2rem;
    background: #f5f5f5;
    font-size: 0.28rem;
    color: #333;
    margin-bottom: 0.3rem;
    border-radius: 0;
  }
  .pro{
    margin-bottom: 0.3rem;
    font-size: 0.28rem;
    color: #333;
  }
  .price{
    color: #f58144;
  }
  .pro-two{
    color: #999;
    font-size: 0.24rem;
    margin-top: 0.14rem;
  }
  .part3{
    padding: 0 0.3rem;
    margin-top: 0.5rem;
  }
  .part3 a{
    display: block;
    height: 0.88rem;
    background: #1675E1;
    border-radius: 0.06rem;
    line-height: 0.88rem;
    text-align: center;
    color: #fff;
    font-size: 0.36rem;
    margin-bottom: 0.2rem;
  }
  .num{
    color: #999;
    font-size: 0.28rem;
    text-align: center;
  }
  .num span{
    color: #F58144;
  }
  .prompt{
    font-size: 0.28rem;
    color: #999;
    padding: 0.2rem 0 0.4rem;
    text-align: center;
  }
</style>