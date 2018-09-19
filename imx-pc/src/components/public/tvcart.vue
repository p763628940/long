<template>
	<div id="tubiao">
		<div id="chart" style="height: 580px"></div>
	</div>
</template>
<script>
/**废弃 */
	import { httpUrl } from "../http_url/http_url";
	import axios from "axios"; 
	export default {
		data() {
			return {
				id: 'tvchart1',
				chart: null,
				currentSymbol: null,
				klineList: [],
				/*获取到的数据*/
				viewData: {
					// matchcoin_id: window.localStorage.getItem("matchcoin_id"),
					mainCurrency: "", //主币
					forMoney: "", //对币 
					price: "", //价格
					updown: "", //涨幅
					low: "", //最低价
					high: "", //最高价				
					hour24: "", //24小时成交量				
					cny: "", ///最新价
					decimals: 0, ///限定价格
					count_decimals: 4 ///限定数量
				},     /*页面展示内容部分*/
				coin_matching:[]  /*获取所有币对信息*/
			}
		},
		created() { ////获取展示内容部分
			var _this = this;
			axios.get(httpUrl.coin_matching).then(function(res) {
				////显示页面内容	
				_this.coin_matching = res.data.data;
				for(let i = 0; i < _this.coin_matching.length; i++) {
					for(let item in _this.coin_matching[i]) {
						for(let j = 0; j < _this.coin_matching[i].matchcoins.length; j++) {
							if(_this.coin_matching[i].matchcoins[j].matchcoin_id == _this.viewData.matchcoin_id) {
								_this.viewData.mainCurrency = _this.coin_matching[i].pageIdentifier;
								_this.viewData.forMoney = _this.coin_matching[i].matchcoins[j].pageIdentifier;
								_this.viewData.price = _this.coin_matching[i].matchcoins[j].price;
								_this.viewData.updown = _this.coin_matching[i].matchcoins[j].updown;
								_this.viewData.hour24 = _this.coin_matching[i].matchcoins[j].hour24;
								_this.viewData.high = _this.coin_matching[i].matchcoins[j].high;
								_this.viewData.low = _this.coin_matching[i].matchcoins[j].low;
								_this.viewData.cny = _this.coin_matching[i].matchcoins[j].cny;
								_this.viewData.decimals = _this.coin_matching[i].matchcoins[j].decimals;
								_this.viewData.count_decimals = _this.coin_matching[i].matchcoins[j].count_decimals;
							}
						}
					}
				}
				if(res.data.status.code == -200) {
					_this.$message({										
						message: res.data.status.message,
						type: 'error'
					});
				}
			}, function(err) {
				console.log(err)
			})
		},
		methods: {

		},
		mounted() {
			var _this = this;
			// var ws = new WebSocket("ws://39.104.94.182:1888");
			var ws = this.ws;
			function unsubscribeBars(UID) {
				//console.log(UID);
			} 
			
			function subscribeBars(symbolInfo, resolution, onRealtime, subscriberUID, onResetCacheNeededCallback) {
				//["1"=>1min, "5"=>5min, "15", "30", "60", "240"=>240min, "1D"=>1day, "1W"=>1week, "1M"=>1mon];
			    
			    ws.onmessage = function (e) {
			        var message = JSON.parse(e.data);
			        if(message.type == 'ping'){
			            ws.send('{"pong":' + Date.now() + '}');         	
			        }else if(message.type=="cachekline9"){				/*************拼接币对ID*****************/
			            if(resolution == "1"){					
			            	onRealtime(message.message["min1"]);
			            }
			            if(resolution == "5"){
			            	onRealtime(message.message["min5"]);
			            }
			            if(resolution == "15"){
			            	onRealtime(message.message["min15"]);
			            }
			            if(resolution == "30"){
			            	onRealtime(message.message["min30"]);
			            }
			            if(resolution == "60"){
			            	onRealtime(message.message["min60"]);
			            }
			            if(resolution == "240"){
			            	onRealtime(message.message["min240"]);
			            }
			            if(resolution == "1D"){
			            	onRealtime(message.message["day1"]);
			            }
			            if(resolution == "1W"){
			            	onRealtime(message.message["week1"]);
			            }
			            if(resolution == "1M"){
			            	onRealtime(message.message["mon1"]);
			            }
									            
			        }
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
						"matchcoin_id": "9",								/*************拼接币对ID*****************/
						"time_type": resolution
					}
				}).then(function(res) {
					_this.klineList = res.data.data;
					////后面执行
					if(rangeEndDate <= _this.klineList[0].time / 1000) {
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

			const options = {
				autosize: true,
				container_id: "chart",
				datafeed, 
				debug: false,	           
				timezone: "UTC",		
				library_path: "../../static/charting_library/", ///引用包的路径
				locale: "zh",
				interval: "5",   ///默认显示分钟数
				disabled_features: ["left_toolbar", "compare_symbol", "display_market_status", "go_to_date", "header_chart_type", "header_compare", "header_interval_dialog_button", "header_screenshot", "header_symbol_search", "header_undo_redo", "legend_context_menu", "show_hide_button_in_legend", "show_interval_dialog_on_key_press", "snapshot_trading_drawings", "symbol_info", "timeframes_toolbar", "use_localstorage_for_settings", "volume_force_overlay"],
				enabled_features: ["dont_show_boolean_study_arguments", "hide_last_na_study_output", "move_logo_to_main_pane", "same_data_requery", "side_toolbar_in_fullscreen_mode"],
			}

			function onReady(callback) {
				const configuration = {
					exchanges: [],
					supported_resolutions: ["1", "5", "15", "30", "60", "240", "1D", "1W", "1M"],
					supports_group_request: false,
					supports_marks: false,
					supports_time: true,
					supports_timescale_marks: false,
					symbols_types: [],
				};
				callback(configuration);
			}

			function resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
				const configuration = {
					description: _this.viewData.mainCurrency +"/"+ _this.viewData.forMoney,
					name: _this.viewData.mainCurrency + _this.viewData.forMoney,
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
					//pricescale: 100,
					// seconds_multipliers: [],
					session: "0000-0000:1234567",
					supported_resolutions: ["1", "5", "15", "30", "60", "240", "1D", "1W", "1M"],
					timezone: "UTC",
					type: "bitcoin",
					volume_precision: 0,
				};
				onSymbolResolvedCallback(configuration);
			}
			/*图表开始*/
			new TradingView.widget(options);
			//图表结束
		}
	}
</script>

<style>

</style>