<template>
  <div id="Solution">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" v-if="show" :class="{ hasLoad: isLoad }">
      <ul class="solution-list">
        <li @click="toDetails(item.question_id)" v-for="(item, index) in listData" :key="index">
          <div class="content">
            {{ item.description }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </li>
      </ul>
    </mt-loadmore>
    <div class="noevaluate" v-else>
      <div class="nothing">
        <img src="../../assets/images/8.png"/>
        <p>暂无内容</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Solution',
  data () {
    return {
      show: true,
      bottomStatus : '',
      allLoaded: false,
      listData: [],
      maxPage:'',
      page: 1,
      isLoad: false,
    }
  },
  methods: {
    toDetails (id) {
      this.$router.push({ name: 'details', params: { userId: this.$route.params.userId,  questionId: id } })
    },
    getConsultList () {
      var para = {
        userId: this.$route.params.userId,
        page: this.page,
        size: 5
      }
      para = Qs.stringify(para)
      axios.post('lawyer/replace_question', para)
      .then(res => {
        if (res.data.isSuc) {
          if (res.data.result.length > 0) {
            res.data.result.forEach(val => {
              val.create_time = Coms.getTime(val.create_time)
              this.listData.push(val)
            })
            this.maxPage = Math.ceil(res.data.result_total_count / 5)
          }else{
            this.show = false
          }
        } else {
          this.show = false
          Toast(res.data.message)
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    loadBottom () {
      // 加载更多数据
      if(this.page >= this.maxPage){
        Toast('没有更多数据了')
        this.allLoaded = true;// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      } else {
        this.page ++
        this.getConsultList()
        this.isLoad = true
      }
      
    },
    handleBottomChange () {
      this.bottomStatus = status;
    }
  },
  mounted () {
    setTimeout( () => {
      this.getConsultList()
    }, 0)
  }
}
</script>

<style scoped>
#Solution{
  padding: 0 0.3rem;
}
.solution-list>li{
  border-top: 1px solid #eee;
  padding-bottom: 0.35rem;
  /*padding-top: 0.4rem;*/
}
.hasLoad{
  padding-top: 0.95rem;
}
.solution-list>li:nth-child(1){
  border-top: 0
}
.img1{
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 0.04rem;
  margin-right: 0.2rem;
}
.title{
  font-size: 0.28rem;
  color: #999;
}
.content{
  color: #333;
  font-size: 0.28rem;
  line-height: 1.6;
  margin-top: 0.4rem;
  margin-bottom: 0.3rem;
}
.time{
  text-align: right;
  font-size: 0.26rem;
  color: #999;
}
</style>
