<template>
  <div id="details">
    <consult-info :child-data="infoData"></consult-info>
    <consult-content :child-data="infoData"></consult-content>
  </div>
</template>

<script>
  
  import ConsultInfo from './ConsultInfo.vue'
  import ConsultContent from './ConsultContent.vue'
  
  export default{
    name:'details',
    data(){
      return{
        infoData: {}
      }
    },
    components:{
      ConsultInfo,
      ConsultContent
    },
    methods:{
      getInfo () {
          Indicator.open()
          var para =
          {
              question_id: this.$route.params.questionId,
              with_details: true,
              with_lawyers: true,
          }
          axios.post('/advice/get_info', Qs.stringify(para))
          .then(res => {
              if (res.data.isSuc) {
                this.infoData = res.data.result
              } else {
                Toast(res.data.message)
              }
          })
          .catch(err => {
              console.log(err)
          })
      }
    },
    mounted () {
      this.getInfo()
    }
  }
</script>

<style>
</style>