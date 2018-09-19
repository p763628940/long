<template>
	<div id="AllList">
		<my-header :text="titletext"></my-header>
		<!--邀请榜单头部-->
		<div class="yaoList">
			<div class="list_header">
				<span class="listYao">{{$t("invitation.Theinvitationlist")}}</span>
				<p class="selectTime" @click="openTime">
					<i class="iconfont icon-riqi1"></i>
					<span class="time">{{time}}</span>
				</p>
			</div>
			<!--前三榜单-->
			<div class="RankingList">
				<div class="silver medal" v-if="List.length>=2">	
					<img src="../../../assets/02.png" />
					<p class="userNumber">{{List[1].user_id}}</p>
					<p class="currencyNum">{{List[1].balance | number(8)}} <span class="currency">IMX</span></p>
				</div>
				<div class="gold medal" v-if="List.length>=1">
					<img src="../../../assets/01.png" />
					<p class="userNumber">{{List[0].user_id}} </p>
					<p class="currencyNum">{{List[0].balance | number(8)}}<span class="currency">IMX</span></p>
				</div>
				<div class="bronze medal" v-if="List.length>=3">
					<img src="../../../assets/03.png" />
					<p class="userNumber">{{List[2].user_id}}</p>
					<p class="currencyNum">{{List[2].balance | number(8)}}<span class="currency">IMX</span></p>
				</div>
				<div class="noData" v-show="List.length==0">{{$t("shouye.Counting")}}</div>
			</div>
		</div>
		<!--排名-->
		<div class="RankList">
			<ul class="Rank_title">
				<li>{{$t("shouye.Ranking")}}</li>
				<li>{{$t("login.Account")}}</li>
				<li>{{$t("shouye.Commission")}}(IMX)</li>
			</ul>
			<ul v-for="(item,key) in ListAll">
				<li>{{4+key}}</li>
				<li>{{item.user_id}}</li>
				<li>{{item.balance | number(8)}}</li>
			</ul>
			<div class="noData" v-show="List.length==0">{{$t("shouye.Counting")}}</div>
		</div>
		<!--选择时间-->
		<div class="time_bottom">
			<mt-datetime-picker v-model="selectT" :startDate="startDate" type="date" ref="startTime" @confirm="picker"></mt-datetime-picker>
		</div>
	</div>
</template>

<script>	
	import header from "../../public/backHeader";
	export default {
		data() {
			return {
				titletext: this.$t("invitation.Theinvitationlist"),
				time: this.$t("repurchasede.Choosetime"),
				selectT:"",
				List:[],
				ListAll:[],
				startDate: new Date('2018-07'),      //设置开始时间
			}
		},
		components: {
			"my-header": header
		},
			filters: {
			//小数点过滤器 不四舍五入
			number(value, num) {
				var toFixedNum = Number(value).toFixed(num + 1);
				var realVal = toFixedNum.substring(0, toFixedNum.lastIndexOf('.') + num + 1);
				return realVal;
			}
		},
		mounted() {
			let _this = this;
			this.$refs.startTime.close();
			//邀请返利榜单
			this.$ajax.get(this.httpUrl.list).then(function(res) {
				_this.List = res.data.data;
				if(res.data.data.length>=3){
					_this.ListAll  = res.data.data.slice(3,_this.List.length);
				}
			}, function(err) {
				console.log(err)
			})
		},
		methods: {
			picker(val){ /*确认时间*/
				let _this = this;
				this.time = this.newDate(val);
				this.$ajax.get(this.httpUrl.list,{
					params:{"month":this.time}
				}).then(function(res) {
					_this.List = res.data.data;
					if(res.data.data.length>=3){
						_this.ListAll  = res.data.data.slice(3,_this.List.length);
					}else{
						_this.ListAll = [];
					}
				}, function(err) {
					console.log(err)
				})
			},
			openTime(){
				this.$refs.startTime.open();
			},
			newDate(date) {
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? '0' + m : m;
				return y + '-' + m ;
			}
		}
	}
</script>

<style lang="scss" scoped>
	#AllList {
		color: #fff;
		width: 100%;
		min-height: 100%;
		background: #191d38;
	}

	.yaoList {
		width: 100%;	
		height: 2.6rem;
		background: url(https://imxpro.oss-cn-beijing.aliyuncs.com/BG.png) no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		padding: 0 .2rem;
		.list_header {
			width: 100%;
			height: .5rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.selectTime {
				width: 1.1rem;
				height: .25rem;
				border: 1px solid #989fff;
				background: #262746;
				color: #fff;
				display: flex;
				align-items: center;
				.iconfont {
					flex: .2;
					text-align: center;
				}
				.time {
					flex: .8;
					text-align: center;
				}
			}
		}
		.RankingList {
			display: flex;
			justify-content: center;
			margin-top: .4rem;
			.medal {
				width: .9rem;
				height: 1rem;
				margin-right: .03rem;
				background-size: 100% 100%;
				text-align: center;
				img {
					width: .3rem;
					height: .3rem;
					margin-top: .15rem;
				}
				.userNumber {
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					line-height: .25rem;
				}
				.currencyNum {
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					span {
						color: #6a72d5;
					}
				}
			}
			.silver,
			.bronze {
				margin-top: .2rem;
			}
			.silver {
				background: url(../../../assets/02bg.png) no-repeat;
			}
			.gold {
				background:rgba(209,170,44,.25);
			}
			.bronze {
				background: url(../../../assets/03bg.png) no-repeat;
			}
		}
	}
	/*排名*/
	.RankList{
		width: 100%;
		box-sizing: border-box;
		padding: 0 .1rem;
		.noData{
			width: 100%;
			height: 20px;
			line-height: 20px;
			font-size: .14rem;
			text-align: center;
		}
		ul{
			width: 100%;
			height: .3rem;
			line-height: .3rem;
			box-sizing: border-box;
			padding: 0 .1rem;
			display: flex;
			align-items: center;
			li:nth-of-type(1){
				flex: .2;
				text-align: left;
			}
			li:nth-of-type(2){
				flex: .4;
				text-align: left;
			}
			li:nth-of-type(3){
				flex: .4;
				text-align: right;
			}
		}
		ul:nth-of-type(odd){
			background: #202543;
		}
		ul:nth-of-type(even){
			background: #1c2041;
		}
		.Rank_title{
			background: #22284b;
		}

	}

</style>
