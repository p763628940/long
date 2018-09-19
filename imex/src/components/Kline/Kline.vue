<template>
	<div id="Kline">
		<!--k线图头部-->
		<div class="Kline_header">
			<div class="Kline_header_content">
				<span class="Return" @click="$router.go(-1)">
					<i class="iconfont icon-zuojiantou"></i>
				</span>
				<span class="currency">{{viewData.forMoney}}/{{viewData.mainCurrency}}</span>
				<span>
					<i class="iconfont icon-xingxingman" :class="{'active':itemslocalstorge.indexOf(Number(viewData.matchcoin_id))!=-1}" @click="Collection($event)"></i>
				</span>
			</div>
		</div>
		<div class="oHeight"></div>
		<!--价格--涨幅--24h--高--低-->
		<div class="currencyList">
			<dl class="top">
				<dd>
					<span class="price red">{{viewData.price}}</span>
					<span class="yueDen">≈{{viewData.cny}}CNY</span>
				</dd>
				<dd>
					<span class="updown">{{$t("list.Rose")}}</span>
					<span :class="{'green':viewData.updown>0,'red':viewData.updown<0}">{{viewData.updown  | number(2)}}%</span>
				</dd>
			</dl>
			<dl class="bottom">
				<dd>
					<span class="high">{{$t("list.high")}}    {{viewData.high}}</span>
					<span class="low">{{$t("list.low")}}    {{viewData.low}}</span>
				</dd>
				<dd>
					<span class="hour">{{$t("list.The_amount_of_24H")}}</span>
					<span>{{viewData.hour24}}</span>
				</dd>
			</dl>
		</div>
		<!--k线图-->
		<div id="chart" height="265px"></div>
		<!--深度和成交-->
		<div class="title">
			<p @click="shendu()" :class="{'active':sellBuyListIsShow&&introduce==false}">
				<span>{{$t("list.Deep_merger")}}</span>
			</p>
			<p @click="chengjiao()" :class="{'active':sellBuyListIsShow==false&&introduce==false}">
				<span>{{$t("list.Deal")}}</span>
			</p>
			<p @click="introduce=true" :class="{'active':introduce==true}">
				<span>{{$t("list.Introduction")}}</span>
			</p>
		</div>
		<!--买卖盘列表-->
		<div class="sellBuyList" v-show="sellBuyListIsShow&&introduce==false">
			<div class="sellBuyList_title">
				<p class="oleft">
					<span class="mai">{{$t("list.buy")}}</span>
					<span class="count">{{$t("list.Number")}}({{viewData.forMoney}})</span>
				</p>
				<p class="center">
					<span>{{$t("list.Price")}}({{viewData.mainCurrency}})</span>
				</p>
				<p class="oright">
					<span class="count">{{$t("list.Number")}}({{viewData.forMoney}})</span>
					<span class="mai">{{$t("list.Number")}}</span>
				</p>
			</div>
			<!--买卖列表内容-->
			<div class="sellBuyList_content">
				<!--买入列表-->
				<ul class="buyList">
					<li v-for="(item,index) in buyList.slice(0,20)">
						<p class="index">{{index+1}}</p>
						<p class="count">{{item.count| number(viewData.count_decimals)}}</p>
						<p class="price">{{item.price | number(viewData.decimals)}}</p>
						<dd class="progress" :style="{'width':item.count/MaximumValue*100+'%'}"></dd>
					</li>
					<div class="noData" v-show="buyList.length==0">{{$t("list.NoMarket")}}</div>
				</ul>
				<!--卖出列表-->
				<ul class="sellList">
					<li v-for="(item,index) in sellList.slice(0,20)">
						<p class="price">{{item.price| number(viewData.decimals)}}</p>
						<p class="count">{{item.count| number(viewData.count_decimals)}}</p>
						<p class="index">{{index+1}}</p>
						<dd class="progress" :style="{'width':item.count/MaximumValue*100+'%'}"></dd>
					</li>
					<div class="noData" v-show="sellList.length==0">{{$t("list.NoMarket")}}</div>
				</ul>
			</div>
		</div>
		<!--实时成交-->
		<div class="shishiList" v-show="!sellBuyListIsShow&&introduce==false">
			<ul class="shishiList_title">
				<li>
					<span>{{$t('list.time')}}</span>
				</li>
				<li>
					<span>{{$t('list.direction')}}</span>
				</li>
				<li>
					<span class="price">{{$t('list.Price')}}({{viewData.mainCurrency}})</span>
				</li>
				<li>
					<span>{{$t('list.Number')}}({{viewData.forMoney}})</span>
				</li>
			</ul>
			<!--实时列表内容部分-->
			<ul class="shishiList_content" v-for="item in shishiList.slice(0,20)">
				<li>
					<span>{{formatTime(item.time).split(" ")[1]}}</span>
				</li>
				<li>
					<span class="red" v-show="item.in_out==false">{{$t("list.Sell_BTC")}}</span>
					<span class="green" v-show="item.in_out">{{$t("list.Buy_BTC")}}</span>
				</li>
				<li>
					<span class="price">{{item.price| number(viewData.decimals)}}</span>
				</li>
				<li>
					<span>{{item.count | number(viewData.count_decimals)}}</span>
				</li>
			</ul>
		</div>
		<!--币种简介内容-->
		<div class="introduce" v-show="introduce" v-html="currencyListHtml"></div>

		<!--底部买入卖出-->
		<div class="oHeight"></div>
		<div class="buySell_bottom">
			<button class="buy" @click="buy">{{$t("list.Buy_BTC")}}</button>
			<button class="sell" @click="sell">{{$t("list.Sell_BTC")}}</button>
		</div>
	</div>
</template>

<script>
	import $ from "jquery"
	import store from "../../store"
	import { Toast, MessageBox } from 'mint-ui';
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				/*深度合并*/
				viewData: { //页面要展示的数据
					matchcoin_id: this.$route.params.id,
					mainCurrency: "", //主币
					forMoney: "", //对币
					price: "", //价格
					updown: "", //涨幅
					low: "", //最低价
					high: "", //最高价
					hour24: "", //24小时成交量
					cny: "", ///最新价
					decimals: 0, ///限定价格
					count_decimals: 0 ///限定数量
				},
				matchcoins: [],
				/*币种列表*/
				sellBuyListIsShow: true,
				/*默认显示买列表*/
				buyList: [],
				/*买的列表*/
				sellList: [],
				/*卖的列表*/
				matchcoin_id: this.$route.params.id,
				/*当前币对ID*/
				MaximumValue: 0,
				/*买卖列队最大值*/
				shishiList: [],
				/*实时成交数据*/
				klineList: [],
				/*k线数据*/
				introduce: false,
				/*简介币种的内容*/
				yes_id: 0,
				/*对币ID*/
				currencyListHtml: "",
				/*币种资料介绍内容*/
				itemslocalstorge: store.fetch(), ///本地存储未登录状态	   --- 收藏列表
			}
		},
		watch: { //监听
			itemslocalstorge: { ///收藏的数组
				handler: function(val, oldVal) {
					store.save(val)
				},
				deep: true
			}
		},
		computed:{
			...mapGetters('setting',['urlPrefix']),
			...mapState('setting',['creativityWarning']),
		},
		created() {
			let _this = this;
			/*获取所有币对*/
			this.$ajax.get(this.httpUrl.coin_matching,{
			params: {
				symbol: this.urlPrefix,
				...(this.userInfo ? { code: this.userInfo.user_id } : {}),
			}
		}).then(function(res) {
				_this.matchcoins = res.data.data;
				/*判断当前的币对id是否与币种列表里面的相匹配*/
				for(let i = 0; i < _this.matchcoins.length; i++) { /*拿到页面需要的值*/
					for(let j = 0; j < _this.matchcoins[i].matchcoins.length; j++) {
						if(_this.matchcoins[i].matchcoins[j].matchcoin_id == _this.viewData.matchcoin_id) {
							_this.viewData.mainCurrency = _this.matchcoins[i].pageIdentifier;
							_this.viewData.forMoney = _this.matchcoins[i].matchcoins[j].pageIdentifier;
							_this.viewData.price = _this.matchcoins[i].matchcoins[j].price;
							_this.viewData.updown = _this.matchcoins[i].matchcoins[j].updown;
							_this.viewData.low = _this.matchcoins[i].matchcoins[j].low;
							_this.viewData.high = _this.matchcoins[i].matchcoins[j].high;
							_this.viewData.hour24 = _this.matchcoins[i].matchcoins[j].hour24;
							_this.viewData.cny = _this.matchcoins[i].matchcoins[j].cny;
							_this.viewData.decimals = _this.matchcoins[i].matchcoins[j].decimals;
							_this.viewData.count_decimals = _this.matchcoins[i].matchcoins[j].count_decimals;
							_this.yes_id = _this.matchcoins[i].matchcoins[j].id;
						}
					}
				}
			if(!_this.creativityWarning && _this.viewData.mainCurrency == 'IMX'){

				const h = _this.$createElement;
				let str = _this.$t('shouye.DialogWarning');
				//  setTimeout(()=>
				MessageBox({
					message:str.split('\n').map((item)=>'<p>'+item+'</p>').join(''),//h('div',null,str.split('\n').map((item)=>h('p',{ style: 'text-align: left;' },item))),
					title:_this.$t('shouye.DialogTitle'),
					showCancelButton:false,
					confirmButtonText:_this.$t('shouye.DialogConfirm'),
					confirmButtonClass:'alert-confirm-button',
					closeOnClickModal:false,
					}).then(function (){
						_this.setData({creativityWarning:1});
					})
				//  ,5000);

			}
				/*获取币详细介绍*/
				_this.$ajax.get(_this.httpUrl.coinDetailed, {
					params: {
						"currency_id": _this.yes_id
					}
				}).then(function(res) {
					_this.currencyListHtml = res.data.data.content;
				}, function(err) {
					console.log(err)
				})

			}, function(err) {
				console.log(err)
			})
			///获取实时成交数据
			this.$ajax.get(this.httpUrl.shishi, {
				params: {
					'matchcoin_id': _this.matchcoin_id
				}
			}).then(function(res) {
				_this.shishiList = res.data.data;
			}, function(error) {
				console.log(error)
			})
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
			...mapMutations('setting',['setData']),
			buy() { /*买入*/
				this.$router.push({
					name: "bbjy",
					params: {
						id: this.matchcoin_id,
						buy: true
					}
				})
			},
			sell() { /*卖出*/
				this.$router.push({
					name: "bbjy",
					params: {
						id: this.matchcoin_id,
						sell: true
					}
				})
			},
			shendu() { /*深度*/
				this.sellBuyListIsShow = true; /*显示深度数据*/
				this.introduce = false;
			},
			chengjiao() { /*成交*/
				this.sellBuyListIsShow = false; /*显示实时列表数据*/
				this.introduce = false;
			},
			getMaxValue: function(buyList, sellList) { /*获取买卖列队的最大值*/
				var buyMax = 0;
				var sellMax = 0;
				if(buyList.length == 0) { //判断买列队是否为空
					buyMax = 0;
				} else {
					buyMax = buyList[0].count; //买的最大值
					for(let i = 0; i < buyList.length; ++i) {
						if(buyMax < buyList[i].count) {
							buyMax = buyList[i].count
						}
					}
				}
				if(sellList.length == 0) {
					sellMax = 0;
				} else {
					sellMax = sellList[0].count; //卖的最大值
					for(let j = 0; j < sellList.length; ++j) {
						if(sellMax < sellList[j].count) {
							sellMax = sellList[j].count
						}
					}
				}
				if(buyMax > sellMax) { //比较买卖最高和最低值
					return this.MaximumValue = parseFloat(buyMax);
				} else {
					return this.MaximumValue = parseFloat(sellMax);
				}
			},
			Collection(e) { /*点击收藏或者取消收藏*/
				let _this = this;
				if(e.target.className == 'iconfont icon-xingxingman active') { //取消
					e.target.className = 'iconfont icon-xingxingman';
					for(let i = 0; i < this.itemslocalstorge.length; i++) { //删除本地存的内容
						if(this.itemslocalstorge[i] == this.matchcoin_id) {
							this.itemslocalstorge.splice(i, 1)
						}
					}
				} else { //收藏
					e.target.className = 'iconfont icon-xingxingman active';
					//判断是否包含这个值
					if(this.itemslocalstorge.indexOf(this.matchcoin_id) == -1) {
						this.itemslocalstorge.push(Number(this.matchcoin_id));
					}
				}

			},
		},
		mounted() {
			let _this = this;
			/*获取买卖列表*/
			this.$ajax.get(this.httpUrl.buy_sell_queue, {
				params: {
					"matchcoin_id": _this.matchcoin_id
				}
			}).then(function(res) {
				_this.buyList = res.data.data.buy_queues; //买列队
				_this.sellList = res.data.data.sell_queues; //卖列队
				/*计算最大值*/
				_this.getMaxValue(_this.buyList, _this.sellList);
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
				if(res.data.status.code == -200) {
					_this.$message({
						message: res.data.status.message,
						type: 'error'
					});
				}
			}, function(err) {
				console.log(err)
			})

			/***获取实时推送数据开始*****/
			// var ws = new WebSocket(_this.wsIp); ///定义全局
			var ws = this.ws;
			//传递币对ID开始//
			ws.onopen = function() {
				if(_this.token == null || _this.token  == "undefined") {
					ws.send('{"mid":"' + _this.matchcoin_id + '"}')
				} else {
					ws.send('{"mid":"' + _this.matchcoin_id + '","bind_id":"' + _this.userInfo.user_id + '"}')
				}
			}
			//传递币对ID结束//

			function unsubscribeBars(UID) {
				//console.log(UID);
			}

			function subscribeBars(symbolInfo, resolution, onRealtime, subscriberUID, onResetCacheNeededCallback) {
				ws.onmessage = function(e) {
					var arr = JSON.parse(e.data);
					if(arr.type == "ping") { ////判断type
						ws.send('{"pong":' + Date.now() + '}');
					} else if(arr.type == "socket") {
						for(let i = 0; i < arr.message.length; i++) {
							if(arr.message[i].type == "cachekline" + _this.matchcoin_id) { ////推送k线
								if(resolution == "1") {
									onRealtime(arr.message[i].message["min1"]);
								}
								if(resolution == "5") {
									onRealtime(arr.message[i].message["min5"]);
								}
								if(resolution == "15") {
									onRealtime(arr.message[i].message["min15"]);
								}
								if(resolution == "30") {
									onRealtime(arr.message[i].message["min30"]);
								}
								if(resolution == "60") {
									onRealtime(arr.message[i].message["min60"]);
								}
								if(resolution == "240") {
									onRealtime(arr.message[i].message["min240"]);
								}
								if(resolution == "1D") {
									onRealtime(arr.message[i].message["day1"]);
								}
								if(resolution == "1W") {
									onRealtime(arr.message[i].message["week1"]);
								}
								if(resolution == "1M") {
									onRealtime(arr.message[i].message["mon1"]);
								}
							} else if(arr.message[i].type == "buySellQueue" + _this.matchcoin_id) { ////推送买卖列队
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
							} else if(arr.message[i].type == "matchcoins") {
								let arrList = arr.message[i].message;
								for(let n = 0; n < arrList.length; n++) {
									for(let i = 0; i < _this.matchcoins.length; i++) { /*拿到页面需要的值*/
										for(let j = 0; j < _this.matchcoins[i].matchcoins.length; j++) {
											if(_this.matchcoins[i].matchcoins[j].matchcoin_id == arrList[n].id) {
												_this.matchcoins[i].matchcoins[j].price = arrList[n].price;
												_this.matchcoins[i].matchcoins[j].updown = arrList[n].updown;
												_this.matchcoins[i].matchcoins[j].hour24 = arrList[n].hour24;
												_this.matchcoins[i].matchcoins[j].high = arrList[n].high;
												_this.matchcoins[i].matchcoins[j].low = arrList[n].low;
												_this.matchcoins[i].matchcoins[j].cny = arrList[n].cny;
											}
											if(arrList[n].id == _this.viewData.matchcoin_id) {
												_this.viewData.price = arrList[n].price;
												_this.viewData.updown = arrList[n].updown;
												_this.viewData.high = arrList[n].high;
												_this.viewData.hour24 = arrList[n].hour24;
												_this.viewData.low = arrList[n].low;
												_this.viewData.cny = arrList[n].cny;
											}
										}
									}
								}
							} else if(arr.message[i].type == "realtimeDone_" + _this.matchcoin_id) {
								////添加一条数据
								_this.shishiList.unshift(arr.message[i].message);
								if(_this.shishiList.length >= 50) { ////只显示50条数据
									_this.shishiList.pop()
								}
							}
						}
					}
				}
			}

			function getBars(symbolInfo,
				resolution,
				rangeStartDate,
				rangeEndDate,
				onHistoryCallback,
				onErrorCallback,
				firstDataRequest) {
				/////获取k线部分
				_this.$ajax.get(_this.httpUrl.kline, {
					params: {
						"matchcoin_id": _this.matchcoin_id,
						/*************拼接币对ID*****************/
						"time_type": resolution
					}
				}).then(function(res) {
					_this.klineList = res.data.data;
					////后面执行
					if(_this.klineList.length == 0 || rangeEndDate <= _this.klineList[0].time / 1000) {
						onHistoryCallback([], {
							noData: true
						});
					} else {
						onHistoryCallback(_this.klineList, {
							noData: false
						});
					}
				}, function(err) {
					console.log(err)
				})
			}

			const datafeed = {
				onReady,
				resolveSymbol,
				getBars,
				subscribeBars,
				unsubscribeBars
			}
			/*拿到当前的时区的ID---插件方法--*/
			var timezone = jstz.determine();
			const options = {
				autosize: true,
				container_id: "chart", ///整体容器
				datafeed,
				debug: false, ///控制台日志
				timezone: timezone.name(), ///时区标识
				library_path: "static/charting_library/", ///引用包的路径static/charting_library/
				locale: _this.lang == "en" ? "en" : _this.lang == "ko" ? "ko" : "zh", //切换语言
				interval: "15", ///默认显示分钟数
				drawings_access: {
					type: 'black',
					tools: [{
						name: "Regression Trend"
					}]
				},
				disabled_features: ["header_resolutions", "header_fullscreen_button", "compare_symbol", "display_market_status", "go_to_date", "header_chart_type", "header_compare", "header_interval_dialog_button", "header_screenshot", "header_symbol_search", "header_undo_redo", "legend_context_menu", "show_hide_button_in_legend", "show_interval_dialog_on_key_press", "snapshot_trading_drawings", "symbol_info", "timeframes_toolbar", "use_localstorage_for_settings", "volume_force_overlay"],
				enabled_features: ["dont_show_boolean_study_arguments", "hide_last_na_study_output", "move_logo_to_main_pane", "same_data_requery", "side_toolbar_in_fullscreen_mode", "disable_resolution_rebuild"],
				custom_css_url: "night.css?v.1.1",
				toolbar_bg: "#181928", //工具栏验颜色
				overrides: {
					"volumePaneSize": "tiny",
					"paneProperties.background": "#141738", ///背景颜色
					"paneProperties.vertGridProperties.color": "#1F2943", ///竖线
					"paneProperties.horzGridProperties.color": "#1F2943", ///横线
					"paneProperties.crossHairProperties.color": "#9396A5", ////提示坐标线
					"scalesProperties.textColor": "#fff", ///时间字体颜色
					"symbolWatermarkProperties.transparency": 90,
					"scalesProperties.lineColor": "#1F2943", //边框线
					//"paneProperties.legendProperties.showLegend": false ,/*收起加减*/
					"volumePaneSize": "medium",
				},
				//				symbol: 'AAPL',
				loading_screen: { /*加载背景*/
					backgroundColor: "#141738"
				},

			}

			function onReady(callback) { /*时间*/
				const configuration = {
					exchanges: [],
					supported_resolutions: ["1", "5", "15", "30", "60", "240", "1D", "1W", "1M"],
					supports_group_request: false,
					supports_marks: false,
					supports_time: true,
					supports_timescale_marks: false,
					symbols_types: [],
				};
				setTimeout(function() {
					callback(configuration);
				}, 0);
			}
			if(_this.viewData.decimals==0){
				_this.viewData.decimals = 4;
			}

			function resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
				const configuration = {
					description: _this.viewData.forMoney + "/" + _this.viewData.mainCurrency, //币种名称
					name: _this.viewData.mainCurrency + _this.viewData.forMoney, //name
					ticker: "BTC",
					currency_code: "en",
					data_status: "streaming",
					// exchange: exchangeName,
					expired: false,
					force_session_rebuild: true,
					// full_name: symbol.description,
					has_daily: true,
					has_empty_bars: true,
					has_intraday: true,
					has_no_volume: false,
					has_seconds: true,
					has_weekly_and_monthly: true,
					//intraday_multipliers: ["1", "5", "15", "30", "60", "240"],
					// listed_exchange: exchangeName,
					minmov: 1,
					pricescale: Math.pow(10, _this.viewData.decimals),
					/*计算位数*/
					// seconds_multipliers: [],
					session: "0000-0000:1234567",
					supported_resolutions: ["1", "5", "15", "30", "60", "240", "1D", "1W", "1M"],
					timezone: "UTC",
					type: "bitcoin",
					volume_precision: 0,
				};
				setTimeout(function() {
					onSymbolResolvedCallback(configuration);
				}, 0);
			}
			var widget = new TradingView.widget(options);
			widget.onChartReady(function() {
				widget.chart().executeActionById("drawingToolbarAction");
				widget.chart().createStudy("Moving Average", false, false, [5], function(guid) {
					console.log()
				}, {
					"plot.color.0": "rgb(150, 95, 196)"
				});
				widget.chart().createStudy("Moving Average", false, false, [10], function(guid) {
					console.log()
				}, {
					"plot.color.0": "rgb(132, 170, 213)"
				});
				widget.chart().createStudy("Moving Average", false, false, [30], function(guid) {
					console.log()
				}, {
					"plot.color.0": "rgb(85, 178, 99)"
				});

				widget.createButton()
					.on('click', function(e) {
						$(this).addClass("selected").parent(".group").siblings(".group").find(".button").removeClass("selected");
						widget.chart().setChartType(1);
						widget.setSymbol("", '5');
					})
					.append($('<span>5</span>'));
				widget.createButton().addClass("selected")
					.on('click', function(e) {
						$(this).addClass("selected").parent(".group").siblings(".group").find(".button").removeClass("selected");
						widget.chart().setChartType(1);
						widget.setSymbol("", '15');
					})
					.append($('<span>15</span>'));
				widget.createButton()
					.on('click', function(e) {
						$(this).addClass("selected").parent(".group").siblings(".group").find(".button").removeClass("selected");
						widget.chart().setChartType(1);
						widget.setSymbol("", '30');
					})
					.append($('<span>30</span>'));
				widget.createButton()
					.on('click', function(e) {
						$(this).addClass("selected").parent(".group").siblings(".group").find(".button").removeClass("selected");
						widget.chart().setChartType(1);
						widget.setSymbol("", '60');
					})
					.append($('<span>H</span>'));
				widget.createButton()
					.on('click', function(e) {
						$(this).addClass("selected").parent(".group").siblings(".group").find(".button").removeClass("selected");
						widget.chart().setChartType(1);
						widget.setSymbol("", '240');
					})
					.append($('<span>4H</span>'));
				widget.createButton()
					.on('click', function(e) {
						$(this).addClass("selected").parent(".group").siblings(".group").find(".button").removeClass("selected");
						widget.chart().setChartType(1);
						widget.setSymbol("", '1D');
					})
					.append($('<span>D</span>'));
			});
			/****获取实时推送数据结束****/

		},

	}
</script>



<style lang="scss" scoped>
	$bg_color:rgb(20, 23, 56);
	$buy_color:#02c289;
	/*买入*/

	$sell_color:#ea6954;



	.red {
		color: $sell_color;
	}

	.green {
		color: $buy_color;
	}

	.sell {
		/*卖*/
		background: $sell_color !important;
	}

	.buy {
		/*买*/
		background: $buy_color !important;
	}
	/*卖出*/

	#Kline {
		width: 100%;
		height: 100%;
		color: #fff;
	}


	/*k线头部*/

	.Kline_header {
		width: 100%;
		height: .5rem;
		position: fixed;
		top: 0;
		left: 0;
		background: rgb(20, 23, 56);
		z-index: 786;
		.Kline_header_content {
			width: 100%;
			height: .5rem;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			justify-content: space-between;
			padding: 0 .1rem;
			position: relative;
			.currency {
				align-self: center;
				position: absolute;
				left: 25%;
				top: 0;
				font-size: .15rem;
				width: 50%;
				height: .5rem;
				line-height: .5rem;
				text-align: center;
			}
			.active {
				color: #0095f0 !important;
			}
			.icon-xingxingman {
				color: #5c72aa;
			}
		}
	}

	.oHeight {
		height: .55rem;
	}
	/*图表*/

	#chart {
		width: 100%;
		height: 2.65rem;
		/*background: red;*/
	}
	/*当前选择的币种的信息*/

	.currencyList {
		width: 100%;
		background: $bg_color;
		dl {
			width: 100%;
			height: .3rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 0 .1rem;
		}
		.top {
			.price {
				/*价格*/
				font-size: .17rem;
				margin-right: .1rem;
			}
			.yueDen {
				/*人民币*/
				color: #b9c0ff;
			}
			dd:nth-of-type(2) {
				width: 35%;
				display: flex;
				align-items: center;
				.updown {
					text-align: center;
				}
				span {
					display: inline-block;
					width: 50%;
					text-align: left;
				}
			}
		}
		.bottom {
			dd:nth-of-type(1) {
				width: 50%;
				display: flex;
				align-items: center;
				span {
					width: 50%;
					text-align: left;
				}
				.low {
					text-align: center;
				}
			}
			.hour {
				margin-right: .1rem;
			}
		}
	}
	/*买入卖出*/

	.buySell_bottom {
		width: 100%;
		height: .55rem;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 666;
		display: flex;
		justify-content: center;
		align-items: center;
		background: $bg_color;
		button {
			width: 1.3rem;
			height: .38rem;
			background: none;
			border-radius: .03rem;
			border: none;
			margin-right: .1rem;
		}
	}
	/*深度和成交*/

	.title {
		width: 100%;
		height: .5rem;
		display: flex;
		color: #5f7bc0;
		p {
			width: 33.3%;
			text-align: center;
			line-height: .5rem;
			span {
				padding-bottom: .05rem;
				font-size: .13rem;
			}
		}
	}

	.active {
		color: #fff;
		span {
			border-bottom: .02rem solid #fff;
		}
	}
	/*买卖盘*/

	.sellBuyList {
		width: 100%;
		background: $bg_color;
		.sellBuyList_title {
			width: 100%;
			height: .38rem;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding: 0 .07rem;
			justify-content: space-between;
			color: #5f7bc0;
			.count {
				margin: 0 .05rem;
			}
		}
	}
	/*买入卖出列表内容*/

	.sellBuyList_content {
		width: 100%;
		display: flex;
		box-sizing: border-box;
		padding-bottom: .3rem;
		overflow: hidden;
		.buyList,
		.sellList {
			width: 50%;
			box-sizing: border-box;
		}
		.buyList {
			li {
				width: 100%;
				height: .2rem;
				line-height: .2rem;
				display: flex;
				box-sizing: border-box;
				margin-top: .1rem;
				padding-left: .07rem;
				opacity: 1.5;
				position: relative;
				.index {
					width: .24rem;
				}
				.count {
					width: .55rem;
					margin: 0 .08rem;
				}
				.price {
					flex: 1;
					text-align: right;
					box-sizing: border-box;
					padding-right: .02rem;
					color: $buy_color;
				}
				.progress {
					height: .2rem;
					background: $buy_color;
					opacity: 0.1;
					position: absolute;
					right: 0;
					top: 0rem;
				}
			}
		}
		.sellList {
			li {
				width: 100%;
				height: .2rem;
				line-height: .2rem;
				display: flex;
				box-sizing: border-box;
				margin-top: .1rem;
				padding-left: .07rem;
				z-index: 666;
				position: relative;
				.index {
					width: .24rem;
					text-align: right;
					box-sizing: border-box;
					padding-right: .1rem;
				}
				.count {
					width: .55rem;
					margin: 0 .15rem 0 0;
					text-align: right;
				}
				.price {
					flex: 1;
					text-align: left;
					box-sizing: border-box;
					padding-right: .02rem;
					color: $sell_color;
				}
				.progress {
					height: .2rem;
					background: $sell_color;
					position: absolute;
					opacity: 0.1;
					left: 0;
					top: 0rem;
				}
			}
		}
	}
	/*判断有无数据*/

	.noData {
		width: 100%;
		line-height: .3rem;
		text-align: center;
		color: #fff;
	}
	/*实时成交部分*/

	.shishiList {
		width: 100%;
		background: $bg_color;
		.shishiList_title {
			width: 100%;
			height: .35rem;
			display: flex;
			align-items: center;
			color: #5f7bc0;
			box-sizing: border-box;
			padding: 0 .1rem;
			justify-content: space-between;
			li:nth-of-type(1) {
				text-align: left;
				flex: 0.7;
			}
			li:nth-of-type(2) {
				flex: 0.3;
			}
			li {
				text-align: right;
				flex: 1;
			}
		}
		.shishiList_content {
			@extend .shishiList_title;
			color: #fff;
		}
	}
	/*币种内容简介*/

	.introduce {
		width: 100%;
		box-sizing: border-box;
		padding: .1rem .1rem;
		background: $bg_color;
	}
</style>
