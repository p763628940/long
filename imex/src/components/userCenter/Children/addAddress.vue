<template>
	<div id="addAddress">
		<my-header :text="headerText"></my-header>
		<!--币种选择-->
		<div class="tab_currency" @click="popupVisible=true">
			<p>
				<span class="text">{{$t("bbjy.Coin")}}</span>
			</p>
			<p>
				<span class="Violet">{{currencyName}}</span>
				<i class="iconfont icon-iconfontjiantou5"></i>
			</p>
		</div>
		<!--地址-->
		<div class="address">
			<span class="text">{{$t("capital.Address")}}</span>
			<input type="text" v-model="address" :placeholder="$t('userCenter.Pasteaddress')" />
		</div>
		<!--备注-->
		<div class="Remarks">
			<span class="text">{{$t("capital.Remarks")}}</span>
			<input type="text" v-model="Remarks" :placeholder="$t('userCenter.Fillnote')" />
		</div>
		<!--确认按钮-->
		<div class="submit">
			<button @click="clickAdd()">{{$t("otc.Confirm")}}</button>
		</div>
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
		<!--验证提示-->
		<!--用户提取积分验证框-->
		<div class="men_ban" v-show="jifenIsShow"></div>
		<!--提取积分-->
		<!--提取积分-->
		<div class="jifen" v-show="jifenIsShow">
			<div class="jifen_header">
				<span>{{$t("bbjy.Withdrawalverifi")}}</span>
				<i class="iconfont icon-cuowu" @click="cancel"></i>
			</div>
			<!--内容部分-->
			<div class="jifen_content">
				<!--手机-->
				<div class="phone" v-show="userList.mobile_status==2">
					<p class="name black">{{userList.mobile}}</p>
					<p class="input">
						<input type="text" v-model="phoneCode" :placeholder="$t('login.PleaseCode')" />
						<span class="white" v-show="phoneIsShow" @click="getPhoneCode()">{{$t('login.GetCode')}}</span>
						<span v-show="!phoneIsShow">{{phoneTime}}{{$t("login.secresend")}}</span>
					</p>
					<p class="error">
						<span v-show="phoneCodeError">{{phoneCodeErrorText}}</span>
					</p>
				</div>
				<div class="phone" v-show="userList.email_status==2">
					<p class="title name black">{{userList.email}}</p>
					<p class="input">
						<input type="text" v-model="emailCode" :placeholder="$t('login.Pmailboxverificationcode')" />
						<span class="white" v-show="emailIsShow" @click="getEmailCode()">{{$t("login.GetCode")}}</span>
						<span v-show="!emailIsShow">{{emailTime}}{{$t("login.secresend")}}</span>
					</p>
					<p class="error">
						<span v-show="emailCodeError">{{emailCodeErrorText}}</span>
					</p>
				</div>
				<div class="phone">
					<p class="input1" v-show="userList.google_status==2">
						<input type="text" v-model="googleCode" :placeholder="$t('login.EnterGoogleVerifiCode')" />
					</p>
					<p class="error">
						<span v-show="googleCodeError">{{googleCodeErrorText}}</span>
					</p>
				</div>
			</div>
			<!--确认按钮-->
			<div class="confirm">
				<p @click="cancel">{{$t("userCenter.Cancel")}}</p>
				<p @click="confirm()">{{$t("capital.Confirm")}}</p>
			</div>
		</div>

	</div>
</template>
<style lang="scss">
	#addAddress {
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
		.el-message {
			/*width: 2.5rem;*/
			min-width: 2.5rem;
			z-index: 2099 !important;
		}
		.el-message--warning {
			background-color: #fff;
			border-top: 2px solid #f96a0e;
		}
		.el-message .el-icon-warning {
			font-size: .15rem;
			color: #f96a0e;
		}
		.el-message--warning .el-message__content {
			color: #000;
		}
	}
</style>
<script>
	import header from "../../public/backHeader"
	import { Message } from 'element-ui'; /*消息提示*/
	import $ from "jquery"
	export default {
		data() {
			return {
				headerText: this.$t("userCenter.AddAddress"),
				currencyID: 0,
				/*币种ID*/
				currencyList: [],
				/*币种列表*/
				currencyName: "",
				/*币种 名称*/
				popupVisible: false,
				address: "",
				/*地址*/
				Remarks: "",
				/*备注*/
				userList: {},
				/*获取用户信息列表*/
				/*获取用户信息*/
				jifenIsShow: false,
				/*显示弹框*/
				emailCodeError: false,
				emailCodeErrorText: "邮箱验证码输入错误",
				/*短信验证码错误*/
				phoneCodeError: false,
				phoneCodeErrorText: "短信验证码输入错误",
				/*手机验证码错误*/
				googleCodeError: false,
				googleCodeErrorText: "谷歌验证码输入错误",
				/*谷歌验证码错误*/
				phoneTime: 0,
				/*手机倒计时*/
				emailTime: 0,
				/*邮箱倒计时*/
				phoneIsShow: true,
				/*手机验证码显示隐藏*/
				emailIsShow: true,
				/*邮箱验证吗显示隐藏*/
				phoneCode: "",
				/*手机验证码*/
				emailCode: "",
				/*邮箱验证码*/
				googleCode: "",
				/*谷歌验证码*/
			}
		},
		mounted() {
			let _this = this;
			/*获取币种列表*/
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
		},
		components: { /*头部*/
			"my-header": header
		},
		methods: {
			tabCurrency(i, data) { /*切换币种*/
				let _this = this;
				$(".cardItem .icon-duihao").eq(i).show().parent(".cardItem").siblings(".cardItem").find(".icon-duihao").hide();
				_this.currencyName = data.pageIdentifier;
				_this.currencyID = data.id;
			},
			clickAdd() { /*点击添加地址*/
				let _this = this;
				if(_this.address == "") {
					_this.$message({
						showClose: true,
						message: this.$t("userCenter.Addresscannotempty"),
						type: 'warning',
						duration: 2000
					});
					return false;
				}
				if(_this.Remarks == "") {
					_this.$message({
						showClose: true,
						message: _this.$t("userCenter.Fillnote"),
						type: 'warning',
						duration: 2000
					});
					return false;
				}
				this.jifenIsShow = true;
			},
			cancel() { /*取消*/
				let _this = this;
				this.jifenIsShow = false;
				_this.phoneCode = "";
				_this.emailCode = "";
				_this.googleCode = "";
			},
			confirm() {
				let _this = this;
				if(_this.phoneCode == "" && _this.userList.mobile_status == 2) {
					_this.phoneCodeErrorText = _this.$t("login.EnterCellphoneverificationcode");
					_this.phoneCodeError = true;
					setTimeout(function() {
						_this.phoneCodeError = false;
						_this.phoneCodeErrorText = "短信验证码输入错误"
					}, 1000)
					return false;
				}
				if(_this.emailCode == "" && _this.userList.email_status == 2) {
					_this.emailCodeErrorText =  _this.$t("login.EnterCellphoneverificationcode");
					_this.emailCodeError = true;
					setTimeout(function() {
						_this.emailCodeError = false;
						_this.emailCodeErrorText = "短信验证码输入错误"
					}, 1000)
					return false;
				}
				if(_this.googleCode == "" && _this.userList.google_status == 2) {
					_this.googleCodeErrorText =  _this.$t("login.EnterCellphoneverificationcode");
					_this.googleCodeError = true;
					setTimeout(function() {
						_this.googleCodeError = false;
						_this.googleCodeErrorText = "短信验证码输入错误"
					}, 1000)
					return false;
				}
				if(_this.userList.google_status != 2) {
					_this.googleCode = "111111";
				}
				if(_this.userList.email_status != 2) {
					_this.emailCode = "111111";
				}
				if(_this.userList.mobile_status != 2) {
					_this.phoneCode = "111111";
				}
				this.$ajax.post(this.httpUrl.addressCreate, { /*添加地址*/
					currency_id: _this.currencyID,
					remarks: _this.Remarks,
					address: _this.address,
					mobile_code: _this.phoneCode,
					google_code: _this.googleCode,
					email_code: _this.emailCode
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) { /*添加地址成功跳转地址列表*/
						_this.$router.push({
							name: "AddressList"
						})
					}
					if(res.data.status.message == "mobile_error") {
						_this.phoneCodeError = true;
						setTimeout(function() {
							_this.phoneCodeError = false;
						}, 1000)
					}
					if(res.data.status.message == "Email_error") {
						_this.emailCodeError = true;
						setTimeout(function() {
							_this.emailCodeError = false;
						}, 1000)
					}
					if(res.data.status.message == "google_error") {
						_this.googleCodeError = true;
						setTimeout(function() {
							_this.googleCodeError = false;
						}, 1000)
					}
				}, function(err) {
					console.log(err)
				})
			},
			getPhoneCode() { /*获取手机验证码子*/
				let _this = this;
				this.$ajax.post(this.httpUrl.Money_code, {
					type: 5,
					receiver_type: 0
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.phoneTime = 60;
						_this.phoneIsShow = false;
						var getTime = setInterval(() => {
							_this.phoneTime--;
							if(_this.phoneTime <= 0) {
								_this.phoneIsShow = true;
							}
						}, 1000)
					}
				}, function(err) {
					console.log(err)
				})

			},
			getEmailCode() { /*获取邮箱验证码子*/
				let _this = this;
				this.$ajax.post(this.httpUrl.Money_code, {
					type: 5,
					receiver_type: 1
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.emailTime = 60;
						_this.emailIsShow = false;
						var getTime = setInterval(() => {
							_this.emailTime--;
							if(_this.emailTime <= 0) {
								_this.emailIsShow = true;
							}
						}, 1000)
					}
				}, function(err) {
					console.log(err)
				})

			},

		}
	}
</script>

<style lang="scss" scoped>
	$back_color:#141738;
	$gao_liang:#a4acff;
	$border_bottom:1px solid #1f2353;
	#addAddress {
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

	.address,
	.Remarks {
		width: 100%;
		height: .36rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 .15rem;
		border-bottom: $border_bottom;
		background: $back_color;
		input {
			width: 75%;
			height: 80%;
			border: none;
			background: none;
		}
		input::-webkit-input-placeholder {
			color: #a5acff;
			text-align: right;
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
	/*确认按钮*/

	$submit_color:#373959;
	/*登录线条*/

	$submit_borderColor:1px solid #9fa0af;
	.submit {
		width: 2.7rem;
		height: .38rem;
		margin: .4rem auto;
		button {
			width: 100%;
			height: .38rem;
			border: $submit_borderColor;
			background: $submit_color;
			color: #fff;
			outline: none;
		}
	}
	/*蒙版*/

	.men_ban {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		left: 0;
		top: 0;
	}
	/*安全验证*/

	.jifen {
		position: fixed;
		top: 20%;
		left: 5%;
		width: 90%;
		background: #32355E;
		color: #fff;
		.jifen_header {
			width: 100%;
			height: .4rem;
			line-height: .4rem;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 .1rem;
			.iconfont {
				font-size: .14rem;
			}
			border-bottom:1px solid #232555;
		}
		/*确认按钮*/
		.confirm {
			width: 100%;
			height: .4rem;
			line-height: .4rem;
			display: flex;
			border-top: 1px solid #232555;
			p {
				width: 50%;
				text-align: center;
			}
			p:nth-of-type(1) {
				border-right: 1px solid #232555;
			}
		}
		/*积分内容*/
		.jifen_content {
			width: 100%;
			box-sizing: border-box;
			padding: 0 .1rem;
			.title {
				margin-top: .05rem !important;
			}
			.black {
				width: 100%;
				height: .35rem;
				line-height: .35rem;
				background: #262746;
				box-sizing: border-box;
				padding-left: .1rem;
				border-radius: .02rem;
				margin-top: .15rem;
			}
			.input {
				width: 100%;
				height: .3rem;
				line-height: .3rem;
				border: 1px solid #51569a;
				border-radius: .02rem;
				display: flex;
				box-sizing: border-box;
				justify-content: space-between;
				background: #262746;
				margin-top: .15rem;
				input {
					width: 65%;
					margin-left: .05rem;
					border: none;
					background: none;
					outline: none;
					color: #fff;
				}
				input {
					border-right: 1px solid #51569a;
				}
				span {
					display: inline-block;
					width: 35%;
					box-sizing: border-box;
					text-align: center;
				}
				.white {
					color: #878de4;
				}
			}
			.input1 {
				width: 100%;
				height: .3rem;
				line-height: .3rem;
				border: 1px solid #51569a;
				border-radius: .02rem;
				background: #262746;
				input {
					width: 90%;
					margin-left: .05rem;
					border: none;
					background: none;
					outline: none;
					color: #fff;
				}
				input::-webkit-input-placeholder {
					color: #fff;
					font-size: .12rem;
				}
			}
			.error {
				width: 100%;
				height: .2rem;
				line-height: .2rem;
				color: #BB2B21;
			}
			.input input::-webkit-input-placeholder {
				color: #fff;
				font-size: .12rem;
			}
			.userName {
				width: 100%;
				padding-bottom: .1rem;
				border-bottom: 1px solid #232555;
			}
		}
	}
</style>
