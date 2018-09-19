<template>
	<div id="ddxq">
		<my-header :text="ddxqHeader"></my-header>
		<!--点对点订单列表-->
		<div class="OrderList_title">
			<ul>
				<li :class="{'OrderList_active':AllisShow}" @click="clickAll">
					<span>{{$t("otc.All")}}</span>
				</li>
				<li :class="{'OrderList_active':Unpaid}" @click="clickUnpaid">
					<span>{{$t("bbjy.Unfinished")}}</span>
				</li>
				<li :class="{'OrderList_active':AlreadyPaid}" @click="clickAlreadyPaid">
					<span>{{$t("otc.Completed")}}</span>
				</li>
				<li :class="{'OrderList_active':Appeal}" @click="clickAppeal">
					<span>{{$t("otc.CancelOrder")}}</span>
				</li>
			</ul>
		</div>
		<!--全部-->
		<div class="OrderList_content" v-show="AllisShow">
			<div class="OrderList_item" v-for="item in wholeAll" @click="toXainq(item)">
				<dl class="title">
					<dd>
						<span class="name">{{item.merchant_name}}</span>
						<p class="isBuySell">
							<span class="buy" v-if="item.type==1">{{$t("otc.Buy")}}</span>
							<span class="sell" v-if="item.type==0">{{$t("otc.Sell")}}</span> :
							<span>{{item.currency.pageIdentifier}}</span>
						</p>
					</dd>
					<dd>
						<p class="balane">
							<span class="text">{{$t("bbjy.Amount")}}:</span>
							<span class="num">{{item.success_price | number(2)}}{{item.legal.code}}</span>
						</p>
						<span v-if="item.status==-2" class="type">{{$t("otc.Complaint")}}</span>
						<span v-if="item.status==-1" class="type">{{$t("otc.Ordercancelled")}}</span>
						<span v-if="item.status==0" class="type">{{$t("otc.WaitingPayment")}}</span>
						<span v-if="item.status==1" class="type">{{$t("otc.Waitingforrelease")}}</span>
						<span v-if="item.status==2" class="type">{{$t("otc.Orderislocked")}}</span>
						<span v-if="item.status==3" class="type">{{$t("otc.Completed")}}</span>
					</dd>
				</dl>
				<div class="bottom">
					<!--<span class="tishi">
						<span v-if="item.status==-2" >申诉中</span>
					<span v-if="item.status==-1">订单已取消</span>
					<span v-if="item.status==0">待交易未付款</span>
					<span v-if="item.status==1">已支付  待放行</span>
					<span v-if="item.status==2">交易被锁定</span>
					<span v-if="item.status==3">已完成</span> 如有疑问，请联系客服!
					</span>-->
					<span>#{{item.orderId}}</span>
					<span class="time">{{formatTime(item.created_at)}}</span>
				</div>
			</div>
			<div class="pageCount" v-show="Alltotal>10">
				<el-pagination small layout="prev, pager, next" :page-size="10" @current-change="pageChangeALL" :total="Alltotal" :small="true">
				</el-pagination>
			</div>
			<div class="noData" v-show="wholeAll.length==0">{{$t("list.noData")}}</div>
		</div>
		<!--未付款-->
		<div class="OrderList_content" v-show="Unpaid">
			<div class="OrderList_item" v-for="item in UnpaidList" v-if="UnpaidList.length!=0" @click="toXainq(item)">
				<dl class="title">
					<dd>
						<span class="name">{{item.merchant_name}}</span>
						<p class="isBuySell">
							<span class="buy" v-if="item.type==1">{{$t("list.Buy_BTC")}}</span>
							<span class="sell" v-if="item.type==0">{{$t("list.Sell_BTC")}}</span> :
							<span>{{item.currency.pageIdentifier}}</span>
						</p>
					</dd>
					<dd>
						<p class="balane">
							<span class="text">{{$t("bbjy.Amount")}}:</span>
							<span class="num">{{item.success_price | number(2)}}{{item.legal.code}}</span>
						</p>
						<span v-if="item.status==-2" class="type">{{$t("otc.Complaint")}}</span>
						<span v-if="item.status==-1" class="type">{{$t("otc.Ordercancelled")}}</span>
						<span v-if="item.status==0" class="type">{{$t("otc.WaitingPayment")}}</span>
						<span v-if="item.status==1" class="type">{{$t("otc.Waitingforrelease")}}</span>
						<span v-if="item.status==2" class="type">{{$t("otc.Orderislocked")}}</span>
						<span v-if="item.status==3" class="type">{{$t("otc.Completed")}}</span>
					</dd>
				</dl>
				<div class="bottom">
					<!--<span class="tishi">
						<span v-if="item.status==-2" >申诉中</span>
					<span v-if="item.status==-1">订单已取消</span>
					<span v-if="item.status==0">待交易未付款</span>
					<span v-if="item.status==1">已支付  待放行</span>
					<span v-if="item.status==2">交易被锁定</span>
					<span v-if="item.status==3">已完成</span> 如有疑问，请联系客服!
					</span>-->
					<span>#{{item.orderId}}</span>
					<span class="time">{{formatTime(item.created_at)}}</span>
				</div>
			</div>
			<div class="pageCount" v-show="UnpaidTotal>10">
				<el-pagination small layout="prev, pager, next" :page-size="10" @current-change="pageChangeUnpaid" :total="UnpaidTotal" :small="true">
				</el-pagination>
			</div>
			<div class="noData" v-show="UnpaidList.length==0">{{$t("list.noData")}}</div>
		</div>

		<!--已付款-->
		<div class="OrderList_content" v-show="AlreadyPaid">
			<div class="OrderList_item" v-for="item in AlreadyPaidList" v-if="AlreadyPaidList.length!=0" @click="toXainq(item)">
				<dl class="title">
					<dd>
						<span class="name">{{item.merchant_name}}</span>
						<p class="isBuySell">
							<span class="buy" v-if="item.type==1">{{$t("list.Buy_BTC")}}</span>
							<span class="sell" v-if="item.type==0">{{$t("list.Sell_BTC")}}</span> :
							<span>{{item.currency.pageIdentifier}}</span>
						</p>
					</dd>
					<dd>
						<p class="balane">
							<span class="text">{{$t("bbjy.Amount")}}:</span>
							<span class="num">{{item.success_price | number(2)}}{{item.legal.code}}</span>
						</p>
						<span v-if="item.status==-2" class="type">{{$t("otc.Complaint")}}</span>
						<span v-if="item.status==-1" class="type">{{$t("otc.Ordercancelled")}}</span>
						<span v-if="item.status==0" class="type">{{$t("otc.WaitingPayment")}}</span>
						<span v-if="item.status==1" class="type">{{$t("otc.Waitingforrelease")}}</span>
						<span v-if="item.status==2" class="type">{{$t("otc.Orderislocked")}}</span>
						<span v-if="item.status==3" class="type">{{$t("otc.Completed")}}</span>
					</dd>
				</dl>
				<div class="bottom">
					<!--<span class="tishi">
						<span v-if="item.status==-2" >申诉中</span>
					<span v-if="item.status==-1">订单已取消</span>
					<span v-if="item.status==0">待交易未付款</span>
					<span v-if="item.status==1">已支付  待放行</span>
					<span v-if="item.status==2">交易被锁定</span>
					<span v-if="item.status==3">已完成</span> 如有疑问，请联系客服!
					</span>-->
					<span>#{{item.orderId}}</span>
					<span class="time">{{formatTime(item.created_at)}}</span>
				</div>
			</div>
			<div class="pageCount" v-show="AlreadyPaidTotal>10">
				<el-pagination small layout="prev, pager, next" :page-size="10" @current-change="pageChangeAlreadyPaid" :total="AlreadyPaidTotal" :small="true">
				</el-pagination>
			</div>
			<div class="noData" v-show="AlreadyPaidList.length==0">{{$t("list.noData")}}</div>
		</div>
		<!--申诉中-->
		<div class="OrderList_content" v-show="Appeal">
			<div class="OrderList_item" v-for="item in AppealList" v-if="AppealList.length!=0" @click="toXainq(item)">
				<dl class="title">
					<dd>
						<span class="name">{{item.merchant_name}}</span>
						<p class="isBuySell">
							<span class="buy" v-if="item.type==1">{{$t("list.Buy_BTC")}}</span>
							<span class="sell" v-if="item.type==0">{{$t("list.Sell_BTC")}}</span> :
							<span>{{item.currency.pageIdentifier}}</span>
						</p>
					</dd>
					<dd>
						<p class="balane">
							<span class="text">{{$t("bbjy.Amount")}}:</span>
							<span class="num">{{item.success_price | number(2)}}{{item.legal.code}}</span>
						</p>
						<span v-if="item.status==-2" class="type">{{$t("otc.Complaint")}}</span>
						<span v-if="item.status==-1" class="type">{{$t("otc.Ordercancelled")}}</span>
						<span v-if="item.status==0" class="type">{{$t("otc.WaitingPayment")}}</span>
						<span v-if="item.status==1" class="type">{{$t("otc.Waitingforrelease")}}</span>
						<span v-if="item.status==2" class="type">{{$t("otc.Orderislocked")}}</span>
						<span v-if="item.status==3" class="type">{{$t("otc.Completed")}}</span>
					</dd>
				</dl>
				<div class="bottom">
					<!--<span class="tishi">
						<span v-if="item.status==-2" >申诉中</span>
					<span v-if="item.status==-1">订单已取消</span>
					<span v-if="item.status==0">待交易未付款</span>
					<span v-if="item.status==1">已支付  待放行</span>
					<span v-if="item.status==2">交易被锁定</span>
					<span v-if="item.status==3">已完成</span> 如有疑问，请联系客服!
					</span>-->
					<span>#{{item.orderId}}</span>
					<span class="time">{{formatTime(item.created_at)}}</span>
				</div>
			</div>
			<div class="pageCount" v-show="AppealTotal>10">
				<el-pagination small layout="prev, pager, next" :page-size="10" @current-change="pageChangeAppeal" :total="AppealTotal" :small="true">
				</el-pagination>
			</div>
			<div class="noData" v-show="AppealList.length==0">{{$t("list.noData")}}</div>
		</div>

	</div>
</template>

<script>
	import header from "../../public/backHeader"
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				ddxqHeader: this.$t("list.Currency_trading") + " " +this.$t("otc.Order"),
				wholeAll: [],
				/*全部订单*/
				Alltotal: 0,
				/*获取总条数*/
				AllisShow: true,
				/*全部*/
				Unpaid: false,
				/*未付款*/
				UnpaidList: [],
				/*未付款列表*/
				UnpaidTotal: 0,
				/*未付款总条数*/
				AlreadyPaid: false,
				/*已付款*/
				AlreadyPaidList: [],
				/*已付款列表*/
				AlreadyPaidTotal: 0,
				/*已付款总条数*/
				Appeal: false,
				/*申诉*/
				AppealList: [],
				/*申诉列表*/
				AppealTotal: 0,
				/*申诉总条数*/
			}
		},
		components: {
			"my-header": header
		}
		,computed:{
		...mapState('user', [
			'orderID'
	  	]),
		},
		methods: {
			...mapMutations('user',['setData']),
			toXainq(data) { /*跳转详情页*/
				// window.localStorage.setItem("OrderId", data.id);
				this.setData({'orderID':data.id});
				/*卖家*/
				if(data.type == 1) { //买
					this.$router.push({
						name: "buyddxq"
					})
				} else {
					this.$router.push({
						name: "sellddxq"
					})
				}

			},
			clickAll() { /*切换全部*/
				let _this = this;
				this.AllisShow = true; /*全部*/
				this.AlreadyPaid = false; /*已付款*/
				this.Unpaid = false; /*未付款*/
				this.Appeal = false; /*申诉中*/
				this.$ajax.get(this.httpUrl.getwdddUrl, {
					headers: {
						Authorization: "Bearer " + _this.token
					},
					params: {
						status: -66
					}
				}).then(function(res) {
					_this.wholeAll = res.data.data.data; /*获取所有的分页数据*/
					_this.Alltotal = res.data.data.total; /*获取总条数*/
				}, function(err) {
					console.log(err)
				})
			},
			clickUnpaid() { /*切换未付款*/
				let _this = this;
				this.AllisShow = false; /*全部*/
				this.AlreadyPaid = false; /*已付款*/
				this.Unpaid = true; /*未付款*/
				this.Appeal = false; /*申诉中*/
				this.$ajax.get(this.httpUrl.getwdddUrl, {
					headers: {
						Authorization: "Bearer " + _this.token
					},
					params: {
						status: 0
					}
				}).then(function(res) {
					_this.UnpaidList = res.data.data.data; /*获取所有的数据*/
					_this.UnpaidTotal = res.data.data.total; /*获取总条数*/
				}, function(err) {
					console.log(err)
				})
			},
			clickAlreadyPaid() { /*切换已付款*/
				let _this = this;
				this.AllisShow = false; /*全部*/
				this.AlreadyPaid = true; /*已付款*/
				this.Unpaid = false; /*未付款*/
				this.Appeal = false; /*申诉中*/
				this.$ajax.get(this.httpUrl.getwdddUrl, {
					headers: {
						Authorization: "Bearer " + _this.token
					},
					params: {
						status: 3,
            code:1
					}
				}).then(function(res) {
					_this.AlreadyPaidList = res.data.data.data; /*获取所有的数据*/
					_this.AlreadyPaidTotal = res.data.data.total; /*获取总条数*/
				}, function(err) {
					console.log(err)
				})
			},
			clickAppeal() { /*切换申诉中*/
				let _this = this;
				this.AllisShow = false; /*全部*/
				this.AlreadyPaid = false; /*已付款*/
				this.Unpaid = false; /*未付款*/
				this.Appeal = true; /*申诉中*/
				this.$ajax.get(this.httpUrl.getwdddUrl, {
					headers: {
						Authorization: "Bearer " + _this.token
					},
					params: {
						status: -1,
            code:1
					}
				}).then(function(res) {
					_this.AppealList = res.data.data.data; /*获取所有的数据*/
					_this.AppealTotal = res.data.data.total; /*获取总条数*/
				}, function(err) {
					console.log(err)
				})
			},
			pageChangeALL(val) { /*切换总条数*/
				let _this = this;
				this.$ajax.get(this.httpUrl.getwdddUrl, {
					headers: {
						Authorization: "Bearer " + _this.token
					},
					params: {
						page: val,
						status: -66
					}
				}).then(function(res) {
					_this.wholeAll = res.data.data.data; /*获取所有的分页数据*/
					_this.Alltotal = res.data.data.total; /*获取总条数*/
				}, function(err) {
					console.log(err)
				})
			},
			pageChangeUnpaid(val) { /*未付款换页*/
				let _this = this;
				this.$ajax.get(this.httpUrl.getwdddUrl, {
					headers: {
						Authorization: "Bearer " + _this.token
					},
					params: {
						status: 0,
						page: val
					}
				}).then(function(res) {
					_this.UnpaidList = res.data.data.data; /*获取所有的数据*/
					_this.UnpaidTotal = res.data.data.total; /*获取总条数*/
				}, function(err) {
					console.log(err)
				})
			},
			pageChangeAlreadyPaid(val) { /*已付款换页*/
				let _this = this;
				this.$ajax.get(this.httpUrl.getwdddUrl, {
					headers: {
						Authorization: "Bearer " + _this.token
					},
					params: {
						status: val
					}
				}).then(function(res) {
					_this.AlreadyPaidList = res.data.data.data; /*获取所有的数据*/
					_this.AlreadyPaidTotal = res.data.data.total; /*获取总条数*/
				}, function(err) {
					console.log(err)
				})
			},
			pageChangeAppeal(val) { /*申诉中换页*/
				let _this = this;
				this.$ajax.get(this.httpUrl.getwdddUrl, {
					headers: {
						Authorization: "Bearer " + _this.token
					},
					params: {
						status: -1,
						page: val
					}
				}).then(function(res) {
					_this.AppealList = res.data.data.data; /*获取所有的数据*/
					_this.AppealTotal = res.data.data.total; /*获取总条数*/
				}, function(err) {
					console.log(err)
				})
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
			let _this = this;
			this.$ajax.get(this.httpUrl.getwdddUrl, {
				headers: {
					Authorization: "Bearer " + _this.token
				},
				params: {
					status: -66
				}
			}).then(function(res) {
				_this.wholeAll = res.data.data.data; /*获取所有的数据*/
				_this.Alltotal = res.data.data.total; /*获取总条数*/
			}, function(err) {
				console.log(err)
			})
			_this.ws.onmessage = function(e) {
				var arr = JSON.parse(e.data);
				if(arr.type == "ping") { ////判断type
					_this.ws.send('{"pong":' + Date.now() + '}');
				} else if(arr.type == "otc") {
					// msgType用于消息分类处理，用户可以在发送消息时设置自定义的msgType，在收到消息时判断msgType，"reqUnReadMsgCount"、"testMsg"、"tokenExpired"为apush预定义的msgType，请不要使用。
					if(window.plus) {
						if(_this.OrderId != arr.content.orderId) {
							// window.localStorage.setItem("OrderId", arr.content.orderId);
							_this.setData({'orderID':arr.content.orderId});
							let otext;
							if(arr.content.type != 1) { /*文字*/
								otext = arr.content.content;
							} else {
								otext = _this.$t("bbjy.Systemmessage")
							}
							plus.push.createMessage(otext, '', {
								title: "otc" + _this.$t("bbjy.Haveneworder")
							});
							plus.push.addEventListener("click", function(msg) {
								// 分析msg.payload处理业务逻辑
								/*获取订单详情*/
								_this.$ajax.get(_this.httpUrl.getddxqUrl, {
									headers: {
										'Authorization': 'Bearer ' + _this.token
									},
									params: {
										"blaceId":  _this.orderID//window.localStorage.getItem("OrderId")
									}
								}).then(function(res) {
									if(res.data.data.pur_user ==  _this.userInfo.user_id) { /*判断下单用户id与登录用户id*/
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
					}
				}
			}
		}
	}
</script>
<style lang="scss">
	#ddxq {
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
	$bg_color:#141738;
	/*背景块的元素*/

	$blue_color:#6a75da;
	/*蓝色字体颜色*/

	$jiaoyi_color:#6982c0;
	/*交易价格交易数量字体颜色*/

	$orange:#ff4800;
	/*待付款橙色*/

	$success:#02c27c;
	/*已完成颜色*/

	$border_color:#1f2354;
	/*边框线*/

	$canNum_color:#1f2351;
	/*付款参考号背景颜色*/

	$canNum_borderColor:#5a61df;
	/*付款参考号边框线*/

	$cancel_color:#222762;
	/*取消订单未选中*/

	$cancel_active:#454fad;
	/*取消订单选中*/

	$cancel_border:#9ea7ff;
	/*取消订单边框线*/

	$red_color:#e2040b;
	/*红色的字体颜色*/

	$alert_bg:#323560;
	/*弹框背景*/

	$alert_border:#202253;
	/*弹框边框线*/

	$blue_disable:#323ba8;
	/*确认放行禁用303792*/

	$buy_color:#02c289;
	/*买入*/

	$sell_color:#ea6954;
	/*卖出*/
	/*暂无记录*/

	.noData {
		width: 100%;
		height: .5rem;
		text-align: center;
		line-height: .5rem;
	}
	/*全局的字体颜色*/

	#ddxq {
		color: #fff;
	}

	.buy {
		color: $buy_color;
	}

	.sell {
		color: $sell_color;
	}
	/*选中状态*/

	.OrderList_active {
		color: #fff;
		span {
			border-bottom: 2px solid #fff;
		}
	}
	/*列表头部*/

	.OrderList_title {
		width: 100%;
		height: .32rem;
		ul {
			width: 95%;
			height: .32rem;
			margin: 0 auto;
			display: flex;
			align-items: center;
			li {
				width: 25%;
				text-align: center;
				span {
					box-sizing: border-box;
					padding-bottom: .07rem;
				}
			}
		}
	}
	/*列表内容*/

	.OrderList_content {
		width: 100%;
		.OrderList_item {
			width: 100%;
			box-sizing: border-box;
			padding: 0 .1rem;
			background: $bg_color;
			margin-bottom: .1rem;
			.title {
				width: 100%;
				height: .51rem;
				dd {
					width: 100%;
					display: flex;
					line-height: .25rem;
					justify-content: space-between;
					.name {
						color: $blue_color;
					}
				}
				border-bottom:0.01rem solid $border_color;
			}
			.bottom {
				width: 100%;
				height: .3rem;
				line-height: .3rem;
				display: flex;
				justify-content: space-between;
			}
		}
		.OrderList_item:nth-of-type(1) {
			margin-top: .05rem;
		}
	}
	/*分页居中*/

	.pageCount {
		width: 100%;
		height: .5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
