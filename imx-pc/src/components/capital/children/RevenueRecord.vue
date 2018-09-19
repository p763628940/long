<template>
	<div id="RevenueRecord" :class="{'RevenueRecord_white':getColor==1}">
		<!--平台返还收益记录-->
		<div class="RevenueRecord_content">
			<!--头部-->
			<div class="RevenueRecord_title">
				<router-link tag="span" to="/index/capital">
					{{$t("revenue.Transactionaccount")}}>{{$t("revenue.Returnedhistory")}}
				</router-link>
				<!--平台返还收益记录-->
			</div>
			<!--累积总收益-->
			<div class="TotalRevenue">
				<span>{{$t("capital.Returnedamount")}}{{accumulation | number(8)}}IMX</span>
				<!--平台返还累积总收益-->
			</div>
			<div class="searchForBox">
				<!--搜索-->
				<div class="searchFor">
					<div class="searchFor_left">
						<span>{{$t("capital.Incometype")}}</span>
						<!--收益类型-->
						<div class="searchForType" :class="{'searchForType_white':getColor==1}">
							<el-select v-model="value" :placeholder="$t('userCenter.Pleasechoose')" @change="change(value)">
								<el-option v-for="(item,key) in list" :key="item" :label="item" :value="key">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="searchFor_right">
						<span class="time">{{$t("list.time")}} </span>
						<!--时间-->
						<p class="searchTime" :class="{'searchForType_white':getColor==1}">
							<el-date-picker v-model="searchTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="daterange" :range-separator="$t('capital.to')" :start-placeholder="$t('capital.Startdate')" :end-placeholder="$t('capital.Enddate')">
							</el-date-picker>
						</p>
						<p class="button">
							<el-button type="primary" @click="search()"> {{$t(" list.search")}} </el-button>
							<!--搜索-->
						</p>
					</div>
				</div>
				<!--日期-->
				<div class="searchForType_title">
					<ul>
						<li> {{$t("capital.date")}}</li>
						<!--日期-->
						<li> {{$t("list.currency")}} </li>
						<!--币种-->
						<li> {{$t("otc.Quantity")}} </li>
						<!--数量-->
						<li>{{$t("capital.Incometype")}}</li>
						<!--收益类型-->
					</ul>
				</div>
				<div class="searchForType_content">
					<ul v-for="item in rebateRecordList">
						<li>{{formatTime(item.created_at)}}</li>
						<li>{{item.get_currency.pageIdentifier}}</li>
						<li>{{item.balance | number(item.get_currency.displayNum)}}</li>
						<li>
							<span>{{txidTypeList[item.txid]}}</span>
						</li>
						<!--邀请好友返还-->
					</ul>
				</div>
				<div class="noData" v-show="rebateRecordList.length==0">{{$t("capital.NoRecord")}}</div>
				<div class="pageCount" v-show="rebateRecordList.length>0">
					<el-pagination layout="prev, pager, next" background @current-change="pageChange" :total="total">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import { httpUrl } from "../../http_url/http_url"
	export default {
		data() {
			return {
				value: "",
				searchTime: "",
				list: [],
				accumulation: "",
				/*平台返还累积*/
				txidType: "",
				/*选择类型*/
				rebateRecordList: [],
				/*收益记录*/
				total: 0,
				/*总条数*/
				txidTypeList: {
					2: this.$t("RevenueRecord.Activitytransaction"),
					3: this.$t("RevenueRecord.Registerto"),
					4: this.$t("RevenueRecord.Feecashback"),
					5: this.$t("RevenueRecord.Getcashback"),
					6: this.$t("RevenueRecord.Platform"),
					7: this.$t("RevenueRecord.Inviteyour"),
					8: this.$t("RevenueRecord.Feedeposit"),
					20: this.$t("RevenueRecord.Collecting")
				}

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
			search() {
				let _this = this;
				let startTime = _this.formAdd(_this.searchTime[0]); /*开始时间*/
				let entTime = _this.formAdd(_this.searchTime[1]); /*结束时间*/
				let type;
				if(_this.txidType == "") {
					type = 2
				} else {
					type = _this.txidType
				}
				axios.get(httpUrl.rebateRecord, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						txid: type,
						start_at: startTime,
						end_at: entTime
					}
				}).then(function(res) {
					_this.rebateRecordList = res.data.data.list.data;
					_this.total = res.data.data.list.total;
				}, function(err) {
					console.log(err)
				})
			},
			change(val) {
				let _this = this;
				_this.txidType = val;
				axios.get(httpUrl.rebateRecord, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						txid: val
					}
				}).then(function(res) {
					_this.rebateRecordList = res.data.data.list.data;
					_this.total = res.data.data.list.total;
				}, function(err) {
					console.log(err)
				})
			},
			pageChange(val) {
				let _this = this;
				let type;
				axios.get(httpUrl.rebateRecord, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						page: val
					}
				}).then(function(res) {
					_this.rebateRecordList = res.data.data.list.data;
					_this.total = res.data.data.list.total;
				}, function(err) {
					console.log(err)
				})
			}
		},
		mounted() {
			let _this = this;
			/*获取平台返回累积*/
			axios.get(httpUrl.plate_income, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.accumulation = res.data.data.all;
			}, function(err) {
				console.log(err)
			})
			/*获取记录*/
			axios.get(httpUrl.rebateRecord, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.list = res.data.data.txid;
				_this.rebateRecordList = res.data.data.list.data;
				_this.total = res.data.data.list.total;
			}, function(err) {
				console.log(err)
			})

		}
	}
</script>
<style lang="scss">
	#RevenueRecord .el-input__inner {
		width: 100% !important;
		height: 40px !important;
		color: #fff;
		border: 1px solid #2c3983;
		background: #101034;
	}
	/*分页样式*/
	#RevenueRecord	.el-pagination.is-background .el-pager li.active {
			background: #9F99F2;
			border: 1px solid #9F99F2;
		}
	#RevenueRecord .el-input__inner::-webkit-input-placeholder {
		color: #fff;
	}

	#RevenueRecord .el-range-input {
		background: #101034;
		color: #fff !important;
	}

	#RevenueRecord .el-range-separator {
		color: #fff;
	}

	#RevenueRecord .el-button--primary {
		background: #6666fa;
		border-color: #6666fa;
	}

	.searchForType_white {
		.el-input__inner {
			border: 1px solid #2c3983 !important;
			background: none !important;
			color: #000 !important;
		}
		.el-range-separator {
			color: #000 !important;
		}
		.el-input__inner::-webkit-input-placeholder {
			color: #000 !important;
		}
		.el-range-input {
			background: none !important;
			color: #000 !important;
		}
		.el-range-input::-webkit-input-placeholder {
			color: #000 !important;
		}
	}
</style>
<style lang="scss" scoped>
	/*收益白色版本开始*/

	.RevenueRecord_white {
		.noData {
			color: #000 !important;
		}
		/*头部*/
		.RevenueRecord_title {
			background: #fff !important;
			color: #000 !important;
		}
		/*累积总收益*/
		.TotalRevenue {
			background: #e8e8f4 !important;
			color: #000 !important;
			box-shadow: 0 7px 10px rgba(0, 0, 0, 0.2) !important;
		}
		.searchForBox {
			background: #f7f6fc !important;
			.searchFor {
				border-bottom: 1px solid #eee !important;
				div {
					span {
						color: #000 !important;
					}
				}
			}
			.searchForType_title {
				ul {
					border-bottom: 1px solid #eee !important;
				}
				ul li {
					color: #000 !important;
				}
			}
			.searchForType_content {
				ul {
					border-bottom: 1px solid #eee !important;
				}
				ul:hover {
					background: #fff !important;
				}
			}
		}
	}
	/*收益白色版本结束*/

	#RevenueRecord {
		display: flex;
		justify-content: center;
		.RevenueRecord_content {
			width: 85%;
		}
	}
	/*收益记录头部*/

	.RevenueRecord_title {
		width: 100%;
		height: 68px;
		background: #16182c;
		line-height: 68px;
		font-size: 23px;
		color: #fff;
		box-sizing: border-box;
		padding-left: 35px;
		margin: 26px 0;
		cursor: pointer;
	}
	/*总收益部分*/

	.TotalRevenue {
		width: 100%;
		height: 45px;
		background: #272867;
		color: #fff;
		line-height: 45px;
		box-sizing: border-box;
		padding-left: 35px;
		font-size: 16px;
		box-shadow: 0 7px 8px rgba(0, 0, 0, 0.8);
	}
	/*搜索部分*/

	.searchForBox {
		width: 100%;
		box-sizing: border-box;
		padding: 0 35px;
		background: #16182c;
	}

	.searchFor {
		width: 100%;
		height: 85px;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #4a4b67;
		.searchFor_left {
			display: flex;
			align-items: center;
			span {
				font-size: 15px;
				color: #fff;
			}
			.searchForType {
				margin-left: 20px;
			}
		}
		.searchFor_right {
			display: flex;
			align-items: center;
			.time {
				color: #fff;
				font-size: 15px;
				margin-right: 20px;
			}
			.searchTime {
				width: 70%;
			}
			.button {
				margin-left: 20px;
			}
		}
	}
	/*收益类型内容部分*/

	.searchForType_title {
		width: 100%;
		ul {
			display: flex;
			height: 45px;
			line-height: 45px;
			box-sizing: border-box;
			padding: 0 5px;
			color: #fff;
			font-size: 13px;
			li {
				flex: 1;
				text-align: center;
			}
			li:nth-of-type(1) {
				text-align: left;
			}
			li:nth-of-type(2) {
				flex: .6;
				text-align: left;
			}
			li:nth-last-of-type(1) {
				text-align: right;
			}
			li:nth-of-type(3) {
				flex: 1.3;
			}
		}
		ul {
			border-bottom: 1px solid #22233a;
		}
	}

	.searchForType_content {
		@extend .searchForType_title;
		ul:nth-last-child(1) {
			border-bottom: none;
		}
		ul:hover {
			background: #272c49;
		}
	}

	.pageCount {
		width: 100%;
		height: 70px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.noData {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		color: #fff;
	}
</style>
