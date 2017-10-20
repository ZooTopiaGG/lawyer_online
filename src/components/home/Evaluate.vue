<template>
	<div class="evaluate" v-if="show0">
		<ul class="evaluate-list">
			<li class="evaluate-list-cell" v-for="(val,index) in list" :key="index">
				<div class="evaluate-box1 flex flex-1">
					<img v-if='val.UserInfo.Avatar' :src="val.UserInfo.Avatar"/>
					<img v-else src="http://test2.lawyer-says.cn/images/images/10.png">
					<span class="tel" v-if='val.UserInfo.PhoneNum'>{{ val.UserInfo.PhoneNum | tels }}</span>
					<div class="stars-list" id="stars">
						<el-rate v-model="val.Score" disabled text-color="#FFA300" text-template="{value}"></el-rate>
					</div>
				</div>
				<div class="evaluate-box2">
					<div class="content">
						{{val.Content}}
					</div>
				</div>
				<div class="evaluate-box3 clear">
					<div class="time rt">
						<span v-if='val.ActionDate'>{{ val.ActionDate | dates }}</span>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<div class="noevaluate" v-else>
		<div class="nothing">
			<img src="../../assets/images/8.png"/>
			<p>暂无内容</p>
		</div>
	</div>
</template>

<script>
	import elRate from 'element-ui/lib/rate'
	import 'element-ui/lib/theme-default/rate.css'
	import 	Vue from 'vue'

	//时间过滤器
	Vue.filter('dates',(value)=>{
		var val = Coms.getTime(value)
		return val
	})

	//电话过滤器
	Vue.filter('tels',(str)=>{
		return str.substr(0,3)+"****"+str.substr(7);
	})

	export default{
		name:'evaluate',
		data(){
			return{
				list:[],
				value5:[],
				show0:true
			}
		},
		computed:{
			lists(){
				let _this = this;
				let arr = [];
				_this.list.forEach((val,index)=>{
					if(val.UserInfo){
						arr.push(val)
					}
				})
				return arr
			}
		},
		components: {
			elRate
		},
		methods:{
			getComments(){
				var _this = this
				var para = {
	    			userID: 309
	    		}
	    		para = Qs.stringify(para)
	    		axios.post('shareToListen/GetComments',para)
	    		.then(res => {
					if(res.data.isSuc){
						if(res.data.result){
							res.data.result.forEach((val,index)=>{
								if(val.UserInfo){
									_this.list.push(val)
								}
							})
							if(_this.list.length<=0){
								_this.show0 = false
							}else{
								_this.show0 = true
							}
						}else{
							_this.show0 = false
						}
					}else{
						_this.show0 = false
					}
				})
				.catch(error =>{
					//alert(error)
					console.log(error)
					//_this.show0 = false
				});
			}
		},
		mounted(){
			// javascript执行顺序 js引擎机制
			setTimeout( () => {
				this.getComments()
			}, 10)
		}
	}
</script>

<style>
	#stars .el-rate__icon,.el-icon-star-on{
		font-size: 0.2rem !important;
		margin-right: 0.06rem !important;
	}
	.evaluate{
		background: #fff;
	}
	.noevaluate{
		background: #f5f5f5;
	}
	.evaluate-list-cell{
		padding: 0.35rem 0.3rem;
		border-bottom: 1px solid #ebebeb;
	}
	.evaluate-box1{
		line-height: 0.6rem;
		position: relative;
	}
	.evaluate-box1 img{
		width: 0.6rem;
		height: 0.6rem;
		margin-right: 0.2rem;
		border-radius: 0.06rem;
	}
	.tel{
		font-size: 0.28rem;
		color: #999;
	}
	.stars-list{
		position: absolute;
		right: 0;
		top: 50%;
		margin-top: -0.15rem;
	}
	.stars-list>li{
		margin-right: 0.06rem;
	}
	.stars-list>li>span{
		display: block;
		width: 0.2rem;
		height: 0.2rem;
		background: url('http://test2.lawyer-says.cn/images/12-1.png') no-repeat;
		background-size: cover;
	}
	.stars-list>li.hasStar>span{
		background: url('http://test2.lawyer-says.cn/images/7.png') no-repeat;
		background-size: cover;
	}
	.evaluate-box2{
		margin-top: 0.3rem;
		line-height: 1.6;
		font-size: 0.32rem;
		color: #333;
		margin-bottom: 0.2rem;
	}
	.evaluate-box3{
		font-size: 0.24rem;
		color: #999;
	}
</style>