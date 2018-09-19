<template>
	<div id="AccumulationOfAssets">
		<div class="imxIncome">
			<span class="text">{{$t("Accumulation.PublicassetsDetails")}}</span>
			<!--imx分配说明-->
			<div class="imxDistribution">
				<div class="imxDistribution_content">
          				{{$t("Accumulation.Worldinitiative")}}
					<p class="cha_kan">
						<router-link to="/index/transactionTransaction" tag="span">{{$t("Accumulation.Viewdetails")}}</router-link>
					</p>
				</div>
			</div>
		</div>
		<!--背景-->
		<div class="swiper">
			<!--分配折合-->
			<div class="distribution_box">
				<div class="back"></div>
				<div class="background"></div>
				<p class="border-right"></p>
				<ul class="distribution">
					<li class="distribution_item">
						<div class="box"> 
							<p class="number" v-if="dividend_summary==null">{{$t("home.Calculating")}}</p>
							<p class="number">{{dividend_summary | number(8)}}</p>
							<p class="text" v-if="$route.params.type=='today'">{{$t("Accumulation.IMXreturnedtoday")}}</p>
							<p class="text" v-if="$route.params.type=='yesterday'">{{$t("Accumulation.ReturnedIMXNumy")}}</p>
						</div>
					</li>
					<li class="distribution_item">
						<div class="box">
							<p class="number" v-if="summary==null">{{$t("home.Calculating")}}</p>
							<p class="number">{{summary | number(8)}}</p>
							<p class="text" v-if="$route.params.type=='today'">{{$t("Accumulation.Cumulativetoday")}}({{exchange_unit}})</p>
							<p class="text" v-if="$route.params.type=='yesterday'">{{$t("Accumulation.Cumulativerevenuey")}}({{exchange_unit}})</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!--今日-->
		<div class="imxDistribution_title margintop">
			<span class="icon"></span>
			<span v-if="$route.params.type=='today'">{{$t("Accumulation.Revretdetail")}}</span>
			<span v-if="$route.params.type=='yesterday'">{{$t("Accumulation.Revenuedetailsy")}}</span>
			<span class="icon"></span>
		</div>
		<!--待分配详细信息-->
		<div class="allocatedDetails">
			<ul class="allocatedDetails_title back">
				<li>Coin</li>
				<li>{{$t("Accumulation.platformfees")}}</li>
				<li>
					<span v-if="$route.params.type=='today'">{{$t("Accumulation.IMXreturnedtoday")}}</span>
					<span v-if="$route.params.type=='yesterday'">{{$t("Accumulation.ReturnedIMX")}}</span>
				</li>
			</ul>
			<ul class="noData" v-show="trading_fees.length==0">
				{{$t("list.NoDatas")}}
			</ul>
			<ul class="allocatedDetails_content" v-for="item in trading_fees">
				<li>{{item.pageIdentifier}}</li>
				<li>{{item.balance | number(8)}}</li>
				<li v-if="$route.params.type=='yesterday' || $route.params.type=='today'">{{item.imx_fees | number(8)}}</li>
			</ul>
		</div>

	</div>
</template>

<script>
	import axios from "axios"
	import { httpUrl } from "../../http_url/http_url.js";
	export default {
		data() {
			return {
				dividend_summary: "",
				/*待分配*/
				summary: "",
				/*总收入折合*/
				trading_fees: [],
				/*平台总手续费列表*/
				exchange_unit: "" /*币种名称*/
			}
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
			/*获取折合数据*/
			let _this = this;
			axios.get(httpUrl.group, {
				params: {
					"type": _this.$route.params.type
				}
			}).then(function(res) {
				_this.dividend_summary = res.data.data.return_imx;
				_this.summary = res.data.data.summary;
				_this.trading_fees = res.data.data.trading_fees;
				_this.exchange_unit = res.data.data.exchange_unit;
			}, function(err) {
				console.log(err)
			})

		}
	}
</script>

<style lang="scss" scoped>
	@media only screen and (max-width: 1920px) {
		.imxIncome {
			height: 500px;
			padding-top: 200px;
		}
	}

	@media only screen and (max-width: 1600px) {
		.imxIncome {
			height: 450px;
			padding-top: 150px;
		}
	}

	@media only screen and (max-width: 1440px) {
		.imxIncome {
			height: 400px;
			padding-top: 100px;
		}
	}

	#AccumulationOfAssets {
		width: 100%;
		color: #fff;
		background: #121b4e;
		padding-bottom: 20px;
	}
	/*imx平台收入分布细节*/

	.imxIncome {
		width: 100%;
		background: url(../../../assets/accBg.png) no-repeat;
		background-size: 100% 100%;
		text-align: center;
		box-sizing: border-box;
		.text {
			display: inline-block;
			font-size: 47px;
		}
	}
	/*imx平台收入分配说明*/

	.imxDistribution_title {
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 25px;
		margin-bottom: 20px;
		.icon {
			display: inline-block;
			width: 5px;
			height: 5px;
			border-radius: 50%;
			background: #03e2ff;
			margin: 0 20px;
		}
	}

	.imxDistribution {
		width: 100%;
		.imxDistribution_content {
			width: 70%;
			line-height: 30px;
			margin: 25px auto;
			font-size: 17px;
			text-align: center;
		}
		.cha_kan {
			margin-top: 10px;
			span {
				color: #979cff;
				cursor: pointer;
			}
		}
	}

	.swiper {
		margin-top: -80px;
	}

	.userRelationship {
		display: flex;
		justify-content: center;
		margin: 65px auto;
		img {
			width: 800px;
			height: 180px;
		}
	}

	.margintop {
		margin: 80px auto;
	}
	/*待分配收入折合*/

	.distribution_box {
		width: 79%;
		height: 279px;
		margin: auto;
		position: relative;
		.background {
			position: absolute;
			left: -8px;
			top: 10px;
			width: 100%;
			height: 270px;
			background: rgba(144, 142, 242, 0.3);
			border-radius: 4px;
		}
		.border-right {
			width: 2px;
			height: 128px;
			background: #fff;
			position: absolute;
			left: 50%;
			top: 30%;
		}
		.back {
			position: absolute;
			left: .6%;
			top: 11%;
			width: 98.8%;
			height: 85%;
			background: #040c4c;
		}
		.distribution {
			width: 100%;
			height: 250px;
			position: absolute;
			left: 8px;
			top: 30px;
			background: rgba(144, 142, 242, 0.3);
			display: flex;
			justify-content: space-between;
			z-index: 66;
			border-radius: 4px;
			.distribution_item {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				div {
					text-align: center;
				}
				.number {
					font-size: 35px;
					color: #00ff90;
				}
				.text {
					font-size: 16px;
					margin-top: 40px;
				}
			}
		}
	}
	/*待分配收入详情*/

	.allocatedDetails {
		width: 80%;
		margin: 0 auto;
		box-sizing: border-box;
		border: 2px solid #6b72ca;
		.noData {
			width: 100%;
			height: 65px;
			text-align: center;
			line-height: 65px;
			color: #fff;
			font-size: 16px;
		}
		.allocatedDetails_title,
		.allocatedDetails_content {
			width: 100%;
			height: 65px;
			line-height: 65px;
			display: flex;
			justify-content: space-between;
			font-size: 15px;
			color: #000;
			li {
				flex: 1;
				box-sizing: border-box;
			}
			li:nth-of-type(1) {
				text-align: left;
				padding-left: 15px;
			}
			li:nth-of-type(2) {
				text-align: center;
			}
			li:nth-last-child(1) {
				text-align: right;
				padding-right: 15px;
			}
		}
		.allocatedDetails_content {
			color: #fff;
		}
		.allocatedDetails_content:nth-of-type(odd) {
			background: #293066;
		}
		.back {
			background: #6b72ca;
		}
	}
	/*活动规则*/

	.ActivityRules {
		width: 80%;
		margin: 50px auto;
		font-size: 14px;
		.ActivityRules_title {
			width: 100%;
			height: 30px;
			line-height: 30px;
		}
		li {
			line-height: 1.8;
		}
	}
</style>
