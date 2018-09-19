<template>
	<div id="AddressList">
		<!--地址列表头部-->
		<my-header :text="headerText"></my-header>
		<!--币种选择-->
		<div class="tab_currency" @click="popupVisible=true">
			<p>
				<span class="text"> {{$t("bbjy.Coin")}}</span>
			</p>
			<p>
				<span class="Violet">{{currencyName}}</span>
				<i class="iconfont icon-iconfontjiantou5"></i>
			</p>
		</div>
		<!--地址-->
		<ul class="address">
			<li class="address_item" v-for="item in addressList">
				<div class="oleft">
					<i class="iconfont icon-dizhi"></i>
				</div>
				<div class="oright">
					<p class="top">
						<span>{{item.get_currency.pageIdentifier}}</span>_
						<span class="remarks">{{item.remarks}}</span>
					</p>
					<p class="bottom">{{item.address}}</p>
				</div>
			</li>
		</ul>
		<!--分页开始-->
		<div class="pageCount" v-show="total>10">
			<el-pagination small layout="prev, pager, next" :page-size="10" :total="total" @current-change="pageCount">
			</el-pagination>
		</div>

		<!--分页结束-->

		<!--暂无记录-->
		<div class="noData" v-show="addressList.length==0">{{$t("list.noData")}}</div>

		<!--币种选择列表-->
		<mt-popup v-model="popupVisible" position="right">
			<div class="header_box">
				<div class="register_header">
					<p class="register_type">
            {{$t("bbjy.Coin")}}
					</p>
					<p class="back" @click="popupVisible=false">
						<i class="iconfont icon-zuojiantou"></i>
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
		<!--添加地址-->
		<div class="oHeight"></div>
		<div class="addAddress">
			<router-link to="/addAddress" tag="span">
				{{$t("capital.Add")}} {{$t("capital.Address")}}
			</router-link>
		</div>

	</div>
</template>

<script>
	import header from "../../public/backHeader"
	import $ from "jquery"
	export default {
		data() {
			return {
				headerText: this.$t("userCenter.AddressList"),
				popupVisible: false,
				/*币种列表显示隐藏*/
				currencyList: [],
				/*币种列表*/
				currencyName: "",
				/*选中币种名称*/
				currencyID: 0,
				/*默认币种ID*/
				CurrentPage: 1,
				/*当前第一页*/
				addressList: [],
				/*地址列表*/
				total: 0 /*总条数*/
			}
		},
		components: { /*注册组件*/
			"my-header": header
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
				_this.$ajax.get(_this.httpUrl.addressList, {
					params: {
						"currency_id": _this.currencyID
					},
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.addressList = res.data.data.data;
					_this.total = res.data.data.total;
				}, function(err) {
					console.log(err)
				})
			}, function(err) {
				console.log(err)
			})
		},
		methods: {
			tabCurrency(i, data) { /*切换币种*/
				let _this = this;
				$(".cardItem .icon-duihao").eq(i).show().parent(".cardItem").siblings(".cardItem").find(".icon-duihao").hide();
				_this.currencyName = data.pageIdentifier;
				_this.currencyID = data.id;
				_this.$ajax.get(_this.httpUrl.addressList, {
					params: {
						"currency_id": data.id
					},
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.addressList = res.data.data.data;
					_this.total = res.data.data.total;
				}, function(err) {
					console.log(err)
				})
			},
			pageCount(val) { /*分页*/
				let _this = this;
				_this.$ajax.get(_this.httpUrl.addressList, {
					params: {
						"page": val,
						"currency_id": _this.currencyID
					},
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.addressList = res.data.data.data;
					_this.total = res.data.data.total;
				}, function(err) {
					console.log(err)
				})
			}
		}
	}
</script>
<style lang="scss">
	#AddressList {
		.mint-popup {
			background: #141738;
		}
		.mint-popup-right {
			width: 100%;
			height: 100%;
			background: #141738;
			overflow-y: auto;
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
	}
</style>
<style lang="scss" scoped>
	$back_color:#141738;
	$gao_liang:#a4acff;
	$border_bottom:1px solid #1f2353;
	/*地址列表内容*/

	#AddressList {
		color: #fff;
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
		margin-top: .1rem;
		p {
			display: flex;
			align-items: center;
			.Violet {
				margin-right: .1rem;
			}
		}
		.text {
			font-size: .13rem;
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
	/*地址*/

	.address {
		width: 100%;
		background: $back_color;
		.address_item {
			width: 100%;
			display: flex;
			box-sizing: border-box;
			padding: 0 .1rem;
			border-bottom: $border_bottom;
			.oleft {
				width: .23rem;
				line-height: .3rem;
			}
			.oright {
				width: 90%;
				.top {
					width: 100%;
					height: .3rem;
					display: flex;
					align-items: center;
					.remarks {
						display: inline-block;
						width: 85%;
						height: .3rem;
						line-height: .3rem;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				.bottom {
					width: 100%;
					height: .25rem;
					line-height: .25rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color: #9098f4;
				}
			}
		}
	}
	/*添加地址*/

	.addAddress {
		width: 100%;
		text-align: center;
		height: .5rem;
		line-height: .5rem;
		background: #262746;
		color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 66;
		span {
			display: inline-block;
			width: 100%;
			height: 100%;
		}
	}

	.oHeight {
		height: .5rem;
	}

	.noData {
		width: 100%;
		line-height: .3rem;
		text-align: center;
	}

	.pageCount {
		width: 100%;
		height: .4rem;
		display: flex;
		justify-content: center;
		align-items: center;
		background: $back_color;
	}
</style>
