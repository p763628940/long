///引入用户信息部分
import { httpUrl } from "../http_url/http_url.js";
import store from "../../store.js"
import axios from "axios"
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import $ from "jquery"
import Vue from "vue"
import tvchart from "../public/tvcart"
export default {
	data() {
		return {
			UserIsShow: true, //显示隐藏余额
			tishiIsShow: false, //提示错误显示
			tishiIcon: true, //字体图标失败
			tishiIcon2: false, //字体图标成功
			focus_active: false, //选中的文本框的边框线
			focus_active2: false, //选中的文本框的边框线
			focus_active3: false, //选中的文本框的边框线
			focus_active4: false, //选中的文本框的边框线
			focus_active5: false, //选中的文本框的边框线
			focus_active6: false, //选中的文本框的边框线
			isEmpoet: false, //收藏区显示隐藏
			CurrentPage: 1, //先拿到当前页数
			historyWPage: 1, //历史委托当前页数
			historyJPage: 1, //历史成交当前页数
			//token: Vue.token, ////获取用户信息的token
			getToken: store.getToken,
			//curTime: Vue.curTime, ///获取存的时间
			currency: null,
			/*获取对比*/
			Coins: null,
			/*获取主币*/
			/*获取语言*/
			currencyDetailsList: {}, /////币种信息
			regular: 6, ////正则小数
			sum: 0,
			main_balance: 0,
			/*获取指定币主币余额*/
			yes_balance: 0,
			/*获取指定对币余额*/
			baiList: [{
				text: "25%",
				active: false
			},
			{
				text: "50%",
				active: false
			},
			{
				text: "75%",
				active: false
			},
			{
				text: "100%",
				active: false
			}
			],
			/*获取指定币种余额*/
			baiList1: [{
				text: "25%",
				active: false
			},
			{
				text: "50%",
				active: false
			},
			{
				text: "75%",
				active: false
			},
			{
				text: "100%",
				active: false
			}
			],
			baiList3: [{
				text: "25%",
				active: false
			},
			{
				text: "50%",
				active: false
			},
			{
				text: "75%",
				active: false
			},
			{
				text: "100%",
				active: false
			}
			],
			baiList4: [{
				text: "25%",
				active: false
			},
			{
				text: "50%",
				active: false
			},
			{
				text: "75%",
				active: false
			},
			{
				text: "100%",
				active: false
			}
			],
			isEmpty: false,
			show: false,
			arr1: [],
			iconActive: "iconActive",
			coin_matching: null, ///获取币对
			listID: [], /////获取所有ID值
			conin_ID: "", ///币对ID   搜索框
			bzActive_index: 0, ///对应币种的  市场   价格   24h成交量   24h跌涨
			ziActive: false, ///自选
			matchcoin_id: this.$router.history.current.params.id, //币对ID
			viewData: { //页面要展示的数据
				matchcoin_id: this.$router.history.current.params.id,
				mainCurrency: "", //主币
				forMoney: "", //对币
				price: "", //价格
				updown: "", //涨幅
				low: "", //最低价
				high: "", //最高价
				hour24: "", //24小时成交量
				cny: "", ///最新价
				decimals: 4, ///限定价格
				count_decimals: 0 ///限定数量
			},
			OptionalList: {
				main: [], ///主区一个数组
				innovation: [] ///创新区一个数组
			}, ////自选列表
			currentList: [], ///当前委托
			currentTotal: 0, ///当前委托的总条数
			HistoryList: [], ///历史委托
			HistoryTotal: 0, ///历史委托的总条数
			HistoryDeal: [], ///历史成交
			Historydatetype: 0, ///历史委托默认是
			HistoryDealTotal: 0, ///历史成交的总条数
			HistoryDealdatetype: 0, ///历史成交默认显示当日的
			assetsList: [], ///资产管理
			itemPush: null, /////push的值
			itemslocalstorge: store.fetch(), ///本地存储未登录状态
			getIcon: store.get(), ///本地存储登录状态
			currency_id: "", ////获取币种ID
			searchVal: "", ////搜索框绑定
			shishiList: [], ///获取实时成交数据
			sellList: [], ///卖的实时成交数据
			sellListAll: [], ///卖盘数据问题
			buyList: [], ///买的实时成交数据
			coIns: [], ///主币区
			innovate: [], ///创新区
			limit: { //限价交易
				matchcoin_id: this.$router.history.current.params.id,
				type: "buy",
				price: "", ///买入价
				count: "" ///买入量
			},
			limit2: { //限价交易
				matchcoin_id: this.$router.history.current.params.id,
				type: "sell",
				price: "", ///卖出价
				count: "" ///卖出量
			},
			amount1: { ///市价交易
				matchcoin_id: this.$router.history.current.params.id,
				type: "buy",
				amount: ""
			},
			amount2: {
				matchcoin_id: this.$router.history.current.params.id,
				type: "sell",
				amount: ""
			},
			tiShi: "", ////提示内容
			colorSeleccted: false,
			getIconColor: 0,
			checked: false,
			isShow: false,
			Num: false,
			aaa: true,
			buttonDisabled: true, //禁用按钮
			value13: "",
			value14: "",
			CurBalance: 0,
			/*BTC余额*/
			RBalance: 0,
			/*人民币余额*/
			BalanceName: "CNY",
			/*币种名称*/
			// getColor: window.localStorage.getItem("setColor"),
			/*获取颜色*/
			MaximumValue: 0,
			/*拿到最大值*/
			ISlightningBuy: false,
			/*闪电买入交易选择*/
			ISlightningSell: false,
			/*闪电卖出交易选择*/
		}
	},
	computed: { ////计算属性监听
		getData: function () {
			return this.shishiList;
		},
		getColorCss() {
			return this.getColor == 0 ? "night.css?v.1.3" : this.getColor == 1 ? "night_white.css?v.1.3" : "night.css?v.1.3";
		},
		...mapState('user', ['lang', 'userID']),
		...mapState('setting', ['creativityWarning']),
		...mapGetters('setting', ['urlPrefix']),
	},
	watch: { //监听
		itemslocalstorge: {
			handler: function (val, oldVal) {
				store.save(val)
			},
			deep: true
		},
		getIcon: {
			handler: function (val, oldVal) {
				store.set(val)
			},
			deep: true
		},
		getColor(val, oldVal) {
			window.tvWidget.applyOverrides(this.getOverrideObj());
			window.tvWidget.addCustomCSSFile(this.getColorCss);


			// Vue.prototype.getColor = val;
			// this.getColor = val;
		}
	},
	components: {
		"my-alert": alert,
		"tvchart": tvchart
	},
	async created() {
		var _this = this;
		this.refreshBuySellQueue();
		// }, function(err) {
		// 	console.log(err)
		// })
		////获取所有币对   GET请求
		let res = await axios.get(httpUrl.coin_matching, {
			params: {
				symbol: this.urlPrefix,
				...(this.userID ? { code: this.userID } : {}),
			}
		});
		// .then(function(res) {
		///获取币对成功
		_this.coin_matching = res.data.data;

		this.refreshViewData();
		this.refreshRealTimeList();


		for (let i = 0; i < _this.coin_matching.length; i++) {
			for (let item in _this.coin_matching[i]) {
				_this.coin_matching[i]['main'] = new Array();
				_this.coin_matching[i]['innovation'] = new Array();
				for (let j = 0; j < _this.coin_matching[i].matchcoins.length; j++) {
					if (_this.coin_matching[i].matchcoins[j].isMain == 0) { ///判断是否在主区
						_this.coin_matching[i].matchcoins[j].isIf = true;
						_this.coin_matching[i]['innovation'].push(_this.coin_matching[i].matchcoins[j])
					} else {
						_this.coin_matching[i].matchcoins[j].isIf = true;
						_this.coin_matching[i]['main'].push(_this.coin_matching[i].matchcoins[j])
					}
				}
			}
		}
		///获取数据成功判断用户是否登录
		if (_this.token == null && _this.token == undefined) {
			/*判断收藏部分start*/
			//未登录判断收藏



			//1.获取ID本地存储的值
			//2.遍历币对列表     遍历本地存储的数组
			//3.匹配ID是否存在
			const handleOptionList = (field) => {
				let arr = []; ///判断主区
				// for(let i = 0; i < _this.itemslocalstorge.length; i++) {
				for (let j = 0; j < _this.coin_matching.length; j++) {
					for (let item in _this.coin_matching[j]) { ///遍历大币种对
						for (let n = 0; n < _this.coin_matching[j][field].length; n++) { ///遍历主币
							if (_this.itemslocalstorge.indexOf(_this.coin_matching[j][field][n].matchcoin_id) != -1) {
								///判断id是否存在，否则会出现push好多值
								if (_this.OptionalList[field].length == 0 || arr.indexOf(_this.coin_matching[j][field][n].matchcoin_id) == -1) {
									_this.OptionalList[field].push({
										'isIf': true,
										'matchcoin_id': _this.coin_matching[j][field][n].matchcoin_id,
										'matchname': _this.coin_matching[j][field][n].pageIdentifier + "/" + _this.coin_matching[j].pageIdentifier,
										"price": _this.coin_matching[j][field][n].price,
										"updown": _this.coin_matching[j][field][n].updown,
										"hour24": _this.coin_matching[j][field][n].hour24,
										"cny": _this.coin_matching[j][field][n].cny
									})
									arr.push(_this.coin_matching[j][field][n].matchcoin_id);
								}
							}
						}
					}
				}
				// }
			}
			handleOptionList('main');
			handleOptionList('innovation');
			/*判断收藏部分end*/
		} else { //////用户登录成功
			/////获取用户收藏的列表  币种的id
			let res3 = await axios.get(httpUrl.my_follow, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			})
			/////判断是否收藏主区
			const handleOptionalListAfter = (field) => {
				if (res3.data.data[field] == undefined) {
					_this.OptionalList[field] = []
				} else {
					_this.OptionalList[field] = res3.data.data[field];
					//////////收藏主区币种成功
					for (let i = 0; i < _this.OptionalList[field].length; i++) { ///遍历获取到的数据
						for (let j = 0; j < _this.coin_matching.length; j++) { //遍历本地获取的币种数据
							for (let item in _this.coin_matching[j]) { ///遍历大币种对
								for (let n = 0; n < _this.coin_matching[j][field].length; n++) { ///遍历主币
									if (_this.OptionalList[field][i].matchcoin_id == _this.coin_matching[j][field][n].matchcoin_id) { ///判断币对id是否相同
										_this.OptionalList[field][i].isIf = _this.coin_matching[j][field][n].isIf; //显示隐藏
										_this.OptionalList[field][i].price = _this.coin_matching[j][field][n].price; //价格
										_this.OptionalList[field][i].updown = _this.coin_matching[j][field][n].updown; //涨幅
										_this.OptionalList[field][i].hour24 = _this.coin_matching[j][field][n].hour24; //24h成交量
										_this.OptionalList[field][i].cny = _this.coin_matching[j][field][n].cny; //人民币
									}
								}
							}
						}
					}
				}

			}

			handleOptionalListAfter('main')
			/////判断是否收藏创新区
			handleOptionalListAfter('innovation')

			await this.refreshFinances();

		}


	},
	mounted() {
		var _this = this;
		/***************图表开始*******************/
		// var ws = new WebSocket(_this.wsIp); ///定义全局
		let ws = this.ws;
		const wsOpenHandle = () => {
			ws.send('{"mid":"' + _this.matchcoin_id + '"}')
			if (_this.token != null && _this.token != "undefined") {
				///获取用户信息
				if (!this.userID) {
					this.info().then(() => ws.send('{"bind_id":"' + this.userID + '"}'));
				} else {
					ws.send('{"bind_id":"' + this.userID + '"}')
				}
			}
		}
		//传递币对ID开始//
		if (ws.readyState === ws.OPEN) {
			wsOpenHandle();
		} else {
			ws.onopen = wsOpenHandle;
		}

		/*判断当前颜色的版本*/
		if (_this.getColor == 1) {
			$(".xxk-active").css({
				"color": "#4338bd !important",
				"border-bottom": "2px solid #4338bd !important"
			})
		} else {
			$(".xxk-active").css({
				"color": "#bbb5ff !important",
				"border-bottom": "2px solid #bbb5ff !important"
			})
		}
		//传递币对ID结束//

		function unsubscribeBars(UID) {
			//console.log(UID);
		}

		function subscribeBars(symbolInfo, resolution, onRealtime, subscriberUID, onResetCacheNeededCallback) {
			_this.onResetCacheNeededCallback = onResetCacheNeededCallback
			//["1"=>1min, "5"=>5min, "15", "30", "60", "240"=>240min, "1D"=>1day, "1W"=>1week, "1M"=>1mon];
			ws.onmessage = function (e) {
				var arr = JSON.parse(e.data);
				if (arr.type == "ping") { ////判断type
					ws.send('{"pong":' + Date.now() + '}');
				} else if (arr.type == "refresh") { /*推送刷新接口---当前委托----历史委托----历史成交----资产管理----*/
					_this.refreshHistory();
					/**********刷新资产管理************/
					_this.refreshFinances();
				} else if (arr.type == "socket") {
					for (let i = 0; i < arr.message.length; i++) {
						if (arr.message[i].type == "cachekline" + _this.matchcoin_id) { ////推送k线
							if (resolution == "1") {
								onRealtime(arr.message[i].message["min1"]);
							}
							if (resolution == "5") {
								onRealtime(arr.message[i].message["min5"]);
							}
							if (resolution == "15") {
								onRealtime(arr.message[i].message["min15"]);
							}
							if (resolution == "30") {
								onRealtime(arr.message[i].message["min30"]);
							}
							if (resolution == "60") {
								onRealtime(arr.message[i].message["min60"]);
							}
							if (resolution == "240") {
								onRealtime(arr.message[i].message["min240"]);
							}
							if (resolution == "1D") {
								onRealtime(arr.message[i].message["day1"]);
							}
							if (resolution == "1W") {
								onRealtime(arr.message[i].message["week1"]);
							}
							if (resolution == "1M") {
								onRealtime(arr.message[i].message["mon1"]);
							}
						} else if (arr.message[i].type == "buySellQueue" + _this.matchcoin_id) { ////推送买卖列队
							var buySellList = arr.message[i].message;
							_this.buyList = buySellList.buy_queues;
							let sellList = buySellList.sell_queues;
							if (_this.buyList.length == 0) {
								_this.buyList = buySellList.buy_queues;
							} else {
								var sum1 = 0;
								_this.buyList.forEach(function (item) {
									sum1 = parseFloat(item.count) + sum1;
									item.sum = sum1;
								})
							}
							if (sellList.length == 0) {
								_this.sellList = buySellList.sell_queues;
								_this.sellListAll = buySellList.sell_queues;
							} else {
								var sum = 0;
								sellList.forEach(function (item) {
									sum = parseFloat(item.count) + sum;
									item.sum = sum;
								})
								_this.sellListAll = sellList;
								_this.sellList = $.map(sellList, function (v, i) {
									return sellList[sellList.length - 1 - i];
								});
							}
							_this.getMaxValue(_this.buyList, _this.sellList); ///拿到最大值
						} else if (arr.message[i].type == "matchcoins") { ///实时推送列表
							let arrList = arr.message[i].message;
							for (let i = 0; i < arrList.length; i++) { ///遍历实时更新的币种数据
								for (let j = 0; j < _this.coin_matching.length; j++) { //遍历本地获取的币种数据
									for (let item in _this.coin_matching[j]) { ///遍历大币种对
										for (let n = 0; n < _this.coin_matching[j].main.length; n++) { ///遍历主币
											if (arrList[i].id == _this.coin_matching[j].main[n].matchcoin_id) { ///判断币对id是否相同
												_this.coin_matching[j].main[n].price = arrList[i].price;
												_this.coin_matching[j].main[n].updown = arrList[i].updown;
												_this.coin_matching[j].main[n].hour24 = arrList[i].hour24;
												_this.coin_matching[j].main[n].high = arrList[i].high;
												_this.coin_matching[j].main[n].low = arrList[i].low;
												_this.coin_matching[j].main[n].cny = arrList[i].cny;
											}
											if (arrList[i].id == _this.viewData.matchcoin_id) {
												_this.viewData.price = arrList[i].price;
												_this.viewData.updown = arrList[i].updown;
												_this.viewData.high = arrList[i].high;
												_this.viewData.hour24 = arrList[i].hour24;
												_this.viewData.low = arrList[i].low;
												_this.viewData.cny = arrList[i].cny;
											}
										}
									}
								}
							}

							for (let i = 0; i < arrList.length; i++) { ///遍历实时更新的币种数据
								for (let j = 0; j < _this.coin_matching.length; j++) { //遍历本地获取的币种数据
									for (let item in _this.coin_matching[j]) { ///遍历大币种对
										for (let n = 0; n < _this.coin_matching[j].innovation.length; n++) { ///遍历主币
											if (arrList[i].id == _this.coin_matching[j].innovation[n].matchcoin_id) { ///判断币对id是否相同
												_this.coin_matching[j].innovation[n].price = arrList[i].price;
												_this.coin_matching[j].innovation[n].updown = arrList[i].updown;
												_this.coin_matching[j].innovation[n].hour24 = arrList[i].hour24;
												_this.coin_matching[j].innovation[n].cny = arrList[i].cny;
												_this.coin_matching[j].innovation[n].high = arrList[i].high;
												_this.coin_matching[j].innovation[n].low = arrList[i].low;
											}
											if (arrList[i].id == _this.viewData.matchcoin_id) {
												_this.viewData.price = arrList[i].price;
												_this.viewData.updown = arrList[i].updown;
												_this.viewData.high = arrList[i].high;
												_this.viewData.hour24 = arrList[i].hour24;
												_this.viewData.low = arrList[i].low;
												_this.viewData.cny = arrList[i].cny;
											}
										}
									}
								}
							}
							///遍历收藏里面的币种区
							for (let i = 0; i < arrList.length; i++) { ///遍历实时推送的数据
								for (let j = 0; j < _this.OptionalList.main.length; j++) {
									if (_this.OptionalList.main[j].matchcoin_id == arrList[i].id) {
										_this.OptionalList.main[j].price = arrList[i].price;
										_this.OptionalList.main[j].updown = arrList[i].updown;
										_this.OptionalList.main[j].hour24 = arrList[i].hour24;
									}
								}
							}

							for (let i = 0; i < arrList.length; i++) { ///遍历实时推送的数据
								for (let j = 0; j < _this.OptionalList.innovation.length; j++) {
									if (_this.OptionalList.innovation[j].matchcoin_id == arrList[i].id) {
										_this.OptionalList.innovation[j].price = arrList[i].price;
										_this.OptionalList.innovation[j].updown = arrList[i].updown;
										_this.OptionalList.innovation[j].hour24 = arrList[i].hour24;
									}
								}
							}
						} else if (arr.message[i].type == "realtimeDone_" + _this.matchcoin_id) {
							////添加一条数据
							_this.getData.unshift(arr.message[i].message);
							if (_this.getData.length >= 50) { ////只显示50条数据
								_this.getData.pop()
							}
						}
					}
				}

				//////获取实时推送数据

			};

		}

		function getBars(symbolInfo,
			resolution,
			rangeStartDate,
			rangeEndDate,
			onHistoryCallback,
			onErrorCallback,
			firstDataRequest) {
			/////获取k线部分
			axios.get(httpUrl.kline, {
				params: {
					"matchcoin_id": _this.matchcoin_id,
					/*************拼接币对ID*****************/
					"time_type": resolution
				}
			}).then(function (res) {
				_this.klineList = res.data.data;
				////后面执行
				if (_this.klineList.length == 0 || rangeEndDate <= _this.klineList[0].time / 1000) {
					onHistoryCallback([], {
						noData: true
					});
				} else {
					onHistoryCallback(_this.klineList, {
						noData: false
					});
				}
			}, function (err) {
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
			library_path: "../../static/charting_library/", ///引用包的路径
			locale: _this.lang == "en" ? "en" : _this.lang == "ko" ? "ko" : "zh", //切换语言
			interval: "5", ///默认显示分钟数
			disabled_features: ["compare_symbol", "display_market_status", "go_to_date", "header_chart_type", "header_compare", "header_interval_dialog_button", "header_resolutions", "header_screenshot", "header_symbol_search", "header_undo_redo", "legend_context_menu", "show_hide_button_in_legend", "show_interval_dialog_on_key_press", "snapshot_trading_drawings", "symbol_info", "timeframes_toolbar", "use_localstorage_for_settings", "volume_force_overlay"],
			enabled_features: ["dont_show_boolean_study_arguments", "hide_last_na_study_output", "move_logo_to_main_pane", "same_data_requery", "side_toolbar_in_fullscreen_mode", "disable_resolution_rebuild"],
			custom_css_url: this.getColorCss,
			// toolbar_bg: _this.getColor == 0 ? "#16182c" : _this.getColor == 1 ? "#fff" : "#16182c", //工具栏验颜色
			overrides: this.getOverrideObj(),
			supported_resolutions: ["1", "5", "15", "30", "60", "240", "D", "W", "M"],
			loading_screen: { /*加载背景*/
				backgroundColor: _this.getColor == 0 ? '#191828' : _this.getColor == 1 ? "#fff" : "#191828"
			},
		}
		let decimals;
		if (_this.viewData.decimals == 0) {
			decimals = 4;
		} else {
			decimals = _this.viewData.decimals;
		}
		/*需要解决的问题*/
		function resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
			const configuration = {
				name: _this.viewData.mainCurrency + _this.viewData.forMoney,
				minmov: 1,
				pricescale: Math.pow(10, decimals),
				volume_precision: 8,
				session: "24x7",
				supported_resolutions: ["1", "5", "15", "30", "60", "240", "D", "W", "M"],
				data_status: 'streaming',
				timezone: "UTC",
				has_daily: true,
				has_weekly_and_monthly: true,
				has_intraday: true,
				type: "bitcoin",
			};
			setTimeout(function () {
				onSymbolResolvedCallback(configuration);
			}, 0);
		}
		var widget = window.tvWidget = new TradingView.widget(options);

		function onReady(callback) { /*时间*/
			const configuration = {
				supports_search: true,
				supports_group_request: false,
				supported_resolutions: ["1", "5", "15", "30", "60", "240", "D", "W", "M"],
				supports_marks: true,
			};
			setTimeout(function () {
				callback(configuration);
			}, 0);
		}
		widget.onChartReady(function () {

			widget.chart().executeActionById("drawingToolbarAction");
			widget.chart().createStudy("Moving Average", false, false, [5], function (guid) {
				console.log()
			}, {
					"plot.color.0": "rgb(150, 95, 196)"
				});
			widget.chart().createStudy("Moving Average", false, false, [10], function (guid) {
				console.log()
			}, {
					"plot.color.0": "rgb(132, 170, 213)"
				});
			widget.chart().createStudy("Moving Average", false, false, [30], function (guid) {
				console.log()
			}, {
					"plot.color.0": "rgb(85, 178, 99)"
				});
			widget.chart().createStudy("Moving Average", false, false, [60], function (guid) {
				console.log()
			}, {
					"plot.color.0": "rgb(183, 36, 138)"
				});

			widget.createButton()
				.on('click', function (e) {
					$(this).addClass("selected").parent(".group").siblings(".group").find(".button").removeClass("selected");
					widget.chart().setChartType(3);
					widget.setSymbol("", '1');
				})
				.append($('<span>分时</span>'));
			widget.createButton()
				.on('click', function (e) {
					$(this).addClass("selected").parent(".group").siblings(".group").find(".button").removeClass("selected");
					widget.chart().setChartType(1);
					widget.setSymbol("", '1');
				})
				.append($('<span>1min</span>'));
			widget.createButton().addClass("selected")
				.on('click', function (e) {
					$(this).addClass("selected").parent(".group").siblings(".group").find(".button").removeClass("selected");
					widget.chart().setChartType(1);
					widget.setSymbol("", '5');
				})
				.append($('<span>5min</span>'));
			widget.createButton()
				.on('click', function (e) {
					$(this).addClass("selected").parent(".group").siblings(".group").find(".button").removeClass("selected");
					widget.chart().setChartType(1);
					widget.setSymbol("", '15');
				})
				.append($('<span>15min</span>'));
			widget.createButton()
				.on('click', function (e) {
					$(this).addClass("selected").parent(".group").siblings(".group").find(".button").removeClass("selected");
					widget.chart().setChartType(1);
					widget.setSymbol("", '30');
				})
				.append($('<span>30min</span>'));
			widget.createButton()
				.on('click', function (e) {
					$(this).addClass("selected").parent(".group").siblings(".group").find(".button").removeClass("selected");
					widget.chart().setChartType(1);
					widget.setSymbol("", '60');
				})
				.append($('<span>1hour</span>'));
			widget.createButton()
				.on('click', function (e) {
					$(this).addClass("selected").parent(".group").siblings(".group").find(".button").removeClass("selected");
					widget.chart().setChartType(1);
					widget.setSymbol("", '240');
				})
				.append($('<span>4hour</span>'));
			widget.createButton()
				.on('click', function (e) {
					$(this).addClass("selected").parent(".group").siblings(".group").find(".button").removeClass("selected");
					widget.chart().setChartType(1);
					widget.setSymbol("", 'D');
				})
				.append($('<span>1day</span>'));
			widget.createButton()
				.on('click', function (e) {
					$(this).addClass("selected").parent(".group").siblings(".group").find(".button").removeClass("selected");
					widget.chart().setChartType(1);
					widget.setSymbol("", 'W');
				})
				.append($('<span>1week</span>'));
			widget.createButton()
				.on('click', function (e) {
					$(this).addClass("selected").parent(".group").siblings(".group").find(".button").removeClass("selected");
					widget.chart().setChartType(1);
					widget.setSymbol("", 'M');
				})
				.append($('<span>1mon</span>'));
		});
		/***************图表结束  *******************/
		///////页面加载完成判断用户是否登录
		if (this.token == null && this.token == undefined) {
			this.buttonDisabled = true; ////没登录成功禁止按钮
		} else {
			this.buttonDisabled = false; ////登录成功不禁止按钮
			////获取当前委托内容
			axios.get(httpUrl.current, {
				headers: {
					"Authorization": "Bearer " + _this.token
				},
				params: {
					matchcoin_id: _this.matchcoin_id
				}
			}).then(function (res) {
				_this.currentList = res.data.data.data;
				_this.currentTotal = res.data.data.total; //总条数
			}, function (err) {
				console.log(err)
			})

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
	methods: {
		...mapActions('user', ['info']),
		...mapMutations('setting',['setData']),
		async refreshRealTimeList() {
			///获取实时成交数据
			let res2 = await axios.get(httpUrl.shishi, {
				params: {
					'matchcoin_id': this.matchcoin_id
				}
			})
			this.shishiList = res2.data.data;

		},
		async refreshBuySellQueue() {
			var _this = this;
			///获取买卖队列
			let res = await axios.get(httpUrl.buy_sell_queue, {
				params: {
					"matchcoin_id": _this.matchcoin_id
				}
			})
			// .then(function(res) {
			_this.buyList = res.data.data.buy_queues || []; //买列队
			let arr = res.data.data.sell_queues || []; //卖列队
			_this.sellListAll = arr;
			/*计算最大值*/
			_this.getMaxValue(_this.buyList, _this.sellList);
			var sum = 0;
			arr.forEach(function (item) {
				sum = parseFloat(item.count) + sum;
				item.sum = sum;
			})
			_this.sellList = $.map(arr, function (v, i) {
				return arr[arr.length - 1 - i];
			});
			var sum1 = 0;
			_this.buyList.forEach(function (item) {
				sum1 = parseFloat(item.count) + sum1;
				item.sum = sum1;
			})
		},
		async refreshHistory() {
			/*******刷新当前委托*******/
      if(this.token==null&&this.token==undefined){return false};
			let res = await axios.get(httpUrl.current, {
				headers: {
					"Authorization": "Bearer " + this.token
				},
				params: {
					matchcoin_id: this.matchcoin_id,
					page: this.CurrentPage
				}
			})
			this.currentList = res.data.data.data; ///获取当前委托列表
			this.currentTotal = res.data.data.total; //总条数
			/*********刷新历史委托******/
			res = await axios.get(httpUrl.history, {
				headers: {
					"Authorization": "Bearer " + this.token
				},
				params: {
					datetype: this.Historydatetype,
					matchcoin_id: this.matchcoin_id,
					page: this.historyWPage
				}
			})
			this.HistoryList = res.data.data.data;
			this.HistoryTotal = res.data.data.total; //总条数

			/*********刷新历史成交*********/
			res = await axios.get(httpUrl.history, {
				headers: {
					"Authorization": "Bearer " + this.token
				},
				params: {
					datetype: this.HistoryDealdatetype,
					status: 1,
					matchcoin_id: this.matchcoin_id,
					page: this.historyJPage
				}
			})
			this.HistoryDeal = res.data.data.data;
			this.HistoryDealTotal = res.data.data.total; //获取历史成交的总条数
			for (let i = 0; i < this.HistoryDeal.length; i++) {
				this.HistoryDeal[i].isShow = false;
			}
		},
		refreshViewData() {
			////显示页面内容
			for (let i = 0; i < this.coin_matching.length; i++) {
				// for(let item in this.coin_matching[i]) {
				for (let j = 0; j < this.coin_matching[i].matchcoins.length; j++) {
					if (this.coin_matching[i].matchcoins[j].matchcoin_id == this.viewData.matchcoin_id) {
						this.viewData.mainCurrency = this.coin_matching[i].pageIdentifier;
						this.viewData.forMoney = this.coin_matching[i].matchcoins[j].pageIdentifier;
						this.viewData.price = this.coin_matching[i].matchcoins[j].price;
						this.viewData.updown = this.coin_matching[i].matchcoins[j].updown;
						this.viewData.hour24 = this.coin_matching[i].matchcoins[j].hour24;
						this.viewData.high = this.coin_matching[i].matchcoins[j].high;
						this.viewData.low = this.coin_matching[i].matchcoins[j].low;
						this.viewData.cny = this.coin_matching[i].matchcoins[j].cny;
						this.viewData.decimals = this.coin_matching[i].matchcoins[j].decimals;
						this.viewData.count_decimals = this.coin_matching[i].matchcoins[j].count_decimals;
						this.limit2.price = this.coin_matching[i].matchcoins[j].price;
						this.limit.price = this.coin_matching[i].matchcoins[j].price;
					}
					if (this.coin_matching[i].matchcoins[j].matchcoin_id == this.matchcoin_id) { /*判断当前id*/
						// window.localStorage.setItem("Coins", this.coin_matching[i].id) /*主币id*/
						// window.localStorage.setItem("currency_id", this.coin_matching[i].matchcoins[j].id); /*对币id*/
						this.Coins = this.coin_matching[i].id;
						this.currency = this.coin_matching[i].matchcoins[j].id;
					}
				}
				// }
			}
			if(!this.creativityWarning && this.viewData.mainCurrency == 'IMX'){
				const h = this.$createElement;
				let str = this.$t('shouye.DialogWarning');
				this.$alert(h('div',null,str.split('\n').map((item)=>h('p',{ style: 'text-align: left;' },item))), this.$t('shouye.DialogTitle'), {
					confirmButtonText: this.$t('shouye.DialogConfirm'),
					center: true,
					showClose:false,
					dangerouslyUseHTMLString:true,
					confirmButtonClass:'alert-confirm-button',
					callback: action => {
						this.setData({creativityWarning:1});
					}
				});
			}
		},
		async refreshFinances() {
		  if(this.token==null&&this.token==undefined){return false};
			////获取资产信息的内容
			let res = await axios.get(httpUrl.finances, {
				headers: {
					"Authorization": "Bearer " + this.token
				}
			})
			this.assetsList = res.data.data;
			let btcBla = 0; ///BTC剩余值
			let rmbBla = 0; ///人民币剩余值
			let KRW = 0; ///韩元
			let USD = 0; ///美金
			for (let i = 0; i < this.assetsList.length; i++) {
				if (this.assetsList[i].currency_id == this.Coins) { ///主币ID
					this.main_balance = this.assetsList[i].balance /////////获取主币余额
				}
				if (this.assetsList[i].currency_id == this.currency) { ///对币ID
					this.yes_balance = this.assetsList[i].balance //////获取对币余额
				}
				btcBla += parseFloat(this.assetsList[i].btc_blance);
				KRW += parseFloat(this.assetsList[i].KRW); //韩元
				USD += parseFloat(this.assetsList[i].USD); //美金
				rmbBla += parseFloat(this.assetsList[i].CNY); //人民币
			}
			this.CurBalance = btcBla; ///btc值变化
			if (this.lang == "zh-CN") {
				this.RBalance = rmbBla; ///人民币值变化
				this.BalanceName = "CNY";
			} else if (this.lang == "en") {
				this.RBalance = USD; ///美金变化
				this.BalanceName = "USD";
			} else if (this.lang == "ko") {
				this.RBalance = KRW; ///韩元值变化
				this.BalanceName = "KRW";
			}
		},
		getOverrideObj() {
			return {
				"paneProperties.background": this.getColor == 0 ? "#16182c" : this.getColor == 1 ? "#fff" : "#16182c", ///背景颜色
				"paneProperties.vertGridProperties.color": this.getColor == 0 ? "#1F2943" : this.getColor == 1 ? "#f4f4f4" : "#1F2943", ///竖线
				"paneProperties.horzGridProperties.color": this.getColor == 0 ? "#1F2943" : this.getColor == 1 ? "#f4f4f4" : "#1F2943", ///横线
				"paneProperties.crossHairProperties.color": "#9396A5", ////提示坐标线
				"scalesProperties.textColor": this.getColor == 0 ? "#fff" : this.getColor == 1 ? "#16182c" : "#fff", ///时间字体颜色
				//"symbolWatermarkProperties.transparency": 90,
				"scalesProperties.lineColor": this.getColor == 0 ? "#1F2943" : this.getColor == 1 ? "#ddd" : "#1F2943", //边框线
				"paneProperties.legendProperties.showLegend": false,
				/*收起加减*/
				"volumePaneSize": "medium"
			};
		},
		getMaxValue: function (buyList, sellList) {
			var buyMax;
			if (buyList.length != 0) {
				buyMax = buyList[0].count; //买的最大值
				for (let i = 0; i < buyList.length; ++i) {
					if (buyMax < buyList[i].count) {
						buyMax = buyList[i].count
					}
				}
			} else {
				buyMax = 0;
			}
			var sellMax;
			if (sellList.length != 0) {
				sellMax = sellList[0].count; //卖的最大值
				for (let j = 0; j < sellList.length; ++j) {
					if (sellMax < sellList[j].count) {
						sellMax = sellList[j].count
					}
				}
			} else {
				sellMax = 0;
			}
			if (buyMax > sellMax) {
				return this.MaximumValue = parseFloat(buyMax);
			} else {
				return this.MaximumValue = parseFloat(sellMax);
			}
		},
		pageChangeHistoryDeal(val) { /*切换历史成交的内容*/
			let _this = this;
			_this.historyJPage = val; /*获取历史成交当前页数*/
			axios.get(httpUrl.history, {
				headers: {
					"Authorization": "Bearer " + _this.token
				},
				params: {
					datetype: _this.HistoryDealdatetype,
					status: 1,
					matchcoin_id: _this.matchcoin_id,
					page: val
				}
			}).then(function (res) {
				_this.HistoryDeal = res.data.data.data;
				_this.HistoryDealTotal = res.data.data.total; //获取历史成交的总条数
				for (let i = 0; i < _this.HistoryDeal.length; i++) {
					_this.HistoryDeal[i].isShow = false;
				}

			}, function (err) {
				console.log(err)
			})
		},
		pageChangeHistory(val) { /*切换历史委托的内容*/
			let _this = this;
			_this.historyWPage = val; //获取当前页数
			axios.get(httpUrl.history, {
				headers: {
					"Authorization": "Bearer " + _this.token
				},
				params: {
					matchcoin_id: _this.matchcoin_id,
					page: val,
					datetype: _this.Historydatetype
				}
			}).then(function (res) {
				_this.HistoryList = res.data.data.data;
				_this.HistoryTotal = res.data.data.total; //总条数

			}, function (err) {
				console.log(err)
			})
		},
		pageChangecurrent(val) { /*切换当前委托的内容*/
			let _this = this;
			_this.CurrentPage = val; /*获取当前页数*/
			axios.get(httpUrl.current, {
				headers: {
					"Authorization": "Bearer " + _this.token
				},
				params: {
					matchcoin_id: _this.matchcoin_id,
					page: val
				}
			}).then(function (res) {
				_this.currentList = res.data.data.data; ///获取当前委托列表
				_this.currentTotal = res.data.data.total; //总条数
			}, function (err) {
				console.log(err)
			})
		},
		ClickPrice(price, prices) {
			if (prices == undefined) {
				this.limit2.price = price.toFixed(this.viewData.decimals);
				this.limit.price = price.toFixed(this.viewData.decimals);
			} else {
				this.limit2.price = prices.toFixed(this.viewData.decimals)
				this.limit.price = prices.toFixed(this.viewData.decimals);
			}
		},
		baifenbuy(bai, index, toNum) { ///买入  百分比计算
			if (this.main_balance <= 0) { /////////////////判断主币的余额是否为0
				return false;
			}
			for (let i = 0; i < this.baiList.length; i++) {
				this.baiList[i].active = false;
			}
			this.baiList[index].active = true;
			var NumBai = parseInt(bai) / 100;
			if (this.limit.price == "" || this.limit.price == 0 || this.limit.price == null) { /*判断价格是否为空*/
				return false;
			}
			var num = this.main_balance / this.limit.price * NumBai;
			//var toFixNum = num.toFixed(toNum + 1);//toFixNum.substring(0, toFixNum.toString().length - 1)
			if (num.toString().indexOf("e") != -1) { /*判断用户是否包含科学计数法*/
				this.limit.count = 0;
				return false;
			}
			if (num.toString().indexOf(".") != -1) { //判断有无包含小数点
				var par = num.toString().split(".")[0];
				var xiao = num.toString().split(".")[1].slice(0, toNum);
				var Zhen = parseFloat(par + "." + xiao);
				this.limit.count = Zhen;
			} else {
				this.limit.count = num;
			}
		},
		baifensell(bai, index, toNum) { ///卖出    百分比计算
			if (this.yes_balance <= 0) { ////判断对币的余额是否为0
				return false;
			}
			var NumBai = parseInt(bai) / 100;
			for (let i = 0; i < this.baiList1.length; i++) {
				this.baiList1[i].active = false;
			}
			this.baiList1[index].active = true;
			if (this.limit2.price == "" || this.limit2.price == 0 || this.limit.price == null) { /*判断价格是否为空*/
				return false;
			}
			var num = this.yes_balance * NumBai;
			/*判断有无包含小数点 */
			if (num.toString().indexOf(".") != -1) {
				var par = num.toString().split(".")[0];
				var xiao = num.toString().split(".")[1].slice(0, toNum);
				var Zhen = parseFloat(par + "." + xiao);
				this.limit2.count = Zhen;
			} else {
				this.limit2.count = num
			}

			//var toFixNum = num.toFixed(toNum + 1);
			//toFixNum.substring(0, toFixNum.toString().length - 1);

		},
		toFixedNum(num, len) {
			var bb = num + "";
			var dian = bb.indexOf('.');
			var result = "";
			if (dian == -1) { //如果没有 小数点  就直接保留两位小数
				result = num.toFixed(2); //此时为补加 .00
			} else { //如果有小数点，在判断，小数点后的小数位数
				var cc = bb.substring(dian + 1);
				if (cc.length >= 3) { //长度大于3，就例如是：3.452  四舍五入为 3.46
					if (bb.substring(dian + 3, dian + 4) >= 5) { //取小数点后的第三位数
						result = Number(num.toFixed(2)) - 0.01;
					} else {
						result = Number(num.toFixed(2));
					}
				} else { //10.2 -> 10.20
					result = num.toFixed(2); //保留两位小数,不四舍五入
				}
			}
			return result;
		},
		bfshibuy(bai, index, toNum) {
			//计算市价的交易额
			var NumBai = parseInt(bai) / 100;
			if (this.main_balance <= 0) {
				return false;
			}
			var num = this.main_balance * NumBai;
			//判断是否包含小数点
			if (num.toString().indexOf(".") != -1) {
				var par = num.toString().split(".")[0];
				var xiao = num.toString().split(".")[1].slice(0, toNum);
				var Zhen = parseFloat(par + "." + xiao);
				this.amount1.amount = Zhen;
			} else {
				this.amount1.amount = num;
			}
			for (let i = 0; i < this.baiList3.length; i++) {
				this.baiList3[i].active = false;
			}
			this.baiList3[index].active = true;

		},
		bfshisell(bai, index, toNum) {
			//计算市价的卖出量
			var NumBai = parseInt(bai) / 100;
			if (this.yes_balance <= 0) {
				return false;
			}
			var num = this.yes_balance * NumBai;
			//判断是否包含小数点
			if (num.toString().indexOf(".") != -1) {
				var par = num.toString().split(".")[0];
				var xiao = num.toString().split(".")[1].slice(0, toNum);
				var Zhen = parseFloat(par + "." + xiao);
				this.amount2.amount = Zhen;
			} else {
				this.amount2.amount = num;
			}
			for (let i = 0; i < this.baiList4.length; i++) {
				this.baiList4[i].active = false;
			}
			this.baiList4[index].active = true;
		},
		////获取币种信息
		getCurrency() {
			var _this = this; ///请求
			axios.get(httpUrl.currency, {
				params: {
					currency_id: _this.currency
				}
			}).then(function (res) {
				///显示弹框
				if (res.data.status.code == 200) {
					_this.show = !_this.show;
					_this.currencyDetailsList = res.data.data;
				}

			}, function (error) {
				console.log(error)
			})
		},
		///查看状态
		isdatail(i) {
			this.HistoryDeal[i].isShow = !this.HistoryDeal[i].isShow;
			if (this.HistoryDeal[i].isShow) {
				this.$refs.xianqing[i].parentNode.parentNode.nextElementSibling.style.display = "block";
				this.$refs.xianqing[i].innerHTML = this.$t("userCenter.Donotuse");
			} else {
				this.$refs.xianqing[i].parentNode.parentNode.nextElementSibling.style.display = "none";
				this.$refs.xianqing[i].innerHTML = this.$t("list.Details");
			}
		},
		///////深度合并
		merge(num) {
			var _this = this;
			/////遍历卖列表   先把值替换
			for (let i = 0; i < _this.sellList.length; i++) {
				_this.sellList[i].prices = Math.round(_this.sellList[i].price * num) / num;
			}
			for (let i = 0; i < _this.sellList.length; i++) { //遍历第一层从0开始
				for (let j = i + 1; j < _this.sellList.length; j++) { //遍历第二层从1开始
					if (_this.sellList[i].prices == _this.sellList[j].prices) { ///判断价格是否相同
						_this.sellList[i].count += _this.sellList[j].count;
						_this.sellList.splice(j, 1); ////删除
						j--;
					}
				}
			}

			/////遍历买列表      先把值替换
			for (let i = 0; i < _this.buyList.length; i++) {
				_this.buyList[i].prices = Math.round(_this.buyList[i].price * num) / num;
			}
			for (let i = 0; i < _this.buyList.length; i++) { //遍历第一层从0开始
				for (let j = i + 1; j < _this.buyList.length; j++) { //遍历第二层从1开始
					if (_this.buyList[i].prices == _this.buyList[j].prices) { ///判断价格是否相同
						_this.buyList[i].count += _this.buyList[j].count;
						_this.buyList.splice(j, 1); ////删除
						j--;
					}
				}
			}

			/////再重新判断
			var sum1 = 0;
			_this.buyList.forEach(function (item) {
				sum1 = parseFloat(item.count) + sum1;
				item.sum = sum1;
			})

			var sum = 0;
			_this.sellList.forEach(function (item) {
				sum = parseFloat(item.count) + sum;
				item.sum = sum;
			})

		},
		////搜索
		searchBz(val) {
			var _this = this;
			var to_Up = val.toUpperCase();
			_this.searchVal = _this.searchVal.toUpperCase();
			//判断用户输入是否是空格
			var num = 0;
			for (let i = 0; i < _this.coin_matching.length; i++) {
				num = 0;
				for (let j = 0; j < _this.coin_matching[i].matchcoins.length; j++) {
					if (_this.coin_matching[i].matchcoins[j].pageIdentifier.indexOf(_this.searchVal) != -1) {
						num++;
					}
				}
				_this.coin_matching[i]["num"] = num;
			}
			////判断币种
			for (let i = 0; i < _this.coin_matching.length; i++) {
				for (let item in _this.coin_matching[i]) {
					for (let k = 0; k < _this.coin_matching[i].main.length; k++) {
						//判断是否存在
						if (_this.coin_matching[i].main[k].pageIdentifier.indexOf(_this.searchVal) == -1) {
							_this.coin_matching[i].main[k].isIf = false;
						} else {
							_this.coin_matching[i].main[k].isIf = true;
						}
					}
				}
			}
			for (let i = 0; i < _this.coin_matching.length; i++) {
				for (let item in _this.coin_matching[i]) {
					for (let k = 0; k < _this.coin_matching[i].innovation.length; k++) {
						//判断是否存在
						if (_this.coin_matching[i].innovation[k].pageIdentifier.indexOf(_this.searchVal) == -1) {
							_this.coin_matching[i].innovation[k].isIf = false;
						} else {
							_this.coin_matching[i].innovation[k].isIf = true;
						}
					}
				}
			}
			///收藏币种
			var one_num = 0
			for (let i = 0; i < _this.OptionalList.main.length; i++) {
				//判断是否存在
				if (_this.OptionalList.main[i].matchname.indexOf(_this.searchVal) == -1) {
					_this.OptionalList.main[i].isIf = false;
				} else {
					_this.OptionalList.main[i].isIf = true;
					one_num++;
				}
			}
			for (let i = 0; i < _this.OptionalList.innovation.length; i++) {
				//判断是否存在
				if (_this.OptionalList.innovation[i].matchname.indexOf(_this.searchVal) == -1) {
					_this.OptionalList.innovation[i].isIf = false;
				} else {
					_this.OptionalList.innovation[i].isIf = true;
					one_num++;
				}
			}
			if (one_num == 0) {
				this.isEmpoet = true;
			} else {
				this.isEmpoet = false;
			}
		},
		////收藏
		isClone(data, e, index) {
			var _this = this;
			//判断用户是否登录
			if (this.token == null && this.token == undefined) { ///未登录执行
				if (e.target.className == "iconfont icon-xingxing") {
					e.target.className = "iconfont icon-xingxingman";
					_this.itemslocalstorge.push(
						data.matchcoin_id
					); ///将ID存起来
					var kk1 = [];
					///////将收藏的币种进行判断是否在主币区或者收藏区
					for (let j = 0; j < _this.coin_matching.length; j++) { //遍历本地获取的币种数据
						for (let item in _this.coin_matching[j]) { ///遍历大币种对
							for (let n = 0; n < _this.coin_matching[j].innovation.length; n++) { ///遍历主币
								if (data.matchcoin_id == _this.coin_matching[j].innovation[n].matchcoin_id) { ///判断币对id是否相同
									if (_this.OptionalList.innovation.length == 0 || kk1.indexOf(_this.coin_matching[j].innovation[n].matchcoin_id) == -1) {
										_this.OptionalList.innovation.push({
											'isIf': true,
											'matchcoin_id': _this.coin_matching[j].innovation[n].matchcoin_id,
											'matchname': _this.coin_matching[j].innovation[n].pageIdentifier + "/" + _this.coin_matching[j].pageIdentifier,
											"price": _this.coin_matching[j].innovation[n].price,
											"updown": _this.coin_matching[j].innovation[n].updown,
											"hour24": _this.coin_matching[j].innovation[n].hour24
										})
										kk1.push(_this.coin_matching[j].innovation[n].matchcoin_id)
									}
								}
							}
						}
					}
					//////判断是否在收藏区
					var kk2 = [];
					for (let j = 0; j < _this.coin_matching.length; j++) { //遍历本地获取的币种数据
						for (let item in _this.coin_matching[j]) { ///遍历大币种对
							for (let n = 0; n < _this.coin_matching[j].main.length; n++) { ///遍历主币
								if (data.matchcoin_id == _this.coin_matching[j].main[n].matchcoin_id) { ///判断币对id是否相同
									///判断是否存在里面
									if (_this.OptionalList.main.length == 0 || kk2.indexOf(_this.coin_matching[j].main[n].matchcoin_id) == -1) {
										_this.OptionalList.main.push({
											'isIf': true,
											'matchcoin_id': _this.coin_matching[j].main[n].matchcoin_id,
											'matchname': _this.coin_matching[j].main[n].pageIdentifier + "/" + _this.coin_matching[j].pageIdentifier,
											"price": _this.coin_matching[j].main[n].price,
											"updown": _this.coin_matching[j].main[n].updown,
											"hour24": _this.coin_matching[j].main[n].hour24
										})
										kk2.push(_this.coin_matching[j].main[n].matchcoin_id)
									}
								}
							}
						}
					}
					/*判断收藏区的币种是否为空*/
					if (this.OptionalList.main.length == 0 && this.OptionalList.innovation.length == 0) {
						this.isEmpoet = true;
					} else {
						this.isEmpoet = false;
					}
				} else { ///取消收藏
					for (let i = 0; i < _this.itemslocalstorge.length; i++) { // 将数据删除
						if (_this.itemslocalstorge[i] == data.matchcoin_id) {
							_this.itemslocalstorge.splice(i, 1);
							i--;
						}
					}
					///遍历收藏主币区
					for (let k = 0; k < _this.OptionalList.main.length; k++) {
						if (_this.OptionalList.main[k].matchcoin_id == data.matchcoin_id) {
							_this.OptionalList.main.splice(k, 1);
							k--;
						}
					}
					///遍历收藏创新区
					for (let n = 0; n < _this.OptionalList.innovation.length; n++) {
						if (_this.OptionalList.innovation[n].matchcoin_id == data.matchcoin_id) {
							_this.OptionalList.innovation.splice(n, 1);
							n--;
						}
					}
					e.target.className = "iconfont icon-xingxing"; ////先删除后改变类名
					//判断收藏区的币种是否为空
					if (this.OptionalList.main.length == 0 && this.OptionalList.innovation.length == 0) {
						this.isEmpoet = true;
					} else {
						this.isEmpoet = false;
					}
				}
			} else {
				////////登录成功收藏
				///调用判断是否刷新token
				_this.callback();
				if (e.target.className == "iconfont icon-xingxing") {
					e.target.className = "iconfont icon-xingxingman";
					/***********收藏先操作dom再请求***********/
					_this.getIcon.push( ///将ID存起来
						data.matchcoin_id
					)
					var kong1 = [];
					///////将收藏的币种进行判断是否在主币区或者收藏区
					for (let j = 0; j < _this.coin_matching.length; j++) { //遍历本地获取的币种数据
						for (let item in _this.coin_matching[j]) { ///遍历大币种对
							for (let n = 0; n < _this.coin_matching[j].innovation.length; n++) { ///遍历主币
								if (data.matchcoin_id == _this.coin_matching[j].innovation[n].matchcoin_id) { ///判断币对id是否相同
									if (_this.OptionalList.innovation.length == 0 || kong1.indexOf(_this.coin_matching[j].innovation[n].matchcoin_id) == -1) {
										_this.OptionalList.innovation.push({
											'isIf': true,
											'matchcoin_id': _this.coin_matching[j].innovation[n].matchcoin_id,
											'matchname': _this.coin_matching[j].innovation[n].pageIdentifier + "/" + _this.coin_matching[j].pageIdentifier,
											"price": _this.coin_matching[j].innovation[n].price,
											"updown": _this.coin_matching[j].innovation[n].updown,
											"hour24": _this.coin_matching[j].innovation[n].hour24
										})
										kong1.push(_this.coin_matching[j].innovation[n].matchcoin_id)
									}
								}
							}
						}
					}

					//////判断是否在收藏区
					var kong = [];
					for (let j = 0; j < _this.coin_matching.length; j++) { //遍历本地获取的币种数据
						for (let item in _this.coin_matching[j]) { ///遍历大币种对
							for (let n = 0; n < _this.coin_matching[j].main.length; n++) { ///遍历主币
								if (data.matchcoin_id == _this.coin_matching[j].main[n].matchcoin_id) { ///判断币对id是否相同
									///判断是否存在里面
									if (_this.OptionalList.main.length == 0 || kong.indexOf(_this.coin_matching[j].main[n].matchcoin_id) == -1) {
										_this.OptionalList.main.push({
											'isIf': true,
											'matchcoin_id': _this.coin_matching[j].main[n].matchcoin_id,
											'matchname': _this.coin_matching[j].main[n].pageIdentifier + "/" + _this.coin_matching[j].pageIdentifier,
											"price": _this.coin_matching[j].main[n].price,
											"updown": _this.coin_matching[j].main[n].updown,
											"hour24": _this.coin_matching[j].main[n].hour24
										})
										kong.push(_this.coin_matching[j].main[n].matchcoin_id)
									}
								}
							}
						}
					}
					axios.post(httpUrl.follow_matchcoin, {
						matchcoin_id: data.matchcoin_id
					}, {
							headers: {
								"Authorization": "Bearer " + _this.token
							}
						}).then(function (res) {
							if (res.data.data == true) { ///成功
								return true;
								//console.log("success")
							}

						}, function (error) {
							console.log(error)
						})
					//判断收藏区的币种是否为空
					if (this.OptionalList.main.length == 0 && this.OptionalList.innovation.length == 0) {
						this.isEmpoet = true;
					} else {
						this.isEmpoet = false;
					}
				} else {
					////取消收藏
					///遍历收藏主币区
					///遍历收藏列表
					for (let i = 0; i < _this.getIcon.length; i++) { ///取消收藏        将存储数据删除
						if (_this.getIcon[i] == data.matchcoin_id) {
							_this.getIcon.splice(i, 1);
							i--;
						}
					}
					for (let k = 0; k < _this.OptionalList.main.length; k++) {
						if (_this.OptionalList.main[k].matchcoin_id == data.matchcoin_id) {
							_this.OptionalList.main.splice(k, 1);
							k--;
						}
					}
					///遍历收藏创新区
					for (let n = 0; n < _this.OptionalList.innovation.length; n++) {
						if (_this.OptionalList.innovation[n].matchcoin_id == data.matchcoin_id) {
							_this.OptionalList.innovation.splice(n, 1);
							n--;
						}
					}
					/////////登录成功取消收藏
					axios.post(httpUrl.follow_matchcoin, {
						matchcoin_id: data.matchcoin_id
					}, {
							headers: {
								"Authorization": "Bearer " + _this.token
							}
						}).then(function (res) {
							if (res.data.data == false) {
								return true;
							}
						}, function (error) {
							console.log(error)
						})
					e.target.className = "iconfont icon-xingxing";
					//判断收藏区的币种是否为空
					if (this.OptionalList.main.length == 0 && this.OptionalList.innovation.length == 0) {
						this.isEmpoet = true;
					} else {
						this.isEmpoet = false;
					}
				}
			}
		},
		////取消主区收藏(未登录状态)
		notZhu(item, $event, index) {
			var _this = this;
			_this.OptionalList.main.splice(index, 1); ///取消就将它自己移除
			for (let i = 0; i < _this.itemslocalstorge.length; i++) { ///删除选中的id
				if (_this.itemslocalstorge[i] == item.matchcoin_id) {
					_this.itemslocalstorge.splice(i, 1);
					i--;
				}
			}
			//判断收藏区的币种是否为空
			if (this.OptionalList.main.length == 0 && this.OptionalList.innovation.length == 0) {
				this.isEmpoet = true;
			} else {
				this.isEmpoet = false;
			}
		},
		////取消创新区收藏(未登录状态)
		notNew(item, $event, index) {
			var _this = this;
			_this.OptionalList.innovation.splice(index, 1); ///取消就将它自己移除
			for (let i = 0; i < _this.itemslocalstorge.length; i++) { ///删除选中的id
				if (_this.itemslocalstorge[i] == item.matchcoin_id) {
					_this.itemslocalstorge.splice(i, 1);
					i--;
				}
			}
			//判断收藏区的币种是否为空
			if (this.OptionalList.main.length == 0 && this.OptionalList.innovation.length == 0) {
				this.isEmpoet = true;
			} else {
				this.isEmpoet = false;
			}
		},
		////取消主区收藏(登录状态)
		removeZhu(item, $event, index) {
			var _this = this;
			///调用判断是否刷新token
			_this.callback();
			////登录成功得请求接口
			_this.OptionalList.main.splice(index, 1); ///取消就将它自己移除
			axios.post(httpUrl.follow_matchcoin, {
				matchcoin_id: item.matchcoin_id
			}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function (res) {
					if (res.data.data == false) {
						for (let i = 0; i < _this.getIcon.length; i++) { ///删除选中的id
							if (_this.getIcon[i] == item.matchcoin_id) {
								_this.getIcon.splice(i, 1);
								i--;
							}
						}
					}

					//判断收藏区的币种是否为空
					if (_this.OptionalList.main.length == 0 && _this.OptionalList.innovation.length == 0) {
						_this.isEmpoet = true;
					} else {
						_this.isEmpoet = false;
					}
				}, function (error) {
					console.log(error)
				})

		},
		///取消创新区收藏(登录状态)
		removeNew(item, $event, index) {
			var _this = this;
			///调用判断是否刷新token
			_this.callback();
			////登录成功得请求接口
			_this.OptionalList.innovation.splice(index, 1); ///取消就将它自己移除
			axios.post(httpUrl.follow_matchcoin, {
				matchcoin_id: item.matchcoin_id
			}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function (res) {
					if (res.data.data == false) {
						for (let i = 0; i < _this.getIcon.length; i++) { ///删除选中的id
							if (_this.getIcon[i] == item.matchcoin_id) {
								_this.getIcon.splice(i, 1);
								i--;
							}
						}
					}
					//判断收藏区的币种是否为空
					if (_this.OptionalList.main.length == 0 && _this.OptionalList.innovation.length == 0) {
						_this.isEmpoet = true;
					} else {
						_this.isEmpoet = false;
					}

				}, function (error) {
					console.log(error)
				})

		},
		//////历史委托切换时间
		historyEntrust(time) {
			var _this = this;
			_this.Historydatetype = time; //获取当日 或者 一个星期  一个月 状态
			if (this.getColor != 1) {
				$(".wt-content .time-tab-left li").eq(time).addClass("qh-active").siblings("li").removeClass("qh-active");
			} else {
				$(".wt-content .time-tab-left li").eq(time).addClass("qh-active-white").siblings("li").removeClass("qh-active-white").removeClass("qh-active");
			}
			///调用判断是否刷新token
			_this.callback();
			if (_this.token == null && _this.token == undefined) {
				return false;
			} else {
				axios.get(httpUrl.history, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						datetype: time,
						matchcoin_id: _this.matchcoin_id
					}
				}).then(function (res) {
					_this.HistoryList = res.data.data.data;
					_this.HistoryTotal = res.data.data.total; //总条数
				}, function (err) {
					console.log(err)
				})
			}
		},
		////搜索具体时间 --------历史委托部分
		searchTime() {
			var _this = this;
			this.Historydatetype = 4; ///搜索具体时间
			///调用判断是否刷新token
			_this.callback();
			if (_this.token == null && _this.token == undefined) {
				return false;
			} else {
				/*设置时区*/
				let startdate = _this.formAdd(_this.value13[0]); /*开始时间*/
				let enddate = _this.formAdd(_this.value13[1]); /*结束时间*/
				axios.get(httpUrl.history, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						datetype: 4,
						startdate: startdate,
						enddate: enddate,
						matchcoin_id: _this.matchcoin_id
					}
				}).then(function (res) {
					_this.HistoryList = res.data.data.data;
					_this.HistoryTotal = res.data.data.total; //总条数

				}, function (err) {
					console.log(err)
				})
			}
		},
		/////搜索具体时间 --------历史成交部分
		searchTime1() {
			var _this = this;
			_this.HistoryDealdatetype = 4; //搜索具体时间的接口
			///调用判断是否刷新token
			_this.callback();
			if (_this.token == null && _this.token == undefined) {
				return false;
			} else {
				let startdate = _this.formAdd(_this.value14[0]); /*开始时间*/
				let enddate = _this.formAdd(_this.value14[1]); /*结束时间*/
				axios.get(httpUrl.history, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						datetype: 4,
						status: 1,
						startdate: startdate,
						enddate: enddate,
						matchcoin_id: _this.matchcoin_id
					}
				}).then(function (res) {
					_this.HistoryDeal = res.data.data.data;
					_this.HistoryDealTotal = res.data.data.total; //获取历史成交的总条数
					for (let i = 0; i < _this.HistoryDeal.length; i++) {
						_this.HistoryDeal[i].isShow = false;
					}

				}, function (err) {
					console.log(err)
				})
			}
		},
		////撤单事件
		back(id, index) {
			var _this = this;
			///调用判断是否刷新token
			_this.callback();
			axios.post(httpUrl.back, {
				"transaction_eid": id
			}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function (res) {
					return true;
				}, function (err) {
					console.log(err)
				})
			_this.currentList.splice(index, 1); //CurrentPage
			_this.currentTotal--;
			var Counter = Math.ceil(_this.currentTotal / 5); //获取当前页数
			if (_this.CurrentPage > Counter) {
				_this.CurrentPage = Counter
			}
			setTimeout(function () {
				axios.get(httpUrl.current, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						matchcoin_id: _this.matchcoin_id,
						page: _this.CurrentPage
					}
				}).then(function (res) {
					_this.currentList = res.data.data.data; ///获取当前委托列表
					_this.currentTotal = res.data.data.total; //总条数
				}, function (err) {
					console.log(err)
				})
			}, 3500)

		},
		/////切换币种
		tabBz(mainId, macid, yesId) { ///传入币对的ID
			// window.localStorage.setItem("Coins", mainId)
			this.Coins = mainId;
			this.currency_id = yesId;
			this.matchcoin_id = macid;
			this.viewData.matchcoin_id = macid;
			this.limit.matchcoin_id = macid;
			this.limit2.matchcoin_id = macid;
			this.amount1.matchcoin_id = macid;
			this.amount2.matchcoin_id = macid;
			this.isShow = false;
			this.ws.send('{"mid":"' + macid + '"}')
			// window.localStorage.setItem("currency_id", yesId);
			this.$router.push({
				name: "bbjy",
				params: {
					id: macid
				}
			})
			this.refreshViewData()
			this.refreshHistory();
			/**********刷新资产管理************/
			this.refreshFinances();
			this.refreshBuySellQueue();
			this.refreshRealTimeList();
			// window.location.reload();
			if (this.onResetCacheNeededCallback) {
				this.onResetCacheNeededCallback();
				window.tvWidget.activeChart().resetData();
			}

		},
		/////限价的买入
		xjClickbuy() {
			var _this = this;
			_this.callback(); ///刷新token
			if (_this.limit.price == null || _this.limit.price == "") { ////判断买入价是否为空
				this.tishiIsShow = true;
				_this.tiShi = _this.$t("bbjy.Pleasebuyprice");
				setTimeout(() => {
					_this.tishiIsShow = false;
				}, 1500)
				return false;
			}
			if (_this.limit.count == null || _this.limit.count == "") { ////判断买入量是否为空
				_this.tishiIsShow = true;
				_this.tiShi = _this.$t("bbjy.Pleasevolume");
				setTimeout(() => {
					_this.tishiIsShow = false;
				}, 1500)
				return false;
			}
			if (_this.shishiList.length > 0) {
				var num = _this.limit.count * _this.limit.price;
				if (num.toString().indexOf(".") != -1) {
					var par = num.toString().split(".")[0];
					var xiao = num.toString().split(".")[1].slice(0, _this.viewData.decimals);
					var Zhen = parseFloat(par + "." + xiao);
					if (Zhen <= 0) {
						_this.tishiIsShow = true;
						_this.tiShi = _this.$t("bbjy.Mistakenamount");
						setTimeout(() => {
							_this.tishiIsShow = false;
						}, 1000)
						return false;
					}
				}
				if (_this.limit.price == 0) {
					_this.tishiIsShow = true;
					_this.tiShi = _this.$t("bbjy.pricebe0");
					setTimeout(() => {
						_this.tishiIsShow = false;
					}, 1000)
					return false;
				}
				if (_this.limit.count == 0 && _this.limit.count != '') {
					_this.tishiIsShow = true;
					_this.tiShi = _this.$t("bbjy.numbernot0");
					setTimeout(() => {
						_this.tishiIsShow = false;
					}, 1000)
					return false;
				}
				///计算最大数量
				var maxNum = parseFloat(_this.main_balance / _this.limit.price); //      （主币余额 / 限价的价格） = 拿到最大可买入量
				var Zhen;
				if (maxNum.toString().indexOf(".") != -1) {
					var par = maxNum.toString().split(".")[0];
					var xiao = maxNum.toString().split(".")[1].slice(0, _this.viewData.count_decimals);
					Zhen = parseFloat(par + "." + xiao);
				} else {
					Zhen = parseFloat(maxNum.toFixed(_this.viewData.count_decimals));
				}
				var money2 = parseFloat(_this.shishiList[0].price + _this.shishiList[0].price * 0.1); ////买入不能高于最新价格的110%;
				if (parseFloat(_this.limit.count) > Zhen) { ////输入买入数量是否大于最大可买入量
					_this.tishiIsShow = true;
					_this.tiShi = _this.$t("bbjy.notBig") + Zhen;
					setTimeout(() => {
						_this.tishiIsShow = false;
					}, 1500)
					return false;
				}
				//					else if(parseFloat(_this.limit.price) > money2) { ////买入不能高于最新价格的110%;
				//						_this.tishiIsShow = true;
				//						if(_this.lang == "en") {
				//							_this.tiShi = "The buying price is not more than 110% of the present price."
				//						} else if(_this.lang == "ko") {
				//							_this.tiShi = "매입 가격은 현재 가격의 110% 보다 높을 수 없다."
				//						} else {
				//							_this.tiShi = "买入价格不能高于现价的110%";
				//						}
				//						setTimeout(() => {
				//							_this.tishiIsShow = false;
				//						}, 1500)
				//
				//					}
				else {
					////成功发送请求
					axios.post(httpUrl.limit, _this.limit, {
						headers: {
							"Authorization": "Bearer " + _this.token
						}
					}).then(function (res) {
						if (_this.ISlightningBuy == false) {
							_this.limit.count = ""; //清空数量
						}
						///判断状态码
						if (res.data.status.code == 200) {
							_this.tishiIsShow = true;
							_this.tiShi = _this.$t("bbjy.Successful");
							_this.tishiIcon = false; //感叹号消失
							_this.tishiIcon2 = true; //对号显示
							setTimeout(() => {
								_this.tishiIsShow = false;
								_this.tishiIcon = true; //感叹号显示
								_this.tishiIcon2 = false; //对号消失
							}, 1500)
						}
						/*百分比选中状态消失*/
						$(".mai-rujia .bai-fen span").removeClass("write")

					}, function (error) {
						console.log(error)
					})

				}
			}
			/*有实时成交数据*/
			if (_this.shishiList.length == 0) { /*如果没有数据,用户可以随便输入*/
				if (_this.main_balance <= 0) {
					_this.tishiIsShow = true;
					_this.tiShi = _this.$t("bbjy.Nobalance");
					setTimeout(() => {
						_this.tishiIsShow = false;
					}, 1000)
					return false;
				}
				if (_this.limit.price == 0) {
					return false;
				}

				////成功发送请求
				axios.post(httpUrl.limit, _this.limit, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function (res) {
					if (_this.ISlightningBuy == false) {
						_this.limit.count = ""; //清空数量
					}
					///判断状态码
					if (res.data.status.code == 200) {
						_this.tishiIsShow = true;
						_this.tiShi = _this.$t("bbjy.Successful");
						_this.tishiIcon = false; //感叹号消失
						_this.tishiIcon2 = true; //对号显示
						setTimeout(() => {
							_this.tishiIsShow = false;
							_this.tishiIcon = true; //感叹号显示
							_this.tishiIcon2 = false; //对号消失
						}, 1500)
					}
				}, function (error) {
					console.log(error)
				})

			}

		},
		/////限价的卖出
		xjClicksell() {
			//交易内容部分
			var _this = this;
			///调用判断是否刷新token
			_this.callback();
			if (_this.limit2.price == "") { ////输入卖出价格不能未空
				_this.tishiIsShow = true;
				_this.tiShi = _this.$t("bbjy.sellingprice");
				setTimeout(() => {
					_this.tishiIsShow = false;
				}, 1500)
				return false;
			}
			if (_this.limit2.count == "") { ////输入卖出数量不能未空
				_this.tishiIsShow = true;
				_this.tiShi = _this.$t("bbjy.salesvolume");
				setTimeout(() => {
					_this.tishiIsShow = false;
				}, 1500)
				return false;
			}
			if (_this.shishiList.length > 0) {
				if (_this.limit2.price == 0) {
					return false;
				}
				var num = _this.limit2.count * _this.limit2.price;
				if (num.toString().indexOf(".") != -1) {
					var par = num.toString().split(".")[0];
					var xiao = num.toString().split(".")[1].slice(0, _this.viewData.decimals);
					var Zhen = parseFloat(par + "." + xiao);
					if (Zhen <= 0) {
						_this.tishiIsShow = true;
						_this.tiShi = _this.$t("bbjy.amountMistaken");
						setTimeout(() => {
							_this.tishiIsShow = false;
						}, 1000)
						return false;
					}
				}
				if (_this.limit2.count == 0 && _this.limit2.count != "") {
					_this.tishiIsShow = true;
					_this.tiShi = _this.$t("bbjy.Salesbe0");
					setTimeout(() => {
						_this.tishiIsShow = false;
					}, 1500)
					return false;
				}
				/*判断买入BTC的余额*/

				var money2 = parseFloat(_this.shishiList[0].price - _this.shishiList[0].price * 0.1); ////最新价格         ////判断输入价格是否低于最新价的90%
				var maxNum = parseFloat(_this.yes_balance).toFixed(_this.viewData.count_decimals); ///计算最大数量
				var Zhen;
				if (parseFloat(_this.limit2.count) > maxNum) { ////输入卖出数量是否大于最大可卖入量
					_this.tishiIsShow = true;
					_this.tiShi = _this.$t("bbjy.Sellingvolume") + maxNum;
					setTimeout(() => {
						_this.tishiIsShow = false;
					}, 1500)
					return false;
				}
				//					else if(parseFloat(_this.limit2.price) < money2) { ////判断输入价格是否低于最新价的90%
				//						_this.tishiIsShow = true;
				//						if(_this.lang == "en") {
				//							_this.tiShi = "The selling price should not be less than 90% of the present price."
				//						} else if(_this.lang == "ko") {
				//							_this.tiShi = "매각 가격 은 현가 의 90% 보다 낮을 수 없다"
				//						} else {
				//							_this.tiShi = "卖出价格不能低于现价的90%";
				//						}
				//						setTimeout(() => {
				//							_this.tishiIsShow = false;
				//						}, 1500)
				//					}
				else {
					/////成功发送请求
					axios.post(httpUrl.limit, _this.limit2, {
						headers: {
							"Authorization": "Bearer " + _this.token
						}
					}).then(function (res) {
						if (_this.ISlightningSell == false) {
							_this.limit2.count = "";
						}
						//console.log(res)
						///判断状态码
						if (res.data.status.code == 200) {
							_this.tishiIsShow = true;
							_this.tiShi = _this.$t("bbjy.Successful");
							_this.tishiIcon = false; //感叹号消失
							_this.tishiIcon2 = true; //对号显示
							setTimeout(() => {
								_this.tishiIsShow = false;
								_this.tishiIcon = true; //感叹号显示
								_this.tishiIcon2 = false; //对号消失
							}, 1500)
						}
						/*百分比选中状态消失*/
						$(".mai-chujia .bai-fen span").removeClass("write");
					}, function (error) {
						console.log(error)
					})

				}
			}
			/*没有实时成交的数据*/
			if (_this.shishiList.length == 0) {
				if (_this.yes_balance <= 0) {
					_this.tishiIsShow = true;
					_this.tiShi = _this.$t("bbjy.Nobalance");
					setTimeout(() => {
						_this.tishiIsShow = false;
					}, 1000)
					return false;
				}
				if (_this.limit2.price == 0) {
					return false;
				}
				/////成功发送请求
				axios.post(httpUrl.limit, _this.limit2, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function (res) {
					if (_this.ISlightningSell == false) {
						_this.limit2.count = "";
					}
					//console.log(res)
					///判断状态码
					if (res.data.status.code == 200) {
						_this.tishiIsShow = true;
						_this.tiShi = _this.$t("bbjy.Successful");
						_this.tishiIcon = false; //感叹号消失
						_this.tishiIcon2 = true; //对号显示
						setTimeout(() => {
							_this.tishiIsShow = false;
							_this.tishiIcon = true; //感叹号显示
							_this.tishiIcon2 = false; //对号消失
						}, 1500)

					}

				}, function (error) {
					console.log(error)
				})

			}

		},
		////市价的买入
		sjClickbuy() {
			var _this = this;
			///调用判断是否刷新token
			_this.callback();
			////判断是否为空
			if (_this.amount1.amount == "") {
				_this.tishiIsShow = true;
				_this.tiShi = _this.$t("bbjy.Transactionamount");
				setTimeout(() => {
					_this.tishiIsShow = false;
				}, 1500)
				return false;
			}
			if (_this.amount1.amount == 0 && _this.amount1.amount != '') {
				_this.tishiIsShow = true;
				_this.tiShi = _this.$t("bbjy.volumebe0");
				setTimeout(() => {
					_this.tishiIsShow = false;
				}, 1500)
				return false;
			}
			if (parseFloat(_this.amount1.amount) > parseFloat(_this.main_balance)) {
				_this.tishiIsShow = true;
				_this.tiShi = _this.$t("bbjy.Pleaseamount") + _this.main_balance;
				setTimeout(() => {
					_this.tishiIsShow = false;
				}, 1500)
				return false;
			} else {
				////发起请求
				axios.post(httpUrl.amount, _this.amount1, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function (res) {
					_this.amount1.amount = "";
					///判断状态码
					if (res.data.status.code == 200) {
						_this.tiShi = _this.$t("bbjy.Successful");
						_this.tishiIcon = false; //感叹号消失
						_this.tishiIcon2 = true; //对号显示
						_this.tishiIsShow = true;
						setTimeout(() => {
							_this.tishiIsShow = false;
							_this.tishiIcon = true; //感叹号显示
							_this.tishiIcon2 = false; //对号消失

						}, 1500)
						/*删除百分比选中样式*/
						$(".shijia-left .bai-fen span").removeClass("write");
					}

				}, function (error) {
					console.log(error)
				})

			}

		},
		////市价的卖出
		sjClicksell() {
			var _this = this;
			///调用判断是否刷新token
			_this.callback();

			////判断是否为空
			if (_this.amount2.amount == "") {
				_this.tishiIsShow = true;
				_this.tiShi = _this.$t("bbjy.salesvolume");
				setTimeout(() => {
					_this.tishiIsShow = false;
				}, 1500)
				return false;
			} else if (_this.amount2.amount == 0 && _this.amount2.amount != '') {
				_this.tishiIsShow = true;
				_this.tiShi = _this.$t("bbjy.Salesbe0");
				setTimeout(() => {
					_this.tishiIsShow = false;
				}, 1500)
				return false;
			} else if (parseFloat(_this.amount2.amount) > parseFloat(_this.yes_balance)) {
				_this.tishiIsShow = true;
				_this.tiShi = _this.$t("bbjy.Maximumamount") + _this.yes_balance;
				setTimeout(() => {
					_this.tishiIsShow = false;
				}, 1500)
				return false;
			} else {
				////发起请求
				axios.post(httpUrl.amount, _this.amount2, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function (res) {
					_this.amount2.amount = ""
					///判断状态码
					if (res.data.status.code == 200) {
						_this.tishiIsShow = true;
						_this.tiShi = _this.$t("bbjy.Successful");
						_this.tishiIcon = false; //感叹号消失
						_this.tishiIcon2 = true; //对号显示
						setTimeout(() => {
							_this.tishiIsShow = false;
							_this.tishiIcon = true; //感叹号显示
							_this.tishiIcon2 = false; //对号消失

						}, 1500)
						/*删除百分比选中样式*/
						$(".shijia-left .bai-fen span").removeClass("write");
					}
				}, function (error) {
					console.log(error)
				})

			}

		},

		/////自选
		Optional() {
			if (this.getColor != 1) {
				$(".zi-xuan").addClass("xxk-active").siblings(".alert-header-list li").removeClass("xxk-active");
				$(".zixuan-content").show().siblings(".content-box-list").hide();
			} else {
				$(".zi-xuan").addClass("xxk-active-white").siblings(".alert-header-list li").removeClass("xxk-active-white");
				$(".zixuan-content").show().siblings(".content-box-list").hide();
			}
			if (this.OptionalList.main.length == 0 && this.OptionalList.innovation.length == 0) {
				this.isEmpoet = true;
			} else {
				this.isEmpoet = false;
			}
		},

		///////币种切换
		tabSwitch(index, id) {
			if (this.getColor != 1) {
				$(".alert-header-list li").eq(index).addClass("xxk-active").siblings().removeClass("xxk-active");
				this.ziActive = false; ///隐藏自选部分
				$(".alert-content-box .content-box-list").eq(index).show().siblings().hide()
			} else {
				$(".alert-header-list li").eq(index).addClass("xxk-active-white").siblings().removeClass("xxk-active-white");
				this.ziActive = false; ///隐藏自选部分
				$(".alert-content-box .content-box-list").eq(index).show().siblings().hide()
			}

		},
		////委托切换
		tabisActive(index) {
			var _this = this;
			///调用判断是否刷新token
			_this.callback();
			if (this.getColor != 1) {
				$(".wt-title .list li").eq(index).addClass("xxk-active").siblings("li").removeClass("xxk-active");
			} else {
				$(".wt-title .list li").eq(index).addClass("xxk-active-white").siblings("li").removeClass("xxk-active-white");
			}

			$(".wt-content").eq(index).show().siblings(".wt-content").hide();

			if (_this.token == null && _this.token == undefined) {
				return false;
			} else {
				///判断获取当前委托内容
				if (index == 0) {
					axios.get(httpUrl.current, {
						headers: {
							"Authorization": "Bearer " + _this.token
						},
						params: {
							matchcoin_id: _this.matchcoin_id
						}
					}).then(function (res) {
						_this.currentList = res.data.data.data; ///获取当前委托列表
						_this.currentTotal = res.data.data.total; //总条数

					}, function (err) {
						console.log(err)
					})
				}
				///判断获取历史委托内容
				if (index == 1) {
					$(".wt-content .time-tab-left li").eq(0).addClass("qh-active").siblings("li").removeClass("qh-active");
					/////获取历史委托内容
					axios.get(httpUrl.history, {
						headers: {
							"Authorization": "Bearer " + _this.token
						},
						params: {
							datetype: 0,
							matchcoin_id: _this.matchcoin_id
						}
					}).then(function (res) {
						_this.HistoryList = res.data.data.data;
						_this.HistoryTotal = res.data.data.total; //总条数
					}, function (err) {
						console.log(err)
					})
				}
				///判断获取历史成交内容
				if (index == 2) {
					$(".wt-content .Deal li").eq(0).addClass("qh-active").siblings("li").removeClass("qh-active");
					////获取历史成交的内容
					axios.get(httpUrl.history, {
						headers: {
							"Authorization": "Bearer " + _this.token
						},
						params: {
							datetype: 0,
							status: 1,
							matchcoin_id: _this.matchcoin_id
						}
					}).then(function (res) {
						_this.HistoryDeal = res.data.data.data;
						_this.HistoryDealTotal = res.data.data.total; //获取历史成交的总条数
						for (let i = 0; i < _this.HistoryDeal.length; i++) {
							_this.HistoryDeal[i].isShow = false;
						}

					}, function (err) {
						console.log(err)
					})

				}
				//判断获取资产管理
				if (index == 3) {
					////获取历史成交的内容
					_this.refreshFinances()
				}
			}
		},
		///成交切换
		dealData(index) {
			var _this = this;
			_this.HistoryDealdatetype = index; //切换的状态
			if (this.getColor != 1) {
				$(".wt-content .Deal li").eq(index).addClass("qh-active").siblings("li").removeClass("qh-active");
			} else {
				$(".wt-content .Deal li").eq(index).addClass("qh-active-white").siblings("li").removeClass("qh-active-white").removeClass("qh-active");
			}
			///调用判断是否刷新token
			_this.callback();
			if (_this.token == null && _this.token == undefined) {
				return false;
			} else {
				axios.get(httpUrl.history, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						datetype: index,
						status: 1,
						matchcoin_id: _this.matchcoin_id
					}
				}).then(function (res) {
					_this.HistoryDeal = res.data.data.data;
					_this.HistoryDealTotal = res.data.data.total; //获取历史成交的总条数
					for (let i = 0; i < _this.HistoryDeal.length; i++) {
						_this.HistoryDeal[i].isShow = false;
					}

				}, function (err) {
					console.log(err)
				})
			}
		},
		////买卖切换
		mmTab(index) {
			//获取长度 委托内容
			if (this.getColor != 1) {
				$(".mm-title li").eq(index).addClass("qh-active").siblings("li").removeClass("qh-active");
			} else {
				$(".mm-title li").eq(index).addClass("qh-active-white").siblings("li").removeClass("qh-active-white");
			}

			$(".mmTab-content").eq(index).show().siblings(".mmTab-content").hide();
		},
		///限价   市价    切换
		tabShi(index) {
			if (this.getColor != 1) {
				$(".sj-title li").eq(index).addClass("xxk-active").siblings("li").removeClass("xxk-active")
				$(".shijia-content").eq(index).show().siblings(".shijia-content").hide()
			} else {
				$(".sj-title li").eq(index).addClass("xxk-active-white").siblings("li").removeClass("xxk-active-white")
				$(".shijia-content").eq(index).show().siblings(".shijia-content").hide()
			}

		},
		///保留小数的位数              限价的买入价格
		clearNoNum1(eve, num) {
			const regexp = /(?:\.0*|(\.\d+?)0+)$/;
			var toFixedNum = Number(this.limit.price).toFixed(num + 1);
			this.limit.price = toFixedNum.substring(0, toFixedNum.toString().length - 1);
			this.limit.price = this.limit.price.replace(regexp, '$1');
			//this.limit.price = parseFloat(this.limit.price);   //去除小数点
			if (this.limit.price == "" || eve.target.value == "") {
				this.limit.price = "";
			}
			if (isNaN(this.limit.price)) {
				this.limit.price = "";
			}
			eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
			eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
			eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
			eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");

			/*输入内容时改变状态百分比状态全部消失*/
			for (let i = 0; i < this.baiList.length; i++) {
				this.baiList[i].active = false;
			}
			//eve.target.value = eve.target.value.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3'); //限定小数位数
		},
		clearNoNum2(eve, num) { ///保留小数的后位数  限价的买入数量
			const regexp = /(?:\.0*|(\.\d+?)0+)$/;
			var toFixedNum = Number(this.limit.count).toFixed(num + 1);
			this.limit.count = toFixedNum.substring(0, toFixedNum.toString().length - 1);
			this.limit.count = this.limit.count.replace(regexp, '$1');
			//this.limit.count = parseFloat(this.limit.count);   //去除小数点
			if (this.limit.count == "" || eve.target.value == "") {
				this.limit.count = "";
			}
			if (isNaN(this.limit.count)) {
				this.limit.count = "";
			}
			eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
			eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
			eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
			eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
			eve.target.value = eve.target.value.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3'); //限定小数位数
			/*输入内容时改变状态百分比状态全部消失*/
			for (let i = 0; i < this.baiList.length; i++) {
				this.baiList[i].active = false;
			}
		},
		clearNoNum3(eve, num) {
			const regexp = /(?:\.0*|(\.\d+?)0+)$/;
			var toFixedNum = Number(this.limit2.price).toFixed(num + 1);
			this.limit2.price = toFixedNum.substring(0, toFixedNum.toString().length - 1);
			this.limit2.price = this.limit2.price.replace(regexp, '$1');
			//this.limit2.pricet = parseFloat(this.limit2.price);
			if (this.limit2.price == "" || eve.target.value == "") {
				this.limit2.price = "";
			}
			if (isNaN(this.limit2.price)) {
				this.limit2.price = "";
			}
			eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
			eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
			eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
			eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
			for (let i = 0; i < this.baiList1.length; i++) {
				this.baiList1[i].active = false;
			}
		},
		clearNoNum4(eve, num) {
			const regexp = /(?:\.0*|(\.\d+?)0+)$/;
			var toFixedNum = Number(this.limit2.count).toFixed(num + 1);
			this.limit2.count = toFixedNum.substring(0, toFixedNum.toString().length - 1);
			this.limit2.count = this.limit2.count.replace(regexp, '$1');
			//this.limit2.count = parseFloat(this.limit2.count);
			if (this.limit2.count == "" || eve.target.value == "") {
				this.limit2.count = "";
			}
			if (isNaN(this.limit2.count)) {
				this.limit2.count = "";
			}
			eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
			eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
			eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
			eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
			for (let i = 0; i < this.baiList1.length; i++) {
				this.baiList1[i].active = false;
			}
		},
		clearNoNum5(eve, num) {
			const regexp = /(?:\.0*|(\.\d+?)0+)$/;
			var toFixedNum = Number(this.amount1.amount).toFixed(num + 1);
			this.amount1.amount = toFixedNum.substring(0, toFixedNum.toString().length - 1);
			this.amount1.amount = this.amount1.amount.replace(regexp, '$1');
			//this.amount1.amount = parseFloat(this.amount1.amount);
			if (this.amount1.amount == "" || eve.target.value == "") {
				this.amount1.amount = "";
			}
			if (isNaN(this.amount1.amount)) {
				this.amount1.amount = "";
			}
			eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
			eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
			eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
			eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
			for (let i = 0; i < this.baiList3.length; i++) {
				this.baiList3[i].active = false;
			}
		},
		clearNoNum6(eve, num) {
			const regexp = /(?:\.0*|(\.\d+?)0+)$/;
			var toFixedNum = Number(this.amount2.amount).toFixed(num + 1);
			this.amount2.amount = toFixedNum.substring(0, toFixedNum.toString().length - 1);
			//this.amount2.amount = parseFloat(this.amount2.amount);
			this.amount2.amount = this.amount2.amount.replace(regexp, '$1');
			if (this.amount2.amount == "" || eve.target.value == "") {
				this.amount2.amount = "";
			}
			if (isNaN(this.amount2.amount)) {
				this.amount2.amount = "";
			}
			eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
			eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
			eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
			eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
			for (let i = 0; i < this.baiList4.length; i++) {
				this.baiList4[i].active = false;
			}
		},
		///增加     限价
		addNum(num) {
			var str = "1" + Array(num).join("0") + "0"; /*拼接*/
			var addNumber = Number(str); /*取整*/
			var NewNum = "";
			for (let i = 0; i < num - 1; i++) {
				NewNum += "0"
			}
			var pre = "0." + NewNum + "1";
			if (this.limit.price == 0 || this.limit.price == "") {
				this.limit.price = pre;
				return false;
			}
			///将获取到的值加   买入价格
			var Num = this.limit.price * addNumber;
			Num++;
			this.limit.price = (Num / addNumber).toFixed(num);
			var xsd = this.limit.price.toString().split(".");
			if (xsd.length > 1) {
				if (xsd[1].length < num) {
					this.limit.price = this.limit.price.toString() + "0";
				}
			}
		},
		///减少   限价   买入价格
		reduce(num) {
			if (this.limit.price == 0 || this.limit.price == "") {
				this.limit.price = 0.00;
				return false;
			}
			var str = "1" + Array(num).join("0") + "0";
			var remNumber = Number(str);
			var Num = Math.round(this.limit.price * remNumber);
			Num--;
			this.limit.price = (Num / remNumber).toFixed(num);
			var xsd = this.limit.price.toString().split(".");
			if (xsd.length > 1) {
				if (xsd[1].length < num) {
					this.limit.price = this.limit.price.toString() + "0";
				}
			}
		},
		///增加     限价  卖出价格
		addNum1(num) {
			var str = "1" + Array(num).join("0") + "0";
			var addNumber = Number(str);
			var NewNum = "";
			for (let i = 0; i < num - 1; i++) {
				NewNum += "0"
			}
			var pre = "0." + NewNum + "1";
			if (this.limit2.price == 0 || this.limit.price == "") {
				this.limit2.price = pre;
				return false;
			}
			///将获取到的值加
			var Num = Math.round(this.limit2.price * addNumber);
			Num++;
			this.limit2.price = (Num / addNumber).toFixed(num);
			var xsd = this.limit2.price.toString().split(".");
			if (xsd.length > 1) {
				if (xsd[1].length < num) {
					this.limit2.price = this.limit2.price.toString() + "0";
				}
			}
		},
		///减少   限价   卖出价格
		reduce1(num) {
			if (this.limit2.price == 0 || this.limit2.price == "") {
				this.limit2.price = 0.00;
				return false;
			}
			var str = "1" + Array(num).join("0") + "0";
			var remNumber = Number(str);
			var Num = Math.round(this.limit2.price * remNumber);
			Num--;
			this.limit2.price = (Num / remNumber).toFixed(num);
			var xsd = this.limit2.price.toString().split(".");
			if (xsd.length > 1) {
				if (xsd[1].length < num) {
					this.limit2.price = this.limit2.price.toString() + "0";
				}
			}
		}
	}
}
