<template>
  <div id="LawyerTabContainer">
    <div style="border-bottom:1px solid #efefef;">
      <mt-tabbar v-model="active">
        <mt-tab-item id="解答">
          解答
          <span class="icon"></span> 
        </mt-tab-item>
        <mt-tab-item id="评论">
          评论
          <span class="icon"></span> 
        </mt-tab-item>
      </mt-tabbar>
    </div>
    <mt-tab-container v-model="active" :swipeable='true'>
      <mt-tab-container-item id="解答">
        <solution></solution>
      </mt-tab-container-item>
      <mt-tab-container-item id="评论">
        <evaluate></evaluate>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Evaluate from './Evaluate.vue'
import Solution from './Solution.vue'
export default {
  name: 'LawyerTabContainer',
  data () {
    return {
      active: '解答'
    }
  },
  components: {
    Evaluate,
    Solution
  }
}
</script>

<style>
  .mint-tabbar{
    position: static;
    height: 1.0rem;
    width: 3.0rem;
    margin-left: 0.4rem;
    background: #fff;
  }
  .mint-tab-item-label{
    line-height: 0.8rem;
    font-size: 0.3rem;
    text-align: left;
  }
  .mint-tabbar > .mint-tab-item{
    color: #666;
  }
  .mint-tabbar > .mint-tab-item.is-selected{
    color: #2f90ff;
    background: none;
    font-weight: bold;
  }
  .mint-tabbar > .mint-tab-item.is-selected .icon{
    display: block;
    width: 0.6rem;
    height: 2px;
    background: #2f90ff;
    top: 2px;
    position: relative;
  }
</style>
<style scoped>
#LawyerTabContainer{}
</style>
