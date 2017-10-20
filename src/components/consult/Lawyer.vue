<template>
	<div class="lawyer">
		<div class="part1 flex flex-1">
			<img v-if="res.avatar" :src="res.avatar"/>
			<img v-else src="http://test2.lawyer-says.cn/images/images/9.png"/>
			<div class="part1-info">
				<div class="info1">
					<span class="name">{{ res.lawyer_name }}</span>
					<span>{{ res.city_name }}</span>
					<span> | </span>
					<span>{{ res.experience_years + '年' }}</span>
				</div>
				<div class="info2">
					<span>{{ res.company_name }}</span>
				</div>
				<div class="info3 flex flex-1">
					<span v-if="res.first_profession">{{ res.first_profession }}</span>
					<span v-if="res.second_profession">{{ res.second_profession }}</span>
					<span v-if="res.profession3">{{ res.profession3 }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		name:'lawyer',
		computed: {
			...mapGetters([
				'getLawyerData'
			])
		},
		props: ['childLawyer'],
		data () {
			return {
				res: {
					lawyer_name: '',
					city_name: '',
					experience_years: '',
					company_name: '',
					avatar: 'http://test2.lawyer-says.cn/images/images/9.png'
				},
			}
		},
		watch: {
			childLawyer () {
				this.res = this.childLawyer
			}
		},
		mounted () {
			// console.log(this.getLawyerData)
			// vuex 获取的数据
			// let dt = window.localStorage.getItem('LAWYER_DATA')
			// dt = JSON.parse(dt)
			// if(dt && dt.user_id){
			// 	this.res = dt
			// }else if (this.getLawyerData && this.getLawyerData.user_id) {
			// 	this.res = getLawyerData
			// }else{
			// 	Toast('系统繁忙，请稍后重试')
			// }
		}
	}
</script>

<style scoped>
	.lawyer{
		padding:0.5rem 0.3rem 0;
		background: #fff;
	}
	.part1{
		padding-bottom: 0.4rem;
	}
	.part1 img{
		width: 1.5rem;
		height: 1.5rem;
		margin-right: 0.2rem;
		border-radius: 0.06rem;
	}
	.part1-info{
		color: #999;
		font-size: 0.24rem;
	}
	.name{
		color: #333;
		font-size: 0.32rem;
		font-weight: bold;
		margin-right: 0.1rem;
	}
	.info2{
		color: #333;
		font-size: 0.28rem;
		font-weight: bold;
		margin: 0.2rem 0 0.25rem 0;
	}
	.info3 span{
		height: 0.44rem;
		line-height: 0.44rem;
		color: #757575;
		background-color: #f2f2f2;
		border-radius: 0.06rem;
		margin-right: 0.12rem;
		width: 1.48rem;
		text-align: center;
	}
</style>