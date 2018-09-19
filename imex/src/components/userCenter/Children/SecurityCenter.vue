<template>
	<div id="SecurityCenter">
		<!--安全中心头部-->
		<div class="friends_header background">
			<p class="back" @click="$router.go(-1)">
				<i class="iconfont icon-zuojiantou"></i>
			</p>
			<p class="yao_qing">
				<span>{{$t("userCenter.Securitycenter")}}</span>
			</p>
		</div>
		<!--手机号绑定-->
		<div class="binding">
			<ul>
				<li @click="bindingMobile">
					<span>{{$t("login.PhoneNum")}}</span>
					<p>
						<span v-show="userList.mobile_status!=2" class="bing">{{$t("userCenter.Binding")}}</span>
						<span v-show="userList.mobile_status==2">{{$t("otc.Completed")}}</span>
						<i class="iconfont icon-iconfontjiantou5"></i>
					</p>
				</li>
				<div class="error" v-show="emailDsable">
					<i class="iconfont icon-gantanhao1"></i>{{$t("userCenter.UnableTo")}}
				</div>
				<li @click="bindingMailbox">
					<span>{{$t("login.EmailAddress")}}</span>
					<p>
						<span class="bing" v-show="userList.email_status!=2">{{$t("userCenter.Binding")}}</span>
						<span v-show="userList.email_status==2">{{$t("otc.Completed")}}</span>
						<i class="iconfont icon-iconfontjiantou5"></i>
					</p>
				</li>
				<router-link tag="li" to="/bindingGoogle">
					<span>{{$t("userCenter.GoogleVerifier")}}</span>
					<p>
						<span class="bing" v-show="userList.google_status!=2">{{$t("userCenter.Binding")}}</span>
						<span v-show="userList.google_status==2">{{$t("otc.Completed")}}</span>
						<i class="iconfont icon-iconfontjiantou5"></i>
					</p>
				</router-link>
				<router-link tag="li" to="/CapitalCipher">
					<span>{{$t("userCenter.Fundpassword")}}</span>
					<p>
						<span class="bing" v-show="userList.pay_password_status==false">{{$t("userCenter.Binding")}}</span>
						<span v-show="userList.pay_password_status">{{$t("otc.Completed")}}</span>
						<i class="iconfont icon-iconfontjiantou5"></i>
					</p>
				</router-link>
			</ul>
		</div>
		<!--绑定手机号码弹框-->
		<div class="meng_ban" v-show="phoneAlertShow"></div>
		<div class="bindingMobile_alert" v-show="phoneAlertShow">
			<div class="title">
				<span v-show="userList.mobile_status!=2">{{$t("capital.BindPhone")}}</span>
				<span v-show="userList.mobile_status==2">{{$t("userCenter.Modify")}} {{$t("login.PhoneNum")}}</span>
				<i class="iconfont icon-cuowu" @click="phoneAlertHide"></i>
			</div>
			<!--手机输入框-->
			<div class="content">
				<p class="phone">
					<input type="number" v-model="phoneNum" :placeholder="$t('userCenter.Pleasetn')" />
				</p>
				<p class="errorText">
					<span v-show="errorPhoneNum">
						{{errorPhoneNumText}}
					</span>
				</p>
				<p class="input">
					<input type="number" v-model="phoneCode" :placeholder="$t('login.PleaseCode')" />
					<span class="white" v-show="PhoneIsShow" @click="getPhoneCode()">{{$t("login.GetCode")}}</span>
					<span v-show="!PhoneIsShow">{{phoneTime}}{{$t("login.secresend")}}</span>
				</p>
				<p class="errorText">
					<span v-show="errorPhoneCode">
						{{errorPhoneCodeText}}
					</span>
				</p>
			</div>
			<!--取消确认-->
			<div class="bottom">
				<p class="cancel" @click="phoneAlertHide">{{$t("userCenter.Cancel")}}</p>
				<p class="confirmPhone" @click="confirmPhone">{{$t("userCenter.determine")}}</p>
			</div>
		</div>
		<!--绑定邮箱号码-->
		<div class="meng_ban" v-show="emailAlertShow"></div>
		<div class="bindingMobile_alert" v-show="emailAlertShow">
			<div class="title">
				<span>{{$t("userCenter.Binding")}} {{$t("userCenter.Email")}}</span>
				<i class="iconfont icon-cuowu" @click="emailAlertHide"></i>
			</div>
			<!--手机输入框-->
			<div class="content">
				<p class="phone">
					<input type="email" v-model="emailNum" :placeholder="$t('login.PleaseEmailAddr')" />
				</p>
				<p class="errorText">
					<span v-show="errorEmaliNum">
						{{errorEmaliNumText}}
					</span>
				</p>
				<p class="input">
					<input type="number" v-model="emailCode" :placeholder="$t('login.Pmailboxverificationcode')" />
					<span class="white" v-show="emailIsShow" @click="getEmaileCode()">{{$t("login.GetCode")}}</span>
					<span v-show="!emailIsShow">{{emailTime}}{{$t("login.secresend")}}</span>
				</p>
				<p class="errorText">
					<span v-show="errorEmaliCode">
						{{errorEmaliCodeText}}
					</span>
				</p>
			</div>
			<!--取消确认-->
			<div class="bottom">
				<p class="cancel" @click="emailAlertHide">{{$t("userCenter.Cancel")}}</p>
				<p class="confirm" @click="confirmEmail">{{$t("userCenter.determine")}}</p>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				phoneAlertShow: false,
				/*绑定或者修改的手机弹框*/
				PhoneIsShow: true,
				/*获取手机验证码*/
				phoneTime: 60,
				/*手机倒计时秒数*/
				phoneNum: "",
				/*手机号码*/
				errorPhoneNum: false,
				/*错误的手机号码*/
				errorPhoneNumText: this.$t("userCenter.Pleasetn"),
				/*错误手机号码提示*/
				errorPhoneCode: false,
				/*手机验证码错误提示*/
				errorPhoneCodeText:this.$t("login.PleaseCode"),
				phoneCode: "",
				/*手机验证码*/
				emailAlertShow: false,
				/*绑定邮箱的弹框*/
				emailIsShow: true,
				/*获取邮箱验证码*/
				emailTime: 60,
				/*邮箱倒计时秒数*/
				emailNum: "",
				/*邮箱号码*/
				emailCode: "",
				/*邮箱验证码*/
				userList: {},
				/*用户信息*/
				emailDsable: false,
				/*邮箱账户绑定不可修改*/
				errorEmaliNum: false,
				errorEmaliNumText:  this.$t("login.PleaseEmailAddr"),
				errorEmaliCode: false,
				errorEmaliCodeText:  this.$t("login.Pmailboxverificationcode")
			}
		},
		mounted() {
			let _this = this;
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
		methods: {
			bindingMobile() { /*绑定手机号码*/
				this.phoneAlertShow = true;
			},
			bindingMailbox() { /*绑定邮箱号码*/
				let _this = this;
				if(this.userList.email_status == 2) {
					this.emailDsable = true;
					setTimeout(function() {
						_this.emailDsable = false;
					}, 2000)
					return false;
				}
				this.emailAlertShow = true;
			},
			getPhoneCode() { /*发送手机验证码*/
				let _this = this;
				/*判断用户是否输入手机号码*/
				if(this.phoneNum == "") {
					this.errorPhoneNum = true;
					setTimeout(function() {
						_this.errorPhoneNum = false;
					}, 1000)
					return false;
				}
				//				if(!(/^1[3|4|5|8|7|9|6][0-9]\d{8}$/.test(this.phoneNum))) {
				//					this.errorPhoneNumText = "请输入正确的手机号码";
				//					this.errorPhoneNum = true;
				//					setTimeout(function() {
				//						_this.errorPhoneNum = false;
				//					}, 1000)
				//					return false;
				//				}
				this.$ajax.post(this.httpUrl.send_validator_message, {
					type: 2,
					country_id: _this.userList.country_id,
					receiver_type: "mobile",
					/*传入国家ID值*/
					mobile: _this.phoneNum
				}).then(function(res) {
					if(res.data.status.code == 200) {
						/*倒计时开始*/
						_this.PhoneIsShow = false;
						setInterval(function() {
							_this.phoneTime--;
							if(_this.phoneTime <= 0) {
								_this.PhoneIsShow = true;
							}
						}, 1000)
						/*倒计时结束*/
					}
					if(res.data.status.code == -2) {
						_this.$message({
							showClose: true,
							message: _this.$t("userCenter.Manyrequests"),
							type: 'warning'
						});
					}
				}, function(err) {
					console.log(err)
				})
			},
			confirmEmail() { /*确认发送邮箱*/
				let _this = this;
				if(this.emailNum == "") { /*判断邮箱号码是否为空*/
					this.errorEmaliNum = true;
					setTimeout(function() {
						_this.emailPhoneNum = false;
					}, 1000)
					return false;
				}
				if(!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.emailNum))) {
					this.errorEmaliNumText = _this.$t("login.PleaseEmailAddr"),
						this.errorEmaliNum = true;
					setTimeout(function() {
						_this.errorEmaliNum = false;
					}, 1000)
					return false;
				}
				if(this.emailNum.length < 13) {
					this.errorEmaliNumText = _this.$t("login.PleaseEmailAddr"),
						this.errorEmaliNum = true;
					setTimeout(function() {
						_this.errorEmaliNum = false;
					}, 1000)
					return false;
				}
				if(this.emailCode == "") {
					this.errorEmaliCode = true;
					setTimeout(function() {
						_this.errorEmaliCode = false;
					}, 1000)
					return false;
				}
				/*绑定邮箱*/
				this.$ajax.post(this.httpUrl.bind, {
					type: "email",
					email: _this.emailNum,
					code: _this.emailCode
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.phoneAlertShow = false;
						_this.$message({
							showClose: true,
							message: _this.$t("userCenter.Emailbindingsuccess"),
							type: 'success'
						});
						this.emailAlertShow=false;
					}
					if(res.data.status.code == -1) {
						_this.errorEmaliCode = true;
						_this.errorEmaliCodeText=_this.$t("capital.Mvce");
						setTimeout(function() {
							_this.errorEmaliCode = false;
						}, 1000)
					}
				}, function(err) {
					console.log(err)
				})

			},
			getEmaileCode() { /*获取邮箱验证码*/
				let _this = this;
				if(this.emailNum == "") { /*判断邮箱号码是否为空*/
					this.errorEmaliNum = true;
					setTimeout(function() {
						_this.errorEmaliNum = false;
					}, 1000)
					return false;
				}
				if(!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.emailNum))) {
					this.errorEmaliNumText = _this.$t("login.Entercorrectemail"),
						this.errorEmaliNum = true;
					setTimeout(function() {
						_this.errorEmaliNum = false;
					}, 1000)
					return false;
				}
				if(this.emailNum.length < 13) {
					this.errorEmaliNumText = _this.$t("login.Entercorrectemail"),
						this.errorEmaliNum = true;
					setTimeout(function() {
						_this.errorEmaliNum = false;
					}, 1000)
					return false;
				}

				/*开始获取验证码*/
				this.$ajax.post(this.httpUrl.send_validator_message, {
					type: 1,
					receiver_type: "email",
					email: this.emailNum
				}).then(function(res) {
					if(res.data.status.code == 200) {
						/*邮箱验证开始*/
						_this.emailIsShow = false;
						setInterval(function() {
							_this.emailTime--;
							if(_this.emailTime <= 0) {
								_this.emailIsShow = true;
							}
						}, 1000)
						/*邮箱验证结束*/
					}
				}, function(err) {
					console.log(err)
				})

			},
			confirmPhone() { /*确认发送手机号码*/
				let _this = this;
				if(this.phoneCode == "") { /*判断验证码是否为空*/
					this.errorPhoneCode = true;
					setTimeout(function(res) {
						_this.errorPhoneCode = false;
					}, 1000)
				}
				/*判断用户是否输入手机号码*/
				if(this.phoneNum == "") {
					this.errorPhoneNum = true;
					setTimeout(function() {
						_this.errorPhoneNum = false;
					}, 1000)
					return false;
				}
				//				if(!(/^1[3|4|5|8|7|9|6][0-9]\d{8}$/.test(this.phoneNum))) {
				//					this.errorPhoneNumText = "请输入正确的手机号码";
				//					this.errorPhoneNum = true;
				//					setTimeout(function() {
				//						_this.errorPhoneNum = false;
				//					}, 1000)
				//					return false;
				//				}
				this.$ajax.post(this.httpUrl.bind, {
					type: "mobile",
					mobile: _this.phoneNum,
					country_id: _this.userList.country_id,
					code: _this.phoneCode
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						if(_this.userList.mobile_status == 2) {
							_this.phoneAlertShow = false;
							_this.$message({
								showClose: true,
								message:_this.$t("userCenter.Phonemodifiedsuccess"),
								type: 'success'
							});
						} else {
							this.phoneAlertShow = false;
							_this.$message({
								showClose: true,
								message: _this.$t("userCenter.Emailbindingsuccess"),
								type: 'success'
							});
						}
					}
					if(res.data.status.code == -1) {
						_this.errorPhoneCode = true;
						_this.errorPhoneCodeText=_this.$t("userCenter.Verification");
						setTimeout(function() {
							_this.errorPhoneCode = false;
						}, 1000)
					}
				}, function(err) {
					console.log(err)
				})
			},

			phoneAlertHide() { /*取消手机弹框*/
				this.phoneAlertShow = false;
				this.phoneNum = "";
				this.phoneCode = "";
			},
			emailAlertHide() { /*取消邮箱弹框*/
				this.emailAlertShow = false;
				this.emailNum = "";
				this.emailCode = "";
			}
		}
	}
</script>

<style lang="scss" scoped>
	$header_bg:#141738;
	$alet_border:0.01rem solid #1b1d40;
	$color_bg:#141738;
	$alert_back:#323560;
	/*弹框背景颜色*/
	/*背景*/

	.background {
		background: $color_bg;
	}
	/*头部固定*/

	.friends_header {
		width: 100%;
		height: .5rem;
		position: relative;
		display: flex;
		justify-content: space-between;
		line-height: .5rem;
		box-sizing: border-box;
		border-bottom: $alet_border;
		padding: 0 .1rem;
		color: #fff;
		.yao_qing {
			width: 60%;
			text-align: center;
			position: absolute;
			left: 20%;
			font-size: .15rem;
			font-weight: 600;
		}
		.shouyi {
			font-size: .14rem;
		}
	}
	/*绑定内容*/

	.binding {
		width: 100%;
		background: #141738;
		color: #fff;
		margin-top: .1rem;
		ul {
			width: 100%;
			position: relative;
			.error {
				position: absolute;
				left: 15%;
				width: 70%;
				height: .3rem;
				display: flex;
				justify-content: center;
				align-items: center;
				background: #202350;
				.iconfont {
					color: #d81e06;
					margin-right: .05rem;
				}
			}
			li {
				width: 100%;
				height: .4rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: $alet_border;
				box-sizing: border-box;
				padding: 0 .1rem;
				.bing {
					color: #7d86fb;
				}
				p {
					display: flex;
					align-items: center;
					.iconfont {
						font-size: .16rem;
						margin-left: .1rem;
						margin-top: .04rem;
					}
				}
			}
		}
	}
	/*蒙版*/

	.meng_ban {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 666;
	}
	/*弹出绑定手机*/

	.bindingMobile_alert {
		width: 90%;
		height: 1.95rem;
		background: $alert_back;
		position: fixed;
		left: 5%;
		top: 20%;
		z-index: 667;
		color: #fff;
		font-size: .14rem;
		.title {
			width: 100%;
			height: .4rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 0 .1rem;
			border-bottom: $alet_border;
		}
		.content {
			box-sizing: border-box;
			padding: 0 .1rem;
			height: 1.18rem;
			.phone {
				input {
					width: 100%;
					height: .3rem;
					background: #262746;
					border: 1px solid #51569a;
					margin-top: .15rem;
					box-sizing: border-box;
					padding-left: .05rem;
					border-radius: .03rem;
				}
				input::-webkit-input-placeholder {
					color: #535aca;
				}
			}
			.errorText {
				width: 100%;
				height: .16rem;
				color: #d81e06;
			}
			.input {
				width: 100%;
				height: .3rem;
				line-height: .3rem;
				border: 1px solid #51569a;
				border-radius: .02rem;
				display: flex;
				justify-content: space-between;
				background: #262746;
				margin: .05rem 0 0 0;
				input {
					width: 65%;
					height: 100%;
					margin-left: .05rem;
					border: none;
					background: none;
					outline: none;
					color: #fff;
				}
				input::-webkit-input-placeholder {
					color: #535aca;
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
		}
		.bottom {
			width: 100%;
			height: .35rem;
			line-height: .35rem;
			display: flex;
			align-items: center;
			border-top: $alet_border;
			p {
				width: 50%;
				text-align: center;
				box-sizing: border-box;
			}
			p:nth-of-type(1) {
				border-right: $alet_border;
			}
		}
	}
</style>
