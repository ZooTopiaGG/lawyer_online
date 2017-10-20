<template>
    <div class="consultcontent">
        <div class="part1">
            <div class=" clear">
                <div class="title lt">
                    <span class="box-line"></span>
                    <span>咨询内容</span>
                </div>
                <div class="time rt">
                    <span>{{ childData.create_time | time }}</span>
                </div>
            </div>
            <div class="part1-content">
                {{ childData.description }}
            </div>
        </div>
        <div class="lines"></div>
        <div class="part2" v-if="replyInfo.answer">
            <div>
                <div class="title">
                    <span class="box-line"></span>
                    <span>律师解答</span>
                </div>
                <div class="con">
                    <div class="summary" v-if="replyInfo.answer.prune_content">
                        <div class="summary-title part2-title">
                            咨询概述
                        </div>
                        <div class="summary-content part2-content">
                            {{ replyInfo.answer.prune_content }}
                        </div>
                    </div>
                    <div class="opinion" v-if="replyInfo.answer.content">
                        <div class="opinion-title part2-title">
                            律师意见
                        </div>
                        <div class="opinion-content part2-content">
                            {{ replyInfo.answer.content }}
                        </div>
                    </div>
                    <div class="basis">
                        <div class="basis-title part2-title" v-if="replyInfo.answer.hold_legal_basis">
                            法律依据
                        </div>
                        <div class="basis-content part2-content">
                            {{ replyInfo.answer.hold_legal_basis }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="part3" v-if="replyInfo.answer.talk_list && replyInfo.answer.talk_list.length > 0">
            <div class="user clear" v-for="(item, index) in replyInfo.answer.talk_list" :key="index">
                <div class="box">
                    <span class="part3-title" v-if="replyInfo.answer.to_user_id === item.to_user_id">律师解答：</span>
                    <span class="part3-title" v-else>用户追问：</span>
                    {{ item.content }}
                </div>
                <div class="part3-time rt">
                    <span>{{ item.create_time | time }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    Vue.filter('time', function (time) {
       return Coms.getTime(time)
    })
    export default{
        name:'consultcontent',
        data () {
            return {
                // 最好设定初始值
                content: {},
                create_time: '',
                desc: '',
                replyInfo: {
                    answer: {
                        talk_list: []
                    }
                }
            }
        },
        props: ['childData'],
        watch: {
            childData () {
                // this.childData.create_time = Coms.getTime(this.childData.create_time)
                // this.desc = this.childData.description
                // this.replyInfo = this.childData.first_reply_info
                // 判断是第一位律师还是第二位律师
                if (this.childData.first_reply_info && this.childData.first_reply_info.lawyer_info) {
                    if (this.$route.params.userId == this.childData.first_reply_info.lawyer_info.user_id) {
                        this.replyInfo.answer = this.childData.first_reply_info.answer
                        if(this.childData.first_reply_info.answer){
                            this.replyInfo.answer.talk_list = this.childData.first_reply_info.answer.talk_list
                        }
                    }else{
                        this.replyInfo.answer = this.childData.second_reply_info.answer
                        if(this.childData.second_reply_info.answer){
                            this.replyInfo.answer.talk_list = this.childData.second_reply_info.answer.talk_list
                        }
                    }
                }else{
                    this.replyInfo.answer = this.childData.second_reply_info.answer
                    if(this.childData.second_reply_info.answer){
                        this.replyInfo.answer.talk_list = this.childData.second_reply_info.answer.talk_list
                    }
                }
                
            }
        }
    }
</script>

<style scoped="scoped">
    .consultcontent{
        padding-bottom: 0.3rem;
    }
    .box-line{
        display: inline-block;
        width: 0.04rem;
        height: 0.24rem;
        background: #1675E1;
        position: relative;
        top: 0.02rem;
    }
    .title{
        color: #1675E1;
        font-size: 0.28rem;
    }
    .time{
        font-size: 0.24rem;
        color: #999;
    }
    .part1-content{
        padding: 0.4rem 0;
        font-size: 0.32rem;
        color: #333;
        line-height: 1.6;
    }
    .lines{
        height: 0.2rem;
        background: #f5f5f5;
    }
    .part1{
        padding: 0 0.3rem;
    }
    .part2{
        padding: 0.3rem;
        border-bottom: 1px solid #efefef;
    }
    .part2-title{
        color: #999;
        font-size: 0.24rem;
        margin-bottom: 0.21rem;
    }
    .con{
        margin-top: 0.4rem;
    }
    .summary-title{
    }
    .part2-content{
        margin-bottom: 0.3rem;
        font-size: 0.32rem;
        line-height: 1.6;
    }
    .part3{
        padding:0 0.3rem;
        color: #666;
        font-size: 0.32rem;
        line-height: 1.6;
        border-bottom: 1px solid #efefef;
    }
    .part3>div{
        padding-top: 0.3rem;
        border-bottom: 1px solid #efefef;
    }
    .part3>div:last-child{
        border-bottom: 0;
    }
    .part3-title{
        color: #333;
        font-weight: bold;
    }
    div.box{
        margin-bottom: 0.2rem;
    }
    .part3-time{
        margin-bottom: 0.2rem;
        color: #999;
        font-size: 0.24rem;
    }
</style>