<template>
	<div class="consultinfo">
		<div class="part1 flex flex-1">
			<img v-if="lawyerInfo.avatar" :src="lawyerInfo.avatar"/>
			<img v-else src="../../assets/images/9.png"/>
			<div class="part1-info">
				<div class="info1">
					<span class="name">{{ lawyerInfo.lawyer_name }}</span>
					<span>{{ lawyerInfo.city_name }}</span>
					<span> | </span>
					<span>{{ lawyerInfo.experience_years }}年</span>
				</div>
				<div class="info2">
					<span>{{ lawyerInfo.company_name }}</span>
				</div>
			</div>
			<div class="part1-btn">
				<router-link :to="{ name: 'text', params: { price: questionPrice == 0 ? 20 : questionPrice, businessType: 0, businessId: businessId, userId: $route.params.userId } }">咨询Ta</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default{
		name:'consultinfo',
		data () {
			return {
				lawyerInfo: {
					avatar: '',
					lawyer_name: '',
					city_name: '',
					experience_years: 1,
					company_name: '',
				},
				businessId: 0,
				questionPrice: 20
			}
		},
		props: ['childData'],
		watch: {
			childData () {
				// 判断是第一位律师还是第二位律师
        if (this.childData.first_reply_info && this.childData.first_reply_info.lawyer_info) {
            if (this.$route.params.userId == this.childData.first_reply_info.lawyer_info.user_id) {
                this.lawyerInfo = this.childData.first_reply_info.lawyer_info
            }else{
                this.lawyerInfo = this.childData.second_reply_info.lawyer_info
            }
        }else{
            this.lawyerInfo = this.childData.second_reply_info.lawyer_info
        }
			}
		},
		mounted () {
			let d = window.localStorage.getItem('LAWYER_DATA')
			d = JSON.parse(d)
			d.AllBusinessInfo.SysBussinessInfos.forEach((val, index) => {// 遍历 基础业务 拿到自己想要的值
				if(val.BussinessType == 0){
					this.businessId = d.AllBusinessInfo.SysBussinessInfos[index].BussinessID
					this.questionPrice = d.AllBusinessInfo.SysBussinessInfos[index].Price * 100
				}
			})
		}
	}
</script>

<style scoped="scoped">
	.consultinfo{
		padding: 0.3rem;
	}
	.part1{
		margin-bottom: 0.4rem;
		padding: 0.3rem;
		background: #1675E1;
		box-shadow: 0 1px 0.06rem rgba(0,0,0,0.35);
		border-radius: 0.06rem;
		box-sizing: border-box;
		position: relative;
	}
	.part1 img{
		width: 1.2rem;
		height: 1.2rem;
		margin-right: 0.2rem;
		border-radius: 0.06rem;
	}
	.part1-info{
		color: #fff;
		font-size: 0.24rem;
	}
	.name{
		color: #fff;
		font-size: 0.32rem;
		font-weight: bold;
		margin-right: 0.1rem;
	}
	.info1{
		margin-top: 0.2rem;
	}
	.info2{
		color: #fff;
		font-size: 0.28rem;
		font-weight: bold;
		margin: 0.2rem 0 0 0;
	}
	.part1-btn a{
		width: 1.25rem;
		height: 0.6rem;
		position: absolute;
		right: 0.3rem;
		top: 50%;
		margin-top: -0.3rem;
		color: #fff;
		border: 1px solid #fff;
		border-radius: 0.06rem;
		text-align: center;
		line-height: 0.6rem;
	}
</style>