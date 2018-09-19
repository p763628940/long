<template>
	<div id="ckgd">
		<!--币币交易----买卖盘-->
		<div class="bbjy-mmp-wrapper">
			<!--买盘-->
			<div class="mmp-slide" :class="{'mmp-slide-white':getColor == 1}">
					<!--头部-->
					<div class="mmp-slide-title">
						<span class="text">{{$t("list.Currency_exchange")}}</span>
						<span class="xia_hua_xian">—</span>
						<span class="mai">{{$t("list.buy1")}}</span>		
					</div>
					<!--数据显示-->
					<dl class="mmp-datalList-title">
						<dd></dd>
						<dd>{{$t("list.Buy_price")}}({{Maincurrency}})</dd>
						<dd>{{$t("list.Buy_volume")}}({{ToTheCoin}})</dd>
						<dd>{{$t("list.Cumulative")}}({{ToTheCoin}})</dd>
					</dl>
					<!--数据展示-->
					<div class="mmp-datalList">
						<dl v-for="(item,index) in buyList" class="mmp-datalList-content">
							<div class="progress green" :style="{'width':item.count/MaximumValue*100+'%'}"></div>
							<dd class="td-mai td-buy">{{$t("list.buy")}} {{index+1}}</dd>
							<dd class="td-jia">{{item.price | number(priceLength)}}</dd>
							<dd class="td-liang">{{item.count | number(CountLength)}}</dd>
							<dd>
								<span>{{item.sum|number(CountLength)}}</span>
							</dd>
						</dl>
					</div>
					<div class="noDate" v-show="buyList.length==0" :class="{'noDate_white':getColor==1}">{{$t("list.NoDatas")}}</div>
			</div>
			<!--卖盘-->
			<div class="mmp-slide" :class="{'mmp-slide-white':getColor == 1}">	
					<!--头部-->
					<div class="mmp-slide-title">
						<span class="text">{{$t("list.Currency_exchange")}}</span>
						<span class="xia_hua_xian">—</span>			
						<span class="mai">{{$t("list.sell1")}}</span>
					</div>
					<!--数据显示-->
					<dl class="mmp-datalList-title">
						<dd></dd>
						<dd>{{$t("list.Selling_price")}}({{Maincurrency}})</dd>
						<dd>{{$t("list.Sales_volume")}}({{ToTheCoin}})</dd>
						<dd>{{$t("list.Cumulative")}}({{ToTheCoin}})</dd>
					</dl>
					<!--数据展示-->
					<div class="mmp-datalList">
						<dl v-for="(item,index) in sellList" class="mmp-datalList-content">
							<div class="progress red" :style="{'width':item.count/MaximumValue*100+'%'}"></div>
							<dd class="td-mai td-sell">{{$t("list.sell")}} {{index+1}}</dd>
							<dd class="td-jia">{{item.price | number(priceLength)}}</dd>
							<dd class="td-liang">{{item.count | number(CountLength)}}</dd>
							<dd>
								<span>{{item.sum | number(CountLength)}}</span>
							</dd>
						</dl>
					</div>
					<!--数据展示-->
					<div class="noDate" v-show="sellList.length==0" :class="{'noDate_white':getColor==1}">{{$t("list.NoDatas")}}</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { httpUrl } from "../http_url/http_url.js";
	import axios from "axios";
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		props: ["sellbuyList"],
		data() {
			return {
				buyList: [],
				sellList: [],
				matchcoin_id: this.$router.history.current.params.id,
				priceLength: 0,
				/*获取价格保留小数*/
				CountLength: 0,
				/*获取数量保留小数*/
				Maincurrency: "",
				/*主币区*/
				ToTheCoin: "",
				/*对币区*/
				MaximumValue: 0 /*最高值*/
			}
		},
		filters: {
			//小数点过滤器 不四舍五入
			number(value, num) {
				value = isNaN(value)?0:value;
				var toFixedNum = Number(value).toFixed(num + 1);
				var realVal = toFixedNum.substring(0, toFixedNum.lastIndexOf('.') + num + 1);
				return realVal;
			}
		},
		computed:{
			...mapState('user',['lang','userID']),
			...mapGetters('setting',['urlPrefix']),
		},
		methods: {
			getMaxValue: function(buyList, sellList) {
				var buyMax;
				if(buyList.length != 0) {
					buyMax = buyList[0].count; //买的最大值
					for(let i = 0; i < buyList.length; ++i) {
						if(buyMax < buyList[i].count) {
							buyMax = buyList[i].count
						}
					}
				} else {
					buyMax = 0;
				}
				var sellMax;
				if(sellList.length != 0) {
					sellMax = sellList[0].count; //卖的最大值
					for(let j = 0; j < sellList.length; ++j) {
						if(sellMax < sellList[j].count) {
							sellMax = sellList[j].count
						}
					}
				} else {
					sellMax = 0;
				}
				if(buyMax > sellMax) {
					return this.MaximumValue = parseFloat(buyMax);
				} else {
					return this.MaximumValue = parseFloat(sellMax);
				}
			}
		},
		mounted() {
			var _this = this;
			////获取买卖列队
			axios.get(httpUrl.buy_sell_queue, {
				params: {
					"matchcoin_id": _this.matchcoin_id
				}
			}).then(function(res) {
				////获取成功，分开列表
				_this.buyList = res.data.data.buy_queues;
				_this.sellList = res.data.data.sell_queues;
				_this.getMaxValue(_this.buyList, _this.sellList); /*求出最高值*/
				var sum = 0;
				_this.sellList.forEach(function(item) {
					sum = parseFloat(item.count) + sum;
					item.sum = sum;
				})
				_this.sellList = _this.sellList;
				var sum1 = 0;
				_this.buyList.forEach(function(item) {
					sum1 = parseFloat(item.count) + sum1;
					item.sum = sum1;
				})
			}, function(err) {
				console.log(err)
			})
			//获取全部币对
			axios.get(httpUrl.coin_matching,{
			params: {
				symbol: this.urlPrefix,
				...(this.userID ? { code: this.userID } : {}),
			}
		}).then(function(res) {
				var arr = res.data.data;
				for(let i = 0; i < arr.length; i++) {
					for(let j = 0; j < arr[i].matchcoins.length; j++) {
						if(arr[i].matchcoins[j].matchcoin_id == _this.matchcoin_id) {
							_this.Maincurrency = arr[i].pageIdentifier;
							_this.ToTheCoin = arr[i].matchcoins[j].pageIdentifier;
							_this.priceLength = arr[i].matchcoins[j].decimals;
							_this.CountLength = arr[i].matchcoins[j].count_decimals;
						}
					}
				}
			}, function(err) {
				console.log(err)
			})
			//var ws = new WebSocket(_this.wsIp); ///定义全局
			const wsOpenHandle = function() {
				_this.ws.send('{"mid":' + _this.matchcoin_id + '}');
			}
				//传递币对ID开始//
			if(_this.ws.readyState === _this.ws.OPEN){
				wsOpenHandle();
			}else{
				_this.ws.onopen = wsOpenHandle;
			}
			_this.ws.onmessage = function(e) {
				var arr = JSON.parse(e.data);
				if(arr.type == "ping") { ////判断type
					_this.ws.send('{"pong":' + Date.now() + '}');
				} else if(arr.type == "socket") {
					for(let i = 0; i < arr.message.length; i++) {
						if(arr.message[i].type == "buySellQueue" + _this.matchcoin_id) { ////推送买卖列队
							var buySellList = arr.message[i].message;
							_this.buyList = buySellList.buy_queues;
							_this.sellList = buySellList.sell_queues;
							if(_this.buyList.length == 0) {
								_this.buyList = buySellList.buy_queues;
							} else {
								var sum1 = 0;
								_this.buyList.forEach(function(item) {
									sum1 = parseFloat(item.count) + sum1;
									item.sum = sum1;
								})
							}
							if(_this.sellList.length == 0) {
								_this.sellList = buySellList.sell_queues;
							} else {
								var sum = 0;
								_this.sellList.forEach(function(item) {
									sum = parseFloat(item.count) + sum;
									item.sum = sum;
								})
								_this.sellList = _this.sellList;
							}
							_this.getMaxValue(_this.buyList, _this.sellList); ///拿到最大值
							continue;
						}
					}
				}

				//////获取实时推送数据

			};

		}
	}
</script>

<style lang="scss" scoped="scoped">
	/*白色版本开始*/

	.noDate_white {
		color: #000 !important;
	}

	.mmp-slide-white {
		background: #fff !important;
		border: 1px solid #eee !important;
		.mmp-slide-title {
			background: #f7f6fc !important;
		}
		.mai {
			color: #000 !important;
		}
		.mmp-datalList-content dd {
			color: #000 !important;
		}
		.mmp-datalList-content .td-sell {
			color: #dc3249 !important;
		}
		.mmp-datalList-content .td-buy {
			color: #549463 !important;
		}
	}
	/*白色版本结束*/
	/*头部*/

	.mmp-datalList-title {
		width: 100%;
		height: 35px;
		line-height: 35px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 20px;
		dd {
			flex: 1;
			color: #8a84d4;
			text-align: right;
		}
		dd:nth-of-type(1) {
			flex: 0.5;
		}
	}
	/*数据展示*/

	.mmp-datalList {
		width: 100%;
		dl {
			width: 100%;
			height: 30px;
			line-height: 30px;
			display: flex;
			box-sizing: border-box;
			padding: 0 20px;
			position: relative;
			overflow: hidden;
			.progress {
				position: absolute;
				top: 3px;
				right: 0;
				height: 25px;
				z-index: 0.1;
			}
			.progress.red {
				background: rgba(220, 50, 73, 0.16);
			}
			.progress.green {
				background: rgba(84, 148, 99, 0.16);
			}
			.td-buy {
				color: #549463;
			}
			.td-sell {
				color: #dc3249;
			}
			.td-mai {
				text-align: left;
			}
			dd {
				flex: 1;
				text-align: right;
				color: #fff;
				z-index: 66;
			}
			dd:nth-of-type(1) {
				flex: 0.5;
			}
		}
	}
	/*买卖盘*/

	.bbjy-mmp-wrapper {
		width: 1120px;
		margin: 20px auto;
		.mmp-slide:nth-of-type(1) {
			margin-right: 16px;
		}
		.mmp-slide {
			width: 550px;
			box-sizing: border-box;
			overflow: hidden;
			background: #16182c;
			float: left;
			.mmp-slide-title {
				width: 100%;
				height: 50px;
				line-height: 50px;
				font-size: 15px;
				background: #363864;
				span {
					color: #8a84d4;
					margin: 0 5px;
				}
				.text {
					font-size: 16px;
					margin-left: 20px;
				}
				.xia_hua_xian {
					font-size: 14px;
				}
				.mai {
					color: #fff;
				}
			}
		}
	}
	/*暂无数据*/

	.noDate {
		width: 100%;
		line-height: 30px;
		text-align: center;
		color: #fff;
	}
</style>
