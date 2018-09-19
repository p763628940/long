<template>
	<div id="register">
		<!--注册头部-->
		<div class="header_box">
			<div class="register_header">
				<p class="back" @click="$router.go(-1)">
					<i class="iconfont icon-zuojiantou"></i>
				</p>
				<p class="register_type">
					{{register_type}}
				</p>
			</div>
		</div>
		<div class="oHeight"></div>
		<!--提示错误-->
		<div class="tiShiError" v-show="phoneError">
			{{tiShiText}}
		</div>
		<!--手机注册-->
		<div class="phone_register" v-show="phoneBoxShow">
			<!--第一步----选择国籍输入手机号码---->
			<div class="phone_register_one">
				<!--国籍选择-->
				<div class="tab_Country">
					<p class="text">{{$t("login.Country")}}:</p>
					<p class="tab_Country_title" @click="CountryIsShow=!CountryIsShow">
						<span>{{country}}</span>
						<i class="iconfont icon-zelvxuanzefeiyongdaosanjiaoxingfandui" :class="{'iconRote':CountryIsShow}"></i>
					</p>
					<ul class="tab_Country_list" v-show="CountryIsShow">
						<li v-for="item in countryList" @click="tabCountry(item.id,item.mobile_prefix,item.name)">{{item.name}}</li>
					</ul>
					<span class="email" @click="tabEmail()">{{$t("login.RegisteredEmail")}} {{$t("login.Register")}}</span>
				</div>
				<!--输入手机号-->
				<div class="phone_input">
					<p class="icon">
						<i class="iconfont icon-ren1"></i>
					</p>
					<!--输入框-->
					<div class="oInput">
						<div class="content">
							<span>+{{mobile_prefix}}</span>
							<input type="text" v-model="phone" :placeholder="$t('login.PhoneNum')" />
						</div>
					</div>
				</div>
				<!--下一步按钮-->
				<!--国家注册后不可修改-->
				<!--<div class="tiShi">
					<span class="guo_jia">国家或地区注册后不能修改</span>
				</div>-->
			</div>
			<!--第二步-=--发送验证码--->
			<div class="phone_register_two">
				<!--已经发送验证码请注意查收-->
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
						<span v-show="authTimePhone">{{auth_time}}{{$t("login.secresend")}}</span>
						<button class="again" :disabled="!phone" @click="againPhone()" v-show="againOne">{{$t("login.GetCode")}}</button>
					</div>
				</div>
			</div>
			<!--第三步---设置密码-->
			<div class="phone_register_three">
				<div class="content">
					<!--密码-->
					<div class="userPassword">
						<i class="iconfont icon-suo"></i>
						<!--文本框部分-->
						<div class="oInput">
							<input type="password" v-model="phonePass" :placeholder="$t('login.PleasePassword')" />
						</div>
					</div>
					<!--再次密码-->
					<div class="userPassword">
						<i class="iconfont icon-suo"></i>
						<!--文本框部分-->
						<div class="oInput">
							<input type="password" v-model="phoneConPass" :placeholder="$t('userCenter.confirmpassword')" />
						</div>
					</div>
					<!--邀请码-->
					<div class="userPassword">
						<i class="iconfont icon-yaoqingma"></i>
						<!--文本框部分-->
						<div class="oInput">
							<input type="text" v-model="phoneYaoCode" :disabled="$route.query.invite_code!=undefined" :placeholder="$t('login.InvitationCode')" />
						</div>
					</div>
					<!--密码要求-->
					<div class="password_yao">{{password_yao}}</div>
					<!--完成按钮-->
					<div class="back_submit">
						<button @click="phoneSubmit()" :disabled="!phone || !phone_code || !phonePass || !phoneConPass">{{$t("login.Submit")}}</button>
					</div>
					<div class="login">
						<p @click="toLogin">{{$t("login.Already")}}</p>
					</div>
				</div>
			</div>
		</div>
		<!--邮箱注册-->
		<div class="email_register" v-show="emailBoxShow">
			<!--第一步----选择国籍输入手机号码---->
			<div class="phone_register_one">
				<!--国籍选择-->
				<div class="tab_Country">
					<p class="text">{{$t("login.Country")}}</p>
					<p class="tab_Country_title" @click="CountryIsShow=!CountryIsShow">
						<span>{{country}}</span>
						<i class="iconfont icon-zelvxuanzefeiyongdaosanjiaoxingfandui" :class="{'iconRote':CountryIsShow}"></i>
					</p>
					<ul class="tab_Country_list" v-show="CountryIsShow">
						<li v-for="item in countryList" @click="tabCountry(item.id,item.mobile_prefix,item.name)">{{item.name}}</li>
					</ul>
					<span class="phone" @click="tabPhone">{{$t("login.Phone")}}</span>
				</div>
				<!--输入手机号-->
				<div class="phone_input">
					<p class="icon">
						<i class="iconfont icon-ren1"></i>
					</p>
					<!--输入框-->
					<p class="oInput1">
						<input type="text" v-model="email" :placeholder="$t('login.EmailAddress')" />
					</p>
				</div>
				<!--下一步按钮-->
				<!--国家注册后不可修改-->
				<!--<div class="tiShi">
					<span class="guo_jia">国家或地区注册后不能修改</span>
				</div>-->
			</div>
			<!--第二步-=--发送验证码--->
			<div class="phone_register_two">
				<!--已经发送验证码请注意查收-->
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
						<span v-show="authTimeEmail">{{auth_time1}}{{$t("login.secresend")}}</span>
						<button class="again" :disabled="!email" @click="againEmail()" v-show="againOne1">{{$t("login.GetCode")}}</button>
					</div>
				</div>
			</div>
			<!--第三步---设置密码-->
			<div class="phone_register_three">
				<div class="content">
					<!--密码-->
					<div class="userPassword">
						<i class="iconfont icon-suo"></i>
						<!--文本框部分-->
						<div class="oInput">
							<input type="password" v-model="emailPass" :placeholder="$t('login.PleasePassword')" />
						</div>
					</div>
					<!--再次密码-->
					<div class="userPassword">
						<i class="iconfont icon-suo"></i>
						<!--文本框部分-->
						<div class="oInput">
							<input type="password" v-model="emailConPass" :placeholder="$t('login.PleaseEnterPassword')" />
						</div>
					</div>
					<!--邀请码-->
					<div class="userPassword">
						<i class="iconfont icon-yaoqingma"></i>
						<!--文本框部分-->
						<div class="oInput">
							<input type="text" v-model="emailYaoCode" :placeholder="$t('login.InvitationCode')" />
						</div>
					</div>
					<!--密码要求-->
					<div class="password_yao">{{password_yao}}</div>
					<!--完成按钮-->
					<div class="back_submit">
						<button @click="emailSubmit()" :disabled="!email || !email_code || !emailPass || !emailConPass">{{$t("login.Submit")}}</button>
					</div>
					<div class="login">
						<p @click="toLogin">{{$t("login.Already")}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from "jquery";
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				countryList: [],
				phoneBoxShow: true,
				/*手机注册*/
				emailBoxShow: false,
				/*邮箱注册*/
				/*获取国家列表*/
				country: this.$t("login.China"),
				/*默认中国*/
				countryID: 1,
				/*默认中国ID*/
				mobile_prefix: "86",
				/*默认中国手机号前缀*/
				register_type: "",
				CountryIsShow: false,
				/*显示隐藏国家列表*/
				password_yao: "",
				/*提示*/
				phone: "",
				/*手机号码*/
				phone_code: "",
				/*手机验证码*/
				phonePass: "",
				/*手机注册密码*/
				phoneConPass: "",
				/*手机注册确认密码*/
				phoneYaoCode: "",
				/*手机注册邀请码*/
				tiShiText: "",
				/*提示错误文本*/
				phoneError: false,
				/*手机号码输入错误*/
				auth_time: 0,
				/*倒计时*/
				againOne: true,
				/*重新发送*/
				authTimePhone: false,
				/*秒数*/
				/**********邮箱内容**********/
				email: "",
				/*邮箱*/
				email_code: "",
				/*邮箱验证码*/
				emailPass: "",
				/*邮箱密码*/
				emailConPass: "",
				/*邮箱确认密码*/
				emailYaoCode: "",
				/*邮箱邀请码*/
				auth_time1: 0,
				/*邮箱倒计时*/
				againOne1: true,
				/*重新发送*/
				authTimeEmail: false,
				/*秒数*/
				// lang: window.localStorage.getItem("lang"),
				/*获取当前选择语言*/
				isCandy: window.localStorage.getItem("isCandy"), //判断是否从微信进入注册账号
				isConsensus: window.localStorage.getItem("isConsensus") //判断是否从拉票页面进入
			}
		},
		computed:{
			...mapState('user',['lang']),
			...mapGetters('setting', ['urlPrefix']),
		},
		methods: {
			toLogin() {
				if(this.isCandy) { //判断用户是否空投分享邀请注册
					this.$router.push({
						path: "/login",
						query: {
							InvitationCode: "001002",
							CandyId: this.$route.query.CandyId
						} /*传值糖果id*/
					});
				} else if(this.isConsensus) {
					this.$router.push({
						path: "/login",
						query: {
							currEid: this.$route.query.currEid
						} /*传值糖果id*/
					});
				} else {
					this.$router.push({
						path: "/login"
					});
				}
			},
			/*邮箱提交*/
			emailSubmit() {
				var that = this;
				/*判断用户密码是否在8-20位数字组成、字母或者符号、至少两种*/
				if(!/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/.test(this.emailPass)) {
					if(this.lang === "zh") {
						this.password_yao = that.$t("login.PasswordNeed");
					} else if(this.lang === "en") {
						this.password_yao = "Password Need 8-20 Digit Combining Numbers、Letters Or Symbols";
					} else {
						this.password_yao = that.$t("login.PasswordNeed");
					}
					$(".password_yao").addClass("tiShi_active");
					setTimeout(() => {
						if(this.lang === "zh") {
							this.password_yao = that.$t("login.PasswordNeed");
						} else if(this.lang === "en") {
							this.password_yao = "Password Need 8-20 Digit Combining Numbers、Letters Or Symbols";
						} else {
							this.password_yao = that.$t("login.PasswordNeed");
						}
						$(".password_yao").removeClass("tiShi_active");
					}, 1000)
					return false;
				}
				if(this.emailPass.length < 8) {
					if(this.lang === "zh") {
						this.password_yao = that.$t("login.PasswordNeed");
					} else if(this.lang === "en") {
						this.password_yao = "Password Need 8-20 Digit Combining Numbers、Letters Or Symbols";
					} else {
						this.password_yao = that.$t("login.PasswordNeed");
					}
					$(".password_yao").addClass("tiShi_active");
					setTimeout(() => {
						if(this.lang === "zh") {
							this.password_yao = that.$t("login.PasswordNeed");
						} else if(this.lang === "en") {
							this.password_yao = "Password Need 8-20 Digit Combining Numbers、Letters Or Symbols";
						} else {
							this.password_yao = that.$t("login.PasswordNeed");
						}
						$(".password_yao").removeClass("tiShi_active");
					}, 1000)
					return false;
				}

				/*判断密码输入是否不正确*/
				if(this.emailPass != this.emailConPass) {
					if(this.lang === "zh") {
						this.password_yao = that.$t("login.Passwordsdiffer");
					} else if(this.lang === "en") {
						this.password_yao = "Inconsistency of password input";
					} else {
						this.password_yao = that.$t("login.Passwordsdiffer");
					}
					$(".password_yao").addClass("tiShi_active");
					setTimeout(() => {
						if(this.lang === "zh") {
							this.password_yao = that.$t("login.PasswordNeed");
						} else if(this.lang === "en") {
							this.password_yao = "Password Need 8-20 Digit Combining Numbers、Letters Or Symbols";
						} else {
							this.password_yao = that.$t("login.PasswordNeed");
						}
						$(".password_yao").removeClass("tiShi_active");
					}, 1000)
					return false;
				}
				if(that.email.length < 10) {
					return false;
				}
				let isSource;
				if(this.isCandy) {
					isSource = "candy"
				} else {
					isSource = ""
				}
				if(this.isConsensus){
					isSource = "consensus"
				} else {
					isSource = ""
				}
				/*请求*/
				this.$ajax.post(this.httpUrl.register, {
					type: "email",
					email: that.email,
					country_id: that.countryID,
					code: that.email_code,
					password: that.emailPass,
					password_confirmation: that.emailConPass,
					invite_code: that.emailYaoCode,
					source: isSource,
					prefix : this.urlPrefix,
				}).then(function(res) {
					if(res.data.status.code == 200) {
						if(that.isCandy) { //判断用户是否空投分享邀请注册
							that.$router.push({
								path: "/login",
								query: {
									InvitationCode: "001002",
									CandyId: that.$route.query.CandyId
								} /*传值糖果id*/
							});
						} else {
							that.$router.push("/login");
						}
					} else if(that.isConsensus) {
						that.$router.push({
							path: "/login",
							query: {
								currEid: this.$route.query.currEid
							} /*传值糖果id*/
						});
					}
					if(res.data.status.code == 101) { /*邀请码错误*/
						if(that.lang === "zh") {
							that.password_yao = that.$t("login.IncorrectInvicode");
						} else if(that.lang === "en") {
							that.password_yao = "Inviting code error";
						} else {
							that.password_yao = that.$t("login.IncorrectInvicode");
						}

						$(".password_yao").addClass("tiShi_active");
						setTimeout(() => {
							if(that.lang === "zh") {
								that.password_yao = that.$t("login.PasswordNeed");
							} else if(that.lang === "en") {
								that.password_yao = "Password Need 8-20 Digit Combining Numbers、Letters Or Symbols";
							} else {
								that.password_yao = that.$t("login.PasswordNeed");
							}
							$(".password_yao").removeClass("tiShi_active");
						}, 1000)
					}
					if(res.data.status.code == -1) { /*验证码错误*/
						that.tiShiText = that.$t("userCenter.Verification");
						that.phoneError = true;
						setTimeout(function() {
							that.phoneError = false;
							that.tiShiText = "";
						}, 1000)
					}
				}, function(err) {
					console.log(err)
				})
			},
			/*发送验证码邮箱*/
			againEmail() {
				var that = this;
				if(that.email.length < 10) {
					if(that.lang === "zh") {
						that.tiShiText = that.$t("login.EnterCorrectMailNum");
					} else if(that.lang === "en") {
						that.tiShiText = "Mailbox address error";
					} else {
						that.tiShiText = this.$t("login.EnterCorrectMailNum");
					}
					that.phoneError = true;
					setTimeout(function() {
						that.phoneError = false;
						that.tiShiText = "";
					}, 1000)
					return false;
				} else {
					///成功要执行的事情
					that.$ajax.post(that.httpUrl.send_validator_message, {
						type: 0, ///类型  注册
						receiver_type: "email", ///验证接收器   邮箱
						country_id: that.countryID, ////国家id
						email: that.email ////用户手机
					}).then(function(res) {
						if(res.data.status.code == 200) {
							that.auth_time1 = 60;
							that.authTimeEmail = true;
							that.againOne1 = false;
							var auth_timetimer = setInterval(() => {
								that.auth_time1--;
								if(that.auth_time1 <= 0) {
									clearInterval(auth_timetimer);
									that.authTimeEmail = false;
									that.againOne1 = true;
								}
							}, 1000);
						}
						if(res.data.status.code == -2) {
							if(that.lang === "zh") {
								that.tiShiText = that.$t("userCenter.Manyrequests");
							} else if(that.lang === "en") {
								that.tiShiText = "Frequent operation";
							} else {
								that.tiShiText = that.$t("userCenter.Manyrequests");
							}
							that.phoneError = true;
							setTimeout(function() {
								that.phoneError = false;
								that.tiShiText = "";
							}, 1000)
						}
					}, function(err) {
						if(err) {
							if(that.lang === "zh") {
								that.tiShiText = that.$t("login.Haveregistered");
							} else if(that.lang === "en") {
								that.tiShiText = "Mailbox address has been occupied";
							} else {
								that.tiShiText = that.$t("login.Haveregistered");
							}

							that.phoneError = true;
							setTimeout(function() {
								that.phoneError = false;
								that.tiShiText = "";
							}, 1000)
						}
					})
				}

			},
			/*切换邮箱*/
			tabEmail() {
				if(this.lang === "zh") {
					this.register_type = this.$t("login.Emailregist"); /*邮箱注册*/
				} else if(this.lang === "en") {
					this.register_type = "Registered By Email";
				} else {
					this.register_type = this.$t("login.Emailregist"); /*邮箱注册*/
				}

				this.phoneBoxShow = false;
				this.emailBoxShow = true;
			},
			/*切换手机号*/
			tabPhone() {
				if(this.lang === "zh") {
					this.register_type = this.$t("login.Phone"); /*手机注册*/
				} else if(this.lang === "en") {
					this.register_type = "Registered By Phone";
				} else {
					this.register_type = this.$t("login.Phone"); /*手机注册*/
				}

				this.phoneBoxShow = true;
				this.emailBoxShow = false;
			},
			/*选择国家ID*/
			tabCountry(id, mobile_prefix, name) {
				this.countryID = id; /*国家id*/
				this.mobile_prefix = mobile_prefix; /*国家手机号前缀*/
				this.CountryIsShow = false;
				this.country = name;
			},

			/*重新发送验证码*/
			againPhone() {
				var that = this;
				///成功要执行的事情
				that.$ajax.post(that.httpUrl.send_validator_message, {
					type: 0, ///类型  注册
					receiver_type: "mobile", ///验证接收器   邮箱
					country_id: that.countryID, ////国家id
					mobile: that.phone ////用户手机
				}).then(function(res) {
					if(res.data.status.code == 200) {
						that.auth_time = 60;
						that.authTimePhone = true;
						that.againOne = false;
						var auth_timetimer = setInterval(() => {
							that.auth_time--;
							if(that.auth_time <= 0) {
								clearInterval(auth_timetimer);
								that.authTimePhone = false;
								that.againOne = true;
							}
						}, 1000);
					}
					if(res.data.status.code == -2) {
						if(that.lang === "zh") {
							that.tiShiText = that.$t("userCenter.Manyrequests");
						} else if(that.lang === "en") {
							that.tiShiText = "Frequent operation";
						} else {
							that.tiShiText = that.$t("userCenter.Manyrequests");
						}
						that.phoneError = true;
						setTimeout(function() {
							that.phoneError = false;
							that.tiShiText = "";
						}, 1000)
					}
				}, function(err) {
					if(err) {
            that.tiShiText =that.$t("login.PhoneNumOccupied");
						that.phoneError = true;
						setTimeout(function() {
							that.phoneError = false;
							that.tiShiText = "";
						}, 1000)
					}
				})

			},
			/*手机注册提交*/
			phoneSubmit() {
				var that = this;
				/*判断用户密码是否在8-20位数字组成、字母或者符号、至少两种*/
				if(!/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/.test(this.phonePass)) {
					if(this.lang === "zh") {
						this.password_yao = that.$t("login.PasswordNeed");
					} else if(this.lang === "en") {
						this.password_yao = "Password Need 8-20 Digit Combining Numbers、Letters Or Symbols";
					} else {
						this.password_yao = that.$t("login.PasswordNeed");
					}
					$(".password_yao").addClass("tiShi_active");
					setTimeout(() => {
						if(this.lang === "zh") {
							this.password_yao = that.$t("login.PasswordNeed");
						} else if(this.lang === "en") {
							this.password_yao = "Password Need 8-20 Digit Combining Numbers、Letters Or Symbols";
						} else {
							this.password_yao = that.$t("login.PasswordNeed");
						}
						$(".password_yao").removeClass("tiShi_active");
					}, 1000)
					return false;
				}
				if(this.phonePass.length < 8) {
					if(this.lang === "zh") {
						this.password_yao = that.$t("login.PasswordNeed");
					} else if(this.lang === "en") {
						this.password_yao = "Password Need 8-20 Digit Combining Numbers、Letters Or Symbols";
					} else {
						this.password_yao = that.$t("login.PasswordNeed");
					}
					$(".password_yao").addClass("tiShi_active");
					setTimeout(() => {
						if(this.lang === "zh") {
							this.password_yao = that.$t("login.PasswordNeed");
						} else if(this.lang === "en") {
							this.password_yao = "Password Need 8-20 Digit Combining Numbers、Letters Or Symbols";
						} else {
							this.password_yao = that.$t("login.PasswordNeed");
						}
						$(".password_yao").removeClass("tiShi_active");
					}, 1000)
					return false;
				}
				/*确认密码*/
				if(this.phoneConPass == "") {
					if(this.lang === "zh") {
						this.password_yao = that.$t("login.PleaseEnterPassword");
					} else if(this.lang === "en") {
						this.password_yao = "Please confirm the password";
					} else {
						this.password_yao = that.$t("login.PleaseEnterPassword");
					}
					$(".password_yao").addClass("tiShi_active");
					setTimeout(() => {
						if(this.lang === "zh") {
							this.password_yao = "密码需要由8-20位数字组成、字母或者符号组成、至少两种";
						} else if(this.lang === "en") {
							this.password_yao = "Password Need 8-20 Digit Combining Numbers、Letters Or Symbols";
						} else {
							this.password_yao = "Password Need 8-20 Digit Combining Numbers、Letters Or Symbols";
						}
						$(".password_yao").removeClass("tiShi_active");
					}, 1000)
					return false;
				}
				/*判断密码输入是否不正确*/
				if(this.phoneConPass != this.phonePass) {
					if(this.lang === "zh") {
						this.password_yao = that.$t("login.Passwordsdiffer");
					} else if(this.lang === "en") {
						this.password_yao = "Inconsistency of password input";
					} else {
						this.password_yao = that.$t("login.Passwordsdiffer");
					}
					$(".password_yao").addClass("tiShi_active");
					setTimeout(() => {
						if(this.lang === "zh") {
							this.password_yao = that.$t("login.PasswordNeed");
						} else if(this.lang === "en") {
							this.password_yao = "Password Need 8-20 Digit Combining Numbers、Letters Or Symbols";
						} else {
							this.password_yao = that.$t("login.PasswordNeed");
						}
						$(".password_yao").removeClass("tiShi_active");
					}, 1000)
					return false;
				}
				let isSource;
				if(this.isCandy) {
					isSource = "candy"
				} else {
					isSource = ""
				}
				if(this.isConsensus){
					isSource = "consensus"
				} else {
					isSource = ""
				}
				/*请求*/
				that.$ajax.post(that.httpUrl.register, {
					type: "mobile",
					mobile: that.phone,
					country_id: that.countryID,
					code: that.phone_code,
					password: that.phonePass,
					password_confirmation: that.phoneConPass,
					invite_code: that.phoneYaoCode,
					source: isSource,
					prefix: this.urlPrefix,
				}).then(function(res) {
					if(res.data.status.code == 200) {
						if(that.isCandy) { //判断用户是否空投分享邀请注册
							that.$router.push({
								path: "/login",
								query: {
									InvitationCode: "001002",
									CandyId: that.$route.query.CandyId
								} /*传值糖果id*/
							});
						} else {
							that.$router.push("/login");
						}
					} else if(that.isConsensus) {
						that.$router.push({
							path: "/login",
							query: {
								currEid: this.$route.query.currEid
							} /*传值糖果id*/
						});
					}
					if(res.data.status.code == -1) { /*验证码错误*/
						if(that.lang === "zh") {
							that.tiShiText = that.$t("userCenter.Verification");
						} else if(that.lang === "en") {
							that.tiShiText = "Verification code error";
						} else {
							that.tiShiText = that.$t("userCenter.Verification");
						}
						that.phoneError = true;
						setTimeout(function() {
							that.phoneError = false;
							that.tiShiText = "";
						}, 1000)
					}
				}, function(err) {
					console.log(err)
				})
			}
		},
		mounted() {
			let _this = this;
			/*获取国家列表*/
			this.$ajax.get(this.httpUrl.country,{
			  params:{lang:this.lang}
      }).then(function(res) {
				_this.countryList = res.data.data;
			}, function(err) {
				console.log(err)
			})
			///判断有无邀请码
			if(this.$route.query.invite_code != null || this.$route.query.invite_code != undefined) {
				this.phoneYaoCode = this.$route.query.invite_code;
				this.emailYaoCode = this.$route.query.invite_code;
			}
			////判断用户选择的语言
			if(this.lang === "zh") {
				this.password_yao = _this.$t("login.PasswordNeed");
				this.register_type = _this.$t("login.Phone");
			} else if(this.lang === "en") {
				this.password_yao = "Password Need 8-20 Digit Combining Numbers、Letters Or Symbols";
				this.register_type = "Registered By Phone";
			} else {
				this.password_yao = _this.$t("login.PasswordNeed");
				this.register_type = _this.$t("login.Phone");
			}

		}
	}
</script>

<style lang="scss" scoped>
	/*公共色值*/
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
	$icon_up:#3a46c1;
	/*国家图标*/

	$alert_bg:#474da0;
	/*弹出框的背景颜色*/

	$alet_border:1px solid #303678;
	/*弹出框的边框*/

	$alert_hover:#3f4494;
	/*鼠标滑过的颜色*/

	$tiShi:#ba291e;
	/*提示颜色*/

	$header_bg:#1a1c3e;
	.tiShi_active {
		color: $tiShi !important;
	}
	/*选择国家的按钮变化*/

	.iconRote {
		transform: rotate(-180deg);
		top: 0rem !important;
		transition: .3s all;
	}
	/*已有账号，去登录*/

	.login {
		width: 100%;
		height: .3rem;
		line-height: .3rem;
		p {
			color: #737eff;
		}
	}

	.oHeight {
		height: .8rem;
	}
	/*手机注册---第三步---*/

	.phone_register_three {
		.content {
			width: 2.7rem;
			margin: 0 auto;
			.userPassword {
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
	}
	/*提示错误*/
	/*提示的弹框tiShiError*/

	.tiShiError {
		text-align: center;
		padding: .1rem;
		line-height: .2rem;
		position: fixed;
		left: 10%;
		top: 1.5rem;
		z-index: 66;
		background: #171a3b;
		box-shadow: 2px 2px 5px #000;
		color: #fff;
	}
	/*手机注册 ---第一步 */

	.phone_register_one {
		width: 100%;
		position: relative;
		/*选择国籍*/
		.tab_Country {
			width: 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			padding-left: .22rem;
			/*padding-top: .25rem;*/
			position: relative;
			.email,
			.phone {
				position: absolute;
				right: .25rem;
				color: $zhuce_color;
			}
			/*选择国籍文案*/
			.text {
				color: $zhuce_color;
			}
			/*头部显示内容*/
			.tab_Country_title {
				width: .65rem;
				height: .2rem;
				line-height: .2rem;
				display: flex;
				align-items: center;
				color: #fff;
				position: relative;
				span {
					font-size: .14rem;
					margin-right: .02rem;
					padding-left: .05rem;
				}
				.iconfont {
					font-size: .12rem;
					position: absolute;
					top: .03rem;
					right: .1rem;
					transition: .3s all;
					color: $icon_up;
				}
			}
			/*下拉框*/
			.tab_Country_list {
				position: absolute;
				top: .25rem;
				left: .75rem;
				background: $alert_bg;
				border-radius: .02rem;
				z-index: 656;
				li {
					padding: 0 .2rem;
					height: .3rem;
					text-align: center;
					line-height: .3rem;
					color: #fff;
					border-bottom: $alet_border;
				}
				li:hover {
					background: $alert_hover;
				}
			}
		}
		/*注册手机*/
		.phone_input {
			width: 2.7rem;
			height: .42rem;
			margin: 0 auto;
			margin-top: .1rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.icon {
				color: #fff;
				.iconfont {
					font-size: .2rem;
				}
			}
			.oInput1 {
				@extend .oInput;
				height: .41rem;
				input {
					width: 100% !important;
					height: .41rem !important;
				}
			}
			.oInput {
				width: 2.43rem;
				border-bottom: $input_borderColor;
				display: flex;
				align-items: flex-start;
				input {
					width: 85%;
					height: 60%;
					border: none;
					background: none;
					outline: none;
					color: #fff;
					box-sizing: border-box;
					padding-left: 0.1rem;
				}
				input::-webkit-input-placeholder {
					color: $placeholder_color;
				}
				.content {
					width: 100%;
					display: flex;
					align-items: center;
					input {
						height: .4rem;
					}
					span {
						display: inline-block;
						font-size: .14rem;
						color: #fff;
					}
				}
			}
		}
		/*提交按钮*/
		.back_submit {
			width: 2.7rem;
			margin: .2rem auto;
			height: .38rem;
			margin-top: .36rem;
			button {
				width: 100%;
				height: .38rem;
				border: $submit_borderColor;
				background: $submit_color;
				color: #fff;
				outline: none;
			}
		}
		/*提示*/
		.tiShi {
			width: 2.7rem;
			margin: .2rem auto;
			display: flex;
			justify-content: space-between;
			.guo_jia {
				color: $tiShi;
			}
			.email {
				color: $zhuce_color;
			}
		}
	}
	/*手机注册----第二步*/

	.phone_register_two {
		/*内容*/
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
			.back_submit {
				width: 2.7rem;
				margin: .2rem auto;
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
	}

	#register {
		width: 100%;
		height: 100%;
		background: linear-gradient(#1c1f42, #1e214c, #191c3b, #191a38, #1b1e41);
		/* 标准的语法 */
		.el-input {
			width: .9rem;
		}
		.el-input__inner {
			color: #fff;
			text-align: center;
			background: none;
			border: none;
		}
		.el-input__suffix {
			right: .15rem;
		}
	}
	/*注册头部*/
	/*头部固定*/

	.header_box {
		width: 100%;
		height: .5rem;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		background: none;
	}

	.register_header {
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		background: none;
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
