<template>
	<div id="register">
		<!--注册内容部分-->
		<div class="register-container">
			<!--该邮箱已被占用-->
			<div class="Notice_Box" v-show="NoticeShow">
				{{Notice}}
			</div>
			<!--欢迎注册部分-->
			<div class="hello_zuce">
				<!--欢迎头部-->
				<div class="hello-title">
					<h1 class="hello-title-left">{{$t("login.Welcometoregister")}}</h1>
					<!--头部选项部分-->
					<div class="hello-title-right">
						<p class="hello-active" @click="tabPhone(0)">
							{{$t("login.PhoneNum")}}
							<span>|</span>
						</p>
						<p @click="tabPhone(1)">{{$t("login.RegisteredEmail")}}</p>
					</div>
				</div>
				<!--欢迎内容部分-->
				<!--注册手机号部分内容-->
				<div class="hello-content" style="display: block;">
					<!--报错部分-->
					<div class="invited_error" v-show="invited_error1">{{$t("userCenter.IncorrectInvicode")}}</div>
					<!--验证码错误-->
					<div class="code_error" v-show="code_error1">{{$t("login.Confirmationerror")}}</div>
					<el-form :model="dynamicValidateForm1" :rules="rules1" ref="dynamicValidateForm1" label-width="100px" class="demo-dynamic">
						<div class="select-all">{{$t("login.Country")}}:</div>
						<el-select v-model="dynamicValidateForm1.country_id" :placeholder="$t('login.China')">
							<el-option v-for="item in cities" :key="item.name" :label="item.name" :value="item.id">
								<span style="float: left">{{ item.name }}</span>
								<span style="float: right; color: #8492a6; font-size: 13px">{{ item.key }}</span>
							</el-option>
						</el-select>
						<!--手机号码-->
						<div class="select-all">{{$t("login.PhoneNum")}}：</div>
						<el-form-item id="phone" prop="mobile">
							<el-select v-model="dynamicValidateForm1.country_id" id="phone-title">
								<el-option v-for="(item,index) in cities" :key="item.mobile_prefix" :label="item.mobile_prefix" :value="item.id" id="option">
								</el-option>
							</el-select>
							<el-input v-model.number="dynamicValidateForm1.mobile" @blur="phone()"></el-input>
							<span class="phone_tishi" v-show="phoneNum_error">请输入正确的手机号码</span>
						</el-form-item>
						<!--手机验证码-->
						<div class="select-all">{{$t("login.Cellphoneverificationcode")}}：</div>
						<el-form-item id="you-yan">
							<el-input v-model="dynamicValidateForm1.code" @keyup.native="dynamicValidateForm1.code=dynamicValidateForm1.code.replace(/\D/gi,'')"></el-input>
							<el-button id="getma" :disabled="!sendAuthCode1 || !dynamicValidateForm1.mobile" @click="getAuthCode1">
								<span v-show="sendAuthCode1" class="auth_text auth_text_blue">{{$t("login.GetCode")}}</span>
								<span v-show="!sendAuthCode1" class="auth_text"> <span class="auth_text_blue">{{auth_time1}} </span>{{$t("login.secresend")}}</span>
							</el-button>
						</el-form-item>
						<!--密码-->
						<div class="select-all">{{$t("login.Password")}}</div>
						<el-form-item prop="password">
							<el-input type="password" :placeholder="$t('login.PasswordNeed')" maxlength="20" v-model="dynamicValidateForm1.password" auto-complete="off"></el-input>
						</el-form-item>
						<!--确认密码-->
						<div class="select-all">{{$t("login.PleaseEnterPassword")}}</div>
						<el-form-item prop="password_confirmation">
							<el-input type="password" v-model="dynamicValidateForm1.password_confirmation" maxlength="20" auto-complete="off"></el-input>
						</el-form-item>
						<div class="select-all">{{$t("login.InvitationCode")}}</div>
						<el-form-item>
							<el-input type="text" v-model="dynamicValidateForm1.invite_code" :disabled="$route.query.invite_code!=undefined"></el-input>
						</el-form-item>
						<!--注册-->
						<div class="ok">
							<el-form-item>
								<el-checkbox v-model="checked1">{{$t("login.Ihave")}}
									<router-link class="tiao" target="_blank" to="/Agreement">《{{$t("login.UserAgreement")}}》</router-link>
								</el-checkbox>
								<br />
								<el-checkbox v-model="checkedPhone">{{$t("login.Ihave")}}
									<router-link class="tiao" target="_blank" to="/Privacy">《{{$t("login.UserPrivacyAgreement")}}》</router-link>
								</el-checkbox>
								<br />
								<el-button type="primary" :disabled="disabled()" @click="user_sell1()">{{$t("login.Register")}}</el-button>
								<router-link to="/index/forget" class="wan-ji">《{{$t("login.ForPassword")}}》？</router-link>
							</el-form-item>
						</div>
					</el-form>
				</div>

				<!--注册邮箱部分内容-->
				<div class="hello-content">
					<!--报错部分-->
					<div class="invited_error" v-show="invited_error2">{{$t("userCenter.IncorrectInvicode")}}</div>
					<!--验证码输入错误-->
					<div class="code_error" v-show="code_error2">{{$t("login.Confirmationerror")}}</div>
					<el-form :model="dynamicValidateForm" :rules="rules2" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
						<div class="select-all">{{$t("login.Country")}}:</div>
						<el-select v-model="dynamicValidateForm.country_id" placeholder="China">
							<el-option v-for="(item,index) in cities" :key="item.name" :label="item.name" :value="item.id">
								<span style="float: left">{{ item.name }}</span>
								<span style="float: right; color: #8492a6; font-size: 13px">{{ item.key }}</span>
							</el-option>
						</el-select>
						<div class="select-all">{{$t("login.RegisteredEmail")}}：</div>
						<el-form-item prop="email" :rules="[
						     	 { required: true, message: '请输入邮箱地址', trigger: 'blur' },
						      ]" class="email_box">
							<el-input v-model="dynamicValidateForm.email" @blur="email()"></el-input>
							<div class="tishi_email" v-show="emailNum_error">{{$t("userCenter.Entercorrectemail")}}</div>
						</el-form-item>
						<div class="select-all">{{$t("login.Mailboxverificationcode")}}：</div>
						<el-form-item id="you-yan">
							<el-input v-model="dynamicValidateForm.code" @keyup.native="dynamicValidateForm.code=dynamicValidateForm.code.replace(/\D/gi,'')"></el-input>
							<el-button id="getYan" :disabled="!sendAuthCode || !dynamicValidateForm.email" @click="getAuthCode">
								<span v-show="sendAuthCode" class="auth_text auth_text_blue">{{$t("login.GetCode")}}</span>
								<span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{auth_time}} </span>{{$t("login.secresend")}}</span>
							</el-button>
						</el-form-item>
						<div class="select-all">{{$t("login.Password")}}</div>
						<el-form-item prop="password">
							<el-input type="password" :placeholder="$t('login.PasswordNeed')" maxlength="20" v-model="dynamicValidateForm.password" auto-complete="off"></el-input>
						</el-form-item>
						<div class="select-all">{{$t("login.PleaseEnterPassword")}}</div>
						<el-form-item prop="password_confirmation">
							<el-input type="password" v-model="dynamicValidateForm.password_confirmation" maxlength="20" auto-complete="off"></el-input>
						</el-form-item>
						<div class="select-all">{{$t("login.InvitationCode")}}</div>
						<el-form-item>
							<el-input type="text" v-model="dynamicValidateForm.invite_code" :disabled="$route.query.invite_code!=undefined"></el-input>
						</el-form-item>
						<!--注册-->
						<div class="ok">
							<el-form-item>
								<el-checkbox v-model="checked">{{$t("login.Ihave")}}
									<router-link class="tiao" target="_blank" to="/Agreement">《{{$t("login.UserAgreement")}}》</router-link>
								</el-checkbox>
								<br />
								<el-checkbox v-model="checkedEmail">{{$t("login.Ihave")}}
									<router-link class="tiao" target="_blank" to="/Privacy">《{{$t("login.UserPrivacyAgreement")}}》</router-link>
								</el-checkbox>
								<br />
								<el-button type="primary" :disabled="disabledemail()" @click="user_sell()">{{$t("login.Register")}}</el-button>
								<router-link to="/index/forget" class="wan-ji">{{$t("login.ForPassword")}}？</router-link>
							</el-form-item>
						</div>
					</el-form>
				</div>
			</div>
			<!--警告信息-->
			<div class="notice">
				<p>{{$t("login.Pleasefill")}}</p>
				<p>{{$t("login.Loginaccount")}}</p>
				<p>{{$t("login.Foryour")}}</p>
				<p>{{$t("login.PleaseDon")}}</p>
			</div>

		</div>

	</div>
</template>

<script>
	import { httpUrl } from "../http_url/http_url.js";
	import axios from "axios";
	import $ from "jquery";
	import {mapState,mapGetters} from 'vuex'
	export default {
		data() {

			///验证手机密码
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else if(!/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/.test(value)) {
					callback(new Error(this.$t("login.PasswordNeed")));
				} else if(value.length < 8) {
					callback(new Error(this.$t("login.PasswordNeed")));
				} else {
					if(this.dynamicValidateForm1.password_confirmation !== '') {
						this.$refs.dynamicValidateForm1.validateField('password_confirmation');
					}
					callback();
				}
			};

			////验证手机二次密码
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.$t("login.PassWordAgin")));
				} else if(value !== this.dynamicValidateForm1.password) {
					callback(new Error(this.$t("login.PasswordsEnterdiffer")));
				} else {
					callback();
				}
			};
			////验证邮箱密码
			var validatePass3 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.$t("userCenter.Pleaseenterpassword")));
				} else if(!/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/.test(value)) {
					callback(new Error(this.$t("login.PasswordNeed")));
				} else if(value.length < 8) {
					callback(new Error(this.$t("login.PasswordNeed")));
				} else {
					if(this.dynamicValidateForm.password_confirmation !== '') {
						this.$refs.dynamicValidateForm.validateField('password_confirmation');
					}
					callback();
				}
			};
			////验证邮箱二次密码
			var validatePass4 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.$t("login.PassWordAgin")));
				} else if(value !== this.dynamicValidateForm.password) {
					callback(new Error(this.$t("login.PasswordsEnterdiffer")));
				} else {
					callback();
				}
			};
			////验证手机号
			var checkAge = (rule, value, callback) => {
				if(!value) {
					return callback(new Error(this.$t("ApplicationCoin.PhoneNumNotEmpty")));
				} else if(!Number.isInteger(value)) {
					return callback(new Error(this.$t("userCenter.PhoneNumberMustNum")));
				} else {
					callback();
				}
			};
			return {
				value: "86",
				Notice: "",
				/*警告邮箱或者手机已经注册过了*/
				NoticeShow: false,
				/*显示隐藏警告*/
				checked: true, ///选择部分
				checked1: true,
				InterValObj: null, ///time 控制时间
				InterValObj1: null, //手机 time控制时间
				count: 60, ///初始秒数
				count1: 60, ///手机初始秒数
				curCount: null, ///剩余秒数
				curCount1: null, ///手机剩余秒数
				sendAuthCode: true, ///判断是否禁止按钮
				sendAuthCode1: true,
				invited_error1: false,
				/*手机邀请码错误*/
				invited_error2: false,
				/*邮箱验证码错误*/
				code_error1: false,
				/*手机验证码错误*/
				code_error2: false,
				/*邮箱验证码错误*/
				phoneNum_error: false,
				/*手机号码错误*/
				emailNum_error: false,
				/*邮箱输入错误*/
				checkedPhone: true,
				/*用户隐私协议*/
				checkedEmail: true,
				/*用户注册邮箱*/
				/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
				Invitation_code1: "",
				/*手机邀请码*/
				Invitation_code2: "",
				/*邮箱邀请码*/
				auth_time: 0,
				auth_time1: 0,
				cities: [],
				/*获取国家号码*/
				oUrl: httpUrl.register,
				oUrl1: httpUrl.send_validator_message,
				yanma: "",
				dynamicValidateForm: { ////注册邮箱需要的参数
					country_id: 1, ///国家id
					code: "", ///验证码
					type: "email", ///注册类型
					email: '', ///注册邮箱
					invite_code: '', ///邀请码 （选填）
					password: '', ///注册密码
					password_confirmation: '' ///重复密码
				},
				dynamicValidateForm1: { ////注册手机需要的参数
					country_id: 1, ///国家id
					code: "", ///验证码
					type: "mobile", ///注册类型
					mobile: '', ///注册手机号码
					invite_code: '', ///邀请码 （选填）
					password: '', ///注册密码
					password_confirmation: '' ///重复密码
				},
				value6: "china",
				value66: "china",
				rules1: {
					password: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					password_confirmation: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					mobile: [{
						validator: checkAge,
						trigger: 'blur'
					}]
				},
				rules2: {
					password: [{
						validator: validatePass3,
						trigger: 'blur'
					}],
					password_confirmation: [{
						validator: validatePass4,
						trigger: 'blur'
					}]
				}
			}
		},
		computed:{
			...mapState('user',['lang']),
			...mapGetters('setting',['urlPrefix'])
		},
		methods: {
			phone() {
				if(this.dynamicValidateForm1.mobile == "") {
					return false;
				}
				if(!Number.isInteger(this.dynamicValidateForm1.mobile)) {
					return false;
				}
				//				if(!(/^1[3|4|5|8|7|9|6][0-9]\d{8}$/.test(this.dynamicValidateForm1.mobile)) && this.dynamicValidateForm1.country_id == 1) {
				//					this.phoneNum_error = true;
				//					setTimeout(() => {
				//						this.phoneNum_error = false;
				//					}, 1000)
				//				} else if(!(/^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/.test(this.dynamicValidateForm1.mobile)) && this.dynamicValidateForm1.country_id == 2) {
				//					this.phoneNum_error = true;
				//					setTimeout(() => {
				//						this.phoneNum_error = false;
				//					}, 1000)
				//				}
			},
			email() {
				if(this.dynamicValidateForm.email == "") {
					return false;
				}
				if(this.dynamicValidateForm.email.length < 10) {
					this.emailNum_error = true;
					setTimeout(() => {
						this.emailNum_error = false;
					}, 1000)
				}

			},
			///手机不输入完整不允许提交 value6 value dynamicValidateForm1.code dynamicValidateForm1.password dynamicValidateForm1.password_confirmation
			disabled() {
				return this.value6 == "" || this.value == "" || this.dynamicValidateForm1.code == "" || this.dynamicValidateForm1.password == "" || this.dynamicValidateForm1.password_confirmation == "" || this.checked1 == false || this.checkedPhone == false;
			},
			///邮箱不输入完整不允许提交
			disabledemail() {
				return this.value66 == "" || this.dynamicValidateForm.code == "" || this.dynamicValidateForm.password == "" || this.dynamicValidateForm.password_confirmation == "" || this.checked == false || this.checkedEmail == false;
			},
			////tab切换手机号邮箱
			tabPhone(index) {
				////清空 文本框内容
				this.dynamicValidateForm1.code = "";
				this.dynamicValidateForm1.mobile = "";
				this.dynamicValidateForm.email = "";
				this.dynamicValidateForm1.password = "";
				this.dynamicValidateForm1.password_confirmation = "";
				this.dynamicValidateForm.code = "";
				this.dynamicValidateForm.mobile = "";
				this.dynamicValidateForm.password = "";
				this.dynamicValidateForm.password_confirmation = "";
				$(".hello-title-right p").eq(index).addClass("hello-active").siblings("p").removeClass("hello-active")
				$(".hello-content").eq(index).show().siblings(".hello-content").hide()
			},
			user_sell() { ////注册邮箱
				var that = this;
				if(!/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/.test(that.dynamicValidateForm.password)) { /*判断输入密码是否在验证内*/
					return false;
				}
				if(that.dynamicValidateForm.password.length < 8) {
					return false;
				}
				if(that.dynamicValidateForm.password != that.dynamicValidateForm.password_confirmation) {
					return false;
				}
				if(this.dynamicValidateForm.email == "") {
					return false;
				}
				if(this.dynamicValidateForm.email.length < 10) {
					this.emailNum_error = true;
					setTimeout(() => {
						this.emailNum_error = false;
					}, 1000)
				}
				/*判断注册成功*/
				axios.post(that.oUrl, {...that.dynamicValidateForm,prefix:that.urlPrefix}).then(function(response) {
					if(response.data.status.code == 200) {
						that.$message({
							message: that.$t("login.RegisteredSuccess"),
							type: 'success',
							duration: 500
						});
						setTimeout(function(res) {
							that.$router.push('/index/login')
						}, 500)

					}
					if(response.data.status.code == 101) {
						that.invited_error2 = true;
						setTimeout(function() {
							that.invited_error2 = false;
						}, 1000)
					}
					if(response.data.status.code == -1) {
						that.code_error2 = true;
						setTimeout(function() {
							that.code_error2 = false;
						}, 1000)
					}
				}, function(error) {
					console.log(error.status)
				})
			},
			user_sell1() { ///注册手机号
				var that = this;
				//				if(!(/^1[3|4|5|8|7|9|6][0-9]\d{8}$/.test(this.dynamicValidateForm1.mobile)) && this.dynamicValidateForm1.country_id == 1) {
				//					this.phoneNum_error = true;
				//					setTimeout(() => {
				//						this.phoneNum_error = false;
				//					}, 1000)
				//				} else if(!(/^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/.test(this.dynamicValidateForm1.mobile)) && this.dynamicValidateForm1.country_id == 2) {
				//					this.phoneNum_error = true;
				//					setTimeout(() => {
				//						this.phoneNum_error = false;
				//					}, 1000)
				//				}
				if(!/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/.test(that.dynamicValidateForm1.password)) { /*判断输入密码是否在验证内*/
					return false;
				}
				if(that.dynamicValidateForm1.password.length < 8) {
					return false;
				}
				if(that.dynamicValidateForm1.password != that.dynamicValidateForm1.password_confirmation) {
					return false;
				}
				axios.post(that.oUrl, {...that.dynamicValidateForm1,prefix:that.urlPrefix}).then(function(response) {
					if(response.data.status.code == 200) {
						that.$message({
							message: that.$t("login.RegisteredSuccess"),
							type: 'success',
							duration: 500
						});
						setTimeout(function(res) {
							that.$router.push('/index/login')
						}, 500)
					}
					if(response.data.status.code == 101) { /*邀请码错误*/
						that.invited_error1 = true;
						setTimeout(function() {
							that.invited_error1 = false;
						}, 1000)
					}
					if(response.data.status.code == -1) { /*验证码错误*/
						that.code_error1 = true;
						setTimeout(function() {
							that.code_error1 = false;
						}, 1000)
					}
				}, function(error) {
					console.log(error.status)
				})
			},
			getAuthCode: function() { //邮箱验证码
				var that = this;
				//注册倒计时开始
				if(that.dynamicValidateForm.email == "") {
					return false;
				}
				if(this.dynamicValidateForm.email.length < 10) {
					this.emailNum_error = true;
					setTimeout(() => {
						this.emailNum_error = false;
					}, 1000)
				} else {
					axios.post(that.oUrl1, {
						type: 0, ///类型  注册
						receiver_type: "email", ///验证接收器   邮箱
						country_id: that.dynamicValidateForm.country_id, ////国家id
						email: that.dynamicValidateForm.email ////用户邮箱
					}).then(function(response) {
						that.sendAuthCode = false;
						that.auth_time = 60;
						var auth_timetimer = setInterval(() => {
							that.auth_time--;
							if(that.auth_time <= 0) {
								that.sendAuthCode = true;
								clearInterval(auth_timetimer);
							}
						}, 1000);
					}, function(error) {
						if(error) {
							/*提示错误*/
							that.Notice = that.$t("login.Haveregistered");
							that.NoticeShow = true;
							that.sendAuthCode = true;
							setTimeout(function() {
								that.Notice = "";
								that.NoticeShow = false;
							}, 1000)
						}
					})
				}
			},
			getAuthCode1: function() { ///手机验证码
				var that = this;
				if(that.dynamicValidateForm1.country_id == null) {
					return false;
				}
				///匹配手机号码的正则
				if(that.dynamicValidateForm1.mobile == "") {
					return false;
				}
				axios.post(that.oUrl1, {
					type: 0, ///类型  注册
					receiver_type: "mobile", ///验证接收器   邮箱
					country_id: that.dynamicValidateForm1.country_id, ////国家id
					mobile: that.dynamicValidateForm1.mobile ////用户手机
				}).then(function(response) {
					if(response.data.status.code == 200) {
						that.sendAuthCode1 = false;
						that.auth_time1 = 60;
						var auth_timetimer = setInterval(() => {
							that.auth_time1--;
							if(that.auth_time1 <= 0) {
								that.sendAuthCode1 = true;
								clearInterval(auth_timetimer);
							}
						}, 1000);
					}
				}, function(error) {
					if(error) {
						/*提示错误*/
						that.Notice = that.$t("login.PhoneNumCccupied");
						that.NoticeShow = true;
						that.sendAuthCode1 = true;
						setTimeout(function() {
							that.Notice = "";
							that.NoticeShow = false;
						}, 1000)
					}
				})

			}

		},
		mounted() {
			////获取国家列表
			let that = this;
			if(this.lang!="zh-CN"){
				$(".hello-title-right p").eq(1).addClass("hello-active").siblings("p").removeClass("hello-active")
				$(".hello-content").eq(1).show().siblings(".hello-content").hide()
			}
			axios.get(httpUrl.country,{
        params:{lang:this.lang=='zh-CN'?'zh':'en'}
      }).then(function(res) {
				that.cities = res.data.data;
				that.dynamicValidateForm1.country_id = res.data.data[0].id;
				that.dynamicValidateForm.country_id = res.data.data[0].id;
			}, function(error) {
				console.log(error)
			})
			///判断有无邀请码
			if(this.$route.query.invite_code != null || this.$route.query.invite_code != undefined) {
				this.dynamicValidateForm1.invite_code = this.$route.query.invite_code;
				this.dynamicValidateForm.invite_code = this.$route.query.invite_code;
			}

		}
	}
</script>

<style lang="scss">
	/*手机号前缀*/
	/*邮箱验证*/

	.email_box {
		position: relative;
		.tishi_email {
			position: absolute;
			top: 37px;
			right: 9px;
			color: #f56c6c;
			font-size: 12px;
		}
	}
	/*选择国籍*/

	.el-scrollbar__wrap {
		margin-bottom: -17px !important;
	}

	#register {
		.auth_text_blue {
			color: #fff;
		}
		.el-input__inner:focus {
			border-color: #4a5fdf;
		}
		#phone {
			position: relative;
			.el-select {
				width: 21% !important;
				position: absolute;
				top: 0;
				left: 5px;
				z-index: 500;
				.el-input__inner {
					height: 35px !important;
					border: none;
					border-radius: 0;
					border-right: 1px solid #2e3a85;
				}
			}
			.el-input__inner {
				box-sizing: border-box;
				padding-left: 25%;
				color: #fff;
			}
			.phone_tishi {
				position: absolute;
				top: 37px;
				right: 9px;
				color: #fd3030;
				font-size: 12px;
			}
		}
		/*按钮大小*/
		.el-button--primary {
			width: 160px !important;
			height: 40px !important;
			background-color: #6666fa !important;
			border: 1px solid #6666fa !important;
		}
		/*报错位置*/
		.el-form-item__error {
			width: 100% !important;
			height: 50px;
			line-height: 25px;
			color: #fd3030 !important;
			text-align: right !important;
			right: 0 !important;
			box-sizing: border-box;
			padding-right: 6px;
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
		.el-input__inner::-webkit-input-placeholder {
			color: #fff;
		}
		.el-form-item {
			margin-bottom: 0 !important;
		}
	}
	/*邮箱验证码子*/

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
	/*欢迎内容*/

	.hello-content {
		width: 100%;
		height: 545px;
		position: relative;
		display: none;
		.select-all {
			width: 100%;
			height: 40px;
			font-size: 14px;
			line-height: 40px;
			margin: 5px 0;
			margin-top: 10px;
			color: #fff;
		}
		/*邀请码错误*/
		.invited_error {
			position: absolute;
			bottom: -35px;
			right: 10px;
			z-index: 888;
			color: #c70101;
		}
		/*验证码输入错误*/
		.code_error {
			position: absolute;
			top: 290px;
			right: 10px;
			z-index: 888;
			color: #c70101;
		}
	}
	/*我同意+注册按钮部分*/

	.ok {
		margin-top: 10px;
		.el-checkbox__label {
			color: #fff;
		}
		.is-checked .el-checkbox__inner {
			background: #949bf8;
			border: 1px solid #949bf8;
		}
		.el-checkbox__input.is-checked+.el-checkbox__label {
			color: #949bf8;
		}
		.tiao {
			color: #949bf8;
		}
		.wan-ji {
			margin-left: 20px;
			color: #949bf8;
		}
	}
	/*欢迎注册头部*/

	.hello-title {
		width: 100%;
		height: 55px;
		line-height: 55px;
		color: #fff;
		.hello-title-left {
			float: left;
			font-size: 30px;
			font-weight: 500;
		}
		.hello-title-right {
			float: right;
			font-size: 16px;
			cursor: pointer;
			p {
				float: left;
				span {
					display: inline-block;
					font-size: 12px;
					margin: 0 12px;
					color: #fff !important;
				}
			}
		}
	}
	/*选中颜色值*/

	.hello-active {
		color: #949bf8;
	}
	/*整体背景*/

	#register {
		width: 100%;
		height: 100%;
		background: url(../../../static/img/bi2.png);
		background-size: 100% 100%;
		box-sizing: border-box;
		padding-top: 20px;
	}
	/*整体内容部分*/

	.register-container {
		width: 900px;
		height: 720px;
		position: relative;
		margin: 0 auto;
		/*警告框*/
		.Notice_Box {
			position: absolute;
			top: 250px;
			left: 350px;
			z-index: 888;
			padding: 0 30px;
			height: 40px;
			background: #2c377c;
			border-radius: 4px;
			color: #fff;
			font-size: 15px;
			text-align: center;
			line-height: 40px;
		}
	}
	/*注册部分*/

	.hello_zuce {
		width: 435px;
		height: 680px;
		/*border: 1px solid #fff;*/
		float: left;
	}
	/*警告部分*/

	.notice {
		width: 330px;
		height: 400px;
		float: right;
		font-size: 14px;
		color: #949bf8;
		margin-top: 90px;
		p {
			margin-top: 37px;
		}
		p:nth-of-type(1) {
			margin-top: 0;
		}
	}
</style>
