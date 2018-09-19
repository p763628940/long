<template>
	<div id="account" :class="{'account_white':getColor == 1}">
		<!--账号安全 > 基本信息-->
		<div class="ji-ben">
			<div class="title">
				<p>{{$t("userCenter.AccountSecurity")}} > {{$t("userCenter.BasicInformation")}}</p>
			</div>
			<ul class="ji-ben-list">
					<li class="ji-ben-item">
						<div class="box">
							<p class="zhang-hao">
								<span class="text">{{$t("userCenter.Account")}}</span>
							</p>
							<p class="hao-ma">
								<span>{{userList.name}}</span>
							</p>
						</div>
					</li>
					<li class="ji-ben-item">
						<div class="box">
							<p class="zhang-hao">
								<span class="text">{{$t("userCenter.Invitationcode")}}</span>
							</p>
							<p class="hao-ma">
								<span>{{userList.user_id}}</span>
							</p>
						</div>
					</li>
					<li class="ji-ben-item">
						<div class="box">
							<p class="zhang-hao">
								<span class="text">{{$t("userCenter.Password")}}</span>
							</p>
							<p class="hao-ma1">
								<span>********</span>
							</p>
							<p class="set-text" @click="passShow = !passShow">
								<span>{{$t("userCenter.Modify")}}</span>
							</p>
						</div>
						<!--修改密码内容部分start-->
						<ol class="xiu-gai" v-show="passShow">
							<div class="xiu-gai-content">
								<!--原密码-->
								<div class="new-pass">
									<div class="tan-tishi" :class="{'tishi_white':getColor==1}" v-show="tishiShow">{{tishi}}</div>
									<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
										<div class="ma-zi-title">{{$t("userCenter.oldpassword")}}</div>
										<el-form-item prop="primaryPass">
											<el-input type="password" v-model="ruleForm2.primaryPass" auto-complete="off" maxlength="20" @keyup.native="ruleForm2.primaryPass=ruleForm2.primaryPass.replace(/\ /gi,'')"></el-input>
										</el-form-item>
										<div class="ma-zi-title">{{$t("userCenter.Password")}}</div>
										<el-form-item prop="pass">
											<el-input type="password" v-model="ruleForm2.pass" @keyup.native="ruleForm2.pass=ruleForm2.pass.replace(/\ /gi,'')" auto-complete="off" maxlength="20"></el-input>
										</el-form-item>
										<div class="ma-zi-title">{{$t("userCenter.confirmpassword")}}</div>
										<el-form-item prop="checkPass">
											<el-input type="password" v-model="ruleForm2.checkPass" @keyup.native="ruleForm2.checkPass=ruleForm2.checkPass.replace(/\ /gi,'')" maxlength="20" auto-complete="off"></el-input>
										</el-form-item>
										<el-form-item>
											<el-button type="primary" :disabled="!ruleForm2.pass || !ruleForm2.checkPass || !ruleForm2.primaryPass" @click="submitForm()">{{$t("login.Submit1")}}</el-button>
										</el-form-item>
									</el-form>

								</div>
								<!--右侧提示部分-->
								<div class="confirm">
									<p>
										<i class="iconfont icon-gantanhao"></i>{{$t("userCenter.Afteryouchange")}}
									</p>
								</div>
							</div>
						</ol>
						<!--修改密码内容部分end-->
					</li>
			</ul>

		</div>
		<!--账号安全 > 安全设置-->
		<div class="an-quan">
			<div class="title">
				<p>{{$t("userCenter.SecuritySettings")}} > {{$t("userCenter.SecurityLevel")}}</p>
			</div>
			<!--安全设置-->
			<div class="anquan-list">
					<!--安全等级----进度条-->
					<div class="progress-bar">
						<span class="gao_liang">{{$t("userCenter.SecurityLevel")}}</span>
						<!--进度-->
						<ol class="color_pro">
							<li class="red"></li>
							<li class="orange"></li>
							<li class="green"></li>
						</ol>
						<span class="di red" v-show="userList.email_status==2&&userList.google_status==0&&userList.mobile_status==0&&userList.pay_password_status==false|| userList.google_status==2&&userList.pay_password_status==false&&userList.mobile_status==0&&userList.email_status==0 || userList.mobile_status==2&&userList.google_status==2&&userList.pay_password_status==false&&userList.email_status==0 || userList.pay_password_status==true&&userList.google_status==2&&userList.mobile_status==0&&userList.email_status==0">{{$t("userCenter.Low")}}</span>
						<span class="di orange" v-show="userList.email_status==0 || userList.google_status==0 || userList.mobile_status==0 || userList.pay_password_status==false">{{$t("userCenter.In")}}</span>
						<span class="di green" v-show="userList.email_status==2&&userList.google_status==2&&userList.mobile_status==2&&userList.pay_password_status==true">{{$t("userCenter.High")}}</span>
						<!--建议-->
						<div class="jian-yi">
							{{$t("userCenter.Pleaseusetwo")}}
						</div>
					</div>
					<ul class="anquan-email">
						<!--邮箱-->
						<div class="box">
							<li class="anquan-email-title">
								<p class="oleft">
									<i class="iconfont icon-gantanhao red" v-show="userList.email_status==0"></i>
									<i class="iconfont icon-duihao2 green" v-show="userList.email_status==2"></i>
									<span class="text">{{$t("userCenter.Email")}}</span>
								</p>
								<p class="oCenter">
									<span v-show="!EmailShow">
									{{$t("userCenter.Loginwithdraw")}}
								</span>
								</p>
								<!--添加验证-->
								<p class="binding" @click="EmailShow=!EmailShow">
									<!--<el-switch v-model="verificationISemail" :active-text="$t('userCenter.use')" :inactive-text="$t('userCenter.Donotuse')" @change="bindingShow(value4)">
						            </el-switch>-->
									<span v-show="userList.email_status==0">{{$t("userCenter.Binding")}}</span>
								</p>
							</li>
							<!--注册邮箱部分-->
							<div class="register-mail" v-show="EmailShow">
								<div class="register-mail-content">
									<div class="oLeft">
										<div class="code_error" :class="{'money_text_white':getColor==1}" v-show="emailError">{{$t("userCenter.Verification")}}</div>
										<div class="text">{{$t("userCenter.Email")}}：</div>
										<el-form :model="dynamicValidateForm" :rules="rules2" ref="dynamicValidateForm">
											<el-form-item prop="email" :rules="[
								     	 { required: true, message: $t('login.PleaseEmailAddr'), trigger: 'blur' },
								   		]" class="email_box">
												<el-input v-model="dynamicValidateForm.email"></el-input>
												<div class="tishi_email" v-show="emailNum_error">{{emailErrorTishi}}</div>
											</el-form-item>
											<div class="text">{{$t("login.Mailboxverificationcode")}}：</div>
											<el-form-item id="you-yan">
												<el-input v-model="dynamicValidateForm.code" @keyup.native="dynamicValidateForm.code=dynamicValidateForm.code.replace(/\D/gi,'')"></el-input>
												<el-button id="getYan" :disabled="!sendAuthCode" @click="getEmailCode">
													<span v-show="sendEmailCode" class="auth_text auth_text_blue">{{$t("login.GetCode")}}</span>
													<span v-show="!sendEmailCode" class="auth_text"> <span class="auth_text_blue">{{auth_time1}} </span> {{$t("login.secresend")}}</span>
												</el-button>
											</el-form-item>
											<el-form-item>
												<el-button type="primary" @click="bindingEmail()" :disabled="!dynamicValidateForm.email || !dynamicValidateForm.code">{{$t("userCenter.Binding")}}</el-button>
											</el-form-item>
										</el-form>
									</div>
									<div class="oRight">
										<p>
											<i class="iconfont icon-gantanhao"></i> {{$t("userCenter.UnableTo")}}
										</p>
									</div>
								</div>
							</div>

						</div>
						<div style="clear: both;"></div>
						<!--手机-->
						<div class="box">
							<li class="anquan-email-title">
								<p class="oleft">
									<i class="iconfont icon-gantanhao red" v-show="userList.mobile_status==0"></i>
									<i class="iconfont icon-duihao2 green" v-show="userList.mobile_status==2"></i>
									<span class="text">{{$t("userCenter.Phone")}}</span>
								</p>
								<p class="oCenter center">
									<span v-show="!phoneShow">
									{{$t("userCenter.Phoneisused")}}
								</span>
								</p>
								<p class="binding" @click="xiuGai">
									<!--<el-switch v-model="verificationISmobile" :active-text="$t('userCenter.use')" :inactive-text="$t('userCenter.Donotuse')" @change="bindingShow(value4)">
						            </el-switch>-->
									<span v-show="userList.mobile_status==0">{{$t("userCenter.Binding")}}</span>
									<span v-show="userList.mobile_status==2">{{$t("userCenter.Modify")}}</span>
								</p>
							</li>
							<div class="bindingPhone" v-show="phoneShow">
								<div class="bindingCenter">
									<div class="oleft">
										<p class="confirm" v-show="PhoneCodeError" :class="{'confirm_white':getColor ==1 }">
											<i class="iconfont icon-gantanhao"></i> {{PhoneCodeErrorText}}
										</p>
										<p class="confirm1" v-show="codeSuccess" :class="{'confirm_white':getColor ==1 }">
											<i class="iconfont icon-duihao2"></i> {{$t("userCenter.sentVerification")}}
										</p>
										<el-form>
											<!--手机号码-->
											<div class="text">{{$t("login.PhoneNum")}}：</div>
											<el-form-item :model="dynamicValidateForm1" id="phone" prop="mobile" class="email_box">
												<el-select v-model="value" placeholder="0086" id="phone-title" @change="change(value)">
													<el-option v-for="item in cities" :key="item.mobile_prefix" :label="item.mobile_prefix" :value="item.id"   id="option">
													</el-option>
												</el-select>
												<el-input v-model.number="dynamicValidateForm1.mobile">
												</el-input>
												<div class="tishi_email" v-show="phoneNum_error">{{phoneNum_errorText}}</div>
											</el-form-item>
											<!--获取验证码-->
											<div class="text">{{$t("login.SMSverificationcode")}}:</div>
											<el-form-item id="you-yan">
												<el-input v-model="dynamicValidateForm1.code" @keyup.native="dynamicValidateForm1.code=dynamicValidateForm1.code.replace(/\D/gi,'')"></el-input>
												<el-button id="getma" :disabled="!sendPhoneCode1" @click="getPhoneCode1">
													<span v-show="sendPhoneCode1" class="auth_text auth_text_blue">{{$t("login.GetCode")}}</span>
													<span v-show="!sendPhoneCode1" class="auth_text"> <span class="auth_text_blue">{{phone_time2}} </span>{{$t("login.secresend")}}</span>
												</el-button>
											</el-form-item>
											<!--绑定-->
											<el-form-item>
												<el-button type="primary" @click="phone()" :disabled="!dynamicValidateForm1.mobile || !dynamicValidateForm1.code">
													<span v-show="userList.mobile_status==0">{{$t("userCenter.Binding")}}</span>
													<span v-show="userList.mobile_status==2">{{$t("userCenter.Modify")}}</span>
												</el-button>
											</el-form-item>
										</el-form>
									</div>
									<div class="oright">
										<p>
											<i class="iconfont icon-gantanhao"></i>
											{{$t("userCenter.Afteryouchange")}}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div style="clear: both;"></div>
						<!--谷歌-->
						<div class="box">
							<li class="anquan-google-title">
								<p class="oleft">
									<i class="iconfont icon-gantanhao red" v-show="userList.google_status==0"></i>
									<i class="iconfont icon-duihao2 green" v-show="userList.google_status==2"></i>
									<span class="text">{{$t("userCenter.GoogleVerifier")}}</span>
								</p>
								<p class="oCenter">
									<span v-show="!GoogleShow">
										{{$t("userCenter.Useforsecurity")}}
								</span>
								</p>
								<p class="binding" @click="createSecret()">
									<!--<el-switch v-model="verificationISgoogle" :active-text="$t('userCenter.use')" :inactive-text="$t('userCenter.Donotuse')" @change="bindingShow(value4)">
						            </el-switch>    	-->
									<span v-show="userList.google_status==0">{{$t("userCenter.Binding")}}</span>
									<span v-show="userList.google_status==2">{{$t("userCenter.Modify")}}</span>
								</p>
							</li>
							<div style="clear: both;"></div>
							<div class="bindingGoogle" v-show="GoogleShow">
								<div class="bindingGoogle-content">
									<!--左侧部分-->
									<div class="oleft">
										<!--谷歌二维码及密钥-->
										<p class="position" v-show="GoogleConfirm" :class="{'position_white':getColor==1}">{{$t("userCenter.ConfirCodeWrong")}} </p>
										<p class="bindingGoogle-content-title">{{$t("userCenter.GoogleQRcode")}}</p>
										<div class="google-QRcode">
											<img :src="getGoogle.ewmImg" />
											<span class="text">{{getGoogle.secretkey}}</span>
										</div>
										<div style="clear: both;"></div>
										<!--谷歌验证码-->
										<p class="bindingGoogle-content-title">{{$t("login.GoogleVerificationCode")}}</p>
										<el-form>
											<el-input v-model="getGoogle.code" @keyup.native="getGoogle.code=getGoogle.code.replace(/\D/gi,'')"></el-input>
											<el-button type="primary" @click="bindingGoogle()" :disabled="!getGoogle.code">
												<span v-show="userList.google_status==0">{{$t("userCenter.Binding")}}</span>
												<span v-show="userList.google_status==2">{{$t("userCenter.Modify")}}</span>
											</el-button>
										</el-form>

									</div>
									<!--右侧部分-->
									<div class="oright">
										<!--下载谷歌app-->
										<ul class="upDown">
											<li class="upDown-title">{{$t("userCenter.DownloadGoogle")}}</li>
											<li>{{$t("userCenter.IosAPPStore")}}</li>
											<li>{{$t("userCenter.AndrewsStore")}}</li>
										</ul>
										<!--点击链接部分-->
										<div class="upDownApp">
											<a target="view_window" href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8">
												<i class="iconfont icon-pingguo"></i> App store
											</a>
											<a target="view_window" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2">
												<i class="iconfont icon-google"></i> google play
											</a>
										</div>

									</div>
								</div>
								<div style="clear: both;"></div>
							</div>
						</div>
						<div style="clear: both;"></div>
						<!--资金-->
						<div class="box">
							<li class="anquan-money-title">
								<p class="oleft">
									<i class="iconfont icon-gantanhao red" v-show="userList.pay_password_status==false"></i>
									<i class="iconfont icon-duihao2 green" v-show="userList.pay_password_status"></i>
									<span class="text">{{$t("userCenter.Fundpassword")}}</span>
								</p>
								<p class="oCenter">
									<span v-show="!bindingMoneyShow">
									{{$t("userCenter.Whenaccount")}}
								</span>
								</p>
								<p class="binding" @click="bindingMoneyShow=!bindingMoneyShow">
									<span v-show="userList.pay_password_status==false">{{$t("userCenter.Binding")}}</span>
									<span v-show="userList.pay_password_status">{{$t("userCenter.Modify")}}</span>
								</p>
							</li>
							<div class="bindingMoney" v-show="bindingMoneyShow">
								<div class="bindingMoney-content">
									<div class="oleft">
										<div class="money-text" v-show="MoneyisShow" :class="{'money_text_white':getColor==1}">{{$t("userCenter.Sentto")}}{{MoneyText}},{{$t("userCenter.Pleasecheck")}}</div>
										<div class="money-text" :class="{'money_text_white':getColor==1}" v-show="moneyError">{{$t("userCenter.Verification")}}</div>
										<el-form :model="bindingMoney" :rules="formRules" ref="form">
											<div class="bindingMoney-title">{{$t("userCenter.Newfundpassword")}}</div>
											<el-form-item prop="pass1">
												<el-input type="password" v-model="bindingMoney.pass1" maxLength="20" @keyup.native="bindingMoney.pass1=bindingMoney.pass1.replace(/\ /gi,'')"></el-input>
											</el-form-item>
											<div class="bindingMoney-title">{{$t("userCenter.Confirmfundpassword")}}</div>
											<el-form-item prop="checkpass1">
												<el-input type="password" v-model="bindingMoney.checkpass1" @keyup.native="bindingMoney.checkpass1=bindingMoney.checkpass1.replace(/\ /gi,'')" maxLength="20"></el-input>
											</el-form-item>
											<div class="bindingMoney-title">{{$t("login.SMSverificationcode")}}</div>
											<el-form-item id="you-yan1">
												<el-input v-model="bindingMoney.code1" @keyup.native="bindingMoney.code1=bindingMoney.code1.replace(/\D/gi,'')" id="get"></el-input>
												<el-button id="getma1" :disabled="!sendMoneyCode1 || !bindingMoney.pass1 || !bindingMoney.checkpass1" @click="getMoneyCode()">
													<span v-if="sendMoneyCode1" class="auth_text auth_text_blue">{{$t("login.GetCode")}}</span>
													<span v-if="!sendMoneyCode1" class="auth_text" :class="{'white':getColor==1}"> <span class="auth_text_blue">{{money_time2}} </span>{{$t("login.secresend")}}</span>
												</el-button>
											</el-form-item>
											<el-button type="primary" @click="bindMoney('form')" :disabled="!bindingMoney.pass1 || !bindingMoney.checkpass1||!bindingMoney.code1">
												<span v-show="userList.pay_password_status==false">{{$t("userCenter.Binding")}}</span>
												<span v-show="userList.pay_password_status">{{$t("userCenter.Modify")}}</span>
											</el-button>
										</el-form>
									</div>
									<div class="oright">
										<p>
											<i class="iconfont icon-gantanhao"></i> {{$t("userCenter.Afteryouchange")}}
										</p>
									</div>
									<div style="clear: both;"></div>
								</div>

							</div>
						</div>
					</ul>
			</div>

		</div>
		<!--账号安全 > 登录历史-->
		<div class="deng-lu">
			<div class="title">
				<p>{{$t("userCenter.AccountSecurity")}} > {{$t("userCenter.Loginhistory")}}</p>
			</div>
			<!--登录-->
			<div class="deng-lu-box" :class="{'border_none':getColor==1}">
					<table>
						<tr class="dl-content-title">
							<td>{{$t("list.time")}}</td>
							<td>{{$t("userCenter.LoginMethod")}}</td>
							<td>IP</td>
							<td>{{$t("otc.Status")}}</td>
						</tr>
						<tr class="dl-content-content" v-for="item in loginHistoryList">
							<td>{{formatTime(item.created_at)}}</td>
							<td>
								<span v-show="item.login_type==2">WEB</span>
								<span v-show="item.login_type==3">Android</span>
							</td>
							<td>{{item.ip}}</td>
							<td><span v-show="item.status==0">{{$t("userCenter.Loginfailed")}}</span>
								<span v-show="item.status!=0">{{$t("userCenter.loginsuccessful")}}</span></td>
						</tr>
					</table>
			</div>
			<div class="pageCount">
				<div class="button">
					<el-pagination layout="prev, pager, next" background :page-size="topage" @current-change="pageChange" :total="total">
					</el-pagination>
				</div>
			</div>
		</div>
		<!--蒙版部分-->
		<div class="force" v-show="isShowUser">
			<div class="force-content">
				<div class="force-text">
					<!--实名认证头部-->
					<div class="force-title">
						<span>{{$t("userCenter.importanthint")}}</span>
						<i class="iconfont icon-cuowu" @click="$router.go(-1)"></i>
					</div>
					<!--告诉-->
					<div class="force-box">
						{{$t("userCenter.Foryourfinancial")}}
						<span class="renz" @click="clickGo">{{$t("userCenter.Nowgoto")}}</span>
					</div>
					<!--确认按钮和取消按钮-->
					<div class="confirm-cancel">
						<p @click="$router.go(-1)">{{$t("userCenter.Cancel")}}</p>
						<p @click="clickGo">{{$t("userCenter.determine")}}</p>
						<!--<router-link to="/index/userCenter/identity"  tag="p"></router-link>-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	///引入接口文件
	import { httpUrl } from "../../http_url/http_url.js";
	import { Message } from 'element-ui'; /*消息提示*/
	import axios from "axios";
	import {mapState} from "vuex";
	export default {
		data() {
			///新密码
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.$t("userCenter.Pleaseenterpassword")));
				} else if(value.replace(/\s/g, '') == '') {
					callback(new Error(this.$t("userCenter.PasswordNotSpace")));
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
			///确认密码
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.$t("login.PassWordAgin")));
				} else if(!/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/.test(this.ruleForm2.pass)) {
					callback(new Error(this.$t("userCenter.SetAasswordFirst")));
				} else if(value.replace(/\s/g, '') == '') {
					callback(new Error(this.$t("userCenter.PasswordNotSpace")));
				} else if(value !== this.ruleForm2.pass) {
					callback(new Error(this.$t("login.Passwordsdiffer")));
				} else {
					callback();
				}
			};
			///原密码
			var primaryPass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.$t("login.PleasePassword")));
				} else if(value.replace(/\s/g, '') == '') {
					callback(new Error(this.$t("userCenter.PasswordNotSpace")));
				} else {
					callback();
				}
			};
			///资金密码
			var moneyPass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.$t("login.PleasePassword")));
				} else if(value.replace(/\s/g, '') == '') {
					callback(new Error(this.$t("userCenter.FundsPasswordNotSpace")));
				} else if(value.length < 8 || value.length > 16) {
					callback(new Error(this.$t("login.PleasePassword")));
				} else if(!(/^[0-9a-zA-Z]+$/.test(value))) {
					callback(new Error(this.$t("userCenter.EnterLetterOrNUm")));
				} else {
					if(this.bindingMoney.checkpass1 !== '') {
						this.$refs.form.validateField('checkpass1');
					}
					callback();
				}
			};
			///资金二次密码
			var moneyPass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.$t("login.PassWordAgin")));
				} else if(value.replace(/\s/g, '') == '') {
					callback(new Error(this.$t("userCenter.FundsPasswordNotSpace")));
				} else if(value !== this.bindingMoney.pass1) {
					callback(new Error(this.$t("login.Passwordsdiffer")));
				} else {
					callback();
				}
			};

			return {
				isShowUser: false,
				/*提示用户绑定身份证*/
				//getToken: window.localStorage.getItem("token"),
				tishi: "",
				tishiShow: false,
				loginHistoryList: [],
				/*历史记录*/
				last_page: 0,
				/*总页数*/
				total: 0,
				/*总条数*/
				topage: 10,
				/*显示几条*/
				auth_time1: 0,
				/*邮箱倒计时*/
				phone_time2: 0,
				/*手机倒计时*/
				emailNum_error: false,
				/*邮箱错误*/
				phoneNum_error: false,
				phoneNum_errorText: "",
				/*手机错误*/
				/*邮箱获取验证码时间*/
				dynamicValidateForm: { /*邮箱验证码*/
					email: "",
					/*邮箱号*/
					code: "" /*验证码*/
				},
				EmailShow: false,
				/*判断用户有没有绑定邮箱*/
				sendEmailCode: true,
				/*获取邮箱验证码是否显示或者隐藏*/
				dynamicValidateForm1: { /*手机验证码*/
					mobile: "",
					/*手机号码*/
					code: ""
					/*验证码*/
				},
				money_time2: 0,
				/*资金倒计时*/
				PhoneCodeError: false,
				PhoneCodeErrorText: this.$t("login.Confirmationerror"),
				/*手机验证码输入错误*/
				emailErrorTishi: "",
				/*邮箱输入有误*/
				/*邮箱提示*/
				phoneShow: false,
				/*资金密码部分*/
				bindingMoney: {
					pass1: "",
					/*密码*/
					checkpass1: "",
					/*确认密码*/
					code1: ""
				},
				/*正则匹配*/
				formRules: {
					pass1: [{
						validator: moneyPass,
						trigger: 'blur'
					}],
					checkpass1: [{
						validator: moneyPass2,
						trigger: 'blur'
					}]
				},
				/*资金提示发送验证码成功*/
				MoneyText: "",
				bindingMoneyShow: false,
				/*控制显示隐藏*/
				MoneyisShow: false,
				/*提示用户验证码发送至手机或者邮箱*/
				sendMoneyCode1: true,
				/*内容显示或者隐藏*/
				cities: [],
				/*获取国家信息*/
				country_id: 1,
				/*获取国家ID*/
				value: "86",
				/*默认选定国家列表*/
				PhonelShow: false,
				codeSuccess: false,
				/*提示验证码已经发送*/
				/*判断用户有没有绑定手机号码*/
				sendPhoneCode1: true,
				/*获取手机验证码是否显示或者隐藏*/
				/*显示邮箱倒计时*/
				userList: {},
				/*获取用户信息*/
				passShow: false,
				/*显示或者隐藏修改密码*/
				sendAuthCode: true,
				/*禁止按钮*/
				ruleForm2: { /*验证密码*/
					primaryPass: "",
					/*原始密码*/
					pass: '',
					/*新密码*/
					checkPass: ''
					/*确认密码*/
				},
				getGoogle: { /*获取谷歌二维码和和密钥*/
					ewmImg: "",
					secretkey: "",
					code: "" /*用户输入的谷歌验证码*/
				},
				GoogleShow: false,
				/*显示隐藏谷歌*/
				GoogleConfirm: false,
				/*提示验证码输入错误*/
				rules2: {
					primaryPass: [{
						validator: primaryPass,
						trigger: 'blur'
					}],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				},
				/*验证密码*/
				moneyError: false, //资金验证码错误
				emailError: false, //邮箱验证码错误
				bdPassSuccess: false, //绑定密码成功
				verificationISgoogle:false,   /*谷歌验证*/
				verificationISmobile:false,   /*手机验证*/
				verificationISemail:false      /*邮箱验证*/
			}
		},
		methods: {
			xiuGai(){
				this.phoneShow = !this.phoneShow
				this.phone_time2 = 0;
				this.sendPhoneCode1 = true;
			},
			clickGo() { /*绑定身份证*/
				this.isShowUser = false;
				this.$router.push({
					name: "identity",
					params: {
						type: "Jump"
					}
				});
			},
			Num(eve) { /*只允许输入数字*/
				this.numberValidateForm.Bankcardnumber = eve.target.value.replace(/\D/gi, "");
			},
			/*绑定资金密码*/
			bindMoney(formName) {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				if(_this.bindingMoney.code1 == "" || _this.bindingMoney.code1 == "" || _this.bindingMoney.checkpass1 == "") {
					return false;
				}
				////输入成功再绑定
				axios.post(httpUrl.settingPaypass, {
					code: _this.bindingMoney.code1,
					pay_password: _this.bindingMoney.pass1,
					pay_password_confirmation: _this.bindingMoney.checkpass1,
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) { /*绑定资金密码成功*/
						_this.userList.pay_password_status = true;
						_this.bindingMoneyShow = false;
						_this.bindingMoney.code1 = "";
						_this.bindingMoney.pass1 = "";
						_this.bindingMoney.checkpass1 = "";
						if(_this.bindingMoneyShow) {
							_this.$message({
								showClose: true,
								message: _this.$t("userCenter.Phonemodifiedsuccess"),
								type: 'success',
								duration: 1500
							});
							if(_this.userList.idCard == "") { /*判断用户是否绑定身份证*/
								setTimeout(function() {
									_this.isShowUser = true;
								}, 1500)
							}
						} else {
							_this.$message({
								showClose: true,
								message: _this.$t("userCenter.Emailbindingsuccess"),
								type: 'success',
								duration: 1500
							});
							if(_this.userList.idCard == "") { /*判断用户是否绑定身份证*/
								setTimeout(function() {
									_this.isShowUser = true;
								}, 1500)
							}
						}
					}
					if(res.data.status.code == 101) {
						_this.moneyError = true;
						setTimeout(function() {
							_this.moneyError = false;
						}, 1500)
					}
				}, function(err) {
					console.log(err)
				})

			},
			/*获取验证码money_time2*/
			getMoneyCode() {
				var _this = this;
				if(this.bindingMoney.pass1 == "" || this.bindingMoney.checkpass1 == "") {
					return false;
				}
				_this.callback(); /*刷新token判断*/
				///点击发送验证码
				axios.post(httpUrl.Money_code, {
					type: 4,
					receiver_type: _this.userList.mobile_status == 2 ? 0 : 1
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(_this.bindingMoney.pass1 != _this.bindingMoney.checkpass1) {
						return false;
					}
					if(res.data.status.code == 200) {
						_this.MoneyText = res.data.data;
						_this.MoneyisShow = true;
						setTimeout(function() {
							_this.MoneyisShow = false;
						}, 2000)
						/////判断是否发送成功
						_this.sendMoneyCode1 = false;
						_this.money_time2 = 60;
						var auth_timetimer = setInterval(() => {
							_this.money_time2--;
							if(_this.money_time2 <= 0) {
								_this.sendMoneyCode1 = true;
								clearInterval(auth_timetimer);
							}
						}, 1500);
					}
				}, function(err) {
					console.log(err)
				})

			},
			/*换页事件*/
			pageChange(val) {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				axios.get(httpUrl.login_log, {
					params: {
						"page": val
					},
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.loginHistoryList = res.data.data.data;
				}, function(err) {
					console.log(err)
				})
			},
			/*绑定谷歌*/
			bindingGoogle() {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				axios.post(httpUrl.bindGoogleSecret, {
					secret: _this.getGoogle.secretkey,
					code: _this.getGoogle.code
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.userList.google_status = 2; /*状态变化*/
						if(_this.userList.google_status == 2) {
							_this.$message({
								showClose: true,
								message: _this.$t("userCenter.Phonemodifiedsuccess"),
								type: 'success',
								duration: 2000
							});
						} else {
							_this.$message({
								showClose: true,
								message: _this.$t("userCenter.Emailbindingsuccess"),
								type: 'success',
								duration: 2000
							});
						}
						_this.getGoogle.code = ""
					} else {
						_this.GoogleConfirm = true;
						setTimeout(function() {
							_this.GoogleConfirm = false;
						}, 1500)
					}
				}, function(err) {
					console.log(err)
				})
			},
			/*生成谷歌密钥*/
			createSecret() {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				_this.GoogleShow = !_this.GoogleShow;
				if(_this.GoogleShow == false) { /*关闭谷歌不请求接口*/
					return false;
				}
				///获取生成谷歌密钥
				axios.post(httpUrl.createSecret, {}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.getGoogle.ewmImg = res.data.data.qrcode;
					_this.getGoogle.secretkey = res.data.data.secret;
				}, function(err) {
					console.log(err)
				})
			},
			/*选择国家*/
			change(val) {
				this.country_id = val;
				this.callback(); /*刷新token判断*/
			},
			/*获取手机验证码*/
			getPhoneCode1() {
				var _this = this;
				if(this.dynamicValidateForm1.mobile == "") {
					this.phoneNum_errorText = _this.$t("userCenter.EnterPhoneNum");
					this.phoneNum_error = true;
					setTimeout(() => {
						this.phoneNum_errorText = "";
						this.phoneNum_error = false;
					}, 1500)
					return false;
				}
				_this.callback(); /*刷新token判断*/
				axios.post(httpUrl.send_validator_message, {
					type: 2,
					country_id: _this.country_id,
					receiver_type: "mobile",
					/*传入国家ID值*/
					mobile: _this.dynamicValidateForm1.mobile
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.codeSuccess = true;
						_this.sendPhoneCode1 = false;
						_this.phone_time2 = 60;
						var auth_timetimer = setInterval(() => {
							_this.phone_time2--;
							if(_this.phone_time2 <= 0) {
								_this.sendPhoneCode1 = true;
								clearInterval(auth_timetimer);
							}
						}, 1000);
						setTimeout(function() {
							_this.codeSuccess = false;
						}, 1500)
					}
				}, function(err) {
					console.log(res)
				})
			},
			/*绑定手机号码*/
			phone() {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				axios.post(httpUrl.bind, {
					type: "mobile",
					mobile: _this.dynamicValidateForm1.mobile,
					country_id: _this.country_id,
					code: _this.dynamicValidateForm1.code
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.userList.mobile_status = 2; /*绑定状态改变*/
						_this.phoneShow = false; /*手机绑定成功*/
						_this.dynamicValidateForm1.mobile = "";
						_this.dynamicValidateForm1.code = "";
						if(_this.userList.mobile_status == 2) {
							_this.$message({
								showClose: true,
								message: _this.$t("userCenter.Phonemodifiedsuccess"),
								type: 'success',
								duration: 2000
							});
						} else {
							_this.$message({
								showClose: true,
								message: _this.$t("userCenter.Emailbindingsuccess"),
								type: 'success',
								duration: 2000
							});
						}
					} else if(res.data.status.code == -1) {
						_this.PhoneCodeError = true;
						setTimeout(function() {
							_this.PhoneCodeError = false;
						}, 1500)
					}
				}, function(err) {
					console.log(err.status)
				})
			},
			/*获取邮箱验证码*/
			getEmailCode() {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				/*倒计时开始*/
				if(this.dynamicValidateForm.email == "") {
					this.emailErrorTishi =  _this.$t("login.PleaseEmailAddr")
					this.emailNum_error = true;
					setTimeout(() => {
						this.emailNum_error = false;
					}, 1500)
					return false;
				}
				if(!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.dynamicValidateForm.email))) {
					this.emailErrorTishi = _this.$t("userCenter.EnterCorrectEmail")
					this.emailNum_error = true;
					setTimeout(() => {
						this.emailNum_error = false;
					}, 1500)
					return false;
				}
				if(this.dynamicValidateForm.email.length < 13) {
					this.emailErrorTishi = _this.$t("userCenter.EnterCorrectEmail")
					this.emailNum_error = true;
					setTimeout(() => {
						this.emailNum_error = false;
					}, 1500)
					return false;
				}
				/*开始获取验证码*/
				axios.post(httpUrl.send_validator_message, {
					type: 1,
					receiver_type: "email",
					email: _this.dynamicValidateForm.email
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.sendEmailCode = false;
						_this.auth_time1 = 60;
						var auth_timetimer = setInterval(() => {
							_this.auth_time1--;
							if(_this.auth_time1 <= 0) {
								_this.sendEmailCode = true;
								clearInterval(auth_timetimer);
							}
						}, 1500);
					}
				}, function(err) {
					console.log(err)
				})
			},
			/*绑定邮箱验*/
			bindingEmail() {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				if(!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(_this.dynamicValidateForm.email))) {
					return false;
				}
				/*绑定*/
				axios.post(httpUrl.bind, {
					type: "email",
					email: _this.dynamicValidateForm.email,
					code: _this.dynamicValidateForm.code
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.userList.email_status = 2; /*绑定成功*/
						_this.EmailShow = false; /*隐藏文本框  */
						_this.$message({
							showClose: true,
							message: _this.$t("userCenter.Emailbindingsuccess"),
							type: 'success',
							duration: 2000
						});
						_this.dynamicValidateForm.email = "";
						_this.dynamicValidateForm.code = "";
					}
					if(res.data.status.code == -1) {
						_this.emailError = true;
						setTimeout(function() {
							_this.emailError = false;
						}, 1500)
					}
				}, function(err) {
					console.log(err)
				})
			},
			/*提交密码的方法*/
			submitForm() {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				/*判断用户输入的是不是空*/
				if(_this.primaryPass == "" || _this.pass == "" || _this.checkPass) {
					return false;
				}
				if(_this.ruleForm2.pass.length < 8) {
					return false;
				}
				if(_this.ruleForm2.pass != _this.ruleForm2.checkPass) {
					return false;
				}
				if(!/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/.test(_this.ruleForm2.pass)) {
					return false;
				} else {
					///发送请求
					axios.post(httpUrl.modifyPassword, {
						old_password: _this.ruleForm2.primaryPass,
						password: _this.ruleForm2.pass,
						password_confirmation: _this.ruleForm2.checkPass
					}, {
						headers: {
							"Authorization": "Bearer " + _this.token
						}
					}).then(function(res) {
						if(res.data.status.code == 200) {
							_this.passShow = false;
							_this.$message({
								showClose: true,
								message: _this.$t("userCenter.ModifiedPasswordSuccess"),
								type: 'success',
								duration: 2000
							});
							_this.ruleForm2.primaryPass = "";
							_this.ruleForm2.pass = "";
							_this.ruleForm2.checkPass = "";
						} else if(res.data.status.code == -3) {
							_this.tishiShow = true;
							_this.tishi = _this.$t("userCenter.OriginalPasswordWrong");
							setTimeout(function() {
								_this.tishiShow = false;
								_this.tishi = "";
							}, 1500)
						}

					}, function(err) {
						console.log(err)
					})
				}

			}
		},
    computed:{
      ...mapState('user',["lang"])
    },
		mounted() {
			var _this = this;
			/*判断用户是否需要绑定资金密码*/
			if(this.$route.params.bangdin == "yes") {
				this.bindingMoneyShow = true;
			}
			///获取用户信息
			axios.get(httpUrl.userInfo, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				/*判断用户的是否输入身份证*/
				if(res.data.status.code == 200) {
					_this.userList = res.data.data;
				}
				if(res.data.status.code == -200) {
					_this.$message({
						message: res.data.status.message,
						type: 'error'
					});
				}
			}, function(err) {
				console.log(err)
			})
			///获取国家信息
			axios.get(httpUrl.country,{
        params:{lang:this.lang=='zh-CN'?'zh':'en'}
      }).then(function(res) {
				_this.cities = res.data.data;
			}, function(error) {
				console.log(error)
			})
			//获取登录历史
			axios.get(httpUrl.login_log, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				/*获取登录历史*/
				_this.loginHistoryList = res.data.data.data;
				/*最大条数*/
				_this.last_page = res.data.data.last_page;
				/*总条目数*/
				_this.total = res.data.data.total;

				if(res.data.status.code == -200) {
					_this.$message({
						message: res.data.status.message,
						type: 'error'
					});
				}
			}, function(err) {
				console.log(err)
			})

		}
	}
</script>
<style lang="scss">
	.el-message--success {
		background-color: #fff;
		border-color: #e1f3d8;
		border-top: 2px solid #22d9b8;
	}

	.el-message {
		min-width: 280px;
		padding: 25px 15px 25px 20px;
	}

	.el-message .el-icon-success {
		font-size: 15px;
		color: #22d9b8;
	}

	.el-message--success .el-message__content {
		color: #000;
	}
		.el-switch{
						margin-left:12px;
						.el-switch__label.el-switch__label--left{
							font-size: 12px;
							color: #fff ;
						}
						.el-switch__label.el-switch__label--right{
							font-size: 12px;
							color: #ffff ;
						}
						.el-switch__label--left.is-active,
				.el-switch__label--right.is-active {
					font-size: 12px !important;
					color: #409EFF !important;
					font-weight: 400 !important;
				}
					}
</style>

<style lang="scss">
	/*白色版本开始*/

	.position_white,
	.money_text_white {
		background: #fff !important;
		box-shadow: 2px 2px 5px #666 !important;
		color: #000 !important;
	}

	.tishi_white {
		background: #fff !important;
		box-shadow: 2px 2px 5px #666 !important;
		color: #000 !important;
	}

	.account_white {
		color: #000;
		/*基本信息*/
		.ji-ben {
			.ji-ben-list {
				background: #fff !important;
				border: 1px solid #eee !important;
				.ji-ben-item {
					border-bottom: 1px solid #ddd !important;
				}
				li {
					color: #000 !important;
				}
			}
		}
		.anquan-email {
			border-bottom: none !important;
		}
		.progress-bar,
		.anquan-email .box {
			border-bottom: 1px solid #ddd !important;
		}
		/*文本框*/
		.el-input__inner {
			background: #fff !important;
			color: #000 !important;
		}
		.auth_text_blue {
			color: #000 !important;
		}
		/*安全*/
		.an-quan {
			.anquan-list {
				background: #fff !important;
				border: 1px solid #eee !important;
			}
			.jian-yi,
			.oCenter,
			.binding {
				color: #666 !important;
			}
			.text {
				color: #333 !important;
			}
		}
		/*谷歌验证*/
		/*资金密码*/
		.bindingGoogle-content-title,
		.bindingMoney-title {
			color: #000 !important;
		}
		.google-QRcode {
			background: #eee !important;
			border: 1px solid #ddd !important;
		}
		/*登录历史*/
		.deng-lu-box {
			background: #fff !important;
			.dl-content-content,
			.dl-content-title {
				border: 1px solid #eee !important;
				td {
					color: #000 !important;
				}
			}
		}
	}
	/*错误提示框*/

	.confirm_white {
		background: #fff !important;
		box-shadow: 2px 2px 5px #666 !important;
		color: #000 !important;
	}
	/*白色版本结束*/

	$bg_color:#383962;
	/*高亮背景*/

	$gao_liang:#9696c7;
	/*高亮部分文字*/

	$border_bottom:1px solid #2e3157;
	/*1px 细线部分*/

	$border_2px: 2px solid #33304e;
	/*2px 粗线部分*/
	/*当前页数的高亮状态*/

	.white {
		/*白色版本的字体*/
		color: #000 !important;
	}

	.page-active {
		font-weight: 600;
		color: $gao_liang;
	}
	/*邮箱验证*/

	.email_box {
		position: relative;
		.tishi_email {
			position: absolute;
			right: 0;
			top: 37px;
			color: #f56c6c;
			font-size: 12px;
		}
	}
	/*修改密码成功*/

	.bdPassSuccess {
		position: absolute;
		left: 35%;
		top: 20%;
		width: 300px;
		height: 115px;
		background: #fff;
		color: #000;
		text-align: center;
		border-top: 5px solid #22d9b8;
		z-index: 99;
		p:nth-of-type(1) {
			margin-top: 40px;
			margin-bottom: 10px;
			.iconfont {
				color: #22d9b8;
				font-size: 20px;
			}
		}
	}
	/*判断用户是否输入了身份证*/

	.force {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.5);
		.force-content {
			width: 100%;
			height: 100%;
			position: relative;
			.force-text {
				width: 475px;
				height: 255px;
				position: absolute;
				left: 35%;
				top: 20%;
				color: #fff;
				background: #22223f;
				/*头部内容*/
				.force-title {
					width: 100%;
					height: 55px;
					line-height: 55px;
					border-bottom: 1px solid #4e4a76;
					span {
						float: left;
						margin-left: 20px;
						font-size: 16px;
					}
					.iconfont {
						float: right;
						margin-right: 20px;
						cursor: pointer;
					}
				}
				/*实名认证中间内容*/
				.force-box {
					width: 100%;
					height: 145px;
					text-align: center;
					line-height: 145px;
					font-size: 16px;
					border-bottom: 1px solid #4e4a76;
					.renz {
						color: #7478e9;
						cursor: pointer;
					}
				}
				/*确认按钮和取消按钮部分*/
				.confirm-cancel {
					width: 100%;
					height: 52px;
					line-height: 52px;
					font-size: 16px;
					p {
						width: 50%;
						text-align: center;
						float: left;
						box-sizing: border-box;
						cursor: pointer;
					}
					p:nth-of-type(1) {
						border-right: 1px solid #4e4a76;
					}
				}
			}
		}
	}
	/*最大的盒子*/

	#account {
		color: #fff;
		/*分页样式*/
		.el-pagination.is-background .el-pager li.active {
			background: #9F99F2;
			border: 1px solid #9F99F2;
			color: #fff;
		}
		/*按钮大小*/
		.el-button--primary {
			width: 100% !important;
			height: 40px !important;
			margin-top: 30px;
			background-color: #6666fa !important;
			border: 1px solid #6666fa !important;
		}
		/*报错位置*/
		.el-form-item__error {
			width: 160px !important;
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
			color: #fff;
			border: 1px solid #2c3983;
			background: #101034;
		}
		.el-form-item {
			margin-bottom: 0 !important;
		}
		.auth_text_blue {
			color: #fff;
		}
		/*手机号码改变内容*/
		#phone {
			position: relative;
			.el-select {
				width: 25% !important;
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
				padding-left: 28%;
				color: #fff;
			}
		}
	}
	/*验证码样式*/

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
			.auth_text {
				color: #fff;
			}
		}
	}

	#you-yan1 {
		position: relative;
		#getma1 {
			height: 30px;
			line-height: 5px;
			position: absolute;
			right: 0;
			top: 6px;
			background: none;
			border: none;
			border-left: 1px solid #4e5b85;
			border-radius: 0;
			.auth_text {
				color: #fff;
			}
		}
	}
	/*账号安全部分*/

	.an-quan {
		width: 100%;
		/*安全等级  大盒子*/
		.anquan-list {
			width: 100%;
			box-sizing: border-box;
			background: #16182c;
			border-bottom-left-radius: 4px;
			border-bottom-right-radius: 4px;
			/*进度条*/
			.progress-bar {
				width: 100%;
				height: 45px;
				border-bottom: 1px solid #2e3157;
				line-height: 45px;
				.color_pro,
				.gao_liang,
				.jian-yi,
				.di {
					/*进度条*/
					float: left;
				}
				.gao_liang {
					color: $gao_liang;
					margin: 0 90px 0 27px;
				}
				.color_pro {
					margin-top: 15px;
					li {
						width: 60px;
						height: 14px;
						float: left;
					}
					.red {
						background: #FE3231;
					}
					.orange {
						background: #ea6954;
					}
					.green {
						background: #02c289;
					}
				}
				/*高 中 低*/
				.di {
					margin: 0 68px 0 10px;
				}
				.di.red {
					color: #FE3231;
					font-weight: 900;
					font-size: 15px;
				}
				.di.orange {
					color: #FF8E32;
					font-weight: 900;
					font-size: 15px;
					margin-right: 90px;
				}
				.di.green {
					color: #FE3231;
					font-weight: 900;
					font-size: 15px;
				}
			}
		}
	}
	/*安全设置*/
	/*绑定谷歌*/

	.bindingGoogle {
		width: 100%;
		.bindingGoogle-content {
			width: 700px;
			margin: 10px auto;
			.oleft {
				width: 310px;
				margin-bottom: 20px;
				position: relative;
				float: left;
				.position {
					width: 150px;
					height: 30px;
					text-align: center;
					line-height: 30px;
					background: #414182;
					box-shadow: 2px 2px 5px #000;
					position: absolute;
					left: 90px;
					top: 150px;
					/*color: #f56c6c;*/
					z-index: 999;
				}
				.bindingGoogle-content-title {
					width: 100%;
					height: 30px;
					line-height: 30px;
				}
				.google-QRcode {
					width: 270px;
					height: 110px;
					border: 1px solid #2c3983;
					border-radius: 5px;
					background: #101034;
					img {
						width: 90px;
						height: 90px;
						float: left;
						margin: 10px 10px;
					}
					.text {
						float: left;
						display: inline-block;
						margin-top: 48px;
						margin-left: 10px;
					}
				}
			}
			.oright {
				float: left;
				width: 340px;
				margin-left: 50px;
				.upDown {
					width: 100%;
					margin-top: 50px;
					li {
						width: 100%;
						height: 30px;
						line-height: 30px;
					}
					.upDown-title {
						margin-bottom: 10px;
					}
				}
				.upDownApp {
					margin-top: 40px;
					a {
						display: inline-block;
						width: 110px;
						height: 36px;
						background: #6666fa;
						border-radius: 4px;
						float: left;
						color: #fff;
						text-align: center;
						line-height: 36px;
					}
					a:nth-of-type(2) {
						margin-left: 30px;
					}
				}
			}
		}
	}
	/*绑定资金密码*/

	.bindingMoney {
		width: 100%;
		.bindingMoney-content {
			width: 685px;
			border: 1px solid rgba(0, 0, 0, 0);
			padding-bottom: 20px;
			margin: 0 auto;
			.oleft {
				width: 320px;
				position: relative;
				float: left;
				.bindingMoney-title {
					width: 100%;
					height: 50px;
					line-height: 50px;
				}
				.money-text {
					position: absolute;
					left: -30px;
					top: 100px;
					height: 50px;
					padding: 0 10px;
					text-align: center;
					line-height: 50px;
					background: #414182;
					box-shadow: 2px 2px 5px #000;
					z-index: 100;
					color: #fff;
				}
			}
			.oright {
				height: 300px;
				float: left;
				p {
					color: $gao_liang;
					margin-top: 120px;
					margin-left: 40px;
				}
			}
		}
	}
	/*绑定手机*/

	.bindingPhone {
		width: 100%;
		height: 300px;
		border: 1px solid rgba(0, 0, 0, 0);
		.bindingCenter {
			width: 685px;
			height: 270px;
			margin: 0 auto;
			.oleft {
				width: 310px;
				position: relative;
				float: left;
				.text {
					width: 100%;
					height: 50px;
					line-height: 50px;
				}
				.confirm {
					width: 180px;
					height: 50px;
					line-height: 50px;
					text-align: center;
					background: #414182;
					box-shadow: 2px 2px 5px #000;
					color: #fff;
					position: absolute;
					left: 100px;
					top: 95px;
					z-index: 1000;
					.iconfont {
						color: #FE3231;
					}
				}
				.confirm1 {
					@extend .confirm;
					color: #fff;
					.iconfont {
						color: #27d838;
					}
				}
			}
			.oright {
				float: left;
				p {
					margin-top: 110px;
					margin-left: 50px;
					color: $gao_liang;
				}
			}
		}
	}
	/*绑定邮箱*/

	.anquan-email {
		width: 100%;
		.box {
			/*大盒子*/
			border-bottom: $border_bottom;
		}
		.box:nth-last-child(1) {
			border-bottom: none;
		}
		/*注册内容部分*/
		.box .register-mail {
			width: 100%;
			.register-mail-content {
				width: 685px;
				padding-bottom: 20px;
				border: 1px solid rgba(0, 0, 0, 0);
				margin: 0 auto;
				.oLeft {
					/*表单部分*/
					width: 310px;
					position: relative;
					.code_error {
						position: absolute;
						top: 40%;
						left: 30%;
						color: #fff;
						z-index: 999;
						width: 150px;
						height: 50px;
						line-height: 50px;
						text-align: center;
						background: #414182;
						box-shadow: 2px 2px 5px #000;
						color: #fff;
					}
					float: left;
					.text {
						width: 100%;
						height: 50px;
						line-height: 50px;
					}
				}
				.oRight {
					float: left;
					p {
						color: $gao_liang;
						margin: 110px 0 0 100px;
					}
				}
			}
			.register-mail-content:after {
				display: block;
				clear: both;
				content: "";
				visibility: hidden;
				height: 0;
			}
			.register-mail-content {
				zoom: 1;
			}
		}
		/*头部信息*/
		.anquan-email-title {
			width: 100%;
			height: 50px;
			line-height: 50px;
			display: flex;
			justify-content: space-between;
			.oleft {
				min-width: 172px;
				text-align: left;
				line-height: 50px;
				padding-left: 20px;
				.iconfont {
					font-size: 14px;
					margin-right: 4px;
				}
				.iconfont.red {
					color: #FE3231;
				}
				.iconfont.green {
					color: #02c289;
				}
				.text {
					color: $gao_liang;
				}
			}
			.oCenter{
				min-width: 700px;
			}
			.binding {
				cursor: pointer;
				flex: 1;
				text-align: right;
				box-sizing: border-box;
				padding-right: 20px;
				font-size: 14px;
			}
		}
		.anquan-google-title {
			@extend .anquan-email-title;
		}
		.anquan-money-title {
			@extend .anquan-email-title;
		}
	}
	/*基本信息修改密码部分*/

	.xiu-gai {
		width: 100%;
		padding-bottom: 50px;
		.xiu-gai-content {
			width: 685px;
			margin: 0 auto;
			/*表单部分*/
			.new-pass {
				width: 310px;
				position: relative;
				float: left;
				.ma-zi-title {
					width: 100%;
					height: 40px;
					line-height: 40px;
				}
				.tan-tishi {
					padding: 0 20px;
					height: 45px;
					text-align: center;
					line-height: 45px;
					background: #414182;
					box-shadow: 2px 2px 5px #000;
					position: absolute;
					left: 100px;
					top: 100px;
					z-index: 1000;
				}
			}
			/*右侧提示部分*/
			.confirm {
				float: left;
				margin-left: 50px;
				margin-top: 100px;
				color: $gao_liang;
				font-size: 13px;
			}
		}
		/*清除浮动*/
		.xiu-gai-content:after {
			display: block;
			clear: both;
			content: "";
			visibility: hidden;
			height: 0
		}
		.xiu-gai-content {
			zoom: 1
		}
	}
	/*基本信息*/

	#account .ji-ben {
		width: 100%;
		position: relative;
		.title {
			width: 100%;
			height: 45px;
			p {
				display: inline-block;
				height: 45px;
				text-align: center;
				line-height: 40px;
				font-size: 15px;
				background: #272867;
				box-sizing: border-box;
				padding: 0 10px;
			}
		}
		.ji-ben-list {
			border-bottom-left-radius: 4px;
			border-bottom-right-radius: 4px;
			background: #16182c;
			.ji-ben-item {
				width: 100%;
				.box {
					width: 100%;
					height: 50px;
					line-height: 50px;
					font-size: 14px;
					display: flex;
					/*账号*/
					.zhang-hao {
						/*width: 75px;*/
						padding-left: 15px;
						color: $gao_liang;
						flex: 1;
						text-align: left;
					}
					/*密码那些*/
					.hao-ma {
						flex: 1.5;
						text-align: left;
					}
					.hao-ma1{
						flex: 1.32;
					}
					/*修改*/
					.set-text{
						margin-right: 50px;
						cursor: pointer;
					}
				}
			}
			.ji-ben-item:nth-last-child(1) {
				border-bottom: none;
			}
		}
	}
	/*安全设置头部*/
	/*白色版本边框消失*/

	.border_none {
		border: none !important;
	}
	/*登录历史头部*/

	.an-quan,
	.deng-lu {
		margin-top: 100px;
		.title {
			width: 100%;
			height: 45px;
			p {
				display: inline-block;
				height: 45px;
				padding: 0 10px;
				text-align: center;
				line-height: 40px;
				font-size: 15px;
				color: #fff;
				background: #272867;
			}
		}
		/*登录大box*/
		.deng-lu-box {
			width: 100%;
			height: 305px;
			background: #16182c;
		}
		/*头部*/
		.dl-content-title {
			width: 100%;
			height: 50px;
			border-bottom: $border_bottom;
			td {
				width: 25%;
				height: 50px;
				line-height: 50px;
				float: left;
				color: $gao_liang;
				font-size: 14px;
			}
			td:nth-of-type(1) {
				box-sizing: border-box;
				padding-left: 20px;
			}
			td:nth-of-type(2),
			td:nth-of-type(3),
			td:nth-of-type(4) {
				text-align: center;
			}
		}
		/*记录*/
		.dl-content-content {
			@extend .dl-content-title;
			border-left: none;
			border-right: none;
			td {
				color: #fff;
			}
		}
		/*分页*/
		.pageCount {
			width: 100%;
			height: 60px;
			.button {
				float: right;
				margin-top: 15px;
				span {
					display: inline-block;
					width: 20px;
					height: 20px;
					font-size: 14px;
					line-height: 20px;
					text-align: center;
					cursor: pointer;
				}
				i {
					font-size: 14px;
					cursor: pointer;
				}
			}
		}
	}
</style>
