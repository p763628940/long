<template>
	<div id="login">
		<!--登录头部-->
		<div class="header_box">
			<div class="register_header">
				<p class="back" @click="$router.go(-1)">
					<i class="iconfont icon-zuojiantou"></i>
				</p>
			</div>
		</div>
		<!--用户登录主体内容部分-->
		<div class="login_img">
      <img src="../../assets/logo.png" alt="">
		</div>
		<!--邮箱或手机号-->
		<div class="login_content">
			<div class="content">
				<!--账号-->
				<div class="userAccountNumber">
					<i class="iconfont icon-ren1"></i>
					<!--文本框部分-->
					<div class="oInput">
						<input type="text" v-model="userName" :placeholder="$t('login.Enteraccount')" />
					</div>
				</div>
				<!--密码-->
				<div class="userPassword">
					<i class="iconfont icon-suo"></i>
					<!--秘密框内容-->
					<div class="oInput">
						<input :type="isPassword" v-model="userPass" />
						<span @click="tabIsPass">
							<i v-show="isPassword=='password'" class="iconfont icon-biyanjing"></i>
							<i v-show="isPassword!='password'" class="iconfont icon-yanjing"></i>
						</span>
					</div>

					<div class="tiShiError" v-show="tishiError">{{tishiText}}</div>
				</div>
				<!--按钮-->
				<div class="submit_login">
					<button class="button_login" @click="startLogin()">{{$t("login.Login")}}</button>
				</div>
				<!--立即注册  忘记密码-->
				<div class="RightOff_register">
					<router-link tag="span" to="/index/register">{{$t("login.RegisterNow")}}</router-link>
					<router-link tag="span" to="/forget">{{$t("login.ForPassword")}}</router-link?>
				</div>
			</div>
		</div>
		<!--绑定谷歌验证-->
		<div class="men_ban" v-show="google_bading"></div>
		<div class="bindingGoogle" v-show="google_bading">
			<div class="bindingGoogle_padding">
				<!--谷歌弹框-->
				<div class="bindingGoogle_title">
					<span>{{$t("login.GoogleVerificationCode")}}</span>
					<i class="iconfont icon-cuowu" @click="google_bading=false"></i>
				</div>
				<!--验证码输入框-->
				<div class="bindingGoogle_content">
					<input type="text" v-model="google_code" />
					<p class="googleCode_error" v-show="errorisShow">{{$t("userCenter.Verification")}}</p>
				</div>
			</div>
			<!--取消和确认-->
			<div class="qux_qur" @click="googleYan">
				<p>{{$t("capital.Confirm")}}</p>
			</div>

		</div>

	</div>
</template>

<script>
	import $ from "jquery"; /*引入jquery*/
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				userName: "",
				/*用户账号*/
				userPass: "",
				/*用户密码*/
				tishiError: false,
				/*提示错误*/
				tishiText: "",
				/*提示文本内容*/
				google_code: "",
				/*谷歌验证码*/
				google_bading: false,
				/*是否绑定谷歌*/
				errorisShow: false,
				/*谷歌验证码错误*/
				/*获取语言*/
				langIsShow: true,
				/*显示或者隐藏当前语言*/
				language: { /*获取语言的分类   */
					"zh": "中文简体",
					"en": "English"
				},
				langIsShow: false,
				/*显示或者隐藏语言选择*/
				isPassword: "password",
				isCandy: window.localStorage.getItem("isCandy"), //判断是否从微信进入注册账号
				isConsensus:window.localStorage.getItem("isConsensus") //判断是否从拉票页面进入
			}
		},
		computed: {
        // 数组形式，当映射的计算属性的名称与 state 的子节点名称相同时使用
        // 下面为了简便，均以数组形式使用
		...mapState('user',['googleToken','expiresIn','lang']),
        // 对象形式，可重命名 state 子节点名称
    	},
		methods: {
			...mapActions('user',[
				"login",'loginGoogleCode' // 將 `this.getApiList()` 映射為 `this.$store.dispatch('getApiList')`
			]),
			...mapMutations('user',['setColor','setLang']),
			changeLang(lang) { /*切换语言*/
				this.$i18n.locale = lang;
				Vue.config.lang = lang;
				this.setLang(lang);
			},
			tabIsPass() { /*是否能看密码*/
				if(this.isPassword == "password") {
					this.isPassword = "html"
				} else {
					this.isPassword = "password"
				}
			},
			async startLogin() {
				let _this = this;
				if(this.userName == "") {
					_this.$message({
						message: _this.$t("login.Enteraccount"),
						type: 'warning'
					});
					return false;
				}
				if(this.userPass == "") {
					_this.$message({
						message: _this.$t("userCenter.Pleaseenterpassword"),
						type: 'warning'
					});
					return false;
				}
				let res = await this.login( {client_id: _this.httpUrl.client_id,
					client_secret: _this.httpUrl.client_secret,
					username: _this.userName,
					password: _this.userPass});
				// this.$ajax.post(this.httpUrl.login, {
				// 	client_id: _this.httpUrl.client_id,
				// 	client_secret: _this.httpUrl.client_secret,
				// 	username: _this.userName,
				// 	password: _this.userPass
				// }).then(function(res) {
					////判断是否需要谷歌验证
					if(res.data.google_check) {
						_this.google_bading = true;
						return false;
					}
					let ws = this.ws;
					const wsOpenHandle = () => {
						///获取用户信息
						if (!this.userInfo) {
							this.info().then(() => ws.send('{"bind_id":"' + this.userInfo.user_id + '"}'));
						} else {
							ws.send('{"bind_id":"' + this.userInfo.user_id + '"}')
						}
					}
					//传递币对ID开始//
					if (ws.readyState === ws.OPEN) {
						wsOpenHandle();
					} else {
						ws.onopen = wsOpenHandle;
					}

					/*判断用户是否从邀请页面进入*/
					if(_this.isCandy && res.data.access_token && _this.$route.query.CandyId != undefined) {
						//1.存当前时间

						_this.$router.push({
							name: "InvitationCandy",
							params: {
								InvitationCode: _this.$route.query.InvitationCode,
								CandyId: _this.$route.query.CandyId
							}
						}); ///跳转到币币交易页面
					}else if(res.data.access_token && _this.isConsensus){  //判断是否从拉票页面进入
						//1.存当前时间

						_this.$router.push({
							name:"voteDetails",
							params: {
								eid: _this.$route.query.currEid,
							}
						}); ///跳转到币币交易页面
					} else {
	            		_this.$router.go(-1);
					}

				// }, function(err) {
				// 	console.log(err)
				// })

			},
			async googleYan() { /*谷歌验证*/
				var _this = this;
				let res = await this.loginGoogleCode({token:this.googleToken,code:this.google_code});
				// this.$ajax.post(this.httpUrl.loginGoogleCode, {
				// 	"token": _this.googleToken,
				// 	"code": _this.google_code
				// }).then(function(res) {
          if(res.data.data==false){
            return false;
          }
					/*判断用户是否从邀请页面进入*/
					if(_this.isCandy && res.data.expires_in && _this.$route.query.CandyId != undefined) {
						//1.存当前时间
						_this.$router.push({
							name: "InvitationCandy",
							params: {
								InvitationCode: _this.$route.query.InvitationCode,
								CandyId: _this.$route.query.CandyId
							}
						}); ///跳转到币币交易页面
					} else { //返回上次浏览页面
            		_this.$router.go(-1);

				}
		}
	}
}
</script>

<style lang="scss" scoped>
	/*文本框的色值*/

	$placeholder_color:#bcc1ff;
	/*文本框下边框*/

	$input_borderColor: .01rem solid #9092a5;
	/*字体图标颜色*/

	$icon_color:#b2b3c0;
	/*登录背景*/

	$submit_color:#373959;
	/*登录线条*/

	$submit_borderColor:1px solid #9fa0af;
	/*立即注册字体颜色*/

	$zhuce_color:#acb3ff;
	/*登录背景*/

	$alert_bg:#323560;
	/*谷歌验证头部下边框*/

	$alert_border:1px solid #2b2e5b;
	$alert_inputBorder:1px solid #474a85;
	$alert_inputbg:#262746;
	$tishi_bg:#171a3b;
	/*提示的背景颜色*/

	#login {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		background: linear-gradient(#1c1f42, #1e214c, #191c3b, #191a38, #1b1e41);
		/* 标准的语法 */
	}
	/*绑定谷歌*/

	.men_ban {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		left: 0;
		top: 0;
	}

	.bindingGoogle {
		width: 90%;
		background: $alert_bg;
		position: fixed;
		top: 20%;
		left: 5%;
		z-index: 1000;
		.bindingGoogle_padding {
			width: 100%;
			box-sizing: border-box;
			padding: 0 .1rem;
		}
		.bindingGoogle_title {
			width: 100%;
			height: .4rem;
			line-height: .4rem;
			display: flex;
			justify-content: space-between;
			color: #fff;
			border-bottom: $alert_inputBorder;
		}
		.bindingGoogle_content {
			width: 100%;
			height: .3rem;
			position: relative;
			border: $alert_inputBorder;
			box-sizing: border-box;
			padding-left: .1rem;
			border-radius: .02rem;
			background: $alert_inputbg;
			margin: .25rem 0;
			input {
				width: 95%;
				height: .3rem;
				box-sizing: border-box;
				border: none;
				background: none;
				outline: none;
				color: #fff;
			}
			.googleCode_error {
				position: absolute;
				left: 30%;
				top: .28rem;
				width: 35%;
				height: .3rem;
				text-align: center;
				color: #fff;
				line-height: .3rem;
				background: $tishi_bg;
			}
		}
		.qux_qur {
			width: 100%;
			height: .38rem;
			line-height: .38rem;
			display: flex;
			border-top: $alert_inputBorder;
			p {
				width: 100%;
				box-sizing: border-box;
				text-align: center;
				color: #fff;
			}
		}
	}
	/*登录头部*/

	.login_header {
		width: 100%;
		height: .4rem;
		line-height: .4rem;
		text-align: center;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: flex-end;
		.lang {
			width: 30%;
			position: relative;
			color: #fff;
			.title {
				width: 90%;
				height: .3rem;
				line-height: .3rem;
				border: 1px solid #3f437b;
				background: #262746;
				border-radius: .05rem;
				margin: .1rem 0;
			}
			.langList {
				width: 100%;
				height: .3rem;
				align-items: center;
				position: absolute;
				color: #fff !important;
				li {
					width: 90%;
					height: .3rem;
					line-height: .3rem;
					border: 1px solid #3f437b;
					background: #262746;
				}
			}
		}
	}
	/*登录logo*/

	.login_img {
		width: 100%;
		height: 1rem;
		text-align: center;
		img {
			width: 1rem;
			height: .5rem;
		}
	}
	/*登录内容部分*/

	.login_content {
		width: 100%;
		display: flex;
		justify-content: center;
		.content {
			width: 2.7rem;
		}
	}
	/*账号文本框*/

	.userAccountNumber {
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
	/*密码输入框*/

	.userPassword {
		@extend .userAccountNumber;
		margin-top: .1rem;
		position: relative;
		.tiShiError {
			position: absolute;
			left: 10%;
			top: .48rem;
			width: 2.3rem;
			height: .3rem;
			line-height: .3rem;
			background: #171a3b;
			color: #fff;
			text-align: center;
		}
		.oInput {
			position: relative;
			.iconfont {
				position: absolute;
				right: 10px;
				top: .05rem;
				font-size: .15rem;
			}
		}
	}
	/*登录按钮*/

	.submit_login {
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
	/*立即注册   忘记密码*/

	.RightOff_register {
		width: 100%;
		height: .38rem;
		display: flex;
		justify-content: space-between;
		line-height: .38rem;
		color: $zhuce_color;
	}
	/*登录头部*/

	.register_header {
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		background: none;
		position: relative;
		color: #fff;
		margin-bottom: .4rem;
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
