<template>
	<div id="imxRepurchase">
		<my-header :text="titleText"></my-header>
		<!--回购详情-->
		<div class="fold_wrapper">
			<div class="fold_item">
				<p class="icon blue">
					<i class="iconfont icon-rest-income"></i>
				</p>
				<p class="text">
					<span>	{{$t("home.HuigouIMX")}}</span>
          <!--昨日回购IMX-->
				</p>
				<p class="number textblue">
					<span>{{buy_imx_count | number(8)}}</span>
				</p>
			</div>
			<div class="fold_item">
				<p class="icon green">
					<i class="iconfont icon-huigou001"></i>
				</p>
				<p class="text">
					<span>{{$t("Accumulation.Revenueyesterday")}}</span>
          <!--昨日收入累积-->
				</p>
				<p class="number textgreen">
					<span>{{yesterdayList.summary | number(8)}} {{yesterdayList.exchange_unit}}</span>
				</p>
			</div>
		</div>
		<!--锁仓地址-->
		<div class="LockingAddress">
			<p class="title">{{$t("repurchasede.lockedaddress")}}</p>
			<div class="copy">
				<p class="address">{{Lockposition}}</p>
				<span class="copyButton" id="copy" :data-clipboard-text="Lockposition" @click="copy">{{$t("shouye.Longpresscopy")}}</span>
			</div>
		</div>
		<!--收入及待返还详情-->
		<div class="income">
			<i class="iconfont icon-fuzhi"></i>
			<span>{{$t("home.Huiguodetail")}}</span>
		</div>
		<!--收入列表-->
		<div class="incomeList">
			<ul class="income_wrapper title">
				<li class="income_item">{{$t("capital.date")}}</li>
				<li>{{$t("repurchasede.RepurchasedIMXnum")}}</li>
			</ul>
			<ul class="income_wrapper  incomeContent" v-for="item in repoRecordList">
				<li class="income_item">{{formatTime(item.dateTime).split(" ")[0]}}</li>
				<li class="income_item">{{item.buy_count | number(8)}}</li>
			</ul>
		</div>
		<!--选择时间-->
		<div class="time_bottom">
			<mt-datetime-picker v-model="selectT" type="date" :startDate="startDate" ref="startTime" @confirm="picker"></mt-datetime-picker>
		</div>

	</div>
</template>

<script>
	/*引入头部*/
	import header from "../../public/backHeader"
	export default {
		data() {
			return {
				titleText: this.$t("repurchasede.Repurchasehistory"),
				yesterdayList: [],
				selectT: "",
				/*选中的时间*/
				pickerValue1: this.$t(""),
				/*选择时间*/
				startWeiTime: "",
				month: "",
				year: "",
				startDate: new Date('2018-07'), //设置开始时间
				Lockposition: "0x93780cbA4E4af3C98F8b2155b990F83b926BFd09",
				/*锁仓地址*/
				buy_imx_count: "",
				/*回购imx*/
				repoRecordList: []
			}
		},
		components: { /*注册组件*/
			"my-header": header,
		},
		mounted() {
			/*获取昨日收入累积折合*/
			let _this = this;
			this.$refs.startTime.close(); /*关闭开始选择时间*/
			/*获取折合数据  start*/
			this.$ajax.get(this.httpUrl.group, {
				params: {
					"type": "index"
				}
			}).then(function(res) {
				_this.buy_imx_count = res.data.data.buy_imx_count; /*昨日回购IMX总量*/
				_this.yesterdayList = res.data.data.yesterday; /*昨日成交*/
			}, function(err) {
				console.log(err)
			})
			this.$ajax.get(this.httpUrl.repoRecord).then(function(res) {
				_this.repoRecordList = res.data.data;
			}, function(err) {
				console.log(err)
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
			picker(val) { /*确认时间*/
				this.pickerValue1 = this.newDate(val);
			},
			copy() { /*复制粘贴*/
				let _this = this;
				var clipboard = new Clipboard('#copy');
				clipboard.on('success', e => {
					_this.$message({
						message: _this.$t("capital.Successfullycopied"),
						type: 'success'
					});
					// 释放内存
					clipboard.destroy()
				})
				clipboard.on('error', e => {
					_this.$message({
						message: _this.$t("shouye.Phonedoesnotsup"),
						type: 'error'
					});
					// 释放内存
					clipboard.destroy()
				})
			},
			selectTime() {
				this.$refs.startTime.open();
			},
			newDate(date) {
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? '0' + m : m;
				return y + '-' + m;
			}
		}
	}
</script>

<style lang="scss" scoped>
	#imxRepurchase {
		width: 100%;
		height: 100%;
		background: #171933;
		color: #fff;
	}
	/*收入累积折合头部*/

	.fold_wrapper {
		width: 100%;
		height: 1.3rem;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: .2rem 0;
		background: #121528;
		.fold_item {
			flex: 1;
			height: 1.3rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			.icon {
				width: .4rem;
				height: .4rem;
				text-align: center;
				line-height: .41rem;
				border: 1px solid red;
				border-radius: 50%;
				.iconfont {
					font-size: .3rem;
				}
			}
			.text {
				line-height: .35rem;
			}
			.blue {
				border: 1px solid #49d7f4;
				color: #49d7f4;
			}
			.textblue {
				color: #49d7f4;
			}
			.green {
				width: .42rem;
				height: .42rem;
				box-sizing: border-box;
				border: 1px solid #04a96e;
				color: #04a96e;
			}
			.textgreen {
				color: #04a96e;
			}
		}
	}
	/*锁仓地址*/

	.LockingAddress {
		box-sizing: border-box;
		padding: 0 .1rem;
		width: 100%;
		height: .6rem;
		background: #191d38;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.title {
			width: 100%;
			line-height: .22rem;
		}
		.copy {
			width: 100%;
			display: flex;
			align-items: center;
			.address {
				width: 80%;
				height: .25rem;
				background: #121528;
				line-height: .25rem;
				box-sizing: border-box;
				padding-left: .05rem;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			.copyButton {
				color: #6A72D5;
				margin-left: .1rem;
			}
		}
	}
	/*待返回文字*/

	.income {
		width: 100%;
		height: .42rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #171933;
		font-size: .14rem;
	}
	/*记录*/
	/*平台手续费*/

	.incomeList {
		width: 100%;
		.income_wrapper {
			width: 100%;
			height: .4rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 .1rem;
			li:nth-of-type(1) {
				flex: .4;
				text-align: left;
			}
			li {
				flex: .6;
				height: .4rem;
				line-height: .4rem;
				text-align: right;
				span {
					display: inline-block;
					width: .8rem;
					height: .25rem;
					line-height: .25rem;
					text-align: center;
					border: none;
					border: 1px solid #989fff;
					background: #262746;
					border-radius: 4px;
					color: #fff;
				}
			}
		}
		.title {
			background: #1e2142;
		}
		.incomeContent:nth-of-type(even) {
			background: #121630;
		}
	}
</style>
