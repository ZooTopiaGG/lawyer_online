<template>
  <div id="info">
   <div class="part2">
      <div class="name">
        <input type="text" name="username" id="username" value="" placeholder="填写您的称谓[例：李先生/陈女士]" v-model='username'/>
      </div>
      <div class="tel">
        <input type="tel" name="tel" id="tel" value="" placeholder="输入手机号" v-model='tel'/>
      </div>
      <div class="code flex flex-1 flex-pack-justify">
        <input type="tel" name="code" id="code" value="" placeholder="输入验证码" v-model='code'/>
        <input type="button" name="getcode" id="getcode" :value="msg" @click="getCode" :class="{codeStatus:codeStatus,getcode:true}" :disabled="disabled"/>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui'
export default {
  name: 'info',
  data () {
    return {
      username:'',
      tel:'',
      code:'',
      msg:'获取验证码',
      codeStatus:false,
      disabled:false,
      questionPrice:'',
      content:'',
      // 律师id
      id:'',
      // 通过判断浏览器类型 判断支付类型
      payType:'',
      // 生成订单创建的订单id
      caseid:'',
      // 创建咨询时的案例id
      qid:'',
      // 业务类型名称
      typeName: '',
      // 业务类型
      businessType: ''
    }
  },
  methods: {
    // 获取验证码
    getCode () {
      Indicator.open();
      var time = 60;
      var timer = setInterval(()=>{
        time--;
        if(time == 0){
          clearInterval(timer)
          this.msg = '重新获取'
          this.codeStatus = false
          this.disabled = false
        }else{
          this.msg = '已发送('+time+'s)'
          this.codeStatus = true
          this.disabled = true
        }
      },1000)
      var para = {
          areaCode: '86',
          mobile: this.tel,
          codeType:'6',
          isLocal:'1'
      }
      // 获取短信验证码
      para = Qs.stringify(para)
      axios.post('smscode/send', para)
      .then(res => {
        Indicator.close()
        // this.allData = res.data;
        if(res.data.isSuc){
          Toast('发送成功')
        }else{
          Toast(res.data.message)
          clearInterval(timer)
          this.msg = '重新获取'
          this.codeStatus = false
          this.disabled = false
          return
        }
        // console.log(res.data);
      })
      .catch(error =>{
        Indicator.close()
        Toast('系统繁忙，请稍后重试！')
        clearInterval(timer)
        this.msg = '重新获取'
        this.codeStatus = false
        this.disabled = false
      });
    },
    // 创建咨询订单
    prompt(){
      Indicator.open()
      // 存储用户姓名
      window.sessionStorage.setItem('name',this.username)
      // 存储业务类型
      window.sessionStorage.setItem('businessName',this.typeName)
      //  此处通过 businessType 判断 创建订单的参数 已经 api接口
      if (this.businessType == 0) {
        // 图文咨询类
        var para = {
          areaCode: '86',
          mobile: this.tel,
          smsCode:this.code,
          price: this.questionPrice,
          lawyerID: this.$route.params.userId,
          content: this.content,
          name: this.username,
          BusinessID: this.$route.params.businessId,
          BusinessName: this.typeName,
          typeCodeByuser:"3",
        }
        para = Qs.stringify(para)
        var apiUrl = 'advice/create_question_union'
      } else if (this.businessType == 1) {
        // 电话咨询类
        var para = {
          areaCode: '86',
          mobile: this.tel,
          smsCode:this.code,
          price: this.questionPrice,
          name: this.username,
          LawyerType: 900,
          Source: 1,
          lawyer_id: this.$route.params.userId,
          BusinessID: this.$route.params.businessId,
          BusinessName: this.typeName,
          typeCodeByuser:"3"
        }
        para = Qs.stringify(para)
        var apiUrl = 'callQuestion/create'
      } else if (this.businessType == 2) {
        // 法律事务类
        var para = {
          areaCode: '86',
          mobile: this.tel,
          smsCode:this.code,
          price: this.questionPrice,
          name: this.username,
          content: this.content,
          source: 1,
          grabUserId: this.$route.params.userId,
          BusinessID: this.$route.params.businessId,
          BusinessName: this.typeName,
          typeCodeByuser:"3"
        }
        para = Qs.stringify(para)
        var apiUrl = 'document/create'
      }else{
        Toast('订单类型校验错误！')
      }
      //创建咨询订单
      axios.post(apiUrl,para)
      .then(res => {
        Indicator.close();
        //this.allData = res.data;
        if(res.data.isSuc){
          Toast('咨询订单创建成功')
          // 订单编号
          this.caseid = res.data.result.OrderNum
          // 案例id
          this.qid = res.data.result.QuestionId
          if(this.payType == 1){
            location.href = 'http://pay.lawyer-says.cn/api/home/index?caseid='+this.caseid+'&questionPrice='+this.questionPrice+'&qid='+this.qid;
          }else{
            // 直接跳转到支付页面
            this.$router.push({ name: 'pay', query: { cid: this.caseid, price: this.questionPrice, payType: this.payType, qid: this.qid } })
            // location.href = 'http://pay.lawyer-says.cn/pay?cid='+this.caseid+'&price='+this.questionPrice+'&payType='+this.payType+'&qid='+this.qid;
          }
        }else{
          Toast(res.data.message)
          return
        }
        // console.log(res.data)
        
      })
      .catch(error =>{
        Indicator.close()
        Toast('系统繁忙，请稍后重试！')
      });
    },
  },
  mounted(){
    // 获取父组件传来的数据
    this.$parent.$on('parentMsg', (val) => {
      this.questionPrice = val.questionPrice / 100
      this.content = val.content
      this.typeName = val.typeName
      this.businessType = val.businessType
      // 此处不需判断 *****************
      // alert(this.businessType)
      this.prompt()
    })
    if(Coms.isWeiXin()){
      //dosomething
      this.payType = 1
    }else{
      //dosomething
      this.payType = 2
    }
  },
}
</script>

<style scoped>
.part2>div{
    border-bottom: 1px solid #ebebeb;
    height: 0.88rem;
    padding: 0 0.3rem;
  }
  .part2>div>input{
    height: 0.88rem;
    border: 0;
    outline: none;
    font-size: 0.28rem;
    width: 100%;
  }
  #getcode{
    height: 0.6rem;
    margin-top: 0.15rem;
    max-width: 1.8rem;
    color: #fff;
    border-radius: 0.06rem;
  }
  .getcode{
    background: #1675e1;
  }
  .codeStatus{
    background: #ccc;
  }
</style>
