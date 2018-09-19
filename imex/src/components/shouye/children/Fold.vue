<template>
	<div id="Fold">
		<my-header :text="titleText"></my-header>
		<div class="fold_wrapper">
			<div class="fold_item">
				<p class="icon blue">
					<i class="iconfont icon-rest-income"></i>
				</p>
				<p class="text">
					<span v-if="$route.params.type == 'today'">{{$t("Accumulation.Revenuetoday")}}</span>
					<span v-if="$route.params.type == 'yesterday'">{{$t("Accumulation.Revenueyesterday")}}</span>
				</p>
				<p class="number textblue">
					<span class="jisuan" v-show="incomeList.summary==null">{{$t("home.Calculating")}}</span>
					<span>{{incomeList.summary | number(8)}} {{incomeList.exchange_unit}} </span>
				</p>
			</div>
			<div class="fold_item">
				<p class="icon green">
					<i class="iconfont icon-iconfont"></i>
				</p>
				<p class="text">
					<span v-if="$route.params.type == 'today'">{{$t("Accumulation.IMXreturnedtoday")}}</span>
					<span v-if="$route.params.type == 'yesterday'">{{$t("Accumulation.ReturnedIMXNumy")}}</span>
				</p>
				<p class="number textgreen">
					<span class="jisuan" v-show="incomeList.return_imx==null">{{$t("shouye.Incomeaccumulationtoday")}}</span>
					<span>{{incomeList.return_imx | number(8)}} </span>
				</p>
			</div>
		</div>
		<!--收入及待返还详情-->
		<div class="income">
			<i class="iconfont icon-fuzhi"></i>
			<span  v-if="$route.params.type == 'today'">{{$t("Accumulation.Revretdetail")}}</span>
			<span v-if="$route.params.type == 'yesterday'">{{$t("Accumulation.Revenuedetails")}}</span>
		</div>
		<!--收入列表-->
		<div class="incomeList">
			<ul class="income_wrapper title">
				<li class="income_item">COIN</li>
				<li class="income_item">{{$t("Accumulation.Totalfees")}}</li>
				<li class="income_item">
					<span v-if="$route.params.type == 'today'">{{$t("Accumulation.IMXreturned")}}</span>
					<span  v-if="$route.params.type == 'yesterday'">{{$t("Accumulation.ReturnedIMX")}}</span>
				</li>
			</ul>
			<ul class="income_wrapper  incomeContent" v-for="item in trading_fees">
				<li class="income_item">{{item.pageIdentifier}}</li>
				<li class="income_item">{{item.balance | number(8)}}</li>
				<li class="income_item">{{item.imx_fees | number(8)}}</li>
			</ul>
		</div>
		<!--暂无记录-->
		<div class="noData" v-show="trading_fees.length==0">{{$t("shouye.Counting")}}</div>
	</div>
</template>

<script>
	/*引入头部*/
	import header from "../../public/backHeader"
	export default {
		data() {
			return {
				titleText: this.$t("shouye.Revenuehistory"),
				incomeList:[],
				trading_fees:[]   /*列表内容*/
			}
		},
		components: { /*注册组件*/
			"my-header": header,
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
			/*判断当日或者本小时*/
			/*获取数据*/
			this.$ajax.get(this.httpUrl.group, {
				params: {
					"type": _this.$route.params.type
				}
			}).then(function(res){
				_this.incomeList = res.data.data;
				_this.trading_fees = res.data.data.trading_fees;
			},function(err){
				console.log(err)
			})

		}
	}
</script>

<style lang="scss" scoped>
	#Fold {
		width: 100%;
		height: 100%;
		background: #171933;
		color: #fff;
	}
	/*收入累积折合头部*/

	.fold_wrapper {
		width: 100%;
		height: 1.3rem;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: .2rem 0;
		background: #121528;
		.fold_item {
			flex: 1;
			height: 1.3rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			.icon {
				width: .4rem;
				height: .4rem;
				text-align: center;
				line-height: .41rem;
				border: 1px solid red;
				border-radius: 50%;
				.iconfont {
					font-size: .3rem;
				}
			}
			.text{
				line-height: .35rem;
			}
			.blue{
				border: 1px solid #49d7f4;
				color: #49d7f4;
			}
			.textblue,.textblue.jisuan{
				color:#49d7f4;
			}
			.green {
				width: .42rem;
				height: .42rem;
				box-sizing: border-box;
				padding-top: .015rem;
				padding-left: .011rem;
				border:1px solid #04a96e;
				color: #04a96e;
			}
			.textgreen,.textgreen.jisuan{
				color: #04a96e;
			}
		}
	}
	/*收入文字*/
	.income{
		width: 100%;
		height: .42rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #171933;
	}
	/*平台手续费*/
	.incomeList{
		width: 100%;
		.income_wrapper{
			width: 100%;
			height: .4rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			li:nth-of-type(1){
				flex: .4;
			}
			li{
				flex: 1;
				height: .4rem;
				line-height: .4rem;
				text-align: center;
			}
		}
		.title{
			background: #1e2142;
		}
		.incomeContent:nth-of-type(even){
			background: #121630;
		}
	}
	/*暂无记录*/
	.noData{
		width: 100%;
		text-align: center;
		line-height: .5rem;
		color: #fff;
	}

</style>
