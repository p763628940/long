<template>
	<div id="forget">
		<!--账号-->
		<div class="forget-content">
			<div class="requestTimeout" v-show="requestIsShow">
				<i class="iconfont icon-gantanhao"></i> {{$t("login.RequestAgain")}}
			</div>
			<!--第一步重置密码-->
			<div class="wan-ji" v-show="one">
				<h1>{{$t("login.ResetPassword")}}</h1>
				<div class="wan-ji-content">
					<div class="wj-title">{{$t("login.Account")}}</div>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<div id="text">
							<el-form-item prop="name">
								<el-input v-model="ruleForm.name" @keyup.enter.native="subOne" @keyup.native="Space($event)" @input.native="Space($event)"></el-input>
							</el-form-item>
							<span class="prompt" v-show="prompt">{{$t("login.UserNamenotExist")}}</span>
						</div>
						<el-form-item class="oneSub">
							<el-button type="primary" @click="subOne()">{{$t("login.Submit")}}</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<!--第二步安全验证-->
			<div class="an-quan" v-show="two">
				<h1>{{$t("login.safetyVerification")}}</h1>
				<!--手机验证码-->
				<el-form>
					<div class="phone" v-if="userList.mobile!=undefined&&userList.mobile.check==true">
						<dd class="isShowphone">
							<p class="isShowphone_title">{{$t("login.Mobilephone")}}</p>
							<div class="text">{{userList.mobile.title}}</div>
						</dd>
						<div class="phone-ma">{{$t("login.SMSverificationcode")}}</div>
						<div class="oInput">
							<el-form-item id="you-yan">
								<el-input v-model="phone_code" :rules="{
							      required: true, message:$t('public.CannotEmpty'), trigger: 'blur'
							   }"></el-input>
								<el-button @click="getPhoneYan()" id="getYan" :disabled="!sendAuthCode">
									<span v-show="sendAuthCode" class="auth_text auth_text_blue">{{$t("login.GetCode")}}</span>
									<span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{auth_time}} </span> {{$t("login.secresend")}}</span>
								</el-button>
							</el-form-item>
							<p class="tishi-red" v-show="phoneNokong">{{phoneNoText}}</p>
						</div>
					</div>
					<!--邮箱验证码-->
					<div class="email" v-if="userList.email!=undefined&&userList.email.check==true">
						<dd class="isShowphone">
							<p class="isShowphone_title">{{$t("login.RegisteredEmail")}}</p>
							<div class="text">{{userList.email.title}}</div>
						</dd>

						<div class="phone-ma">{{$t("login.Mailboxverificationcode")}}</div>
						<div class="oInput">
							<el-form-item id="you-yan1" :rules="{
						      required: true, message:$t('capital.Theverifyingcodecannotbeempty'), trigger: 'blur'
						     }">
								<el-input v-model="email_code"></el-input>
								<el-button @click="getEmailYan()" id="getYan1" :disabled="!sendAuthCodeEmail">
									<span v-show="sendAuthCodeEmail" class="auth_text auth_text_blue">{{$t("login.GetCode")}}</span>
									<span v-show="!sendAuthCodeEmail" class="auth_text"> <span class="auth_text_blue">{{email_time}} </span> {{$t("login.secresend")}}</span>
								</el-button>
							</el-form-item>
							<p class="tishi-red" v-show="emailNokong">{{emailNoText}}</p>
						</div>
					</div>
					<!--谷歌验证码-->
					<div class="google" v-if="userList.google!=undefined&&userList.google.check==true">
						<div class="phone-ma">{{$t("login.GoogleVerificationCode")}}</div>
						<div class="oInput">
							<el-input v-model="google_code" :rules="{
							      required: true, message:$t('public.CannotEmpty'), trigger: 'blur'
							 }"></el-input>
							<p class="tishi-red" v-show="googleNokong">{{googleNoText}}</p>
						</div>
					</div>
					<!--提交-->
					<div class="ti-jiao">
						<el-button type="primary" @click="subTow()">{{$t("login.Submit1")}}</el-button>
					</div>
				</el-form>
			</div>
			<!--第三步重置登录密码-->
			<div class="reset" v-show="three">
				<h1>{{$t("login.ResetLoginPassword")}}</h1>
				<div class="reset-content">
					<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
						<div class="google-ma">{{$t("login.Password")}}</div>
						<el-form-item prop="pass">
							<el-input type="password" :placeholder="$t('login.PasswordNeed')" maxlength="20" v-model="ruleForm2.pass" auto-complete="off"></el-input>
						</el-form-item>
						<div class="google-ma">{{$t("login.PleaseEnterPassword")}}</div>
						<el-form-item prop="checkPass">
							<el-input type="password" v-model="ruleForm2.checkPass" maxlength="20" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item class="oneSub">
							<el-button type="primary" :disabled="!ruleForm2.pass || !ruleForm2.checkPass" @click="submitForm()">{{$t("login.Submit1")}}</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<!--提示部分-->
			<div class="forget-content-right">
				<p>{{$t("login.loginResetpassword")}}</p>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from "axios";
	import { httpUrl } from "../http_url/http_url.js";
	import { mapMutations } from 'vuex';
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.$t("login.PleasePassword")));
				} else if(!/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/.test(value)) {
					callback(new Error(this.$t("login.PasswordNeed")));
				} else if(value.length < 8) {
					callback(new Error(this.$t("login.PasswordNeed")));
				} else {
					if(this.ruleForm2.checkPass !== '') {
						this.$refs.ruleForm2.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.$t("login.PassWordAgin")));
				} else if(value !== this.ruleForm2.pass) {
					callback(new Error(this.$t("login.Passwordsdiffer")));
				} else {
					callback();
				}
			};

			return {
				one: true, //第一步
				two: false, //第二步
				three: false, //第三步
				emailNokong: false,
				requestIsShow: false, //请求超时,得重试
				emailNoText: this.$t("capital.Theverifyingcodecannotbeempty"),
				/*提示*/
				phoneNokong: false,
				phoneNoText: this.$t("capital.Theverifyingcodecannotbeempty"),
				/*提示*/
				googleNokong: false,
				googleNoText: this.$t("capital.Theverifyingcodecannotbeempty"),
				/*提示*/
				prompt: false, //显示用户名输入错误
				phone_code: "", ///获取手机验证码
				email_code: "", ///获取邮箱验证码
				google_code: "", //谷歌验证码
				sendAuthCode: true, ///是否禁用手机获取验证码
				sendAuthCodeEmail: true, //是否禁用邮箱获取验证码
				auth_time: 0, //获取手机验证码倒计时
				email_time: 0, //获取邮箱验证码倒计时
				getCode: window.localStorage.getItem("code"),
				ruleForm: { ///第一步
					name: ""
				},
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
				}, ///////获取到的用户信息
				rules: { ////正则验证第一次重置登录密码
					name: [{
						required: true,
						message: this.$t("login.EmailPhone"),
						trigger: 'blur'
					}]
				},
				ruleForm2: { ///第三步
					pass: '',
					checkPass: ''
				},
				rules2: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			...mapMutations('user',['setData']),
			Space(e) { /*禁止输入空格*/
				e.target.value = e.target.value.replace(/\s+/g, '');
			},
			//////重置密码第一步
			subOne() {
				var _this = this;
				if(_this.ruleForm.name == "") { ///判断用户是否输入内容
					return false;
				} else {
					axios.post(httpUrl.backpassword, {
						username: _this.ruleForm.name
					}).then(function(res) {
						if(res.data.status.code == -200) {
							_this.prompt = true; ///提示用户账户输入错误
							setTimeout(function() {
								_this.prompt = false;
							}, 1000)
						} else {
							/////存用户名
							_this.setData({username:_this.ruleForm.name});
							_this.userList = res.data.data;
							_this.one = false;
							_this.two = true;
						}
					}, function(err) {
						console.log(err)
					})
				}

			},
			///获取手机验证码
			getPhoneYan() {
				var _this = this;
				axios.post(httpUrl.getyan, {
					username: _this.ruleForm.name,
					receiver_type: "mobile"
				}).then(function(res) {
					if(res.data.status.code == -200) {
						_this.$message({
							message: res.data.status.message,
							type: 'error'
						});
					} else {
						///获取成功
						_this.sendAuthCode = false;
						_this.auth_time = 60;
						var auth_timetimer = setInterval(() => {
							_this.auth_time--;
							if(_this.auth_time <= 0) {
								_this.sendAuthCode = true;
								clearInterval(auth_timetimer);
							}
						}, 1000);
					}

				})

			},
			////获取邮箱验证码
			getEmailYan() {
				var _this = this;
				axios.post(httpUrl.getyan, {
						'username': _this.ruleForm.name,
						'receiver_type': "email"
					})
					.then(function(res) {
						if(res.data.data.status == -200) {
							alert(_this.$t("capital.FrequentOperation"))
						} else {
							///获取成功
							_this.sendAuthCodeEmail = false;
							_this.email_time = 60;
							var auth_timetimer = setInterval(() => {
								_this.email_time--;
								if(_this.email_time <= 0) {
									_this.sendAuthCodeEmail = true;
									clearInterval(auth_timetimer);
								}
							}, 1000)
						}
					})

			},
			///第二步安全验证
			subTow() {
				////通过验证码来确定用户身份
				var _this = this;
				///判断用户是否输入完整信息userList.mobile!=undefined&&userList.mobile.check==true&&_this.phone_code == ""
				if(_this.userList.mobile != undefined && _this.userList.mobile.check == true && _this.phone_code == "") {
					_this.phoneNokong = true;
					setTimeout(function() {
						_this.phoneNokong = false;
					}, 1000)
					return false;
				} else if(_this.userList.email != undefined && _this.userList.email.check == true && _this.email_code == "") {
					_this.emailNokong = true;
					setTimeout(function() {
						_this.emailNokong = false;
					}, 1000)
					return false;
				} else if(_this.userList.google.check == true && _this.userList.google.check == true && _this.google_code == "") {
					_this.googleNokong = true;
					setTimeout(function() {
						_this.googleNokong = false;
					}, 1000)
					return false;
				} else {
					axios.post(httpUrl.backPassValidator, {
						"username": _this.ruleForm.name,
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
							_this.two = false;
							_this.three = true;
						}
						if(res.data.status.code == -200) {
							_this.$message({
								message: res.data.status.message,
								type: 'error'
							});
						}
						if(res.data.status.message == "mobile_error") {
							_this.phoneNoText = _this.$t("login.Confirmationerror")
							_this.phoneNokong = true;
							setTimeout(function() {
								_this.phoneNokong = false;
							}, 1000)
						}
						if(res.data.status.message == "email_error") {
							_this.emailNoText = _this.$t("login.Confirmationerror")
							_this.emailNokong = true;
							setTimeout(function() {
								_this.emailNokong = false;
							}, 1000)
						}
						if(res.data.status.message == "google_error") {
							_this.googleNoText = _this.$t("login.Confirmationerror")
							_this.googleNokong = true;
							setTimeout(function() {
								_this.googleNokong = false;
							}, 1000)
						}
					}, function(err) {
						console.log(err)
					})
				}
			},
			////第三步
			submitForm() {
				var _this = this;
				var obj = JSON.parse(window.localStorage.getItem("code"));
				if(!/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/.test(_this.ruleForm2.checkPass)) { /*判断是否要验证密码*/
					return false;
				}
				if(_this.ruleForm2.pass.length < 8) {
					return false;
				}
				if(_this.ruleForm2.pass != _this.ruleForm2.checkPass) {
					return false;
				} else {
					axios.post(httpUrl.resetPassword, {
						"username": _this.ruleForm.name,
						"mobile_code": obj.mobile_code,
						"email_code": obj.email_code,
						"google_code": obj.google_code,
						"password": _this.ruleForm2.pass,
						"password_confirmation": _this.ruleForm2.checkPass
					}).then(function(res) {
						if(res.data.status.code == 200) {
							_this.$router.push("/index/login");
							window.localStorage.removeItem("code"); /*删除code验证码*/
						}
						if(res.data.status.code == -200) {
							_this.requestIsShow = true;
							setTimeout(function() {
								_this.requestIsShow = false;
							}, 1000)
						}

					}, function(err) {
						console.log(err)
					})
				}
			}

		}
	}
</script>

<style lang="scss">
	/*文本框宽高+提示+内容二里*/

	.oInput {
		width: 100%;
		height: 80px;
	}

	.tishi-red {
		width: 100%;
		height: 20px;
		line-height: 20px;
		color: #f56c6c;
	}
	/*提示内容*/

	.prompt {
		display: inline-block;
		margin-top: 10px;
		color: #f56c6c;
	}

	.auth_text_blue {
		color: #749aef;
	}

	.forget-content {
		width: 900px;
		height: 700px;
		margin: auto;
		box-sizing: border-box;
		padding-top: 70px;
		position: relative;
		.requestTimeout {
			width: 150px;
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			left: 20%;
			top: 20%;
			color: #fff;
			z-index: 999;
			background: #414182;
			box-shadow: 2px 2px 5px #000;
			.iconfont {
				color: #F56C6C;
				margin-right: 5px;
			}
		}
		/*提示内容*/
		#text {
			width: 100%;
			height: 50px;
		}
		/*左侧内容区域*/
		.wan-ji {
			width: 360px;
			float: left;
			h1 {
				font-size: 30px;
				font-weight: 400;
				color: #fff;
			}
			.wan-ji-content {
				width: 100%;
				margin-top: 50px;
				.wj-title {
					width: 100%;
					margin: 10px 0;
					color: #fff;
				}
			}
		}
		/*第二部安全验证*/
		.an-quan,
		.reset {
			@extend .wan-ji;
		}
		.reset {
			.reset-content {
				width: 100%;
				margin-top: 30px;
				.google-ma {
					width: 100%;
					height: 50px;
					line-height: 50px;
					color: #fff;
				}
			}
		}
		.an-quan {
			.phone {
				width: 100%;
				.isShowphone {
					/*手机验证那块*/
					width: 100%;
					margin-top: 50px;
					.isShowphone_title {
						width: 100%;
						height: 35px;
						line-height: 35px;
						color: #fff;
					}
					.text {
						width: 100%;
						height: 40px;
						line-height: 40px;
						box-sizing: border-box;
						padding-left: 10px;
						background: #101034;
						border-radius: 5px;
						font-size: 16px;
						color: #fff;
					}
				}
				.phone-ma {
					width: 100%;
					height: 35px;
					line-height: 35px;
					color: #fff;
					margin-top: 10px;
				}
			}
			.email {
				@extend .phone;
				.isShowphone {
					margin-top: 20px !important;
				}
			}
			.google {
				@extend .phone;
			}
		}
		.forget-content-right {
			float: left;
			p {
				color: #6e70e9;
				margin-left: 140px;
				margin-top: 106px;
			}
		}
	}
	/*右侧提示内容*/

	.jztb-text {
		float: left;
		margin-left: 100px;
		margin-top: 110px;
		color: #5b5cc6;
	}
	/*验证码*/

	#you-yan {
		position: relative;
		#getYan,
		#getma {
			height: 30px;
			line-height: 5px;
			position: absolute;
			right: 0;
			top: 6px;
			background: none;
			border: none;
			border-left: 1px solid #4e5b85;
			border-radius: 0;
		}
	}

	#you-yan1 {
		#getYan1,
		#getma {
			height: 30px;
			line-height: 5px;
			position: absolute;
			right: 0;
			top: 6px;
			background: none;
			border: none;
			border-left: 1px solid #4e5b85;
			border-radius: 0;
		}
	}
	/*提交*/

	#submit {
		margin-top: 20px;
	}

	.oneSub {
		margin-top: 55px;
	}
	/*忘记密码*/

	#forget {
		width: 100%;
		height: 100%;
		background: url(../../../static/img/bi2.png)no-repeat;
		background-size: 100% 100%;
		.login-left-title {
			width: 100%;
			height: 40px;
			font-size: 14px;
			line-height: 40px;
			margin: 5px 0;
			color: #fff;
		}
		/*文本框选中的颜色*/
		.el-input__inner:focus {
			border-color: #4a5fdf;
		}
		/*按钮大小*/
		.el-button--primary {
			width: 100% !important;
			height: 40px !important;
			/*margin-top: 55px;*/
			background-color: #6666fa !important;
			border: 1px solid #6666fa !important;
		}
		/*报错位置*/
		.el-form-item__error {
			width: 175px !important;
			height: 50px;
			line-height: 15px;
			text-align: center !important;
			left: 50% !important;
		}
		/*改变element-ui的变化*/
		.el-form-item__content {
			margin: 0 !important;
		}
		.el-select {
			width: 100% !important;
		}
		.el-input__inner {
			width: 100% !important;
			height: 45px !important;
			color: #fff !important;
			border: 1px solid #2c3983;
			background: #101034;
      font-size:12px;
		}
		.el-form-item {
			margin-bottom: 0 !important;
		}
	}
</style>
