<template>
	<div id="TaocoinDetails">
		<div class="TaocoinDetailsContent">
			<!--头部详情内容-->
			<div class="Details_top">
				<div class="title">
					<p class="oleft">{{mainDetails.pageIdentifier}}{{$t("taocoin.Details")}}</p>
					<ul class="oright">
						<p>{{$t("taocoin.ExchangeLimit")}}：</p>
						<li v-if="CurrencyList.is_auth==1">
							<i class="iconfont icon-renzheng"></i>
							<span>{{$t("taocoin.AdvancedCertification")}}</span>
						</li>
						<li v-if="CurrencyList.is_mobile==1">
							<i class="iconfont icon-icon_bangdingshouji"></i>
							<span>{{$t("taocoin.BindPhoneNum")}}</span>
						</li>
					</ul>
				</div>
				<div class="content">
					<div class="currencyDetails">
						<div class="oleft">
							<div class="oImg">
								<img :src="mainDetails.logoUrl" />
							</div>
							<ul class="oList">
								<p class="cur"><span class="currencyName">{{mainDetails.pageIdentifier}}</span> <span class="Abbreviation">{{mainDetails.fullName}}</span></p>
								<li class="item">{{$t("taocoin.ExchangePrice")}}：<span class="Num" v-for="(item,key) in stocksList">{{item.c_num/item.m_num|number(item.currency.displayNum)}}  {{item.currency.pageIdentifier}}<span class="SlantingRod" v-if="key!=stocksList.length-1">/</span></span>
								</li>
								<li class="item">{{$t("taocoin.StartAmount")}}：<span class="Quantity">	{{CurrencyList.lower | number(mainDetails.displayNum)}}   -   {{CurrencyList.balance | number(mainDetails.displayNum)}}{{mainDetails.pageIdentifier}}</span> {{$t("taocoin.Stocks")}}：
									<span class="Quantity">{{CurrencyList.dec_balance | number(mainDetails.displayNum)}}{{mainDetails.pageIdentifier}}</span>{{$t("taocoin.FrozenAssets")}}：
									<span class="Quantity">{{CurrencyList.revoke_balance | number(mainDetails.displayNum)}}{{mainDetails.pageIdentifier}}</span>
								</li>
								<li class="item"><span class="Numbering">{{$t("taocoin.TaocoinNumber")}}：{{CurrencyList.order_num}}</span><span>{{$t("taocoin.PublishDate")}}：{{formatTime(CurrencyList.created_at)}}</span> </li>
							</ul>
						</div>
						<div class="oright">
							<p><span class="text">{{$t("taocoin.ExchangeTimes")}}：</span><span>{{CurrencyList.success_num}} {{$t("taocoin.Number")}}</span></p>
							<p><span class="text">{{$t("taocoin.Exchanged")}}：</span>
								<span>{{CurrencyList.balance-CurrencyList.dec_balance | number(mainDetails.displayNum)}}{{mainDetails.pageIdentifier}}</span></p>
						</div>
					</div>
					<!--淘币说明-->
					<div class="Description">
						<span class="Description_text">{{$t("taocoin.TaocoinIntro")}}：</span> {{CurrencyList.goods_info}}
					</div>
				</div>
			</div>
			<!--兑换列表-->
			<div class="exchangeList">
				<ul class="title">
					<li>{{$t("taocoin.ExchangeNumber")}}</li>
					<li>{{$t("taocoin.BuyerAccount")}}</li>
					<li>{{$t("taocoin.ExchangePrice")}}</li>
          <li>{{$t("taocoin.ExchangeC")}}</li>
					<li>{{$t("taocoin.ExchangeR")}}</li>
					<li>{{$t("taocoin.DealTime")}}</li>
				</ul>
				<ul class="item" v-for="item in childOrderList">
					<li>{{item.order_num}}</li>
					<li>{{item.other.name}}</li>
					<li>{{item.price | number(item.currency.displayNum)}}{{item.currency.pageIdentifier}}</li>
					<li>{{item.count | number(item.main.displayNum)}}{{item.main.pageIdentifier}}</li>
					<li>{{item.total | number(item.currency.displayNum)}}{{item.currency.pageIdentifier}}</li>
					<li>{{formatTime(item.created_at)}}</li>
				</ul>
			</div>
			<!--列表分页-->
			<div class="pageCount" v-show="myOrderTotal>10">
				<div class="button">
					<el-pagination layout="prev, pager, next" background :page-size="myOrderPage" @current-change="pagemyOrderChange" :total="myOrderTotal">
					</el-pagination>
				</div>
			</div>
			<!--暂无记录-->
			<div class="noData" v-if="childOrderList.length==0">{{$t("list.noData")}}</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import { httpUrl } from "../../http_url/http_url";
	export default {
		data() {
			return {
				isExpand: false,
				/*用户点击展开*/
				currenCyId: this.$route.params.id,
				/*兑币id*/
				mainDetails: {},
				/*主币内容*/
				CurrencyList: [],
				/*所有内容*/
				stocksList: [],
				/*对币列表*/
				myOrderPage: 0,
				/*每页显示条数*/
				myOrderTotal: 0,
				/*总条数*/
				childOrderList: [],
				/*列表内容*/
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
		methods: {
			pagemyOrderChange(val) {
				let _this = this;
				axios.get(httpUrl.childOrder, {
					headers: {
						"Authorization": "Bearer " + this.token
					},
					params: {
						goods_id: this.currenCyId,
						page: val
					}
				}).then(function(res) {
					_this.childOrderList = res.data.data.data;
					_this.myOrderPage = res.data.data.per_page;
					_this.myOrderTotal = res.data.data.total;
				}, function(err) {
					console.log(err)
				})
			}
		},
		mounted() {
			let _this = this;
			/*获取兑币详情内容*/
			axios.get(httpUrl.info, {
				headers: {
					"Authorization": "Bearer " + this.token
				},
				params: {
					goods_id: this.currenCyId
				}
			}).then(function(res) {
				_this.CurrencyList = res.data.data;
				_this.mainDetails = res.data.data.main;
				_this.stocksList = res.data.data.stocks;
			}, function(err) {
				console.log(err)
			})
			/*获取兑换列表*/
			axios.get(httpUrl.childOrder, {
				headers: {
					"Authorization": "Bearer " + this.token
				},
				params: {
					goods_id: this.currenCyId
				}
			}).then(function(res) {
				_this.childOrderList = res.data.data.data;
				_this.myOrderPage = res.data.data.per_page;
				_this.myOrderTotal = res.data.data.total;
			}, function(err) {
				console.log(err)
			})
		}
	}
</script>
<style lang="scss">
	#TaocoinDetails{
		.el-pagination.is-background .el-pager li.active {
			background: #9F99F2;
		}
	}
</style>
<style lang="scss" scoped>
	$font_color:#999999;
	$high_color:#23ccc7;
	#TaocoinDetails {
		width: 100%;
		min-height: 100%;
		background: #0c1331;
		padding: 46px 0;
	}

	.ExpandContent {
		height: auto !important;
		-webkit-line-clamp: inherit !important;
	}

	.exchangeList {
		background: #fff;
		margin-top: 30px;
		border-radius: 4px;
		padding: 3px 0;
		ul:nth-of-type(even) {
			background: #edeef5;
		}
		.title {
			width: 100%;
			height: 50px;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding: 0 20px;
			font-size: 14px;
			color: #999999;
			li {
				flex: 1;
				text-align: center;
			}
			li:nth-of-type(1) {
				text-align: left;
			}
			li:nth-last-child(1) {
				text-align: right;
			}
		}
		.item {
			@extend .title;
			color: #333;
		}
	}
	/*详情内容部分*/

	.TaocoinDetailsContent {
		width: 1200px;
		margin: 0 auto;
		.Details_top {
			width: 100%;
			background: #fff;
			overflow: hidden;
			border-radius: 4px;
			.title {
				width: 100%;
				height: 70px;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 20px;
				align-items: center;
				line-height: 70px;
				box-shadow: 2px 2px 8px #e8e8e8;
				.oleft {
					color: #3d4a74;
					font-size: 16px;
				}
				.oright {
					display: flex;
					align-items: center;
					color: $font_color;
					font-size: 13px;
					li {
						margin-right: 10px;
						display: flex;
						align-items: center;
						.iconfont {
							color: $high_color;
							margin: 0 5px;
						}
					}
					li:nth-last-child(1) {
						margin-right: 0;
					}
				}
			}
			.content {
				box-sizing: border-box;
				padding: 30px 35px 20px 35px;
				.Description {
					margin-top: 30px;
					line-height: 20px;
					color: $font_color;
					font-size: 13px;
					.Description_text {
						color: #000;
					}
				}
				.seeMore {
					width: 100%;
					text-align: right;
					color: $high_color;
					span {
						margin-right: 20px;
						display: inline-block;
						margin-top: 15px;
						font-size: 13px;
						cursor: pointer;
					}
				}
				.currencyDetails {
					width: 100%;
					display: flex;
					justify-content: space-between;
					padding-bottom: 20px;
					border-bottom: 1px solid #d8d8d8;
					.oleft {
						display: flex;
						img {
							width: 60px;
							height: 60px;
							margin-right: 10px;
						}
						.oList {
							line-height: 35px;
							.cur {
								display: flex;
								align-items: flex-end;
								.currencyName {
									font-size: 18px;
									margin-right: 8px;
								}
								.Abbreviation {
									font-size: 14px;
									color: $font_color;
								}
							}
							.item {
								color: $font_color;
								font-size: 14px;
								line-height: 30px;
								.Num {
									font-size: 18px;
									color: #ff7e00;
									margin-right: 6px;
								}
								.SlantingRod {
									margin: 0 10px;
									color: $font_color;
								}
								.Quantity {
									color: #000;
									margin-right: 15px;
								}
								.Numbering {
									margin-right: 25px;
								}
							}
						}
					}
					.oright {
						align-self: center;
						p {
							line-height: 30px;
							display: flex;
							justify-content: space-between;
							font-size: 16px;
							.text {
								color: $font_color;
							}
						}
					}
				}
			}
		}
	}
	/*分页*/

	.pageCount {
		display: flex;
		justify-content: flex-end;
	}

	/*暂无记录*/
	.noData{
		text-align: center;
		line-height: 50px;
		color: #000;
		font-size: 15px;
		background: #fff;
	}

</style>
