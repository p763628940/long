<template>
	<div id="forget">
		<!--我的头部-->
		<!--注册头部-->
		<div class="header_box">
			<div class="register_header">
				<p class="back" @click="$router.go(-1)">
					<i class="iconfont icon-zuojiantou"></i>
				</p>
				<p class="register_type">
					{{$t("userCenter.Recoveringpasswords")}}
				</p>
			</div>
		</div>
		<!--忘记密码-----步骤一-->
		<div class="forget_one" v-show="forget_one">
			<!--输入邮箱或者手机号码-->
			<div class="userAccountNumber">
				<i class="iconfont icon-ren1"></i>
				<!--文本框部分-->
				<div class="oInput">
					<input type="text" v-model="userName" :placeholder="$t('login.EnterEmailPhone')" />
				</div>
				<div class="tiShiError" v-show="tishiError">{{this.$t("login.Enteraccounterr")}}</div>
			</div>
			<div class="forget_one_button">
				<button class="button_login" :disabled="!userName" @click="forgetOne()">{{$t('login.Next')}}</button>
			</div>
		</div>
		<!--忘记密码---步骤二-->
		<div class="forget_two" v-show="forget_two">
			<!--验证码输入错误-->
			<div class="code_error" v-show="codeError">{{code_error}}</div>
			<!--手机-->
			<div class="phone" v-if="userList.mobile!=undefined&&userList.mobile.check==true">
				<p class="phone_title">{{$t("login.Cellphoneverificationcode")}} : </p>
				<div class="phone_code_success">
					<!--输入验证码-->
					<div class="userPhoneCode">
						<i class="iconfont icon-anquan"></i>
						<!--文本框部分-->
						<div class="oInput">
							<input type="text" :placeholder="$t('login.PleaseCode')" v-model="phone_code" />
						</div>
					</div>
					<!--发送秒-->
					<div class="Surplus">
						<span v-show="authTimePhone">{{auth_time}}{{$t('login.secresend')}}</span>
						<button class="again" @click="getPhoneYan()" v-show="againOne">{{$t("login.Sendconfirmationcode")}}</button>
					</div>
				</div>
			</div>
			<!--邮箱-->
			<div class="phone" v-if="userList.email!=undefined&&userList.email.check==true">
				<p class="phone_title">{{$t("login.Mailboxverificationcode")}} : </p>
				<div class="phone_code_success">
					<!--输入验证码-->
					<div class="userPhoneCode">
						<i class="iconfont icon-anquan"></i>
						<!--文本框部分-->
						<div class="oInput">
							<input type="text" :placeholder="$t('login.PleaseCode')" v-model="email_code" />
						</div>
					</div>
					<!--发送秒-->
					<div class="Surplus">
						<span v-show="authTimeEmail">{{email_time}}{{$t('login.secresend')}}</span>
						<button class="again" @click="getEmailYan()" v-show="againOne1">{{$t("login.Sendconfirmationcode")}}</button>
					</div>
				</div>
			</div>
			<!--谷歌-->
			<div class="phone" v-if="userList.google!=undefined&&userList.google.check==true">
				<p class="phone_title">{{$t('login.GoogleVerificationCode')}} : </p>
				<div class="phone_code_success">
					<!--输入验证码-->
					<div class="userPhoneCode">
						<i class="iconfont icon-anquan"></i>
						<!--文本框部分-->
						<div class="oInput">
							<input type="text" :placeholder="$t('login.PleaseCode')" v-model="google_code" />
						</div>
					</div>
				</div>
			</div>
			<!--下一步-->
			<div class="forget_one_button">
				<button class="button_login"  @click="forgetTow()">{{$t('login.Next')}}</button>
			</div>
		</div>

		<!--忘记密码--步骤三-->
		<div class="forget_three" v-show="forget_three">
			<!--密码-->
			<div class="userPassword">
				<i class="iconfont icon-suo"></i>
				<!--文本框部分-->
				<div class="oInput">
					<input type="password" v-model="userPass" :placeholder="$t('login.PleasePassword')" />
				</div>
			</div>
			<!--再次密码-->
			<div class="userPassword">
				<i class="iconfont icon-suo"></i>
				<!--文本框部分-->
				<div class="oInput">
					<input type="password" v-model="userConPass" :placeholder="$t('login.PleaseEnterPassword')" />
				</div>
			</div>
			<!--密码要求-->
			<div class="password_yao">{{password_yao}}</div>
			<!--完成按钮-->
			<div class="back_submit">
				<button @click="phoneSubmit()" :disabled="!userConPass || !userPass">{{$t("login.Submit")}}</button>
			</div>
		</div>

	</div>
</template>

<script>
	import $ from "jquery";
	export default {
		data() {
			return {
				text: this.$t("login.ForPassword"),
				forget_one: true,
				/*第一步*/
				forget_two: false,
				/*第二步*/
				forget_three: false,
				/*第三步*/
				userName: "",
				/*用户名称*/
				tishiError: false,
				/*提示报错*/
				userList: {
					"mobile": {
						"title": "",
						"check": false
					},
					"email": {
						"title": "",
						"check": false
					},
					"google": {
						"title": "",
						"check": false
					}
				},
				/*获取用户信息*/
				authTimePhone: false,
				/*隐藏手机*/
				againOne: true,
				/*发送验证码*/
				phone_code: "",
				/*手机验证码*/
				auth_time: 0,
				/*手机倒计时*/
				email_code: "",
				/*邮箱验证码*/
				authTimeEmail: false,
				/*隐藏邮箱*/
				email_time: 0,
				/*倒计时*/
				againOne1: true,
				/*发送验证码*/
				google_code: "",
				/*谷歌验证码*/
				userPass: "",
				/*用户密码*/
				userConPass: "",
				/*用户确认密码*/
				password_yao: this.$t("login.PasswordNeed"),
				code_error:"",
				/*用户输入错误验证码提示*/
				codeError:false
				/*验证码错误*/
			}
		},
		mounted(){
			window.localStorage.setItem("username","")
		},
		methods: {
			phoneSubmit() { /*找回密码第三步*/
				var _this = this;
				/*判断用户密码是否在8-20位数字组成、字母或者符号、至少两种*/
				if(!/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/.test(this.userPass)) {
					this.password_yao = _this.$t("login.PasswordNeed");
					$(".password_yao").addClass("tiShi_active");
					setTimeout(() => {
						this.password_yao = _this.$t("login.PasswordNeed");
						$(".password_yao").removeClass("tiShi_active");
					}, 1000)
					return false;
				}
				if(this.userPass.length<8){
					this.password_yao = _this.$t("login.PasswordNeed");
					$(".password_yao").addClass("tiShi_active");
					setTimeout(() => {
						this.password_yao = _this.$t("login.PasswordNeed");
						$(".password_yao").removeClass("tiShi_active");
					}, 1000)
					return false;
				}
				var obj = JSON.parse(window.localStorage.getItem("code"));
				if(_this.userPass != _this.userConPass) {
					this.password_yao = _this.$t("login.Passwordsdiffer");
					$(".password_yao").addClass("tiShi_active");
					setTimeout(() => {
						this.password_yao = _this.$t("login.PasswordNeed");
						$(".password_yao").removeClass("tiShi_active");
					}, 1000)
					return false;
				} else {
					_this.$ajax.post(_this.httpUrl.resetPassword, {
						"username": _this.userName,
						"mobile_code": obj.mobile_code,
						"email_code": obj.email_code,
						"google_code": obj.google_code,
						"password": _this.userPass,
						"password_confirmation": _this.userConPass
					}).then(function(res) {
						if(res.data.status.code == 200) {
							window.localStorage.removeItem("username"); /*用完删除*/
							window.localStorage.removeItem("code");   /*用完删除*/
							_this.$router.push("/login")
						}
					}, function(err) {
						console.log(err)
					})
				}
			},
			forgetTow() { /*找回密码第二步*/
				var _this = this;
				var userList = this.userList;
				if(userList.mobile!=undefined&&userList.mobile.check==true&&_this.phone_code == "") {
					return false;
				}
				else if(userList.email!=undefined&&userList.email.check==true&& _this.email_code == "") {
					return false;
				} else if(userList.google!=undefined&&userList.google.check==true&& _this.google_code == "") {
					return false;
				}
				_this.$ajax.post(this.httpUrl.backPassValidator, {
					"username": _this.userName,
					"email_code": _this.email_code,
					"mobile_code": _this.phone_code,
					"google_code": _this.google_code
				}).then(function(res) {
					if(res.data.status.code == 200) {
						////将状态值存起来
						var obj = {
							"email_code": _this.email_code,
							"mobile_code": _this.phone_code,
							"google_code": _this.google_code
						};
						obj = JSON.stringify(obj);
						window.localStorage.setItem("code", obj);
						_this.forget_two = false;
						_this.forget_three = true;
					}
					if(res.data.status.message == "email_error"){
						_this.code_error = _this.$t("login.Confirmationerror");
						_this.codeError = true;
						setTimeout(function(){
							_this.codeError = false;
						},1000)
					}
					if(res.data.status.message == "mobile_error"){
						_this.code_error = _this.$t("login.Confirmationerror");
						_this.codeError = true;
						setTimeout(function(){
							_this.codeError = false;
						},1000)
					}
					if(res.data.status.message == "google_error"){
						_this.code_error = _this.$t("login.Confirmationerror");
						_this.codeError = true;
						setTimeout(function(){
							_this.codeError = false;
						},1000)
					}
				}, function(err) {
					console.log(err)
				})
			},
			///获取手机验证码
			getPhoneYan() {
				var _this = this;
				_this.$ajax.post(_this.httpUrl.getyan, {
						username: _this.userName,
						receiver_type: "mobile"
					})
					.then(function(res) {
						if(res.data.data.status == -200) {
							alert(_this.$("login.FrequentOperation"))
						} else {
							///获取成功
							_this.authTimePhone = true;
							_this.againOne = false;
							_this.auth_time = 60;
							var auth_timetimer = setInterval(() => {
								_this.auth_time--;
								if(_this.auth_time <= 0) {
									_this.authTimePhone = false;
									_this.againOne = true;
									clearInterval(auth_timetimer);
								}
							}, 1000);
						}
					})

			},
			////获取邮箱验证码
			getEmailYan() {
				var _this = this;
				_this.$ajax.post(_this.httpUrl.getyan, {
						'username': _this.userName,
						'receiver_type': "email"
					})
					.then(function(res) {
						if(res.data.data.status == -200) {
							alert(_this.$t("login.FrequentOperation"))
						} else {
							///获取成功
							_this.authTimeEmail = true;
							_this.againOne1 = false;
							_this.email_time = 60;
							var auth_timetimer = setInterval(() => {
								_this.email_time--;
								if(_this.email_time <= 0) {
									_this.authTimeEmail = false;
									_this.againOne1 = true;
									clearInterval(auth_timetimer);
								}
							}, 1000)
						}
					})

			},
			forgetOne() { /*找回密码第一步*/
				var _this = this;
				_this.$ajax.post(_this.httpUrl.backpassword, {
					username: _this.userName
				}).then(function(res) {
					if(res.data.status.code == -200) {
						_this.tishiError = true; ///提示用户账户输入错误
						setTimeout(function() {
							_this.tishiError = false;
						}, 1000)
					} else {
						/////存用户名
						window.localStorage.setItem("username", _this.userName);
						_this.userList = res.data.data;
						_this.forget_one = false;
						_this.forget_two = true;
					}
				}, function(err) {
					console.log(err)
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	$icon_color:#b2b3c0;
	$input_borderColor: .01rem solid #9092a5;
	$placeholder_color:#bcc1ff;
	$submit_borderColor:1px solid #9fa0af;
	$submit_color:#373959;
	$tiShi:#ba291e;
	/*提示颜色*/
	$header_bg:#1a1c3e;
	#forget{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		background: linear-gradient(#1c1f42, #1e214c,#191c3b,#191a38,#1b1e41); /* 标准的语法 */
	}
	.tiShi_active {
		color: $tiShi !important;
	}
	/*第三步*/

	.forget_three {
		width: 2.7rem;
		margin: .5rem auto;
		.userPassword {
			width: 100%;
			height: .45rem;
			display: flex;
			justify-content: space-between;
			line-height: .45rem;
			.iconfont {
				font-size: .22rem;
				color: $icon_color;
				margin: .08rem;
			}
			.oInput {
				width: 2.4rem;
				height: .45rem;
				border-bottom: $input_borderColor;
				box-sizing: border-box;
				input {
					width: 2.3rem;
					height: .22rem;
					box-sizing: border-box;
					padding-left: .1rem;
					background: none;
					border: none;
					outline: none;
					color: #fff;
				}
				input::-webkit-input-placeholder {
					color: $placeholder_color;
				}
			}
		}
		/*密码要求*/
		.password_yao {
			width: 100%;
			margin-top: .23rem;
			text-align: center;
			color: #fff;
		}
		/*完成*/
		.back_submit {
			width: 2.7rem;
			margin-top: .28rem;
			height: .38rem;
			button {
				width: 100%;
				height: .38rem;
				border: $submit_borderColor;
				background: $submit_color;
				color: #fff;
				outline: none;
			}
		}
	}
	/*第二步*/

	.forget_two {
		width: 100%;
		position: relative;
		.code_error{
			position: absolute;
			text-align: center;
			padding: .1rem;
			line-height: .2rem;
			position: fixed;
			left: 30%;
			top: 1.8rem;
			z-index: 66;
			background: #171a3b;
			box-shadow: 2px 2px 5px #000;
			color: #fff;
		}
		box-sizing: border-box;
		padding: 0 .2rem;
		margin-top: .7rem;
		.phone {
			.phone_title {
				color: #fff;
				margin-top: .25rem;
				margin-bottom: .2rem;
				font-size: .13rem;
			}
		}
	}
	/*获取验证码*/

	.phone_code_success {
		width: 2.7rem;
		position: relative;
		margin: 0 auto;
		/*发送验证码*/
		/*已发送验证码*/
		.phone_code {
			font-size: .14rem;
			color: #fff;
		}
		/*输入验证码文本框*/
		.userPhoneCode {
			width: 100%;
			height: .45rem;
			display: flex;
			justify-content: space-between;
			line-height: .45rem;
			.iconfont {
				font-size: .22rem;
				color: $icon_color;
			}
			.oInput {
				width: 2.4rem;
				height: .45rem;
				border-bottom: $input_borderColor;
				box-sizing: border-box;
				input {
					width: 2.3rem;
					height: .22rem;
					box-sizing: border-box;
					padding-left: .1rem;
					background: none;
					border: none;
					outline: none;
					color: #fff;
				}
				input::-webkit-input-placeholder {
					color: $placeholder_color;
				}
			}
		}
		/*提示剩余秒数*/
		.Surplus {
			position: absolute;
			right: 0;
			top: .15rem;
			color: #fff;
			.again {
				color: #737eff;
				border: none;
				outline: none;
				background: none;
			}
		}
	}
	/*第一步*/

	.forget_one {
		width: 100%;
		box-sizing: border-box;
		padding: 0 .2rem;
		margin-top: .7rem;
	}

	.forget_one_button {
		width: 100%;
		height: .38rem;
		margin-top: .36rem;
		.button_login {
			width: 100%;
			height: .38rem;
			border: $submit_borderColor;
			background: $submit_color;
			color: #fff;
			outline: none;
		}
	}
	/*输入手机或*/

	.userAccountNumber {
		width: 100%;
		height: .45rem;
		display: flex;
		justify-content: space-between;
		line-height: .45rem;
		position: relative;
		.tiShiError {
			position: absolute;
			left: 20%;
			top: .48rem;
			width: 1.2rem;
			height: .3rem;
			background: #171a3b;
			text-align: center;
			line-height: .3rem;
			color: #fff;
		}
		.iconfont {
			font-size: .22rem;
			color: $icon_color;
			margin: .06rem;
		}
		.oInput {
			width: 2.4rem;
			height: .45rem;
			border-bottom: $input_borderColor;
			box-sizing: border-box;
			input {
				width: 2.3rem;
				height: .22rem;
				box-sizing: border-box;
				padding-left: .1rem;
				background: none;
				border: none;
				outline: none;
				color: #fff;
			}
			input::-webkit-input-placeholder {
				color: $placeholder_color;
			}
		}
	}

	/*头部固定*/

	.register_header {
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		position: relative;
		color: #fff;
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
</style>
