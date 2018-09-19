<template>
	<div id="login">
		<!--登录内容部分-->
		<div class="login-container">
			<!--提示错误-->
			<div class="user-error" v-show="userError">{{userErrorText}}</div>
			<div class="userpass-error" v-show="userErrorpass">{{userErrorpassText}}</div>
			<!--左侧登录部分-->
			<div class="login-left">
				<h1>{{$t("login.PleaseLogin")}}</h1>
				<el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
					<div class="login-left-title">{{$t("login.Account")}}</div>
					<el-form-item prop="username">
						<el-input type="text" v-model="numberValidateForm.username" auto-complete="off"></el-input>
					</el-form-item>
					<div class="login-left-title">{{$t("login.Password")}}</div>
					<el-form-item prop="password" :rules="[
				      { required: true, message: $t('login.PasswordCannotEmp')}
				    ]">
						<el-input type="password" v-model="numberValidateForm.password" auto-complete="off" @keyup.enter.native="submitForm()"></el-input>
					</el-form-item>
					<div class="login">
						<el-form-item>
							<el-button type="primary" :disabled="numberValidateForm.username==''||numberValidateForm.password==''" @click="submitForm()">{{$t("login.Login")}}</el-button>
							<router-link to="/index/forget">{{$t("login.ForPassword")}}?</router-link>
							<router-link to="/index/register" class="immediately">{{$t("login.RegisterNow")}}</router-link>
						</el-form-item>
					</div>
				</el-form>
			</div>
			<!--右侧提示部分-->
			<!--定位验证谷歌-->
			<div class="google_check" v-show="googleIsShow">
				<div class="google-code">
					<p class="error" v-show="errorisShow">{{$t("login.Confirmationerror")}}</p>
					<div class="title">
						<h1>{{$t("capital.Securityverification")}}</h1>
						<i class="iconfont icon-cuowu" @click="googleIsShow=false"></i>
					</div>
					<div class="oinput">
						<p class="ts">{{$t("login.GoogleVerificationCode")}}</p>
						<el-input v-model="googleCode" @keyup.enter="tiJiao()" @keyup.native="googleCode=googleCode.replace(/\D/gi,'')"></el-input>
					</div>
					<div class="Determine">
						<el-button type="primary" :disabled="!googleCode" @click="tiJiao()">{{$t("userCenter.determine")}}</el-button>
					</div>
				</div>
			</div>
		</div>
		<!--黑色蒙版-->
		<div class="rgba" v-show="googleIsShow"></div>
	</div>
</template>

<script>
	import axios from "axios";
	import { httpUrl } from "../http_url/http_url.js";
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				oUrl: httpUrl.login,
				userError: false,
				/*用户名有误*/
				userErrorpass: false,
				/*密码错误*/
				/*用户名输入错误*/
				numberValidateForm: {
					client_id: httpUrl.client_id,
					client_secret: httpUrl.client_secret,
					username: '',
					password: ""
				},
				show: false,
				googleCode: "",
				/*谷歌验证码*/
				errorisShow: false,
				/*输入验证码错误提示*/
				googleIsShow: false,
				/*保留谷歌验证提交的token*/
				userErrorpassText: "",
				/*密码错误的提示*/
				userErrorText: "",
				/*账号错误的提示*/
			};
		},
		created() {

		},
		computed: {
        // 数组形式，当映射的计算属性的名称与 state 的子节点名称相同时使用
        // 下面为了简便，均以数组形式使用
		...mapState('user',['googleToken','expiresIn']),
        // 对象形式，可重命名 state 子节点名称
    	},
		methods: {
			...mapActions('user',[
				"login",'loginGoogleCode' // 將 `this.getApiList()` 映射為 `this.$store.dispatch('getApiList')`
			]),
			...mapMutations('user',['setColor']),
			//////提交登录
			async submitForm() {
			  let _this = this;
				if(this.numberValidateForm.username.replace(/[^\w\.\/]/ig, '') == '') {
					this.userErrorText =  this.$t("login.EnterorrectccountCA")
					this.userError = true;
					setTimeout(()=> {
						this.userErrorText = ""
						this.userError = false;
					}, 1000)
					return false;
				}
				if(this.numberValidateForm.password.replace(/\s/g, '') == '') {
					this.userErrorpassText = this.$t("userCenter.PasswordNotSpace")
					this.userErrorpass = true;
					setTimeout(()=> {
						this.userErrorpassText = ""
						this.userErrorpass = false;
					}, 1000)
					return false;
				}
				let res = await this.login( this.numberValidateForm);
          if(res.data.data==false){
            return false;
          }
				////判断是否需要谷歌验证
				if(res.data.google_check && this.googleToken) {
					this.googleIsShow = true;
						return false;
					}
			// 		if(!window.localStorage.getItem("isRegister")){ //返回上次浏览页面
            // //用户输入正确     储存token值
            // //1.存当前时间
            // var curTime = new Date().getTime(); //获取当前时间的
            // _this.$router.go(-1);
			// 			return false;
			// 		}
				if(res.data.access_token) {
					_this.$router.go(-1);
					///用户输入正确     储存token值  console.log(this.token);
					// this.$router.push({
					// 	name: "bbjy",
					// 	params: {
					// 		id: this.matchcoin_id
					// 	}
					// }); ///跳转到币币交易页面
					// window.location.reload(); ////跳转成功后刷新页面
				}
				else if(res.data.status.code == -500) {
					this.userErrorpassText = this.$t("login.AccountOrPassword")
					this.userErrorpass = true;
					setTimeout(()=> {
						this.userErrorpassText = ""
						this.userErrorpass = false;
					}, 1000)
				}
			},
			/*谷歌验证成功*/
			async tiJiao() {
			  let _this = this;
				let res = await this.loginGoogleCode({token:this.googleToken,code:this.googleCode});
          if(res.data.data==false){
            return false;
          }
				if(this.expiresIn) {
					///用户输入正确     储存token值
					//1.存当前时间
					// window.localStorage.setItem("curTime", curTime); ///存一个时间用于判断
					this.$router.go(-1);
					return false;
				}else {
					this.errorisShow = true;
					setTimeout(()=> {
						this.errorisShow = false;
					}, 1000)
					return false;
				}
			}
		}
	}
</script>

<style lang="scss">
	#login {
		width: 100%;
		height: 100%;
		background: url(../../../static/img/bi2.png);
		background-size: 100% 100%;
		/*登录部分*/
		.demo-ruleForm {
			margin-top: 50px;
		}
		.el-input__inner:focus {
			border-color: #4a5fdf;
		}
	}
	/*实现登录内容*/

	.rgba {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.login-container {
		width: 900px;
		height: 700px;
		position: relative;
		margin: 0 auto;
		color: #fff;
		box-sizing: border-box;
		padding-top: 60px;
		/*用户名或者密码输入错误*/
		.user-error {
			width: 200px;
			height: 50px;
			border-radius: 5px;
			text-align: center;
			line-height: 50px;
			color: #f56c6c;
			/*border: 1px solid #2c3983;
			background: #101034;*/
			position: absolute;
			left: 250px;
			top: 230px;
			z-index: 100;
		}
		.userpass-error {
			@extend .user-error;
			position: absolute;
			left: 250px;
			top: 320px;
			z-index: 200;
		}
		/*谷歌验证*/
		.google_check {
			width: 500px;
			height: 300px;
			border: 1px solid #2c3983;
			background: #1e1b46;
			z-index: 1000;
			position: absolute;
			left: 150px;
			top: 120px;
			.google-code {
				width: 500px;
				position: relative;
				.error {
					position: absolute;
					left: 30%;
					width: 170px;
					height: 40px;
					text-align: center;
					line-height: 40px;
					background: rgba(0, 0, 0, 0.5);
					color: #f56c6c;
					z-index: 100;
				}
				.title {
					width: 100%;
					margin-top: 20px;
					height: 60px;
					line-height: 60px;
					h1 {
						font-size: 30px;
						font-weight: 100;
						float: left;
						margin-left: 50px;
					}
					.iconfont {
						float: right;
						margin-right: 50px;
						cursor: pointer;
					}
				}
				.oinput {
					width: 400px;
					margin: 0 auto;
					margin-top: 40px;
					.ts {
						width: 100%;
						height: 30px;
						color: #9696c7;
					}
				}
				.Determine {
					width: 400px;
					margin: 0 auto;
					margin-top: 40px;
					button {
						float: right;
					}
				}
			}
		}
		.login-left {
			width: 435px;
			height: 100%;
			float: left;
			h1 {
				font-size: 30px;
				font-weight: 500;
			}
			.login-left-title {
				width: 100%;
				height: 40px;
				font-size: 14px;
				line-height: 40px;
				margin: 5px 0;
				color: #fff;
			}
		}
		.login-right {
			width: 400px;
			float: right;
			margin-top: 150px;
			p {
				color: #5b5cc6;
			}
			a {
				display: inline-block;
				color: #7271ee;
				margin-top: 20px;
			}
		}
		.login {
			margin-top: 40px;
			a {
				color: #6362cd;
				display: inline-block;
				margin-left: 20px;
			}
			.immediately {
				margin-left: 10px;
			}
		}
	}

	#login {
		/*按钮大小*/
		.el-button--primary {
			width: 160px !important;
			height: 40px !important;
			background-color: #6666fa !important;
			border: 1px solid #6666fa !important;
		}
		/*选择国籍*/
		.el-scrollbar__wrap {
			margin-bottom: -17px !important;
		}
		/*报错位置*/
		.el-form-item__error {
			width: 168px !important;
			height: 50px;
			text-align: center !important;
			left: 62% !important;
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
			color: #fff;
			border: 1px solid #2c3983;
			background: #101034;
		}
		.el-form-item {
			margin-bottom: 0 !important;
		}
	}
</style>
