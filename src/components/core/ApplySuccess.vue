<template>
  <div class="suc">
    <div class="part1">
      <img src="../../assets/images/2.png"/>
      <p class="p1">申请已提交 </p>
      <p class="p2">审核中，工作人员将在一个工作日内联系您</p>
    </div>
    <!-- <div class="part2">
      <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.mci.lawyer" class="flex flex-1">
        <img src="../../assets/images/1.png" alt="" />
        <span>点击下载</span>
      </a>
      <p class="p3">使用手机号码登录，随时查看律师解答</p>
    </div> -->
    <div class="part3">
      <p style="font-size:0.28rem">客服电话028-86667536</p>
    </div>
  </div>
</template>

<script>
  export default{
    name:'suc',
    mounted () {
      document.title = '申请成功'
    }
  }
</script>

<style scoped="scoped">
  .suc{
    text-align: center;
  }
  .part1{
    background: #fff;
    padding-bottom: 0.72rem;
  }
  .part1 img{
    width: 1.4rem;
    height: 1.4rem;
    margin-top: 0.65rem;
    margin-bottom: 0.6rem;
  }
  .p1{
    font-size: 0.36rem;
    margin-bottom: 0.3rem;
    color: #333;    
    font-size: 0.48rem;
    margin-bottom: 0.6rem;
  }
  .p2{
    font-size: 0.28rem;
    color: #808080;
    font-size: 0.32rem;
  }
  .part2{
    margin-top: 1.96rem;
  }
  .part2 a{
    display: block;
    width: 3.6rem;
    height: 0.88rem;
    margin: 0 auto;
    line-height: 0.88rem;
    color: #fff;
    background: #1675E1;
    font-size: 0.36rem;
    font-weight: bold;
    border-radius: 0.06rem;
  }
  .part2 a img{
    width: 0.44rem;
    height: 0.48rem;
    position: relative;
    top: 0.1rem;
  }
  .p3{
    margin-top: 0.3rem;
    font-size: 0.34rem;
    color: #1675E1;
  }
  .part3{
    position: fixed;
    bottom: 0;
    width: 100%;
    margin-bottom: 0.4rem;
  }
  .part3 p{
    font-size: 0.24rem;
    color: #999;
  }
  .p5{
    margin-top: 0.13rem;
    padding-bottom: 0.35rem;
  }
</style>