<template>
  <div class="Entrust">
    <lawyer :child-lawyer="info_data"></lawyer>
    <!-- <div class="separate"></div> -->
    <div class="part1">
      <div class="entrust-title">您的法律需求</div>
      <textarea name="" id="textarea" cols="" rows="" placeholder='填写需要律师完成的事务，例如：各类协议/合同的代写审核，其他事务委托；以及简要的要求' v-model='content'></textarea>
    </div>
    <commit></commit>
    <div class="part3">
      <a href="javascript:;" @click="prompt">
        立即咨询[￥{{ $route.params.price / 100 }}元]
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
    name:'Entrust',
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
      prompt () {
        let data = {
          // type 判断类型 执行方法
          type: this.$route.params.businessId,
          content: this.content,
          questionPrice: this.$route.params.price,
          typeName: '法律事务',
          businessType: this.$route.params.businessType
        }
        this.$emit('parentMsg', data)
      },
      getInfo () {
        axios.get('lawyer/get_info_one/'+ this.$route.params.userId )
        .then(res => {
          let r = res.data
          if(r.isSuc){
            this.info_data = r.result
            // 遍历业务列表 进行匹配
            if (r.result.AllBusinessInfo.SysBussinessInfos) {
              r.result.AllBusinessInfo.SysBussinessInfos.forEach((val, index) => {
                if (val.BussinessID == this.$route.params.businessId ) {
                  window.localStorage.setItem('PRICE', val.Price)
                } 
              })
            }
            // 本地保存数据
            let dt = JSON.stringify(r.result)
            window.localStorage.setItem('LAWYER_DATA', dt)
            let good = new Array(3)
            good[0] = r.result.first_profession
            good[1] = r.result.second_profession
            good[2] = r.result.profession3
            good = good.join('、')
            this.title = '【律师说】为您推荐'+r.result.lawyer_name+'律师'
            this.desc = '执业于'+r.result.company_name+'，擅长'+good+'领域'
            if(r.result.avatar){
              this.pic = r.result.avatar
            }else{
              this.pic = ''
            }
            // 动态更换title
            var head = document.getElementsByTagName('head')[0];
            document.title = r.result.lawyer_name+'律师的微网站'
            // hack在微信等webview中无法修改document.title的情况
            var  iframe = document.createElement('iframe');
            head.appendChild(iframe);
            iframe.addEventListener('load',function(){
              setTimeout(function() {
                 iframe.removeEventListener('load');
                 head.removeChild(iframe)
              },0)
            },false)
            // 整理数据
            // let lawyerHeader = {
            //   city_name
            // }
            // 准备微信分享
            // this.share();
            Coms.share(this.title, this.desc, this.pic);
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    created () {
      Indicator.open()
    },
    mounted () {
      // let bd = window.localStorage.getItem('BUS_DATA')
      // bd = JSON.parse(bd)
      // if(bd){
      //   this.bus_data = bd
      // }
      this.getInfo()
    }
  }
</script>

<style scoped>
  
  .Entrust{
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
  .entrust-title{
    padding:0 0 0.3rem;
    font-size: 0.28rem;
    color:#333;
  }
</style>