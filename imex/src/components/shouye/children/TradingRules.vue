<template>
	<div id="TradingRules">
		<my-header :text="titleText"></my-header>
		<!--头部-->
		<div class="header1">
			<div class="text">{{$t("introduce.Introductionrules")}}</div>
		</div>
		<!--介绍头部-->
		<div class="Introduce">
			<p class="all">{{$t("introduce.Transmining")}}</p>
			<p class="run">{{$t("introduce.Trialrun")}}<span class="blue">{{$t("introduce.Julyfive")}}</span>{{$t("introduce.Shocklaunch")}}</p>
			<dl class="point">
				<p>
					<span class="num">1</span>
					<span class="text">{{$t("introduce.FeesFullreturned")}}</span>
				</p>
				<p>
					<span class="num">2</span>
					<span class="text">{{$t("introduce.PlatformRepurchase")}}</span>
				</p>
			</dl>
		</div>
		<!--发行量-->
		<div class="imxCirculation">
			<div class="title">
				{{$t("introduce.Mechanismamount")}}
			</div>
			<div class="text">
				<span>{{$t("introduce.The")}}{{ruleList.periods_num}}{{$t("introduce.Period")}}({{ruleList.days}}{{$t("introduce.Day")}})</span>
			</div>
			<div class="num">
				<span class="liangText">{{$t("introduce.Currentphase")}}</span>
				<span class="NumText">{{ruleList.all_num}}</span>
			</div>
			<div class="allNum"> 				
				<ul class="item">		
					<li>{{$t("introduce.Perdaycurrentphase")}}</li>
					<li class="Number">{{ruleList.every_day}}</li>
				</ul>
				<ul class="item">
					<li>{{$t("introduce.Cappedrepurchase")}}</li> 	
				</ul>
			</div>
		</div>
		<!--交易即挖矿-->
		<div class="transaction_title">
			<i class="iconfont icon-jiaoyi"></i> {{$t("introduce.Transfeemining")}}
		</div> 
		<!--挖矿内容图解-->
		<div class="Illustration">
			<div class="Illustration_header">
				<p class="fess">{{$t("introduce.Feesreturn")}}</p>
			</div>
			<div class="Illustration_content">
				<p class="fess_title">
					<i class="iconfont icon-shouxufei"></i> {{$t("introduce.Returnfee")}}
					<span class="blue">{{$t("introduce.limitedamount")}}</span></p>
			</div>
			<ul class="Illustration_bottom">
				<li>{{$t("introduce.Transactionfeesusers")}}</li>
				<li>{{$t("introduce.ReturnIMXequaling")}}</li>
				<li>{{$t("introduce.Calculateonceperhour")}}</li>
				<li>{{$t("introduce.Calculatebytheaverage")}}</li>
			</ul>
		</div>
		<!--挖矿-->
		<div class="Mining">
			<div class="Illustration_header">
				<p class="fess">IMX</p>
			</div>
			<div class="Illustration_content">
				<p class="fess_title">
					<i class="iconfont icon-wakuangshezhi"></i>
					<span class="center"> {{$t("introduce.Dailyquantitative")}}</span>
				</p>
			</div>
			<ul class="Illustration_bottom">
				<li>
					<p>
						{{$t("introduce.TotalamountiMX")}}
					</p>
				</li>
			</ul>
		</div>
		<!--挖矿即回购-->
		<div class="transaction_title">
			<i class="iconfont icon-huigou001"></i> {{$t("introduce.Miningrepurchase")}}
		</div>
		<!--挖矿即回购内容部分-->
		<div class="Repurchase">
			<div class="Illustration_header">
				<p class="fess">{{$t("introduce.Repurchase")}}</p>
			</div>
			<ul class="Illustration_bottom">
				<li>{{$t("introduce.RepurchaseiMXtransaction")}}</li>
			</ul>
		</div>

		<!--时间周期-->
		<div class="transaction_title">
			<i class="iconfont icon-riqi2"></i>{{$t("introduce.Timeperiod")}}
		</div>
		<!--时间周期安排-->
		<div class="Timeperiod">
			<ul>
				<li>
					<i class="iconfont icon-icon1"></i>
					<p class="date">{{$t("introduce.Firstday")}}</p>
					<p class="text">{{$t("introduce.Feesstatistics")}}</p>
				</li>
				<li>
					<i class="iconfont icon-huigou001"></i>
					<p class="date">{{$t("introduce.Secondday")}}</p>
					<p class="text">{{$t("introduce.DynamicrepurchaseIMX")}}</p>
				</li>
			</ul>
		</div>
		<!--时间周期-->
		<div class="transaction_title">
			{{$t("introduce.ActivityrulesTi")}}
		</div>
		<!--交易规则-->
		<div class="rule">
			<ul>
				<p class="title">一、{{$t("introduce.TransFeeMining")}}</p>
				<li>{{$t("introduce.Feereturnmechanism")}}</li>	
				<li>{{$t("introduce.Dailyquantitativemining")}}</li>
				<p class="title">二．{{$t("introduce.MiningRepurchase")}}</p>
				<li>{{$t("introduce.MiningRepurchase1")}}</li>
				<li>{{$t("introduce.MiningRepurchase3")}}</li>
				<p class="title">三．{{$t("introduce.Timeperiod")}}</p>
				<li>{{$t("introduce.Timeperiod1")}}</li>
				<li>{{$t("introduce.Timeperiod2")}}</li>
				<p class="title">{{$t("introduce.Specialinstructions")}}</p>
				<li>{{$t("introduce.Specialinstructions1")}}</li>
				<li>{{$t("introduce.Miningrew")}}</li>
				<li>{{$t("introduce.Specialinstructions2")}}</li>
				<li>{{$t("introduce.Specialinstructions3")}}</li>
				<li>{{$t("introduce.Specialinstructions4")}}</li>
			</ul>
		</div>

	</div>
</template>

<script>
	import header from "../../public/backHeader"
	export default {
		data() {
			return {
				titleText: this.$t("shouye.Miningrules"),
				ruleList: {}
			}
		},
		components: { /*注册组件*/
			"my-header": header,
		},
		mounted() {
			let _this = this;
			this.$ajax.get(this.httpUrl.rule).then(function(res) {
				_this.ruleList = res.data.data;
			}, function(err) {
				console.log(err)
			})
		}
	}
</script>

<style lang="scss" scoped>
	#TradingRules {
		color: #fff;
		width: 100%;
		min-height: 100%;
		padding-bottom: .1rem;
		background: #101333;
	}
	/*头部*/

	.header1 {
		width: 100%;
		height: 1.7rem;
		background: url(https://imxpro.oss-cn-beijing.aliyuncs.com/HeadFigure.png) no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		padding-top: .25rem;
		.text {
			font-size: .14rem;
			padding-left: .1rem;
		}
	}
	/*规则*/

	.rule {
		box-sizing: border-box;
		width: 95%;
		margin: 0 auto;
		.title {
			font-size: .15rem;
			line-height: .3rem;
			margin: .1rem 0;
		}
		li {
			line-height: .2rem;
		}
	}
	/*介绍*/

	.Introduce {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		font-size: .14rem;
		padding: .2rem 0;
		.all,
		.run,
		.point {
			width: 90%;
			text-align: center;
		}
		.all {
			line-height: .3rem;
		}
		.run {
			margin: .1rem 0;
			margin-bottom: .2rem;
			.blue {
				color: #12f4f7;
				font-size: .17rem;
			}
		}
		.point {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			p {
				flex: 1;
				.num {
					width: .25rem;
					height: .25rem;
					display: inline-block;
					background: #65c4d7;
					border-radius: 50%;
					text-align: center;
					line-height: .25rem;
				}
			}
		}
		.point1 {
			line-height: .5rem;
			@extend .point;
		}
	}
	/*释放机制*/

	.imxCirculation {
		width: 95%;
		margin: 0 auto;
		box-sizing: border-box;
		border: 1px solid #243f5b;
		.title {
			background: #1a2846;
		}
		.title,
		.text {
			width: 100%;
			height: .4rem;
			text-align: center;
			line-height: .4rem;
			border-bottom: 1px solid #243f5b;
		}
		.num {
			height: .65rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-sizing: border-box;
			padding-top: .05rem;
			border-bottom: 1px solid #243f5b;
			.liangText {
				line-height: .3rem;
			}
			.NumText {
				font-size: .14rem;
				color: #12f4f7;
			}
		}
		.allNum {
			width: 100%;
			height: .7rem;
			display: flex;
			.item {
				width: 50%;
				text-align: center;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.Number {
					font-size: .14rem;
					color: #12f4f7;
					margin-top: .06rem;
				}
			}
		}
	}
	/*交易即挖矿头部*/

	.transaction_title {
		width: 100%;
		height: .3rem;
		margin: .15rem 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: .16rem;
		.iconfont {
			font-size: .25rem;
			margin-right: .05rem;
		}
	}
	/*平台收入*/

	.Platformrevenue {
		@extend .Illustration;
		padding-top: .2rem;
		.Illustration_header {
			height: 1.2rem !important;
			background: url(https://imxpro.oss-cn-beijing.aliyuncs.com/Group11.png) no-repeat 50% !important;
			background-size: 60% 100% !important;
			position: relative;
			.fess {
				width: .6rem;
				height: .6rem;
				margin-right: .1rem;
				span {
					display: block;
					text-align: center;
				}
			}
			.user {
				position: absolute;
				bottom: .1rem;
				left: 0;
			}
			.technology {
				position: absolute;
				right: .1rem;
				top: 0;
			}
			.Supernode {
				position: absolute;
				right: -.1rem;
				top: .28rem;
			}
			.root {
				position: absolute;
				right: -.1rem;
				bottom: .5rem;
			}
		}
	}
	/*回购内容*/

	.Repurchase {
		@extend .Illustration;
		.Illustration_header {
			height: .95rem !important;
			background: url(https://imxpro.oss-cn-beijing.aliyuncs.com/Group13.png) no-repeat !important;
			background-size: 100% 100% !important;
			.fess {
				line-height: .8rem;
			}
		}
	}
	/*挖矿奖励*/

	.Mining {
		@extend .Illustration;
		.Illustration_header {
			height: 1.2rem !important;
			background: url(https://imxpro.oss-cn-beijing.aliyuncs.com/Bitmap.png) no-repeat 50% !important;
			background-size: 46% 100% !important;
			.fess {
				line-height: .5rem;
				font-size: .2rem;
			}
		}
	}
	/*手续费奖励*/

	.Feereward {
		@extend .Illustration;
		.Illustration_header {
			height: 1.2rem !important;
			background: url(https://imxpro.oss-cn-beijing.aliyuncs.com/Group9.png) no-repeat !important;
			background-size: 100% 100% !important;
		}
	}
	/*交易即挖矿内容*/

	.Illustration {
		width: 95%;
		margin: 0 auto;
		border: 1px solid #243f5b;
		padding-bottom: .2rem;
		margin-bottom: .1rem;
		.Illustration_header {
			width: 90%;
			height: 1.5rem;
			margin: .1rem auto;
			background: url(https://imxpro.oss-cn-beijing.aliyuncs.com/Group6.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			p {
				text-align: center;
				width: .5rem;
				height: .5rem;
				line-height: .27rem;
				font-size: .14rem;
			}
		}
		.Illustration_content {
			.fess_title {
				height: .4rem;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #12f4f7;
				.iconfont {
					font-size: .22rem;
					margin-right: .02rem;
				}
				.blue {
					color: #2f7b95;
					margin-left: .05rem;
				}
				.center {
					margin-left: .05rem;
					margin-top: .05rem;
				}
			}
		}
		.Illustration_bottom {
			width: 100%;
			text-align: center;
			li {
				line-height: .3rem;
			}
		}
	}
	/*时间周期安排*/

	.Timeperiod {
		width: 90%;
		margin: 0 auto;
		ul {
			width: 100%;
			display: flex; 
			li {
				flex: 1;
				text-align: center;
				border-right: 2px solid #243f5b;
				.iconfont {
					color: #12f4f7;
					font-size: .5rem;
				}
				.date {
					color: #12f4f7;
					line-height: .3rem;
				}
			}
			li:nth-last-child(1) {
				border-right: none;
			}
		}
	}
	/*运营活动*/

	.Operation {
		width: 100%;
		text-align: center;
		img {
			width: .5rem;
			height: .2rem;
			margin-top: .3rem;
			margin-bottom: .2rem;
		}
		ul {
			li {
				line-height: .2rem;
			}
		}
	}
</style>
