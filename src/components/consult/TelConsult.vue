<template>
  <div class="Tel">
    <lawyer :child-lawyer="info_data"></lawyer>
    <!-- <div class="separate"></div> -->
    <mt-cell class="profession" title="选择咨询分类" :label="checkedProfession.name ? professionLabelNo : professionLabel " is-link @click.native="profession">
      <span style="color: #333" v-if="checkedProfession.name">{{ checkedProfession.name }}</span>
    </mt-cell>
    <mt-popup
      v-model="popupVisible"
      position="bottom" class="popups">
      <ul class="profession-list">
        <li class="profession-list-cell" v-for="(item, index) in profession_list" :key="index" @click.stop="checkProfession(index)">
          {{ item.name }}
        </li>
      </ul>
    </mt-popup>
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
    name:'Tel',
    components: {
      Lawyer,
      Commit,
      BusinessIntro
    },
    data(){
      return {
        popupVisible: false,
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
        info_data: {},
        profession_list: [],
        // 选中的专业
        checkedProfession: {
          name: ''
        },
        // label
        professionLabel: '为您咨询的法律问题选择合适的分类',
        professionLabelNo: ''
      }
    },
    methods:{
      checkProfession (index) {
        this.checkedProfession = this.profession_list[index]
        this.popupVisible = !this.popupVisible
      },
      profession () {
        this.popupVisible = !this.popupVisible
      },
      getLawyerList () {
        axios.get('shared/lawyer_typeList')
        .then(res => {
          res.data.result.forEach((val, index) => {
            val.children.forEach((v, i) => {
              this.profession_list.push(v)
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
      },
      prompt () {
        let data = {
          //  type 咨询的业务类型
          type: this.$route.params.businessId,
          questionPrice: this.$route.params.price,
          // 业务类型名称
          typeName: this.checkedProfession.name,
          // businessType 判断业务类型 执行方法
          businessType: this.$route.params.businessType,
          lawyerType: this.checkedProfession.code
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
            // 准备微信分享
            // this.share();
            Coms.share(this.title, this.desc, this.pic)
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
    mounted(){
      // let bd = window.localStorage.getItem('BUS_DATA')
      // bd = JSON.parse(bd)
      // if(bd){
      //   this.bus_data = bd
      // }
      this.getInfo()
      this.getLawyerList()
    }
  }
</script>
<style>
  .profession .mint-cell-wrapper{
    padding: 0.2rem 0.3rem;
    border-bottom: 1px solid #ebebeb;
    border-top: 0;
    background-image: none;
    background-size: 0;
    background-repeat: inherit;
    background-position: top left;
    background-origin: content-box;
  }
  .profession .mint-cell-text, .profession .mint-cell-label{

    font-size: 0.28rem
  }
  .profession .mint-cell-label{
    margin-top: 0.2rem;
  }
  .popups{
    width:100%;    
    padding: 0.2rem 0;
  }
  
</style>
<style scoped>
  .profession-list{
    max-height: 5.0rem;
    overflow-y: auto;
  }
  .profession-list::-webkit-scrollbar {
    display:none
  }
  .profession-list-cell{
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.32rem;
  }
  .profession-list-cell:hover, .profession-list-cell:active{
    background: #d8d8d8;
  }
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
    border-top: 1px solid #ebebeb;
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