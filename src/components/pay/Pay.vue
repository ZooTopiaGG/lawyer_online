<template>
  <div class="pay">
    <div class="part1 flex flex-1">
      <img src="../../assets/images/10.png">
      <p>您好，{{ name }}</p>
    </div>
    <div class="box-line"></div>
    <div class="part2">
      <div class="flex flex-1 flex-pack-justify">
        <p>业务类型</p>
        <p>{{ businessName }}</p>
      </div>
      <div class="flex flex-1 flex-pack-justify">
        <p>支付金额</p>
        <p>￥{{ price }}</p>
      </div>
    </div>
    <div class="box-line"></div>
    <div class="part3">
      <a href="javascript:;" @click="toPay">立即支付</a>
      <p>支付后立即通知律师解答，未服务全额退款</p>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { Toast,Indicator } from 'mint-ui'
  import wx from 'weixin-js-sdk'

  export default {
    name:'pay',
    data(){
      return {
        caseid:'',
        price:'',
        qid:'',
        name:'',
        businessName: ''
      }
    },
    methods:{
      //支付宝支付
      Alipay(){
        Indicator.open('正在跳转...')
        var _this = this;
        var para = {
            orderNum: _this.caseid,
            total_fee: _this.price,
            return_url: 'http://pay.lawyer-says.cn/success'
        }
        para = Qs.stringify(para)
        axios.post('pay/CreateH5PayUrl', para)
        .then(res =>{
          //dosomething suc
          if(res.data.isSuc){
            document.write(res.data.result);
          }else{
            Toast('支付失败，请稍后重试')
          }
        }).catch(error =>{
          //dosomething error
          Toast('支付失败，请稍后重试')
        })
      },
      // 微信H5支付
      wxH5Pay() {
        Indicator.open('正在跳转...')
        var _this = this;
        var para = {
            orderNum: _this.caseid,
            lawyerId: 0,
            total_fee: _this.price * 100,
            type: 0
        }
        para = Qs.stringify(para)
        axios.post('api/wxPay',para)
        .then(res =>{
          //dosomething suc
          if(res.data.isSuc){
            location.href = res.data.result;
          }else{
            Toast('支付失败，请稍后重试')
          }
        }).catch(error =>{
          //dosomething error
          // Toast('支付失败，请稍后重试')
        })
      },
      //微信支付
      unifiedOrder(){
        var _this = this;
        var para = {
          orderNum: _this.caseid,
          lawyerId: 0,
          total_fee: _this.price * 100,
          type:0
        }
        para = Qs.stringify(para)
        axios.post("home/UnifiedOrder",para)
        .then(res =>{
          Indicator.open();
          _this.wxPay(res.data.result, _this.caseid);
        }).catch(error =>{
          //alert('UnifiedOrder-error')
        });
      },
      wxPay(v,orderNo){
        var data = JSON.parse(v);
          if (typeof WeixinJSBridge == "undefined") {
              if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
              } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', this.jsApiCall);
                  document.attachEvent('onWeixinJSBridgeReady',this.jsApiCall);
              }
          } else {
              this.jsApiCall(data, orderNo);
          }
      },
      jsApiCall(v, orderNo){
        Indicator.close();
          WeixinJSBridge.invoke(
              'getBrandWCPayRequest',
              v,
              function (res) {
                  if (res.err_msg == "get_brand_wcpay_request:ok") {
                      location.href = "http://pay.lawyer-says.cn/success";
                  }
                  else {
                     alert('微信支付出现异常，请稍后重试')
                  }
              }
          );
      },
      toPay(){
        if(Coms.isWeiXin()){
          this.unifiedOrder()
        }else if(Coms.isAlipay()){
          this.Alipay()
        }
        else{
          this.wxH5Pay()
        }
      }
    },
    mounted(){
      var _this = this;
      _this.caseid = _this.$route.query.cid
      _this.price = _this.$route.query.price;
      // alert(_this.price)
      _this.qid = _this.$route.query.qid;
      _this.name = window.sessionStorage.getItem('name');
      _this.businessName = window.sessionStorage.getItem('businessName');
    }
  }
</script>
<style type="text/css" scoped>
  .part1{
    height: 1.0rem;
    line-height: 1.0rem;
    padding: 0 0.3rem;
    font-size: 0.28rem;
    color: #333;
  }
  .box-line{
    height: 0.15rem;
    background: #f5f5f5;
  }
  .part1 img{
    width: 0.6rem;
    height: 0.6rem;
    margin-top: 0.2rem;
    margin-right: 0.24rem;
  }
  .part2>div{
    height: 0.9rem;
    line-height: 0.9rem;
    padding: 0 0.3rem;
    color: #333;
    font-size: 0.28rem
  }
  .part2>div:nth-child(1){
    border-bottom: 1px solid #eee; 
  }
  .part2>div>p:nth-child(2){
    color: #f58144;
  }
  .part3{
    text-align: center;
    padding: 0 0.3rem;
    margin-top: 0.4rem;
  }
  .part3 a{
    display: block;
    height: 0.88rem;
    line-height: 0.88rem;
    background: #f58144;
    border-radius: 0.06rem;
    margin-bottom: 0.25rem;
    color: #fff;
  }
  .part3 p{
    color: #999;
    font-size: 0.24rem;
  }
</style>