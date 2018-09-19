<template>
	<div id="fbjy">
		<!--loading效果开始-->
		<div v-show="locadingIsShow">
			<my-locading></my-locading>
		</div>
		<!--loading效果结束-->
		<!--有新的订单弹框-start----->
		<div class="men_back" v-show="dindIsShow"></div>
		<div class="NewNews" v-show="dindIsShow">
			<div class="NewNews_header">
				<span>{{$t("bbjy.Orderremind")}}</span>
				<i class="iconfont icon-cuowu" @click="dindIsShow=false"></i>
			</div>
			<div class="NewNews_content">
				{{$t("userCenter.OrdersInProgress")}}
				<span class="blue" @click="toOrder()">{{$t("userCenter.Toview")}}</span>
			</div>
			<div class="NewNews_bottom" @click="toOrder()">
				{{$t("userCenter.determine")}}
			</div>
		</div>
		<!--有新消息推送-----end---->

		<!--点对点交易头部-->
		<div class="fbjy_header">
			<div class="header_conter">
				<p @click.stop="currencyListIsShow=!currencyListIsShow">
					<span class="font">{{$t("list.Currency_trading")}}</span>
					<span class="currency font">{{selectCurrencyName}}</span>
					<span class="icofont">
					<i class="iconfont icon-zelvxuanzefeiyongdaosanjiaoxingfandui"></i>
				</span>
				</p>
				<ul class="currencyList" v-show="currencyListIsShow">
					<li class="currencyList_item" v-for="item in currrencyList" @click.stop="tabCurrency(item)">{{item.pageIdentifier}}</li>
				</ul>
			</div>
		</div>
		<!--买入卖出-->
		<div class="buySellTitle">
			<p class="buy_active" @click.stop="buy(currrencyID)">
				<span>
					{{$t("list.Buy_BTC")}}
				</span>
			</p>
			<p @click.stop="sell(currrencyID)">
				<span>{{$t("list.Sell_BTC")}}</span>
			</p>
			<div @click="dingdan">
				<span>{{$t("otc.Order")}}</span>
			</div>
		</div>
		<div class="oHeight"></div>
		<!--买入弹框开始-->
		<div class="men_back" v-show="buyAlertIsShow"></div>
		<div class="buyAlert" v-show="buyAlertIsShow" v-if="this.buyData.price!=undefined">
			<div class="content">
				<!--头部-->
				<div class="buyAlert_title">
					<span class="text">{{$t("otc.Buy")}}  {{buyData.cuccency.pageIdentifier}}</span>
					<i class="iconfont icon-cuowu" @click="cancelBuy"></i>
				</div>
				<!--交易价格部分-->
				<div class="price">
					{{$t("otc.TradingPrice")}}
					<span class="currency">({{buyData.legal.code}}/{{buyData.cuccency.pageIdentifier}})</span>
					<span>:</span>
					<span class="text">{{buyData.price}}</span>
				</div>
				<!--限额-->
				<div class="Quota">
					<span class="text">{{$t("capital.Limited")}}</span>
					<p class="oright">
						{{buyData.minTradeLimit}} - {{buyData.maxTradeLimit}} {{buyData.legal.code}}
					</p>
				</div>
				<!--币-->
				<div class="Quota">
					<span class="text">{{buyData.cuccency.pageIdentifier}}</span>
					<p class="oInput">
						<input type="text" maxlength="14" @input="buyCountJisuan($event)" @keyup="buyCountJisuan($event)" v-model.number="buyCount" :placeholder="$t('list.Number')" />
						<span class="quan" @click="buyQuan()">{{$t("otc.All")}}</span>
					</p>
				</div>
				<div class="error">{{buyCountErrorText}}</div>
				<!--人民币-->
				<div class="Quota">
					<span class="text">{{buyData.legal.code}}</span>
					<p class="oInput">
						<input type="text" v-model.number="buyPrice" @input="buyPriceJisuan($event)" @focus="scrollTopAlert" @keyup="buyPriceJisuan($event)" :placeholder="$t('list.Amount_of_money')" />
						<span class="quan" @click="buyQuan()">{{$t("otc.All")}}</span>
					</p>
				</div>
				<div class="error">{{buyPriceErrorText}}</div>
				<!--取消和确认-->
				<div class="cancelconfirm">
					<p class="cancel" @click="cancelBuy()">{{buyCountDown}}s{{$t("capital.Cancel")}}</p>
					<p class="confirm" @click="confirmBuy">{{$t("otc.Confirm")}}</p>
				</div>
			</div>
		</div>
		<!--买入弹框结束-->
		<!--卖出弹框开始-->
		<div class="men_back" v-show="sellAlertIsShow"></div>
		<div class="buyAlert" v-show="sellAlertIsShow" v-if="this.sellData.price!=undefined">
			<div class="content">
				<!--头部-->
				<div class="buyAlert_title">
					<span class="text">{{$t("list.Sell_BTC")}}  {{sellData.cuccency.pageIdentifier}}</span>
					<i class="iconfont icon-cuowu" @click="cancelSell"></i>
				</div>
				<!--交易价格部分-->
				<div class="price">
					{{$t("otc.TradingPrice")}}
					<span class="currency">({{sellData.legal.code}}/{{sellData.cuccency.pageIdentifier}})</span>
					<span>:</span>
					<span class="text">{{sellData.price}}</span>
				</div>
				<!--限额-->
				<div class="Quota">
					<span class="text">{{$t("capital.Limited")}}</span>
					<p class="oright">
						{{sellData.minTradeLimit}} - {{sellData.maxTradeLimit}} {{sellData.legal.code}}
					</p>
				</div>
				<!--币-->
				<div class="Quota">
					<span class="text">{{sellData.cuccency.pageIdentifier}}</span>
					<p class="oInput">
						<input type="text" maxlength="14" @input="sellCountJisuan($event)" @keyup="sellCountJisuan($event)" v-model.number="sellCount" :placeholder="sellCountMaxplaceholder" />
						<span class="quan" @click="sellQuan()">{{$t("otc.All")}}</span>
					</p>
				</div>
				<div class="error">{{sellCountErrorText}}</div>
				<!--人民币-->
				<div class="Quota">
					<span class="text">{{sellData.legal.code}}</span>
					<p class="oInput">
						<input type="text" v-model.number="sellPrice" @input="sellPriceJisuan($event)" @keyup="sellPriceJisuan($event)" :placeholder="sellPriceMaxplaceholder" />
						<span class="quan" @click="sellQuan()">{{$t("otc.All")}}</span>
					</p>
				</div>
				<div class="error">{{sellPriceErrorText}}</div>
				<!--资金密码-->
				<div class="Quota">
					<span class="text">{{$t("otc.FundPassword")}}</span>
					<p class="oInput pass">
						<input type="password" v-model="moneyPricePass" />
					</p>
				</div>
				<!--取消和确认-->
				<div class="cancelconfirm">
					<p class="cancel" @click="cancelSell()">{{sellCountDown}}s{{$t("userCenter.Cancel")}}</p>
					<p class="confirm" @click="confirmSell">{{$t("otc.Confirm")}}</p>
				</div>
			</div>
		</div>
		<!--卖出弹框结束-->

		<!--买列表-->
		<div class="BuySellList" v-show="buyBoxIsShow">

			<div class="content" v-for="item in buyList" @click="alertBuy(item)" v-if="buyList.length!=0">
				<div class="userName">
					<p class="oleft">
						<i class="iconfont icon-icontouxiang"></i> {{item.user.name}}
					</p>
					<p class="oright">
						<i class="iconfont icon-iconfontjiantou5"></i>
					</p>
				</div>
				<ul class="BuySellList_wrapper">
					<li>
						<p class="top red">
							<span>{{item.user.fail_num+item.user.traded_num}} {{$t("otc.Order")}}</span>
						</p>
						<dl class="bottom">
							<dd>{{item.price}}</dd>
							<dd class="blue">{{item.legal.code}}</dd>
						</dl>
					</li>
					<li>
						<p class="top red">
							<span>{{$t("otc.SuccessRat")}}</span>
							<span v-if="!isNaN(parseInt(item.user.traded_num/(item.user.fail_num+item.user.traded_num)*100))">{{parseInt(item.user.traded_num/(item.user.fail_num+item.user.traded_num)*100)}}%</span>
							<span v-if="isNaN(parseInt(item.user.traded_num/(item.user.fail_num+item.user.traded_num)*100))">0%</span>
						</p>
						<dl class="bottom">
							<dd>{{item.minTradeLimit}}-{{item.maxTradeLimit}}</dd>
							<dd class="blue">{{$t("capital.Limited")}}</dd>
						</dl>
					</li>
					<li>
						<p class="top">
							<i class="iconfont icon-iconfontjikediancanicon20" v-show='item.user.bank_status'></i>
							<i class="iconfont icon-zhifubao" v-show="item.user.alipy_status"></i>
							<i class="iconfont icon-logo-wechat" v-show='item.user.wxpay_status'></i>
						</p>
						<dl class="bottom">
							<dd>{{item.balance | number(item.cuccency.displayNum)}}</dd>
							<dd class="blue">{{$t("list.Number")}}</dd>
						</dl>
					</li>
				</ul>
			</div>
			<div class="noData" v-show="buyList.length==0">{{$t("list.noData")}}</div>
			<!--分页-->
			<div class="pageCount" v-show="buyTotal>5">
				<el-pagination background layout="prev, pager, next" :page-size="pagesize" :total="buyTotal" @current-change="buyPage">
				</el-pagination>
			</div>
		</div>
		<!--卖列表-->
		<div class="BuySellList" v-show="!buyBoxIsShow">
			<div class="content" v-for="item in sellList" @click="alertSell(item)" v-if="sellList.length!=0">
				<div class="userName">
					<p class="oleft">
						<i class="iconfont icon-icontouxiang"></i> {{item.user.name}}
					</p>

					<p class="oright">
						<i class="iconfont icon-iconfontjiantou5"></i>
					</p>
				</div>
				<ul class="BuySellList_wrapper">
					<li>
						<p class="top red">
							<span>{{item.user.fail_num+item.user.traded_num}} {{$t("otc.Order")}}</span>
						</p>
						<dl class="bottom">
							<dd>{{item.price}}</dd>
							<dd class="blue">{{item.legal.code}}</dd>
						</dl>
					</li>
					<li>
						<p class="top red">
							<span>{{$t("otc.SuccessRat")}}</span>
							<span>{{parseInt(item.user.traded_num/(item.user.fail_num+item.user.traded_num)*100)}}%</span>
						</p>
						<dl class="bottom">
							<dd>{{item.minTradeLimit}}-{{item.maxTradeLimit}}</dd>
							<dd class="blue">{{$t("capital.Limited")}}</dd>
						</dl>
					</li>
					<li>
						<p class="top">
							<i class="iconfont icon-iconfontjikediancanicon20" v-show='item.user.bank_status'></i>
							<i class="iconfont icon-zhifubao" v-show="item.user.alipy_status"></i>
							<i class="iconfont icon-logo-wechat" v-show='item.user.wxpay_status'></i>
						</p>
						<dl class="bottom">
							<dd>{{item.balance | number(item.cuccency.displayNum)}}</dd>
							<dd class="blue">{{$t("list.Number")}}</dd>
						</dl>
					</li>
				</ul>
			</div>
			<div class="noData" v-show="sellList.length==0">{{$t("list.noData")}}</div>
			<!--分页-->
			<div class="pageCount" v-show="sellTotal>5">
				<el-pagination background layout="prev, pager, next" :page-size="pagesize" :total="sellTotal" @current-change="sellPage">
				</el-pagination>
			</div>
		</div>

	</div>
</template>

<script>
	import header from "../public/header"
	import scroller from "../public/scroller/scroller"
	import $ from "jquery"
	import locading from "../public/loading"; /*loading 效果*/
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				buyListNoData: false,
				/*买入数据为空的时候*/
				sellListNoData: false,
				/*卖出数据为空的时候*/
				userList: {},
				/*获取用户信息*/
				title: this.$t("fbjy.otcRrade"),
				currencyListIsShow: false,
				/*切换币列表*/
				currrencyList: [],
				/*币的列表*/
				selectCurrencyName: "",
				buyBoxIsShow: true,
				/*买列队*/
				/*选中币的名称*/
				buyList: [],
				buyAllList: [],
				/*买数组*/
				sellList: [],
				sellAllList: [],
				/*卖的列表*/
				startSellCount: 0,
				/*卖列队开始条数*/
				currrencyID: 0,
				/*当前选中币的ID*/
				startCount: 0,
				/*买列队开始条数*/
				Count: 4,
				/*买每页条数*/
				sCount: 4,
				/*卖每页条数*/
				buyAlertIsShow: false,
				/*买入弹框*/
				/*用户选择商户的信息*/
				buyCountDown: 40, ///买入弹框倒计时
				buyCount: "",
				/*买入数量*/
				buyCountErrorText: "",
				/*提示他买入数量有问题*/
				buyPriceErrorText: "",
				/*提示他买入价格有问题*/
				buyPrice: "",
				/*买入价格*/
				buyData: {},
				/*买入商家信息*/
				buyTime: "",
				/*买入弹框倒计时*/
				sellData: {},
				/*卖出商家信息*/
				sellTime: "",
				/*卖出弹框倒计时*/
				sellCountDown: 40,
				/*卖出弹框倒计时*/
				sellAlertIsShow: false,
				/*卖出弹框*/
				sellCount: "",
				/*卖出数量*/
				sellPrice: "",
				/*卖出价格*/
				sellCountErrorText: "",
				/*提示他卖出数量有误*/
				sellPriceErrorText: "",
				/*提示他卖出价格有误*/
				sellPriceMaxplaceholder: "",
				/*最大可卖出价格 */
				sellCounrMaxplaceholder: "",
				/*最大可卖出数量*/
				moneyPricePass: "",
				/*资金密码*/
				pagesize: 5,
				/*一页默认显示5条*/
				sellTotal: 0,
				/*卖的总条数*/
				buyTotal: 0,
				/*买的总条数*/
				dindIsShow: false,
				/*是否有新的订单*/
				buySellType: 0,
				/*判断买卖*/
				pur_user: 0,
				/*推送过来的用户id*/
				locadingIsShow: false /*loading效果*/
			}
		},
		components: {
			"my-header": header,
			"my-locading": locading /*loading效果*/
		},
		computed:{
			...mapState('user',{'userId':state=>state.userID}),
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
			/*请求响应*/
			//请求拦截器
			// http request 拦截器
			this.$ajax.interceptors.request.use(
				config => {
					_this.locadingIsShow = true;
					return config;
				},
				err => {
					_this.locadingIsShow = false;
					return Promise.reject(err);
				});

			// http response 拦截器
			this.$ajax.interceptors.response.use(
				response => {
					_this.locadingIsShow = false;
					return response;
				},
				error => {
					_this.locadingIsShow = false;
				});

			/*获取币种列表*/
			this.$ajax.get(this.httpUrl.getbzUrl).then(function(res) {
				_this.currrencyList = res.data.data;
				_this.selectCurrencyName = res.data.data[0].pageIdentifier;
				_this.currrencyID = res.data.data[0].id;
				/*默认显示买列表*/
				_this.buy(_this.currrencyID)
			}, function(err) {
				console.log(err)
			})
			/*点击页面其他地方币种列表切换*/
			$(document).bind("click", function(e) {
				e.stopPropagation();
				_this.currencyListIsShow = false;
			})
			if(this.token == null || this.token == undefined) {
				return false;
			} else {
				/*获取用户信息*/
				this.$ajax.get(this.httpUrl.userInfo, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.userList = res.data.data;
				}, function(err) {
					console.log(err)
				})
			}
			/**************接受实时推送的消息*****start************/
			//var ws = new WebSocket(_this.wsIp); ///定义全局
			_this.ws.onmessage = function(e) {
				var arr = JSON.parse(e.data);
				if(arr.type == "ping") { ////判断type
					_this.ws.send('{"pong":' + Date.now() + '}');
				} else if(arr.type == "otc") {
					if(arr.content != null || arr.content != undefined) {
						// window.localStorage.setItem("OrderId", arr.content.orderId);
						_this.setData({'orderID':arr.content.orderId});
						_this.dindIsShow = true;
						if(window.plus) {
							let otext;
							if(arr.content.type != 1) { /*文字*/
								otext = arr.content.content;
							} else {
								otext = _this.$t("bbjy.Systemmessage")
							}
							plus.push.createMessage(otext, '', {
								title: "otc" + _this.$t("bbjy.Haveneworder")
							});

							/*点击广告提示*/
							plus.push.addEventListener("click", function(msg) {
								// 分析msg.payload处理业务逻辑
								/*获取订单详情*/
								_this.$ajax.get(_this.httpUrl.getddxqUrl, {
									headers: {
										'Authorization': 'Bearer ' + _this.token
									},
									params: {
										"blaceId": arr.content.orderId
									}
								}).then(function(res) {
									_this.pur_user = res.data.data.pur_user;
									_this.buySellType = res.data.data.type;
									if(res.data.data.pur_user == _this.userId) { /*判断下单用户id与登录用户id*/
										/*卖家*/
										if(res.data.data.type == 1) { //买
											_this.$router.push({
												name: "sellddxq"
											})
										} else {
											_this.$router.push({
												name: "buyddxq"
											})
										}
									} else {
										/*买家*/
										if(res.data.data.type == 1) { //买
											_this.$router.push({
												name: "buyddxq"
											})
										} else {
											_this.$router.push({
												name: "sellddxq"
											})
										}
									}
								}, function(err) {
									console.log(err)
								})

							}, false);

						}
						/*点击弹框跳转*/
						_this.$ajax.get(_this.httpUrl.getddxqUrl, {
							headers: {
								'Authorization': 'Bearer ' + _this.token
							},
							params: {
								"blaceId": arr.content.orderId
							}
						}).then(function(res) {
							_this.pur_user = res.data.data.pur_user;
							_this.buySellType = res.data.data.type;
						}, function(err) {
							console.log(err)
						})
					}
				}
			}
			/**************接受实时推送的消息*****end************/
		},
		methods: {
			...mapMutations('user',['setData']),
			toOrder() { /*去查看*/
				if(this.pur_user == this.userId) { /*判断下单用户id与登录用户id*/
					/*卖家*/
					if(this.buySellType == 1) { //买
						this.$router.push({
							name: "sellddxq"
						})
					} else {
						this.$router.push({
							name: "buyddxq"
						})
					}
				} else {
					/*买家*/
					if(this.buySellType == 1) { //买
						this.$router.push({
							name: "buyddxq"
						})
					} else {
						this.$router.push({
							name: "sellddxq"
						})
					}
				}
			},
			buyPage(val) { /*买入分页*/
				let startCount = (val - 1) * this.pagesize;
				let endCount = val * this.pagesize;
				this.buyList = this.buyAllList.slice(startCount, endCount);
			},
			sellPage(val) { /*卖出分页*/
				let startCount = (val - 1) * this.pagesize;
				let endCount = val * this.pagesize;
				this.sellList = this.sellAllList.slice(startCount, endCount);
			},
			scrollTopAlert() { /*聚焦*/
				setTimeout(function() {
					$(".buyAlert").animate({
						scrollTop: window.innerHeight
					}, 800);
				}, 500)
			},
			sellCountJisuan(eve) { /*输入卖出数量*/
				let _this = this;
				if(this.sellCount == "") {
					this.sellPrice = "";
					this.sellCountErrorText = "";
					return false;
				}
				let regexp = /(?:\.0*|(\.\d+?)0+)$/;
				this.sellCount = eve.target.value.replace(regexp, '$1');
				var toFixedNum = Number(this.sellCount).toFixed(this.sellData.cuccency.displayNum + 1);
				this.sellCount = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				let max = 0;
				if(parseFloat(this.sellData.maxTradeLimit / this.sellData.price) > parseFloat(this.sellData.balance)) { /*判断数量*/
					max = parseFloat(this.sellData.balance).toFixed(this.sellData.cuccency.displayNum);
				} else {
					max = parseFloat(this.sellData.maxTradeLimit / this.sellData.price).toFixed(this.sellData.cuccency.displayNum);
				}
				this.sellPrice = (this.sellCount * this.sellData.price).toFixed(3 - 1);
				/*人民币价格  = 交易数量  * 交易价格*/
				if(Number(this.sellCount) > Number(max)) { /*判断输入数量是否大于限制*/
					this.sellCountErrorText = _this.$t("bbjy.Sellingvolume") + max;
					return false;
				} else {
					this.sellCountErrorText = "";
				}

			},
			sellPriceJisuan(eve) { /*输入卖出价格*/
				let _this = this;
				let regexp = /(?:\.0*|(\.\d+?)0+)$/;
				this.sellPrice = eve.target.value.replace(regexp, '$1');
				var toFixedNum = Number(this.sellPrice).toFixed(2 + 1);
				if(this.sellPrice != "") {
					this.sellPrice = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				}
				if(this.sellPrice == "") {
					this.sellPriceErrorText = ""
					return false;
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符  buyCountErrorText
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				this.sellCount = (this.sellPrice / this.sellData.price).toFixed(this.sellData.cuccency.displayNum + 1 - 1); /*交易数量 = 人民币 / 交易价格*/
				/*输入金额大于*/
				if(Number(this.sellPrice) > Number(this.sellData.maxTradeLimit)) {
					this.sellPriceErrorText = _this.$t("bbjy.Amountcannotgreater") + this.sellData.maxTradeLimit + this.sellData.legal.code;
					return false;
				} else {
					this.sellPriceErrorText = ""
				}
				/*输入金额小于*/
				if(Number(this.sellPrice) < Number(this.sellData.minTradeLimit)) {
					this.sellPriceErrorText = _this.$t("bbjy.Amountcannotsmaller") + this.sellData.minTradeLimit + this.sellData.legal.code;
					return false;
				} else {
					this.sellPriceErrorText = ""
				}

			},
			sellQuan() { /*卖出的全部*/
				/*全部数量*/
				if(parseFloat(this.sellData.maxTradeLimit / this.sellData.price) > parseFloat(this.sellData.balance)) { /*判断数量*/
					var sellCountNum = this.sellData.balance;
					if(sellCountNum.toString().indexOf(".") != -1) {
						var Int1 = sellCountNum.toString().split(".")[0];
						var Flo1 = sellCountNum.toString().split(".")[1].slice(0, this.sellData.cuccency.displayNum);
						var All1 = parseFloat(Int1 + "." + Flo1);
						this.sellCount = All1;
					} else {
						this.sellCount = sellCountNum;
					}
				} else {
					var sellCountNum2 = this.sellData.maxTradeLimit / this.sellData.price;
					if(sellCountNum2.toString().indexOf(".") != -1) {
						var Int2 = sellCountNum2.toString().split(".")[0];
						var Flo2 = sellCountNum2.toString().split(".")[1].slice(0, this.sellData.cuccency.displayNum);
						var All2 = parseFloat(Int2 + "." + Flo2);
						this.sellCount = All2;
					} else {
						this.sellCount = sellCountNum2;
					}
				}
				/*全部价格*/
				var sellPriceNum3 = this.sellCount * this.sellData.price;
				if(sellPriceNum3.toString().indexOf(".") != -1) {
					var Int3 = sellPriceNum3.toString().split(".")[0];
					var Flo3 = sellPriceNum3.toString().split(".")[1].slice(0, 2);
					var All3 = parseFloat(Int3 + "." + Flo3);
					this.sellPrice = All3;
				} else {
					this.sellPrice = sellPriceNum3;
				}

			},
			confirmSell() { /*确定卖出部分*/
				let _this = this;
				if(this.sellCount == "") {
					this.sellCountErrorText = _this.$t("bbjy.salesvolume");
					setTimeout(function() {
						_this.sellCountErrorText = "";
					}, 1000)
					return false;
				}
				if(this.sellPrice == "") {
					this.sellPriceErrorText = _this.$t("bbjy.sellingprice");
					setTimeout(function() {
						_this.sellPriceErrorText = "";
					}, 1000)
					return false;
				}
				if(this.moneyPricePass == "") {
					this.sellPriceErrorText = _this.$t("otc.Pleasepassword");
					setTimeout(function() {
						_this.sellPriceErrorText = "";
					}, 1000)
					return false;
				}
				if(this.moneyPricePass.length < 8) {
					this.sellPriceErrorText = _this.$t("bbjy.Pleasecorrectfunds");
					setTimeout(function() {
						_this.sellPriceErrorText = "";
					}, 1000)
					return false;
				}
				/*输入金额大于*/
				if(Number(this.sellPrice) > Number(this.sellData.maxTradeLimit)) {
					this.sellPriceErrorText = _this.$t("bbjy.Amountcannotgreater") + this.sellData.maxTradeLimit + this.sellData.legal.code;
					return false;
				} else {
					this.sellPriceErrorText = ""
				}
				/*输入金额小于*/
				if(Number(this.sellPrice) < Number(this.sellData.minTradeLimit)) {
					this.sellPriceErrorText = _this.$t("bbjy.Amountcannotsmaller") + this.sellData.minTradeLimit + this.sellData.legal.code;
					return false;
				} else {
					this.sellPriceErrorText = ""
				}
				this.sellPrice = (this.sellCount * this.sellData.price).toFixed(3 - 1);
				/*人民币价格  = 交易数量  * 交易价格*/
				let max = 0;
				if(parseFloat(this.sellData.maxTradeLimit / this.sellData.price) > parseFloat(this.sellData.balance)) { /*判断数量*/
					max = parseFloat(this.sellData.balance).toFixed(this.sellData.cuccency.displayNum);
				} else {
					max = parseFloat(this.sellData.maxTradeLimit / this.sellData.price).toFixed(this.sellData.cuccency.displayNum);
				}
				this.sellPrice = (this.sellCount * this.sellData.price).toFixed(3 - 1);
				/*人民币价格  = 交易数量  * 交易价格*/
				if(Number(this.sellCount) > Number(max)) { /*判断输入数量是否大于限制*/
					this.sellCountErrorText = _this.$t("bbjy.Sellingvolume") + max;
					return false;
				} else {
					this.sellCountErrorText = "";
				}
				this.$ajax.post(this.httpUrl.postxdmcUrl, {
					balance: _this.sellCount,
					pur_id: _this.sellData.id,
					money: _this.sellPrice,
					payPasswd: _this.moneyPricePass
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					//					判断状态
					if(res.data.status.code == 200) {
						//            	    	把订单号id存放到本地存储里面
						// window.localStorage.setItem("OrderId", res.data.data)
						_this.setData({'orderID':res.data.data});
						//路由显示到卖家订单详情页面
						_this.$router.push({
							name: "sellddxq"
						})
					}
				}, function(err) {
					console.log(err)
				})

			},
			alertSell(item) { /*弹出卖出框  */
				let _this = this;
				/*判断用户是否登录*/
				if(this.token == null || this.token == undefined) {
					this.$router.push({
						name: "login"
					})
					return false;
				}
				if(this.userId == item.user_id) {
					this.$message({
						showClose: true,
						message: _this.$t("bbjy.Youpostad"),
						type: 'warning',
						duration: 1500
					});
					return false;
				}
				if(item.isCheck != 0 && this.userList.auth_grade == 0) {
					this.$message({
						showClose: true,
						message: _this.$t("bbjy.Needadvancedcertification"),
						type: 'warning',
						duration: 1500
					});
					return false;
				}
				if(item.isMobile != 0 && this.userList.mobile_status == 0) {
					this.$message({
						showClose: true,
						message: _this.$t("bbjy.Needsbindphone"),
						type: 'warning',
						duration: 1500
					});
					return false;
				}
				if(item.numLimit != 0 && this.userList.traded_num < item.numLimit) {
					this.$message({
						showClose: true,
						message:  _this.$t("bbjy.RadesNumis") + item.numLimit,
						type: 'warning',
						duration: 1300
					});
					return false;
				}
				this.sellData = item;
				this.sellAlertIsShow = true;
				/*计算最大可卖出数量*/
				this.sellCountMaxplaceholder = _this.$t("bbjy.Maximumamount") + Number(item.balance).toFixed(item.cuccency.displayNum);
				/*计算最大可卖出价格*/
				if(Number(item.price * item.balance) > Number(item.maxTradeLimit)) {
					this.sellPriceMaxplaceholder =_this.$t("bbjy.Maximumprice") + Number(item.maxTradeLimit).toFixed(3 - 1);
				} else {
					this.sellPriceMaxplaceholder =_this.$t("bbjy.Maximumprice") + Number(item.price * item.balance).toFixed(3 - 1);
				}
				this.sellCountDown = 40;
				clearInterval(_this.sellTime);
				_this.sellTime = setInterval(function() { /*限定倒计时*/
					_this.sellCountDown--;
					if(_this.sellCountDown <= 0) {
						_this.cancelSell()
					}
				}, 1000)
			},
			confirmBuy() { /*确定买入币种*/
				let _this = this;
				if(this.buyCount == "") {
					this.buyCountErrorText = _this.$t("bbjy.Pleasevolume");
					setTimeout(function() {
						_this.buyCountErrorText = "";
					}, 1000)
				}
				if(this.buyPrice == "") {
					this.buyPriceErrorText = _this.$t("bbjy.Pleasebuyprice");
					setTimeout(function() {
						_this.buyPriceErrorText = "";
					}, 1000)
					return false;
				}
				let max = 0;
				if(parseFloat(this.buyData.maxTradeLimit / this.buyData.price) > parseFloat(this.buyData.balance)) { /*判断数量*/
					max = parseFloat(this.buyData.balance).toFixed(this.buyData.cuccency.displayNum);
				} else {
					max = parseFloat(this.buyData.maxTradeLimit / this.buyData.price).toFixed(this.buyData.cuccency.displayNum);
				}
				if(Number(this.buyCount) > Number(max)) { /*判断输入数量是否大于限制*/
					this.buyCountErrorText = _this.$t("bbjy.notBig") + max;
					return false;
				} else {
					this.buyCountErrorText = "";
				}
				/*输入金额大于*/
				if(Number(this.buyPrice) > Number(this.buyData.maxTradeLimit)) {
					this.buyPriceErrorText = _this.$t("bbjy.Amountcannotgreater") + this.buyData.maxTradeLimit + this.buyData.legal.code;
					return false;
				} else {
					this.buyPriceErrorText = ""
				}
				/*输入金额小于*/
				if(Number(this.buyPrice) < Number(this.buyData.minTradeLimit)) {
					this.buyPriceErrorText = _this.$t("bbjy.Amountcannotsmaller") + this.buyData.minTradeLimit + this.buyData.legal.code;
					return false;
				} else {
					this.buyPriceErrorText = ""
				}
				/*请求*/
				this.$ajax.post(this.httpUrl.postxdgmUrl, {
					pur_id: _this.buyData.id,
					/*传入订单id*/
					balance: _this.buyCount,
					money: _this.buyPrice
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						//把订单号id存放到本地存储里面
						// window.localStorage.setItem("OrderId", res.data.data)
						_this.setData({'orderID':res.data.data});
						/*跳转到买家订单详情页面*/
						_this.$router.push({
							name: "buyddxq"
						})
					}
				}, function(err) {
					console.log(err)
				})

			},
			buyPriceJisuan(eve) { /*输入买入价格*/
				let _this = this;
				let regexp = /(?:\.0*|(\.\d+?)0+)$/;
				this.buyPrice = eve.target.value.replace(regexp, '$1');
				var toFixedNum = Number(this.buyPrice).toFixed(2 + 1);
				if(this.buyPrice != "") {
					this.buyPrice = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				}
				if(this.buyPrice == "") {
					this.buyPriceErrorText = ""
					return false;
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符  buyCountErrorText
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				this.buyCount = (this.buyPrice / this.buyData.price).toFixed(this.buyData.cuccency.displayNum + 1 - 1); /*交易数量 = 人民币 / 交易价格*/
				/*输入金额大于*/
				if(this.buyPrice > this.buyData.maxTradeLimit) {
					this.buyPriceErrorText = _this.$t("bbjy.Amountcannotgreater") + this.buyData.maxTradeLimit + this.buyData.legal.code;
					return false;
				} else {
					this.buyPriceErrorText = ""
				}
				/*输入金额小于*/
				if(this.buyPrice < this.buyData.minTradeLimit) {
					this.buyPriceErrorText = _this.$t("bbjy.Amountcannotsmaller") + this.buyData.minTradeLimit + this.buyData.legal.code;
					return false;
				} else {
					this.buyPriceErrorText = ""
				}
			},
			buyCountJisuan(eve) { /*输入买入数量*/
				let _this = this;
				if(this.buyCount == "") {
					this.buyPrice = "";
					this.buyCountErrorText = "";
					return false;
				}
				let regexp = /(?:\.0*|(\.\d+?)0+)$/;
				this.buyCount = eve.target.value.replace(regexp, '$1');
				var toFixedNum = Number(this.buyCount).toFixed(this.buyData.cuccency.displayNum + 1);
				this.buyCount = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				let max = 0;
				if(parseFloat(this.buyData.maxTradeLimit / this.buyData.price) > parseFloat(this.buyData.balance)) { /*判断数量*/
					max = parseFloat(this.buyData.balance).toFixed(this.buyData.cuccency.displayNum);
				} else {
					max = parseFloat(this.buyData.maxTradeLimit / this.buyData.price).toFixed(this.buyData.cuccency.displayNum);
				}
				if(this.buyCount > max) { /*判断输入数量是否大于限制*/
					this.buyCountErrorText = _this.$t("bbjy.notBig") + max;
					return false;
				} else {
					this.buyCountErrorText = "";
				}
				this.buyPrice = (this.buyCount * this.buyData.price).toFixed(3 - 1);
				/*人民币价格  = 交易数量  * 交易价格*/
			},
			buyQuan() { /*买的全部*/
				/*全部数量*/
				if(parseFloat(this.buyData.maxTradeLimit / this.buyData.price) > parseFloat(this.buyData.balance)) { /*判断数量*/
					var num = this.buyData.balance;
					if(num.toString().indexOf(".") != -1) {
						var Int = num.toString().split(".")[0];
						var Flo = num.toString().split(".")[1].slice(0, this.buyData.cuccency.displayNum);
						var All = parseFloat(Int + "." + Flo);
						this.buyCount = All;
					} else {
						this.buyCount = num;
					}
				} else {
					var num1 = this.buyData.maxTradeLimit / this.buyData.price;
					if(num1.toString().indexOf(".") != -1) {
						var Int1 = num1.toString().split(".")[0];
						var Flo1 = num1.toString().split(".")[1].slice(0, this.buyData.cuccency.displayNum);
						var All1 = parseFloat(Int1 + "." + Flo1);
						this.buyCount = All1;
					} else {
						this.buyCount = num1;
					}
				}
				/*全部价格*/
				var numPrice = this.buyCount * this.buyData.price
				if(numPrice.toString().indexOf(".") != -1) {
					var Int2 = numPrice.toString().split(".")[0];
					var Flo2 = numPrice.toString().split(".")[1].slice(0, 2);
					var All2 = parseFloat(Int2 + "." + Flo2);
					this.buyPrice = All2;
				} else {
					this.buyPrice = numPrice;
				}
			},
			cancelBuy() { /*关闭买入弹框*/
				clearInterval(this.buyTime);
				this.buyCountDown = 40;
				this.buyAlertIsShow = false;
				this.buyCount = ""; /*数量制空*/
				this.buyPrice = ""; /*价格制空*/
			},
			cancelSell() { /*关闭卖出弹框*/
				clearInterval(this.sellTime);
				this.sellCountDown = 40;
				this.sellAlertIsShow = false;
				this.sellCount = ""; /*数量制空*/
				this.sellPrice = ""; /*价格制空*/
				this.moneyPricePass = ""; /*资金密码*/
			},
			alertBuy(item) { /*点击弹出买入框*/
				let _this = this;
				/*判断用户是否登录*/
				if(this.token == null || this.token == undefined) {
					this.$router.push({
						name: "login"
					})
					return false;
				}
				if(this.userId == item.user_id) {
					this.$message({
						showClose: true,
						message: _this.$t("bbjy.Youpostad"),
						type: 'warning',
						duration: 500
					});
					return false;
				}
				if(item.isCheck != 0 && this.userList.auth_grade == 0) {
					this.$message({
						showClose: true,
						message: _this.$t("bbjy.Needadvancedcertification"),
						type: 'warning',
						duration: 1500
					});
					return false;
				}
				if(item.isMobile != 0 && this.userList.mobile_status == 0) {
					this.$message({
						showClose: true,
						message:  _this.$t("bbjy.Needsbindphone"),
						type: 'warning',
						duration: 1500
					});
					return false;
				}
				if(item.numLimit != 0 && this.userList.traded_num < item.numLimit) {
					this.$message({
						showClose: true,
						message:  _this.$t("bbjy.RadesNumis") + item.numLimit,
						type: 'warning',
						duration: 1300
					});
					return false;
				}
				this.buyAlertIsShow = true;
				this.buyData = item; /*当前*/
				this.buyCountDown = 40;
				clearInterval(_this.buyTime);
				_this.buyTime = setInterval(function() { /*限定倒计时*/
					_this.buyCountDown--;
					if(_this.buyCountDown <= 0) {
						_this.cancelBuy()
					}
				}, 1000)
			},
			tabCurrency(data) { /*切换币种*/
				let _this = this;
				this.selectCurrencyName = data.pageIdentifier; /*当前币的名称*/
				this.currrencyID = data.id; /*当前币的id*/
				this.currencyListIsShow = false; /*选择框消失*/
				if(this.buyBoxIsShow) { /*判断当前用户选中的是否为买入或者卖出*/
					/*默认获取买列队的广告*/
					_this.buy(data.id)
				} else {
					/*默认获取卖列队的广告*/
					_this.sell(data.id)
				}
			},
			buy(id) { /*买入*/
				let _this = this;
				$(".buySellTitle p").eq(0).addClass("buy_active").siblings("p").removeClass("sell_active");
				/*获取买的*/
				this.buyBoxIsShow = true; /*展示买入的广告*/
				_this.$ajax.get(_this.httpUrl.getmmddUrl, {
					params: {
						"currency_id": id,
						"type": 1
					}
				}).then(function(res) {
					var arr = res.data.data;
					_this.buyAllList = res.data.data;
					_this.buyTotal = res.data.data.length;
					if(arr.buyList == 0) {
						_this.sellList = arr;
					} else {
						_this.buyList = arr.slice(0, _this.pagesize);
					}
				})
			},
			sell(id) { /*卖出*/
				let _this = this;
				$(".buySellTitle p").eq(1).addClass("sell_active").siblings("p").removeClass("buy_active");
				this.buyBoxIsShow = false; /*展示卖出的广告*/
				_this.$ajax.get(_this.httpUrl.getmmddUrl, {
					params: {
						"currency_id": id,
						"type": 0
					}
				}).then(function(res) {
					var arr = res.data.data;
					if(arr == false) {
						return false;
					}
					_this.sellAllList = res.data.data;
					_this.sellTotal = res.data.data.length;
					if(arr.length == 0) {
						_this.sellList = arr;
					} else {
						_this.sellList = arr.slice(0, _this.pagesize);
					}
				})
			},
			dingdan() { /*点对点订单*/
				if(this.token == null || this.token == undefined) {
					this.$router.push({
						name: "login"
					})
					return false;
				}
				this.$router.push({
					name: "fbdd"
				})
			}
		}
	}
</script>
<style lang="scss">
	#fbjy {
		.el-pager li {
			/*分页的背景颜色*/
			background: none;
			color: #fff;
		}
		.el-pagination .btn-next,
		.el-pagination .btn-prev {
			background: none;
			color: #fff;
		}
		.el-pager li.active,
		.el-pagination button:hover {
			color: #a4acff;
		}
		.el-pagination button:disabled {
			color: #fff;
			background: none;
		}
	}
</style>
<style lang="scss" scoped>
	#fbjy {
		width: 100%;
		color: #fff;
	}
	/*点对点交易*/

	.fbjy_header {
		width: 100%;
		height: .45rem;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 66;
		background: #161a32;
		.header_conter {
			width: 100%;
			height: .45rem;
			display: flex;
			align-items: center;
			justify-content: center;
			border-bottom: .01rem solid #121528;
			.font {
				font-size: .15rem;
				font-weight: 500;
			}
			position:relative;
			.icofont {
				color: #4d54a9;
				margin-left: .05rem;
			}
			.currencyList {
				position: absolute;
				top: .4rem;
				left: 55%;
				z-index: 9999;
				width: .7rem;
				.currencyList_item {
					width: .7rem;
					height: .3rem;
					text-align: center;
					line-height: .3rem;
					background: #474da0;
					border-bottom: 1px solid #303678;
				}
				.currencyList_item:nth-last-of-type(1) {
					border-bottom: none;
				}
				.currencyList_item:hover {
					background: #3f4494;
				}
			}
		}
	}
	/*分页*/

	.pageCount {
		width: 100%;
		height: .5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.noData {
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		text-align: center;
		background: #161a32;
		position: absolute;
	}
	/*买卖列表*/

	.BuySellList {
		width: 100%;
		height: 77vh;
		overflow-x: hidden;
		overflow-y: auto;
		.content {
			background: #161a32;
			margin-bottom: .1rem;
			.userName {
				width: 97%;
				height: .3rem;
				line-height: .3rem;
				margin-left: 3%;
				box-sizing: border-box;
				border-bottom: 1px solid #262B61;
				display: flex;
				justify-content: space-between;
				.oleft {
					.iconfont {
						font-size: .14rem;
						color: #3b4490;
					}
				}
				.oright {
					margin-right: .05rem;
				}
			}
		}
		.BuySellList_wrapper {
			width: 100%;
			height: .8rem;
			display: flex;
			box-sizing: border-box;
			padding-left: .05rem;
			li:nth-of-type(1) {
				flex: .7;
			}
			li:nth-of-type(2) {
				flex: 1.3;
			}
			li {
				flex: 1.1;
				height: .8rem;
				box-sizing: border-box;
				padding-left: .05rem;
				.top {
					width: 100%;
					height: .4rem;
					display: flex;
					align-items: center;
					.iconfont {
						margin-right: .05rem;
					}
					span {
						margin-right: .05rem;
					}
				}
				.red {
					color: #b1371a;
				}
				.bottom {
					width: 100%;
					height: .4rem;
					display: flex;
					flex-direction: column;
					dd {
						height: 50%;
					}
					dd:nth-of-type(1) {
						font-weight: 520;
					}
					.blue {
						color: #3b4490;
					}
				}
			}
		}
	}
	/*买入卖出头部*/

	.buySellTitle {
		width: 100%;
		height: .35rem;
		position: fixed;
		left: 0;
		top: .46rem;
		display: flex;
		justify-content: space-between;
		z-index: 22;
		background: #161a32;
		p,
		div {
			width: 33.3%;
			height: .35rem;
			display: flex;
			align-items: center;
			justify-content: center;
			span {
				display: inline-block;
				height: .33rem;
				line-height: .33rem;
				box-sizing: border-box;
			}
		}
	}
	/*占位高度*/

	.oHeight {
		width: 100%;
		height: .85rem;
	}
	/*买入头部选中颜色*/

	.buy_active {
		color: #02c289;
		span {
			border-bottom: 0.02rem solid #02c289;
		}
	}
	/*卖出头部选中的颜色*/

	.sell_active {
		color: #ea6954;
		span {
			border-bottom: 0.02rem solid #ea6954;
		}
	}

	$alert_bg:#323560;
	/*弹框背景*/

	$jy_bg:#4b5090;
	/*交易背景*/

	$input_bg:#262746;
	/*文本框背景*/

	$bottom_border:#1f2353;
	/*黑线*/

	$input_border:#5c63d5;
	/*文本框颜色*/

	$gao_liang:#96a1fd;
	/*点击全部分字体*/
	/*蒙版*/

	.men_back {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
		background: rgba(0, 0, 0, 0.5);
	}
	/*消息弹出框*/

	.NewNews {
		width: 90%;
		position: fixed;
		left: 5%;
		top: 20%;
		z-index: 100;
		background: $alert_bg;
		color: #fff;
		.NewNews_header {
			width: 100%;
			height: .45rem;
			display: flex;
			justify-content: space-between;
			line-height: .45rem;
			box-sizing: border-box;
			padding: 0 .1rem;
			border-bottom: 0.01rem solid $bottom_border;
			.iconfont {
				font-size: .14rem;
			}
		}
		.NewNews_content {
			width: 100%;
			height: .8rem;
			text-align: center;
			line-height: .8rem;
			.blue {
				color: #7e78c2;
			}
		}
		.NewNews_bottom {
			width: 100%;
			height: .4rem;
			text-align: center;
			line-height: .4rem;
			border-top: 0.01rem solid $bottom_border;
		}
	}
	/*买入弹框*/

	.buyAlert {
		width: 90%;
		height: 100%;
		border-radius: .02rem;
		position: fixed;
		left: 5%;
		top: 10%;
		z-index: 100;
		overflow-y: auto;
		.content {
			background: $alert_bg;
		}
		.buyAlert_title {
			width: 92%;
			margin: 0 auto;
			height: .38rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: .15rem;
			border-bottom: 1px solid $bottom_border;
		}
		/*限额*/
		.Quota {
			width: 100%;
			height: .45rem;
			display: flex;
			align-items: center;
			.text {
				display: inline-block;
				width: 20%;
				text-align: center;
			}
			/*input输入框*/
			.oInput {
				width: 2.21rem;
				height: .3rem;
				display: flex;
				line-height: .3rem;
				border: 1px solid $input_border;
				border-radius: .02rem;
				background: $input_bg;
				input {
					width: 1.8rem;
					height: .3rem;
					box-sizing: border-box;
					padding: .1rem;
					color: #fff;
					background: none;
					border: none;
					border-right: 1px solid $input_border;
				}
				input::-webkit-input-placeholder {
					color: #fff;
				}
				.quan {
					display: inline-block;
					width: .4rem;
					height: .3rem;
					text-align: center;
				}
			}
			.pass {
				width: 2.21rem;
				input {
					width: 100%;
					border-right: none;
				}
			}
		}
		.error {
			color: red;
			text-align: center;
      padding-top:0.05rem;
      padding-bottom:0.05rem;
		}
		/*取消确认按钮*/
		.cancelconfirm {
			width: 100%;
			height: .38rem;
			line-height: .38rem;
			display: flex;
			border-top: 1px solid $bottom_border;
			p {
				width: 50%;
				box-sizing: border-box;
				text-align: center;
			}
			p:nth-of-type(1) {
				border-right: 1px solid $bottom_border;
			}
		}
		/*交易价格*/
		.price {
			width: 2.52rem;
			height: .43rem;
			line-height: .43rem;
			background: $jy_bg;
			border-radius: .02rem;
			margin: .1rem auto;
			display: flex;
			justify-content: center;
			span {
				margin: 0 .02rem;
			}
			.currency {
				margin: 0 .05rem;
			}
		}
	}
</style>
