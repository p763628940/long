
<template>
	<div id="CapitalRecord">
		<!--资金记录-->
		<my-header :text="header_title"></my-header>
		<!--币种选择-->
		<div class="tab_currency" @click="popupVisible=true">
			<p>
				<span>{{$t("bbjy.Coin")}}</span>
			</p>
			<p>
				<span class="Violet">{{currencyName}}</span>
				<i class="iconfont icon-iconfontjiantou5"></i>
			</p>
		</div>
		<!--币种类型-->
		<div class="tab_currency" @click="tabTypeIsShow=true">
			<p>
				<span>{{$t("capital.Types")}}</span>
			</p>
			<p>
				<span class="Violet">{{typeName}}</span>
				<i class="iconfont icon-iconfontjiantou5"></i>
			</p>
		</div>
		<!--筛选列表-->
		<div class="tab_currency" @click="saiTimeIsShow=true">
			<p>
				<span>{{$t("capital.Screeningtime")}}</span>
			</p>
			<p>
				<span class="Violet">{{Time}}</span>
				<i class="iconfont icon-iconfontjiantou5"></i>
			</p>
		</div>
		<!--记录开始-->
		<dl class="Record">
			<dd class="RecordItem" v-for="item in Currency_record">
				<!--头部-->
				<p class="title">
					<span :class="{'buy':type==2,'sell':type==-2}">{{typeName}}</span>
					<!--<span class="sell">卖出</span>-->
					<span>{{currencyName}}</span>
				</p>
				<!--内容部分-->
				<ul class="content">
					<li>
						<p class="gaoLiang">{{$t("list.time")}}</p>
						<p class="text">{{formatTime(item.created_at)}}</p>
					</li>
					<li>
						<p class="gaoLiang">{{$t("capital.Amounts")}}</p>
						<p class="text">{{item.balance | number(item.get_currency.displayNum)}}</p>
					</li>
					<li>
						<p class="gaoLiang">{{$t("capital.StatusZT")}}</p>
						<p class="text">
							<span v-show="item.status==0">
							{{$t("capital.Processing")}}
							</span>
							<span v-show="item.status==1">{{$t("capital.Success")}}</span>
							<span v-show="item.status==-1">{{$t("capital.Unapprove")}}</span>
						</p>

					</li>
					<li>
						<p class="gaoLiang" v-show="type!=-1">{{$t("list.Fee")}}</p>
						<p class="text" v-show="type!=-1">{{item.serverCharge | number(item.get_currency.displayNum)}}</p>
					</li>
				</ul>
			</dd>
		</dl>
		<!--记录结束-->
		<div  class="noData" v-show="total==0">{{$t("list.noData")}}</div>
		<!--分页开始-->
		<div class="pageCount" v-show="total>10">
			<el-pagination small layout="prev, pager, next" :page-size="10" :total="total" @current-change="pageCount">
			</el-pagination>
		</div>

		<!--分页结束-->
		<!--币种选择列表-->
		<mt-popup v-model="popupVisible" position="right">
			<div class="header_box">
				<div class="register_header">
					<p class="back" @click="popupVisible=false">
						<i class="iconfont icon-zuojiantou"></i>
					</p>
					<p class="register_type">
            {{$t("bbjy.Coin")}}
					</p>
				</div>
			</div>
			<!--列表-->
			<ul class="currencyList">
				<li v-for="(item,index) in currencyList" class="cardItem" @click="tabCurrency(index,item)">
					<span>{{item.pageIdentifier}}</span>
					<i class="iconfont icon-duihao"></i>
				</li>
			</ul>
		</mt-popup>
		<!--币种类型选择-->
		<mt-popup v-model="tabTypeIsShow" position="right">
			<div class="header_box">
				<div class="register_header">
					<p class="back" @click="tabTypeIsShow=false">
						<i class="iconfont icon-zuojiantou"></i>
					</p>
					<p class="register_type">
						{{$t("otc.Currency")}}{{$t("otc.Types")}}
					</p>
				</div>
			</div>
			<!--列表-->
			<ul class="currencyList">
				<li v-for="(item,index) in ChoiceOfcurrency" class="cardItem1" @click="tabType(index,item)">
					<span>{{item.value}}</span>
					<i class="iconfont icon-duihao"></i>
				</li>
			</ul>
		</mt-popup>
		<!--筛选时间-->
		<mt-popup v-model="saiTimeIsShow" position="right">
			<div class="header_box">
				<div class="register_header">
					<p class="back" @click="saiTimeIsShow=false">
						<i class="iconfont icon-zuojiantou"></i>
					</p>
					<p class="register_type">
						{{$t("capital.Screeningtime")}}
					</p>
				</div>
			</div>
			<!--选择时间-->
			<div class="selctTime">
				<i class="iconfont icon-riqi"></i>
				<p class="startTime" @click="startTimeOpen">{{startTime}}</p>
				<span>-</span>
				<p class="endTime" @click="endTimeOpen">{{endTime}}</p>
				<button @click="Preservation()">{{$t("login.Save")}}</button>
			</div>
			<!--蒙版-->
			<div class="men_back" v-show="startMenIsShow" @click="startMen"></div>
			<!--选择开始时间-->
			<div class="time_bottom">
				<mt-datetime-picker v-model="pickerValue" type="date" ref="picker" @confirm="selectStartTime" @cancel="cancelStartTime">
				</mt-datetime-picker>
			</div>
			<div class="men_back" v-show="endMenIsShow" @click="endMen"></div>
			<div class="time_bottom">
				<mt-datetime-picker v-model="pickerValue1" type="date" ref="endTime" @confirm="selectEndTime" @cancel="cancelEndTime"></mt-datetime-picker>
			</div>
		</mt-popup>
	</div>
</template>

<script>
	import header from "../../public/backHeader.vue";
	import { Message } from 'element-ui'; /*消息提示*/
	import $ from "jquery";
	export default {
		data() {
			return {
				header_title: this.$t("capital.Fundrecords"),
				popupVisible: false,
				/*显示隐藏币种选择列表*/
				tabTypeIsShow: false,
				/*切换类型显示隐藏*/
				currencyName: "",
				/*选中币种的名称*/
				currencyID: 0,
				currencyList: [],
				/*币种列表*/
				ChoiceOfcurrency: [{
						type: 1,
						value: this.$t("capital.Deposit")
					},
					{
						type: -1,
						value: this.$t("capital.Withdraw")
					},
					{
						type: -2,
						value: this.$t("list.Sell_BTC")
					},
					{
						type: 2,
						value:this.$t("list.Buy_BTC")
					},
					{
						type: 3,
						value: this.$t("capital.Otheramount")+"+"
					}
				],
				/*类型列表*/
				typeName: this.$t("capital.Deposit"),
				/*选中类型名称*/
				type: 1,
				/*选择状态的值*/
				Time: this.$t("repurchasede.Choosetime"),
				/*选中时间*/
				saiTimeIsShow: false,
				/*筛选时间*/
				pickerValue: '',
				/*选择开始时间*/
				timeIsShow: false,
				/*时间是否显示隐藏*/
				startTime: this.$t("list.Start_date"),
				/*开始时间*/
				endTime: this.$t("list.End_date"),
				/*结束时间*/
				pickerValue1: "",
				/*选择结束时间*/
				startMenIsShow: false,
				/*开始时间选择*/
				endMenIsShow: false,
				/*结束时间选择*/
				Currency_record: [],
				/*获取资金记录列表*/
				total: 0 /*获取总条数*/
			}
		},
		components: {
			"my-header": header
		},
		filters: {
			//小数点过滤器 不四舍五入
			number(value, num) {
				var toFixedNum = Number(value).toFixed(num +1);
				var realVal =toFixedNum.substring(0,toFixedNum.lastIndexOf('.')+num +1);
				return realVal;
			}
		},
		mounted() {
			let _this = this;
			this.$ajax.get(this.httpUrl.currencyList, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.currencyList = res.data.data;
				_this.currencyName = res.data.data[0].pageIdentifier; /*默认显示*/
				_this.currencyID = res.data.data[0].id; /*默认id*/
				/*获取历史记录*/
				_this.$ajax.get(_this.httpUrl.recharge, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						currency_id: _this.currencyID,
						type: _this.type
					}
				}).then(function(res) {
					_this.Currency_record = res.data.data.data;
					_this.total = res.data.data.total;
					if(res.data.status.code == -200) {
						_this.$message({
							message: res.data.status.message,
							type: 'error'
						});
					}
				}, function(err) {
					console.log(err)
				})

			}, function(err) {
				console.log(err)
			})
			this.$refs.picker.close(); /*关闭开始时间*/
			this.$refs.endTime.close(); /*打开结束时间*/
		},
		methods: {
			tabCurrency(i, data) { /*切换币种*/
				let _this = this;
				$(".cardItem .icon-duihao").eq(i).show().parent(".cardItem").siblings(".cardItem").find(".icon-duihao").hide();
				_this.currencyName = data.pageIdentifier;
				_this.currencyID = data.id;
				this.$ajax.get(this.httpUrl.recharge, { /*分页获取历史记录数据*/
					params: {
						"currency_id":data.id,
						"type": _this.type
					},
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.Currency_record = res.data.data.data;
					_this.total = Number(res.data.data.total);
					_this.popupVisible = false;
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
			tabType(i, data) {
				let _this = this;
				$(".cardItem1 .icon-duihao").eq(i).show().parent(".cardItem1").siblings(".cardItem1").find(".icon-duihao").hide();
				this.typeName = data.value;
				this.type = data.type;
				this.$ajax.get(this.httpUrl.recharge, { /*分页获取历史记录数据*/
					params: {
						"currency_id": _this.currencyID,
						"type": data.type
					},
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.Currency_record = res.data.data.data;
					_this.total = Number(res.data.data.total);
					_this.tabTypeIsShow = false;
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
			selectStartTime(val) { /*确定开始时间*/
				this.startTime = this.newDate(val);
				this.startMenIsShow = false; /*黑色蒙版关闭*/
			},
			selectEndTime(val) { /*确定结束时间*/
				this.endTime = this.newDate(val);
				this.endMenIsShow = false; /*黑色蒙版打开*/
			},
			newDate(date) {
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? '0' + m : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return y + '-' + m + '-' + d;
			},
			startTimeOpen() { /*打开开始时间*/
				this.$refs.picker.open();
				this.startMenIsShow = true; /*黑色蒙版打开*/
			},
			endTimeOpen() { /*打开结束时间*/
				this.$refs.endTime.open();
				this.endMenIsShow = true; /*黑色蒙版打开*/
			},
			startMen() {
				this.$refs.picker.close(); /*关闭开始时间*/
				this.startMenIsShow = false; /*黑色蒙版关闭*/
			},
			endMen() {
				this.$refs.endTime.close(); /*关闭蒙版*/
				this.endMenIsShow = false; /*黑色蒙版关闭*/
			},
			cancelStartTime() {
				this.startMenIsShow = false; /*黑色蒙版关闭*/
			},
			cancelEndTime() {
				this.endMenIsShow = false; /*黑色蒙版关闭*/
			},
			Preservation() { /*保存*/
				let _this = this;
				if(_this.startTime == _this.$t("capital.Startdate") || _this.endTime == _this.$t("capital.Enddate")) {
					return false;
				}
				var getStartTime = new Date(this.startTime).getTime();
				var getEndTime = new Date(this.endTime).getTime();
				if(getEndTime<getStartTime){
					_this.$message({
						showClose: true,
						message: _this.$t("bbjy.Chooseendtime"),
						type: 'warning',
						duration: 2000
					});
					return false;
				}
				this.Time = _this.startTime.split(" ")[0] + "  -  " + _this.endTime.split(" ")[0];
				var startTime = _this.formAdd(_this.startTime); /*开始时间*/
				var endTime = _this.formAdd(_this.endTime); /*结束时间*/
				this.$ajax.get(this.httpUrl.recharge, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						currency_id: _this.currencyID,
						type: _this.type,
						start_at: startTime,
						end_at: endTime
					}
				}).then(function(res) {
					_this.Currency_record = res.data.data.data;
					_this.total = Number(res.data.data.total);
					_this.saiTimeIsShow = false;
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
			pageCount(val) { /*分页*/
				var _this = this;
				this.$ajax.get(this.httpUrl.recharge, { /*分页获取历史记录数据*/
					params: {
						"page": val,
						"currency_id": _this.currencyID,
						"type": _this.type
					},
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.Currency_record = res.data.data.data;
					_this.total = Number(res.data.data.total);
					if(res.data.status.code == -200) {
						_this.$message({
							message: res.data.status.message,
							type: 'error'
						});
					}
				}, function(err) {
					console.log(err)
				})
			}
		}
	}
</script>
<style lang="scss">
	#CapitalRecord{
		.mint-popup-right {
			width: 100%;
			height: 100%;
			background: #141738;
			overflow-y: auto;
		}
	}

	.el-message {
		/*width: 2.5rem;*/
		min-width: 2.5rem;
		z-index: 2099 !important;
	}
	.el-message--warning{
		background-color: #fff;
		border-top: 2px solid #f96a0e;
	}
	.el-message .el-icon-warning{
		font-size: .15rem;
		color: #f96a0e;
	}
	.el-message--warning .el-message__content {
		color: #000;
	}
	.el-message--success {
		background-color: #fff;
		border-color: #e1f3d8;
		border-top: 2px solid #22d9b8;
	}

	.el-message .el-icon-success {
		font-size: .15rem;
		color: #22d9b8;
	}

	.el-message--success .el-message__content {
		color: #000;
	}

	.v-modal {
		display: none !important;
	}

	.mint-datetime-cancel,
	.mint-datetime-confirm {
		color: #5a63dd;
	}

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
</style>
<style lang="scss" scoped>
	$back_color:#141738;
	$gao_liang:#a4acff;
	$border_bottom:1px solid #1f2353;
	.sell {
		color: #ea6954;
	}

	.buy {
		color: #02c289;
	}

	#CapitalRecord {
		width: 100%;
		height: 100%;
		color: #fff;
	}
	/*高亮字体颜色*/

	.Violet {
		color: $gao_liang;
	}
	/*币种选择*/

	.tab_currency {
		width: 100%;
		height: .36rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 .15rem;
		background: $back_color;
		border-top: 0.01rem solid #111627;
		border-bottom: $border_bottom;
		p {
			display: flex;
			align-items: center;
			.Violet {
				margin-right: .1rem;
			}
		}
	}
	/*币种选择头部*/

	.register_header {
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		position: relative;
		color: #fff;
		background: rgb(20, 23, 56);
		border-bottom: .1rem solid #121528;
		.back {
			margin-left: .15rem;
		}
		.register_type {
			position: absolute;
			top: 0;
			left: 20%;
			width: 60%;
			text-align: center;
			font-size: .15rem;
			font-weight: 600;
		}
	}
	/*币种列表选项*/

	.currencyList {
		width: 100%;
		li {
			width: 100%;
			height: .37rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: $border_bottom;
			color: #fff;
			box-sizing: border-box;
			padding: 0 .1rem;
			.iconfont {
				display: none;
			}
		}
		li:nth-of-type(1) {
			.iconfont {
				display: block;
			}
		}
	}
	/*时间盒子*/

	.time_bottom {
		width: 100%;
		height: .5rem;
	}
	/*选择时间*/

	.selctTime {
		width: 100%;
		height: .55rem;
		display: flex;
		align-items: center;
		p {
			width: 1rem;
			height: .3rem;
			border: $border_bottom;
			background: #161523;
			border-radius: .02rem;
			text-align: center;
			line-height: .3rem;
		}
		span {
			margin: 0 .1rem;
		}
		.iconfont {
			margin: 0 .1rem 0 .1rem;
		}
		button {
			width: .45rem;
			height: .3rem;
			border: none;
			background: #8080f2;
			margin-left: .1rem;
			border-radius: .02rem;
		}
	}
	/*蒙版*/

	.men_back {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 66;
	}
	/*资金记录内容*/

	.Record {
		width: 100%;
		.RecordItem {
			width: 100%;
			height: 1.44rem;
			background: $back_color;
			margin-top: .1rem;
			.title {
				width: 100%;
				height: .37rem;
				line-height: .37rem;
				box-sizing: border-box;
				padding-left: .15rem;
				border-bottom: $border_bottom;
			}
			.content {
				width: 100%;
				height: 1.02rem;
				display: flex;
				flex-wrap: wrap;
				box-sizing: border-box;
				padding-left: .15rem;
				li {
					width: 33.3%;
					height: .5rem;
					.gaoLiang {
						color: #474f95;
						margin-top: .1rem;
					}
					.text {
						color: #a4acff;
						margin-top: .1rem;
					}
				}
				li:nth-of-type(3) {
					text-align: center;
				}
				li:nth-of-type(4) {
					height: .3rem;
					.text {
						margin-top: .05rem;
					}
				}
			}
		}
	}
	/*分页*/

	.pageCount {
		width: 100%;
		margin: .1rem 0;
		display: flex;
		justify-content: center;
	}

	/*暂无记录*/
	.noData{
		width: 100%;
		height: .3rem;
		text-align: center;
		line-height: .3rem;
	}

</style>
