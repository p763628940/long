<template>
	<div class="CapitalCipher">
		<div v-show="loadingIsShow">
			<loading></loading>
		</div>
		<!--账户设置头部-->
		<div class="friends_header background">
			<p class="back" @click="$router.go(-1)">
				<i class="iconfont icon-zuojiantou"></i>
			</p>
			<p class="yao_qing">
				<span>{{$t("otc.FundPassword")}}</span>
			</p>
		</div>
		<ul class="userList background">
			<li>
				<span class="name">{{$t("userCenter.Newfundpassword")}}</span>
				<input type="password" v-model="pass" :placeholder="$t('userCenter.Confirmfundpassword')" />
			</li>
			<li>
				<span class="name">{{$t("userCenter.Confirmfundpassword")}}</span>
				<input type="password" v-model="passCon" :placeholder="$t('userCenter.Confirmfundpassword')" />
			</li>
		</ul>
		<!--短信 验证码-->
		<div class="duanXin background">
			<input type="text" v-model="moneyCode" :placeholder="$t('login.PleaseCode')" />
			<span class="blue" @click="getCode()" v-show="getCodeIsShow">{{$t("login.GetCode")}}</span>
			<span v-show="!getCodeIsShow" class="time">{{time}}{{$t("login.secresend")}}</span>
		</div>
		<div class="Money_text">
			<span class="white">{{Money_text}}</span>
			<span class="red">{{errorText}}</span>
		</div>
		<!--确认按钮-->
		<div class="submit">
			<button :disabled="!pass || !passCon || !moneyCode" @click="confirm">{{$t("capital.Confirm")}}</button>
		</div>

	</div>
</template>

<script>
	import header from "../../public/header"
	import { httpUrl } from "../../http_url/http_url.js";
	import loading from "../../public/loading"
	import axios from "axios";
	export default {
		data() {
			return {
				accountSetHeader: this.$t("otc.FundPassword"),
				userList: [],
				/*获取用户信息*/
				pass: "",
				/*新密码*/
				passCon: "",
				/*确认密码*/
				Money_text: "",
				/*发送的类型 */
				errorText: "",
				/*报错提示的信息*/
				moneyCode: "",
				/*返回的code*/
				time: 0,
				/*最初时间*/
				getCodeIsShow: true, /*显示秒数*/
				loadingIsShow:false    /*loading效果*/
			}
		},
		components: {
			"my-header": header
		},
		mounted() {
			let _this = this;
			if(_this.token == null || _this.token == undefined) {
				return false;
			}
			// http request 拦截器
			this.$ajax.interceptors.request.use(
				config => {
					_this.loadingIsShow = true;
					return config;
				},
				err => {
					_this.loadingIsShow = false;
					return Promise.reject(err);
			});
			this.$ajax.interceptors.response.use(
				response => {
					_this.loadingIsShow = false;
					return response;
				},
				error => {
					_this.loadingIsShow = false;
				});
			///获取用户信息
			axios.get(httpUrl.userInfo, {
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
			confirm() { /*确认密码*/
				let _this = this;
				if(_this.pass.length < 8 || _this.pass.length > 16) {
					_this.errorText = _this.$t("userCenter.PasswordlLength");
					setTimeout(function() {
						_this.errorText = "";
					}, 1000)
					return false;
				}
				if(!(/^[0-9a-zA-Z]+$/.test(_this.pass))) {
					_this.errorText = _this.$t("userCenter.Enternumberletter");
					setTimeout(function() {
						_this.errorText = "";
					}, 1000)
					return false;
				}
				if(_this.pass != _this.passCon) {
					_this.errorText = _this.$t("login.Passwordsdiffer");
					setTimeout(function() {
						_this.errorText = "";
					}, 1000)
					return false;
				}
				axios.post(httpUrl.settingPaypass, {
					code: _this.moneyCode,
					pay_password: _this.passCon,
					pay_password_confirmation: _this.passCon,
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						if(_this.userList.pay_password_status == false) {
							_this.$message({
								showClose: true,
								message: _this.$t("userCenter.Emailbindingsuccess"),
								type: 'success'
							});
							_this.$route.push({"name":"SecurityCenter"})
						}
						if(_this.userList.pay_password_status) {
							_this.$message({
								showClose: true,
								message: _this.$t("userCenter.Phonemodifiedsuccess"),
								type: 'success'
							});
							_this.$route.push({"name":"SecurityCenter"})
						}
					}
					if(res.data.status.code == 101) {
						_this.errorText = _this.$t("login.Confirmationerror");
						setTimeout(function() {
							_this.errorText = "";
						}, 1000)
					}
				}, function(err) {
					console.log(err)
				})
			},
			getCode() { /*获取验证码*/
				let _this = this;
				///点击发送验证码
				axios.post(httpUrl.Money_code, {
					type: 4,
					receiver_type: _this.userList.mobile_status == 2 ? 0 : 1
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.data == false) {
						_this.errorText = _this.$t("userCenter.Manyrequests");
						setTimeout(function() {
							_this.errorText = "";
						}, 1000)
						return false;
					}
					_this.time = 60; //初始化时间
					_this.getCodeIsShow = false; //显示倒计时秒数
					var auth_timetimer = setInterval(() => {
						_this.time--;
						if(_this.time <= 0) {
							clearInterval(auth_timetimer);
							_this.getCodeIsShow = true;
						}
					}, 1000);
					_this.Money_text = _this.$t("userCenter.Sentto") + res.data.data; /*发送的类型*/
					setTimeout(function() {
						_this.Money_text = "";
					}, 2000)
				}, function(err) {
					console.log(err)
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	$submit_color:#373959;
	/*登录线条*/

	$submit_borderColor:1px solid #9fa0af;
	/*按钮边框颜色*/

	$border_bottom: 1px solid #1b1d3e;
	/*列表边框颜色*/

	$placeholder:#6f77e0;
	/*文本提示颜色*/

	$slideRight:#171932;
	/*弹框样式*/

	$submit_color:#373959;
	/*登录线条*/

	$submit_borderColor:1px solid #9fa0af;
	/*按钮边框颜色*/

	$color_bg:#141738;
	/*背景*/

	.background {
		background: $color_bg;
	}
	/*用户列表*/

	.userList {
		width: 100%;
		margin-top: .05rem;
		li {
			width: 100%;
			height: .4rem;
			line-height: .4rem;
			color: #fff;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 .1rem;
			border-bottom: $border_bottom;
			input {
				width: 54%;
				border: none;
				background: none;
				outline: none;
				color: #fff;
			}
			input::-webkit-input-placeholder {
				color: $placeholder;
				text-align: right;
			}
		}
	}
	/*短信验证码*/

	.duanXin {
		width: 100%;
		height: .4rem;
		padding: 0 .1rem;
		line-height: .4rem;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #1b1d3e;
		input {
			height: 100%;
			background: none;
			border: none;
			outline: none;
			color: #fff;
		}
		input::-webkit-input-placeholder {
			color: #fff;
		}
		span {
			display: inline-block;
			text-align: center;
			color: #fff;
			font-size: .14rem;
		}
		.time {
			font-size: .12rem;
		}
		.blue {
			color: $placeholder;
		}
	}

	.submit {
		width: 2.7rem;
		height: .38rem;
		margin: .5rem auto;
		button {
			width: 100%;
			height: .38rem;
			border: $submit_borderColor;
			background: $submit_color;
			color: #fff;
			outline: none;
		}
	}
	/*提示信息*/

	.Money_text {
		width: 100%;
		height: .3rem;
		line-height: .3rem;
		text-align: center;
		.red {
			color: #BD281A;
		}
		.white {
			color: #fff;
		}
	}
	/*头部*/

	.friends_header {
		width: 100%;
		height: .5rem;
		position: relative;
		display: flex;
		justify-content: space-between;
		line-height: .5rem;
		box-sizing: border-box;
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
</style>
