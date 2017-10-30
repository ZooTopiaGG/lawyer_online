<template>
  <div id="Home">
    <lawyer-header :child-data="homeData"></lawyer-header>
    <lawyer-business :child-data="homeData"></lawyer-business>
    <lawyer-person-business :child-data="homeData"></lawyer-person-business>
    <lawyer-tab-container></lawyer-tab-container>
  </div>
</template>

<script>
import LawyerHeader from './LawyerHeader.vue'
import LawyerBusiness from './LawyerBusiness.vue'
import LawyerPersonBusiness from './LawyerPersonBusiness.vue'
import LawyerTabContainer from './LawyerTabContainer.vue'
export default {
  name: 'Home',
  data () {
    return {
      // 律师基本信息
      lawyerHeader: {},
      // 律师基础业务
      lawyerBusiness: {},
      // 律师个人业务
      lawyerPersonBusiness: {},
      // 律师解答评论
      lawyerTabContainer: {},
      // home 数据
      homeData: {},
      // 分享标题 内容 图片
      title:'',
      desc:'',
      pic:''
    }
  },
  components: {
    LawyerHeader,
    LawyerBusiness,
    LawyerPersonBusiness,
    LawyerTabContainer
  },
  methods: {
    getInfo () {
      Indicator.open()
      axios.get('lawyer/get_info_one/'+ this.$route.params.userId )
      .then(res => {
        let r = res.data
        if(r.isSuc){
          this.homeData = r.result
          // vuex 保存数据
          this.$store.dispatch('LAWYER_DATA',r.result)
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
          var iframe = document.createElement('iframe');
          // <link rel="shortcut icon" href="Images/wangyi.ico" type="image/x-icon" />
          var link = document.createElement('link');
          link.setAttribute('rel', 'shortcut icon');
          link.setAttribute('href', r.result.avatar);
          link.setAttribute('type', 'image/x-icon');
          head.appendChild(iframe);
          head.appendChild(link);
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
          //准备微信分享
          Coms.share(this.title, this.desc, this.pic);
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  create () {
  },
  mounted () {
    this.getInfo()
  }
}
</script>

<style>
</style>
